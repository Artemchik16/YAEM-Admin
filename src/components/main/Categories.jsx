import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subcategories from './Subcategories';

function Categories({ establishmentId, onFinishDish }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
        setSelectedCategoryId(category.id);
    };

    const deleteCategory = async () => {
        try {
            const token = sessionStorage.getItem('accessToken');
            await axios.delete(`http://localhost:8000/api/v1/menu/categories/${selectedCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Обновляем список категорий после успешного удаления
            const updatedCategories = categories.filter(category => category.id !== selectedCategoryId);
            setCategories(updatedCategories);
            // Сбрасываем выбранную категорию
            setSelectedCategory(null);
            setSelectedCategoryId(null);
            toast.success('Категория успешно удалена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            toast.error('Ошибка при удалении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    const updateCategory = async () => {
        // 
    };

    const createCategory = async () => {
        // 
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
                    <div className="btn shadow-0 btn-outline-success btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить Раздел
                    </div>
                )}
                {/* show this block if user have any categories */}
                {categories.length > 0 && (
                    <div className="col my-3">
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-success ms-1 me-1 px-3">
                            <i className="far fa-square-plus fa-lg"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3">
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3" onClick={deleteCategory}>
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                    </div>
                )}
            </h2>
            <div className="btn-group shadow-0" role="group" aria-label="Basic example">
                {categories.map(category => (
                    <button
                        key={category.id}
                        type="button"
                        className={`btn btn-outline-secondary btn-animate ${category.id === selectedCategoryId ? 'active' : ''}`}
                        data-mdb-color="dark"
                        onClick={() => handleCategoryClick(category)}
                        style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#FD7014' }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            {/* Conditionally render Subcategories component based on the selected category */}
            {selectedCategory && (
                <Subcategories categoryId={selectedCategory.id} />
            )}
        </div>
    );
}

export default Categories;
