import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { LuFileSpreadsheet, LuUsers } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';

const ManageUser = () => {
  const [allUser, setAllUsers] = useState([]);

  const getAllUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error Fetching User:", error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("Download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error Downloading User Details", error);
    }
  };

  useEffect(() => {
    getAllUser();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Team Members</h1>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Manage your team members</p>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-lg hover:bg-gray-50 dark:hover:bg-dark-surface-2 transition text-sm font-medium"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {allUser?.length > 0 ? (
          allUser.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-12 text-center">
            <LuUsers className="w-12 h-12 text-gray-300 dark:text-dark-text-secondary mx-auto mb-3" />
            <h3 className="text-gray-500 dark:text-dark-text-secondary font-medium">No team members found</h3>
            <p className="text-gray-400 dark:text-dark-text-secondary text-sm mt-1">Invite members to your team</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUser;