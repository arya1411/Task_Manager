import React from 'react'

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 hover:shadow-md dark:hover:shadow-none hover:border-gray-200 dark:hover:border-dark-surface-2 transition-all duration-200">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userInfo?.profileImageUrl || '/default-avatar.png'}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-100 dark:border-dark-border object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate">{userInfo?.name}</p>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{userInfo?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTask || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.InprogressTask || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTask || 0}
          status="Completed"
        />
      </div>
    </div>
  )
}

export default UserCard

const StatCard = ({ label, count, status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "In Progress":
        return "bg-blue-50 text-blue-600";
      case "Completed":
        return "bg-green-50 text-green-600";
      default:
        return "bg-orange-50 text-orange-600";
    }
  };

  return (
    <div className={`${getStatusStyle()} rounded-lg p-3 text-center`}>
      <span className="block text-lg font-bold">{count}</span>
      <span className="block text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  )
}