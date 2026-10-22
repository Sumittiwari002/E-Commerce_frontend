import axios from "axios";

export const TOKEN_KEY = "accessToken";
const BASE_URL = import.meta.env.VITE_API_NODEPATH;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends the refresh-token cookie
});

// Attach the current access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// One shared refresh call, so parallel 401s don't trigger multiple refreshes
let refreshPromise = null;

export const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/api/auth/refresh`, {}, { withCredentials: true })
      .then((res) => {
        const { accessToken, user } = res.data.data;
        localStorage.setItem(TOKEN_KEY, accessToken);
        return { accessToken, user };
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const isAuthRoute = original?.url?.includes("/api/auth/"); // login, refresh, etc.
    if (error.response?.status !== 401 || original._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const { accessToken } = await refreshSession();
      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original); // retry the original request
    } catch (refreshError) {
      // Refresh token expired / invalid -> real logout
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(refreshError);
    }
  }
);

export default api;