// Import react
import React, { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import Subcategories from './Subcategories';
import AddCategoryModal from './modals/categories/AddCategoryModal.jsx';
import RemoveCategoryModal from './modals/categories/RemoveCategoryModal.jsx';
import EditCategoryModal from './modals/categories/EditCategoryModal.jsx';


function Categories({ establishmentId, onFinishDish }) {

    // States and handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    // Modals handlers
    const [addModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => { setAddModalOpen(!addModalOpen); };
    const [editModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => { setEditModalOpen(!editModalOpen); };
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const toggleRemoveModal = () => { setRemoveModalOpen(!removeModalOpen); };

    // Get request on backend, get all est categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
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

    // Handle clicked category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedCategoryId(category.id);
    };

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    return (
        <div className="container">
            <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onFinishDish}>
                <i className="fas fa-arrow-left-long fa-lg"></i>
            </div>
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Разделы
                {categories.length === 0 && (
                    // Handle add modal
                    <div className="btn shadow-0 btn-outline-success btn-animate px-2 mx-2"
                        onClick={toggleAddModal}>
                        <i className="far fa-square-plus me-2"></i>
                        Добавить Раздел
                    </div>
                )}
                {/* show this block if user have any categories */}
                {categories.length > 0 && (
                    <div className="col my-3">
                        {/* Handle add modal */}
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-success ms-1 me-1 px-3"
                            onClick={toggleAddModal}>
                            <i className="far fa-square-plus fa-lg"></i>
                        </div>
                        {/* Handle edit modal */}
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3"
                            onClick={toggleEditModal}>
                            <i className="fas fa-pen"></i>
                        </div>
                        {/* Handle remove modal */}
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3"
                            onClick={toggleRemoveModal}>
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                    </div>
                )}
            </h2>
            <div className="btn-group shadow-0" role="group" aria-label="Basic example">
                {/* For loop, display categories and handle click */}
                {categories.map(category => (
                    <button
                        key={category.id}
                        type="button"
                        className={`btn btn-outline-secondary btn-animate ${category.id === selectedCategoryId ? 'active' : ''}`}
                        data-mdb-color="dark"
                        onClick={() => handleCategoryClick(category)}
                        style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#ff9753' }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            {/* Conditionally render Subcategories component based on the selected category */}
            {selectedCategory && categories.length > 0 &&(
                <Subcategories categoryId={selectedCategory.id} />
            )}
            {/* Modals component block */}
            <AddCategoryModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                establishmentId={establishmentId}
                updateCategories={setCategories}
            />
            <EditCategoryModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                establishmentId={establishmentId}
                categoryId={selectedCategory ? selectedCategory.id : null}
                categoryName={selectedCategory ? selectedCategory.name : null}
                updateCategories={setCategories}
            />
            <RemoveCategoryModal
                open={removeModalOpen}
                setOpen={setRemoveModalOpen}
                establishmentId={establishmentId}
                categoryId={selectedCategory ? selectedCategory.id : null}
                categoryName={selectedCategory ? selectedCategory.name : null}
                updateCategories={setCategories}
            />
        </div>
    );
}

export default Categories;
