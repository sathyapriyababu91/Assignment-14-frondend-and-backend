import React from 'react';

// Icons-க்காக மிக எளிய SVG-களை கார்டுகளுக்குள் நேரடியாகப் பயன்படுத்தலாம்
function Dashboard({ customerCount = 1248 }) {
  
  const stats = [
    { 
      id: 1, 
      title: 'Total Customers', 
      count: customerCount, // கஸ்டமர்ஸ் லிஸ்ட்டில் இருந்து டைனமிக்காக வரக்கூடியது
      change: '+12% this month', 
      bgColor: 'bg-blue-500',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: 'Active Leads', 
      count: '84', 
      change: '5 waiting response', 
      bgColor: 'bg-amber-500',
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: 'Resolved Tickets', 
      count: '412', 
      change: '98% success rate', 
      bgColor: 'bg-emerald-500',
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 p-6 rounded-xl shadow-md text-white">
        <h2 className="text-3xl font-bold mb-1">Welcome Back, Sathya!</h2>
        <p className="text-indigo-200 text-sm">Here is what's happening with your CRM analytics today.</p>
      </div>

      {/* Stats Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{item.count}</h3>
              <p className="text-xs text-gray-400 mt-2 font-medium">{item.change}</p>
            </div>
            {/* Icons background opacity-25 ஆக மாற்றப்பட்டு ஐகான் உள்ளே வைக்கப்பட்டுள்ளது */}
            <div className={`w-12 h-12 rounded-lg ${item.bgColor} bg-opacity-10 flex items-center justify-center`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent System Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg border border-gray-100/50 hover:bg-gray-100/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="font-semibold text-gray-700">New customer account created</span>
            </div>
            <span className="text-xs text-gray-400">2 mins ago</span>
          </div>
          <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg border border-gray-100/50 hover:bg-gray-100/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-gray-700">Support ticket #2041 closed</span>
            </div>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;