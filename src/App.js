// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';

import Home from './pages/Home';
import Services from './pages/Services';
import Appointments from './pages/Appointments';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <header className="text-center mb-5">
          <h1>Dental Office Online Scheduling System</h1>
          <p className="lead">Welcome to our scheduling system. Book your appointment online!</p>
        </header>

        {<Navigation />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
