import React from 'react'
import Progress from '../Progress';
import { LuTrash2, LuCalendar, LuPaperclip, LuUsers } from 'react-icons/lu';

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const AVATAR_COLORS = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-pink-500',
];

const getInitials = (name) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const getColorFromName = (name) => {
    if (!name) return AVATAR_COLORS[0];
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};

const TaskCard = ({
  todoChecklist,
  attachmentCount,
  completedTodoCount,
  assignedTo,
  dueDate,
  createdAt,
  progress,
  status,
  priority,
  description,
  title,
  onClick,
  onDelete
}) => {

    const getStatusStyle = () => {
        switch(status) {
            case "In Progress":
                return "text-blue-600 bg-blue-50";
            case "Completed":
                return "text-green-600 bg-green-50";
            default:
                return "text-orange-600 bg-orange-50";
        }
    };

    const getPriorityStyle = () => {
        switch(priority) {
            case "Low":
                return "text-emerald-600 bg-emerald-50";
            case "Medium":
                return "text-amber-600 bg-amber-50";
            case "High":
                return "text-rose-600 bg-rose-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getProgressColor = () => {
        switch(status) {
            case "In Progress":
                return "bg-blue-500";
            case "Completed":
                return "bg-green-500";
            default:
                return "bg-orange-500";
        }
    };

    return (
        <div 
            className="bg-white dark:bg-dark-surface rounded-xl p-5 border border-gray-100 dark:border-dark-border hover:shadow-md dark:hover:shadow-none hover:border-gray-200 dark:hover:border-dark-surface-2 transition-all duration-200 cursor-pointer group"
            onClick={onClick}
        >
            {/* Header with status and priority */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle()}`}>
                        {status}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityStyle()}`}>
                        {priority}
                    </span>
                </div>
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-1.5 text-gray-400 dark:text-dark-text-secondary hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Task"
                    >
                        <LuTrash2 size={16} />
                    </button>
                )}
            </div>

            {/* Title and Description */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text line-clamp-2 mb-2">
                {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary line-clamp-2 mb-4">
                {description}
            </p>

            {/* Progress Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500 dark:text-dark-text-secondary">Progress</span>
                    <span className="font-medium text-gray-700 dark:text-dark-text">{progress || 0}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-dark-surface-2 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all ${getProgressColor()}`}
                        style={{ width: `${progress || 0}%` }}
                    />
                </div>
            </div>

            {/* Task Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-dark-text-secondary mb-3">
                <span>Tasks: {completedTodoCount}/{todoChecklist?.length || 0}</span>
                {attachmentCount > 0 && (
                    <span className="flex items-center gap-1">
                        <LuPaperclip size={12} />
                        {attachmentCount}
                    </span>
                )}
            </div>

            {/* Date Info */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-dark-text-secondary">
                    <LuCalendar size={12} />
                    <span>{formatDate(createdAt)}</span>
                </div>
                <div className={`text-xs font-medium ${
                    dueDate && new Date(dueDate) < new Date() && status !== "Completed" 
                        ? "text-rose-500" 
                        : "text-gray-600 dark:text-dark-text-secondary"
                }`}>
                    Due: {formatDate(dueDate)}
                </div>
            </div>

            {/* Assigned Users */}
            {assignedTo && assignedTo.length > 0 && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <LuUsers size={12} className="text-gray-400 dark:text-dark-text-secondary" />
                    <div className="flex -space-x-1.5">
                        {assignedTo.slice(0, 3).map((name, idx) => (
                            <div
                                key={idx}
                                className={`w-6 h-6 rounded-full ${getColorFromName(name)} flex items-center justify-center text-[9px] font-semibold text-white border-2 border-white dark:border-dark-surface`}
                                title={name}
                            >
                                {getInitials(name)}
                            </div>
                        ))}
                        {assignedTo.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-surface-2 border-2 border-white dark:border-dark-surface flex items-center justify-center text-[9px] font-semibold text-gray-600 dark:text-dark-text-secondary">
                                +{assignedTo.length - 3}
                            </div>
                        )}
                    </div>
                    {assignedTo.length === 1 && (
                        <span className="text-xs text-gray-500 dark:text-dark-text-secondary truncate max-w-[100px]">{assignedTo[0]}</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default TaskCard