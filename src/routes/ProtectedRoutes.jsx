import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Any logged-in user (admin or normal user)
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
