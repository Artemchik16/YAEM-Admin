// Import react
import React, { useState } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function AddSubcategoryModal({ open, setOpen, categoryId, updateSubcategories }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [subcategoryName, setSubcategoryName] = useState('');

    // Post request on backend, create category
    const handleAddSubcategory = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/menu/subcategories/', {
                category_id: categoryId,
                name: subcategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Update displayed categories list
            const updateCategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/subcategories?category_id=${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateSubcategories(updateCategoriesResponse.data)
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
        }
    };

    return (
        // Modal handlers
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить подкат</MDBModalTitle>
                        {/* Close handler */}
                        <MDBBtn className='btn-close'
                            color='none'
                            onClick={() => setOpen(false)}>
                        </MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {/* Name handler */}
                        <MDBInput
                            label='Наименование категории'
                            type='text'
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            required
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="success" onClick={handleAddSubcategory}>Сохранить</MDBBtn>
                        <MDBBtn color='danger' onClick={() => setOpen(false)}>Закрыть</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddSubcategoryModal;
