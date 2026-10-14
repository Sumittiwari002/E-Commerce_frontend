import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        

        if (!token) {
            alert("You are already logged out. Please log in again.");
        } else {
            localStorage.removeItem("accessToken");
            alert("User logged out successfully.");
        }

        navigate("/", { replace: true });

    }, [navigate]);

    return <div>Logging out...</div>;
}