import React from 'react'
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

const InfoCard = ({icon, label, value, color, trend, trendValue}) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-dark-border p-4 md:p-5 hover:shadow-sm dark:hover:shadow-none transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={`w-8 h-8 ${color || 'bg-gray-100 dark:bg-dark-surface-2'} rounded-lg flex items-center justify-center text-gray-600 dark:text-dark-text-secondary`}>
              {icon}
            </div>
          )}
          <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text-secondary">{label}</p>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-dark-text">{value}</h3>
        
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <LuTrendingUp className="text-sm" /> : <LuTrendingDown className="text-sm" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoCard