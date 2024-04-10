import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategoryModal({ open, setOpen, establishmentId, updateCategories, setSelectedCategoryId, setSelectedCategory }) {
    const userToken = sessionStorage.getItem('accessToken');
    const [categoryName, setCategoryName] = useState(null);
    const [categoryZindex, setCategoryZindex] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => { setIsSaving(false); }, 2000);
        try {
            await axios.post('http://localhost:8000/api/v1/menu/categories/', {
                client_id: establishmentId,
                name: categoryName,
                z_index: categoryZindex
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const updateCategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/categories?client_id=${establishmentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            updateCategories(updateCategoriesResponse.data);
            setCategoryName('');
            setCategoryZindex('');
            setOpen(false);
            toast.success('Категория успешно добавлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('Название категории не может содержать более 30 символов', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'Category: only ru/en/num characters') {
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('Допустимы только рус англ буквы цифры', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedCategoryId(null)
        setSelectedCategory(null)
        setCategoryName('');
        setCategoryZindex('');
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Добавить раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                    </MDBModalHeader>
                    <form onSubmit={handleAddCategory}>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование категории'
                                type='text'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}

                            />
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="Введите число"
                                type='number'
                                value={categoryZindex}
                                onChange={(e) => setCategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className="btn-animate" type="submit" color="success" disabled={isSaving || (!categoryName || !categoryZindex)}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </form>
                    <MDBBtn className="btn-animate" color='danger' onClick={handleCloseModal}>Закрыть</MDBBtn>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddCategoryModal;
