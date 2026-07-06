import React from 'react';

function MetricCard({ title, count, change, bgColor, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">{count}</h3>
        <p className="text-xs text-gray-400 mt-2 font-medium">{change}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg ${bgColor} bg-opacity-10 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}

export default MetricCard;