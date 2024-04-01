import React, { useState, useEffect } from "react";
import axios from "axios";
// Import messages library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateEstablishmentForm({ onClose, updateEstablishments }) {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState(""); // Selected city ID
  const [cities, setCities] = useState([]); // List of cities

  // Get list of cities from backend
  useEffect(() => {
    // Get access token value
    const token = sessionStorage.getItem('accessToken');
    axios.get("http://127.0.0.1:8000/api/v1/menu/city/", {
      // Send token on backend
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      // Set cities 
      .then(response => {
        setCities(response.data);
      })
      // Error block
      .catch(error => {
        toast.error('Ошибка при получении городов', { autoClose: 2000 });
      });
  }, []);

  // Post on backend, create establishment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get access token value
      const token = sessionStorage.getItem('accessToken');
      await axios.post("http://127.0.0.1:8000/api/v1/menu/clients/", {
        // Send data
        name: name,
        url_name: url,
        city_id: city,
      }, {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Success block
      toast.success(`Заведение ${name.charAt(0).toUpperCase() + name.slice(1)} успешно созданно`, { autoClose: 2000 });
      onClose()
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
          toast.error('URL может содержать только английские буквы или он уже занят', { autoClose: 2000 });
        }
      } else {
        // Other errors
        toast.error('Ошибка при создании заведения', { autoClose: 2000 });
      }
    }
  };

  return (
    <div className="container">
      <div className="create-establishment">
        {/* Back handler */}
        <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onClose}>
          <i className="fas fa-arrow-left-long fa-lg"></i>
        </div>
        <h2>Добавить заведение</h2>
        {/* Add establishment form */}
        <form className="my-4" onSubmit={handleSubmit}>
          {/* establishment name */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
            {/* handle input */}
            <input
              type="text"
              className="form-control"
              placeholder="Название заведения"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* establishment url */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
            <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
            {/* handle input */}
            <input
              type="text"
              className="form-control"
              placeholder="URL имя"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          {/* establishment city */}
          <p className="text mb-0">Выберите город</p>
          {/* handle select */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="select"
            required
          >
            <option value="">Выберите город</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>

          {/* Submit handler */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEstablishmentForm;
