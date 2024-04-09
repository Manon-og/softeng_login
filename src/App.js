import './App.css';
import React, { useState } from 'react'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Main from './MAIN/main';
import UserContext from './UserContext';

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/main"  element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;