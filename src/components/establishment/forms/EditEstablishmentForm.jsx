// Import react
import React, { useState, useEffect } from "react";
// Import axios(HTTP)
import axios from "axios";
// Import toast(messages)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import MDB
import { MDBInput, MDBTextArea, MDBSwitch } from "mdb-react-ui-kit";
// Import urls
import apiUrls from "../../utils/ApiUrls";
// Import errors
import { CreateAndUpdateEstablishmentErrors } from '../../utils/Errors';


function EditEstablishmentForm({ establishmentId, onFinishEditing, updateEstablishments }) {
  // Get user auth token
  const userToken = sessionStorage.getItem('accessToken');
  // Set data
  const [establishmentData, setEstablishmentData] = useState(null);
  // State for visibility other info block
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  // Set success state
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  // Set form changed flag
  const [formChanged, setFormChanged] = useState(false);
  // Load handler
  const [loading, setLoading] = useState(true);

  // Set name state
  const [name, setName] = useState('');
  // Set url state
  const [urlName, setUrlName] = useState('');
  // Set city state
  const [city, setCity] = useState('');
  // Set cities list state
  const [cities, setCities] = useState([]);
  // Set description state
  const [description, setDescription] = useState('');
  // Set logo state
  const [logo, setLogo] = useState(null);
  // Create a new FormData object for uploading logo
  const formData = new FormData();
  formData.append('logo', logo);
  // Delete logo handler
  const handleDeleteLogo = () => {
    setLogo(null);
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
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        toast.error('Ошибка при получении городов', { autoClose: 2000 });
      });
  }, []);

  // When loading the component we get detailed data for editing
  useEffect(() => {
    const getEstablishmentData = async () => {
      try {
        const response = await axios.get(`${apiUrls.client}${establishmentId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        // Set actualy data
        setEstablishmentData(response.data);
        // Disable loading state when receiving data successfully
        setTimeout(() => { setLoading(false); }, 200)
        // Set all received data
        setName(response.data.name);
        setUrlName(response.data.url_name);
        setCity(response.data.city);
        setDescription(response.data.description);
        setLogo(response.data.logo);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setInstagramLink(response.data.inst);
        setTwogisLink(response.data.two_gis);
        setOutside(response.data.outside);
        setDelivery(response.data.delivery);
        setService(response.data.service);
        setWifiName(response.data.wifi);
        setWifiPassword(response.data.wifi_password);
        setWorkTimeStart(response.data.work_time_start);
        setWorkTimeEnd(response.data.work_time_end);
      } catch (error) {
        toast.error('Невозможно получить информацию о заведении.', { autoClose: 1000 });
        setTimeout(() => { window.location.reload() }, 1400);
      }
    };
    getEstablishmentData();
  }, [establishmentId]);

  // Put request on backend, edit establishment
  const handleUpdate = async (e) => {
    // Prevent default form behavior
    e.preventDefault();
    try {
      // if the field has been changed from its original state, then add it to the dictionary
      const requestData = {
        name: name || establishmentData.name,
        url_name: urlName || establishmentData.url_name,
        city: city || establishmentData.city,
        description: description || establishmentData.description,
        address: address || establishmentData.address,
        phone: phone || establishmentData.phone,
        inst: instagramLink || establishmentData.inst,
        two_gis: twogisLink || establishmentData.two_gis,
        service: service || establishmentData.service,
        wifi: wifiName || establishmentData.wifi,
        wifi_password: wifiPassword || establishmentData.wifi_password,
        work_time_start: workTimeStart || establishmentData.work_time_start,
        work_time_end: workTimeEnd || establishmentData.work_time_end,
        ...(outside !== null && { outside }),
        ...(delivery !== null && { delivery }),
      };
      if (logo != null) {
        requestData.logo = logo;
      }
      // Update establishment
      await axios.patch(`${apiUrls.client}${establishmentId}/`, requestData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Заведение обновлено.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      // Close edit form
      onFinishEditing()
      // Another request on backend
      const updatedEstablishmentsResponse = await axios.get('https://yaem.kz/api/v1/menu/clients/', {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      // Update establishment component after editing
      updateEstablishments(updatedEstablishmentsResponse.data);
    } catch (error) {
      // Call error handler
      CreateAndUpdateEstablishmentErrors(error)
    }
    finally {
      // Disabled edit button and set disabled time
      setIsEditButtonClicked(true)
      setTimeout(() => { setIsEditButtonClicked(false); }, 2000);
    }
  };

  // Tracking changes to each field in the form
  useEffect(() => {
    setFormChanged(
      name !== establishmentData?.name ||
      urlName !== establishmentData?.url_name ||
      city !== establishmentData?.city ||
      description !== establishmentData?.description ||
      logo !== establishmentData?.logo ||
      address !== establishmentData?.address ||
      phone !== establishmentData?.phone ||
      instagramLink !== establishmentData?.inst ||
      twogisLink !== establishmentData?.two_gis ||
      outside !== establishmentData?.outside ||
      delivery !== establishmentData?.delivery ||
      service !== establishmentData?.service ||
      wifiName !== establishmentData?.wifi ||
      wifiPassword !== establishmentData?.wifi_password ||
      workTimeStart !== establishmentData?.work_time_start ||
      workTimeEnd !== establishmentData?.work_time_end
    );
  }, [name, urlName, city, description, logo, address, phone,
    instagramLink, twogisLink, outside, delivery, service,
    wifiName, wifiPassword, workTimeStart, workTimeEnd]);

  // HTML block
  return (
    <>
      {/* While all data is loading show spinner */}
      {loading && (
        <div className="spinner-border text-warning mx-auto my-auto" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {/* After loading show main content */}
      {!loading && (
        <div className="container">
          {/* Back handler */}
          <div className="btn shadow-0 btn-animate my-auto" onClick={onFinishEditing}>
            <i className="fas fa-arrow-left-long fa-lg"></i>
          </div>
          <hr className="my-0" />
          <h2 className="my-3">Редактирование - <span className="yaem-color">{establishmentData.name}</span></h2>
          {/* Edit establishment form */}
          {/* Form handler */}
          <form className="my-4" onSubmit={handleUpdate}>
            <div className="input-group mb-4">
              <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
              {/* Establishment name */}
              <MDBInput
                type="text"
                label='Название заведения'
                maxLength="20" showCounter={true}
                defaultValue={establishmentData.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group mb-4">
              <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
              <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
              {/* Establishment url */}
              <MDBInput
                type="text"
                label="URL имя"
                maxLength="20" showCounter={true}
                defaultValue={establishmentData.url_name}
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
              />
            </div>

            {/* Establishment city */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-select"
            >
              <option value="">Выберите город</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            {/* Button to open a block with additional information */}
            <button type="button" className="btn btn-outline-secondary my-4 btn-animate" onClick={() => setIsAdditionalInfoVisible(!isAdditionalInfoVisible)}>Показать дополнительные поля <i class="fas fa-circle-chevron-down ms-1"></i></button>
            {/* Show this block if button clicked */}
            {isAdditionalInfoVisible && (
              <>
                {/* Establishment description */}
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fas fa-font fa-xs"></i></span>
                  <MDBTextArea
                    type="text"
                    label="Описание заведения"
                    defaultValue={establishmentData.description}
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLogo(file);
                      }
                    }}
                  />
                </div>
                <small id='helperTextExample' className='form-helper text-muted'>
                  Размер файла не более 1мб.
                </small>
                {/* If logo has uploaded, show reset button */}
                {logo != null && (
                  <p className="text-primary" onClick={handleDeleteLogo}>Удалить изображение</p>
                )}

                {/* Establishment address*/}
                <div className="input-group mb-4">
                  <span className="input-group-text"><i class="fas fa-location-dot"></i></span>
                  <MDBInput
                    type="text"
                    label="Адрес заведения"
                    maxLength="50" showCounter={true}
                    defaultValue={establishmentData.address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Establishment phone*/}
                <div className="input-group mb-4">
                  <span className="input-group-text"><i class="fas fa-phone"></i></span>
                  <MDBInput
                    type="text"
                    label="Телефон для связи / заказов WhatsApp"
                    placeholder="+7..."
                    maxLength="12" showCounter={true}
                    defaultValue={establishmentData.phone}
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
                    defaultValue={establishmentData.inst}
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
                    defaultValue={establishmentData.two_gis}
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
                <div class="form-check mx-0 px-0 mb-3">
                  <MDBSwitch
                    checked={delivery}
                    label='Доставка'
                    onChange={() => setDelivery(!delivery)}
                  />
                </div>

                {/* Establishment Service */}
                <div className="input-group mb-4">
                  <span className="input-group-text"><i class="fas fa-percent"></i></span>
                  <MDBInput
                    type="text"
                    label="Процент обслуживания"
                    maxLength="2" showCounter={true}
                    defaultValue={establishmentData.service}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  />
                </div>

                {/* Establishment WiFi/Password */}
                <div class="input-group mb-4">
                  <span className="input-group-text"><i class="fas fa-wifi"></i></span>
                  <MDBInput
                    type="text"
                    label='Wi-Fi'
                    maxLength="30" showCounter={true}
                    defaultValue={establishmentData.wifi}
                    value={wifiName}
                    onChange={(e) => setWifiName(e.target.value)}
                  />
                  <span className="input-group-text"><i class="fas fa-lock"></i></span>
                  <MDBInput
                    type="text"
                    label='Пароль'
                    defaultValue={establishmentData.wifi_password}
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                  />
                </div>

                {/* Establishment work time */}
                <div className="input-group my-3">
                  <span className="input-group-text">Рабочее время</span>
                  <MDBInput
                    value={workTimeStart}
                    placeholder="10:00"
                    defaultValue={establishmentData.work_time_start}
                    onChange={(e) => setWorkTimeStart(e.target.value)}
                  />
                  <MDBInput
                    value={workTimeEnd}
                    placeholder="21:00"
                    defaultValue={establishmentData.work_time_end}
                    onChange={(e) => setWorkTimeEnd(e.target.value)}
                  />
                </div>

                {/* Show submit button only if form is changed */}
                <div className="d-flex justify-content-center">
                  {formChanged &&
                    <button
                      type="submit"
                      className="btn btn-success me-2 btn-animate"
                      disabled={isEditButtonClicked}
                    >
                      Сохранить
                    </button>}
                </div>
              </>
            )}
            {/* Show this button if button with additional information not clicked and form is changed */}
            {!isAdditionalInfoVisible && formChanged && (
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success my-3 me-2"
                  disabled={isEditButtonClicked}
                >
                  Сохранить
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default EditEstablishmentForm;
