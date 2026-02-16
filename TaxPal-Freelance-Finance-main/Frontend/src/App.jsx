import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
{/*import './App.css'*/}

import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
/* 
function App() {
  return (
    <div> 
      {<SignupPage />}
      <Login />
    </div>
    
  );
}

*/
function App() {
  return (
    <div className="App"> 
      <Routes>
        {/* Redirect base URL to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Home route (we will protect this later) */}
        <Route path="/home" element={<div><h1>Welcome Home!</h1></div>} />
      </Routes>
    </div>
  );
}

export default App
