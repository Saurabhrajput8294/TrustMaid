import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', count: '1,234', icon: '👥', color: 'from-blue-400 to-blue-600' },
    { title: 'Active Maids', count: '456', icon: '👩‍🍳', color: 'from-green-400 to-green-600' },
    { title: 'Total Bookings', count: '789', icon: '📅', color: 'from-purple-400 to-purple-600' },
    { title: 'Completed', count: '567', icon: '✓', color: 'from-yellow-400 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-md p-6 text-white`}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-white text-opacity-80 text-sm">{stat.title}</p>
              <p className="text-3xl font-bold mt-2">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Manage Options */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/manage-users" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-blue-600 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">👥</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Users</h2>
            <p className="text-gray-600 mb-4">View and manage all users</p>
            <div className="text-blue-600 font-semibold">Go →</div>
          </Link>
          <Link to="/manage-maids" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-green-600 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">👩‍🍳</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Maids</h2>
            <p className="text-gray-600 mb-4">Verify and manage maids</p>
            <div className="text-green-600 font-semibold">Go →</div>
          </Link>
          <Link to="/manage-bookings" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-purple-600 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">📅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Bookings</h2>
            <p className="text-gray-600 mb-4">Review all bookings</p>
            <div className="text-purple-600 font-semibold">Go →</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;