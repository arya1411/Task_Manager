import React, { useContext } from 'react'
import {BrowserRouter as Router , Routes , Route, Outlet, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import ManageTask from './pages/Admin/ManageTask';
import ManageUser from './pages/Admin/ManageUser';
import CreateTask from './pages/Admin/CreateTask';
import CreateUser from './pages/Admin/CreateUser';
import UserDashboard from './pages/User/UserDashboard';
import MyTask from './pages/User/MyTask';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './routes/PrivateRoute';
import UserProvider, { UserContext } from './context/userContenxt';
import ThemeProvider from './context/ThemeContext';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
          <Route path = '/' element ={<HomePage />} />
          <Route path = '/login' element ={<Login />} />

          { /* Admin Routes */}
          <Route element = {<PrivateRoute allowedRoles = {["admin"]} />}>
            <Route path = '/admin/dashboard' element = {<Dashboard />} />
            <Route path = '/admin/tasks' element = {<ManageTask />} />
            <Route path = '/admin/create-task' element = {<CreateTask />} />
            <Route path = '/admin/users' element = {<ManageUser />} />
            <Route path = '/admin/create-user' element = {<CreateUser />} />
            <Route path = '/admin/edit-profile' element = {<EditProfile />} />
            </Route>

          { /* User Routes */}
          <Route element = {<PrivateRoute allowedRoles = {["user"]} />}>
            <Route path = '/user/dashboard' element = {<UserDashboard />} />
            <Route path = '/user/tasks' element = {<MyTask />} />
              <Route path = '/user/task-details/:id' element = {<ViewTaskDetails/>} />
            <Route path = '/user/edit-profile' element = {<EditProfile />} />
          </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}
                         

export default App;
