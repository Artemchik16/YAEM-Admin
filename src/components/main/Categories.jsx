// Default import
import React, { useState, useEffect } from 'react';
// HTTP import library
import axios from 'axios';
// Messages import library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import Subcategories from './Subcategories';

function Categories({ establishmentId, onFinishDish }) {

    // State variables for storing establishment data, categories data, loading status, and selected category
    const [establishmentData, setEstablishmentData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Function to fetch establishment data from the backend
        const fetchEstablishmentData = async () => {
            try {
                // Get token value
                const token = sessionStorage.getItem('accessToken');
                // Fetch establishment data
                const establishmentResponse = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
                    // Send token to the backend
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Set establishment data
                setEstablishmentData(establishmentResponse.data);
                setLoading(false);
            } catch (error) {
                // Handle error
                toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 });
                // Reload page if there's an error
                setTimeout(() => { window.location.reload() }, 1400);
            }
        };

        // Function to fetch categories data from the backend
        const fetchCategories = async () => {
            try {
                // Get token value
                const token = sessionStorage.getItem('accessToken');
                // Fetch categories data
                const categoriesResponse = await axios.get('http://localhost:8000/api/v1/menu/categories', {
                    // Send token to the backend
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Set categories data
                setCategories(categoriesResponse.data);
            } catch (error) {
                // Handle error
                toast.error('Ошибка при получении категорий.', { autoClose: 1000 });
            }
        };

        // Call functions to fetch establishment data and categories data
        fetchEstablishmentData();
        fetchCategories();
    }, [establishmentId]);

    // Function to handle click event on a category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Render loading state while fetching data
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Render content after data is fetched
    return (
        <div>
            <h2>Dish - {establishmentData.name} {establishmentData.id}</h2>
            {/* <h2>+ : Add category</h2> */}
            {/* Render categories for loop */}
            <ul>
                {categories.map(category => (
                    // list of all categories from backend, add image?..
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        {category.name}
                    </li>
                ))}
            </ul>

            {/* Conditionally render Subcategories component based on the selected category */}
            {selectedCategory && (
                <Subcategories categoryId={selectedCategory.id} />
            )}

            {/* Button to cancel */}
            <button className="btn btn-danger" onClick={onFinishDish}>Отменить</button>
        </div>
    );
}

export default Categories;
