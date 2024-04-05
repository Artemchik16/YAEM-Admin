import React from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter, MDBModalBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function RemoveCategoryModal({ open, setOpen, categoryId, categoryName, updateCategories, establishmentId }) {

    const userToken = sessionStorage.getItem('accessToken');

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/menu/categories/${categoryId}`, {
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
            toast.success('Категория успешно удалена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
            setOpen(false);
        } catch (error) {
            toast.error('Ошибка при удалении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Удалить раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        Вы уверены, что хотите удалить категорию <strong>{categoryName}</strong>?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={handleDeleteCategory}>Удалить</MDBBtn>
                        <MDBBtn color='secondary' onClick={() => setOpen(false)}>Отмена</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default RemoveCategoryModal;
