import React, { useEffect, useState, useMemo } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { LuFile, LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/layout/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
import SortDropdown from '../../components/Inputs/SortDropdown';

const SORT_OPTIONS = [
  { value: 'dueDate-asc', label: 'Due Date (Earliest)' },
  { value: 'dueDate-desc', label: 'Due Date (Latest)' },
  { value: 'priority-desc', label: 'Priority (High to Low)' },
  { value: 'priority-asc', label: 'Priority (Low to High)' },
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'status-asc', label: 'Status (Pending → Completed)' },
];

const PRIORITY_ORDER = { High: 3, Medium: 2, Low: 1 };
const STATUS_ORDER = { Pending: 1, 'In Progress': 2, Completed: 3 };
const ManageTask = () => {

  const [allTask , setAllTask]  = useState([]);

  const [tabs , setTabs] = useState([]);

  const [filterStatus , setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState('dueDate-asc');

  // Sort tasks based on selected option
  const sortedTasks = useMemo(() => {
    if (!allTask.length) return [];
    
    const [field, order] = sortBy.split('-');
    const sorted = [...allTask].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'dueDate':
          const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
          const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
          comparison = dateA - dateB;
          break;
        case 'priority':
          comparison = (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'status':
          comparison = (STATUS_ORDER[a.status] || 0) - (STATUS_ORDER[b.status] || 0);
          break;
        default:
          comparison = 0;
      }
      
      return order === 'desc' ? -comparison : comparison;
    });
    
    return sorted;
  }, [allTask, sortBy]);

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

   const handleDownloadReport =  async () => {
    try {
      const response = await axiosInstance.get(API_PATH.REPORTS.EXPORT_TASKS, {
        responseType : "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("Download" , "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url); 
    } catch(error){
      console.error("Error Downloading User Details", error);
    }
  }

  useEffect(() => {
    getAllTask(filterStatus);
    return () => {};
   } , [filterStatus])

  return (
    <DashboardLayout activeMenu="Manage Task">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Manage Tasks</h1>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">View and manage all your tasks</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
              options={SORT_OPTIONS}
            />
            <button 
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-lg hover:bg-gray-50 dark:hover:bg-dark-surface-2 transition text-sm font-medium"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              <span className="hidden sm:inline">Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <TaskStatusTabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sortedTasks?.length > 0 ? (
          sortedTasks.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((user) => user.name)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item)}
              onDelete={() => handleDeleteTask(item._id)}
            />
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-12 text-center">
            <LuFile className="w-12 h-12 text-gray-300 dark:text-dark-text-secondary mx-auto mb-3" />
            <h3 className="text-gray-500 dark:text-dark-text-secondary font-medium">No tasks found</h3>
            <p className="text-gray-400 dark:text-dark-text-secondary text-sm mt-1">Create a new task to get started</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ManageTask