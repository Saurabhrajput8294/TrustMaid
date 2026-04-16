import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function ReviewForm({ bookingId, maidId, onSubmit, onCancel }) {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!title.trim()) {
      setError('Please add a review title');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/reviews', {
        bookingId,
        maidId,
        rating,
        title,
        comment
      });
      
      if (onSubmit) {
        onSubmit(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-all ${
                  star <= rating ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                } hover:scale-110`}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {rating} out of 5 stars
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Review Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Amazing service!"
            maxLength={100}
            className={`w-full px-4 py-2 rounded-lg border outline-none transition ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {title.length}/100 characters
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Your Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this maid's service..."
            rows="4"
            maxLength={500}
            className={`w-full px-4 py-2 rounded-lg border outline-none transition resize-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {comment.length}/500 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
