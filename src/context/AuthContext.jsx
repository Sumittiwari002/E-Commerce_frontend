import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TOKEN_KEY = "accessToken";

// Backend stores the role in User.status
const ADMIN_STATUS = 1;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Re-render on every navigation so the token is re-read from localStorage.
  // This keeps the navbar correct even if some page removes the token itself
  // (e.g. on a 401 "token expired" response).
  useLocation();

  const [, refresh] = useReducer((n) => n + 1, 0);
  const token = localStorage.getItem(TOKEN_KEY);

  // The profile is stored together with the token it was fetched for, so a
  // profile that belongs to an old token is never used for a new one.
  const [profile, setProfile] = useState({ forToken: null, user: null });

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    axios
      .get(import.meta.env.VITE_API_NODEPATH + "/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!cancelled) {
          setProfile({ forToken: token, user: res.data.data.user });
        }
      })
      .catch((err) => {
        if (cancelled) return;

        if (err.response?.status === 401) {
          // Token expired / invalid -> treat as logged out
          localStorage.removeItem(TOKEN_KEY);
          refresh();
        } else {
          // Server unreachable etc. -> stay logged in, but without admin rights
          setProfile({ forToken: token, user: null });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const profileReady = profile.forToken === token;
  const user = token && profileReady ? profile.user : null;

  const login = useCallback((accessToken, loggedInUser) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    setProfile({ forToken: accessToken, user: loggedInUser ?? null });
    refresh();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    refresh();
  }, []);

  const value = {
    user,
    isAuthenticated: !!token,
    isAdmin: user?.status === ADMIN_STATUS,
    // true while we have a token but don't yet know who the user is / their role
    loading: !!token && !profileReady,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};


// import { createContext, useCallback, useContext, useEffect, useState } from "react";
// import api, { refreshSession, TOKEN_KEY } from "../utilities/api";

// const ADMIN_STATUS = 1;
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

//   // On page load: silently refresh so we get a valid token + the user/role
//   useEffect(() => {
//     if (!localStorage.getItem(TOKEN_KEY)) {
//       setLoading(false);
//       return;
//     }

//     let cancelled = false;

//     refreshSession()
//       .then(({ accessToken, user }) => {
//         if (cancelled) return;
//         setToken(accessToken);
//         setUser(user);
//       })
//       .catch(() => {
//         if (cancelled) return;
//         setToken(null);
//         setUser(null);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Interceptor fires this when the refresh token itself is dead
//   useEffect(() => {
//     const onForcedLogout = () => {
//       setToken(null);
//       setUser(null);
//     };
//     window.addEventListener("auth:logout", onForcedLogout);
//     return () => window.removeEventListener("auth:logout", onForcedLogout);
//   }, []);

//   const login = useCallback((accessToken, loggedInUser) => {
//     localStorage.setItem(TOKEN_KEY, accessToken);
//     setToken(accessToken);
//     setUser(loggedInUser ?? null);
//     setLoading(false);
//   }, []);

//   const logout = useCallback(async () => {
//     try {
//       await api.post("/api/auth/logout"); // clears cookie + Redis session (if you have this route)
//     } catch {
//       /* ignore */
//     }
//     localStorage.removeItem(TOKEN_KEY);
//     setToken(null);
//     setUser(null);
//   }, []);

//   const value = {
//     user,
//     isAuthenticated: !!token,
//     isAdmin: user?.status === ADMIN_STATUS,
//     loading,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// };