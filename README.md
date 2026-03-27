# Library Management System
A full-stack web application for managing library operations with authentication and role-based access.

---

## Features

- Admin & Student Login (JWT)
- Add, Issue, Return, Delete Books
- Real-time Search
- Student View (read-only)
- Fast UI with localStorage session
-  Deployed on Render

---
## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Auth: JWT, bcrypt
- Deployment: Railway

---

## Setup (Run Locally)

### 1. Clone the repo
git clone https://github.com/shikhar004dot-com/library-management-system.git
cd library-management-system

### 2. Install dependencies

### 3. Create `.env` file
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string

### 4. Run the server
  npm start
  
### 5. Open in browser

---

## Default Credentials

### Admin
- Email: admin@gmail.com  
- Password: admin123  

### Student
- Email: student@library.com  
- Password: student123  

---

## Live Demo
https://library-management-system-750k.onrender.com

---

## Key Learnings
- JWT Authentication  
- Deployment on Railway  
- Debugging frontend-backend issues  
- Session handling using localStorage  
- Optimized search without API calls  
