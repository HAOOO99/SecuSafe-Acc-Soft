import React , { useEffect }from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const isAuthenticated = () => {
    const token = sessionStorage.getItem('access_token');
    console.log(token);
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    console.log("token is ", decodedToken)
    try {

        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp > now) {
            return true; // Token is valid
        } else {
            alert("Your session has expired. Please log in again.");
            return false; // Token is expired
        }
    } catch (err) {
        return false;
    }
};


// const refreshToken = async () => {
//     const token = sessionStorage.getItem('access_token');
//     if (!token) return;

//     try {
//         const response = await fetch('http://127.0.0.1:8000/login/refresh-token/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         const data = await response.json();
//         if (data.status === "success") {
//             sessionStorage.setItem('access_token', data.token);
//         } else {
//             console.error('Failed to refresh token');
//         }
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//     }
// };

const ProtectedRoute = ({ children }) => {

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refreshToken();
    //     }, 4 * 60 * 1000); // Refresh token every 4 minutes

    //     return () => clearInterval(interval); // Cleanup interval on component unmount
    // }, []);
    const token = localStorage.getItem('access_token');
    console.log(token);
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
