import { React, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';


export default function Logout() {

    // Set success state
    const [isLogoutButtonClicked, setIsLogoutButtonClicked] = useState(false);

    // Logout handler, remove tokens
    const handleLogout = () => {
        // Remove tokens from sessionStorage and redirect to login page
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.clear();
        localStorage.clear();
        setIsLogoutButtonClicked(true)
        // Redirect to login page
        window.location.href = '/login';
    };
    // BLOCK HTML
    return (
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-4">Выход из аккаунта</h2>
            <p className="ms-4">Вы действительно хотите выйти?</p>
            <div className="d-flex justify-content-center">
            </div>
            {/* Logout button */}
            <button
                className="btn btn-danger ms-4 btn-animate"
                onClick={handleLogout}
                disabled={isLogoutButtonClicked}
            >
                Да, Выйти
            </button>
        </div>
    );
}
