import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEstablishmentForm({ establishmentId, onFinishEditing }) {
  const [establishmentData, setEstablishmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [urlName, setUrlName] = useState('');

  useEffect(() => {
    const fetchEstablishmentData = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEstablishmentData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 });
        setTimeout(() => { window.location.reload() }, 1400);
      }
    };

    fetchEstablishmentData();
  }, [establishmentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.put(`http://localhost:8000/api/v1/menu/clients/${establishmentId}/`, {
        name: name || establishmentData.name,
        url_name: urlName || establishmentData.url_name
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Save success message in session storage
      sessionStorage.setItem('SuccessUpdatedEstablishment', 'Заведение обновлено')
      // Close the form after successful editing
      onFinishEditing();
      // Reload page
      window.location.reload()
    } catch (error) {
      toast.error('Не удалось обновить заведение.');
    }
  };

  if (loading) {
    return <div>Перенаправление..</div>;
  }

  return (
    <div>
      <h2>Редактирование заведения - {establishmentData.name}</h2>

      <form className="my-4" onSubmit={handleUpdate}>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder={establishmentData.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
          <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
          <input
            type="text"
            className="form-control"
            placeholder={establishmentData.url_name}
            value={urlName}
            onChange={(e) => setUrlName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2 btn-animate">Сохранить</button>
          <button className="btn btn-danger" onClick={onFinishEditing}>Отменить</button>
        </div>
      </form>
    </div>
  );
}

export default EditEstablishmentForm;
