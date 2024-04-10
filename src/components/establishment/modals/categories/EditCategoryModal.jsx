import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditCategoryModal({ open, setOpen, categoryId, categoryName, categoryZindex, updateCategories, establishmentId }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [editedCategoryZindex, setEditedCategoryZindex] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setEditedCategoryName(categoryName);
        setEditedCategoryZindex(categoryZindex);
    }, [categoryName, categoryZindex]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setOpen(false);
        setTimeout(() => { setIsSaving(false); }, 1000);
        try {
            await axios.patch(`http://localhost:8000/api/v1/menu/categories/${categoryId}/`, {
                name: editedCategoryName,
                z_index: editedCategoryZindex
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
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('30 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'Category: only ru/en/num characters') {
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('рус англ цифры буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                    </MDBModalHeader>
                    <form onSubmit={handleEditCategory}>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование раздела'
                                id='categoryName'
                                type='text'
                                defaultValue={categoryName}
                                value={editedCategoryName}
                                onChange={(e) => setEditedCategoryName(e.target.value)} />
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="1-2-3-4-5"
                                type='number'
                                defaultValue={categoryZindex}
                                value={editedCategoryZindex}
                                onChange={(e) => setEditedCategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="success" disabled={isSaving}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditCategoryModal;
