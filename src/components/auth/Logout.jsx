import React from "react";
import 'react-toastify/dist/ReactToastify.css';


export default function Logout() {

    // Logout handler
    const handleLogout = () => {
        // Remove tokens from sessionStorage and redirect to login page
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    // BLOCK HTML
    return (
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-4">Выход из аккаунта</h2>
            <p className="ms-4">Вы действительно хотите выйти?</p>
            <div className="d-flex justify-content-center">
            </div>
            {/* Handle logout button */}
            <button className="btn btn-danger ms-4 btn-animate" onClick={handleLogout}>Да, Выйти</button>
        </div>
    );
}
