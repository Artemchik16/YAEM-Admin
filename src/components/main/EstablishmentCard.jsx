// base import
import React, { useState } from "react";
// http import
import axios from "axios";
// messages import
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EstablishmentCard({ establishments }) {
    const [deletedEstablishments, setDeletedEstablishments] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleDeleteEstablishment = async (EstablishmentID, key) => {
        try {
            const token = sessionStorage.getItem('accessToken');
            await axios.delete(
                `http://localhost:8000/api/v1/menu/clients/${EstablishmentID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.warning('Заведение удалено.', { autoClose: 2000 })
            setDeletedEstablishments([...deletedEstablishments, key]);
        } catch (error) {
            toast.error('Ошибка при удалении заведения', { autoClose: 2000 })
        }
    };

    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-evenly">
                {/* for loop on backend data */}
                {Object.keys(establishments).map((key) => (
                    !deletedEstablishments.includes(key) &&
                    <div key={key} className={`card mx-2 my-2${deletedEstablishments.includes(key) ? ' fadeOut' : ''}`} style={{ width: '400px' }}>
                        <div className="card-body">
                            {confirmDelete === key ? (
                                <div className="text-center">
                                    <p>Безвозвратно удалить заведение "{establishments[key].name}"?</p>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEstablishment(establishments[key].id, key)}>Да, удалить</button>
                                    <button className="btn btn-sm btn-success" onClick={() => setConfirmDelete(null)}>Нет</button>
                                </div>
                            ) : (
                                <>
                                    {/* Card data */}
                                    <h5 className="card-title">{establishments[key].name}</h5>
                                    <p className="card-text text-muted">{establishments[key].address}</p>
                                    <small className="card-text">{establishments[key].description}</small>
                                    <hr />
                                    <div className="d-flex flex-wrap justify-content-evenly text-center">
                                        {/* buttons */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }}><i className="fas fa-qrcode fa-lg"></i></div>
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }}><i className="fas fa-book-open fa-lg"></i></div>
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }}><i className="fas fa-pen fa-lg"></i></div>
                                        {/* calling up a window with confirmation of deletion when clicked */}
                                        <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}
                                            onClick={() => setConfirmDelete(key)}>
                                            <i className="fas fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EstablishmentCard;
