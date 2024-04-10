// Import react
import React from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';

function RemoveCategoryModal({ open, setOpen, categoryId, categoryName, updateCategories, establishmentId, setSelectedCategoryId }) {
    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [isDeleting, setIsDeleting] = React.useState(false);

    // Delete request on backend, delete category
    const handleDeleteCategory = async () => {
        setIsDeleting(true); // Выключить кнопку "Удалить"
        try {
            await axios.delete(`http://localhost:8000/api/v1/menu/categories/${categoryId}`, {
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
            updateCategories(updateCategoriesResponse.data);
            setSelectedCategoryId(null);
            setOpen(false);
            toast.success('Категория успешно удалена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            toast.error('Ошибка при удалении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } finally {
            setIsDeleting(false); // Включить кнопку "Удалить" после выполнения запроса
        }
    };

    return (
        // Modal handlers
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Удалить раздел</MDBModalTitle>
                        {/* Close handlers */}
                        <MDBBtn className='btn-close' color='none' onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        <strong>Безвозвратно</strong> удалить раздел и все вложения <strong>{categoryName}</strong>?
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="danger" onClick={handleDeleteCategory} disabled={isDeleting}>Да, Удалить</MDBBtn>
                        <MDBBtn color='success' onClick={() => setOpen(false)}>Отмена</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default RemoveCategoryModal;
