// Import react
import React, { useState, useEffect } from 'react';
// Images import
import favicon from '../assets/images/favicon.png';
import logo from '../assets/images/logo.png';
// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components import
import Profile from './auth/Profile.jsx';
import Establishments from './establishment/Establishments.jsx';
import Payment from './payment/Payment.jsx';
import Logout from './auth/Logout.jsx';

function Main() {

  // Set active tab, default to 'establishments' tab
  const [activeTab, setActiveTab] = useState('establishments');
  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Messages block, enumerating all keys in a session
  const [sessionMessages, setSessionMessages] = useState({});

  // get messages from sessionStorage
  useEffect(() => {
    const storedMessages = { ...sessionStorage };
    setSessionMessages(storedMessages);
  }, []);

  // for loop for enumerate messages
  useEffect(() => {
    Object.keys(sessionMessages).forEach((key) => {
      // If session key include Success
      if (key.includes('Success')) {
        toast.success(sessionMessages[key], { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        sessionStorage.removeItem(key);
      }
      // If session key include Error
      else if (key.includes('Error')) {
        toast.error(sessionMessages[key], { autoClose: 2000, pauseOnHover: false, position: "top-center" });
        sessionStorage.removeItem(key);
      }
    });
  }, [sessionMessages]);

  return (
    <div className="section">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar menu */}
          <div className="col-2 col-sm-3 py-4 border-end px-1" style={{ maxWidth: '300px' }}>
            <div className='d-flex mb-auto flex-column' style={{ minHeight: '800px' }}>
              <img className="mx-auto my-4 text-center d-block d-sm-none" style={{ maxHeight: '40px' }} src={favicon} alt="YAEM logo" />
              <img className="mx-auto mb-4 text-center d-none d-sm-block" style={{ maxHeight: '50px' }} src={logo} alt="YAEM logo" />
              <hr />
              <ul className="list-group list-group-light my-3" style={{ '--mdb-list-group-light-active-bg': '#ff9753', '--mdb-list-group-light-active-color': 'black' }}>
                {/* Profile tab */}
                {/* Handle profile tab change */}
                <li className={`disabled list-group-item d-flex justify-content-center btn-animate ${activeTab === 'profile' && 'active'}`} onClick={() => handleTabChange('profile')}
                >
                  <div className="d-flex">
                    <i className="fas fa-user mx-auto my-auto"></i>
                    <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Профиль</strong></p>
                  </div>
                </li>
                {/* Reports tab */}
                {/* Handle reports tab change */}
                <li className={`disabled list-group-item d-flex justify-content-center btn-animate ${activeTab === 'reports' && 'active'}`} onClick={() => handleTabChange('reports')}>
                  <div className="d-flex">
                    <i className="fas fa-chart-pie mx-auto my-auto"></i>
                    <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Отчеты</strong></p>
                  </div>
                </li>
                {/* Establishment tab */}
                {/* Handle establishment tab change */}
                <li className={`list-group-item d-flex justify-content-center btn-animate ${activeTab === 'establishments' && 'active'}`} onClick={() => handleTabChange('establishments')}>
                  <div className="d-flex">
                    <i className="fas fa-utensils mx-auto my-auto"></i>
                    <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Заведения</strong></p>
                  </div>
                </li>
                {/* Payment tab */}
                {/* Handle payment tab change */}
                <li className={`list-group-item d-flex justify-content-center btn-animate ${activeTab === 'payment' && 'active'}`} onClick={() => handleTabChange('payment')}>
                  <div className="d-flex">
                    <i className="fas fa-coins mx-auto my-auto"></i>
                    <p className="mb-0 fw-bold d-none d-sm-block mx-2"><strong>Оплата</strong></p>
                  </div>
                </li>
                {/* Logout tab */}
                {/* Handle logout tab change */}
                <li className={`list-group-item d-flex justify-content-center btn-animate mb-auto ${activeTab === 'logout' && 'active'}`} onClick={() => handleTabChange('logout')}>
                  <div className="d-flex">
                    <i className="fas fa-right-from-bracket mx-auto my-auto text-danger"></i>
                    <p className="mb-0 text-danger d-none d-sm-block mx-2"><strong>Выйти</strong></p>
                  </div>
                </li>

                {/* Contacts block */}

              </ul>

              <div className="d-flex justify-content-center flex-wrap mt-auto">

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
              </div>
            </div>
          </div>
          {/* Content block, render a specific component depending on the active tab */}

          {/* if user clicked on any tab, handle and render definite component */}
          {/* Render profile component */}
          {activeTab === 'profile' && (<Profile></Profile>)}

          {/* Render reports component */}
          {/* {activeTab === 'reports' && (<Reports></Reports>)} */}

          {/* Render establishment component */}
          {activeTab === 'establishments' && (<Establishments></Establishments>)}

          {/* Render payment component */}
          {activeTab === 'payment' && (<Payment></Payment>)}

          {/* Render logout component */}
          {activeTab === 'logout' && (<Logout></Logout>)}

          {/* End content block */}
          {/* Messages block, all components extended from this block extend a messages */}
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
}

export default Main;