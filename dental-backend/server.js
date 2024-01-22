const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dental_care',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});



// Registration check endpoint
app.post('/api/check-user', (req, res) => {
  const { email } = req.body;

  // Perform the check in your users' table (replace with your actual logic)
  const sql = 'SELECT COUNT(*) AS userCount FROM users WHERE email = ?';
  
  // Execute the SQL query using your database connection
  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if the user exists based on the count returned from the query
    const userExists = results[0].userCount > 0;

    res.json({ exists: userExists });
  });
});


const randomstring = require('randomstring');

// Automatic registration endpoint
app.post('/api/register', (req, res) => {
  const { email, firstName, lastName, phoneNumber } = req.body;

  const checkUserSql = 'SELECT COUNT(*) AS userCount FROM users WHERE email = ?';

  db.query(checkUserSql, [email], (error, results) => {
    if (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userExists = results[0].userCount > 0;

    if (userExists) {
      return res.json({ success: false, message: 'User already registered' });
    }

    const tempPassword = randomstring.generate(10);

    const registerUserSql = 'INSERT INTO users (firstname, lastname, email, phone, password, registration_date, status) VALUES (?, ?, ?, ?, ?, NOW(), ?)';
    const values = [firstName, lastName, email, phoneNumber, tempPassword, 'pending']; // 'pending' status as an example, update as needed

    // Execute the SQL query using your database connection
    db.query(registerUserSql, values, (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Send registration email with the temporary password
      sendRegistrationEmail(email, tempPassword);

      // Return a success response
      res.json({ success: true });
    });
  });
});

function sendRegistrationEmail(email, tempPassword) {
  const transporter = nodemailer.createTransport({
             host: 'smtp.sparkpostmail.com',
             port: 587,
             secure: false,
             auth: {
                 type: "AUTH LOGIN",
                 user: "SMTP_Injection",
                 pass: "b6eafd0a80c7f13bef692eafb32e120ebaebee70"
             }
     });

  const mailOptions = {
    from: 'dental_care@araosds.com',
    to: email,
    subject: 'Registration at Dental Office',
    text: `Welcome to Dental Office! Your temporary password is: ${tempPassword}. Please use this password to set up your account.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending registration email:', error);
    } else {
      console.log('Registration email sent:', info.response);
    }
  });
}

// Example endpoint to retrieve list of services
app.get('/api/services', (req, res) => {
  const query = 'SELECT * FROM services';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying services:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Protected endpoint for booking appointments
app.post('/api/book-appointment', (req, res) => {
  const {
    serviceId,
    firstName,
    lastName,
    phoneNumber,
    email,
    appointmentDate,
  } = req.body;

  // Your existing code for inserting appointments

  // Execute the SQL query using your database connection
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting appointment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const appointmentId = results.insertId;
    return res.status(200).json({ success: true, appointmentId });
  });
});

// Protected endpoint for retrieving user's appointments
app.get('/api/appointments/:email', (req, res) => {
  console.log('Request Params:', req.params);
  const { email } = req.params;
  
  const query =`SELECT appointments.id,appointments.firstName, appointments.lastName, appointments.created_at AS 'created_At', CONCAT(dentists.firstname, ' ', dentists.lastname) AS 'Dentist_Name', appointments.appointmentDate, services.service_name AS 'service', appointments.status, appointments.updated_at AS 'updated_At'FROM appointments LEFT JOIN services ON services.id = appointments.serviceId LEFT JOIN dentists ON dentists.id = appointments.dentist_id WHERE appointments.email = ?`; 
  

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying appointments:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ appointments: results });
    }
  });
});




app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input (you may want to perform more detailed validation)
  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid input. Please provide email and password.' });
  }

  // Check user credentials in the database (replace with your actual logic)
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error checking user credentials:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if the user exists
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
    }

    // User is authenticated, generate JWT token
    const user = results[0];

    // Return the token and user information to the client
    res.json({userId: user.id, email: user.email });
  });
});

app.get('/api/dentists', (req, res) => {
  const query = 'SELECT * FROM dentists';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying dentists:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Endpoint for editing and saving appointments
app.put('/api/appointments/:id/edit', (req, res) => {
  const appointmentId = req.params.id;
  const { service, schedule, dentist } = req.body;

  // Your logic to update the appointment in the database
  const updateQuery = `
    UPDATE appointments
    SET service = ?, appointmentDate = ?, dentist_id = ?
    WHERE id = ? AND email = ?;
  `;

  db.query(
    updateQuery,
    [service, schedule, dentist, appointmentId, req.user.email],
    (error, results) => {
      if (error) {
        console.error('Error updating appointment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows === 0) {
        // No rows were affected, indicating that the appointment doesn't exist or doesn't belong to the user
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Return a success response
      res.json({ success: true });
    }
  );
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
