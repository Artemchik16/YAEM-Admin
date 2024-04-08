import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBInput, MDBTextArea, MDBSwitch } from "mdb-react-ui-kit";


function CreateEstablishmentForm({ onClose, updateEstablishments }) {
  // Get user auth token
  const userToken = sessionStorage.getItem('accessToken');
  // State for visibility other info block
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  // States block for user data
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState("");
  const formData = new FormData();
  formData.append('logo', logo);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twogisLink, setTwogisLink] = useState("");
  const [outside, setOutside] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [service, setService] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [workTimeStart, setWorkTimeStart] = useState('00:00');
  const [workTimeEnd, setWorkTimeEnd] = useState('00:00');

  // Get request on a list of cities from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/menu/city/", {
      // Send token on backend
      headers: {
        'Authorization': `Bearer ${userToken}`,
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

  // Post request on backend, create establishment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Required fields dict
      let requestData = {
        name: name,
        url_name: url,
        city: city,
      };
      // Other data, if vslue exist, add to requestData dict
      if (description !== '') requestData.description = description;
      if (logo !== '') requestData.logo = logo;
      if (address !== '') requestData.address = address;
      if (phone !== '') requestData.phone = phone;
      if (instagramLink !== '') requestData.inst = instagramLink;
      if (twogisLink !== '') requestData.two_gis = twogisLink;
      if (outside == true) requestData.outside = outside;
      if (delivery == true) requestData.delivery = delivery;
      if (service !== '') requestData.service = service;
      if (wifiName !== '') requestData.wifi = wifiName;
      if (wifiPassword !== '') requestData.wifi_password = wifiPassword;
      if (workTimeStart && workTimeStart !== '00:00') requestData.work_time_start = workTimeStart;
      if (workTimeEnd && workTimeEnd !== '00:00') requestData.work_time_end = workTimeEnd;
      // Post request on backend
      await axios.post("http://127.0.0.1:8000/api/v1/menu/clients/", requestData, {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Success block
      toast.success(`Заведение '${name.charAt(0).toUpperCase() + name.slice(1)}' успешно созданно`, { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      onClose()
      console.log(requestData)
      // Get request on backend
      const updatedEstablishmentsResponse = await axios.get('http://localhost:8000/api/v1/menu/clients/', {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      updateEstablishments(updatedEstablishmentsResponse.data);
      // Error block
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data[0] === "Establishment: limit error") {
          toast.error('Вы превысили лимит на количество созданных заведений', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        } else {
          if (error.response.data.name && error.response.data.name[0] === 'Name: only ru/en/num characters') {
            toast.error('Имя может содержать только русские/английские/численные символы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.name && error.response.data.name[0] === 'Убедитесь, что это значение содержит не более 20 символов.') {
            toast.error('Название не может содержать больше 20 символов', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.url_name && error.response.data.url_name[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('URL не может содержать больше 30 символов', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.url_name && error.response.data.url_name[0] === 'The URL name can only contain Latin characters') {
            toast.error('URL может содержать только английские буквы', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.url_name && error.response.data.url_name[0] === 'Заведение с таким /url уже существует.') {
            toast.error('URL уже занят', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.description && error.response.data.description[0] === 'Убедитесь, что это значение содержит не более 200 символов.') {
            toast.error('Описание не может содержать больше 200 символов', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.logo && error.response.data.logo[0] === 'Загруженный файл не является корректным файлом.') {
            toast.error('Загруженный файл не является корректным файлом', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.address && error.response.data.address[0] === 'Убедитесь, что это значение содержит не более 50 символов.') {
            toast.error('Адрес не может содержать больше 50 символов', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.phone && error.response.data.phone[0] === 'Требуется численное значение.') {
            toast.error('Неверный формат номера телефона', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.phone && error.response.data.phone[0] === 'Phone: correct format - "+7XXXXXXXXXX" or "8XXXXXXXXXX"') {
            toast.error('Неверный формат номера телефона', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.inst && error.response.data.inst[0] === 'Instagram error: pattern - https://www.instagram.com/*') {
            toast.error('Не корректный формат ссылки Instagram', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.inst && error.response.data.inst[0] === 'Убедитесь, что это значение содержит не более 100 символов.') {
            toast.error('Instagram не может содержать больше 100 символов.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.two_gis && error.response.data.two_gis[0] === 'Two gis error: pattern - https://2gis/*/*') {
            toast.error('Не корректный формат ссылки Two gis', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.two_gis && error.response.data.two_gis[0] === 'Убедитесь, что это значение содержит не более 150 символов.') {
            toast.error('Two gis не может содержать больше 150 символов.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.service && error.response.data.service[0] === 'Введите правильное число.') {
            toast.error('Процент обсулживания должен быть числом.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.service && error.response.data.service[0] === 'Service: only range(1, 100)') {
            toast.error('Процент обсулживания должен быть не более 100.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.wifi && error.response.data.wifi[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('WIFI не может содержать больше 30 символов.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.wifi_password && error.response.data.wifi_password[0] === 'Убедитесь, что это значение содержит не более 30 символов.') {
            toast.error('WIFI-Пароль не может содержать больше 30 символов.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.work_time_start && error.response.data.work_time_start[0] === 'Неправильный формат времени. Используйте один из этих форматов: hh:mm[:ss[.uuuuuu]].') {
            toast.error('Неправильный формат времени(hh:mm).', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
          if (error.response.data.work_time_end && error.response.data.work_time_end[0] === 'Неправильный формат времени. Используйте один из этих форматов: hh:mm[:ss[.uuuuuu]].') {
            toast.error('Неправильный формат времени(hh:mm).', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
          }
        }
      } else {
        // Other errors
        toast.error('Ошибка при создании заведения', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
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
        <h6>Основная информация (*Обязательно к заполнению)</h6>
        {/* Add establishment form */}
        {/* Form handler */}
        <form className="my-1" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
            {/* Establishment name */}
            <MDBInput
              type="text"
              label="Название заведения"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-link fa-xs"></i></span>
            <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
            {/* Establishment url */}
            <MDBInput
              type="text"
              label="URL имя"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          {/* Establishment city */}
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
          {/* Button to open a block with additional information */}
          <button type="button" className="btn btn-outline-secondary mt-4 btn-animate" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Необязательные поля <i class="fas fa-circle-chevron-down ms-1"></i></button>
          {/* Show this block if button clicked */}
          {isAdditionalInfoVisible && (
            <>
              {/* Establishment description */}
              <div className="input-group mt-4 mb-3">
                <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
                <MDBTextArea
                  type="text"
                  label="Описание заведения"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Establishment logo */}
              <div class="input-group">
                <label class="input-group-text" for="inputGroupFile01">Логотип</label>
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile04"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>

              {/* Establishment address*/}
              <div className="input-group my-3">
                <span className="input-group-text"><i class="fas fa-location-dot"></i></span>
                <MDBInput
                  type="text"
                  label="Адрес заведения"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* Establishment phone*/}
              <div className="input-group mt-3">
                <span className="input-group-text"><i class="fas fa-phone"></i></span>
                <MDBInput
                  type="text"
                  label="Телефон для связи / заказов WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {/* Establishment instagram*/}
              <div className="input-group mt-3">
                <span className="input-group-text"><i class="fab fa-instagram"></i></span>
                <MDBInput
                  type="text"
                  label="Ссылка на Instagram: Пример - https://www.instagram.com/yaem_qr/"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />
              </div>
              {/* Establishment 2gis*/}
              <div className="input-group mt-3">
                <span className="input-group-text"><i class="fas fa-map-location-dot"></i></span>
                <MDBInput
                  type="text"
                  label="Ссылка на 2Gis: Пример - https://go.2gis.com/d9pf44"
                  value={twogisLink}
                  onChange={(e) => setTwogisLink(e.target.value)}
                />
              </div>
              {/* Establishment Outside/Delivery */}
              <div class="input-group my-3">
                <div class="form-check">
                  <MDBSwitch
                    checked={outside}
                    label='Самовывоз'
                    onChange={() => setOutside(!outside)}
                  />
                </div>
                <div class="form-check mx-3">
                  <MDBSwitch
                    checked={delivery}
                    label='Доставка'
                    onChange={() => setDelivery(!delivery)}
                  />
                </div>
              </div>
              {/* Establishment Service */}
              <div className="input-group mt-3">
                <span className="input-group-text"><i class="fas fa-percent"></i></span>
                <MDBInput
                  type="phone"
                  label="Процент обслуживания для отображения в корзине гостя"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              {/* Establishment WiFi/Password */}
              <div class="input-group my-3">
                <span class="input-group-text">Wi-Fi</span>
                <span className="input-group-text"><i class="fas fa-wifi"></i></span>
                <MDBInput
                  type="text"
                  label='Название'
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                />
                <span className="input-group-text"><i class="fas fa-lock"></i></span>
                <MDBInput
                  type="text"
                  label='Пароль'
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                />
              </div>

              {/* Establishment work time */}
              <div className="input-group my-3">
                <span className="input-group-text">Рабочее время</span>
                <MDBInput
                  value={workTimeStart}
                  onChange={(e) => setWorkTimeStart(e.target.value)}
                />
                <MDBInput
                  value={workTimeEnd}
                  onChange={(e) => setWorkTimeEnd(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
              </div>
            </>
          )}
          {/* Submit button */}
          {/* Show this button if button with additional information not clicked */}
          {!isAdditionalInfoVisible && (
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateEstablishmentForm;
