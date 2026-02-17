import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContenxt';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import moment from "moment";
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { MdTaskAlt } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";
import { MdAutorenew } from "react-icons/md";
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';


const COLORS = ["#8D51FF","#00B8DB","#7BCE00"];

const Dashboard = () => {
useUserAuth();

const {user} = useContext(UserContext);

const navigate = useNavigate();

const [dashboardData , setDashboardData ]  = useState(null);
const [pieChartData , setPieChartData ] = useState([]);
const [barChartData  , setBarChartData]  =  useState([]);

const prepareChartData = (data) => {
  const taskDistribution = data?.taskDistribution || null ;
  const taskPriorityLevels = data?.taskPriorityLevels || null ;

  const taskDistributionData = [
    {status : "Pending" , count : taskDistribution?.Pending || 0 },
    {status : "In Progress" , count : taskDistribution?.In_Progress || 0},
    {status : "Completed" , count : taskDistribution?.Completed || 0},
  ];
  setPieChartData(taskDistributionData);

  const PriortityLevelData = [
    {priority : "Low" , count : taskPriorityLevels?.Low || 0},
    {priority : "Medium" , count : taskPriorityLevels?.Medium || 0},
    {priority : "High" , count : taskPriorityLevels?.High || 0},
  ];

  setBarChartData(PriortityLevelData);
}
const getdashboardData = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATH.TASKS.GET_DASHBOARD_DATA
    );
    if(response.data){
      setDashboardData(response.data);
      prepareChartData(response.data?.charts)
    }
  } catch (error) {
    console.error("Error Fetching User" , error);
  }
};

const onSeeMore = () => {
  navigate('/admin/tasks');
}
useEffect(() => {
  getdashboardData();
}, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
          {moment().format("dddd, MMMM Do YYYY")}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-6">
        <InfoCard
          icon={<MdTaskAlt className="text-lg" />}
          label="Total Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color="bg-blue-50 dark:bg-blue-900/30"
          trend="up"
          trendValue="2.5%"
        />

        <InfoCard
          icon={<MdPendingActions className="text-lg" />}
          label="Pending"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Pending || 0
          )}
          color="bg-orange-50 dark:bg-orange-900/30"
          trend="down"
          trendValue="0.2%"
        />

        <InfoCard
          icon={<BsCheck2Square className="text-lg" />}
          label="Completed"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Completed || 0
          )}
          color="bg-green-50 dark:bg-green-900/30"
          trend="up"
          trendValue="0.5%"
        />

        <InfoCard
          icon={<MdAutorenew className="text-lg" />}
          label="In Progress"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.In_Progress || 0
          )}
          color="bg-purple-50 dark:bg-purple-900/30"
          trend="up"
          trendValue="0.12%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Task Distribution Chart */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-semibold text-gray-900 dark:text-dark-text">Task Distribution</h5>
          </div>
          <CustomPieChart
            data={pieChartData}
            label="Total Tasks"
            colors={COLORS}
          />
        </div>

        {/* Priority Levels Chart */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-semibold text-gray-900 dark:text-dark-text">Task Priority Levels</h5>
          </div>
          <CustomBarChart data={barChartData} />
        </div>
      </div>

      {/* Recent Tasks Table */}
      <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-5 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-semibold text-gray-900 dark:text-dark-text">Recent Tasks</h5>
          <button
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition"
            onClick={onSeeMore}
          >
            See All <LuArrowRight className="text-base" />
          </button>
        </div>
        <TaskListTable tableData={dashboardData?.recentTask || []} />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard