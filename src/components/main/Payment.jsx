import React from "react";

const MyComponent = () => {
  const cardStyle = {
    WebkitBoxShadow: '0 0 10px #000',
    boxShadow: '0 0 5px #EDBB99',
  };
  const cardStyle2 = {
    WebkitBoxShadow: '0 0 10px #000',
    boxShadow: '0 0 10px #808B96',
  };
  const cardStyle3 = {
    WebkitBoxShadow: '0 0 10px #000',
    boxShadow: '0 0 5px #F39C12 ',
  };

  function Payment(){
    return(
      <div className="col-10 col-sm-9 py-4">
      <h1 className="text-center mb-4">Оплата</h1>
        <div className="card-group">


          <div className="card mx-1" style={cardStyle}>
            <div className="card-body px-3">
              <h5 className="card-title text-center">Бронза</h5>
              <p className="fw-bold fs-5 my-0 text-center mb-3" style={{color: '#fd7014'}}>10 000 ₸/мес </p>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Онлайн меню</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Базоый QR код</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Тех. поддержка</small>
            </div>
          </div>


          <div className="card mx-1" style={cardStyle2}>
            <div className="card-body px-3">
               <h5 className="card-title text-center">Серебро</h5>
              <del className="text-center"style={{color: '#fd7014'}}><p className="fw-bold fs-6 my-0" >15 000 ₸/мес </p></del>
              <p className="fw-bold fs-5 my-0 text-center mb-3" style={{color: '#fd7014'}}>13 000 ₸/мес <span className="fs-6">(-15 %)</span></p>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Онлайн меню с фото блюд</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Меню на 3х языках</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Продвинутый QR код</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Акции и метки</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Самовывоз / Доставка </small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Блок с реквизитами</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Тех. поддержка</small>
            </div>
          </div>


          <div className="card mx-1" style={cardStyle3}>
            <div className="card-body px-2">
              <h5 className="card-title text-center">Золото</h5>
              <p className="fw-bold fs-5 my-0 text-center mb-3" style={{color: '#fd7014'}}>30 000 ₸/мес </p>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Тариф Серебро</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Проффессиональный QR код</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Эксклюзивный дизайн меню</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Онлайн оплата</small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Аналитика Google, Yandex </small>
              <small className="card-text d-block"><i class="fas fa-check text-success"></i> Заказы из зала iiko/WhatsApp</small>
            </div>
          </div>
        </div>
        <h5 className="my-4">Купить</h5>
        <input
                type="number"
                class="form-control"
                placeholder="Количество месяцев"
                aria-label="months"
                aria-describedby="basic-addon1"
                style={{maxWidth: '300px'}}
              />
        <input
                type="tel"
                class="form-control mt-3"
                placeholder="Номер Kaspi"
                aria-label="phone"
                aria-describedby="basic-addon1"
                style={{maxWidth: '300px'}}
              />
              <small className="fst-italic text-secondary"> <i class="fas fa-tag "></i> При оплате за 12 месяцев 2 месяца в подарок</small>
              <div className="d-flex justify-content-between mt-3" style={{maxWidth: '300px'}}>
              <small>Сумма</small>
              <small> 130 000 ₸</small>
              </div>
              <div className="d-flex justify-content-between" style={{maxWidth: '300px'}}>
              <small>Скидка (20%)</small>
              <small> -26 000 ₸</small>
              </div>
              <hr style={{maxWidth: '300px'}}/>
              <div className="d-flex justify-content-between fw-bold" style={{maxWidth: '300px', color: '#fd7014'}}>
              <p>Итого</p>
              <p> 104 000  ₸</p>
              </div>
              <div className="btn btn-danger btn-rounded" style={{minWidth: '300px'}}>Выставить счёт на Kaspi</div>


      </div>
    );
  }

  return <Payment />;
};

export default MyComponent;
