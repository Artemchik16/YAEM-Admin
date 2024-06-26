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
import { MDBTable, MDBBadge, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

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
            if (categoryId) {
                try {
                    const subcategoriesResponse = await axios.get(`https://yaem.kz/api/v1/menu/subcategories/?category_id=${categoryId}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    });
                    setSubcategories(subcategoriesResponse.data);
                    setLoading(false);
                    setSelectedSubcategory(null);
                    setSelectedSubcategoryId(null);
                } catch (error) {
                    toast.error('Ошибка при получении подкатегорий.', { autoClose: 1000 });
                    setLoading(false);
                }
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    // Handle clicked subcategory
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSelectedSubcategoryId(subcategory.id);
    };

    if (loading) {
        return <div className="container text-center">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="container-fluid mx-0 px-0">
            {/* show this block if user has not any categories */}
            <h4 className="mt-2 mb-0">Категории
                <div className="btn shadow-0 text-success btn-animate mx-1 px-2 py-0"
                    onClick={toggleAddModal}>
                    <i className="far fa-square-plus fa-2x"></i>
                </div>
                {/* show this block if user have any categories */}
                {selectedSubcategoryId && (
                    <div className="d-inline">
                        {/* Handle edit modal */}
                        <div className="btn shadow-0 btn-animate my-auto mx-1 px-3 py-0"
                            onClick={toggleEditModal}>
                            <i className="fas fa-pen fa-2x"></i>
                        </div>
                        {/* Handle remove modal */}
                        <div className="btn shadow-0 text-danger btn-animate my-auto mx-1 px-2 py-0"
                            onClick={toggleRemoveModal}>
                            <i className="fas fa-trash fa-2x"></i>
                        </div>
                    </div>
                )}
            </h4>

            {/* For loop, display subcategories and handle click */}
            <MDBTable responsive hover small align='middle' className="text-center my-2">
                <MDBTableHead>
                    <tr>
                        {subcategories.map(subcategory => (
                            <th className="mx-0 px-1" scope='col'>
                                <div className='position-relative d-inline-block mt-1 user-select-none'>
                                    <button
                                        key={subcategory.id}
                                        type="button"
                                        className={`btn btn-outline-dark btn-animate text-nowrap btn-sm mx-0 px-1  ${subcategory.id === selectedSubcategoryId ? 'active' : ''}`}
                                        data-mdb-color="dark"
                                        onClick={() => handleSubcategoryClick(subcategory)}
                                        style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#ff9753' }}
                                    >
                                        {subcategory.name}
                                    </button>
                                    <MDBBadge color='secondary' light pill className='position-absolute translate-middle border'>
                                      {subcategory.z_index}
                                      <span class="visually-hidden">unread messages</span>
                                    </MDBBadge>
                                </div>
                            </th>
                        ))}
                    </tr>
                </MDBTableHead>
            </MDBTable>

            {/* Conditionally render Dishes component based on the selected subcategory */}
            {selectedSubcategoryId && (
                <Dishes subcategoryId={selectedSubcategory.id} />
            )}
            {/* Modals component block */}
            <AddSubcategoryModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                categoryId={categoryId}
                updateSubcategories={setSubcategories}
            />
            {selectedSubcategoryId && (
                <EditSubcategoryModal
                    open={editModalOpen}
                    setOpen={setEditModalOpen}
                    categoryId={categoryId}
                    setSelectedSubcategoryId={setSelectedSubcategoryId}
                    setSelectedSubcategory={setSelectedSubcategory}
                    subcategoryId={selectedSubcategory ? selectedSubcategory.id : null}
                    subcategoryName={selectedSubcategory ? selectedSubcategory.name : null}
                    updateSubcategories={setSubcategories}
                />
            )}
            <RemoveSubcategoryModal
                open={removeModalOpen}
                setOpen={setRemoveModalOpen}
                categoryId={categoryId}
                setSelectedSubcategoryId={setSelectedSubcategoryId}
                subcategoryId={selectedSubcategory ? selectedSubcategory.id : null}
                subcategoryName={selectedSubcategory ? selectedSubcategory.name : null}
                updateSubcategories={setSubcategories}
            />
        </div>
    );
}

export default Subcategories;
