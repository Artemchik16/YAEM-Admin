import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategoryModal({ open, setOpen, establishmentId, updateCategories, setSelectedCategoryId, setSelectedCategory }) {
    // Set initial state for category name, z-index, and saving status
    const [categoryName, setCategoryName] = useState('');
    const [categoryZindex, setCategoryZindex] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Reset all fields when the modal closes
    useEffect(() => {
        if (!open) {
            resetFields();
        }
    }, [open]);

    // Function to reset all input fields
    const resetFields = () => {
        setSelectedCategoryId(null);
        setSelectedCategory(null);
        setCategoryName('');
        setCategoryZindex('');
    };

    // Function to handle adding a new category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => { setIsSaving(false); }, 2000);
        try {
            // Send a POST request to add a new category
            await axios.post('https://yaem.kz/api/v1/menu/categories/', {
                client_id: establishmentId,
                name: categoryName,
                z_index: categoryZindex
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            setIsSaving(false);
            // Fetch updated categories list
            const updateCategoriesResponse = await axios.get(`https://yaem.kz/api/v1/menu/categories?client_id=${establishmentId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            // Update categories state with the new data
            updateCategories(updateCategoriesResponse.data);
            // Reset input fields and close the modal
            resetFields();
            setOpen(false);
            // Show success toast notification
            toast.success('Категория успешно добавлена.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data) {
                // Show error toast notifications based on the error response
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    toast.error('Название раздела не может содержать более 30 символов', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.z_index && error.response.data.z_index[0] === 'Введите правильное число.') {
                    toast.error('Порядок отображения должен быть числом.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                    </MDBModalHeader>
                    <form onSubmit={handleAddCategory}>
                        <MDBModalBody>
                            {/* Input field for category name */}
                            <MDBInput
                                label='Наименование категории'
                                type='text'
                                placeholder="Завтраки"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            {/* Input field for category z-index */}
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="1-99"
                                type='text'
                                value={categoryZindex}
                                onChange={(e) => setCategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            {/* Button to submit the form */}
                            <MDBBtn className="btn-animate" type="submit" color="success" disabled={isSaving || (!categoryName || !categoryZindex)}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddCategoryModal;
