// Import react
import React, { useState } from 'react';
// Import MDB
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';


function AddDishModal({ open, setOpen, subcategoryId, updateDishes }) {

    // Handlers
    const userToken = sessionStorage.getItem('accessToken');
    const [dishName, setDishName] = useState('');

    // Post request on backend, create dish
    const handleAddDish = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/menu/dishes/', {
                food_type_id: subcategoryId,
                name: dishName,
                actual_price: 100,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            // Update displayed categories list
            const updateDishesResponse = await axios.get(`http://localhost:8000/api/v1/menu/dishes?subcategory_id=${subcategoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateDishes(updateDishesResponse.data)
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
                        <MDBModalTitle>Добавить блюдо</MDBModalTitle>
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
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            required
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Success, close handlers */}
                        <MDBBtn color="success" onClick={handleAddDish}>Сохранить</MDBBtn>
                        <MDBBtn color='danger' onClick={() => setOpen(false)}>Закрыть</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddDishModal;
