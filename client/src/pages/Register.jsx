import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', confirmPassword: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4">
            <span className="text-3xl">💼</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">TrustMaid</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Join TrustMaid</h2>
            <p className="text-gray-500 mt-2 font-medium">Create your account and get started</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 animate-shake">
              <span className="text-xl mt-0.5">⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">👤 Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            {/* Email field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">📧 Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            {/* Address field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">📍 Address</label>
              <input
                type="text"
                placeholder="123 Main St, City, State"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Role selection with cards */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">🎯 What's your role?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'user' })}
                  className={`p-3 rounded-xl border-2 transition duration-200 text-center font-medium ${
                    form.role === 'user'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  👨‍💼 Customer
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'maid' })}
                  className={`p-3 rounded-xl border-2 transition duration-200 text-center font-medium ${
                    form.role === 'maid'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  👩‍💼 Professional
                </button>
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">🔐 Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            {/* Confirm Password field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">✓ Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer py-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 mt-1" required />
              <span className="text-sm text-gray-600">
                I agree to the <span className="font-semibold text-purple-600">Terms & Conditions</span> and{' '}
                <span className="font-semibold text-purple-600">Privacy Policy</span>
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  🚀 Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-bold hover:text-indigo-600 hover:underline transition">
              Sign in here
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              ✨ Quick & secure registration • Free to join
            </p>
          </div>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center text-white text-sm mt-6 opacity-80">
          Join thousands of satisfied users on TrustMaid
        </p>
      </div>
    </div>
  );
};

export default Register;