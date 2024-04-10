// Import react
import React, { useState } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function EditSubcategoryModal({ open, setOpen, subcategoryId, subcategoryName, updateSubcategories, categoryId }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [editedSubcategoryName, setEditedSubcategoryName] = useState(subcategoryName);

    // Patch request on backend, update category
    const handleEditSubcategory = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/v1/menu/subcategories/${subcategoryId}/`, {
                name: editedSubcategoryName
            }, {
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
            toast.success('Категория успешно обновлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 50 символов.') {
                    toast.error('50 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'Subcategory: only ru/en/num characters') {
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
                        <MDBModalTitle>Редактировать категорию</MDBModalTitle>
                        {/* Close handler */}
                        <MDBBtn className='btn-close'
                            color='none'
                            onClick={() => setOpen(false)} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h1>{subcategoryName} АРТЁМ ПОЛОЖИ ЗНАЧЕНИЯ !!!!</h1>
                        {/* Name handler */}
                        <MDBInput
                            label='Наименование категории'
                            id='categoryName'
                            type='text'
                            defaultValue={subcategoryName}
                            value={editedSubcategoryName}
                            onChange={(e) => setEditedSubcategoryName(e.target.value)} />
                        <MDBInput
                            className="my-3"
                            label='Порядок отображения'
                            type='number'
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="success" onClick={handleEditSubcategory}>Сохранить</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditSubcategoryModal;
