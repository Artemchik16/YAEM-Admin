import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategoryModal({ open, setOpen, establishmentId, updateCategories }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [categoryName, setCategoryName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.post('http://localhost:8000/api/v1/menu/categories/', {
                client_id: establishmentId,
                name: categoryName,
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
            updateCategories(updateCategoriesResponse.data);
            setOpen(false);
            toast.success('Категория успешно добавлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    toast.error('30 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'The name can only contain letters (Russian and English)') {
                    toast.error('рус англ буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        } finally {
            setIsSaving(false); // Включить кнопку "Сохранить"
        }
    };

    const handleCloseModal = () => {
        setCategoryName(''); // Сбросить значение categoryName при закрытии модального окна
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <form onSubmit={handleAddCategory}>
                        <MDBModalHeader>
                            <MDBModalTitle>Добавить раздел</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование категории'
                                type='text'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="success" disabled={isSaving}>Сохранить</MDBBtn>
                            <MDBBtn color='danger' onClick={handleCloseModal}>Закрыть</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddCategoryModal;
