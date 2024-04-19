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
import { MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
// Import errors
import { registrationErrors } from '../utils/Errors';
// Import urls
import apiUrls from "../utils/ApiUrls";
// Import image
import logo from '../../assets/images/favicon.png';


export default function Registration() {

    // Set phone number state
    const [phoneNumber, setPhoneNumber] = useState('');
    // Set password state
    const [password, setPassword] = useState('');
    // Set success state
    const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);
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
    // Register handler for registration form, validations
    const handleRegistrationForm = async (e) => {
        // Prevent default form behavior
        e.preventDefault();
        // Format phoneNumber
        const formattedPhone = formatPhoneNumber(phoneNumber);
        // Checking if the phone number not matches the pattern
        if (!phoneNumberPattern.test(phoneNumber)) {
            // Disabled register button and set disabled time
            setIsRegisterButtonClicked(true)
            setTimeout(() => { setIsRegisterButtonClicked(false); }, 2000);
            // Display message
            toast.error('Пожалуйста, укажите корректный номер.', { autoClose: 1300, pauseOnHover: false, position: "top-center" });
            return;
        }
        // Post request to backend and create user in DB and login
        try {
            // Disabled register button and set disabled time
            setIsRegisterButtonClicked(true)
            setTimeout(() => { setIsRegisterButtonClicked(false); }, 2200);
            // Send request on backend and get response
            await axios.post(apiUrls.createUser, {
                phone_number: phoneNumber,
                password: password,
            })
            // Mesaage
            toast.success('Аккаунт создан. Перенаправление.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
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
            registrationErrors(error)
        }
    };
    // BLOCK HTML
    return (
        <main>
            <div className="container-fluid background">
                <section className="section register min-vh-100 d-flex flex-column align-items-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-3">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img className="mx-auto my-4 text-center" style={{ maxHeight: '30px' }} src={logo} alt="YAEM logo" />
                                        <span className="fs-3 fw-bold yaem-color mx-2">YAEM.KZ</span>
                                    </div>
                                </div>
                                <div className="card mb-3 shadow-lg" data-aos="fade-out">
                                    <div className="card-body">
                                        <div className="my-4">
                                            <h5 className="card-title text-center fs-4">Регистрация</h5>
                                        </div>

                                        {/* handleRegistrationForm */}
                                        <form className="row g-3 needs-validation" onSubmit={handleRegistrationForm}>
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
                                                {/* Offer_check */}
                                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Я принимаю условия' required />
                                                <a href="public/Public_offer_yaem.pdf" target="_blank" rel="noopener noreferrer">публичной офферты</a>
                                            </div>


                                            {/* Register button */}
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-success w-100 btn-animate"
                                                    type="submit"
                                                    disabled={isRegisterButtonClicked}>
                                                    Зарегистрироваться
                                                </button>
                                            </div>

                                            {/* Messages block on this page */}
                                            <ToastContainer></ToastContainer>
                                            {/* Redirect to login page */}
                                            <div className="col-12 my-0">
                                                <small>Уже есть аккаунт?<Link to='/login'> Войти</Link></small>
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
