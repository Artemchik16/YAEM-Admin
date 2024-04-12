// Import react
import React, { useState, useEffect } from "react";
// Import axios
import axios from "axios";
// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import MDB
import { MDBInput, MDBTextArea, MDBSwitch } from "mdb-react-ui-kit";


function EditEstablishmentForm({ establishmentId, onFinishEditing, updateEstablishments }) {
  // Get user auth token
  const userToken = sessionStorage.getItem('accessToken');
  // Set data
  const [establishmentData, setEstablishmentData] = useState(null);
  // State for visibility other info block
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  // Set form changed flag
  const [formChanged, setFormChanged] = useState(false);
  // Load handler
  const [loading, setLoading] = useState(true);
  // States block for user data
  const [name, setName] = useState('');
  const [urlName, setUrlName] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const formData = new FormData();
  formData.append('logo', logo);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twogisLink, setTwogisLink] = useState("");
  const [outside, setOutside] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [service, setService] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [workTimeStart, setWorkTimeStart] = useState('00:00');
  const [workTimeEnd, setWorkTimeEnd] = useState('00:00');


  // Get detail data from backend on est ID
  useEffect(() => {
    const fetchEstablishmentData = async () => {
      try {
        const response = await axios.get(`https://yaem.kz/api/v1/menu/clients/${establishmentId}`, {
          // Send token
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        // Set values
        setEstablishmentData(response.data);
        setLoading(false);
        setName(response.data.name);
        setUrlName(response.data.url_name);
        setCity(response.data.city);
        setDescription(response.data.description);
        // setLogo(response.data.logo);
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

    fetchEstablishmentData();
  }, [establishmentId]);

  // Get request on a list of cities from backend
  useEffect(() => {
    axios.get("https://yaem.kz/api/v1/menu/city/", {
      // Send token on backend
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

  // Put request on backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
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
      if (logo) {
        requestData.logo = logo;
      }

      await axios.patch(`https://yaem.kz/api/v1/menu/clients/${establishmentId}/`, requestData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Success block
      toast.success('Заведение обновлено.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      onFinishEditing()
      // Another request on backend
      const updatedEstablishmentsResponse = await axios.get('https://yaem.kz/api/v1/menu/clients/', {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      updateEstablishments(updatedEstablishmentsResponse.data);
      // Error block
    } catch (error) {
      if (error.response && error.response.data) {
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
    }
  };

  // Check if the form is changed
  useEffect(() => {
    setFormChanged(
      name !== establishmentData?.name ||
      urlName !== establishmentData?.url_name ||
      city !== establishmentData?.city ||
      description !== establishmentData?.description ||
      //       logo !== establishmentData?.logo ||
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
  }, [name, urlName, city, description, address, phone,
    instagramLink, twogisLink, outside, delivery, service,
    wifiName, wifiPassword, workTimeStart, workTimeEnd]);

  if (loading) {
    return <div class="d-flex justify-content-center display-middle">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }



  return (
    <div>
      {/* Back handler */}
      <div className="btn shadow-0 btn-animate my-auto btn-outline-dark" onClick={onFinishEditing}>
        <i className="fas fa-arrow-left-long fa-lg"></i>
      </div>
      <h2 className="my-3">Редактирование заведения - {establishmentData.name}</h2>
      {/* Edit establishment form */}
      {/* Form handler */}
      <form className="my-4" onSubmit={handleUpdate}>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
          {/* Establishment name */}
          <MDBInput
            type="text"
            label='Название заведения'
            defaultValue={establishmentData.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
          <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
          {/* Establishment url */}
          <MDBInput
            type="text"
            label="URL имя"
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
              <label class="input-group-text" for="inputGroupFile01">Логотип</label>
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
            {/* Establishment address*/}
            <div className="input-group my-3">
              <span className="input-group-text"><i class="fas fa-location-dot"></i></span>
              <MDBInput
                type="text"
                label="Адрес заведения"
                defaultValue={establishmentData.address}
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
                placeholder="+7"
                defaultValue={establishmentData.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* Establishment instagram*/}
            <div className="input-group mt-3">
              <span className="input-group-text"><i class="fab fa-instagram"></i></span>
              <MDBInput
                type="text"
                label="Ссылка на Instagram"
                placeholder="instagram.com/yaem_qr/"
                defaultValue={establishmentData.inst}
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              />
            </div>
            {/* Establishment 2gis*/}
            <div className="input-group mt-3">
              <span className="input-group-text"><i class="fas fa-map-location-dot"></i></span>
              <MDBInput
                type="text"
                label="Ссылка на 2Gis"
                placeholder="go.2gis.com/d9pf44"
                defaultValue={establishmentData.two_gis}
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
                type="text"
                label="Процент обслуживания"
                defaultValue={establishmentData.service}
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </div>
            {/* Establishment WiFi/Password */}
            <div class="input-group my-3">
              <span className="input-group-text"><i class="fas fa-wifi"></i></span>
              <MDBInput
                type="text"
                label='Wi-Fi'
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
                defaultValue={establishmentData.work_time_start}
                onChange={(e) => setWorkTimeStart(e.target.value)}
              />
              <MDBInput
                value={workTimeEnd}
                defaultValue={establishmentData.work_time_end}
                onChange={(e) => setWorkTimeEnd(e.target.value)}
              />
            </div>

            {/* Show submit button only if form is changed */}
            <div className="d-flex justify-content-center">
              {formChanged && <button type="submit" className="btn btn-success me-2 btn-animate">Сохранить</button>}
            </div>
          </>
        )}
        {/* Show this button if button with additional information not clicked and form is changed */}
        {!isAdditionalInfoVisible && formChanged && (
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditEstablishmentForm;
