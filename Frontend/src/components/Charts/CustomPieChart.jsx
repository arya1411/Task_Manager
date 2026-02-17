import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useTheme } from '../../context/ThemeContext';

const DEFAULT_COLORS = ["#8D51FF", "#00B8DB", "#7BCE00", "#FF6B6B", "#FFA94D"]; 

const CustomPieChart = ({ data = [], colors, color, label }) => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? '#f1f5f9' : '#374151';
  const legendColor = isDarkMode ? '#94a3b8' : '#555';
  
  const palette = (colors?.length ? colors : (color?.length ? color : DEFAULT_COLORS));
  const total = Array.isArray(data) ? data.reduce((sum, item) => sum + (Number(item?.count) || 0), 0) : 0;
  const first = Array.isArray(data) ? data[0] : undefined;
  const nameKey = first?.name != null ? 'name' : (first?.status != null ? 'status' : (first?.priority != null ? 'priority' : 'name'));

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-4 mt-4 flex-wrap">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        {label ? (
          <text x="50%" y={18} textAnchor="middle" dominantBaseline="middle" fill={textColor} className="text-sm font-medium">
            {label}
          </text>
        ) : null}

        {total > 0 ? (
          <Pie
            data={data}
            dataKey="count"
            nameKey={nameKey}
            cx='50%'
            cy='55%'
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))}
          </Pie>
        ) : (
          <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF">
            No chart data
          </text>
        )}

        <Tooltip />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
    
  )
}

export default CustomPieChart