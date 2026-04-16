import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function RatingDisplay({ average, total, distribution }) {
  const { isDarkMode } = useTheme();

  if (!average && !total) {
    return (
      <div className={`text-center py-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>No ratings yet</p>
      </div>
    );
  }

  const getStarColor = (star) => {
    if (star <= average) return 'text-yellow-400';
    return isDarkMode ? 'text-gray-600' : 'text-gray-300';
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-2xl ${getStarColor(star)}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderDistributionBar = (stars, count) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div key={stars} className="flex items-center gap-2">
        <span className={`text-sm font-medium w-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {stars}★
        </span>
        <div className={`flex-1 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
          <div
            className="h-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-xs w-8 text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {count}
        </span>
      </div>
    );
  };

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Overall Rating
      </h3>

      {/* Average Rating Display */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <p className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {average ? average.toFixed(1) : 'N/A'}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            out of 5
          </p>
        </div>
        
        <div className="flex-1">
          {renderStars()}
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Based on {total} {total === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Distribution */}
      {distribution && total > 0 && (
        <div className="space-y-2">
          <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Rating Distribution
          </p>
          {[5, 4, 3, 2, 1].map((star) => renderDistributionBar(star, distribution[star] || 0))}
        </div>
      )}
    </div>
  );
}
