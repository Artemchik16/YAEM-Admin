// default imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import user components
import Login from './components/users/Login.jsx';
import Registration from './components/users/Registration.jsx';
// import main components
import Main from './components/main/Main.jsx';
// 

function App() {
  return (
    // all app url
    <Router>
      <Routes>
        {/* login page */}
        <Route path='/login' element={<Login></Login>}></Route>
        {/* registration page */}
        <Route path='/registration' element={<Registration></Registration>}></Route>
        {/* main page */}
        <Route path='/main' element={<Main></Main>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
