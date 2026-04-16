import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import RatingDisplay from '../components/RatingDisplay';
import { useTheme } from '../context/ThemeContext';

const BookingHistory = () => {
  const { isDarkMode } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const [reviewingBookingId, setReviewingBookingId] = useState(null);
  const [userReviews, setUserReviews] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get('/bookings/user');
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const { data } = await API.get('/reviews/user');
        const reviewMap = {};
        data.forEach(review => {
          reviewMap[review.bookingId] = review;
        });
        setUserReviews(reviewMap);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchUserReviews();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      await API.put(`/bookings/${bookingId}/cancel`);
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
      alert('Booking cancelled successfully.');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      const errorMessage = err.response?.data?.message || 'Failed to cancel booking. Please try again.';
      alert(errorMessage);
    } finally {
      setCancellingId(null);
      setConfirmCancelId(null);
    }
  };

  const openCancelConfirmation = (bookingId) => {
    setConfirmCancelId(bookingId);
  };

  const closeCancelConfirmation = () => {
    setConfirmCancelId(null);
  };

  const handleReviewSubmit = (review) => {
    setUserReviews({
      ...userReviews,
      [review.bookingId]: review
    });
    setReviewingBookingId(null);
    alert('Review submitted successfully!');
  };

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Bookings</h1>
          <div className="flex gap-3 flex-wrap">
            {['all', 'pending', 'accepted', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-blue-600'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className={`rounded-xl shadow-md p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No bookings found</p>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>You haven't made any {filter !== 'all' ? filter : ''} bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id} className={`rounded-xl shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{booking.service}</h3>
                    <div className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                      <p><span className="font-semibold">Time:</span> {booking.time}</p>
                      <p><span className="font-semibold">Maid ID:</span> {booking.maidId}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <span className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{new Date(booking.createdAt).toLocaleDateString()}</p>
                    
                    {booking.status === 'pending' && (
                      <div className="mt-3">
                        {(() => {
                          const bookingTime = new Date(booking.createdAt);
                          const now = new Date();
                          const hoursDiff = (now - bookingTime) / (1000 * 60 * 60);
                          const canCancel = hoursDiff <= 24;
                          
                          return (
                            <button
                              onClick={() => openCancelConfirmation(booking.id)}
                              disabled={cancellingId === booking.id || !canCancel}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                                canCancel
                                  ? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {cancellingId === booking.id 
                                ? 'Cancelling...' 
                                : !canCancel 
                                  ? 'Cannot Cancel (24h limit)' 
                                  : 'Cancel Booking'
                              }
                            </button>
                          );
                        })()}
                      </div>
                    )}

                    {booking.status === 'completed' && !userReviews[booking.id] && (
                      <button
                        onClick={() => setReviewingBookingId(booking.id)}
                        className="mt-3 block px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition"
                      >
                        Leave Review
                      </button>
                    )}

                    {booking.status === 'completed' && userReviews[booking.id] && (
                      <div className="mt-3">
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                          ✓ You reviewed this
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      {confirmCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className={`w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cancel Booking</h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                onClick={closeCancelConfirmation}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl border transition ${
                  isDarkMode
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                No, keep booking
              </button>
              <button
                onClick={() => handleCancelBooking(confirmCancelId)}
                disabled={cancellingId === confirmCancelId}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition disabled:bg-gray-400"
              >
                {cancellingId === confirmCancelId ? 'Cancelling...' : 'Yes, cancel booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <ReviewForm
              bookingId={reviewingBookingId}
              maidId={bookings.find(b => b.id === reviewingBookingId)?.maidId}
              onSubmit={handleReviewSubmit}
              onCancel={() => setReviewingBookingId(null)}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default BookingHistory;