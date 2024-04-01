import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dishes from './Dishes';

function Subcategories({ categoryId }) {
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const subcategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/subcategories/?category_id=${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSubcategories(subcategoriesResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при получении подкатегорий.', { autoClose: 1000 });
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    return (
        <div className="container my-5">
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Подкатегории
                {subcategories.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить Подкатегорию
                    </div>
                )}
            </h2>
            <ul className="list-group">
                {subcategories.map(subcategory => (
                    <li
                        className="list-group-item"
                        key={subcategory.id}
                        onClick={() => handleSubcategoryClick(subcategory)}
                    >
                        {subcategory.name}
                    </li>
                ))}
            </ul>
            <div className="row my-3">
                {/* show this block if user have any categories */}
                {subcategories.length > 0 && (
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
            {/* Conditionally render Dishes component based on the selected subcategory */}
            {selectedSubcategory && (
                <Dishes subcategoryId={selectedSubcategory.id} />
            )}
        </div>
    );
}

export default Subcategories;
