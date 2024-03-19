// default imports
import React from "react";
import { Link } from 'react-router-dom';

// images import
import logo from '../../assets/images/favicon1-min.png';

function Login() {
    // js logic

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img className="mx-auto my-4 text-center d-block d-sm-none" style={{ maxHeight: '40px' }} src={logo} alt="YAEM logo" />
                                        <span className="">YAEM.KZ</span>
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Войти в аккаунт</h5>
                                            <p className="text-center small">Введите номер телефона и пароль для входа</p>
                                        </div>

                                        <form className="row g-3 needs-validation">
                                            <div className="col-12">
                                                <label htmlFor="phone" className="form-label">Номер телефона</label>
                                                <input type="text" className="form-control" id="phone" placeholder="Введите номер телефона" required />
                                                <div className="invalid-feedback">
                                                    Пожалуйста, введите номер телефона.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="password" className="form-label">Пароль</label>
                                                <input type="password" className="form-control" id="password" placeholder="Введите пароль" required />
                                                <div className="invalid-feedback">
                                                    Пожалуйста, введите пароль.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Войти</button>
                                            </div>
                                            <div className="col-12">
                                                <Link to='/registration'>Нет аккаунта? Зарегистрируйтесь!</Link>
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

