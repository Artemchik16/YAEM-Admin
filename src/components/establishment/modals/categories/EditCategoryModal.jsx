import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditCategoryModal({ open, setOpen, categoryId, setSelectedCategoryId, setSelectedCategory,updateCategories, establishmentId }) {

    const userToken = sessionStorage.getItem('accessToken');
    const [formChanged, setFormChanged] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [editedCategoryZindex, setEditedCategoryZindex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/menu/categories/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setCategoryData(response.data);
                setEditedCategoryName(response.data.name);
                setEditedCategoryZindex(response.data.z_index);
            } catch (error) {
                toast.error('Невозможно получить информацию о категории.', { autoClose: 1000 });
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setOpen(false);
        setTimeout(() => { setIsSaving(false); }, 1000);
        try {
            await axios.patch(`http://localhost:8000/api/v1/menu/categories/${categoryId}/`, {
                name: editedCategoryName || categoryData.name,
                z_index: editedCategoryZindex || categoryData.z_index
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
            updateCategories(updateCategoriesResponse.data)
            setSelectedCategory(null)
            setSelectedCategoryId(null)
            toast.success('Категория успешно обновлена.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('30 символов макс', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.name && error.response.data.name[0] === 'Category: only ru/en/num characters') {
                    setIsSaving(true);
                    setTimeout(() => { setIsSaving(false); }, 1000);
                    toast.error('рус англ цифры буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    useEffect(() => {
        if (categoryData) {
            setFormChanged(
                editedCategoryName !== categoryData.name ||
                editedCategoryZindex !== categoryData.z_index
            );
        }
    }, [editedCategoryName, editedCategoryZindex]);


    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать раздел</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                    </MDBModalHeader>
                    <form onSubmit={handleEditCategory}>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование раздела'
                                id='categoryName'
                                type='text'
                                defaultValue={categoryData?.name}
                                value={editedCategoryName}
                                onChange={(e) => setEditedCategoryName(e.target.value)} />
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="1-2-3-4-5"
                                type='text'
                                defaultValue={categoryData?.z_index}
                                value={editedCategoryZindex}
                                onChange={(e) => setEditedCategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            {formChanged && <MDBBtn color="success">Сохранить</MDBBtn>}
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditCategoryModal;
