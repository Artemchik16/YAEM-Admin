// Import react
import React, { useState, useEffect } from 'react';
// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import axios(HTTP)
import axios from "axios";
// Import urls
import apiUrls from "../utils/ApiUrls.js";
// Import intro js(user guide)
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
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
  // User hints/guide and handlers
  const [stepEnabled, setStepEnabled] = useState(true);
  const [steps, setSteps] = useState([
    { element: '#start-guide', intro: 'Тут будет отображаться список ваших заведений.' },
    { element: "#create-establishment", intro: "Создайте заведение.", },
    { element: "#edit-establishment", intro: "Редактируйте заведение.", },
    { element: "#qr-review", intro: "Скачайте QR код или перейдите в меню", },
    { element: "#create-menu", intro: "Создайте меню", },
  ]);
  const onExit = () => {
    setStepEnabled(true);
  };

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
        if (error.response && error.responеse.status && error.response.status === 401) {
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
                  <div id='create-establishment' className="btn shadow-0 btn-animate px-3 my-1 mx-2 py-0"
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
                  {/* Show user guide, only if user has not any establishments */}
                  <h1 id='start-guide'>GUIDE CARD COMPONENT</h1>
                  {/* Display demo establishment card for user guide */}
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title ms-2 me-0 pe-0">Element
                        {/* Edit button */}
                        <div id='edit-establishment' className="btn btn-animate my-1 shadow-0 ms-1 me-0 px-0 py-0">
                          <i className="fas fa-pen fa-lg"></i>
                        </div>
                        <p className="my-3 fs-6 text-muted">г.R</p>
                      </h5>
                    </div>
                    <div className="d-flex flex-wrap justify-content-evenly text-center my-3">
                      {/* QR button */}
                      <div id='qr-review' className="btn btn-animate my-1" style={{ width: '70px' }}>
                        <i className="fas fa-qrcode fa-lg"></i>
                      </div>
                      {/* Menu button */}
                      <div id='create-menu' className="btn btn-animate my-1" style={{ width: '70px' }}>
                        <i className="fas fa-book-open fa-lg"></i>
                      </div>
                      {/* Delete button */}
                      <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}>
                        <i className="fas fa-trash fa-lg"></i>
                      </div>
                    </div>
                  </div>
                  {/* Display steps handler */}
                  <Steps
                    enabled={stepEnabled}
                    steps={steps}
                    initialStep={0}
                    options={{
                      nextLabel: 'Далее',
                      prevLabel: 'Назад',
                      doneLabel: 'Понятно'
                    }}
                    onExit={onExit}
                  />
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


