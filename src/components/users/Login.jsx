// Default imports
import React, { useState } from "react";

// Import image
import logo from '../../assets/images/favicon.png';

// Import redirect and navigation
import { Link, useNavigate } from 'react-router-dom';

// Import messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    // State variables
    const [phone, setPhone] = useState(null); // Phone number
    const [password, setPassword] = useState(null); // Password
    const [error, setError] = useState(null); // Error message
    const navigate = useNavigate(); // Navigation

    // Submit handler for login form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend
            const response = await fetch('http://localhost:8000/api/v1/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phone, password: password })
            });

            // Handle error response
            if (!response.ok) {
                throw new Error('Неверный номер телефона или пароль.');
            }

            // Get data from response
            const data = await response.json();

            // Get tokens
            const accessToken = data.access;
            const refreshToken = data.refresh;

            // Save tokens in sessionStorage
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);

            // Save success message in session storage
            sessionStorage.setItem('IsLoginSuccess', 'Добро пожаловать');

            // Navigate to menu page and reload page
            window.location.reload();
            navigate('/menu', { replace: true });
        } catch (error) {
            // Handle error
            if (error.message === 'No active account found with the given credentials') {
                setError('Неверный номер телефона или пароль');
            } else {
                setError(error.message);
            }

            // Show error message with toast
            toast.error(error.message, { autoClose: 2000 });
        }
    };

    return (
        <main>
            <div className="container-fluid background">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img className="mx-auto my-4 text-center" style={{ maxHeight: '30px' }} src={logo} alt="YAEM logo" />
                                        <span className="fs-3 fw-bold yaem-color mx-2">YAEM.KZ</span>
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Войти в аккаунт</h5>
                                            <p className="text-center small">Введите номер телефона и пароль для входа</p>
                                        </div>

                                        {/* Form */}
                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="phone" className="form-label">Номер телефона</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Введите номер телефона"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Пожалуйста, введите номер телефона.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="password" className="form-label">Пароль</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Введите пароль"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Пожалуйста, введите пароль.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 btn-animate" type="submit">Войти</button>
                                            </div>

                                            {/* Messages */}
                                            <ToastContainer></ToastContainer>

                                            <div className="col-12">
                                                <span>Нет аккаунта?</span> <Link to='/registration'>Зарегистрируйтесь!</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="credits">
                                    Designed by <a className="fw-bold" style={{ color: "#FD7014" }}>YAEM.KZ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
