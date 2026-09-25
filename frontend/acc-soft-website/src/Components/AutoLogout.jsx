import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const tokenExpiry = localStorage.getItem("token_expiry");

            if (tokenExpiry) {
                const expiryDate = new Date(tokenExpiry);
                const now = new Date();

                if (now > expiryDate) {
                    alert("Token expired. Logging out...");
                    localStorage.clear();
                    navigate("/login");
                }
            }
        };

        // ✅ Check token expiration on page load
        checkTokenExpiration();

        // ✅ Auto logout after 30s (setTimeout)
        const timer = setTimeout(() => {
            checkTokenExpiration();
        }, 30 * 1000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);
};

export default useAutoLogout;
