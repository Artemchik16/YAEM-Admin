// Import react
import React, { useState } from "react";
// Import axios(HTTP)
import axios from "axios";
// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import urls
import apiUrls from "../utils/ApiUrls.js";
// Import components
import QRModal from "./modals/establishments/QRModal";

export default function EstablishmentCard({ establishments, onEdit, onEditDishes, updateEstablishments }) {

    // Get user auth token
    const userToken = sessionStorage.getItem('accessToken');
    // is used to handle the establishment edit event and calls the onEdit function, passing it the establishmentId.
    const handleEdit = (establishmentId) => { onEdit(establishmentId); };
    // is used to handle the dishes edit event and calls the onEditDish function, passing it the establishmentId.
    const handleEditDish = (establishmentId, establishmentUrl, establishmentName) => { onEditDishes(establishmentId, establishmentUrl, establishmentName); };
    // State for deleted establishments and confirmation of deletion
    const [deletedEstablishments, setDeletedEstablishments] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    // QR modal show state
    const [showQRModal, setShowQRModal] = useState(false);
    // State for establishment url
    const [selectedEstablishmentUrl, setSelectedEstablishmentUrl] = useState('');
    // State for establishment name
    const [selectedEstablishmentName, setSelectedEstablishmentName] = useState('');
    // When you click on qr, open the modal and transfer the data there
    const handleQRButtonClick = (establishmentUrl, establishmentName) => {
        setSelectedEstablishmentUrl(establishmentUrl);
        setSelectedEstablishmentName(establishmentName);
        setShowQRModal(true);
    };
    // Function to handle establishment deletion on establishment ID
    const handleDeleteEstablishment = async (EstablishmentID, key) => {
        try {
            // Send delete request to the backend
            await axios.delete(
                `${apiUrls.client}${EstablishmentID}`,
                {
                    // Send token on backend
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            // Add the deleted establishment key to deletedEstablishments state
            setDeletedEstablishments([...deletedEstablishments, key]);
            // Notify user about successful deletion
            toast.warning('Заведение удалено.', { autoClose: 2000 })
            // Another request on backend
            const updatedEstablishmentsResponse = await axios.get(apiUrls.client, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            // Update establishment component after deleting
            updateEstablishments(updatedEstablishmentsResponse.data);
        } catch (error) {
            // Notify user about deletion error
            if (error.response.data.detail && error.response.data.detail == 'Страница не найдена.') {
                toast.error('Ошибка при удалении заведения', { autoClose: 2000 })
            }
        }
    };

    // HTMP block
    return (
        <div className="container mx-0 px-0">
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
                                <div className="container my-3">
                                    {/* Render deletion confirmation message */}
                                    <p><strong>Безвозвратно</strong> удалить заведение и все вложения <strong>{establishments[key].name}</strong>?</p>
                                    <div className="d-flex justify-content-center text-center">
                                        {/* Button to confirm deletion */}
                                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDeleteEstablishment(establishments[key].id, key)}>Да, удалить</button>
                                        {/* Button to cancel deletion */}
                                        <button className="btn btn-sm btn-success" onClick={() => setConfirmDelete(null)}>Отмена</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Display establishment data from backend */}
                                    <div className="row" style={{ minHeight: '100px' }}>
                                        <div className="col">
                                            <h5 className="card-title ms-2 me-0 pe-0">{establishments[key].name}
                                                {/* Button to open DetailEstablishment component */}
                                                <div className="btn btn-animate my-1 shadow-0 ms-1 me-0 px-0 py-0" onClick={() => handleEdit(establishments[key].id)}>
                                                    <i className="fas fa-pen fa-lg"></i>
                                                </div>
                                                <p className="my-3 fs-6 text-muted">г.{establishments[key].city}</p>
                                            </h5>
                                        </div>
                                        <div className="col-auto text-end">
                                            <img className="card-img-top" loading="lazy" src={establishments[key].logo} style={{ maxWidth: '100px', maxHeight: '100px' }}></img>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* Badges, date comparison and processing */}
                                    <div className="note note-info mx-3">

                                        {/* test */}
                                        {establishments[key].tarif_number === "ТЕСТ" && (
                                            <>
                                                {new Date() >= new Date(establishments[key].paid_at) ? (
                                                    <span className="badge badge-danger d-block">Тариф не оплачен</span>
                                                ) : (
                                                    <>
                                                        <span className="badge badge-success d-block">Пробный период</span>
                                                        <p className="text-center fw-bold my-0"><small>Действует до {new Date(establishments[key].paid_at).toLocaleDateString()}</small></p>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {/* bronze */}
                                        {establishments[key].tarif_number === "БРОНЗА" && (
                                            <>
                                                {new Date() >= new Date(establishments[key].paid_at) ? (
                                                    <span className="badge badge-danger d-block">Тариф не оплачен</span>
                                                ) : (
                                                    <span className="badge badge-warning d-block">{establishments[key].tarif_number}</span>
                                                )}
                                                <p className="text-center fw-bold my-0"><small>Действует до {new Date(establishments[key].paid_at).toLocaleDateString()}</small></p>
                                            </>
                                        )}

                                        {/* silver */}
                                        {establishments[key].tarif_number === "СЕРЕБРО" && (
                                            <>
                                                {new Date() >= new Date(establishments[key].paid_at) ? (
                                                    <span className="badge badge-danger d-block">Тариф не оплачен</span>
                                                ) : (
                                                    <span className="badge badge-light d-block">{establishments[key].tarif_number}</span>
                                                )}
                                                <p className="text-center fw-bold my-0"><small>Действует до {new Date(establishments[key].paid_at).toLocaleDateString()}</small></p>
                                            </>
                                        )}
                                    </div>
                                    {/* Render action buttons */}
                                    <div className="d-flex flex-wrap justify-content-evenly text-center my-3">
                                        {/* Button to open QR code */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }}
                                            onClick={() => handleQRButtonClick(establishments[key].url_name, establishments[key].name)}>
                                            <i className="fas fa-qrcode fa-lg"></i>
                                        </div>
                                        {/* Show QR window when clicked */}
                                        {showQRModal &&
                                            <QRModal
                                                open={showQRModal}
                                                establishmentUrl={selectedEstablishmentUrl}
                                                establishmentName={selectedEstablishmentName}
                                                onClose={() => setShowQRModal(false)} />
                                        }

                                        {/* Button to open Dishes component */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }}
                                            onClick={() => handleEditDish(establishments[key].id, establishments[key].url_name, establishments[key].name)}>
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
