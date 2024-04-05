import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dishes from './Dishes';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInputGroup,
  MDBInput,
} from 'mdb-react-ui-kit';


function Subcategories({ categoryId }) {
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [AddModal, setAddModal] = useState(false);
    const toggleOpenAdd = () => setAddModal(!AddModal);
    const [EditModal, setEditModal] = useState(false);
    const toggleOpenEdit = () => setEditModal(!EditModal);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const subcategoriesResponse = await axios.get(`http://localhost:8000/api/v1/menu/subcategories/?category_id=${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSubcategories(subcategoriesResponse.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при получении подкатегорий.', { autoClose: 1000 });
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    return (
        <div className="container my-5 px-0">

        <MDBModal open={AddModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Добавить категорию</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none'></MDBBtn>
                </MDBModalHeader>
                    <MDBModalBody>
                        <div className="container">
                        {/* NAME */}
                           <MDBInput label='Наименование категории' id='form1' type='number' />
    {/*                        NUM*/}
                          <MDBInput className="my-3" label='Порядковый номер' id='form1' type='number' />
                        {/*          Visibility*/}
                        </div>
                    </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="success">Сохранить</MDBBtn>
                <MDBBtn color='danger' onClick={toggleOpenAdd}>Закрыть</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>


           <MDBModal open={EditModal} setOpen={setEditModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Редактировать категорию</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none'></MDBBtn>
                </MDBModalHeader>
                    <MDBModalBody>
                        <div className="container">
                        {/* NAME */}
                           <MDBInput label='Наименование категории' id='form1' type='number' />
    {/*                        NUM*/}
                          <MDBInput className="my-3" label='Порядковый номер' id='form1' type='number' />
                        {/*          Visibility*/}
                        </div>
                    </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="success">Сохранить</MDBBtn>
                <MDBBtn color='danger' onClick={toggleOpenEdit}>Закрыть</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>



            {/* show this block if user has not any categories */}
            <h2 className="my-3">Категории
                {subcategories.length === 0 && (
                    <div className="btn shadow-0 btn-outline-success btn-animate px-2 mx-2">
                        <i className="far fa-square-plus me-2"></i>
                        Добавить категорию
                    </div>
                )}
                {/* show this block if user have any categories */}

            </h2>
            {subcategories.length > 0 && (
                <div className="col">
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-success ms-1 me-1 px-3" onClick={toggleOpenAdd}>
                            <i className="far fa-square-plus fa-lg"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3" onClick={toggleOpenEdit}>
                            <i className="fas fa-pen"></i>
                        </div>
                        <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3">
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                </div>
                )}
            <div class="btn-group shadow-0 my-4" role="group" aria-label="Basic example">
            {subcategories.map(subcategory => (
              <button type="button" class="btn btn-outline-secondary btn-animate" data-mdb-color="dark"
              key={subcategory.id} style={{ '--mdb-btn-hover-bg': '#ff9753', '--mdb-btn-active-bg': '#ff9753'}}
                        onClick={() => handleSubcategoryClick(subcategory)}>{subcategory.name}</button>
              ))}
            </div>




            {/* Conditionally render Dishes component based on the selected subcategory */}
            {selectedSubcategory && (
                <Dishes subcategoryId={selectedSubcategory.id} />
            )}
        </div>
    );
}

export default Subcategories;
