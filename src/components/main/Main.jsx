// default imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// create establishment modal component import
import CreateEstablishment from './CreateEstablishment.jsx';

function Main() {
    // js logic
    const [showModal, setShowModal] = useState(false)
    const handleModalOpen = () => { setShowModal(true); };
    const handleModalClose = () => { setShowModal(false); };




    return (
        <div className="container-fluid">
            <div className="row">
                {/* sidebar */}
                <div className="col-md-3">
                    <h2>Меню</h2>
                    <ul className="list-group">
                        <li className="list-group-item"><Link to="/establishments">Заведения</Link></li>
                        <li className="list-group-item"><Link to="/payment">Оплата</Link></li>
                        <li className="list-group-item"><Link to="/logout">Выйти</Link></li>
                    </ul>
                </div>

                {/* Establishment list block */}
                <div className="col-md-9">
                    {/* if showModal=False show this block */}
                    { !showModal && (
                    <>
                    <h2>Заведения</h2>
                    <p>Здесь будет отображен список ваших заведений.</p>
                    <p>Чтобы добавить заведения, нажмите кнопку "Добавить заведения".</p>
                    {/* Button to open the modal */}
                    <button className="btn btn-primary" onClick={handleModalOpen}>Добавить заведение</button>
                    </>
                    )}
                    {/* else render the modal if showModal=True */}
                    {showModal && <CreateEstablishment onClose={handleModalClose} />}
                </div>
            </div>
        </div>
    );
}

export default Main;
