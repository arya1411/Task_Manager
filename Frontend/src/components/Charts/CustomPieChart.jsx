import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from './CustomToolTip';

const DEFAULT_COLORS = ["#8D51FF", "#00B8DB", "#7BCE00", "#FF6B6B", "#FFA94D"]; 

const CustomPieChart = ({ data = [], colors, color, label }) => {
  const palette = (colors?.length ? colors : (color?.length ? color : DEFAULT_COLORS));
  const total = Array.isArray(data) ? data.reduce((sum, item) => sum + (Number(item?.count) || 0), 0) : 0;
  const first = Array.isArray(data) ? data[0] : undefined;
  const nameKey = first?.name != null ? 'name' : (first?.status != null ? 'status' : (first?.priority != null ? 'priority' : 'name'));

  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        {label ? (
          <text x="50%" y={18} textAnchor="middle" dominantBaseline="middle" className="recharts-text recharts-label">
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
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    
  )
}

export default CustomPieChart