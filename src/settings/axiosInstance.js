import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_NODEPATH;
const ACCESS_TOKEN_KEY = "accessToken";

// Endpoints where a 401 means "wrong credentials", not "expired token".
const NO_REFRESH_URLS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
];

// withCredentials is REQUIRED so the browser stores the httpOnly refreshToken
// cookie on login and sends it back to /api/auth/refresh.
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* ------------------------------------------------------------------ */
/* Request: always attach the CURRENT access token from localStorage   */
/* ------------------------------------------------------------------ */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

/* ------------------------------------------------------------------ */
/* Refresh: one shared request, even if many calls fail at once        */
/* ------------------------------------------------------------------ */
let refreshPromise = null;

export const refreshAccessToken = () => {
  if (!refreshPromise) {
    // Plain axios (not `api`) so this call can never trigger the interceptor.
    refreshPromise = axios
      .post(`${BASE_URL}/api/auth/refresh`, {}, { withCredentials: true })
      .then((res) => {
        const newToken = res.data?.data?.accessToken;

        if (!newToken) {
          throw new Error("No access token in refresh response");
        }

        localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
        return newToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const forceLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  // AppRoutes listens for this and navigates to the login page.
  window.dispatchEvent(new Event("auth:logout"));
};

/* ------------------------------------------------------------------ */
/* Response: on 401, refresh once, then retry the original request     */
/* ------------------------------------------------------------------ */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const shouldTryRefresh =
      originalRequest &&
      status === 401 &&
      !originalRequest._retry &&
      // only if we actually sent an access token
      Boolean(originalRequest.headers?.Authorization) &&
      !NO_REFRESH_URLS.some((url) => originalRequest.url?.includes(url));

    if (!shouldTryRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If another request already refreshed the token while this one was in
    // flight, don't refresh again - just retry with the current token.
    const sentToken = originalRequest.headers.Authorization.replace("Bearer ", "");
    const currentToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (currentToken && currentToken !== sentToken) {
      originalRequest.headers.Authorization = `Bearer ${currentToken}`;
      return api(originalRequest);
    }

    try {
      const newToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest); // retry with the new token
    } catch (refreshError) {
      const refreshStatus = refreshError.response?.status;

      // Refresh token missing/expired/invalid -> session is really over.
      // (A network error or 5xx should NOT log the user out.)
      if (refreshStatus === 401 || refreshStatus === 403) {
        forceLogout();
      }

      return Promise.reject(error);
    }
  }
);

export default api;
