// default imports
import React from 'react';
// routers import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import main css file in all files
import './assets/styles/main.css'

// import user components
import Login from './components/users/Login.jsx';
import Registration from './components/users/Registration.jsx';

// import main components
import Menu from './components/main/Menu.jsx';




function App() {
  // check is authenticated user
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;

  return (
    <Router>
      <Routes>
        {/* The login page is available to non-logged in users, otherwise redirection to the menu page */}
        <Route path='/login' element={isAuthenticated ? <Navigate to='/menu' /> : <Login />} />
        
        {/* The registration page is only available to unauthenticated users */}
        <Route path='/registration' element={isAuthenticated ? <Navigate to='/menu' /> : <Registration />} />

        {/* The menu page is only accessible to authenticated users */}
        <Route path='/menu' element={isAuthenticated ? <Menu /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;

