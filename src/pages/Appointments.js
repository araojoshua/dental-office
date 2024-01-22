import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointments() {
  const [userEmail, setUserEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [editedService, setEditedService] = useState('');
  const [editedSchedule, setEditedSchedule] = useState('');
  const [editedDentist, setEditedDentist] = useState('');
  const [dentists, setDentists] = useState([]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        if (!storedEmail) {
          console.error('Email not found in localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:8001/api/appointments/${storedEmail}`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
  const fetchDentists = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/dentists');
      setDentists(response.data);
    } catch (error) {
      console.error('Error fetching dentists:', error);
    }
  };

  fetchDentists();
  }, []);

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    setEditedService(appointment.service);
    setEditedSchedule(appointment.appointmentDate);
    setEditedDentist(appointment.dentistName);
  };

 const handleSaveEdit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8001/api/appointments/${editAppointment.id}/edit/:${userEmail}`,
      {
        service: editedService,
        schedule: editedSchedule,
        dentist: editedDentist,
      }
    );

    // Check if the edit was successful
    if (response.data.success) {
      // Update local state with the edited appointment
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === editAppointment.id ? response.data : appointment
        )
      );

      // Close the edit modal
      setEditAppointment(null);
    } else {
      // Handle the case where the edit was not successful
      console.error('Edit was not successful:', response.data.error);
    }
  } catch (error) {
    console.error('Error saving edit:', error);
  }
};

  const handleCancelEdit = () => {
    setEditAppointment(null);
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`);
      const response = await axios.get(`http://localhost:8001/api/appointments/${userEmail}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  return (
    <div>
      <h2>Appointments</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Dentist Name</th>
            <th>Appointment Date</th>
            <th>Service</th>
            <th>Status</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.created_At}</td>
              <td>{appointment.Dentist_Name}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.service}</td>
              <td>{appointment.status}</td>
              <td>{appointment.updated_At}</td>
              <td>
                <button onClick={() => handleEdit(appointment)} className="btn btn-primary">
                  Edit
                </button>
                <button onClick={() => handleCancel(appointment.id)} className="btn btn-danger">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editAppointment && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Appointment</h5>
                <button type="button" className="btn-close" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <label>Service:</label>
                <input
                  className="form-control"
                  type="text"
                  value={editedService}
                  onChange={(e) => setEditedService(e.target.value)}
                />
                <br />
                <label>Schedule:</label>
                <input
                  className="form-control"
                  type="text"
                  value={editedSchedule}
                  onChange={(e) => setEditedSchedule(e.target.value)}
                />
                <br />
                <label>Dentist:</label>
                <select
                  className="form-control"
                  value={editedDentist}
                  onChange={(e) => setEditedDentist(e.target.value)}
                >
                  <option value="">Select Dentist</option>
                  {dentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                      {dentist.firstname} {dentist.lastname}
                    </option>
                  ))}
                </select>
                <br />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                  Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
