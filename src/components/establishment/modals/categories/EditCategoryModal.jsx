// Import react
import React, { useState } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function EditCategoryModal({ open, setOpen, categoryId, categoryName, updateCategories, establishmentId }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [editedCategoryName, setEditedCategoryName] = useState(categoryName);

    // Patch request on backend, update category
    const handleEditCategory = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/v1/menu/categories/${categoryId}/`, {
                name: editedCategoryName
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Update displayed categories list
            const updateCategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateCategories(updateCategoriesResponse.data)
            setOpen(false);
            toast.success('Категория успешно обновлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    toast.error('30 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'The name can only contain letters (Russian and English)') {
                    toast.error('рус англ буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    return (
        // Modal handlers
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать раздел</MDBModalTitle>
                        {/* Close handler */}
                        <MDBBtn className='btn-close' 
                        color='none' 
                        onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h1>{categoryName}</h1>
                        {/* Name handler */}
                        <MDBInput
                            label='Наименование категории'
                            id='categoryName'
                            type='text'
                            // defaultValue={editedCategoryName}
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="danger" onClick={handleEditCategory}>Сохранить</MDBBtn>
                        <MDBBtn color='secondary' onClick={() => setOpen(false)}>Отмена</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditCategoryModal;
