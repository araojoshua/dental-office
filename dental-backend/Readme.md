# Dental Care System API

This repository contains the backend code for a Dental Care System API built using Node.js, Express, and MySQL. The API provides endpoints for user registration, login, appointment booking, and other functionalities related to dental care services.

## Table of Contents
- Getting Started
  - Prerequisites
  - Installation
- Usage
  - Registration Check
  - Automatic Registration
  - List of Services
  - Book Appointment
  - User Appointments
  - User Login
  - List of Dentists
  - Edit and Save Appointments
- Configuration
- License

## Getting Started

### Prerequisites
- Node.js installed
- MySQL server installed and running
- SMTP server credentials for sending registration emails

### Installation
cd dental-office/dental_backend
npm install

Configure the MySQL database by creating a database named dental_care and updating the db object in the code with your MySQL credentials.
see sql dump file(dental_care.sql)

Update the SMTP server details in the sendRegistrationEmail function for sending registration emails.

Start the server.
npm start

Usage
Registration Check
Endpoint: /api/check-user
Method: POST
Parameters: email
Description: Check if a user with the provided email already exists.

Automatic Registration
Endpoint: /api/register
Method: POST
Parameters: email, firstName, lastName, phoneNumber
Description: Automatically register a user and send a registration email with a temporary password.

List of Services
Endpoint: /api/services
Method: GET
Description: Retrieve a list of available dental services.

Book Appointment
Endpoint: /api/book-appointment
Method: POST
Parameters: serviceId, firstName, lastName, phoneNumber, email, appointmentDate
Description: Book an appointment for a user.

User Appointments
Endpoint: /api/appointments/:email
Method: GET
Parameters: email
Description: Retrieve a list of appointments for a specific user.

User Login
Endpoint: /api/login
Method: POST
Parameters: email, password
Description: Authenticate a user and generate a JWT token for subsequent requests.

List of Dentists
Endpoint: /api/dentists
Method: GET
Description: Retrieve a list of available dentists.

Edit and Save Appointments
Endpoint: /api/appointments/:id/edit
Method: PUT
Parameters: id, service, schedule, dentist
Description: Edit and save appointments for a user.

Configuration
Port: The server is configured to run on port 8001 by default. You can change this in the port variable at the beginning of the code.
Database: Configure the MySQL connection details in the db object.
SMTP Server: Update the SMTP server details in the sendRegistrationEmail function.

License
This project is licensed under the MIT License. Feel free to modify and use the code as per your requirements.