import React from 'react'
import Progress from '../Progress';
import { LuTrash2 } from 'react-icons/lu';

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

    const getStatusTracker = () => {
        switch(status) {
            case "In Progress" :
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "Completed" :
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            default :
                return "text-violet-500 bg-violet-50 border border-violet-500/10";

        };
    };

    const getPriorityTagColor = () => {
        switch(priority){
            case "Low" :
                return "text-emerald-500 bg-emerald-50 border border-emerald-500/10"
            
            case "Medium":
                return "text-amber-500 bg-amber-50 border border-amber-500/10";
            
            case "High" :
                return "text-rose-500 bg-rose-50 border border-rose-500/10";
 
        }
    };
  return     (
    <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer" onClick={onClick}>
        <div className="flex items-end gap-3 px-4">
            <div className={`text-[11px] font-medium ${getStatusTracker()} px-4 py-0.5 rounded`}>
            {status}
            </div>
            <div className = {`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded cursor-pointer`}>
                {priority} Priority
            </div>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="ml-auto p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                title="Delete Task"
              >
                <LuTrash2 size={16} />
              </button>
            )}
        </div>

        <div className={`px-4 border-l-[3px] ${
            status === "In Progress" ?
            "border-cyan-500" 
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}>
        <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">
            {title}
        </p>

        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">
            {description}
        </p>

        <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]">
        Task Done : {" "}
        <span className='font-semibold text-gray-700'>
            {completedTodoCount}/{todoChecklist?.length || 0}
        </span>        
        </p>
        <Progress progress={progress} status={status}></Progress>
        </div>

        <div className="px-4">
            <div className="flex items-center"></div>
        </div>
    </div>
  )
}

export default TaskCard