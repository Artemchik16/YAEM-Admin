import React, { useState, useEffect } from 'react';
import Categories from './Categories.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import CreateEstablishmentForm from './forms/CreateEstablishmentForm.jsx';
import EditEstablishmentForm from './forms/EditEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx';


// base parent component, include CreateEstablishmentForm, EditEstablishmentForm, EstablishmentCard
function Establishment() {

  const [loading, setLoading] = useState(true);
  const [editingEstablishmentId, setEditingEstablishmentId] = useState(null);
  const [showEstablishments, setShowEstablishments] = useState(true);
  const [editingDishId, setEditingDishId] = useState(null);
  const [editingDishUrl, setEditingDishUrl] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const handleCreateFormIsOpen = () => { setShowCreateForm(true); };
  const handleCreateFormIsClose = () => { setShowCreateForm(false); };
  const [establishments, setEstablishments] = useState([]);

  // send get request on backend
  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        // Get access token value
        const token = sessionStorage.getItem('accessToken');
        // Make a GET request on backend
        const response = await axios.get('https://yaem.kz/api/v1/menu/clients/', {
          // Send token on backend
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Get data from response
        const data = response.data;
        // Set establishments state
        setEstablishments(data);
        setTimeout(() => { setLoading(false); }, 200)
      } catch (error) {
        if (error.response && error.response.status && error.response.status === 401) {
            sessionStorage.clear();
            window.location.reload();
        }
        setLoading(false)
        // Handle error
        toast.error('Ошибка при получении списка заведений', { autoClose: 2000 });
      }
    };
    fetchEstablishments();
  }, []);

  // Function for setting the identifier of the edited establishment and hiding the list of establishments
  const handleEditEstablishment = (establishmentId) => {
    setEditingEstablishmentId(establishmentId);
    setShowEstablishments(false);
  };

  // Function for resetting the identifier of the edited establishment and displaying a list of establishments
  const handleFinishEditing = () => {
    setEditingEstablishmentId(null);
    setShowEstablishments(true);
  };

  // Function for setting the identifier of the edited dishes and hiding the list of establishments
  const handleEditDishes = (establishmentId, establishmentUrl) => {
    setEditingDishId(establishmentId);
    setEditingDishUrl(establishmentUrl);
    setShowEstablishments(false);
  };

  // Function for resetting the identifier of the edited dishes and displaying a list of establishments
  const handleFinishEditingDishes = () => {
    setEditingDishId(null);
    setShowEstablishments(true);
  };

  return (
    <>
      {loading && (
      <div className="spinner-border text-warning mx-auto my-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      )}
      {!loading && (
        <div className="col-10 col-sm-9 py-4 mx-auto">
          {/*  */}
          {showEstablishments && !showCreateForm && (
            <div className="container px-0">
              <h1 className="ms-4 mb-3">Заведения
                <span>
                  <div className="btn shadow-0 btn-animate px-3 my-1 mx-2 py-0" onClick={handleCreateFormIsOpen}>
                    <i className="far fa-square-plus text-success fa-2x"></i>
                  </div>
                </span>
              </h1>
              {/* If user have not any establishments */}
              {establishments.length === 0 && (
                <>
                  <p>Здесь будет отображен список ваших заведений.</p>
                  {/* <p>Чтобы добавить заведение, нажмите кнопку "Добавить заведение".</p> */}
                  <hr />
                </>
              )}
              {/* If user have any establishments*/}
              {establishments.length > 0 && (
                <>
                  {/* Render EstablishmentCard component and send establishments data list in this component and edit handler, dish handler, update handler*/}
                  <EstablishmentCard establishments={establishments} onEdit={handleEditEstablishment} onEditDishes={handleEditDishes} updateEstablishments={setEstablishments} />
                </>
              )}
            </div>
          )}

          {/* if user clicked on 'Добавить заведение' button, show CreateEstablishmentForm component and close handler, and update state */}
          {showCreateForm && (
            <CreateEstablishmentForm onClose={handleCreateFormIsClose} updateEstablishments={setEstablishments}/>
          )}
          {/* If editingEstablishmentId is set, render EditEstablishmentForm component, send establishmentId and close handler, and update state */}
          {editingEstablishmentId && (
            <EditEstablishmentForm establishmentId={editingEstablishmentId} onFinishEditing={handleFinishEditing} updateEstablishments={setEstablishments} />
          )}
          {/* If editingDishId is set, render Dishes component, send establishmentId and close handler */}
          {editingDishId && (
            <Categories establishmentId={editingDishId} establishmentUrl={editingDishUrl} onFinishDish={handleFinishEditingDishes} />
          )}
        </div>
      )}
    </>
  );
}

export default Establishment;
