// Import react
import React, { useState, useEffect } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function AddSubcategoryModal({ open, setOpen, categoryId, updateSubcategories }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [subcategoryName, setSubcategoryName] = useState(null);
    const [subcategoryZindex, setSubcategoryZindex] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Reset all fields when the modal closes
    useEffect(() => {
        if (!open) {
            resetFields();
        }
    }, [open]);

    // Function to reset all input fields
    const resetFields = () => {
        setSubcategoryName('');
        setSubcategoryZindex('');
    };

    // Post request on backend, create category
    const handleAddSubcategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => { setIsSaving(false); }, 2000);
        try {
            await axios.post('https://yaem.kz/api/v1/menu/subcategories/', {
                category_id: categoryId,
                name: subcategoryName,
                z_index: subcategoryZindex
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setIsSaving(false);
            // Update displayed categories list
            const updateSubcategoriesResponse = await axios.get(`https://yaem.kz/api/v1/menu/subcategories?category_id=${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateSubcategories(updateSubcategoriesResponse.data)
            setOpen(false);
            toast.success('Категория успешно добавлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 50 символов.') {
                    toast.error('Название категории не может содержать более 50 символов', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.z_index && error.response.data.z_index[0] === 'Введите правильное число.') {
                    toast.error('Порядок отображения должен быть числом.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        // Modal handlers
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить категорию</MDBModalTitle>
                        {/* Close handler */}
                        <MDBBtn className='btn-close'
                            color='none'
                            onClick={handleCloseModal}>
                        </MDBBtn>
                    </MDBModalHeader>
                    <form onSubmit={handleAddSubcategory}>
                        <MDBModalBody>
                            {/* Name handler */}
                            <MDBInput
                                label='Наименование категории'
                                type='text'
                                placeholder="Супы"
                                value={subcategoryName}
                                onChange={(e) => setSubcategoryName(e.target.value)}
                            />
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="1-99"
                                type='text'
                                value={subcategoryZindex}
                                onChange={(e) => setSubcategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            {/* Success, close handlers */}
                            <MDBBtn color="success" onClick={handleAddSubcategory} disabled={isSaving || (!subcategoryName || !subcategoryZindex)}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddSubcategoryModal;
