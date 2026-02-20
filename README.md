# Task Manager (MERN Stack)

A full-stack task management application built with **MongoDB, Express, React, and Node.js**.
It supports authentication, role-aware task operations, dashboards, checklist progress tracking, image uploads, and Excel report exports.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Run the App](#run-the-app)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Task Status Rules](#task-status-rules)
- [File Uploads](#file-uploads)
- [Reports](#reports)
- [Known Notes](#known-notes)
- [Roadmap Ideas](#roadmap-ideas)
- [Author](#author)

---

## Overview

This project is organized into two top-level apps:

- **`Backend/`**: REST API, auth, MongoDB models, uploads, reporting.
- **`Frontend/`**: React + Vite dashboard UI for admin/member workflows.

---

## Features

- JWT-based user authentication (`register`, `login`, `profile`)
- Role model in backend (`admin`, `member`)
- Admin-focused task creation/management
- Task assignment to one or more users
- Task checklist with automatic progress calculation
- Status-aware dashboards (`Pending`, `In_Progress`, `Completed`)
- Image upload API with multer (JPEG/PNG, max 5MB)
- Excel report export for tasks and users
- Responsive frontend with charts and cards

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS 4
- Recharts
- React Toastify

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `multer`
- `exceljs`
- `dotenv`

---

## Project Structure

```text
Task_Manager/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)

---

## Environment Variables

Create `Backend/.env`:

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
ADMIN_INVITE_TOKEN=optional_admin_invite_token
```

### Why `PORT=8000`?

Frontend is currently configured with:

- `Frontend/src/utils/apiPath.js` → `BASE_URL = 'http://localhost:8000'`

So backend should run on port `8000` unless you also change frontend base URL.

---

## Installation

From project root:

```bash
# Backend dependencies
cd Backend
npm install

# Frontend dependencies
cd ../Frontend
npm install
```

---

## Run the App

Use two terminals:

### Terminal 1 (Backend)

```bash
cd Backend
npm run dev
```

Backend: `http://localhost:8000`

### Terminal 2 (Frontend)

```bash
cd Frontend
npm run dev
```

Frontend (Vite default): `http://localhost:5173`

---

## API Reference

Base URL: `http://localhost:8000`

### Auth Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login and receive JWT
- `GET /profile` - Get current user profile (protected)
- `PUT /profile` - Update current user profile (protected)
- `POST /upload-image` - Upload profile image (`multipart/form-data`, field: `image`)
- `POST /uploads` - Additional upload endpoint from `server.js` (`multipart/form-data`, field: `image`)

### User Routes (`/api/users`)

- `GET /` - Get users (admin only)
- `GET /:id` - Get single user
- `DELETE /:id` - Delete user (admin only)

### Task Routes (`/api/tasks`)

- `GET /dashboard-data` - Admin dashboard summary
- `GET /user-dashboard-data` - Current user dashboard summary
- `GET /` - List tasks (`?status=Pending|In_Progress|Completed`)
- `GET /:id` - Get task by ID
- `POST /` - Create task (admin only)
- `PUT /:id` - Update task
- `DELETE /:id` - Delete task (admin only)
- `PUT /:id/status` - Update task status
- `PUT /:id/todo` - Update checklist + auto progress/status

### Report Routes (`/api/reports`)

- `GET /exports/tasks` - Download task report `.xlsx` (admin only)
- `GET /exports/users` - Download user report `.xlsx` (admin only)

---

## Authentication

Protected routes require header:

```http
Authorization: Bearer <jwt_token>
```

Token is generated on login/register and expires in 7 days.

---

## Task Status Rules

Supported canonical statuses in backend:

- `Pending`
- `In_Progress`
- `Completed`

Backend also normalizes variants like `in progress`, `in-progress`, `In Progress`.

Checklist updates automatically recalculate:

- `progress` percentage
- status transition (`Pending` → `In_Progress` → `Completed`)

---

## File Uploads

Upload constraints:

- Allowed formats: `.jpg`, `.jpeg`, `.png`
- Max size: **5MB**
- Storage: `Backend/uploads/`

Static access:

- `GET /uploads/<filename>`

---

## Reports

Exports use `exceljs` and return downloadable Excel files:

- `task_report.xlsx`
- `user_report.xlsx`

---

## Known Notes

- In backend env, key is `MONGO_URL` (not `MONGO_URI`).
- Frontend API base URL is hardcoded in `Frontend/src/utils/apiPath.js`.
- Backend report routes are `/api/reports/exports/...`.
- `Frontend/src/utils/apiPath.js` currently uses `/api/reports/export/...` (without `s`) for reports.

---

## Roadmap Ideas

- Complete user `GET /:id` and `DELETE /:id` controller logic.
- Add pagination/filtering/sorting for task list endpoints.
- Add automated tests for API routes and auth middleware.
- Move frontend API base URL to `.env` (`VITE_API_BASE_URL`).

---

## Author

Made by Arya.
