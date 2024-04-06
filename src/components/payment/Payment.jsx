// Default imports
import React, { useState } from "react";
// HTTP import
import axios from 'axios';
// Import messages library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import MDB
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';


function Payment() {
  // Let's add a state that will be responsible for blocking the submit button
  const [isSending, setIsSending] = useState(false);

  // Handle payment button and get telegram message
  const handlePaymentClick = async () => {
    // Base phone number validation and empty value validation
    const phoneNumberPattern = /^(\+7|8)\d{10}$/;
    if (!kaspiNumber || !phoneNumberPattern.test(kaspiNumber)) {
      toast.error('Пожалуйста, укажите корректный номер Kaspi', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      return;
    }
    // Months validation
    if (!months) {
      toast.error('Пожалуйста, укажите количество месяцев', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      return;
    }
    // Post request on telegram API
    try {
      // Get access token
      const token = sessionStorage.getItem('accessToken');
      // Get bot token
      const telegramBotToken = '6540080500:AAESZ_bD2sPa0TKJfwPcDlbnSeukIw82Iw8';
      // Chat bot id
      const telegramCatID = '1913989114';
      // Get user phone number
      const userPhoneNumber = await axios.get('http://localhost:8000/api/v1/auth/phone-number', {
        // Send token on backend
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const response = await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: telegramCatID,
          text: `Новая оплата:
          Номер телефона: ${userPhoneNumber.data.phone_number}
          Номер каспи: ${kaspiNumber}
          Тариф: ${tarifTitle}
          Количество месяцев: ${months === 12 ? months + ' ' + '+ 2' : months}
          Итого: ${calculateTotalPrice().toLocaleString()} ₸`,
        }
      );
      // Set the blocking flag
      setIsSending(true)
      // Success block
      toast.success('Заявка отправлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      // Enable a delay for sending a new request after the current one has been successfully sent
      setTimeout(() => { setIsSending(false); }, 15000);
      // Error block
    } catch (error) {
      // Set the blocking flag
      setIsSending(false)
      toast.error('Ошибка при отправке заявки.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
    }
  };

  // Set active tab, on default 'SILVER TARIF' tab
  const [activeTarifTab, setActiveTarifTab] = useState('silver');
  // Set price, on default 13000 'SILVER TARIF'
  const [tarifPrice, setTarifPrice] = useState(13000);
  // Set tarif title, on default 'Серебро'
  const [tarifTitle, setTarifTitle] = useState('Серебро');
  // Number of months
  const [months, setMonths] = useState(1);
  // Is there a discount applied
  const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
  // Kaspi user number
  const [kaspiNumber, setKaspiNumber] = useState('');

  const handleMonthChange = (event) => {
    const value = parseInt(event.target.value);
    // Check if value is within the range 1-12 or if it's empty
    if (value >= 1 && value <= 12) {
      setMonths(value);
      // Apply a discount if 10 months or more
      setIsDiscountApplicable(value >= 12);
    } else {
      // If value is outside the range or not a number, set default value to 1
      setMonths(event.target.value === '' ? '' : 1);
      // Reset discount if value is outside the range
      setIsDiscountApplicable(false);
    }
  };

  // Get discount and total price
  const calculateTotalPrice = () => {
    const basePrice = tarifPrice * months;
    const discount = isDiscountApplicable ? basePrice * 0.2 : 0;
    return basePrice - discount;
  };

  // Handle and set kaspi number
  const handleKaspiNumberChange = (event) => {
    setKaspiNumber(event.target.value);
  };

  // Set values and handle
  const handleTarifTabChange = (tab) => {
    setActiveTarifTab(tab);
    switch (tab) {
      case 'bronze':
        setTarifPrice(10000);
        setTarifTitle('Бронза');
        break;
      case 'silver':
        setTarifPrice(13000);
        setTarifTitle('Серебро');
        break;
      case 'gold':
        setTarifPrice(30000);
        setTarifTitle('Золото');
        break;
      default:
        setTarifPrice(13000);
        setTarifTitle('Серебро');
    }
  };

  return (
    <div className="col-10 col-sm-8 py-4 mx-auto">
      <h1 className="ms-4 mb-4">Оплата <a href="//yaem.kz/partner" target="_blank"><span className="btn shadow-0 btn-outline-success btn-animate btn-sm px-1 my-1 mx-2"><i class="far fa-circle-question"></i> Подробнее</span></a></h1>
      <div className="card-group justify-content-center">

        {/* Bronze card */}
        <div className={`card mx-auto cardStyle ${activeTarifTab === 'bronze' ? '' : 'btn-animate'}`}
          style={{
            boxShadow: activeTarifTab === 'bronze' ? '0 0 10px 3px rgb(253,112,20)' : '',
            transform: activeTarifTab === 'bronze' ? 'scale(1.05)' : '',
            zIndex: activeTarifTab === 'bronze' ? 1 : 0,
            cursor: 'pointer',
            maxWidth: '300px'
          }}
          onClick={() => handleTarifTabChange('bronze')}>
          <div className="card-body px-3">
            <h5 className="card-title text-center">Бронза</h5>
            <p className="fw-bold fs-5 my-0 text-center mb-3" style={{ color: '#fd7014' }}>10 000 ₸/мес </p>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн меню</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Базоый QR код</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тех. поддержка</small>
          </div>
        </div>

        {/* Silver card */}
        <div className={`card mx-auto cardStyle2 ${activeTarifTab === 'silver' ? '' : 'btn-animate'}`}
          style={{
            boxShadow: activeTarifTab === 'silver' ? '0 0 10px 3px rgb(253,112,20)' : '',
            transform: activeTarifTab === 'silver' ? 'scale(1.05)' : '',
            zIndex: activeTarifTab === 'silver' ? 1 : 0,
            cursor: 'pointer',
            maxWidth: '300px',
            position: 'relative'
          }}
          onClick={() => handleTarifTabChange('silver')}>
          <div className="card-body px-3">
            <h5 className="card-title text-center">Серебро</h5>
            <div style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: '#fff', padding: '5px 10px', borderRadius: '5px 0 0 0' }}>
              <i className="fab fa-hotjar"></i>
            </div>
            <del className="text-center" style={{ color: '#fd7014' }}><p className="fw-bold fs-6 my-0" >15 000 ₸/мес </p></del>
            <p className="fw-bold fs-5 my-0 text-center mb-3" style={{ color: '#fd7014' }}>13 000 ₸/мес <span className="fs-6">(-15 %)</span></p>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн меню с фото блюд</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Меню на 3х языках</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Продвинутый QR код</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Акции и метки</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Самовывоз / Доставка </small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Блок с реквизитами</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тех. поддержка</small>
          </div>
        </div>

        {/* Gold card */}
        <div className={`card mx-auto cardStyle3 ${activeTarifTab === 'gold' ? '' : 'btn-animate'}`}
          style={{
            boxShadow: activeTarifTab === 'gold' ? '0 0 10px 3px rgb(253,112,20)' : '',
            transform: activeTarifTab === 'gold' ? 'scale(1.05)' : '',
            zIndex: activeTarifTab === 'gold' ? 1 : 0,
            cursor: 'pointer',
            maxWidth: '300px'
          }}
          onClick={() => handleTarifTabChange('gold')}>
          <div className="card-body px-2">
            <h5 className="card-title text-center">Золото</h5>
            <p className="fw-bold fs-5 my-0 text-center mb-3" style={{ color: '#fd7014' }}>30 000 ₸/мес </p>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тариф Серебро</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Проффессиональный QR код</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Эксклюзивный дизайн меню</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн оплата</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Аналитика Google, Yandex </small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Заказы из зала iiko/WhatsApp</small>
          </div>
        </div>
      </div>

      {/* Handle month change if active tab 'GOLD', temporaly show this block */}
      {activeTarifTab === 'gold' ? (
        <div className="container my-5">
          <p className="text-center fs-5 fw-bold">К сожалению, на данный тариф не осталось доступных мест</p>
        </div>
      ) : (
        <div className="container" style={{ maxWidth: '300px' }}>
          {/* Get tarif title */}
          <h5 className="my-4">Купить тариф {tarifTitle}</h5>
          {/* Month input */}
          <MDBInput
            type="number"
            label="Количество месяцев"
            min={1}
            max={12}
            value={months}
            onChange={handleMonthChange}
          />
          {/* Kaspi number input */}
          <MDBInput
            type="tel"
            className="form-control mt-3"
            label="Номер Kaspi"
            max={15}
            value={kaspiNumber}
            onChange={handleKaspiNumberChange}
          />
          <small className="fst-italic text-secondary"> <i className="fas fa-tag"></i> При оплате за 12 месяцев 2 месяца в подарок (скидка 20%)</small>
          <div className="d-flex justify-content-between mt-3" style={{ maxWidth: '300px' }}>
            {/* Get tarif price */}
            <small>Сумма</small>
            <small> {(tarifPrice * months).toLocaleString()} ₸</small>
          </div>
          {/* if month > 12, get discount and show this block */}
          {isDiscountApplicable && (
            <div>
              <div className="d-flex justify-content-between" style={{ maxWidth: '300px' }}>
                {/* Get discounded price */}
                <small>Скидка (20%)</small>
                <small> -{(tarifPrice * months * 0.2).toLocaleString()} ₸</small>
              </div>
            </div>
          )}
          <hr style={{ maxWidth: '300px' }} />
          {/* Get total price */}
          <div className="d-flex justify-content-between fw-bold" style={{ maxWidth: '300px', color: '#fd7014' }}>
            <p>Итого</p>
            <p> {calculateTotalPrice().toLocaleString()} ₸</p>
          </div>
          {/* Send message in telegram bot */}
          <div className="col-10 col-sm-8 py-2">
            {/* if the application has been successfully sent, turn off the button */}
            <div className={`btn ${isSending ? 'btn-secondary disabled' : 'btn-danger btn-animate'}`}
              style={{ minWidth: '250px' }}
              onClick={handlePaymentClick}
            >
              Выставить счёт на Kaspi
            </div>
          </div>
        </div>
      )}

      <MDBTable responsive hover small align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>ID #</th>
          <th scope='col'>Тариф</th>
          <th scope='col'>Кол-во месяцев</th>
          <th scope='col'>Kaspi номер</th>
          <th scope='col'>Дата</th>
          <th scope='col'>Статус</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
{/*        КЛАДИ ЦИКЛ СЮДЫ*/}
        <tr>
          <td className='fw-bold'>1234</td>
          <td>Серебро / Бронза</td>
          <td>18</td>
          <td>+77015302812</td>
          <td>01/01/2024</td>
          <td>

            <MDBBadge color='secondary fs-6' pill>
              В обработке
            </MDBBadge>

            <MDBBadge color='success fs-6' pill>
              Оплачено
            </MDBBadge>

            <MDBBadge color='danger fs-6' pill>
              Отменено
            </MDBBadge>

          </td>
        </tr>
{/*        КЛАДИ ЦИКЛ СЮДЫ*/}
      </MDBTableBody>
    </MDBTable>

    </div>

  );
}


export default Payment;
