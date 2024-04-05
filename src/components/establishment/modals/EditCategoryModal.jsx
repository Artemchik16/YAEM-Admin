import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter, MDBModalBody, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditCategoryModal({ open, setOpen, categoryId, categoryName, updateCategories, establishmentId }) {

    const userToken = sessionStorage.getItem('accessToken');
    const [editedCategoryName, setEditedCategoryName] = useState(categoryName);

    const handleEditCategory = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/v1/menu/categories/${categoryId}/`, {
                name: editedCategoryName
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const updateCategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateCategories(updateCategoriesResponse.data)
            toast.success('Категория успешно обновлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            setOpen(false);
        } catch (error) {
            toast.error('Ошибка при обновлении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h1>{categoryName}</h1>
                        <MDBInput
                            label='Наименование категории'
                            id='categoryName'
                            type='text'
                            // defaultValue={editedCategoryName}
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={handleEditCategory}>Сохранить</MDBBtn>
                        <MDBBtn color='secondary' onClick={() => setOpen(false)}>Отмена</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditCategoryModal;
