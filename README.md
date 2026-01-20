# MERN Task Manager

A full-stack Task Manager web application built using the MERN stack (MongoDB, Express.js, React, Node.js).
This project is inspired by a YouTube tutorial and focuses on building a complete task management system with authentication and CRUD functionality.

## Features
- User Authentication (Register / Login)
- JWT based authentication
- Create, Read, Update, Delete (CRUD) tasks
- Protected API routes
- Clean and responsive UI
- RESTful backend architecture
- Environment variable security

## Tech Stack
Frontend:
- React
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

## Project Structure
mern-task-manager/
│
├── backend/
├── frontend/
├── .gitignore
└── README.md

## Environment Variables
Create a `.env` file inside the backend folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  

Make sure `.env` is added to `.gitignore`.

## Installation

Clone the repository:
git clone https://github.com/your-username/mern-task-manager.git  
cd mern-task-manager  

Install backend dependencies:
cd backend  
npm install  

Install frontend dependencies:
cd ../frontend  
npm install  

## Run the Project

Start backend:
cd backend  
npm run dev  

Start frontend:
cd frontend  
npm start  

Backend runs on:
http://localhost:5000  

Frontend runs on:
http://localhost:3000  

## API Endpoints

Auth:
POST   /api/auth/register  
POST   /api/auth/login  

Tasks:
GET    /api/tasks  
POST   /api/tasks  
PUT    /api/tasks/:id  
DELETE /api/tasks/:id  

All task routes are protected by JWT.

## Usage
1. Register a new account
2. Login
3. Create tasks
4. Edit or delete tasks
5. Manage your workflow efficiently

## License
This project is open source and available under the MIT License.
"@ | Out-File -Encoding UTF8 README.md




Made By Arya!
