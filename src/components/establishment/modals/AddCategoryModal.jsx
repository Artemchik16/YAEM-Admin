import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategoryModal({ open, setOpen, establishmentId, updateCategories }) {

    const userToken = sessionStorage.getItem('accessToken');
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/menu/categories/', {
                client_id: establishmentId,
                name: categoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setOpen(false);
            const updateCategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateCategories(updateCategoriesResponse.data)
            toast.success('Категория успешно добавлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            toast.error('Ошибка при добавлении категории.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить раздел</MDBModalTitle>
                        <MDBBtn className='btn-close'
                            color='none'
                            onClick={() => setOpen(false)}>
                        </MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput label='Наименование категории' id='categoryName' type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="success" onClick={handleAddCategory}>Сохранить</MDBBtn>
                        <MDBBtn color='danger'
                            onClick={() => setOpen(false)}>
                            Закрыть
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddCategoryModal;
