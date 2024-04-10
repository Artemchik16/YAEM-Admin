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
            <h5 className="mb-3">Блюда
                <div className="btn shadow-0 btn-outline-success btn-animate px-3 mx-2"
                    onClick={toggleAddModal}>
                    <i className="far fa-square-plus"></i>
                </div>
            </h5>
            <div className='row'>
                {dishes.map(dish => (
                    <div className='col-auto my-2 mx-auto'>
                        <div className={`card shadow${dish.stop ? ' border border-danger' : ''}`} style={{ width: '288px' }}>
                            <div className="card-body px-0 py-0">
                                <>
                                    {/* Render dish data from backend */}
                                    <div className="row mx-0 px-0" style={{ minHeight: '84px' }}>
                                    {/* Image */}
                                        {dish.image ? <div className="col-3 mx-0 px-0">
                                            <img className="img px-0 rounded-start" src={dish.image} style={{ maxWidth: '72px' }}></img>
                                        </div>
                                        : '' }
                                    {/* Name */}
                                        <div className="col my-auto mx-1">
                                            {
                                            dish.stop ? <del><span className="fw-bold " key={dish.id}>{dish.name}</span> <i class="mx-1 text-danger fas fa-ban"></i></del>  :
                                            <span className="fw-bold" key={dish.id}>{dish.name}
                                                {dish.popular ? <i className="fas fa-star fa-sm mx-1" style={{ 'color': 'gold' }}></i> : <i className=""></i>}
                                                {dish.spicy ? <i className="fas fa-pepper-hot text-danger fa-sm mx-1"></i> : <i className=""></i>}
                                                {dish.vegetarian ? <i className="fas fa-seedling text-success fa-sm mx-1"></i> : <i className=""></i>}
                                            </span>
                                            }
                                        </div>
                                        <p className="mx-2 my-2 text-muted text-truncate lh-1 small">{dish.description}</p>
                                    </div>
                                    {/* Description */}

                                    <hr className="px-0 my-0" />
                                    <div className="row mx-0 my-2" style={{ height: '26px' }}>
                                        <div className="col my-auto">
                                            {/* Old price */}
                                            {dish.old_price > 0 && (
                                            <del>
                                                <small className="my-1">{dish.old_price} ₸</small>
                                            </del>
                                            )}
                                            {/* Actual price */}
                                            <small className="ms-3 my-auto fw-bold">{dish.actual_price} ₸</small>
                                        </div>
                                        <div className="col text-end my-auto">
                                            <i className="fas fa-pen mx-4 fa-lg btn-animate"></i>
                                            <i className="fas fa-trash text-danger btn-animate fa-lg mx-2"></i>
                                        </div>
                                    </div>
                                    <small className="card-text"></small>
{/*                                     <hr className="my-0" /> */}
{/*                                     <div className="d-flex flex-wrap justify-content-evenly text-center my-1"> */}
{/*                                          */}{/* Handle edit */}
{/*                                         <div className="btn btn-animate btn-outline-dark my-1" style={{ width: '70px' }}> */}
{/*                                             <i className="fas fa-pen fa-lg"></i> */}
{/*                                         </div> */}
{/*                                          */}{/* Handle delete */}
{/*                                         <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}> */}
{/*                                             <i className="fas fa-trash fa-lg"></i> */}
{/*                                         </div> */}
{/*                                     </div> */}
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
