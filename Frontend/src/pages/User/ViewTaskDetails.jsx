import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { LuArrowLeft, LuCalendar, LuClock, LuUsers, LuPaperclip, LuCheck } from 'react-icons/lu';
import moment from 'moment';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATH.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoCheckList = async (index) => {
    if (!task) return;

    const updatedChecklist = task.todoChecklist.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    // Optimistic update
    const completedCount = updatedChecklist.filter(item => item.completed).length;
    const totalItems = updatedChecklist.length;
    const newProgress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    setTask(prev => ({
      ...prev,
      todoChecklist: updatedChecklist,
      progress: newProgress
    }));

    try {
      const response = await axiosInstance.put(
        API_PATH.TASKS.UPDATE_TODO_CHEKCLIST(id),
        { todoChecklist: updatedChecklist }
      );
      if (response.data?.task) {
        setTask(response.data.task);
      }
    } catch (error) {
      console.error("Error updating checklist:", error);
      // Revert on error
      getTaskDetailsById();
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-dark-text-secondary">Task not found</p>
          <button
            onClick={() => navigate('/user/tasks')}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Go back to tasks
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const completedCount = task.todoChecklist?.filter(item => item.completed).length || 0;
  const totalTodos = task.todoChecklist?.length || 0;

  return (
    <DashboardLayout activeMenu="My Tasks">
      {/* Back Button */}
      <button
        onClick={() => navigate('/user/tasks')}
        className="flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors"
      >
        <LuArrowLeft className="text-lg" />
        <span>Back to Tasks</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Header */}
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-100 dark:border-dark-border">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getStatusTagColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority} Priority
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text mb-3">
              {task.title}
            </h1>
            <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
              {task.description || "No description provided"}
            </p>
          </div>

          {/* Todo Checklist */}
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                Task Checklist
              </h2>
              <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                {completedCount} of {totalTodos} completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text">Progress</span>
                <span className="text-sm font-semibold text-purple-600">{task.progress || 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 dark:bg-dark-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${task.progress || 0}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            {task.todoChecklist && task.todoChecklist.length > 0 ? (
              <div className="space-y-3">
                {task.todoChecklist.map((item, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      item.completed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-dark-surface-2 border-gray-100 dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => updateTodoCheckList(index)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        item.completed
                          ? 'text-gray-500 dark:text-dark-text-secondary line-through'
                          : 'text-gray-700 dark:text-dark-text'
                      }`}
                    >
                      {item.text}
                    </span>
                    {item.completed && (
                      <LuCheck className="text-green-500 text-lg shrink-0" />
                    )}
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 dark:text-dark-text-secondary">No checklist items</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Info */}
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-100 dark:border-dark-border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Task Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                  <LuCalendar className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Due Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {task.dueDate ? moment(task.dueDate).format("MMM DD, YYYY") : "No due date"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <LuClock className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Created</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {task.createdAt ? moment(task.createdAt).format("MMM DD, YYYY") : "N/A"}
                  </p>
                </div>
              </div>

              {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                    <LuPaperclip className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Attachments</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                      {task.attachments.length} file(s)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assigned Users */}
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <LuUsers className="text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Assigned To</h3>
              </div>
              <div className="space-y-3">
                {task.assignedTo.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          {user.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails