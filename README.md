# 📋 MERN Task Manager

A full-stack **Task Management** web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It supports two user roles — **Admin** and **Member** — with a rich set of features including task CRUD, progress tracking, interactive dashboards, Excel report exports, profile photo uploads, and a dark/light theme toggle.

---

## 📸 Features Overview

### 👤 Authentication
- User **Registration** and **Login** with JWT (7-day token)
- **Role-based access control**: `admin` and `member` roles
- Admin accounts are created via a secret **Admin Invite Token**
- Profile photo upload support

### 🛡️ Admin Features
- **Admin Dashboard** with statistics and interactive charts (Pie & Bar)
- View task distribution by status (Pending / In Progress / Completed)
- View task priority breakdown (Low / Medium / High)
- **Create**, **edit**, and **delete** tasks
- Assign tasks to one or more users
- Add sub-tasks (todo checklist) to each task
- **Manage Users** — view all members, delete users
- **Export Reports** to Excel (tasks and users)
- Recent task overview table on dashboard

### 👥 Member Features
- **User Dashboard** with personal task summary
- View tasks assigned to the logged-in user
- Filter tasks by status
- Update task status (e.g., mark In Progress or Completed)
- Check off individual todo items within a task
- View full **task details** (description, due date, attachments, checklist)

### 🎨 UI / UX
- Fully **responsive** layout (mobile + desktop)
- **Dark / Light mode** toggle with system preference detection and localStorage persistence
- Animated background effects (Aurora, Waves)
- Recharts-powered **Pie Chart** and **Bar Chart** on dashboards
- Toast notifications for user feedback

---

## 🗂️ Project Structure

```
Task_Manager/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   ├── taskController.js      # Task CRUD, dashboard data
│   │   ├── userController.js      # User management
│   │   └── reportController.js    # Excel export
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT protect + adminOnly guards
│   │   └── uploadMiddleware.js    # Multer file upload config
│   ├── models/
│   │   ├── User.js                # User schema (name, email, role, photo)
│   │   └── Task.js                # Task schema (title, status, priority, todos)
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── taskRoute.js
│   │   ├── userRoute.js
│   │   └── reportRoute.js
│   ├── uploads/                   # Uploaded profile images
│   ├── server.js                  # Express app entry point
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/                # Static images
│   │   ├── components/
│   │   │   ├── Backgrounds/       # Aurora, Waves animated backgrounds
│   │   │   ├── Cards/             # InfoCard, TaskCard, UserCard
│   │   │   ├── Charts/            # CustomPieChart, CustomBarChart
│   │   │   ├── Inputs/            # Input, SelectDropDown, SelectUser, TodoListInput, etc.
│   │   │   ├── layout/            # DashboardLayout, Navbar, SideMenu, AuthLayout
│   │   │   ├── Modal.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── TaskListTable.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx   # Dark/light mode context
│   │   │   └── userContenxt.jsx   # Authenticated user context
│   │   ├── hooks/
│   │   │   └── useUserAuth.jsx    # Auth guard hook
│   │   ├── pages/
│   │   │   ├── Admin/             # Dashboard, ManageTask, ManageUser, CreateTask
│   │   │   ├── Auth/              # Login, SignUp
│   │   │   ├── Home/              # HomePage, DarkVeil
│   │   │   └── User/              # UserDashboard, MyTask, ViewTaskDetails
│   │   ├── routes/
│   │   │   └── PrivateRoute.jsx   # Role-based protected routes
│   │   ├── utils/
│   │   │   ├── apiPath.js         # Centralised API endpoint constants
│   │   │   ├── axiosInstance.js   # Axios with base URL & auth header
│   │   │   ├── data.js
│   │   │   ├── helper.js          # Utility functions
│   │   │   └── uploadimage.js     # Image upload helper
│   │   ├── App.jsx                # Route definitions
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | HTTP client |
| Recharts | Dashboard charts |
| React Icons | Icon library |
| React Toastify | Toast notifications |
| Moment.js | Date formatting |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js v5 | Web framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| Multer | File (image) uploads |
| ExcelJS | Excel report generation |
| dotenv | Environment variable management |
| nodemon | Dev auto-restart |

---

## ⚙️ Environment Variables

Create a `.env` file inside the `Backend/` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_TOKEN=your_admin_invite_token
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

| Variable | Description |
|---|---|
| `PORT` | Port the backend server listens on (default: `8000`) |
| `MONGO_URI` | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `ADMIN_INVITE_TOKEN` | Token required at registration to create an admin account |
| `CLIENT_URL` | Frontend origin allowed by CORS (e.g. `http://localhost:5173`) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (Atlas free tier or local)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/arya1411/Task_Manager.git
cd Task_Manager
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create your `.env` file (see [Environment Variables](#️-environment-variables) above), then:

```bash
npm run dev
```

The backend starts at **http://localhost:8000**

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend starts at **http://localhost:5173**

---

## 📡 API Endpoints

All protected routes require the `Authorization: Bearer <token>` header.  
Routes marked **[Admin]** require the user's role to be `admin`.

### 🔐 Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user (pass `adminInviteToken` to register as admin) |
| POST | `/api/auth/login` | Public | Login and receive a JWT |
| GET | `/api/auth/profile` | Protected | Get the logged-in user's profile |
| PUT | `/api/auth/profile` | Protected | Update name / email / password |
| POST | `/api/auth/upload-image` | Public | Upload a profile image (returns URL) |

### 👥 Users — `/api/users`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/users` | Admin | Get all users |
| GET | `/api/users/:id` | Protected | Get a user by ID |
| DELETE | `/api/users/:id` | Admin | Delete a user |

### ✅ Tasks — `/api/tasks`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks/dashboard-data` | Protected | Admin dashboard stats & recent tasks |
| GET | `/api/tasks/user-dashboard-data` | Protected | User dashboard stats |
| GET | `/api/tasks` | Protected | List all tasks (admin sees all; member sees assigned) |
| GET | `/api/tasks/:id` | Protected | Get a single task by ID |
| POST | `/api/tasks` | Admin | Create a new task |
| PUT | `/api/tasks/:id` | Protected | Update a task's details |
| DELETE | `/api/tasks/:id` | Admin | Delete a task |
| PUT | `/api/tasks/:id/status` | Protected | Update task status |
| PUT | `/api/tasks/:id/todo` | Protected | Update a task's todo checklist |

### 📊 Reports — `/api/reports`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/reports/exports/tasks` | Admin | Download tasks as an Excel file |
| GET | `/api/reports/exports/users` | Admin | Download users as an Excel file |

---

## 🗺️ Frontend Routes

| Path | Role | Page |
|---|---|---|
| `/` | Public | Home Page |
| `/login` | Public | Login |
| `/signUp` | Public | Sign Up |
| `/admin/dashboard` | Admin | Admin Dashboard |
| `/admin/tasks` | Admin | Manage All Tasks |
| `/admin/create-task` | Admin | Create / Edit Task |
| `/admin/users` | Admin | Manage Users |
| `/user/dashboard` | Member | User Dashboard |
| `/user/tasks` | Member | My Tasks |
| `/user/task-details/:id` | Member | View Task Details |

---

## 🔑 Admin Registration

To register as an admin, include the `adminInviteToken` field in the registration request body:

```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "securepassword",
  "adminInviteToken": "your_admin_invite_token_from_env"
}
```

Without the token, the user is registered as a `member` by default.

---

## 📦 Data Models

### User
| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, hashed with bcryptjs |
| `profileImageUrl` | String | Optional |
| `role` | String | `admin` or `member` (default: `member`) |

### Task
| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `description` | String | Optional |
| `priority` | String | `Low`, `Medium` (default), or `High` |
| `status` | String | `Pending` (default), `In_Progress`, or `Completed` |
| `dueDate` | Date | Required |
| `assignedTo` | [ObjectId] | References `User` |
| `createdBy` | [ObjectId] | References `User` |
| `todoChecklist` | [Object] | Array of `{ text, completed }` sub-tasks |
| `progress` | Number | Percentage (default: `0`) |

---

## 🎨 Dark Mode

The application fully supports dark mode:
- Automatically respects the **OS/system preference** on first load
- User preference is saved to **localStorage** and persists across sessions
- Toggle available in the navigation bar (☀️ / 🌙)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by **Arya**
