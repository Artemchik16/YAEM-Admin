// default imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// images import
import favicon from '../../assets/images/favicon.png';
import logo from '../../assets/images/logo.png';

// components import
import Profile from '../users/Profile.jsx';
import Establishments from './Establishments.jsx';
import Payment from '../users/Payment.jsx';
import Logout from '../users/Logout.jsx';

function Main() {
  // set active tab, on default 'establishments' tab
  const [activeTab, setActiveTab] = useState('establishments');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // open profile component

  // open payment component

  // open logout notification


  return (
    <div className="section">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar menu */}
          <div className="col-2 col-sm-3 py-4 border-end px-1" style={{ minHeight: '860px' }}>
            <img className="mx-auto my-4 text-center d-block d-sm-none" style={{ maxHeight: '40px' }} src={favicon} alt="YAEM logo" />
            <img className="mx-auto mb-4 text-center d-none d-sm-block" style={{ maxHeight: '50px' }} src={logo} alt="YAEM logo" />
            <hr />
            <ul className="list-group list-group-light my-3">
              {/* Profile tab */}
              <li className={`list-group-item d-flex justify-content-center ${activeTab === 'profile' && 'active'}`} onClick={() => handleTabChange('profile')}>
                <div className="d-flex">
                  <i className="fas fa-user mx-auto my-auto"></i>
                  <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Профиль</strong></p>
                </div>
              </li>
              {/* Establishment tab */}
              <li className={`list-group-item d-flex justify-content-center ${activeTab === 'establishments' && 'active'}`} onClick={() => handleTabChange('establishments')}>
                <div className="d-flex">
                  <i className="fas fa-utensils mx-auto my-auto"></i>
                  <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Заведения</strong></p>
                </div>
              </li>
              {/* Payment tab */}
              <li className={`list-group-item d-flex justify-content-center ${activeTab === 'payment' && 'active'}`} onClick={() => handleTabChange('payment')}>
                <div className="d-flex align-items-center">
                  <i className="fas fa-coins mx-auto my-auto"></i>
                  <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Оплата</strong></p>
                </div>
              </li>
              {/* Logout tab */}
              <li className={`list-group-item d-flex justify-content-center ${activeTab === 'logout' && 'active'}`} onClick={() => handleTabChange('logout')}>
                <div className="d-flex align-items-center">
                  <i className="fas fa-right-from-bracket mx-auto my-auto text-danger"></i>
                  <p className="mb-0 text-danger d-none d-sm-block mx-2"><strong>Выйти</strong></p>
                </div>
              </li>

              {/* Contacts */}
              <div className="d-flex justify-content-center flex-wrap my-5">

                <a className="" target="_blank"
                  href="mailto:yaem.menu@gmail.com?subject=Ваше заведение">
                  <div
                    className="btn btn-primary text-white btn-floating mt-1 mx-1">
                    <i className="far fa-envelope fa-2x"></i>
                  </div>
                </a>

                <a className="" target="_blank"
                  href="https://wa.me/77713581356?text=Здравствуйте, ">
                  <div
                    className="btn btn-success text-white btn-floating mt-1 mx-1">
                    <i className="fab fa-whatsapp fa-2x"></i>
                  </div>
                </a>

                <a className="" href="https://www.instagram.com/yaem_qr/" target="_blank">
                  <div className="btn btn-danger text-white btn-floating mt-1 mx-1">
                    <i className="fab fa-instagram fa-2x"></i>
                  </div>
                </a>

                <a className="" target="_blank"
                  href="https://wa.me/77713581356?text=Здравствуйте, прошу внести изменения в меню: %0a
Моё имя, должность: %0a
Заведение: %0a
Изменения: %0a
">
                  <div
                    className="btn btn-warning text-white btn-floating mt-1 mx-1">
                    <i className="fas fa-screwdriver-wrench fa-2x text-dark"></i>
                  </div>
                </a>
              </div>
            </ul>
          </div>
          {/* Content block */}
          {/* Profile component */}
          {activeTab === 'profile' && (<Profile></Profile>)}
          {/* Establishment component */}
          {activeTab === 'establishments' && (<Establishments></Establishments>)}
          {/* Payment component */}
          {activeTab === 'payment' && (<Payment></Payment>)}
          {/* Logout component */}
          {activeTab === 'logout' && (<Logout></Logout>)}
          {/* End content block */}
        </div>
      </div>
    </div>
  );
}

export default Main;
