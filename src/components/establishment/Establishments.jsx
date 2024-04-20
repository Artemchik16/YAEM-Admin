// Import react
import React, { useState, useEffect } from 'react';
// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import axios(HTTP)
import axios from "axios";
// Import urls
import apiUrls from "../utils/ApiUrls.js";
// Import components
import CreateEstablishmentForm from './forms/CreateEstablishmentForm.jsx';
import EditEstablishmentForm from './forms/EditEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx';
import Categories from './Categories.jsx';


// base parent component, include CreateEstablishmentForm, EditEstablishmentForm, EstablishmentCard
export default function Establishment() {

  // Set loading page flag
  const [loading, setLoading] = useState(true);
  // Get user auth token
  const userToken = sessionStorage.getItem('accessToken');
  // Set establishments list
  const [establishments, setEstablishments] = useState([]);
  // Set show establishments
  const [showEstablishments, setShowEstablishments] = useState(true);
  // Set establishment ID for edit component
  const [selectedEstablishmentID, setSelectedEstablishmentID] = useState(null);
  const [editingDishId, setEditingDishId] = useState(null);
  const [selectedEstablishmentURL, setSelectedEstablishmentURL] = useState(null);
  // Set show create establishments component
  const [showCreateForm, setShowCreateForm] = useState(false);
  // Open and close create establishments component
  const handleCreateFormIsOpen = () => { setShowCreateForm(true); };
  const handleCreateFormIsClose = () => { setShowCreateForm(false); };

  // When loading the component, get all the user's establishments
  useEffect(() => {
    const getEstablishments = async () => {
      try {
        // Make a GET request on backend
        const response = await axios.get(apiUrls.client, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        // Set establishments data
        setEstablishments(response.data);
        // Disable loading state when receiving data successfully
        setTimeout(() => { setLoading(false); }, 200)
      } catch (error) {
        // if when loading a component the user is not authenticated, refresh the page and log him out
        if (error.response && error.response.status && error.response.status === 401) {
          sessionStorage.clear();
          window.location.reload();
        }
        // Disable loading state when receiving data successfully
        setLoading(false)
        // Handle error
        toast.error('Ошибка при получении списка заведений', { autoClose: 2000 });
      }
    };
    getEstablishments();
  }, []);

  // Function for setting the identifier of the edited establishment and hiding the list of establishments
  const handleEditEstablishment = (establishmentId) => {
    setSelectedEstablishmentID(establishmentId);
    setShowEstablishments(false);
  };
  // Function for resetting the identifier of the edited establishment and displaying a list of establishments
  const handleFinishEditing = () => {
    setSelectedEstablishmentID(null);
    setShowEstablishments(true);
  };
  // Function for setting the identifier of the edited dishes and hiding the list of establishments
  const handleEditDishes = (establishmentId, establishmentUrl) => {
    setEditingDishId(establishmentId);
    setSelectedEstablishmentURL(establishmentUrl);
    setShowEstablishments(false);
  };
  // Function for resetting the identifier of the edited dishes and displaying a list of establishments
  const handleFinishEditingDishes = () => {
    setEditingDishId(null);
    setShowEstablishments(true);
  };

  // HTML block
  return (
    <>
      {/* While all data is loading show spinner */}
      {loading && (
        <div className="spinner-border text-warning mx-auto my-auto" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {/* After loading show main content */}
      {!loading && (
        <div className="col-10 py-4 mx-auto">
          {/* Create establishments */}
          {showEstablishments && !showCreateForm && (
            <div className="container px-0">
              <h1 className="ms-4 mb-3">Заведения
                <span>
                  {/* Create establishments form open */}
                  <div className="btn shadow-0 btn-animate px-3 my-1 mx-2 py-0"
                    onClick={handleCreateFormIsOpen}
                  >
                    <i className="far fa-square-plus text-success fa-2x"></i>
                  </div>
                </span>
              </h1>
              {/* If user have not any establishments */}
              {establishments.length === 0 && (
                <>
                  <p>Здесь будет отображен список ваших заведений.</p>
                  <p>Чтобы добавить заведение, нажмите кнопку "+".</p>
                  <hr />
                </>
              )}
              {/* If user have any establishments*/}
              {establishments.length > 0 && (
                <>
                  {/* Render EstablishmentCard component with data*/}
                  <EstablishmentCard establishments={establishments} onEdit={handleEditEstablishment} onEditDishes={handleEditDishes} updateEstablishments={setEstablishments} />
                </>
              )}
            </div>
          )}

          {/* if user clicked on 'Добавить заведение' button, show CreateEstablishmentForm component and close handler, and update state */}
          {showCreateForm && (
            <CreateEstablishmentForm
              onClose={handleCreateFormIsClose}
              updateEstablishments={setEstablishments}
            />
          )}
          {/* If selectedEstablishmentID is set, render EditEstablishmentForm component, send establishmentId and close handler, and update state */}
          {selectedEstablishmentID && (
            <EditEstablishmentForm
              establishmentId={selectedEstablishmentID}
              onFinishEditing={handleFinishEditing}
              updateEstablishments={setEstablishments}
            />
          )}
          {/* If selectedEstablishmentID is set, render Dishes component, send establishmentId and close handler */}
          {editingDishId && (
            <Categories
              establishmentId={editingDishId}
              establishmentUrl={selectedEstablishmentURL}
              onFinishDish={handleFinishEditingDishes}
            />
          )}
        </div>
      )}
    </>
  );
}


