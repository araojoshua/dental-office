import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Navigation() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [patientInfo, setPatientInfo] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);  // Ensure these lines are present
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  useEffect(() => {
    // Check if the user is already logged in (e.g., token stored in localStorage)
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);


    }
  }, []);

const handleLogin = () => {
    const loginData = { email: email, password };

    axios.post('http://localhost:8001/api/login', loginData)
      .then(response => {
       
        localStorage.setItem('email',email);
        setIsLoggedIn(true);
        closeLoginModal();
        setLoginSuccess('Login successful');
        // Clear success message after 3 seconds
        setTimeout(() => {
          setLoginSuccess('');
        }, 3000);
      })
      .catch(error => {
        if (error.response) {
          console.error('Login failed. Server responded with:', error.response.status, error.response.data);
          setLoginError(`Login failed. ${error.response.data.message}`);
        } else if (error.request) {
          console.error('Login failed. No response received from the server.');
          setLoginError('Login failed. No response received from the server.');
        } else {
          console.error('Login failed. Error setting up the request:', error.message);
          setLoginError('Login failed. Please try again.');
        }
        // Clear error message after 3 seconds
        setTimeout(() => {
          setLoginError('');
        }, 3000);
      });
  };

  const handleLogout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem('email');
    window.location.reload();
    // Update the state to indicate that the user is logged out
    setIsLoggedIn(false);

    // Optionally, redirect the user or perform additional logout actions
  };

  useEffect(() => {
    // Fetch the list of services from your backend when the component is mounted
    axios.get('http://localhost:8001/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

 const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setEmail('');
    setPassword('');
     // Clear login messages when closing the modal
    setLoginError('');
    setLoginSuccess('');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPatientInfo({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    setAppointmentDate('');
    setSelectedService(null);
    setBookingStatus(null);
    setSuccessMessage(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleBookAppointment = () => {
    // Reset previous status and messages
    setBookingStatus(null);

    // Check if all required fields are filled
    if (!patientInfo.firstName || !patientInfo.lastName || !patientInfo.email || !patientInfo.phoneNumber || !appointmentDate || !selectedService) {
      setBookingStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patientInfo.email)) {
      setBookingStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Check if the user is registered
    axios.post('http://localhost:8001/api/check-user', { email: patientInfo.email })
      .then(response => {
        const userExists = response.data.exists;

        if (userExists) {
          // User is registered, proceed with booking
          makeBookingRequest();
        } else {
          // User is not registered, initiate automatic registration
          registerUser();
        }
      })
      .catch(error => {
        console.error('Error checking user registration:', error);
        setBookingStatus({ type: 'error', message: 'Error checking user registration. Please try again.' });
      });
  };

  const makeBookingRequest = () => {
    // Make the booking request to the backend
    axios.post('http://localhost:8001/api/book-appointment', {
      serviceId: selectedService.id,
      firstName: patientInfo.firstName,
      lastName: patientInfo.lastName,
      phoneNumber: patientInfo.phoneNumber,
      email: patientInfo.email,
      appointmentDate,
    })
      .then(response => {
        console.log('Appointment booked successfully. Appointment ID:', response.data.appointmentId);
        setSuccessMessage('Appointment booked successfully. Appointment ID: ' + response.data.appointmentId);
        onAppointmentBooked();
        onClose();
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        setBookingStatus({ type: 'error', message: 'Error booking appointment. Please try again.' });
      });
  };

  const registerUser = () => {
    // Initiate automatic registration
    axios.post('http://localhost:8001/api/register', {
      firstName: patientInfo.firstName,
      lastName: patientInfo.lastName,
      phoneNumber: patientInfo.phoneNumber,
      email: patientInfo.email
    })
      .then(response => {
        console.log('User registered successfully.');
        // Proceed with the booking request after registration
        makeBookingRequest();
      })
      .catch(error => {
        console.error('Error registering user:', error);
        setBookingStatus({ type: 'error', message: 'Error registering user. Please try again.' });
      });
  };

  const onAppointmentBooked = () => {
    // Add logic for what happens when an appointment is booked
    console.log('Appointment booked!');
  };

  const onClose = () => {
    // Add logic for what happens when the modal is closed
    setTimeout(() => {
      closeModal();
    }, 3000);
    console.log('Modal closed!');
  };

  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Dental Office</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/services">Services</Link>
          </li>
          {isLoggedIn && (
        <li className="nav-item">
          <Link className="nav-link" to="/appointments">Appointments</Link>
        </li>
      )}

        </ul>
      </div>

      <div className="ml-auto"> {/* Use Bootstrap utility class 'ml-auto' to push content to the right */}
        {/* Book Appointment Button */}
      <button className="btn btn-primary" onClick={openModal}>Book Appointment</button>
        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="btn btn-primary" onClick={openLoginModal}>Login</button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Appointment</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display error or success message if available */}
                {bookingStatus && (
                  <div className={`alert ${bookingStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {bookingStatus.message}
                  </div>
                )}

                {/* Success message */}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

                {/* Modal Content */}
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      {/* First Name and Last Name in one row */}
                      <div className={`form-group ${bookingStatus && !patientInfo.firstName ? 'error' : ''}`}>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={patientInfo.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`form-group ${bookingStatus && !patientInfo.lastName ? 'error' : ''}`}>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={patientInfo.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`form-group ${bookingStatus && !patientInfo.phoneNumber ? 'error' : ''}`}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={patientInfo.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={`form-group ${bookingStatus && !patientInfo.email ? 'error' : ''}`}>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={patientInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={`form-group ${bookingStatus && !selectedService ? 'error' : ''}`}>
                    <label htmlFor="service">Select Service:</label>
                    <select
                      id="service"
                      className="form-control"
                      name="service"
                      value={selectedService ? selectedService.id : ''}
                      onChange={(e) => setSelectedService(services.find(service => service.id === parseInt(e.target.value)))}
                    >
                      <option value="" disabled>Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>{service.service_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className={`form-group ${bookingStatus && !appointmentDate ? 'error' : ''}`}>
                    <label htmlFor="appointmentDate">Date-Time Schedule:</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="appointmentDate"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                </form>
                {/* Additional form fields or content */}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleBookAppointment}>Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button type="button" className="close" onClick={closeLoginModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    {/* Display error message if login fails */}
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}

      {/* Display success message if login is successful */}
      {loginSuccess && (
        <div className="alert alert-success" role="alert">
          {loginSuccess}
        </div>
      )}
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeLoginModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
        )}


    </nav>
  );
}


export default Navigation;
