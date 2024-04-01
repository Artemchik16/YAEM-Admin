import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEstablishmentForm({ establishmentId, onFinishEditing, updateEstablishments }) {
  // Set data
  const [establishmentData, setEstablishmentData] = useState(null);
  // Load handler
  const [loading, setLoading] = useState(true);
  // Set value from form
  const [name, setName] = useState('');
  const [urlName, setUrlName] = useState('');

  // Get detail data on backend on ID
  useEffect(() => {
    const fetchEstablishmentData = async () => {
      try {
        // Get token value
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
          // Send token
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEstablishmentData(response.data);
        setLoading(false);
        setName(response.data.name);
        setUrlName(response.data.url_name);
      } catch (error) {
        toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 });
        setTimeout(() => { window.location.reload() }, 1400);
      }
    };

    fetchEstablishmentData();
  }, [establishmentId]);

  // Update request on backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Get token value
      const token = sessionStorage.getItem('accessToken');
      await axios.put(`http://localhost:8000/api/v1/menu/clients/${establishmentId}/`, {
        // Send updated data if data changed
        name: name || establishmentData.name,
        url_name: urlName || establishmentData.url_name
      }, {
        // Send token
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Success block
      toast.success('Заведение обновлено', { autoClose: 2000 });
      onFinishEditing()
      // Another request on backend
      const updatedEstablishmentsResponse = await axios.get('http://localhost:8000/api/v1/menu/clients/', {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      updateEstablishments(updatedEstablishmentsResponse.data);
      // Error block
    } catch (error) {
      if (error.response && error.response.data) {
        // Validate name
        if (error.response.data.name) {
          toast.error('Имя может содержать только русские/английские буквы', { autoClose: 2000 });
        }
        // Validate URL
        if (error.response.data.url_name) {
          toast.error('URL может содержать только английские буквы', { autoClose: 2000 });
        }
      } else {
        // Other errors
        toast.error('Не удалось обновить заведение', { autoClose: 2000 });
      }
    }
  };

  if (loading) {
    return <div>Перенаправление..</div>;
  }

  return (
    <div>
      {/* Back handler */}
      <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onFinishEditing}>
        <i className="fas fa-arrow-left-long fa-lg"></i>
      </div>
      <h2>Редактирование заведения - {establishmentData.name}</h2>

      <form className="my-4" onSubmit={handleUpdate}>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
          {/* Input name handler */}
          <input
            type="text"
            className="form-control"
            defaultValue={establishmentData.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
          <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
          {/* Input url name handler */}
          <input
            type="text"
            className="form-control"
            defaultValue={establishmentData.url_name}
            value={urlName}
            onChange={(e) => setUrlName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2 btn-animate">Сохранить</button>
        </div>
      </form>
    </div>
  );
}

export default EditEstablishmentForm;
