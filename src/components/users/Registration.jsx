// default imports
import React, { useState } from "react";
// Import redirect and navigation
import { Link, useNavigate } from 'react-router-dom';
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
            toast.success('Успешно!', { autoClose: 1000 });
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 1400);

            // error block
        } catch (error) {
            if (!error.response) {
                toast.error('Технические неполадки. Пожалуйста, попробуйте позже.', { autoClose: 2000 });
            } else {
                toast.error('Пользователь с таким номером телефона уже существует, проверьте правильность введенных данных', { autoClose: 2000 });
            }
        }
    };

    return (
        <div className="registration-container">
            <h2>Регистрация</h2>
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
                    <button className="btn btn-primary w-100 btn-animate" type="submit">Войти</button>
                </div>

                {/* Messages on this page */}
                <ToastContainer></ToastContainer>
            </form>
            <Link to='/login'>Уже есть аккаунт?</Link>
        </div>
    );
}

export default Registration;

