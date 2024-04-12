import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditSubcategoryModal({ open, setOpen, setSelectedSubcategoryId, setSelectedSubcategory, subcategoryId, subcategoryName, updateSubcategories, categoryId }) {

    const userToken = sessionStorage.getItem('accessToken');
    const [subcategoryData, setSubcategoryData] = useState(null);
    const [editedSubcategoryName, setEditedSubcategoryName] = useState(subcategoryName);
    const [editedSubcategoryZindex, setEditedSubcategoryZindex] = useState(subcategoryName);
    const [formChanged, setFormChanged] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSubcategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/menu/subcategories/${subcategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setSubcategoryData(response.data);
                setEditedSubcategoryName(response.data.name);
                setEditedSubcategoryZindex(response.data.z_index);
            } catch (error) {
                toast.error('Невозможно получить информацию о категории.', { autoClose: 1000 });
            }
        };

        fetchSubcategoryData();
    }, [subcategoryId]);

    useEffect(() => {
        if (subcategoryData) {
            setFormChanged(
                editedSubcategoryName !== subcategoryData.name ||
                editedSubcategoryZindex !== subcategoryData.z_index
            );
        }
    }, [editedSubcategoryName, editedSubcategoryZindex]);

    const handleEditSubcategory = async (e) => {
        e.preventDefault()
        setIsSaving(true);
        setTimeout(() => { setIsSaving(false); }, 2000);
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/menu/subcategories/${subcategoryId}/`, {
                name: editedSubcategoryName,
                z_index: editedSubcategoryZindex
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            setIsSaving(false);

            const updatedSubcategories = await axios.get(`http://localhost:8000/api/v1/menu/subcategories?category_id=${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            updateSubcategories(updatedSubcategories.data);
            setSelectedSubcategoryId(null)
            setSelectedSubcategory(null)
            setOpen(false);
            toast.success('Категория успешно обновлена.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 50 символов.') {
                    toast.error('Максимальная длина названия категории - 50 символов', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
                }
                if (error.response.data.z_index && error.response.data.z_index[0] === 'Введите правильное число.') {
                    toast.error('Порядок отображения должен быть числом.', { autoClose: 1000, pauseOnHover: false, position: "top-center" });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Редактировать подкатегорию</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal} />
                    </MDBModalHeader>
                    <form onSubmit={handleEditSubcategory}>
                        <MDBModalBody>
                            <MDBInput
                                label='Наименование подкатегории'
                                id='subcategoryName'
                                type='text'
                                defaultValue={subcategoryData?.name}
                                value={editedSubcategoryName}
                                onChange={(e) => setEditedSubcategoryName(e.target.value)}
                            />
                            <MDBInput
                                className="my-3"
                                label='Порядок отображения'
                                placeholder="1-2-3-4-5"
                                type='text'
                                defaultValue={subcategoryData?.z_index}
                                value={editedSubcategoryZindex}
                                onChange={(e) => setEditedSubcategoryZindex(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            {formChanged && <MDBBtn color="success" disabled={isSaving || (!editedSubcategoryName || !editedSubcategoryZindex)}>Сохранить</MDBBtn>}
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default EditSubcategoryModal;
