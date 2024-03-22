// Default imports
import React, {useState} from "react";





function Payment() {

  // Set active tab, on default 'SILVER TARIF' tab
  const [activeTarifTab, setActiveTarifTab] = useState('silver');
  // Set price, on default 13000 'SILVER TARIF'
  const [tarifPrice, setTarifPrice] = useState(13000);
  // Set tarif title, on default None
  const [tarifTitle, setTarifTitle] = useState('Серебро');
  // Get discount and total price
  const discountedPrice = tarifPrice - (tarifPrice * 0.8);
  const totalPrice = tarifPrice - discountedPrice;

  // Set values
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
    <div className="col-10 col-sm-9 py-4">
      <h1 className="ms-4 mb-4">Оплата</h1>
      <div className="card-group">

      {/* Bronze card */}
      <div className='card mx-1 cardStyle btn-animate' style={{ boxShadow: activeTarifTab === 'bronze' && '0 0 25px 3px rgba(300, 187, 153, 5)' }} onClick={() => handleTarifTabChange('bronze')}>
          <div className="card-body px-3">
            <h5 className="card-title text-center">Бронза</h5>
            <p className="fw-bold fs-5 my-0 text-center mb-3" style={{ color: '#fd7014' }}>10 000 ₸/мес </p>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Онлайн меню</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Базоый QR код</small>
            <small className="card-text d-block"><i className="fas fa-check text-success"></i> Тех. поддержка</small>
          </div>
        </div>

        {/* Silver card */}
        <div className='card mx-1 cardStyle2 btn-animate' style={{ boxShadow: activeTarifTab === 'silver' && '0 0 25px 3px rgba(140, 139, 150, 5)' }} onClick={() => handleTarifTabChange('silver')}>
          <div className="card-body px-3">
            <h5 className="card-title text-center">Серебро</h5>
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
      <div className='card mx-1 cardStyle3 btn-animate' style={{ boxShadow: activeTarifTab === 'gold' && '0 0 25px 3px rgba(255, 156, 18, 5)' }} onClick={() => handleTarifTabChange('gold')}>
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

      {/* Get tarif title */}
      <h5 className="my-4">Купить тариф {tarifTitle}</h5>
      <input
        type="number"
        className="form-control"
        placeholder="Количество месяцев"
        aria-label="months"
        aria-describedby="basic-addon1"
        style={{ maxWidth: '300px' }}
        // 12 month validation
        max={12}
      />
      <input
        type="tel"
        className="form-control mt-3"
        placeholder="Номер Kaspi"
        aria-label="phone"
        aria-describedby="basic-addon1"
        style={{ maxWidth: '300px' }}
      />
      <small className="fst-italic text-secondary"> <i className="fas fa-tag "></i> При оплате за 12 месяцев 2 месяца в подарок</small>
      <div className="d-flex justify-content-between mt-3" style={{ maxWidth: '300px' }}>
        {/* Get price */}
        <small>Сумма</small>
        <small> {tarifPrice.toLocaleString()} ₸</small>
      </div>
      <div className="d-flex justify-content-between" style={{ maxWidth: '300px' }}>
        {/* Get discounded price */}
        <small>Скидка (20%)</small>
        <small> -{discountedPrice.toLocaleString()} ₸</small>
      </div>
      <hr style={{ maxWidth: '300px' }} />
      <div className="d-flex justify-content-between fw-bold" style={{ maxWidth: '300px', color: '#fd7014' }}>
        {/* Get total price */}
        <p>Итого</p>
        <p> {totalPrice.toLocaleString()}  ₸</p>
      </div>
      <div className="btn btn-danger btn-rounded" style={{ minWidth: '300px' }}>Выставить счёт на Kaspi</div>
    </div>
  );
}


export default Payment;
