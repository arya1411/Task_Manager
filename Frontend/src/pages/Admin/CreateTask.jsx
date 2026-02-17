import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  // Fetch existing task data when editing
  const getTaskById = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        const task = response.data;
        setCurrentTask(task);
        
        // Format date for input field (YYYY-MM-DD)
        const formattedDate = task.dueDate 
          ? new Date(task.dueDate).toISOString().split('T')[0] 
          : null;
        
        // Extract todo texts from checklist
        const todoTexts = task.todoChecklist?.map(item => 
          typeof item === 'string' ? item : item.text
        ) || [];
        
        // Extract user IDs from assignedTo (could be objects or IDs)
        const assignedUserIds = task.assignedTo?.map(user => 
          typeof user === 'string' ? user : user._id
        ) || [];
        
        setTaskData({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "Low",
          dueDate: formattedDate,
          assignedTo: assignedUserIds,
          todoChecklist: todoTexts,
          attachments: task.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      setError("Failed to load task details");
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskById();
    }
  }, [taskId]);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post(API_PATH.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      
      clearData();
      setLoading(false);
      navigate('/admin/tasks');
    } catch (error) {
      console.error("Error in Creating Task", error);
      setError("Failed to create task");
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: typeof item === 'string' ? item : item.text,
        completed: false,
      }));

      await axiosInstance.put(API_PATH.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      
      setLoading(false);
      navigate('/admin/tasks');
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATH.TASKS.DELETE_TASK(taskId));
      navigate('/admin/tasks');
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const handleSumbit = async () => {
    setError(null);

    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!taskData.dueDate) {
      setError("Due Date is required");
      return;
    }

    if (taskData.assignedTo.length === 0) {
      setError("Task must be assigned to at least one member");
      return;
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("You need to add at least one todo item");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
              {taskId ? "Update Task" : "Create Task"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
              {taskId ? "Modify task details below" : "Fill in the details to create a new task"}
            </p>
          </div>
          {taskId && (
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-rose-500 bg-rose-50 dark:bg-rose-900/30 rounded-lg px-3 py-1.5 border border-rose-100 dark:border-rose-800 hover:border-rose-300 transition"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  deleteTask();
                }
              }}
            >
              <LuTrash2 className="text-base" /> Delete
            </button>
          )}
        </div>

        {/* Form Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-3">
                {/* Task Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Task Title
                  </label>
                  <input
                    placeholder="Create App UI"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                    value={taskData.title}
                    onChange={({ target }) => handleValueChange("title", target.value)}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the task..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm resize-none placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
                    rows={3}
                    value={taskData.description}
                    onChange={({ target }) => handleValueChange("description", target.value)}
                  />
                </div>

                {/* Priority, Due Date & Assign To */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                      Priority
                    </label>
                    <SelectDropDown
                      option={PRIORITY_DATA}
                      value={taskData?.priority}
                      onChange={(value) => handleValueChange("priority", value)}
                      placeholder="Select"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                      value={taskData.dueDate ?? ""}
                      onChange={({ target }) => handleValueChange("dueDate", target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                      Assign To
                    </label>
                    <SelectUser
                      selectedUsers={taskData.assignedTo}
                      setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {/* Todo Checklist */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Todo Checklist
                  </label>
                  <TodoListInput
                    todoList={taskData?.todoChecklist}
                    setTodoList={(value) => handleValueChange("todoChecklist", value)}
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Attachments
                  </label>
                  <AddAttachmentsInput
                    attachments={taskData?.attachments}
                    setAttachments={(value) => handleValueChange("attachments", value)}
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium px-4 py-2 rounded-lg mt-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-100 dark:border-dark-border">
              <button
                className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition disabled:opacity-50 text-sm"
                onClick={handleSumbit}
                disabled={loading}
              >
                {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask