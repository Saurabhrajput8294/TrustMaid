import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import API from '../services/api';
import ReviewList from '../components/ReviewList';
import RatingDisplay from '../components/RatingDisplay';

export default function MaidProfile() {
  const { maidId } = useParams();
  const { isDarkMode } = useTheme();
  const [maid, setMaid] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch maid data
        const maidResponse = await API.get(`/maids/${maidId}`);
        setMaid(maidResponse.data);

        // Fetch reviews
        const reviewResponse = await API.get(`/reviews/maid/${maidId}`);
        setReviews(reviewResponse.data);

        // Fetch rating data
        try {
          const ratingResponse = await API.get(`/reviews/maid/${maidId}/rating`);
          setRatingData(ratingResponse.data);
        } catch (err) {
          console.log('No rating data available');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load maid profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [maidId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading maid profile...</p>
        </div>
      </div>
    );
  }

  if (error || !maid) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{error || 'Maid not found'}</p>
          <Link to="/search-maids" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          to="/search-maids"
          className={`inline-flex items-center gap-2 mb-6 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          ← Back to Search
        </Link>

        {/* Profile Header */}
        <div className={`rounded-xl shadow-lg p-8 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl">
                👩‍💼
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {maid.user?.name || maid.User?.name || 'Professional'}
              </h1>

              {/* Rating Display */}
              {ratingData && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= (ratingData.average || 0) ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {ratingData.average ? ratingData.average.toFixed(1) : 'N/A'}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ({ratingData.total} {ratingData.total === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {maid.experience} years
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                  <p className={`text-lg font-bold ${maid.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {maid.availability ? '✓ Available' : '✗ Unavailable'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              {maid.skills && maid.skills.length > 0 && (
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {maid.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDarkMode
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Button */}
              <Link
                to={`/book/${maid.id}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Book This Professional
              </Link>
            </div>
          </div>
        </div>

        {/* Rating Distribution and Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Rating Display */}
          {ratingData && (
            <div className="md:col-span-1">
              <RatingDisplay
                average={ratingData.average}
                total={ratingData.total}
                distribution={ratingData.distribution}
              />
            </div>
          )}

          {/* Reviews List */}
          <div className={`md:col-span-${ratingData ? '2' : '3'} rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <ReviewList reviews={reviews} maidId={maidId} />
          </div>
        </div>
      </div>
    </div>
  );
}
