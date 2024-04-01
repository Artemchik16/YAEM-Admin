import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subcategories from './Subcategories';

function Categories({ establishmentId, onFinishDish }) {
    const [establishmentData, setEstablishmentData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchEstablishmentData = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const establishmentResponse = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEstablishmentData(establishmentResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 });
                setTimeout(() => { window.location.reload() }, 1400);
            }
        };

        const fetchCategories = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const categoriesResponse = await axios.get('http://localhost:8000/api/v1/menu/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(categoriesResponse.data);
            } catch (error) {
                toast.error('Ошибка при получении категорий.', { autoClose: 1000 });
            }
        };

        fetchEstablishmentData();
        fetchCategories();
    }, [establishmentId]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    return (
        <div>
            <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onFinishDish}>
                <i className="fas fa-arrow-left-long fa-lg"></i>
            </div>
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Разделы
                {categories.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить Раздел
                    </div>
                )}
            </h2>
            <div className="row my-3">
                <div className="col-12 col-lg-auto">
                    <ul className="nav mb-3">
                        <li className="nav-item bg-primary bg-opacity-25 py-1 rounded-7" role="presentation">
                            {categories.map(category => (
                                <a
                                    className="btn btn-rounded btn-secondary mx-2 btn-animate my-1"
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.name}
                                </a>
                            ))}
                        </li>
                    </ul>
                </div>
                {/* show this block if user have any categories */}
                {categories.length > 0 && (
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
            {/* Conditionally render Subcategories component based on the selected category */}
            {/* {selectedCategory && (
                <Subcategories categoryId={selectedCategory.id} />
            )} */}
        </div>
    );
}

export default Categories;
