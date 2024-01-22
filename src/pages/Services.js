// src/Pages/Services.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services from the API
    axios.get('http://localhost:8001/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setError('Error fetching services. Please try again later.');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Services</h2>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {services.map(service => (
            <div key={service.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{service.service_name}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="card-text">${service.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
