import React from 'react'

const TaskStatusTabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg border border-gray-100 dark:border-dark-border p-1 inline-flex items-center gap-1">
      {tabs.map((tab) => (
        <button 
          key={tab.label}
          className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === tab.label
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface-2'
          }`} 
          onClick={() => setActiveTab(tab.label)}
        >
          <span>{tab.label}</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.label 
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 dark:bg-dark-surface-2 text-gray-600 dark:text-dark-text-secondary'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}

export default TaskStatusTabs