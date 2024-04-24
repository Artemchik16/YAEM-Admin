// Import react
import React, { useEffect } from "react";
// Import routers
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import custom css file
import './assets/styles/main.css';
// Import axios(HTTP)
import axios from "axios";
// Import urls
import apiUrls from "./components/utils/ApiUrls.js";
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
  const accessToken = sessionStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const isAuthenticated = accessToken !== null;

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      // Send request to refresh access token
      const response = await axios.post(apiUrls.refreshTokens, {
        refresh: refreshToken,
      });
      // Get new access token from response
      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh
      // Save new access and refresh token
      sessionStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      window.location.reload();
    } catch (error) {
      window.location.reload();
    }
  };

  // When loading each component, load AOS animation and refresh tokens
  useEffect(() => {
    AOS.init();
    // Check if there is a refresh token in local storage and refresh access token if present
    if (refreshToken && !accessToken) {
      refreshAccessToken();
    }
    // Add a response interceptor to handle 401 errors
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          // If the error status is 401 (Unauthorized), refresh the access token
          refreshAccessToken();
        }
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when component unmounts
    return () => {
      axios.interceptors.response.eject();
    };
  }, []);

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
