import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subcategories from './Subcategories';
import AddCategoryModal from './modals/categories/AddCategoryModal.jsx';
import RemoveCategoryModal from './modals/categories/RemoveCategoryModal.jsx';
import EditCategoryModal from './modals/categories/EditCategoryModal.jsx';
import { MDBTable, MDBTableHead } from 'mdb-react-ui-kit';

function Categories({ establishmentId, onFinishDish, establishmentUrl }) {
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
                const categoriesResponse = await axios.get(`https://yaem.kz/api/v1/menu/categories?client_id=${establishmentId}`, {
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
        return  <div className="container text-center">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="container-fluid mx-0 px-0">
            <div className="row mx-0 px-0">
                <div className="col-2 mx-0 px-0">
                    <div data-aos="fade-in" data-aos-delay="100" className="btn shadow-0 btn-animate my-auto" onClick={onFinishDish}>
                        <i className="fas fa-arrow-left-long fa-lg"></i>
                    </div>
                </div>
                <div className="col-8 mx-0 px-0 my-1">
                    <h3 className="text-truncate">ЗАВЕДЕНИЕ</h3>
                </div>
                <div className="col-2 text-end mx-0 px-0">
                    <a href={`https://yaem.kz/${establishmentUrl}/menu`} target="_blank" className="mx-0 px-0">
                        <div data-aos="fade-in"  className="btn shadow-0 btn-animate my-auto text-nowrap text-dark">В меню
                        <i className="fas fa-arrow-right-long fa-lg ms-1"></i>
                        </div>
                    </a>
                </div>
            </div>
            <hr className="mt-2" />

            <h2 className="mt-3 mb-2">Разделы
                <div className="btn shadow-0 text-success btn-animate mx-1 px-2 py-0" onClick={toggleAddModal}>
                    <i className="far fa-square-plus fa-2x"></i>
                </div>
                {selectedCategoryId && (
                    <div className="d-inline">
                        <div className="btn shadow-0 btn-animate my-auto mx-1 px-3 py-0" onClick={toggleEditModal}>
                            <i className="fas fa-pen fa-2x"></i>
                        </div>
                        <div className="btn shadow-0 text-danger btn-animate my-auto mx-1 px-2 py-0" onClick={toggleRemoveModal}>
                            <i className="fas fa-trash fa-2x"></i>
                        </div>
                    </div>
                )}
            </h2>

            <MDBTable responsive hover small align='middle' className="text-center">
                <MDBTableHead>
                    <tr>
                        {categories.map(category => (
                            <th data-aos="fade-in" scope='col' key={category.id}>
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

            {selectedCategoryId && (
                <Subcategories categoryId={selectedCategoryId} />
            )}

            <AddCategoryModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                establishmentId={establishmentId}
                updateCategories={setCategories}
                setSelectedCategoryId={setSelectedCategoryId}
                setSelectedCategory={setSelectedCategory}
            />
            {selectedCategoryId && (
                <EditCategoryModal
                    open={editModalOpen}
                    setOpen={setEditModalOpen}
                    establishmentId={establishmentId}
                    categoryId={selectedCategory ? selectedCategory.id : null}
                    setSelectedCategoryId={setSelectedCategoryId}
                    setSelectedCategory={setSelectedCategory}
                    updateCategories={setCategories}
                />
            )}
            <RemoveCategoryModal
                open={removeModalOpen}
                setOpen={setRemoveModalOpen}
                establishmentId={establishmentId}
                categoryId={selectedCategory ? selectedCategory.id : null}
                categoryName={selectedCategory ? selectedCategory.name : null}
                updateCategories={setCategories}
                setSelectedCategoryId={setSelectedCategoryId}
            />
        </div>
    );
}

export default Categories;
