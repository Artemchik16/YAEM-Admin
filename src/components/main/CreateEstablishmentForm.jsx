import React, { useState, useEffect } from "react";
import axios from "axios";
// Import messages library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateEstablishmentForm({ onClose }) {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState(""); // Selected city ID
  const [cities, setCities] = useState([]); // List of cities

  // Fetch list of cities from backend
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
      // Save success message in session storage
      sessionStorage.setItem('SuccessCreateEstablishment', 'Заведение успешно созданно');
      // Close the form after successful creation
      onClose();
      // Reload page
      window.location.reload();

      // Error block
    } catch (error) {
      // console.error("Error creating establishment:", error);
      toast.error('Ошибка при создании заведения', { autoClose: 2000 });
    }
  };

  return (
    <div className="container">
      <div className="create-establishment">
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

          {/* Submit and close handlers */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
            <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEstablishmentForm;
