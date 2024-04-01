import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subcategories from './Subcategories';

function Categories({ establishmentId, onFinishDish }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const categoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(categoriesResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при получении категорий.', { autoClose: 1000 });
                setLoading(false);
            }
        };

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
            <h2 className="my-3">Категории
                {categories.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить Категорию
                    </div>
                )}
            </h2>
            <ul className="list-group">
                {categories.map(category => (
                    <li
                        className="list-group-item"
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
            <div className="row my-3">
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
            {selectedCategory && (
                <Subcategories categoryId={selectedCategory.id} />
            )}
        </div>
    );
}

export default Categories;
