import React, { useState, useEffect } from 'react';
import API from '../services/api';

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/maid');
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    setActioning(bookingId);
    try {
      await API.put(`/bookings/${bookingId}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    } finally {
      setActioning(null);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Booking Requests</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : pendingBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No pending booking requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{booking.service}</h3>
                    <div className="space-y-1 text-gray-600 text-sm">
                      <p><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                      <p><span className="font-semibold">Time:</span> {booking.time}</p>
                      <p><span className="font-semibold">User ID:</span> {booking.userId}</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'accepted')}
                      disabled={actioning === booking.id}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                      disabled={actioning === booking.id}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold disabled:bg-gray-400"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRequests;