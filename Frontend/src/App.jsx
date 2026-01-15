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
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path = '/login' element ={<Login />} />
          <Route path = '/signUp' element ={<SignUp />} />

          { /* Admin Routes */}
          <Route element = {<PrivateRoute allowedRoles = {["admin"]} />}>
            <Route path = '/admin/dashboard' element = {<Dashboard />} />
            <Route path = '/admin/task' element = {<ManageTask />} />
            <Route path = '/admin/create-task' element = {<CreateTask />} />
            <Route path = '/admin/users' element = {<ManageUser />} />
            </Route>
          
          { /* User Routes */}
            <Route element = {<PrivateRoute allowedRoles = {["admin"]} />}>
            <Route path = '/User/UserDashboard' element = {<UserDashboard />} />
            <Route path = '/User/tasks' element = {<MyTask />} />
            <Route path = '/User/tasks' element = {<MyTask />} /> 
            <Route path = '/User/task-details/:id' element = {<ViewTaskDetails/>} />\
            </Route>
          
            <Route path='/' element = {<Root/>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}
                         

export default App; 

const Root = () => {
  const {user , loading } = useContext(UserContext);
  if (loading) return <Outlet />
  
  if (!user) {
     return <Navigate to =  '/login' />
    
  }

  return user.role === 'admin' ? <Navigate to = "/admin/dashboard" /> : <Navigate to = '/users/dashboard' />;


}
