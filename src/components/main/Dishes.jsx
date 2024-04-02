import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dishes({ subcategoryId }) {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const dishesResponse = await axios.get(`http://localhost:8000/api/v1/menu/dishes/?food_type_id=${subcategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        <div className="container my-5 px-0">
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Блюда
                    <div className="btn shadow-0 btn-outline-success btn-animate px-3 mx-2">
                        <i className="far fa-square-plus"></i>
                    </div>
            </h2>
{dishes.map(dish => (
            <div className="card mx-auto my-3 shadow-lg" style={{ width: '300px' }}>
                        <div className="card-body px-0 py-0">

                                <>
                                    {/* Render establishment data from backend */}
                                    <div className="row">
                                    <div className="col-6">
                                        <img className="card-img px-0" src={dish.image} style={{ maxWidth: '300px' }}></img>
                                    </div>
                                    <div className="col-6 my-auto ps-0">
                                        <h5 className="card-title mx-0 px-0 my-auto" key={dish.id}>{dish.name}</h5>
                                    </div>
                                    </div>


                                    {/* Button to open DetailEstablishment component */}
                                    <p className="my-2 ms-3 fs-6 text-muted">{dish.description}</p>
{/*                                      <input type="file" class="form-control" id="inputGroupFile01"/> */}
                                    <hr className="px-0 my-0"/>
                                    <div className="row mx-0">
                                        <div className="col-4">
                                       <del><p className="my-1 ms-3 fs-6">{dish.old_price} 1000 ₸</p></del>
                                        <p className="my-1 ms-3 fs-6 fw-bold">{dish.actual_price} ₸</p>
                                        </div>
                                        <div className="col-4">
                                        <p className="my-1 ms-3 fs-6"><i class="fas fa-check text-success"></i> <i class="fas fa-xmark text-danger"></i>{dish.stop} <i class="fas fa-hand"></i></p>
                                        <p className="my-1 ms-3 fs-6"><i class="fas fa-check text-success"></i> <i class="fas fa-xmark text-danger"></i>{dish.stop} <i class="fas fa-star" style={{'color': 'gold'}}></i></p>
                                        </div>
                                        <div className="col-4">
                                        <p className="my-1 ms-3 fs-6"><i class="fas fa-check text-success"></i> <i class="fas fa-xmark text-danger"></i>{dish.stop} <i class="fas fa-pepper-hot text-danger"></i></p>
                                        <p className="my-1 ms-3 fs-6"><i class="fas fa-check text-success"></i> <i class="fas fa-xmark text-danger"></i>{dish.stop} <i class="fas fa-seedling text-success"></i></p>
                                        </div>
                                    </div>

                                    {/* <p className="card-text text-muted">{establishments[key].address}</p> */}
                                    <small className="card-text"></small>
                                    {/* <img src={establishments[key].logo}/> */}
                                    <hr className="my-0"/>
                                    <div className="d-flex flex-wrap justify-content-evenly text-center my-1">
                                        {/* Render action buttons */}
                                        {/* Button to redirect on yaem.kz menu */}

                                        {/* Button to open Dishes component */}
                                        <div className="btn btn-animate btn-outline-dark my-1" style={{ width: '70px' }}>
                                            <i className="fas fa-pen fa-lg"></i>
                                        </div>

                                        {/* Button to trigger deletion confirmation */}
                                        <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}>
                                            <i className="fas fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </>
                        </div>
                    </div>
  ))}


        </div>
    );
}

export default Dishes;
