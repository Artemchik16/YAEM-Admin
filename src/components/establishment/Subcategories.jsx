// Import react
import React, { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import Dishes from './Dishes';
import AddSubcategoryModal from './modals/subcategories/AddSubcategoryModal.jsx';
import RemoveSubcategoryModal from './modals/subcategories/RemoveSubcategoryModal.jsx';
import EditSubcategoryModal from './modals/subcategories/EditSubcategoryModal.jsx';


function Subcategories({ categoryId }) {

    // States and handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    // Modals handlers
    const [addModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => { setAddModalOpen(!addModalOpen); };
    const [editModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => { setEditModalOpen(!editModalOpen); };
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const toggleRemoveModal = () => { setRemoveModalOpen(!removeModalOpen); };

    // Get request on backend, get all subcat categories
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const subcategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/subcategories/?category_id=${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
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

    // Handle clicked subcategory
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSelectedSubcategoryId(subcategory.id);
    };

    return (
        <div className="container my-5 px-0">
            {/* show this block if user has not any categories */}
            <h2 className="my-3">Категории
                {subcategories.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-animate px-2 mx-2"
                        onClick={toggleAddModal}>
                        <i className="far fa-square-plus me-2"></i>
                        Добавить категорию
                    </div>
                )}
                {/* show this block if user have any categories */}
            </h2>
            {subcategories.length > 0 && (
                <div className="col">
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
            {/* For loop, display subcategories and handle click */}
            <div class="btn-group shadow-0 my-4" role="group" aria-label="Basic example">
                {subcategories.map(subcategory => (
                    <button
                        type="button"
                        data-mdb-color="dark"
                        className={`btn btn-outline-secondary btn-animate ${subcategory.id === selectedSubcategoryId ? 'active' : ''}`}
                        key={subcategory.id}
                        onClick={() => handleSubcategoryClick(subcategory)}
                        style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#ff9753' }}
                    >
                        {subcategory.name}
                    </button>
                ))}
            </div>
            {/* Conditionally render Dishes component based on the selected subcategory */}
            {selectedSubcategory && (
                <Dishes subcategoryId={selectedSubcategory.id} />
            )}
            {/* Modals component block */}
            <AddSubcategoryModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                categoryId={categoryId}
                updateSubcategories={setSubcategories}
            />
            <EditSubcategoryModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                categoryId={categoryId}
                subcategoryId={selectedSubcategory ? selectedSubcategory.id : null}
                subcategoryName={selectedSubcategory ? selectedSubcategory.name : null}
                updateSubcategories={setSubcategories}
            />
            <RemoveSubcategoryModal
                open={removeModalOpen}
                setOpen={setRemoveModalOpen}
                categoryId={categoryId}
                subcategoryId={selectedSubcategory ? selectedSubcategory.id : null}
                subcategoryName={selectedSubcategory ? selectedSubcategory.name : null}
                updateSubcategories={setSubcategories}
            />
        </div>
    );
}

export default Subcategories;
