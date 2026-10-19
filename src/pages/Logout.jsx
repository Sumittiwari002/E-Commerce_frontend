import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../utilities/alert";
import { useAuth } from "../context/AuthContext";


export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        

        if (!token) {
            console.log("You are already logged out. Please log in again.");
        } else {
            logout();
            showSuccess("User Logout successfully");

        }

        navigate("/", { replace: true });

    }, [navigate, logout]);

    return <div>Logging out...</div>;
}