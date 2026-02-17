import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from '../../context/ThemeContext';

const CustomBarChart = ({ data = [] }) => {
  const { isDarkMode } = useTheme();
  const axisColor = isDarkMode ? '#94a3b8' : '#555';

  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low':
        return '#00BC7D';
      case 'Medium':
        return '#FE9900';
      case 'High':
        return '#FF1F57';
      default:
        return '#00BC7D';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-dark-surface shadow-md rounded-lg p-2 border border-gray-300 dark:border-dark-border">
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-400 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
            Count: <span className="font-medium">{payload[0].payload.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    
    <div className="bg-white dark:bg-dark-surface mt-6 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: axisColor }}
            stroke="none"
          />

          <YAxis
            tick={{ fontSize: 12, fill: axisColor }}
            stroke="none"
          />

          <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
