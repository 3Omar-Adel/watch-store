# Watch Store

A full-stack e-commerce web application for browsing, purchasing, and managing watches.

The project was built primarily as a Frontend-focused application, with a custom backend API developed to simulate a real-world environment and provide practical experience integrating React applications with backend services.

## 🚀 Project Overview

Watch Store is a responsive e-commerce platform that provides customers with a complete shopping experience, from browsing products to managing their cart, wishlist, addresses, and orders.

The project also includes a dedicated Admin Dashboard for managing products and orders and monitoring store activity.

## ✨ Features

### Customer Features

- User registration and login
- JWT-based authentication
- Browse and search products
- Product filtering and categorization
- Product details page
- Shopping cart
- Wishlist
- Product quantity management
- Checkout and order creation
- Address management
- Order history
- Responsive design for desktop and mobile
- Loading states and error handling

### Admin Features

- Protected admin dashboard
- Product management
- Add, update, and delete products
- Product image management
- Order management
- Update order status
- Sales statistics
- Dashboard overview
- Admin-specific navigation and layout

## 🛠️ Technologies

### Frontend

- React
- React Router
- Redux Toolkit
- React Context API
- Material UI
- Axios
- JavaScript (ES6+)
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- REST API

## 🏗️ Project Structure

```text
watch-store/
│
├── client/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── theme/
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── structure.txt
```

## 🔐 Authentication

The application implements user authentication using JWT tokens.

Passwords are securely hashed using bcrypt before being stored, and protected routes are used for authenticated user and admin operations.

## 🔄 Frontend & Backend Integration

The React frontend communicates with the backend through RESTful APIs using Axios.

The backend was developed to provide practical experience with:

- API integration
- HTTP requests
- Authentication
- CRUD operations
- Database interaction
- Error handling
- Connecting frontend features with backend services

## 📱 Responsive Design

The application is designed to provide a consistent experience across:

- Desktop
- Tablet
- Mobile devices

## 🎯 Project Goals

The main goal of this project was to build a realistic e-commerce application while strengthening practical Frontend development skills.

The project focuses heavily on:

- React architecture
- State management
- Component-based development
- API integration
- Authentication
- Responsive UI
- E-commerce workflows
- Admin dashboard development

## 📌 Future Improvements

Possible future improvements include:

- Online payment integration
- Advanced product search
- Performance optimization
- Automated testing
- Deployment and CI/CD
- Additional analytics and reporting

## 👨‍💻 Author

Omar Adel

Frontend Developer