import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateTask = () => {
  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData , setTaskData ] = useState({
    title : "",
    description : "",
    priority : "low",
    dueDate : null,
    assignedTo : [],
    todoCheckList : [] ,
    attachments : [],
  });

  const [currentTask , setCurrentTask] = useState([]);

  const [error , setError] = useState([]);

  const[loading ,setLoading ] = useState(false);

  const[openDeleteAlert , setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key , value) => {
    setTaskData((prevData) => ({...prevData , [key] :value}));
  }

  const clearData = () => {
    setTaskData({
      title :"",
      description  :"",
      priority  :"",
      dueDate : null,
      assignedTo : [],
      todoCheckList :[],
      attachments :[],
    });
  };

  return (
    <DashboardLayout activeMenu="Create Task">

    </DashboardLayout>
  )
}

export default CreateTask