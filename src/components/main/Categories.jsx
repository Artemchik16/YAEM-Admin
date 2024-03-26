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
        return <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>;
    }

    // Render content after data is fetched
    return (
<div>
<div className="btn shadow-0 btn-animate my-auto btn-outline-dark">
          <i class="fas fa-arrow-left-long fa-lg"></i>
</div>
<h2 className="my-3">Разделы
    <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-2 mx-2">
          <i className="far fa-square-plus me-2"></i>
          Добавить Раздел
    </div>
</h2>



<div className="row my-3">
        <div className="col-12 col-lg-auto">
            <ul className="nav mb-3">
              <li className="nav-item bg-primary bg-opacity-25 py-1 rounded-7" role="presentation">
                {categories.map(category => (
                  <a
                    href="#"
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
    </div>

            {/* Conditionally render Subcategories component based on the selected category */}
            {selectedCategory && (
                <Subcategories categoryId={selectedCategory.id} />
            )}
        </div>
    );
}

export default Categories;
