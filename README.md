# Project Submission System (MERN)

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) for managing project assignments and handling secure file submissions (PDF/ZIP).

## 🚀 Features

## Features Implemented

### Authentication
- **User Registration**
- **User Login**
- **JWT Authentication**
- **Refresh Tokens**
- **bcrypt Password Hashing**

### Authorization
- **Protected Frontend Routes**
- **Protected Backend Routes**
- **Role-Based Access Control**

### Profile Dashboard
- **View Profile**
- **Update Profile**

### Project Management
- **Create Projects**
- **Update Projects**
- **Delete Projects**
- **View Projects**

### File Management
- **Upload Documentation PDF**
- **Delete Documentation PDF**
- **Upload ZIP Submission**
- **Multiple Submission Support**
- **Modern UI**: Fully responsive, accessible, and polished interface built with Tailwind CSS v4 and Framer Motion.

## 🛠️ Technology Stack

**Frontend (`/client`)**
- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- React Hook Form
- Axios
- Lucide React (Icons)
- React Hot Toast

**Backend (`/server`)**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Multer (File Uploads)
- Bcrypt.js (Password Hashing)

## 📁 Project Structure

```text
project-submission-system/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # Axios instance and API service handlers
│   │   ├── components/     # Reusable UI components (Buttons, Inputs, Cards, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── layouts/        # Page layouts (Navbar, Sidebar)
│   │   ├── pages/          # Full page views (Dashboard, Login, Projects, etc.)
│   │   ├── routes/         # Routing logic and Guards (Protected/Admin routes)
│   │   ├── utils/          # Helper utilities (Tailwind class merging)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # React entry point
│   └── tailwind.config.js  # Tailwind Configuration
│
└── server/                 # Express Backend
    ├── src/
    │   ├── config/         # Database and environment configurations
    │   ├── controllers/    # Route controllers / business logic
    │   ├── middleware/     # Custom Express middleware (Auth, Admin, Upload)
    │   ├── models/         # Mongoose Data Models
    │   ├── routes/         # Express API route definitions
    │   ├── uploads/        # Directory for user-submitted files
    │   ├── utils/          # Helpers (Token generation)
    │   ├── app.js          # Express app setup
    │   └── server.js       # Server entry point
    └── package.json
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB Atlas connection URI

### 1. Clone the repository
```bash
git clone <repository-url>
cd project-submission-system
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory and add the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```

The app will be running at `http://localhost:5173/` and the API at `http://localhost:8000/api`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
