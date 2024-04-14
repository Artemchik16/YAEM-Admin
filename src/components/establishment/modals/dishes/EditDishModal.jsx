import React, { useState, useEffect } from 'react';
import { MDBSwitch, MDBBtn, MDBTextArea, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditDishModal({ open, setOpen, dishId, updateDishes, subcategoryId }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
    const [formChanged, setFormChanged] = useState(false);
    const [dishData, setDishData] = useState(null);
    const [dishName, setDishName] = useState("");
    const [dishActualPrice, setDishActualPrice] = useState('');
    const [dishStop, setDishStop] = useState(null);
    const [image, setImage] = useState(null);
    const formData = new FormData();
    formData.append('image', image);
    const [dishOldPrice, setDishOldPrice] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPopular, setDishPopular] = useState(null);
    const [dishSpicy, setDishSpicy] = useState(null);
    const [dishVegetarian, setDishVegetarian] = useState(null);

    useEffect(() => {
        if (!open) {
            setIsAdditionalInfoVisible(false);
        }
    }, [open]);

    useEffect(() => {
        const fetchDishData = async () => {
            try {
                const response = await axios.get(`https://yaem.kz/api/v1/menu/dishes/${dishId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setDishData(response.data);
                setDishName(response.data.name);
                setDishActualPrice(response.data.actual_price);
                setDishStop(response.data.stop);
                // setImage(response.data.image)
                setDishOldPrice(response.data.old_price);
                setDishDescription(response.data.description);
                setDishPopular(response.data.popular);
                setDishSpicy(response.data.spicy);
                setDishVegetarian(response.data.vegetarian);
            } catch (error) {
                toast.error('Невозможно получить информацию о блюде.', { autoClose: 1000 });
            }
        };

        fetchDishData();
    }, [dishId]);


    const handleUpdateDish = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                name: dishName || dishData.name,
                actual_price: dishActualPrice || dishData.actual_price,
                stop: dishStop,
                old_price: dishOldPrice || dishData.old_price,
                description: dishDescription || dishData.description,
                popular: dishPopular,
                spicy: dishSpicy,
                vegetarian: dishVegetarian
            };

            if (image) {
                requestData.image = image;
            }

            await axios.patch(`https://yaem.kz/api/v1/menu/dishes/${dishId}/`, requestData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updateDishesResponse = await axios.get(`https://yaem.kz/api/v1/menu/dishes?food_type_id=${subcategoryId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            updateDishes(updateDishesResponse.data);

            setOpen(false);
            toast.success('Блюдо успешно обновлено.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            console.log(dishData.image, image)
            toast.error('Произошла ошибка при обновлении блюда.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        }
    };

    useEffect(() => {
        if (dishData) {
            setFormChanged(
                dishName !== dishData.name ||
                dishActualPrice !== dishData.actual_price ||
                dishStop !== dishData.stop ||
                dishOldPrice !== dishData.old_price ||
                dishDescription !== dishData.description ||
                dishPopular !== dishData.popular ||
                dishSpicy !== dishData.spicy ||
                dishVegetarian !== dishData.vegetarian
            );
        }
    }, [dishData, dishName, dishActualPrice, dishStop, dishOldPrice, dishDescription, dishPopular, dishSpicy, dishVegetarian]);

    const handleCloseModal = () => {
        setIsAdditionalInfoVisible(false);
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать блюдо</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
                    </MDBModalHeader>
                    <form onSubmit={handleUpdateDish}>
                        <MDBModalBody className="my-1">
                            <MDBInput
                                className=""
                                label='Наименование блюда'
                                type='text'
                                value={dishName}
                                maxLength="40" showCounter={true}
                                defaultValue={dishData?.name}
                                onChange={(e) => setDishName(e.target.value)}
                                required />
                            <MDBInput
                                className="mt-4"
                                label='Фактическая цена'
                                type='number'
                                maxLength="6" showCounter={true}
                                value={dishActualPrice}
                                defaultValue={dishData?.actual_price}
                                onChange={(e) => setDishActualPrice(e.target.value)}
                                required />
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
                            <button type="button" className="btn btn-outline-secondary mt-3 btn-animate" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Показать дополнительные поля <i className="fas fa-circle-chevron-down ms-1"></i></button>
                            {isAdditionalInfoVisible && (
                                <>
                                    <MDBInput
                                        className="mt-3"
                                        label='Старая цена'
                                        type='number'
                                        maxLength="6" showCounter={true}
                                        defaultValue={dishData.old_price}
                                        value={dishOldPrice}
                                        onChange={(e) => setDishOldPrice(e.target.value)}
                                    />
                                    <MDBTextArea
                                        className="my-4"
                                        label='Описание'
                                        rows={3}
                                        type='text'
                                        defaultValue={dishData?.description}
                                        value={dishDescription}
                                        onChange={(e) => setDishDescription(e.target.value)}
                                    />
                                    <input
                                        type="file"
                                        class="form-control"
                                        id="inputGroupFile04"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setImage(file);
                                            }
                                        }}
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
                                        maxLength="2" showCounter={true}
                                    />
                                </>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="success">Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditDishModal;
