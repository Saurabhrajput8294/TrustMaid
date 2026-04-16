import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ReviewList({ reviews, maidId, onReviewDeleted }) {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [deleting, setDeleting] = React.useState(null);

  if (!reviews || reviews.length === 0) {
    return (
      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p className="text-lg">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    setDeleting(reviewId);
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      if (onReviewDeleted) {
        onReviewDeleted(reviewId);
      }
    } catch (err) {
      alert('Failed to delete review');
    } finally {
      setDeleting(null);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Reviews ({reviews.length})
      </h3>
      
      {reviews.map((review) => (
        <div
          key={review.id}
          className={`p-4 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {review.User?.name || 'Anonymous'}
              </p>
              <div className="flex gap-2 items-center mt-1">
                {renderStars(review.rating)}
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
            {user?.id === review.userId && (
              <button
                onClick={() => handleDeleteReview(review.id)}
                disabled={deleting === review.id}
                className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
              >
                {deleting === review.id ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>

          {/* Title */}
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {review.title}
          </h4>

          {/* Comment */}
          {review.comment && (
            <p className={`mb-3 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {review.comment}
            </p>
          )}

          {/* Verified Badge */}
          {review.verified_booking && (
            <div className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              ✓ Verified Booking
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
