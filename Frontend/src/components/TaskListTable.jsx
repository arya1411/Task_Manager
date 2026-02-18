import React from 'react'
import moment from 'moment'

// Get due date status info
const getDueDateInfo = (dueDate, status) => {
    if (!dueDate || status === "Completed") {
        return { label: null, style: "text-gray-700 dark:text-dark-text-secondary" };
    }

    const now = new Date();
    const due = new Date(dueDate);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const diffTime = dueDay - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { label: "Overdue", style: "text-rose-600", badgeStyle: "bg-rose-100 text-rose-600" };
    } else if (diffDays === 0) {
        return { label: "Today", style: "text-amber-600", badgeStyle: "bg-amber-100 text-amber-600" };
    } else if (diffDays === 1) {
        return { label: "Tomorrow", style: "text-orange-500", badgeStyle: "bg-orange-100 text-orange-600" };
    } else if (diffDays <= 3) {
        return { label: "Soon", style: "text-yellow-600", badgeStyle: "bg-yellow-100 text-yellow-600" };
    }
    return { label: null, style: "text-gray-700 dark:text-dark-text-secondary" };
};

const TaskListTable = ({ tableData = [] }) => {
    const getStatusBadgeColor = (status) => {
        const normalized = (status ?? '').trim().replace(/_/g, ' ').replace(/\s+/g, ' ');
        switch (normalized) {
            case 'Completed':
                return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending':
                return 'bg-purple-100 text-purple-500 border border-purple-200';
            case 'In Progress':
                return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch ((priority ?? '').trim().toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-500 border border-red-200';
            case 'medium':
                return 'bg-orange-100 text-orange-500 border border-orange-200';
            case 'low':
                return 'bg-green-100 text-green-500 border border-green-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
        <table className="min-w-full">
            <thead>
                <tr className="text-left">
                    <th className='py-3 px-4 text-gray-800 dark:text-dark-text font-medium text-[13px]'>Name</th>
                    <th className='py-3 px-4 text-gray-800 dark:text-dark-text font-medium text-[13px]'>Status</th>
                    <th className='py-3 px-4 text-gray-800 dark:text-dark-text font-medium text-[13px]'>Priority</th>
                    <th className='py-3 px-4 text-gray-800 dark:text-dark-text font-medium text-[13px] hidden md:table-cell'>Due Date</th>
                    <th className='py-3 px-4 text-gray-800 dark:text-dark-text font-medium text-[13px] hidden lg:table-cell'>Created On</th>
                </tr>
            </thead>
            <tbody>
                {tableData?.length ? (
                    tableData.map((task) => {
                        const dueDateInfo = getDueDateInfo(task?.dueDate, task?.status);
                        return (
                        <tr key={task?._id ?? task?.id} className='border-t border-gray-200 dark:border-dark-border'>
                            <td className="py-4 px-4 text-gray-700 dark:text-dark-text-secondary text-[13px] line-clamp-1 overflow-hidden">
                                {task?.title ?? 'Untitled'}
                            </td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-sm rounded inline-block ${getStatusBadgeColor(task?.status)}`}>
                                    {task?.status ?? 'N/A'}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-sm rounded inline-block ${getPriorityBadgeColor(task?.priority)}`}>
                                    {task?.priority ?? 'N/A'}
                                </span>
                            </td>
                            <td className="py-4 px-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[13px] whitespace-nowrap ${dueDateInfo.style}`}>
                                        {task?.dueDate ? moment(task.dueDate).format('Do MMM YYYY') : 'N/A'}
                                    </span>
                                    {dueDateInfo.label && (
                                        <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${dueDateInfo.badgeStyle}`}>
                                            {dueDateInfo.label}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700 dark:text-dark-text-secondary text-[13px] whitespace-nowrap hidden lg:table-cell">
                                {task?.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
                            </td>
                        </tr>
                    )})
                ) : (
                    <tr className='border-t border-gray-200 dark:border-dark-border'>
                        <td colSpan={5} className='py-6 px-4 text-gray-500 dark:text-dark-text-secondary text-sm'>
                            No tasks found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default TaskListTable