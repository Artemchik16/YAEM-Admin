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
        <div className="container my-5">
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Подкатегории
                {dishes.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить  Блюдо
                    </div>
                )}
            </h2>
            <ul className="list-group">
                {dishes.map(dish => (
                    <li className="list-group-item" key={dish.id}>
                        {dish.name}
                    </li>
                ))}
            </ul>
            <div className="row my-3">
                {/* show this block if user have any categories */}
                {dishes.length > 0 && (
                    <div className="col-12 col-lg-auto text-end  my-auto">
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-success mx-1 px-3">
                            <i className="far fa-square-plus fa-lg"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3">
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3">
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dishes;
