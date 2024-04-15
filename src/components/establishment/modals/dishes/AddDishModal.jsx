// Import React, useState
import React, { useState, useEffect } from 'react';
// Import MDB components
import { MDBSwitch, MDBTextArea, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
// Import axios
import axios from 'axios';
// Import react-toastify
import { toast } from 'react-toastify';

function AddDishModal({ open, setOpen, subcategoryId, updateDishes }) {
    // State for dish data
    const [dishName, setDishName] = useState('');
    const [dishZindex, setDishZindex] = useState('');
    const [dishActualPrice, setDishActualPrice] = useState('');
    const [dishStop, setDishStop] = useState(false);
    const [image, setImage] = useState("");
    const formData = new FormData();
    formData.append('image', image);
    const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
    const [dishOldPrice, setDishOldPrice] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPopular, setDishPopular] = useState(false);
    const [dishSpicy, setDishSpicy] = useState(false);
    const [dishVegetarian, setDishVegetarian] = useState(false);

    useEffect(() => {
        if (!open) {
            setDishName('');
            setDishZindex('');
            setDishActualPrice('');
            setDishStop(false);
            setImage('');
            setIsAdditionalInfoVisible(false);
            setDishOldPrice('');
            setDishDescription('');
            setDishPopular(false);
            setDishSpicy(false);
            setDishVegetarian(false);
        }
    }, [open]);

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
            if (dishZindex) requestData.z_index = dishZindex;
            if (image) requestData.image = image;
            if (dishOldPrice) requestData.old_price = dishOldPrice;
            if (dishDescription) requestData.description = dishDescription;
            if (dishPopular) requestData.popular = dishPopular;
            if (dishSpicy) requestData.spicy = dishSpicy;
            if (dishVegetarian) requestData.vegetarian = dishVegetarian;

            // Send a POST request to create the dish
            await axios.post('https://yaem.kz/api/v1/menu/dishes/', requestData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update displayed dishes list
            const updateDishesResponse = await axios.get(`https://yaem.kz/api/v1/menu/dishes?food_type_id=${subcategoryId}`, {
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
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 40 символов.') {
                    toast.error('Максимальное количество символов для наименования - 40', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.actual_price && error.response.data.actual_price[0] === 'Требуется численное значение.') {
                    toast.error('Цена должна быть числом.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.old_price && error.response.data.old_price[0] === 'Требуется численное значение.') {
                    toast.error('Цена должна быть числом.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.description && error.response.data.description[0] === 'Убедитесь, что это значение содержит не более 120 символов.') {
                    toast.error('Максимальное количество символов для описания - 120', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
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
                        <MDBModalBody className="my-1">
                            {/* Form fields */}
                            <MDBInput className="" label='Наименование блюда' type='text' maxLength="40" showCounter={true} value={dishName} onChange={(e) => setDishName(e.target.value)} required />
                            <MDBInput className="mt-4" label='Фактическая цена' type='text' maxLength="6" showCounter={true} value={dishActualPrice} onChange={(e) => setDishActualPrice(e.target.value)} required />
                            <div className="row mt-3">
                                <div className="col me-0 pe-0">
                                    <MDBSwitch
                                        label='Стоп-лист'
                                        checked={dishStop}
                                        onChange={() => setDishStop(!dishStop)} />
                                </div>
                                <div className="col">
                                    <i className="mx-1 text-danger fas fa-ban"></i>
                                </div>
                            </div>
                            {/* Button to show additional info */}
                            <button type="button" className="btn btn-outline-secondary my-3 btn-animate" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Показать дополнительные поля <i class="fas fa-circle-chevron-down ms-1"></i></button>
                            {/* Additional fields */}
                            {isAdditionalInfoVisible && (
                                <>
                                    <MDBInput className="" label='Старая цена' type='text' maxLength="6" showCounter={true} value={dishOldPrice} onChange={(e) => setDishOldPrice(e.target.value)} />
                                    <MDBTextArea className="my-4" label='Описание' rows={3} type='text' value={dishDescription} onChange={(e) => setDishDescription(e.target.value)} />
                                    <input
                                        type="file"
                                        class="form-control"
                                        id="inputGroupFile04"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <small id='helperTextExample' className='form-helper text-muted'>
                                        Размер файла не должен превышать 1мб.
                                    </small>
                                    <div className="row mt-2">
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
                                    <MDBInput
                                        className="mt-3"
                                        label='Порядковый номер'
                                        placeholder="1-99"
                                        type='text'
                                        maxLength="2" 
                                        showCounter={true}
                                        value={dishZindex} 
                                        onChange={(e) => setDishZindex(e.target.value)}
                                    />
                                </>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter>
                            {/* Save and close buttons */}
                            <MDBBtn color="success" onClick={handleAddDish} disabled={!dishName || !dishActualPrice}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddDishModal;
