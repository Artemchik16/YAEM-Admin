import React, { useState, useEffect } from "react";
import logo from '../../assets/images/favicon.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';


export default function Payment() {

  // Set handlers and values
  const [loading, setLoading] = useState(true);
  const userToken = sessionStorage.getItem('accessToken');
  const [isSending, setIsSending] = useState(false);
  const [activeTarifTab, setActiveTarifTab] = useState('silver');
  const [tarifPrice, setTarifPrice] = useState(13000);
  const [tarifTitle, setTarifTitle] = useState('Серебро');
  const [tarifTitleID, setTarifTitleID] = useState(2);
  const [months, setMonths] = useState(1);
  const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
  const [kaspiNumber, setKaspiNumber] = useState('');
  const [payments, setPayments] = useState([]);

  // When loading the component, pull out the number and information about the payments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user's phone number
        const userPhoneNumberResponse = await axios.get('https://yaem.kz/api/v1/auth/phone-number', {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        const userPhoneNumber = userPhoneNumberResponse.data.phone_number;
        // Receive payment data
        const paymentResponse = await axios.get('https://yaem.kz/api/v1/auth/payment/', {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        const paymentData = paymentResponse.data;
        setTimeout(() => { setLoading(false); }, 100)
        setKaspiNumber(userPhoneNumber);
        setPayments(paymentData);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`https://yaem.kz/api/v1/auth/payment/${paymentId}/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      toast.success('Заявка удалена.', { autoClose: 1500, pauseOnHover: false, position: "top-center" });
      setPayments(payments.filter(payment => payment.id !== paymentId));
    } catch (error) {
      toast.error('Ошибка при удалении заявки.', { autoClose: 1500, pauseOnHover: false, position: "top-center" });
    }
  };

  // Month change handler and validation
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

  // Calculate discounded? total price
  const calculateTotalPrice = () => {
    const basePrice = tarifPrice * months;
    const discount = isDiscountApplicable ? basePrice * 0.2 : 0;
    return basePrice - discount;
  };

  // Handle and set kaspi number
  const handleKaspiNumberChange = (event) => {
    setKaspiNumber(event.target.value);
  };

  // Handle payment button and get telegram message
  const handlePaymentClick = async () => {
    // Base phone number validation and empty value validation
    const phoneNumberPattern = /^(\+7|8)\d{10}$/;
    if (!kaspiNumber || !phoneNumberPattern.test(kaspiNumber)) {
      setIsSending(true)
      toast.error('Пожалуйста, укажите корректный номер Kaspi', { autoClose: 1500, pauseOnHover: false, position: "top-center" });
      setTimeout(() => { setIsSending(false); }, 2000);
      return;
    }
    // Months validation
    if (!months) {
      setIsSending(true)
      toast.error('Пожалуйста, укажите количество месяцев', { autoClose: 1500, pauseOnHover: false, position: "top-center" });
      setTimeout(() => { setIsSending(false); }, 2000);
      return;
    }
    // Requests
    try {
      // Sending a POST request to create an payment
      await axios.post('https://yaem.kz/api/v1/auth/payment/', {
        tarif_number: tarifTitleID,
        months: months,
        phone: kaspiNumber,
        status: "В ОБРАБОТКЕ"
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      // Another get request to receive an already created payment
      const response = await axios.get('https://yaem.kz/api/v1/auth/payment/', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      setLoading(false);
      setIsSending(true)
      setTimeout(() => { setIsSending(false); }, 5000);
      setPayments(response.data)
    } catch (error) {
      setIsSending(true)
      setTimeout(() => { setIsSending(false); }, 5000);
      if (error.response.data && error.response.data[0] === 'Payment: limit error') {
        setLoading(false);
        toast.error('Достигнут лимит заявок. Удалите заявку, либо дождитесь звонка администратора', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        return;
      }
    }
    // Post request on telegram API
    try {
      // Get bot token
      const telegramBotToken = '6540080500:AAESZ_bD2sPa0TKJfwPcDlbnSeukIw82Iw8';
      // Chat bot id
      const telegramChatID = '-4136158492';
      await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: telegramChatID,
          text: `Здарова черти бизнеса. У нас новая оплата:
Номер каспи: ${kaspiNumber}
Тариф: ${tarifTitle}
Количество месяцев: ${months === 12 ? months + ' ' + '+ 2(Скидочный пакет)' : months}
Итого: ${calculateTotalPrice().toLocaleString()} ₸`,
        }
      );
      // Set the flags
      setIsSending(true)
      toast.success('Заявка отправлена.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
      // Enable a delay for sending a new request after the current one has been successfully sent
      setTimeout(() => { setIsSending(false); }, 15000);
    } catch (error) {
      // Set the blocking flag
      setIsSending(false)
      toast.error('Ошибка при отправке заявки.', { autoClose: 2000, pauseOnHover: false, position: "top-center" });
    }
  };

  // Set values and handle
  const handleTarifTabChange = (tab) => {
    setActiveTarifTab(tab);
    switch (tab) {
      case 'bronze':
        setTarifPrice(10000);
        setTarifTitle('Бронза');
        setTarifTitleID(1);
        break;
      case 'silver':
        setTarifPrice(13000);
        setTarifTitle('Серебро');
        setTarifTitleID(2);
        break;
      case 'gold':
        setTarifPrice(30000);
        setTarifTitle('Золото');
        setTarifTitleID(3);
        break;
      default:
        setTarifPrice(13000);
        setTarifTitle('Серебро');
        setTarifTitleID(2);
    }
  };

  // HTML BLOCK 
  return (
    <>
      {loading && (
      <div class="spinner-border text-warning mx-auto my-auto" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      )}
      {!loading && (
        <div className="col-10 col-sm-8 py-4 mx-auto" style={{ fontSize: '14px' }}>
          <h1 className="ms-4 mb-3">Оплата <a href="//yaem.kz/partner" target="_blank"><span className="btn shadow-0 text-success btn-animate btn-sm px-1 my-1 mx-2"><i class="far fa-circle-question"></i> Подробнее</span></a></h1>
          <div className="card-group justify-content-center">
            {/* Bronze card handler and tab changer*/}
            <div className={`card mx-auto cardStyle ${activeTarifTab === 'bronze' ? '' : 'btn-animate'}`}
              style={{
                boxShadow: activeTarifTab === 'bronze' ? '0 0 10px 3px rgb(253,112,20)' : '',
                transform: activeTarifTab === 'bronze' ? 'scale(1.05)' : '',
                zIndex: activeTarifTab === 'bronze' ? 1 : 0,
                cursor: 'pointer',
                maxWidth: '300px'
              }}
              onClick={() => handleTarifTabChange('bronze')}>
              <div className="card-body px-3 py-2">
                <h5 className="card-title text-center">Бронза</h5>
                <p className="fw-bold fs-5 my-0 text-center mb-1" style={{ color: '#fd7014' }}>10 000 ₸/мес </p>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн меню</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн QR код</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тех. поддержка</small>
              </div>
            </div>
            {/* Silver card handler and tab changer */}
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
              <div className="card-body px-3 py-2">
                <h5 className="card-title text-center">Серебро</h5>
                <div style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: '#fff', padding: '5px 10px', borderRadius: '5px 0 0 0' }}>
                  <i className="fab fa-hotjar"></i>
                </div>
                <del className="text-center" style={{ color: '#fd7014' }}><p className="fw-bold fs-6 my-0" >15 000 ₸/мес </p></del>
                <p className="fw-bold fs-5 my-0 text-center mb-1" style={{ color: '#fd7014' }}>13 000 ₸/мес <span className="fs-6">(-15 %)</span></p>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн меню с фото блюд</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Меню на 3х языках</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Настольный QR код</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Акции и метки</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Самовывоз / Доставка </small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Блок с реквизитами</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тех. поддержка</small>
              </div>
            </div>

            {/* Gold card handler and tab changer */}
            <div className={`card mx-auto cardStyle3 ${activeTarifTab === 'gold' ? '' : 'btn-animate'}`}
              style={{
                boxShadow: activeTarifTab === 'gold' ? '0 0 10px 3px rgb(253,112,20)' : '',
                transform: activeTarifTab === 'gold' ? 'scale(1.05)' : '',
                zIndex: activeTarifTab === 'gold' ? 1 : 0,
                cursor: 'pointer',
                maxWidth: '300px'
              }}
              onClick={() => handleTarifTabChange('gold')}>
              <div className="card-body px-2 py-2">
                <h5 className="card-title text-center">Золото</h5>
                <p className="fw-bold fs-5 my-0 text-center mb-1" style={{ color: '#fd7014' }}>30 000 ₸/мес </p>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тариф Серебро</small>
                <small className="card-text d-block"><i className="fas fa-check text-success"></i> Продвинутый QR код</small>
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
            <div className="container mx-0" style={{ maxWidth: '300px' }}>
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
                <button className='btn btn-danger btn-animate'
                  disabled={isSending}
                  style={{ minWidth: '250px' }}
                  onClick={handlePaymentClick}
                >
                  Выставить счёт на Kaspi
                </button>
              </div>

            </div>
          )}
          {/* Payment table handler */}
          {activeTarifTab !== 'gold' && payments.length > 0 && (
            <MDBTable className="mb-5" responsive hover small align='middle' data-aos="fade-in">
              <MDBTableHead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Тариф</th>
                  <th scope='col'>Месяцев</th>
                  <th scope='col'>Kaspi номер</th>
                  <th scope='col'>Дата</th>
                  <th scope='col'>Статус</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td className='fw-bold'>{payment.id}</td>
                    <td>{payment.tarif_number === 1 ? 'БРОНЗА' : (payment.tarif_number === 2 ? 'СЕРЕБРО' : 'ЗОЛОТО')}</td>
                    <td>{payment.months}</td>
                    <td>{payment.phone}</td>
                    <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td>
                      <MDBBadge color={payment.status === 'В ОБРАБОТКЕ' ? 'secondary' : (payment.status === 'ОПЛАЧЕНО' ? 'success' : 'danger')} pill>
                        {payment.status}
                      </MDBBadge>
                    </td>
                    <td>
                      <i className="fas fa-trash text-danger btn-animate fa-lg mx-2" onClick={() => handleDeletePayment(payment.id)}></i>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          )}
        </div>
      )}
    </>
  );
}



