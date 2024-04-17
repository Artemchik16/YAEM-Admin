// Import react
import React, { useState } from "react";
// Import routers
import { Link, useNavigate } from 'react-router-dom';
// Import axios(HTTP)
import axios from "axios";
// Import toast(messages)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import MDB
import { MDBInput } from 'mdb-react-ui-kit';
// Import errors
import { loginErrors } from '../utils/Errors';
// Import urls
import apiUrls from "../utils/ApiUrls.js";
// Import image
import logo from '../../assets/images/favicon.png';


export default function Login() {

    // Set phone number state
    const [phoneNumber, setPhoneNumber] = useState('');
    // Set password state
    const [password, setPassword] = useState('');
    // Set success state
    const [isLoginButtonClicked, setIsLoginButtonClicked] = useState(false);
    // Set phoneNumber pattern
    const phoneNumberPattern = /^(\+7|8)\d{10}$/;
    // Set navigate value
    const navigate = useNavigate();
    // Format phone number number value
    const formatPhoneNumber = (phoneNumber) => {
        // if 8 first symdol, replace this on +7
        if (phoneNumber.startsWith('8')) {
            return phoneNumber.replace('8', '+7');
        }
        return phoneNumber;
    };
    // Login handler for login form, validations
    const handleLoginForm = async (e) => {
        // Prevent default form behavior
        e.preventDefault();
        // Format phoneNumber
        const formattedPhone = formatPhoneNumber(phoneNumber);
        // Checking if the phone number not matches the pattern
        if (!phoneNumberPattern.test(phoneNumber)) {
            // Disabled login button and set disabled time
            setIsLoginButtonClicked(true)
            setTimeout(() => { setIsLoginButtonClicked(false); }, 2000);
            // Display message
            toast.error('Не корректный номер телефона.', { autoClose: 1300, pauseOnHover: false, position: "top-center" });
            return;
        }
        // Post request to backend and get JWT tokens
        try {
            // Disabled login button and set disabled time
            setIsLoginButtonClicked(true)
            setTimeout(() => { setIsLoginButtonClicked(false); }, 2200);
            // Send request on backend and get response
            const response = await axios.post(apiUrls.loginUser, {
                phone_number: formattedPhone,
                password: password,
            });
            // Get tokens from response and save this in sessionStorage
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            // Save success message in session storage, display on menu page
            sessionStorage.setItem('IsLoginSuccess', 'Добро пожаловать.');
            // Navigate to menu page and reload page and save tokens in sessionStorage
            window.location.reload();
            navigate('/menu');
        } catch (error) {
            // Call error handler
            loginErrors(error)
        }
    };

    // BLOCK HTML
    return (
        <main>
            <div className="container-fluid background">
                <section className="section register min-vh-100 d-flex flex-column align-items-center py-4 d-sm-sone d-block">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-3">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img className="mx-auto my-4 text-center" style={{ maxHeight: '30px' }} src={logo} alt="YAEM logo" />
                                        <span className="fs-3 fw-bold yaem-color mx-2">YAEM.KZ</span>
                                    </div>
                                </div>
                                <div className="card mb-3 shadow-lg" data-aos="fade-in">
                                    <div className="card-body">
                                        <div className="my-4">
                                            <h5 className="card-title text-center fs-4">Войти в аккаунт</h5>
                                        </div>
                                        {/* handleLoginForm */}
                                        <form className="row g-3 needs-validation" onSubmit={handleLoginForm}>

                                            <div className="col-12">
                                                {/* Phone */}
                                                <MDBInput
                                                    type="text"
                                                    label="Введите номер телефона"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="col-12">
                                                {/* Password */}
                                                <MDBInput
                                                    type="password"
                                                    label="Введите пароль"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="col-12">
                                                {/* Login button */}
                                                <button
                                                    className="btn btn-success w-100 btn-animate"
                                                    type="submit"
                                                    disabled={isLoginButtonClicked}
                                                >
                                                    Войти
                                                </button>
                                            </div>
                                            {/* Messages block on this page */}
                                            <ToastContainer></ToastContainer>
                                            {/* Redirect to registration page */}
                                            <div className="col-12 my-1 mx-0">
                                                <small>Нет аккаунта? <Link to='/registration'>Регистрация</Link></small>
                                            </div>
                                            <div className="col-12 my-1 mx-0">
                                                <small>Забыли пароль? <a target="_blank" href="https://wa.me/77713581356?text=Здравствуйте, прошу восстановить пароль для личного кабинета YAEM.%0aНомер телефона:">Тех.Поддержка</a></small>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="credits user-select-none text-center">
                                    <a className="text-dark">Copyright © 2023-2024 <span className="d-block"><span className="yaem-color fw-bold">YAEM</span> Kazakhstan <i class="flag flag-kazakhstan"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
