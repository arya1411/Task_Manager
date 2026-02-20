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

## IMAGE OR DEMO

----- HOME PAGE ----
<img width="1902" height="858" alt="Screenshot 2026-02-20 191316" src="https://github.com/user-attachments/assets/aaac74a8-4e73-472d-a10b-e1b1789b3758" />
<img width="1899" height="865" alt="image" src="https://github.com/user-attachments/assets/66eceaf9-3a8f-4ecc-85e0-858093deaa73" />

-----LOGIN PAGE ----
<img width="1919" height="872" alt="Screenshot 2026-02-20 191413" src="https://github.com/user-attachments/assets/6e8d3b7c-4ef4-498e-8608-111fbdc34ceb" />

----- ADMIN DASHBOARD ----
<img width="1905" height="856" alt="Screenshot 2026-02-20 191439" src="https://github.com/user-attachments/assets/837a5e39-53b0-47b9-90cf-a5ec6bea2881" />
<img width="1919" height="870" alt="Screenshot 2026-02-20 191510" src="https://github.com/user-attachments/assets/0b9166d3-f12c-488e-bb22-335e10e25de5" />
<img width="1573" height="869" alt="Screenshot 2026-02-20 191600" src="https://github.com/user-attachments/assets/57450e48-400f-4607-8559-5382d9da0050" />

---- USER DASHBOARD ----
<img width="1635" height="689" alt="Screenshot 2026-02-20 191652" src="https://github.com/user-attachments/assets/b6246745-cf00-4098-8839-4a55eabd9026" />
<img width="1642" height="791" alt="Screenshot 2026-02-20 191707" src="https://github.com/user-attachments/assets/c5e92f66-b113-4f3d-b4b9-57a720f245fd" />
<img width="1666" height="794" alt="Screenshot 2026-02-20 191724" src="https://github.com/user-attachments/assets/bd90e258-37b2-4c5c-9b33-fe45e333c366" />

## Author
Made by Arya.
