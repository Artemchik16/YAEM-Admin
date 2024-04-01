// default import
import React from "react";

// Import messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Logout() {
    // Logout function to remove tokens and redirect to login page
    const handleLogout = () => {
        toast.info("Выход из аккаунта..", {
            autoClose: 1000,
        });
        setTimeout(() => {
            sessionStorage.removeItem('accessToken'); // Remove access token
            sessionStorage.removeItem('refreshToken'); // Remove refresh token
            window.location.href = '/login'; // Redirect to login page
        }, 1400);
    };

    return (
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-4">Выход из аккаунта</h2>
            <p className="ms-4">Вы действительно хотите выйти?</p>
            <button className="btn btn-danger ms-4 btn-animate" onClick={handleLogout}>Да, Выйти</button>
        </div>
    );
}

export default Logout;
