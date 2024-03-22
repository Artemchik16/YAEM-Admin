import React from "react";

function Logout() {
    // Logout function to remove tokens and redirect to login page
    const handleLogout = () => {
        sessionStorage.removeItem('accessToken'); // Remove access token
        sessionStorage.removeItem('refreshToken'); // Remove refresh token
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-4">Выход из аккаунта</h2>
            <p className="ms-4">Вы действительно хотите выйти?</p>
            <button className="btn btn-danger ms-4" onClick={handleLogout}>Да, Выйти</button>
        </div>
    );
}

export default Logout;
