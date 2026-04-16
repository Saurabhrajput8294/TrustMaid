import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4">
            <span className="text-3xl">💼</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">TrustMaid</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome Back</h2>
            <p className="text-gray-500 mt-2 font-medium">Sign in to your TrustMaid account</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 animate-shake">
              <span className="text-xl mt-0.5">⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">📧 Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            {/* Password field with show/hide */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">🔐 Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember me & forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <span className="text-gray-600 font-medium">Remember me</span>
              </label>
              <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  🚀 Sign In
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

          {/* Sign up link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:text-indigo-600 hover:underline transition">
              Create one now
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              ✨ Welcome to TrustMaid - Book verified professionals instantly
            </p>
          </div>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center text-white text-sm mt-6 opacity-80">
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;