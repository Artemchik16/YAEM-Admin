// default imports
import React from 'react';
// routers import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "mdb-ui-kit"
// import main css file in all files
import './assets/styles/main.css'

// MDB
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// import user components
import Login from './components/users/Login.jsx';
import Registration from './components/users/Registration.jsx';

// import main components
import Menu from './components/main/Menu.jsx';





function App() {

  // check is authenticated user, getting user token
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;

  return (
    <Router>
      <Routes>
        {/* Default redirect from default(/) page on menu page */}
        <Route
          path='/'
          element={<Navigate to='/menu'></Navigate>}
        >
        </Route>
        {/* The login page is available to non-logged in users, otherwise redirection to the menu page */}
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/menu'></Navigate> : <Login></Login>}
        >
        </Route>
        {/* The registration page is only available to unauthenticated users */}
        <Route
          path='/registration'
          element={isAuthenticated ? <Navigate to='/menu'></Navigate> : <Registration></Registration>}
        >
        </Route>
        {/* The menu page is only accessible to authenticated users */}
        <Route
          path='/menu'
          element={isAuthenticated ? <Menu></Menu> : <Navigate to='/login'></Navigate>}
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

