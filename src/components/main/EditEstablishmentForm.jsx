// Default import
import React, { useState, useEffect } from 'react';
// HTTP import lybrary
import axios from 'axios';
// Messages import lybrary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditEstablishmentForm({ establishmentId, onFinishEditing }) {
  
  // State variables for storing establishment data and loading status
  const [establishmentData, setEstablishmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get detail data from backend, send get request
    const fetchEstablishmentData = async () => {
      try {
        // Get token value
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
          // Send token on backend
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEstablishmentData(response.data);
        setLoading(false);
      } catch (error) {
        // error message 
        toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 })
        // if error on backend, reload page
        setTimeout(() => { window.location.reload() }, 1400);
      }
    };

    fetchEstablishmentData();
  }, [establishmentId]);
  // if error on backend show this block
  if (loading) {
    return <div>Перенаправление..</div>;
  }
  // if success
  return (
    <div>
      <h2>Редактирование заведения - {establishmentData.name}</h2>

      {/* Partialy or completly change form */}
      <form className="my-4" method=''>
        {/* field name.. */}
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
          {/* Get defaul value and handle changes */}
          <input
            type="text"
            className="form-control"
            placeholder={establishmentData.name}
          />
        </div>
        {/* field name.. */}
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
          <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
          {/* Get defaul value and handle changes */}
          <input
            type="text"
            className="form-control"
            placeholder="URL_NAME"
          />
        </div>
        {/* field name.. */}
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="far fa-file-image fa-xs text-muted"></i></span>
          <input type="file" className="form-control" id="inputGroupFile01" />
        </div>
        {/* field name.. */}
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-phone fa-xs text-muted"> +</i></span>
          <input
            type="number"
            className="form-control"
            placeholder="PHONE NUMBER"
          />
        </div>
        {/* field name.. */}
        <p className="text mb-0">Выберите город</p>
        <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
        <select data-mdb-select-init className="select">
          <option value="1">One</option>
        </select>
        {/* field name.. */}
        <p className="text mb-0 mt-3">Описание</p>
        <div className="input-group mb-3">
          <textarea className="form-control" aria-label="With textarea" placeholder="DESCRIPTION"></textarea>
        </div>
        {/* field name.. */}
        {/* <div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-wifi fa-xs text-muted"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="Название Wi-Fi"
          />
        </div> */}
        {/* field name.. */}
        {/* <div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-lock fa-xs text-muted"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="Пароль Wi-Fi"
            value-aria-invalid="true"
            value="123"
          />
        </div> */}
      </form>
      <div className="d-flex justify-content-center">
        {/* send data on backend */}
        <button type='submit' className="btn btn-success me-2 btn-animate">Сохранить</button>
        {/* close this block and retuen cards */}
        <button className="btn btn-danger" onClick={onFinishEditing}>Отменить</button>
      </div>
    </div>

  );
}

export default EditEstablishmentForm;
