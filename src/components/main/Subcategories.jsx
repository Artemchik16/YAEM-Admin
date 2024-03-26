// Default import
import React from 'react';


function Subcategories({categoryId}) {

    return (
    <div className="containe my-5">
        <h2>Категории меню</h2>
<div className="row">
    <div className="col-12 col-lg-auto">
        <ul className="nav mb-3">
          <li className="nav-item bg-primary bg-opacity-25 py-1 rounded-7" role="presentation">
              <a
                href="#"
                className="btn btn-rounded btn-primary btn- mx-2 btn-animate my-1"
              >{categoryId} Супы
              </a>
              <a
                href="#"
                className="btn btn-rounded btn-secondary mx-2 btn-animate my-1"
              >{categoryId} Мясо
              </a>
              <a
                href="#"
                className="btn btn-rounded btn-secondary mx-2 btn-animate my-1"
              >{categoryId} Говно
              </a>
          </li>
        </ul>
    </div>
    <div className="col-12 col-lg-auto text-end my-auto">
            <div className="btn shadow-0 btn-animate my-auto btn-outline-success mx-1 px-3">
                      <i className="far fa-square-plus fa-lg"></i>
            </div>
            <div className="btn shadow-0 btn-animate my-auto btn-outline-dark mx-1 px-3">
                      <i className="fas fa-pen"></i>
            </div>
            <div className="btn shadow-0 btn-animate my-auto btn-outline-danger mx-1 px-3">
                      <i className="fas fa-trash fa-lg"></i>
            </div>
        </div>
    </div>
    <h2 className="my-5">Позиции</h2>
<div className="container ">
<div className="d-flex flex-wrap justify-content-evenly">
        <div className="card" style={{ maxWidth: '300px' }}>
            <div className="card-body">
                    <h5 className="card-title">БЛЮДО</h5>
                    <p className="card-text text-muted">описание</p>
                    <small className="card-text">цена</small>
                    <hr/>
                    <div className="d-flex flex-wrap justify-content-evenly text-center">

                        {/* Button to open DetailEstablishment component */}
                        <div className="btn btn-animate my-1" style={{ width: '70px' }}>
                            <i className="fas fa-pen fa-lg"></i>
                        </div>
                        {/* Button to trigger deletion confirmation */}
                        <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}>
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                    </div>
            </div>
    </div>

{/*      УДАЛИТЬ НАХЕР ПРИ ЦИКЛЕ*/}
    <div className="card" style={{ maxWidth: '300px' }}>
            <div className="card-body">
                    <h5 className="card-title">БЛЮДО</h5>
                    <p className="card-text text-muted">описание</p>
                    <small className="card-text">цена</small>
                    <hr/>
                    <div className="d-flex flex-wrap justify-content-evenly text-center">

                        <a href="#" target="_blank">
                            <div className="btn btn-animate my-1" style={{ width: '70px' }}>
                                <i className="fas fa-qrcode fa-lg"></i>
                            </div>
                        </a>
                        {/* Button to open Dishes component */}
                        <div className="btn btn-animate my-1" style={{ width: '70px' }}>
                            <i className="fas fa-book-open fa-lg"></i>
                        </div>
                        {/* Button to open DetailEstablishment component */}
                        <div className="btn btn-animate my-1" style={{ width: '70px' }}>
                            <i className="fas fa-pen fa-lg"></i>
                        </div>
                        {/* Button to trigger deletion confirmation */}
                        <div className="btn btn-animate btn-outline-danger my-1" style={{ width: '70px' }}>
                            <i className="fas fa-trash fa-lg"></i>
                        </div>
                    </div>
            </div>
    </div>
    </div>


</div>
</div>
    );
}

export default Subcategories;
