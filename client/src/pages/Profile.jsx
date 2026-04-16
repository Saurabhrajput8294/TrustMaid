import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [maidStats, setMaidStats] = useState(null);
  const [userAddress, setUserAddress] = useState(user?.address || '');
  const [maidAddress, setMaidAddress] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (user) {
      setUserAddress(user.address || '');
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        address: user.address || ''
      });
      if (user.role === 'maid') {
        fetchMaidProfile();
      }
    }
  }, [user]);

  const fetchMaidProfile = async () => {
    try {
      const response = await api.get('/maids');
      const maidData = response.data.find(m => m.userId === user.id);
      if (maidData) {
        setSkills(Array.isArray(maidData.skills) ? maidData.skills : []);
        setMaidAddress(maidData.address || '');
        setMaidStats({
          rating: maidData.rating || 0,
          totalReviews: maidData.totalReviews || 0,
          completedBookings: maidData.completedBookings || 0,
          hourlyRate: maidData.hourlyRate || 'Not set',
          address: maidData.address || ''
        });
      }
    } catch (err) {
      console.error('Error fetching maid profile:', err);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSaveSkills = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.put(`/maids/availability/${user.id}`, {
        skills: skills,
        experience: user.experience || 0,
        availability: user.availability || true,
        address: maidAddress
      });
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUserProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await api.put('/users/profile', profileForm);
      updateUser(response.data);
      setUserAddress(response.data.address || '');
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800 mb-2">Access Denied</p>
        <p className="text-lg text-gray-600">Please login to view your profile</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-xl border border-white/70">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Hello, {user.name}!</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            This is your profile dashboard. Review your account details, edit your settings, and manage your booking preferences from one place.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 shadow-sm">
            <span className="text-2xl">✓</span>
            <p className="font-semibold">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 shadow-sm">
            <span className="text-2xl">✕</span>
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner with gradient */}
          <div className="h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Header Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-8 relative z-10">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-4 border-white flex items-center justify-center text-6xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {user.role === 'maid' ? '✨' : '👤'}
                </div>
              </div>

              {/* Profile Name and Action */}
              <div className="flex-1 text-center sm:text-left mb-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-700 mb-2 break-words">
                  {user.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full font-bold text-sm capitalize shadow-sm">
                    {user.role === 'maid' ? '🏠 Professional Maid' : '👥 Client'}
                  </span>
                  {user.role === 'maid' && user.availability && (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Available Now
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-bold flex items-center gap-2 hover:scale-105"
              >
                {isEditing ? (
                  <>
                    <span>✕</span> Cancel
                  </>
                ) : (
                  <>
                    <span>✏️</span> Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Contact Information Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-100">
              {/* Email */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <p className="text-gray-900 font-medium break-all">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
                    <p className="text-gray-900 font-medium break-words">
                      {userAddress || 'Address not provided yet'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Info */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <p className="text-gray-900 font-medium">
                      {user.availability !== undefined
                        ? user.availability
                          ? 'Active & Available'
                          : 'Inactive'
                        : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maid-specific Section */}
            {user.role === 'maid' && (
              <>
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🏠</div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Address</label>
                        <p className="text-gray-900 font-medium break-words">
                          {maidAddress || 'No service address set yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Cards */}
                {maidStats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {/* Rating */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-orange-600">{maidStats.rating.toFixed(1)}</div>
                      <p className="text-sm font-semibold text-gray-700 mt-1">⭐ Rating</p>
                    </div>

                    {/* Reviews */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-blue-600">{maidStats.totalReviews}</div>
                      <p className="text-sm font-semibold text-gray-700 mt-1">📝 Reviews</p>
                    </div>

                    {/* Completed Bookings */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-green-600">{maidStats.completedBookings}</div>
                      <p className="text-sm font-semibold text-gray-700 mt-1">✓ Jobs Done</p>
                    </div>

                    {/* Rate */}
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-pink-600">
                        {typeof maidStats.hourlyRate === 'number' ? `$${maidStats.hourlyRate}` : maidStats.hourlyRate}
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mt-1">💰 Hourly</p>
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <span>🎓</span> Professional Skills
                    </h2>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                      {/* Skills List */}
                      {skills.length > 0 && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Your Skills</label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map((skill, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                              >
                                <span>✓ {skill}</span>
                                <button
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-1 text-white hover:text-red-200 font-bold text-lg"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Skill Input */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Add New Skill</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddSkill();
                              }
                            }}
                            placeholder="e.g., Deep Cleaning, Kitchen Cleaning, Laundry"
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          />
                          <button
                            onClick={handleAddSkill}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-bold"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Service Address Input */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Service Address</label>
                        <input
                          type="text"
                          value={maidAddress}
                          onChange={(e) => setMaidAddress(e.target.value)}
                          placeholder="e.g., 123 Service Lane, City, State"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={handleSaveSkills}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {loading ? '⏳ Saving...' : '✓ Save Changes'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-5 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                          <p className="text-gray-600 font-semibold">📚 No skills added yet</p>
                          <p className="text-gray-500 text-sm mt-1">Click "Edit Profile" to add your professional skills</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* User-specific Info */}
            {user.role === 'user' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>📋</span> Account Information
                </h2>
                {isEditing ? (
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="123 Main St, City, State"
                      />
                    </div>

                    <button
                      onClick={handleSaveUserProfile}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? '⏳ Saving...' : '✓ Save Profile'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                      <p className="text-gray-700">
                        Welcome to TrustMaid! Your account is active and you can browse and book professional home services anytime.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Name</h3>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Email</h3>
                        <p className="text-gray-900 font-medium break-all">{user.email}</p>
                      </div>
                      <div className="sm:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Home Address</h3>
                        <p className="text-gray-900 font-medium break-words">{userAddress || 'No address set yet'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;