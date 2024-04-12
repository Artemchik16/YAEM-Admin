import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/favicon.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBInput } from 'mdb-react-ui-kit'


function Registration() {

    // Set handlers and values
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);
    const phoneNumberPattern = /^(\+7|8)\d{10}$/;
    const navigate = useNavigate();

    // Register handler for registration form
    const handleRegistration = async (e) => {
        // Prevent default form behavior
        e.preventDefault();
        const formattedPhone = formatPhoneNumber(phone);
        // Check is number format correct
        if (!phoneNumberPattern.test(phone)) {
            // Disabled save button button and set disabled time
            setIsRegisterButtonClicked(true)
            setTimeout(() => { setIsRegisterButtonClicked(false); }, 2000);
            // Display message
            toast.error('Пожалуйста, укажите корректный номер.', { autoClose: 1300, pauseOnHover: false, position: "top-center" });
            return;
        }
        // Post request to backend and create user in DB
        try {
            // Disabled save button and set disabled time
            setIsRegisterButtonClicked(true)
            setTimeout(() => { setIsRegisterButtonClicked(false); }, 2200);
            // Send request
            await axios.post('https://yaem.kz/api/v1/auth/create', {
                phone_number: phone,
                password: password,
            });
            // Mesaage
            toast.success('Аккаунт создан. Перенаправление.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
            // Redirect user to login page
            // Send request and get response
            const response = await axios.post('https://yaem.kz/api/v1/auth/jwt/create/', {
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
            // setTimeout(() => { navigate('/login'); }, 1500)
        } catch (error) {
            // Handle error when server is unavailable
            if (!error.response) {
                toast.error('Технические неполадки. Пожалуйста, попробуйте позже.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            }
            // Check if phone is exists
            if (error.response.data.phone_number && error.response.data.phone_number[0] === 'This phone number is already registered.') {
                toast.error('Номер телефона уже существует.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            }
            // Check is number format correct
            if (error.response.data.phone_number && error.response.data.phone_number[0] === 'Введен некорректный номер телефона.') {
                toast.error('Пожалуйста, укажите корректный номер.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            }
            // Check is number format correct
            if (error.response.data.password && error.response.data.password[0] === 'Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.') {
                toast.error('Введённый пароль слишком короткий.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            }
            // Check is number format correct
            if (error.response.data.password && error.response.data.password[0] === 'Введённый пароль слишком широко распространён.') {
                toast.error('Введённый пароль слишком широко распространён.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            }
        }
    };

    // Format phone
    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.startsWith('8')) {
            return phoneNumber.replace('8', '+7');
        }
        return phoneNumber;
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
                                <div className="card mb-3 shadow-lg">
                                    <div className="card-body">
                                        <div className="my-4">
                                            <h5 className="card-title text-center fs-4">Регистрация</h5>
                                        </div>

                                        {/* handleRegistration actions */}
                                        <form className="row g-3 needs-validation" onSubmit={handleRegistration}>
                                            <div className="col-12">
                                                {/* Phine handler */}
                                                <MDBInput
                                                    type="text"
                                                    label="Введите номер телефона"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Password handler */}
                                                <MDBInput
                                                    type="password"
                                                    label="Введите пароль"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {/* Save button handler */}
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-success w-100 btn-animate"
                                                    type="submit"
                                                    disabled={isRegisterButtonClicked}>
                                                    Зарегистрироваться
                                                </button>
                                            </div>

                                            {/* Messages block */}
                                            <ToastContainer></ToastContainer>
                                            {/* Redirect to login page */}
                                            <div className="col-12">
                                                Уже есть аккаунт?<Link to='/login'> Войти</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="credits user-select-none">
                                    <a className="text-dark">Copyright © 2023-2024 <span className="yaem-color fw-bold">YAEM</span> Kazakhstan <i class="flag flag-kazakhstan"></i></a>
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

