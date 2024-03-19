// default imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../assets/images/favicon.png';
import logo from '../../assets/images/logo.png';

// create establishment modal component import
import CreateEstablishment from './CreateEstablishment.jsx';

function Main() {
    // js logic
    const [showModal, setShowModal] = useState(false)
    const handleModalOpen = () => { setShowModal(true); };
    const handleModalClose = () => { setShowModal(false); };


    return (
        <div className="section">
            <div className="container mx-1">
                <div className="row">
                    {/* sidebar */}
                    <div className="col-2 col-sm-3 py-4 border-end px-1" style={{minHeight: '860px'}}>
                    <img className="mx-auto my-4 text-center d-block d-sm-none" style={{  maxHeight: '40px' }} src={favicon} alt="YAEM logo" />
                    <img className="mx-auto mb-4 text-center d-none d-sm-block" style={{  maxHeight: '50px' }} src={logo} alt="YAEM logo" />
                    <hr/>
                    <ul className="list-group list-group-light my-3">
                        <li className="list-group-item d-flex justify-content-center">
                            <div className="d-flex">
                               <i class="fas fa-user mx-auto my-auto"></i>
                              <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Профиль</strong></p>

                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-center">
                            <div className="d-flex">
                               <i class="fas fa-utensils mx-auto my-auto"></i>
                                <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Заведения</strong></p>
                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-center align-items-center">
                            <div className="d-flex align-items-center">
                             <i class="fas fa-coins mx-auto my-auto"></i>
                                <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Оплата</strong></p>
                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-center align-items-center">
                            <div className="d-flex align-items-center">
                               <i class="fas fa-right-from-bracket mx-auto my-auto"></i>
                                <p className="mb-0 text-danger d-none d-sm-block mx-2"><strong>Выйти</strong></p>
                            </div>
                          </li>
                        </ul>

                    </div>

                    {/* Establishment list block */}
                    <div className="col-10 col-sm-9 py-5">
                        {/* if showModal=False show this block */}
                        { !showModal && (
                        <>
                        <div className="container">
                        <h2>Заведения</h2>
                        <p>Здесь будет отображен список ваших заведений.</p>
                        <p>Чтобы добавить заведения, нажмите кнопку "Добавить заведения".</p>
                        {/* Button to open the modal */}
                        <button className="btn btn-primary" onClick={handleModalOpen}>Добавить заведение</button>
                        </div>
                        </>
                        )}
                        {/* else render the modal if showModal=True */}
                        {showModal && <CreateEstablishment onClose={handleModalClose} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
