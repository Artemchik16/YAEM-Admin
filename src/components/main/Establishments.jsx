// Default imports
import React, { useState, useEffect } from 'react';

// Components import
import CreateEstablishmentForm from './CreateEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx'

function Establishment() {

  // Establishment create form logic
  const [showForm, setShowForm] = useState(false);
  const [establishments, setEstablishments] = useState([]);

  // Function to open establishment creation form
  const handleFormIsOpen = () => { setShowForm(true); };
  // Function to close establishment creation form
  const handleFormIsClose = () => { setShowForm(false); };

  // Fetch user establishments from the backend on component mount
  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8000/api/v1/menu/clients/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEstablishments(data);
        console.log(data)
      } catch (error) {
        console.error('Ошибка при получении списка заведений:', error);
      }
    };

    fetchEstablishments();
  }, []);

  return (
    <>
      <div className="col-10 col-sm-9 py-4">
        {!showForm && (
          <div className="container px-0">
            <h1 className="ms-4 mb-3">Заведения
              <span>
                {/* Button to open establishment creation form */}
                <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-3 my-1" onClick={handleFormIsOpen}>
                  <i class="far fa-square-plus"></i>
                  Добавить заведение
                </div>
              </span>
            </h1>
            {/* Rendered when user has no establishments */}
            {establishments.length === 0 && (
              <>
                <p>Здесь будет отображен список ваших заведений.</p>
                <p>Чтобы добавить заведение, нажмите кнопку "Добавить заведение".</p>
                <hr />
              </>
            )}
            {/* Rendered when user has establishments */}
            {establishments.length > 0 && (
              <>
                {/* Render establishment card with user's establishments */}
                <EstablishmentCard establishments={establishments} />
              </>
            )}
          </div>
        )}
        {/* Render establishment creation form when 'showForm' state is true */}
        {showForm && <CreateEstablishmentForm onClose={handleFormIsClose} />}
      </div>
    </>
  );
}

export default Establishment;
