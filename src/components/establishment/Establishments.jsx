// Default import
import React, { useState, useEffect } from 'react';
// Component import
import CreateEstablishmentForm from './forms/CreateEstablishmentForm.jsx';
import EditEstablishmentForm from './forms/EditEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx';
import Categories from './Categories.jsx';
// Import messages library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import HTTP library
import axios from "axios";


// base parent component, include CreateEstablishmentForm, EditEstablishmentForm, EstablishmentCard
function Establishment() {

  // EditEstablishmentForm handlers
  // Status for the identifier of the establishment being edited
  const [editingEstablishmentId, setEditingEstablishmentId] = useState(null);
  // State for displaying a list of establishments
  const [showEstablishments, setShowEstablishments] = useState(true);
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

  // Dishes handlers
  // Status for the identifier of the dish being edited
  const [editingDishId, setEditingDishId] = useState(null);
  // Function for setting the identifier of the edited dishes and hiding the list of establishments
  const handleEditDishes = (establishmentId) => {
    setEditingDishId(establishmentId);
    setShowEstablishments(false);
  };
  // Function for resetting the identifier of the edited dishes and displaying a list of establishments
  const handleFinishEditingDishes = () => {
    setEditingDishId(null);
    setShowEstablishments(true);
  };

  // CreateEstablishmentForm handlers
  const handleCreateFormIsOpen = () => { setShowCreateForm(true); };
  const handleCreateFormIsClose = () => { setShowCreateForm(false); };
  // State for displaying the establishment creation form
  const [showCreateForm, setShowCreateForm] = useState(false);
  // State for storing a list of establishments
  const [establishments, setEstablishments] = useState([]);

  // send get request on backend
  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        // Get access token value
        const token = sessionStorage.getItem('accessToken');
        // Make a GET request on backend
        const response = await axios.get('http://localhost:8000/api/v1/menu/clients/', {
          // Send token on backend
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Get data from response
        const data = response.data;
        // Set establishments state
        setEstablishments(data);
      } catch (error) {
        // Handle error
        toast.error('Ошибка при получении списка заведений', { autoClose: 2000 });
      }
    };
    fetchEstablishments();
  }, []);

  return (
    <>
      <div className="col-10 col-sm-9 py-4 mx-auto">

        {showEstablishments && !showCreateForm && (
          <div className="container px-0">
            <h1 className="ms-4 mb-3">Заведения
              <span>
                <div className="btn shadow-0 btn-outline-success btn-animate px-3 my-1 mx-2" onClick={handleCreateFormIsOpen}>
                  <i className="far fa-square-plus me-2"></i>
                  Добавить заведение
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
          <CreateEstablishmentForm onClose={handleCreateFormIsClose} updateEstablishments={setEstablishments} />
        )}

        {/* If editingEstablishmentId is set, render EditEstablishmentForm component, send establishmentId and close handler, and update state */}
        {editingEstablishmentId && (
          <EditEstablishmentForm establishmentId={editingEstablishmentId} onFinishEditing={handleFinishEditing} updateEstablishments={setEstablishments} />
        )}
        {/* If editingDishId is set, render Dishes component, send establishmentId and close handler */}
        {editingDishId && (
          <Categories establishmentId={editingDishId} onFinishDish={handleFinishEditingDishes} />
        )}



      </div>
    </>
  );
}

export default Establishment;
