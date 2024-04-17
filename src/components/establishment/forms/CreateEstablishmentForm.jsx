// Import react
import React, { useState, useEffect } from "react";
// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import axios(HTTP)
import axios from "axios";
// Import MDB
import { MDBInput, MDBTextArea, MDBSwitch } from "mdb-react-ui-kit";
// Import urls
import apiUrls from "../../utils/ApiUrls";
// Import errors
import { CreateAndUpdateEstablishmentErrors } from '../../utils/Errors';


export default function CreateEstablishmentForm({ onClose, updateEstablishments }) {
  // Get user auth token
  const userToken = sessionStorage.getItem('accessToken');
  // State for visibility other(not required) info block
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  // Set success state
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  // Set name state
  const [name, setName] = useState("");
  // Set URL state
  const [url, setUrl] = useState("");
  // Set city state
  const [city, setCity] = useState("");
  // Set cities list state
  const [cities, setCities] = useState([]);
  // Set description state
  const [description, setDescription] = useState('');
  // Set logo state
  const [logo, setLogo] = useState("");
  // Create a new FormData object for uploading logo
  const formData = new FormData();
  formData.append('logo', logo);
  // Delete logo handler
  const handleDeleteLogo = () => {
    setLogo("");
    document.getElementById('inputGroupFile04').value = "";
  };
  // Set address state
  const [address, setAddress] = useState("");
  // Set phone state
  const [phone, setPhone] = useState("");
  // Set Instagram link state
  const [instagramLink, setInstagramLink] = useState("");
  // Set 2GIS link state
  const [twogisLink, setTwogisLink] = useState("");
  // Set outside seating state
  const [outside, setOutside] = useState(false);
  // Set delivery state
  const [delivery, setDelivery] = useState(false);
  // Set service state
  const [service, setService] = useState("");
  // Set Wi-Fi name state
  const [wifiName, setWifiName] = useState("");
  // Set Wi-Fi password state
  const [wifiPassword, setWifiPassword] = useState("");
  // Set working hours start time state
  const [workTimeStart, setWorkTimeStart] = useState('00:00');
  // Set working hours end time state
  const [workTimeEnd, setWorkTimeEnd] = useState('00:00');

  // When loading the component we get a list of all cities
  useEffect(() => {
    axios.get(apiUrls.city, {
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
    // Prevent default form behavior
    e.preventDefault();
    try {
      // Required fields dict
      let establishmentDict = {
        name: name,
        url_name: url,
        city: city,
      };
      // Other data(not required), if value exist, add to establishmentDict dict
      if (description !== '') establishmentDict.description = description;
      if (logo !== '') establishmentDict.logo = logo;
      if (address !== '') establishmentDict.address = address;
      if (phone !== '') establishmentDict.phone = phone;
      if (instagramLink !== '') establishmentDict.inst = instagramLink;
      if (twogisLink !== '') establishmentDict.two_gis = twogisLink;
      if (outside == true) establishmentDict.outside = outside;
      if (delivery == true) establishmentDict.delivery = delivery;
      if (service !== '') establishmentDict.service = service;
      if (wifiName !== '') establishmentDict.wifi = wifiName;
      if (wifiPassword !== '') establishmentDict.wifi_password = wifiPassword;
      if (workTimeStart && workTimeStart !== '00:00') establishmentDict.work_time_start = workTimeStart;
      if (workTimeEnd && workTimeEnd !== '00:00') establishmentDict.work_time_end = workTimeEnd;
      // Post request on backend
      await axios.post(apiUrls.client, establishmentDict, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(`Заведение '${name.charAt(0).toUpperCase() + name.slice(1)}' успешно созданно`, { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      // Close create form
      onClose()
      // Get request on backend
      const updatedEstablishmentsResponse = await axios.get(apiUrls.client, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      // Update establishment component after creating
      updateEstablishments(updatedEstablishmentsResponse.data);
    } catch (error) {
      // Limit error
      if (error.response.data[0] === "Establishment: limit error") {
        toast.error('Вы превысили лимит на количество созданных заведений', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      }
      // Call error handler
      CreateAndUpdateEstablishmentErrors(error);
    }
    finally {
      // Disabled save button and set disabled time
      setIsCreateButtonClicked(true)
      setTimeout(() => { setIsCreateButtonClicked(false); }, 2000);
    }
  };
  // HTML block
  return (
    <div className="container">
      <div className="create-establishment">
        {/* Back handler */}
        <div className="btn shadow-0 btn-animate my-auto" onClick={onClose}>
          <i className="fas fa-arrow-left-long fa-lg"></i>
        </div>
        <hr className="my-0" />
        <h2 className="my-3">Добавить заведение</h2>
        <h6 className="my-3">Основная информация </h6>
        {/* Add establishment form */}
        {/* Form handler */}
        <form className="my-1" onSubmit={handleSubmit}>

          <div className="input-group mb-4">
            <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
            {/* Establishment name */}
            <MDBInput
              type="text"
              label="Название заведения"
              placeholder="Кафе"
              maxLength="20" showCounter={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text"><i className="fas fa-link fa-xs"></i></span>
            <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
            {/* Establishment url */}
            <MDBInput
              type="text"
              label="URL имя"
              placeholder="cafe"
              maxLength="20" showCounter={true}
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
          <button type="button" className="btn btn-outline-secondary mt-4 btn-animate px-2" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Показать дополнительные поля <i class="fas fa-circle-chevron-down ms-1"></i></button>
          {/* Show this block if additionainfo button clicked */}
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
                <label class="input-group-text" for="inputGroupFile01"><i class="far fa-image"></i></label>
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile04"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>
              <small id='helperTextExample' className='form-helper text-muted'>
                Размер файла не более 1мб.
              </small>
              {/* If logo has uploaded, show reset button */}
              {logo != '' && (
                <p className="text-primary" onClick={handleDeleteLogo}>Удалить изображение</p>
              )}

              {/* Establishment address*/}
              <div className="input-group mb-4">
                <span className="input-group-text"><i class="fas fa-location-dot"></i></span>
                <MDBInput
                  type="text"
                  label="Адрес заведения"
                  maxLength="50" showCounter={true}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Establishment phone*/}
              <div className="input-group mb-4">
                <span className="input-group-text"><i class="fas fa-phone"></i></span>
                <MDBInput
                  type="text"
                  label="Телефон заведения"
                  placeholder="+7..."
                  maxLength="12" showCounter={true}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Establishment instagram*/}
              <div className="input-group mb-4">
                <span className="input-group-text"><i class="fab fa-instagram"></i></span>
                <MDBInput
                  type="text"
                  label="Ссылка на Instagram"
                  placeholder="instagram.com/yaem_qr/"
                  maxLength="100" showCounter={true}
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />
              </div>

              {/* Establishment 2gis*/}
              <div className="input-group mb-3">
                <span className="input-group-text"><i class="fas fa-map-location-dot"></i></span>
                <MDBInput
                  type="text"
                  label="Ссылка на 2Gis"
                  placeholder="go.2gis.com/d9pf44"
                  maxLength="150" showCounter={true}
                  value={twogisLink}
                  onChange={(e) => setTwogisLink(e.target.value)}
                />
              </div>

              {/* Establishment Outside/Delivery */}
              <div class="form-check mx-0 px-0 my-1">
                <MDBSwitch
                  checked={outside}
                  label='Самовывоз'
                  onChange={() => setOutside(!outside)}
                />
              </div>
              <div class="form-check mx-0 px-0">
                <MDBSwitch
                  checked={delivery}
                  label='Доставка'
                  onChange={() => setDelivery(!delivery)}
                />
              </div>

              {/* Establishment Service */}
              <div className="input-group mt-3">
                <span className="input-group-text"><i class="fas fa-percent"></i></span>
                <MDBInput
                  type="text"
                  label="Процент обслуживания"
                  maxLength="2" showCounter={true}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>

              {/* Establishment WiFi/Password */}
              <div class="input-group my-4">
                <span className="input-group-text"><i class="fas fa-wifi"></i></span>
                <MDBInput
                  type="text"
                  label='Wi-Fi'
                  maxLength="30" showCounter={true}
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
                  placeholder="10:00"
                  value={workTimeStart}
                  onChange={(e) => setWorkTimeStart(e.target.value)}
                />
                <MDBInput
                  placeholder="21:00"
                  value={workTimeEnd}
                  onChange={(e) => setWorkTimeEnd(e.target.value)}
                />
              </div>
              {/* Save button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success my-3 me-2"
                  disabled={isCreateButtonClicked}
                >
                  Добавить
                </button>
              </div>
            </>
          )}
          {/* Save button */}
          {/* Show save button if button with additional information not clicked */}
          {!isAdditionalInfoVisible && (
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-success my-3 me-2"
                disabled={isCreateButtonClicked}
              >
                Добавить
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
