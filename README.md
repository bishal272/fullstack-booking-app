# FULL STACK BOOKING WEB APP

- This app is Build using Reactjs, Express, Mongodb, Nodejs, Tailwind CSS, Vite.

# Full Stack Booking App - MERN Stack

## Description

This is a full-stack booking application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to book places, and manage bookings in a user-friendly and efficient manner. It includes features such as user authentication, booking management, and list places for booking.

The application is built with modern web development technologies and follows best practices for scalability, security, and performance. It utilizes the power of React for building the dynamic user interface, Node.js and Express for the server-side logic, and MongoDB for the database management.

## Technologies Used

The following technologies and libraries were used in the development of this application:

- Front-end:

  - React.js
  - React Hooks for state management
  - Axios for API calls

- Back-end:
  - Node.js for server-side logic
  - Express.js for building RESTful APIs
  - JWT for token-based authentication
  - MongoDB for database management

## Key Features

- User Authentication: The app includes a robust user authentication system that allows users to sign up, login, and logout securely. It utilizes JWT for token-based authentication.

- Booking Management: Users can book appointments and manage their bookings, including viewing, editing, and canceling appointments. The app provides a smooth and intuitive booking management experience for users.

- List places: Users can list their place and specify details such as title, address, checkin, checkout, photos, and description. Events can be viewed and booked by other users, providing a collaborative booking experience.

- Upload Photos: The app uses Amazon AWS S3 storage to store photos, and retrieve when requested.

## Deployment

The application is deployed on a cloud hosting platform, Vercel, ensuring high availability and scalability.

## Installation

To run the application locally, follow these steps:

1. Clone the repository from GitHub.
2. Install dependencies for the front-end and back-end using `npm i`.
3. Set up a MongoDB database and provide the connection URL in the back-end configuration in local .env file.
4. Run the back-end server using `nodemon index.js`.
5. Run the front-end development server using `npm run dev`.
6. Access the application in your web browser at `http://localhost:5173`.
