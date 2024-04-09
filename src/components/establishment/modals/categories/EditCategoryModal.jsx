import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditCategoryModal({ open, setOpen, categoryId, categoryName, updateCategories, establishmentId }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [editedCategoryName, setEditedCategoryName] = useState(categoryName);
    const [isSaving, setIsSaving] = useState(false);

    // Сбрасывать значение editedCategoryName при изменении categoryName
    useEffect(() => {
        setEditedCategoryName(categoryName);
    }, [categoryName]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
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
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    toast.error('30 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'Category: only ru/en/num characters') {
                    toast.error('рус англ цифры буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setEditedCategoryName('');
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <form onSubmit={handleEditCategory}>
                        <MDBModalHeader>
                            <MDBModalTitle>Редактировать раздел</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование категории'
                                id='categoryName'
                                type='text'
                                defaultValue={categoryName}
                                value={editedCategoryName}
                                required
                                onChange={(e) => setEditedCategoryName(e.target.value)} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="danger" disabled={isSaving}>Сохранить</MDBBtn>
                            <MDBBtn color='secondary' onClick={handleCloseModal}>Отмена</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditCategoryModal;
