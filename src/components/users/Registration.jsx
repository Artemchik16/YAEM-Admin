// default imports
import React, { useState } from "react";
// Import redirect and navigation
import { Link, useNavigate } from 'react-router-dom';
// Import image
import logo from '../../assets/images/favicon.png';
// HTTP import
import axios from "axios";
// Import messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {

    const [phone, setPhone] = useState(''); // Phone number
    const [password, setPassword] = useState(''); // Password
    const navigate = useNavigate(); // Navigation

    // Submit handler for registration form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send post request to backend and create user in DB
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/create', {
                // send user info
                phone_number: phone,
                password: password,
            });
            // success block
            toast.success('Аккаунт создан. Перенаправление', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 1400);

            // error block
        } catch (error) {
            if (!error.response) {
                toast.error('Технические неполадки. Пожалуйста, попробуйте позже.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            } else {
                if (error.response.data.phone_number[0] === 'Пользователь с таким Номер телефона уже существует.') {
                    toast.error('Номер телефона уже существует.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.phone_number[0] === 'Введен некорректный номер телефона.') {
                    toast.error('Введите корректный номер телефона.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
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
                                            <h5 className="card-title text-center pb-0 fs-4">Регистрация</h5>
                                            <p className="text-center small">Введите номер телефона и пароль для регистрации</p>
                                        </div>

                                        {/* Form logic and handlers */}
                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="phone" className="form-label">Номер телефона</label>
                                                {/* handle input */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Введите номер телефона"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="password" className="form-label">Пароль</label>
                                                {/* handle input */}
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Введите пароль"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 btn-animate" type="submit">Зарегистрироваться</button>
                                            </div>

                                            {/* Messages on this page */}
                                            <ToastContainer></ToastContainer>

                                            {/* Redirect to login page */}
                                            <div className="col-12">
                                                <Link to='/login'>Уже есть аккаунт?</Link>
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

export default Registration;

