import React from "react";



function Logout() {
    const handleLogout = () => {
        // remove tokens
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        // redirect to login page
        window.location.href = '/login';
    };

    return (
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-3">Выход из аккаунта</h2>
            <p className="ms-3">Вы действительно хотите выйти?</p>
            {/* handle logged out user */}
            <button className="btn btn-danger ms-3" onClick={handleLogout}>Да, Выйти</button>
        </div>
    );
}

export default Logout
