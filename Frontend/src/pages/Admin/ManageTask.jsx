import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { LuFile, LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/layout/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
const ManageTask = () => {

  const [allTask , setAllTask]  = useState([]);

  const [tabs , setTabs] = useState([]);

  const [filterStatus , setFilterStatus] = useState("All");

  const navigate  = useNavigate();

  const getAllTask = async () => {
    try {
        const response = await axiosInstance.get(
          API_PATH.TASKS.GET_ALL_TASKS,
          {
            params: {
              status: filterStatus === "All" ? "" : filterStatus,
            },
          }
        );
        setAllTask(response.data?.tasks?.length > 0 ? response.data.tasks : []);

        const statusSummary = response.data?.statusSummary || {};

        const statusArray = [
          {label : "All" , count : statusSummary.all || 0},
          {label : "Pending" , count : statusSummary.Pending || 0},
          {label : "In Progress" , count : statusSummary.InProgress || 0},
          {label : "Completed" , count : statusSummary.Completed || 0}, 
        ];

        setTabs(statusArray);
      } catch (error) {
        console.error(error);
      }

  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task` , { state : {taskId : taskData._id}})
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(API_PATH.TASKS.DELETE_TASK(taskId));
      getAllTask();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDownloadReport = async() => {
  }

  useEffect(() => {
    getAllTask(filterStatus);
    return () => {};
   } , [filterStatus])

  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl ">My Task</h2>
          <button className="flex items-center gap-2 download-btn">
            <LuFileSpreadsheet className="text-lg" />
            <span>Download Report</span>
          </button>

          </div>

          {allTask?.length > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

                <button className="hidden md:flex download-btn" onClick={handleDownloadReport}>
                <LuFileSpreadsheet className='text-lg' />
                Download Report
                </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTask?.map((item , index) => (
            <TaskCard
              key = {item._id}
              title = {item.title}
              description = {item.description}
              priority = {item.priority}
              status = {item.status}
              progress = {item.progress}
              createdAt = {item.createdAt}
              dueDate = {item.dueDate}
              assignedTo = {item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount = {item.attachments?.length || 0}
              completedTodoCount = {item.completedTodoCount || 0}
              todoChecklist = {item.todoChecklist || []}
              onClick ={() => {
                handleClick(item)
              }}
              onDelete={() => handleDeleteTask(item._id)}
              />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageTask