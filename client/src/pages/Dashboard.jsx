import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Please login first</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600">Role: <span className="font-semibold text-blue-600 capitalize">{user.role}</span></p>
        </div>

        {/* User Dashboard */}
        {user.role === 'user' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/search-maids" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-blue-600">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Maids</h2>
              <p className="text-gray-600">Search and book verified maids for your needs</p>
              <div className="mt-4 text-blue-600 font-semibold">Browse now →</div>
            </Link>
            <Link to="/booking-history" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-green-600">
              <div className="text-4xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking History</h2>
              <p className="text-gray-600">View and manage your bookings</p>
              <div className="mt-4 text-green-600 font-semibold">View history →</div>
            </Link>
          </div>
        )}

        {/* Maid Dashboard */}
        {user.role === 'maid' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/booking-requests" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-yellow-600">
              <div className="text-4xl mb-4">📅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Requests</h2>
              <p className="text-gray-600">Accept or reject booking requests</p>
              <div className="mt-4 text-yellow-600 font-semibold">View requests →</div>
            </Link>
            <Link to="/work-schedule" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-purple-600">
              <div className="text-4xl mb-4">📈</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Schedule</h2>
              <p className="text-gray-600">Check your upcoming work schedule</p>
              <div className="mt-4 text-purple-600 font-semibold">View schedule →</div>
            </Link>
            <Link to="/profile" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-pink-600">
              <div className="text-4xl mb-4">💼</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
              <p className="text-gray-600">Update your skills and availability</p>
              <div className="mt-4 text-pink-600 font-semibold">Edit profile →</div>
            </Link>
          </div>
        )}

        {/* Admin Dashboard */}
        {user.role === 'admin' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/manage-users" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-blue-600">
              <div className="text-4xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Users</h2>
              <p className="text-gray-600">View and manage all users</p>
              <div className="mt-4 text-blue-600 font-semibold">Go to users →</div>
            </Link>
            <Link to="/manage-maids" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-green-600">
              <div className="text-4xl mb-4">🛱</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Maids</h2>
              <p className="text-gray-600">Verify and manage maids</p>
              <div className="mt-4 text-green-600 font-semibold">Go to maids →</div>
            </Link>
            <Link to="/manage-bookings" className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-purple-600">
              <div className="text-4xl mb-4">📆</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Bookings</h2>
              <p className="text-gray-600">Review all bookings</p>
              <div className="mt-4 text-purple-600 font-semibold">Go to bookings →</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;