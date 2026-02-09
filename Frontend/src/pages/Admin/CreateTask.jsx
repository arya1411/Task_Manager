import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useLocation } from 'react-router-dom'
import { LuTrash2 } from 'react-icons/lu';
import { PRIORITY_DATA } from '../../utils/data';
import SelectDropDown from '../../components/Inputs/SelectDropDown';
import SelectUser from '../../components/Inputs/SelectUser';
import TodoListInput from '../../components/Inputs/TodoListInput';
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';

const CreateTask = () => {
  const location = useLocation();
  const {taskId} = location.state || {};

  const [taskData , setTaskData ] = useState({
    title : "",
    description : "",
    priority : "Low",
    dueDate : null,
    assignedTo : [],
    todoChecklist : [] ,
    attachments : [],
  });

  const [currentTask , setCurrentTask] = useState([]);

  const [error , setError] = useState([]);

  const[loading ,setLoading ] = useState(false);

  const[openDeleteAlert , setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key , value) => {
    setTaskData((prevData) => ({...prevData , [key] :value}));
  }

  const createTask = async () => {
    setLoading(true);
    try{
      const todoList = taskData.todoChecklist?.map((item) => ({
        text : item ,
        completed : false,
      }));

      const response = await axiosInstance.post(API_PATH.TASKS.CREATE_TASK , {
        ...taskData,
        dueDate : new Date(taskData.dueDate).toISOString(),
        todoChecklist : todoList,
      });
      clearData();
    } catch (error) {
      console.error("Error in Creating Task" , error);
      setLoading(false);
    }
  }
  const clearData = () => {
    setTaskData({
      title :"",
      description  :"",
      priority  :"Low",
      dueDate : null,
      assignedTo : [],
      todoChecklist :[],
      attachments :[],
    });
  };

  const handleSumbit = async () => {
    setError(null);

    if(!taskData.title.trim()){
      setError("Tittle Is Required");
      return ;
    }

    if(!taskData.description.trim()){
      setError("Description is Required");
    }
    
    if(!taskData.dueDate) {
      setError("Due Date is Required");
    }

    if(taskData.assignedTo.length === 0){
      setError("Task is not Assigned to nay memeber");
      return ;
    }

    if(taskData.todoChecklist?.length === 0){
      setError("You need TO add Atleast one of Todo Task ");
    }

    if(taskId){
      updateTask();
      return ;
    }
    
    createTask();
  }

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task "}
              </h2>
              {taskId && (
                <button className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer" onClick={() => setOpenDeleteAlert(true)}>
                  <LuTrash2 className='text-base' /> delete
                </button>
              )}
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-slate-600">
                Task Title
              </label>

              <input
                placeholder='Create App Ui'
                className='form-input'
                value = {taskData.title}
                onChange={({target}) =>
                handleValueChange("title" , target.value)}
                />
              </div>

              <div className="mt-3">
                <label  className="text-sm">Description</label>
              
              <textarea
                placeholder='Describe Task '
                className='form-input'
                rows={3}
                value={taskData.description}
                onChange={({target}) => handleValueChange("description" , target.value)}
              ></textarea>
              </div>    
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-sm font-medium text-slate-600">Priority</label>
                <SelectDropDown
                  option ={PRIORITY_DATA}
                  value = {taskData?.priority}
                  onChange= {(value) => handleValueChange("priority" , value)}
                  placeholder = "Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>

                <input type="date" className="form-input" value={taskData.dueDate ?? ""} onChange={({target}) => {
                  handleValueChange("dueDate" , target.value)
                }}/>
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To 
                </label>

                <SelectUser
                selectedUsers = {taskData.assignedTo}
                setSelectedUsers = {(value) => {
                  handleValueChange("assignedTo" ,value);
                }}
                />
              </div>

            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">TODO CHECKLIST</label>
              <TodoListInput
                  todoList = {taskData?.todoChecklist}
                  setTodoList = {(value) => 
                  handleValueChange("todoChecklist" , value)
                  }
            />
            </div>
          
            <div className="mt-3">
              <label  className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>

              <AddAttachmentsInput
                attachments = {taskData?.attachments}
                setAttachments = {(value) => 
                    handleValueChange("attachments" , value)
                }
                />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button 
              className='add-btn' 
              onClick={handleSumbit}
              disabled = {loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask