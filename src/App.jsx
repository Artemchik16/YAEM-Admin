import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/main.css'
import Login from './components/auth/Login.jsx';
import Registration from './components/auth//Registration.jsx';
import Menu from './components/Menu.jsx';


export default function App() {
  // Check is authenticated user, getting user token
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;


  return (
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
      </Routes>
    </Router>
  );
}
