import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    // alert("Please Login First");
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;