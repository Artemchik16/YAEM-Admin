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
        city: city,
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
      console.log(city)
      if (error.response && error.response.data) {
        // Check if the error message is related to exceeding the limit on created establishments
        if (error.response.data[0] === "Вы превысили лимит на количество созданных заведений") {
          toast.error('Вы превысили лимит на количество созданных заведений', { autoClose: 2000 });
        } else {
          // Other validation errors
          if (error.response.data.name && error.response.data.name[0] === 'The name can only contain letters (Russian and English)') {
            toast.error('Имя может содержать только русские/английские буквы', { autoClose: 2000 });
          }
          if (error.response.data.url_name && error.response.data.url_name[0] === 'The URL name can only contain Latin characters') {
            toast.error('URL может содержать только английские буквы', { autoClose: 2000 });
          }
          if (error.response.data.url_name && error.response.data.url_name[0] === 'Заведение с таким /url уже существует.') {
            toast.error('URL уже занят', { autoClose: 2000 });
          }
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
        <h2 className="ms-4 my-3">Добавить заведение</h2>
        {/* Add establishment form */}
        <h6>Основная информация (*Обязательно к заполнению)</h6>
        <form className="my-1" onSubmit={handleSubmit}>
          {/* establishment name */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
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
            <span className="input-group-text"><i className="fas fa-link fa-xs"></i></span>
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
            className="form-select"
            required
          >
            <option value="">Выберите город</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
          <h6 className="mt-5 fst-cyrillic">Дополнительно (*Необазятельно к заполнению)</h6>

{/*            DESCRIPTION*/}
           <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
            <textarea
              type="text"
              className="form-control"
              placeholder="Описание заведения">
            </textarea>
          </div>

{/*  LOGO*/}
          <div class="input-group">
          <label class="input-group-text" for="inputGroupFile01">Логотип</label>
          <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
        </div>

{/*          Address*/}
        <div className="input-group my-3">
            <span className="input-group-text"><i class="fas fa-location-dot"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Адрес заведения"
            />
          </div>


{/*          Phone*/}
        <div className="input-group mt-3">
            <span className="input-group-text"><i class="fas fa-phone"></i></span>
            <input
              type="phone"
              className="form-control"
              placeholder="АРТЁМ ПИДОР"
            />
        </div>
        <em><label className="my-0 text-muted ms-3">Телефон для связи / заказов WhatsApp</label></em>

        {/*          Instagram*/}
        <div className="input-group mt-3">
            <span className="input-group-text"><i class="fab fa-instagram"></i></span>
            <input
              type="phone"
              className="form-control"
              placeholder="Ссылка на Instagram"
            />
        </div>
        <em><label className="my-0 text-muted ms-3">Пример - https://www.instagram.com/yaem_qr/</label></em>

        {/*          2gis*/}
        <div className="input-group mt-3">
            <span className="input-group-text"><i class="fas fa-map-location-dot"></i></span>
            <input
              type="phone"
              className="form-control"
              placeholder="Ссылка на 2Gis"
            />
        </div>
        <em><label className="my-0 text-muted ms-3">Пример - https://go.2gis.com/d9pf44</label></em>

        {/*          Outside / Delivery*/}
        <div class="input-group my-3">
          <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
              <label class="form-check-label" for="flexCheckDefault1">Самовывоз</label>
          </div>
           <div class="form-check mx-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
              <label class="form-check-label" for="flexCheckDefault2">Доставка</label>
          </div>
        </div>


   {/*          Service % Fee*/}
        <div className="input-group mt-3">
            <span className="input-group-text"><i class="fas fa-percent"></i></span>
            <input
              type="phone"
              className="form-control"
              placeholder="АРТЁМ ПИДОР 2"
            />
        </div>
        <em><label className="my-0 text-muted ms-3">Процент обслуживания для отображения в корзине гостя</label></em>

 {/*          WiFi % Password*/}
        <div class="input-group my-3">
          <span class="input-group-text">Wi-Fi</span>
          <span className="input-group-text"><i class="fas fa-wifi"></i></span>
          <input type="text" aria-label="First name" class="form-control" />
          <span className="input-group-text"><i class="fas fa-lock"></i></span>
          <input type="text" aria-label="Last name" class="form-control" />
        </div>

         {/*          WiFi % Password*/}
        <div class="input-group my-3">
          <span class="input-group-text">Рабочеее время</span>
          <span className="input-group-text">Начало дня</span>
          <input type="text" aria-label="First name" class="form-control" />
          <span className="input-group-text">Конец дня</span>
          <input type="text" aria-label="Last name" class="form-control" />
        </div>

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
