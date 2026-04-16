import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const WorkSchedule = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messageBody, setMessageBody] = useState('Hello, I am reaching out about your booking.');
  const [messageSending, setMessageSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await API.get('/bookings/maid');
        const acceptedBookings = data.filter(b => b.status === 'accepted');
        setBookings(acceptedBookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const openMessageModal = (booking) => {
    setSelectedBooking(booking);
    setMessageStatus('');
    setMessageError('');
    setMessageBody(
      `Hello ${booking.User?.name || booking.user?.name || 'Client'},\n\nI hope you are doing well. I wanted to confirm your upcoming service scheduled for ${new Date(booking.date).toLocaleDateString()} at ${booking.time}.`
    );
  };

  const closeMessageModal = () => {
    setSelectedBooking(null);
    setMessageBody('Hello, I am reaching out about your booking.');
    setMessageStatus('');
    setMessageError('');
  };

  const handleSendEmail = async () => {
    if (!selectedBooking) return;
    setMessageSending(true);
    setMessageStatus('');
    setMessageError('');

    try {
      await API.post(`/bookings/${selectedBooking.id}/message`, { message: messageBody });
      setMessageStatus('Message sent to the client successfully.');
      setMessageError('');
      setMessageBody(
        `Hello ${selectedBooking.User?.name || selectedBooking.user?.name || 'Client'},\n\nI have sent you a confirmation message about your booking. Please let me know if you have any additional requests.`
      );
    } catch (err) {
      setMessageError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setMessageSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Work Schedule</h1>

        {messageStatus && !selectedBooking && (
          <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 shadow-sm">
            {messageStatus}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No scheduled bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{booking.service}</h3>
                    <div className="space-y-1 text-gray-600 text-sm">
                      <p><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                      <p><span className="font-semibold">Time:</span> {booking.time}</p>
                      <p><span className="font-semibold">Status:</span> <span className="text-green-700 font-semibold">Confirmed</span></p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <button
                      onClick={() => openMessageModal(booking)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Message Client
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Message Client</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Send a message to {selectedBooking.User?.name || selectedBooking.user?.name || 'your client'}.
                </p>
              </div>
              <button
                onClick={closeMessageModal}
                className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm text-gray-600">
                  Client email: <span className="font-semibold text-gray-800">{selectedBooking.User?.email || selectedBooking.user?.email || 'Not available'}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Booking date: <span className="font-semibold text-gray-800">{new Date(selectedBooking.date).toLocaleDateString()}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Sent from: <span className="font-semibold text-gray-800">{user?.name || 'Your account'}</span>
                </p>
              </div>

              {messageStatus && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
                  {messageStatus}
                </div>
              )}
              {messageError && (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                  {messageError}
                </div>
              )}

              <label className="block text-sm font-semibold text-gray-700">Message</label>
              <textarea
                rows={7}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                <button
                  onClick={handleSendEmail}
                  disabled={messageSending}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {messageSending ? 'Sending...' : messageStatus ? 'Message Sent' : 'Send Message'}
                </button>
                <button
                  onClick={closeMessageModal}
                  className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-300 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSchedule;