// Import react
import React, { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import AddDishModal from './modals/dishes/AddDishModal.jsx';


function Dishes({ subcategoryId }) {

    // States and handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    // Modals handlers
    const [addModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => { setAddModalOpen(!addModalOpen); };

    // Get request on backend, get all dish subcat
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const dishesResponse = await axios.get(`http://localhost:8000/api/v1/menu/dishes/?food_type_id=${subcategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setDishes(dishesResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при получении блюд.', { autoClose: 1000 });
                setLoading(false);
            }
        };
        fetchDishes();
    }, [subcategoryId]);

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    return (
        <div className="container my-2 px-0">
            <h2 className="">Блюда
                <div className="btn shadow-0 btn-outline-success btn-animate px-3 mx-2"
                    onClick={toggleAddModal}>
                    <i className="far fa-square-plus"></i>
                </div>
            </h2>
            <div className='row'>
                {dishes.map(dish => (
                    <div className='col-auto'>
                        <div className="card my-1 shadow-lg" style={{ width: '288px' }}>
                            <div className="card-body px-0 py-0">
                                <>
                                    {/* Render dish data from backend */}
                                    <div className="row">
                                        {/* Image */}
                                        <div className="col-6">
                                            <img className="card-img px-0" src={dish.image} style={{ maxWidth: '300px' }}></img>
                                        </div>
                                        {/* Name */}
                                        <div className="col-6 my-auto ps-0">
                                            <h5 className="card-title mx-0 px-0 my-auto" key={dish.id}>{dish.name}</h5>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <p className="my-2 ms-3 fs-6 text-muted">{dish.description}</p>
                                    <hr className="px-0 my-0" />
                                    <div className="row mx-0">
                                        <div className="col-4">
                                            {/* Old price */}
                                            {dish.old_price > 0 && (
                                                <del>
                                                    <p className="my-1 ms-3 fs-6">{dish.old_price} ₸</p>
                                                </del>
                                            )}
                                            {/* Actual price */}
                                            <p className="my-1 ms-3 fs-6 fw-bold">{dish.actual_price} ₸</p>
                                        </div>
                                        <div className="col-4">
                                            {/* Stop */}
                                            <p className="my-1 ms-3 fs-6">{dish.stop ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>} <i className="fas fa-hand"></i></p>
                                            {/* Popular */}
                                            <p className="my-1 ms-3 fs-6">{dish.popular ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>} <i className="fas fa-star" style={{ 'color': 'gold' }}></i></p>
                                        </div>
                                        <div className="col-4">
                                            {/* Spicy */}
                                            <p className="my-1 ms-3 fs-6">{dish.spicy ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>} <i className="fas fa-pepper-hot text-danger"></i></p>
                                            {/* Vegetarian */}
                                            <p className="my-1 ms-3 fs-6">{dish.vegetarian ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>} <i className="fas fa-seedling text-success"></i></p>
                                        </div>
                                    </div>
                                    <small className="card-text"></small>
                                    <hr className="my-0" />
                                    <div className="d-flex flex-wrap justify-content-evenly text-center my-1">
                                        {/* Handle edit */}
                                        <div className="btn btn-animate btn-outline-dark my-1" style={{ width: '70px' }}>
                                            <i className="fas fa-pen fa-lg"></i>
                                        </div>
                                        {/* Handle delete */}
                                        <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}>
                                            <i className="fas fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>


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

        </div>
    );
}

export default Dishes;
