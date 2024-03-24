import React, { useState, useEffect } from 'react';
import CreateEstablishmentForm from './CreateEstablishmentForm.jsx';
import EditEstablishmentForm from './EditEstablishmentForm.jsx';
import EstablishmentCard from './EstablishmentCard.jsx';

function Establishment() {
  const [editingEstablishmentId, setEditingEstablishmentId] = useState(null);
  const [showEstablishments, setShowEstablishments] = useState(true); 

  const handleEditEstablishment = (establishmentId) => {
    setEditingEstablishmentId(establishmentId);
    setShowEstablishments(false); 
  };

  const handleFinishEditing = () => {
    setEditingEstablishmentId(null);
    setShowEstablishments(true); 
  };

  const handleCreateFormIsOpen = () => { setShowCreateForm(true); };
  const handleCreateFormIsClose = () => { setShowCreateForm(false); };

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [establishments, setEstablishments] = useState([]);

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
      } catch (error) {
        console.error('Ошибка при получении списка заведений');
      }
    };

    fetchEstablishments();
  }, []);

  return (
    <>
      <div className="col-10 col-sm-9 py-4">

        {showEstablishments && !showCreateForm && (
          <div className="container px-0">
            <h1 className="ms-4 mb-3">Заведения
              <span>
                <div className="btn shadow-0 btn-outline-success btn-rounded btn-animate px-3 my-1 mx-2" onClick={handleCreateFormIsOpen}>
                  <i class="far fa-square-plus me-2"></i>
                  Добавить заведение
                </div>
              </span>
            </h1>
            {establishments.length === 0 && (
              <>
                <p>Здесь будет отображен список ваших заведений.</p>
                <p>Чтобы добавить заведение, нажмите кнопку "Добавить заведение".</p>
                <hr />
              </>
            )}
            {establishments.length > 0 && (
              <>
                <EstablishmentCard establishments={establishments} onEdit={handleEditEstablishment} />
              </>
            )}
          </div>
        )}

        {showCreateForm && (
          <CreateEstablishmentForm onClose={handleCreateFormIsClose} />
        )}

        {editingEstablishmentId && (
          <EditEstablishmentForm establishmentId={editingEstablishmentId} onFinishEditing={handleFinishEditing} />
        )}
      </div>
    </>
  );
}

export default Establishment;
