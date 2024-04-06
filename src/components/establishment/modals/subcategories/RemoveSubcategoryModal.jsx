// Import react
import React, { useState } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function RemoveSubcategoryModal({ open, setOpen, subcategoryId, subcategoryName, updateSubcategories, categoryId }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');

    // Delete request on backend, delete category
    const handleDeleteSubcategory = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/menu/subcategories/${subcategoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Update displayed categories list
            const updateSubcategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/subcategories?category_id=${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateSubcategories(updateSubcategoriesResponse.data)
            setOpen(false);
            toast.success('Категория успешно удалена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            toast.error('Ошибка при удалении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    return (
        // Modal handlers
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Удалить подкат</MDBModalTitle>
                        {/* Close handlers */}
                        <MDBBtn className='btn-close' color='none' onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        Вы уверены, что хотите удалить категорию <strong>{subcategoryName}</strong>?
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="danger" onClick={handleDeleteSubcategory}>Удалить</MDBBtn>
                        <MDBBtn color='secondary' onClick={() => setOpen(false)}>Отмена</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default RemoveSubcategoryModal;
