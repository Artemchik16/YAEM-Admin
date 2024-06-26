// Import react
import React, { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import AddDishModal from './modals/dishes/AddDishModal.jsx';
import EditDishModal from './modals/dishes/EditDishModal.jsx';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';

function Dishes({ subcategoryId }) {

    // States and handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [dishToDelete, setDishToDelete] = useState(null);
    // Modals handlers
    const [addModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => { setAddModalOpen(!addModalOpen); };
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDishId, setSelectedDishId] = useState(null);

    const openEditModal = (dishId) => {
        setSelectedDishId(dishId);
        setEditModalOpen(true);
    };

    // Get request on backend, get all dish subcat
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const dishesResponse = await axios.get(`https://yaem.kz/api/v1/menu/dishes/?food_type_id=${subcategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setDishes(dishesResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при получении позиций.', { autoClose: 1000 });
                setLoading(false);
            }
        };
        fetchDishes();
    }, [subcategoryId]);

    // Function to handle establishment deletion on establishment ID
    const handleDeleteDish = async (dishId, key) => {
        try {
            // Send delete request to the backend
            await axios.delete(
                `https://yaem.kz/api/v1/menu/dishes/${dishId}`,
                {
                    // Send token on backend
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            // Notify user about successful deletion
            toast.warning('Позиция удалена.', { autoClose: 1000 });
            // Remove the deleted dish from the dishes list
            const updatedDishes = dishes.filter(dish => dish.id !== dishId);
            setDishes(updatedDishes);
            // Reset the confirmation prompt
            setConfirmDelete(null);
        } catch (error) {
            // Notify user about deletion error
            toast.error('Ошибка при удалении позиции', { autoClose: 2000 });
        }
    };

    if (loading) {
        return <div className="container text-center">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="my-2 px-0">
            <h3 className="mb-0">Позиции
                <div className="btn shadow-0 text-success btn-animate mx-1 px-2 py-0"
                    onClick={toggleAddModal}>
                    <i className="far fa-square-plus fa-2x"></i>
                </div>
            </h3>
            <div className='row'>
                {dishes.map((dish, index) => (
                    <div className="col-auto my-2 mx-auto" key={index}>
                        {/* Check if this dish needs to be deleted and show the confirmation */}
                        {confirmDelete === index ? (
                            <div className="card shadow text-center" style={{ width: '288px', height: '127px' }}>
                                <div className="card-body px-0 py-0">
                                {/* Render deletion confirmation message */}
                                <p className="my-3"><strong>Безвозвратно</strong> удалить позицию <strong>{dish.name}</strong>?</p>
                                <div className="d-flex justify-content-center text-center">
                                    {/* Button to confirm deletion */}
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDeleteDish(dishToDelete, index)}>Да, удалить</button>
                                    {/* Button to cancel deletion */}
                                    <button className="btn btn-sm btn-success" onClick={() => setConfirmDelete(null)}>Отмена</button>
                                </div>
                                </div>
                            </div>
                        ) : (
                            <div className='col-auto my-2 mx-auto' key={index}>
                                {/* Render the dish card */}
                                <div className='d-inline-block mt-1 user-select-none'>
                                <div className={`card shadow mx-auto position-relative${dish.stop ? ' border border-danger' : ''}`} style={{ width: '288px' }}>
                                    <div className="card-body px-0 py-0">
                                        <>
                                            {/* Render dish data from backend */}
                                            <div className="row mx-0 px-0" style={{ minHeight: '102px' }}>
                                                {/* Image */}
                                                {dish.image ? <div className="col-auto mx-0 px-0">
                                                    <img draggable="false" loading="lazy" className="img px-0 rounded-start" src={dish.image} style={{ maxWidth: '72px', maxHeight: '72px' }} alt={dish.name}></img>
                                                </div>
                                                    : ''}
                                                {/* Name */}
                                                <div className="col my-auto">
                                                    {
                                                        dish.stop ? <del><span className="fw-bold " key={dish.id}>{dish.name}</span> <i className="mx-1 text-danger fas fa-ban"></i></del> :
                                                            <span className="fw-bold" key={dish.id}>{dish.name}
                                                                {dish.popular ? <i className="fas fa-star fa-sm mx-1" style={{ 'color': 'gold' }}></i> : <i className=""></i>}
                                                                {dish.spicy ? <i className="fas fa-pepper-hot text-danger fa-sm mx-1"></i> : <i className=""></i>}
                                                                {dish.vegetarian ? <i className="fas fa-seedling text-success fa-sm mx-1"></i> : <i className=""></i>}
                                                            </span>
                                                    }
                                                </div>
                                                <p className=" my-2 text-muted text-truncate lh-1 small">{dish.description}</p>
                                            </div>
                                            {/* Description */}

                                            <hr className="px-0 my-0" />
                                            <div className="row mx-0 my-2" style={{ height: '26px' }}>
                                                <div className="col my-auto pe-0">
                                                    {/* Old price */}
                                                    {dish.old_price > 0 && (
                                                        <del>
                                                            <small className="my-1">{Number(dish.old_price).toLocaleString()} ₸</small>
                                                        </del>
                                                    )}
                                                    {/* Actual price */}
                                                    <small className="ms-3 my-auto fw-bold">{Number(dish.actual_price).toLocaleString()} ₸</small>
                                                </div>
                                                <div className="col-auto text-end my-auto">
                                                    {/* Button to open edit modal */}
                                                    <i className="fas fa-pen fa-lg btn-animate" onClick={() => openEditModal(dish.id)}></i>
                                                    {/* Button to trigger deletion confirmation */}
                                                    <i className="fas fa-trash text-danger btn-animate fa-lg mx-4" onClick={() => { setDishToDelete(dish.id); setConfirmDelete(index); }}></i>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                    <MDBBadge color='secondary' light pill className='position-absolute top-0 end-0 border'>
                                       #{dish.z_index}
                                      <span class="visually-hidden">unread messages</span>
                                    </MDBBadge>
                                </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modals component block */}
            <AddDishModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                subcategoryId={subcategoryId}
                updateDishes={setDishes}
            />
            {selectedDishId && (
                <EditDishModal
                    open={editModalOpen}
                    setOpen={setEditModalOpen}
                    dishId={selectedDishId}
                    subcategoryId={subcategoryId}
                    updateDishes={setDishes}
                />
            )}
        </div>
    );
}

export default Dishes;
