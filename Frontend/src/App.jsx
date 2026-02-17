import React, { useContext } from 'react'
import {BrowserRouter as Router , Routes , Route, Outlet, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ManageTask from './pages/Admin/ManageTask';
import ManageUser from './pages/Admin/ManageUser';
import CreateTask from './pages/Admin/CreateTask';
import UserDashboard from './pages/User/UserDashboard';
import MyTask from './pages/User/MyTask';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
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
          <Route path = '/signUp' element ={<SignUp />} />

          { /* Admin Routes */}
          <Route element = {<PrivateRoute allowedRoles = {["admin"]} />}>
            <Route path = '/admin/dashboard' element = {<Dashboard />} />
            <Route path = '/admin/tasks' element = {<ManageTask />} />
            <Route path = '/admin/create-task' element = {<CreateTask />} />
            <Route path = '/admin/users' element = {<ManageUser />} />
            </Route>
          
          { /* User Routes */}
          <Route element = {<PrivateRoute allowedRoles = {["user"]} />}>
            <Route path = '/user/dashboard' element = {<UserDashboard />} />
            <Route path = '/user/tasks' element = {<MyTask />} />
              <Route path = '/user/task-details/:id' element = {<ViewTaskDetails/>} />
          </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}
                         

export default App;
