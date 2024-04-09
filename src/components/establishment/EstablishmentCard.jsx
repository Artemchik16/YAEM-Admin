// Base import
import React, { useState } from "react";
// HTTP import library
import axios from "axios";
// Messages import library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRModal from "./modals/establishments/QRModal";


function EstablishmentCard({ establishments, onEdit, onEditDishes, updateEstablishments }) {

    // is used to handle the establishment edit event and calls the onEdit function, passing it the establishmentId.
    const handleEdit = (establishmentId) => { onEdit(establishmentId); };
    // is used to handle the dishes edit event and calls the onEditDish function, passing it the establishmentId.
    const handleEditDish = (establishmentId) => { onEditDishes(establishmentId); };
    // State for deleted establishments and confirmation of deletion
    const [deletedEstablishments, setDeletedEstablishments] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [selectedEstablishmentUrl, setSelectedEstablishmentUrl] = useState('');
    const [selectedEstablishmentName, setSelectedEstablishmentName] = useState('');
    const handleQRButtonClick = (establishmentUrl, establishmentName) => {
        setSelectedEstablishmentUrl(establishmentUrl);
        setSelectedEstablishmentName(establishmentName);
        setShowQRModal(true);
    };
    // Function to handle establishment deletion on establishment ID
    const handleDeleteEstablishment = async (EstablishmentID, key) => {
        try {
            // Get token from session storage
            const token = sessionStorage.getItem('accessToken');
            // Send delete request to the backend
            await axios.delete(
                `http://localhost:8000/api/v1/menu/clients/${EstablishmentID}`,
                {
                    // Send token on backend
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Success block
            // Notify user about successful deletion
            toast.warning('Заведение удалено.', { autoClose: 2000 })
            // Another request on backend
            const updatedEstablishmentsResponse = await axios.get('http://localhost:8000/api/v1/menu/clients/', {
                // Send token on backend
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            updateEstablishments(updatedEstablishmentsResponse.data);
            // Update the list of deleted establishments
            // setDeletedEstablishments([...deletedEstablishments, key]);
            // Error block
        } catch (error) {
            // Notify user about deletion error
            toast.error('Ошибка при удалении заведения', { autoClose: 2000 })
        }
    };

    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-evenly">
                {/* Loop through the establishments data */}
                {Object.keys(establishments).map((key) => (
                    // Render the establishment card if it's not deleted
                    !deletedEstablishments.includes(key) &&
                    // delete animation
                    <div key={key} className={`card mx-2 my-2${deletedEstablishments.includes(key) ? '' : ''}`} style={{ width: '400px' }}>
                        <div className="card-body px-0 py-0">
                            {/* Check if deletion confirmation is active */}
                            {confirmDelete === key ? (
                                <div className="container">
                                    {/* Render deletion confirmation message */}
                                    <p>Безвозвратно удалить заведение "{establishments[key].name}"?</p>
                                    <div className="d-flex justify-content-center">
                                        {/* Button to confirm deletion */}
                                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDeleteEstablishment(establishments[key].id, key)}>Да, удалить</button>
                                        {/* Button to cancel deletion */}
                                        <button className="btn btn-sm btn-success" onClick={() => setConfirmDelete(null)}>Отмена</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Render establishment data from backend */}
                                    <img className="card-img-top px-0" loading="lazy" src={establishments[key].logo} style={{ maxWidth: '400px' }}></img>
                                    <h5 className="card-title mx-3">{establishments[key].name}
                                        {/* Button to open DetailEstablishment component */}
                                        <div className="btn btn-animate my-1 shadow-0 px-2 py-1" onClick={() => handleEdit(establishments[key].id)}>
                                            <i className="fas fa-pen fa-lg"></i>
                                        </div>
                                        <p className="my-3 fs-6">г.{establishments[key].city}</p>
                                    </h5>
                                    {/* <p className="card-text text-muted">{establishments[key].address}</p> */}
{/*                                     <small className="card-text ms-3">{establishments[key].description}</small> */}
                                    {/* <img src={establishments[key].logo}/> */}
                                    <hr />
                                    <div className="note note-info mx-3">
                                        <span class="badge badge-primary d-block">Пробный период</span>
                                        <span class="badge badge-warning d-block">Тариф Бронза</span>
                                        <span class="badge badge-light d-block">Тариф Серебро</span>
                                        <span class="badge badge-danger d-block">Тариф не оплачен</span>
                                        <p className="text-center fw-bold my-0"><small>Действует до 24/04/24</small></p>
                                    </div>


                                    <hr />
                                    <div className="d-flex flex-wrap justify-content-evenly text-center my-3">
                                        {/* Render action buttons */}
                                        {/* Button to open QR code */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }} onClick={() => handleQRButtonClick(establishments[key].url_name, establishments[key].name)}>
                                            <i className="fas fa-qrcode fa-lg"></i>
                                        </div>
                                        {showQRModal && <QRModal open={showQRModal} establishmentUrl={selectedEstablishmentUrl} establishmentName={selectedEstablishmentName} onClose={() => setShowQRModal(false)} />}
                                        {/* Button to open Dishes component */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }} onClick={() => handleEditDish(establishments[key].id)}>
                                            <i className="fas fa-book-open fa-lg"></i>
                                        </div>

                                        {/* Button to trigger deletion confirmation */}
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
