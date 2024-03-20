// default imports
import React, { useState, useEffect } from 'react';

//components import
import CreateEstablishmentForm from './CreateEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx'

function Establishment() {

  // establishment create form logic
  const [showForm, setShowForm] = useState(false);
  const [establishments, setEstablishments] = useState([]);
  const handleFormIsOpen = () => { setShowForm(true); };
  const handleFormIsClose = () => { setShowForm(false); };

  // get request on backend and get user establishments
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
            {/* on both cases show this button */}
              <span>
                <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-3 my-3 my-1" onClick={handleFormIsOpen}>
                  <i class="far fa-square-plus"></i>
                  Добавить заведение
                </div>
              </span>
            </h1>
            {/* if user has not establishments show this block */}
            {establishments.length === 0 && (
              <>
                <p>Здесь будет отображен список ваших заведений.</p>
                <p>Чтобы добавить заведение, нажмите кнопку "Добавить заведение".</p>
              </>
            )}
            {/* if user has establishments show this block*/}
            {establishments.length > 0 && (
              <>
                {/* this card getting user est and work with it, card with user establishments */}
                <EstablishmentCard establishments={establishments} />
              </>
            )}
          </div>
        )}
        {/* if user clicked on button 'Добавить заведение' show add establishment form */}
        {showForm && <CreateEstablishmentForm onClose={handleFormIsClose} />}
      </div>
    </>
  );
}

export default Establishment;
