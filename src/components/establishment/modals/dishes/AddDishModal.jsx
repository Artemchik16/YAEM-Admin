// Import React, useState
import React, { useState } from 'react';
// Import MDB components
import { MDBSwitch, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';

function AddDishModal({ open, setOpen, subcategoryId, updateDishes }) {
    // State for dish data
    const [dishName, setDishName] = useState('');
    const [dishActualPrice, setDishActualPrice] = useState('');
    const [dishStop, setDishStop] = useState(false);
    const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
    const [dishOldPrice, setDishOldPrice] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPopular, setDishPopular] = useState(false);
    const [dishSpicy, setDishSpicy] = useState(false);
    const [dishVegetarian, setDishVegetarian] = useState(false);

    // Handler for creating a dish
    const handleAddDish = async (e) => {
        e.preventDefault();
        try {
            // Object to hold dish data
            let requestData = {
                food_type_id: subcategoryId,
                name: dishName,
                actual_price: dishActualPrice,
                stop: dishStop,
            };

            // Add optional fields to the requestData object if they are not empty
            if (dishOldPrice) requestData.old_price = dishOldPrice;
            if (dishDescription) requestData.description = dishDescription;
            if (dishPopular) requestData.popular = dishPopular;
            if (dishSpicy) requestData.spicy = dishSpicy;
            if (dishVegetarian) requestData.vegetarian = dishVegetarian;

            // Send a POST request to create the dish
            await axios.post('http://localhost:8000/api/v1/menu/dishes/', requestData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });

            // Update displayed dishes list
            const updateDishesResponse = await axios.get(`http://localhost:8000/api/v1/menu/dishes?food_type_id=${subcategoryId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            updateDishes(updateDishesResponse.data);

            // Close the modal and show success message
            setOpen(false);
            toast.success('Блюдо успешно добавлено.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Ensure this value has at most 30 characters.') {
                    toast.error('Максимальное количество символов для наименования - 30', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'The name can only contain letters (Russian and English)') {
                    toast.error('Наименование должно содержать только русские или английские буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setIsAdditionalInfoVisible(false)
        setOpen(false);
    };

    return (
        // Modal component
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить блюдо</MDBModalTitle>
                        {/* Close button */}
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
                    </MDBModalHeader>
                    <form>
                        <MDBModalBody>
                            {/* Form fields */}
                            <MDBInput className="mb-3" label='Наименование блюда' type='text' value={dishName} onChange={(e) => setDishName(e.target.value)} required />
                            <MDBInput className="mb-3" label='Фактическая цена' type='number' value={dishActualPrice} onChange={(e) => setDishActualPrice(e.target.value)} required />
                            <div className="row">
                                <div className="col me-0 pe-0">
                                    <MDBSwitch label='Стоп-лист' checked={dishStop} onChange={() => setDishStop(!dishStop)} />
                                </div>
                                <div className="col">
                                    <i class="mx-1 text-danger fas fa-ban"></i>
                                </div>
                            </div>
                            {/* Button to show additional info */}
                            <button type="button" className="btn btn-outline-secondary mt-4 btn-animate" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Показать дополнительные поля <i class="fas fa-circle-chevron-down ms-1"></i></button>
                            {/* Additional fields */}
                            {isAdditionalInfoVisible && (
                            <>
                                <MDBInput className="my-3" label='Старая цена' type='number' value={dishOldPrice} onChange={(e) => setDishOldPrice(e.target.value)} />
                                <MDBInput className="mb-3" label='Описание' type='text' value={dishDescription} onChange={(e) => setDishDescription(e.target.value)} />
                                <div className="row">
                                    <div className="col me-0 pe-0">
                                        <MDBSwitch label='Популярное' checked={dishPopular} onChange={() => setDishPopular(!dishPopular)} />
                                        <MDBSwitch label='Острое' checked={dishSpicy} onChange={() => setDishSpicy(!dishSpicy)} />
                                        <MDBSwitch label='Вегетарианское' checked={dishVegetarian} onChange={() => setDishVegetarian(!dishVegetarian)} />
                                    </div>
                                    <div className="col">
                                        <i className="d-block fas fa-star mt-1" style={{ 'color': 'gold' }}></i>
                                        <i className="d-block fas fa-pepper-hot text-danger mt-2"></i>
                                        <i className="d-block fas fa-seedling text-success mt-3"></i>
                                    </div>
                                </div>
                            </>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter>
                            {/* Save and close buttons */}
                            <MDBBtn color="success" onClick={handleAddDish}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddDishModal;
