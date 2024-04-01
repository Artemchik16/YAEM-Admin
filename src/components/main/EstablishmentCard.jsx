// Base import
import React, { useState } from "react";
// HTTP import library
import axios from "axios";
// Messages import library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EstablishmentCard({ establishments, onEdit, onEditDishes }) {

    // is used to handle the establishment edit event and calls the onEdit function, passing it the establishmentId.
    const handleEdit = (establishmentId) => { onEdit(establishmentId); };
    // is used to handle the dishes edit event and calls the onEditDish function, passing it the establishmentId.
    const handleEditDish = (establishmentId) => { onEditDishes(establishmentId); };
    // State for deleted establishments and confirmation of deletion
    const [deletedEstablishments, setDeletedEstablishments] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
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
            // Notify user about successful deletion
            toast.warning('Заведение удалено.', { autoClose: 2000 })
            // Update the list of deleted establishments
            setDeletedEstablishments([...deletedEstablishments, key]);
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
                        <div className="card-body">
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
                                    <h5 className="card-title">{establishments[key].name}</h5>
                                    {/* <p className="card-text text-muted">{establishments[key].address}</p> */}
                                    <small className="card-text">{establishments[key].description}</small>
                                    {/* <img src={establishments[key].logo}/> */}
                                    <hr />
                                    <div className="d-flex flex-wrap justify-content-evenly text-center">
                                        {/* Render action buttons */}
                                        {/* Button to redirect on yaem.kz menu */}
                                        <a href={`http://127.0.0.1:8000/${establishments[key].url_name}/menu`} target="_blank">
                                            <div className="btn btn-animate my-1" style={{ width: '70px' }}>
                                                <i className="fas fa-qrcode fa-lg"></i>
                                            </div>
                                        </a>
                                        {/* Button to open Dishes component */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }} onClick={() => handleEditDish(establishments[key].id)}>
                                            <i className="fas fa-book-open fa-lg"></i>
                                        </div>
                                        {/* Button to open DetailEstablishment component */}
                                        <div className="btn btn-animate my-1" style={{ width: '70px' }} onClick={() => handleEdit(establishments[key].id)}>
                                            <i className="fas fa-pen fa-lg"></i>
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
