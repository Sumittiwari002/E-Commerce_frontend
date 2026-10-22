import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoutes = () => {
  const { isAdmin, loading } = useAuth();

  
  if (loading) {
    return <div className="py-5 text-center">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;

// Admin only. Normal users who type the URL by hand are sent back to /home.
// Wait until we know the role, otherwise an admin refreshing the page
  // would be bounced to /home before the profile has loaded.