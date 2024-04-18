// Import react
import React, { useEffect } from "react";
// Import routers
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import custom css file
import './assets/styles/main.css';
// Import AOS animations
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import main components
import Login from './components/auth/Login.jsx';
import Registration from './components/auth//Registration.jsx';
import Menu from './components/Menu.jsx';
import NotFound from "./components/utils/404NotFound.jsx";


// Parent main component
export default function App() {
  // Check is authenticated user, getting user token
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;
  // When loading each component, load AOS animation
  useEffect(() => {
    AOS.init();
  }, [])

  // HTML block
  return (
    // Routers block
    <Router>
      <Routes>
        {/* Default redirect from default(/) page on menu page */}
        <Route path='/' element={<Navigate to='/menu' />} />
        {/* The login page is available to non-logged in users, otherwise redirection to the menu page */}
        <Route path='/login' element={isAuthenticated ? <Navigate to='/menu'></Navigate> : <Login />} />
        {/* The registration page is only available to unauthenticated users */}
        <Route path='/registration' element={isAuthenticated ? <Navigate to='/menu' /> : <Registration />} />
        {/* The menu page is only accessible to authenticated users */}
        <Route path='/menu' element={isAuthenticated ? <Menu /> : <Navigate to='/login' />} />
        {/* Not found(404) component */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
