import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subcategories from './Subcategories';
import AddCategoryModal from './modals/categories/AddCategoryModal.jsx';
import RemoveCategoryModal from './modals/categories/RemoveCategoryModal.jsx';
import EditCategoryModal from './modals/categories/EditCategoryModal.jsx';
import { MDBTable, MDBTableHead } from 'mdb-react-ui-kit';

function Categories({ establishmentId, onFinishDish }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => { setAddModalOpen(!addModalOpen); };
    const [editModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => { setEditModalOpen(!editModalOpen); };
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const toggleRemoveModal = () => { setRemoveModalOpen(!removeModalOpen); };

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
        <div className="container mx-0 px-0">
            <div className="row">
                <div className="col">
                    <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onFinishDish}>
                        <i className="fas fa-arrow-left-long fa-lg"></i>
                    </div>
                </div>
                <div className="col text-end">
                    <div className="btn shadow-0 btn-animate my-auto btn-outline-dark text-nowrap">В меню
                        <i className="fas fa-arrow-right-long fa-lg mx-1"></i>
                    </div>
                </div>
            </div>
            <hr className="mt-2"/>

            <h2 className="mt-3 mb-2">Разделы
                <div className="btn shadow-0 btn-outline-success btn-animate mx-1 px-3" onClick={toggleAddModal}>
                    <i className="far fa-square-plus"></i>
                </div>
                            {selectedCategoryId && categories.length > 0 && (
                <div className="d-inline">
                    <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3" onClick={toggleEditModal}>
                        <i className="fas fa-pen"></i>
                    </div>
                    <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3" onClick={toggleRemoveModal}>
                        <i className="fas fa-trash fa-lg"></i>
                    </div>
                </div>
            )}
            </h2>

            <MDBTable responsive hover small align='middle' className="text-center">
                <MDBTableHead>
                    <tr>
                        {categories.map(category => (
                            <th scope='col' key={category.id}>
                                <button
                                    type="button"
                                    className={`btn btn-outline-dark btn-animate text-nowrap ${category.id === selectedCategoryId ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category)}
                                    style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#ff9753' }}
                                >
                                    {category.name}
                                </button>
                            </th>
                        ))}
                    </tr>
                </MDBTableHead>
            </MDBTable>


            {selectedCategoryId && categories.length > 0 && (
                <Subcategories categoryId={selectedCategoryId} />
            )}
            
            <AddCategoryModal open={addModalOpen} setOpen={setAddModalOpen} establishmentId={establishmentId} updateCategories={setCategories} />
            <EditCategoryModal open={editModalOpen} setOpen={setEditModalOpen} establishmentId={establishmentId} categoryId={selectedCategory ? selectedCategory.id : null} categoryName={selectedCategory ? selectedCategory.name : null} updateCategories={setCategories} />
            <RemoveCategoryModal open={removeModalOpen} setOpen={setRemoveModalOpen} establishmentId={establishmentId} categoryId={selectedCategory ? selectedCategory.id : null} categoryName={selectedCategory ? selectedCategory.name : null} updateCategories={setCategories} />
        </div>
    );
}

export default Categories;
