import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function HelpChatbot({ isOpen, onClose }) {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = {
    general: [
      {
        id: 1,
        question: 'What is TrustMaid?',
        answer: 'TrustMaid is a platform that connects users with verified home service professionals (maids) for cleaning, cooking, babysitting, and laundry services. We ensure quality service with verified professionals and secure bookings.'
      },
      {
        id: 2,
        question: 'Is TrustMaid safe and secure?',
        answer: 'Yes! All professionals are verified, and your personal information is protected. Payments are secure, and you receive confirmation for every booking. You can also cancel bookings within 24 hours if needed.'
      },
      {
        id: 3,
        question: 'How do I create an account?',
        answer: 'Click the "Register" button on the home page, enter your details, choose your role (User or Maid), and create your account. You can then log in and start using the platform.'
      }
    ],
    user: [
      {
        id: 1,
        question: 'How do I book a maid?',
        answer: 'Go to "Search Maids", filter by skills you need, check ratings and reviews, then click "View & Book". Select your preferred date, time, and service type to complete the booking.'
      },
      {
        id: 2,
        question: 'Can I cancel my booking?',
        answer: 'Yes! You can cancel pending bookings within 24 hours of creation. Go to "Booking History", click the booking, and select "Cancel Booking". Cancellations after 24 hours are not allowed.'
      },
      {
        id: 3,
        question: 'How do ratings and reviews work?',
        answer: 'After a service is completed, you can leave a 1-5 star review. View other reviews to see what previous customers experienced. This helps you choose the best professional.'
      },
      {
        id: 4,
        question: 'How are payments handled?',
        answer: 'Payments are processed securely through our platform. You can view all your bookings and payment history in your "Booking History" section.'
      },
      {
        id: 5,
        question: 'How do I filter maids by skill?',
        answer: 'On the "Search Maids" page, use the skill filter buttons to select from available services like Cleaning, Cooking, Babysitting, or Laundry. You can also use the search bar to find specific skills.'
      },
      {
        id: 6,
        question: 'What is my profile page for?',
        answer: 'Your profile page shows your personal information and booking history. You can update your profile details and view past services and reviews.'
      }
    ],
    maid: [
      {
        id: 1,
        question: 'How do I set up my maid profile?',
        answer: 'During registration, select "Maid" as your role and fill in your skills, experience, and availability. Your profile will be visible to users searching for your services.'
      },
      {
        id: 2,
        question: 'How do I receive booking requests?',
        answer: 'Once you set your availability to "Available", users can book you. You\'ll see all incoming booking requests in your "Booking Requests" section. Accept or reject them accordingly.'
      },
      {
        id: 3,
        question: 'How can I manage my schedule?',
        answer: 'Use the "Work Schedule" section to set your availability, working hours, and services you provide. Update this regularly so users know when you\'re available.'
      },
      {
        id: 4,
        question: 'What if I need to reject a booking?',
        answer: 'Go to "Booking Requests", review the booking details, and click "Reject" if you\'re unavailable. The user will be notified and can search for another professional.'
      },
      {
        id: 5,
        question: 'How are ratings important?',
        answer: 'Higher ratings help you get more bookings! Provide excellent service to get 5-star reviews. Your average rating is shown on your profile to all users.'
      },
      {
        id: 6,
        question: 'How do I manage my completed bookings?',
        answer: 'View all your completed services in "Manage Bookings". Users can leave reviews after completion, which helps build your reputation and attract more customers.'
      }
    ]
  };

  const categories = [
    { id: 'general', label: 'General', icon: '❓' },
    { id: 'user', label: 'For Users', icon: '👤' },
    { id: 'maid', label: 'For Maids', icon: '👩‍💼' }
  ];

  const currentFaqs = faqs[selectedCategory];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${isDarkMode ? 'bg-black/50' : 'bg-black/30'}`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } max-h-[85vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💬</span>
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Help & Support
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Find answers to common questions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Category Tabs */}
          <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex gap-2 p-4 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setExpandedFaq(null);
                  }}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="p-6 space-y-3">
            {currentFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`rounded-lg border transition ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-800/50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className={`w-full text-left p-4 flex items-start justify-between gap-3 hover:opacity-80 transition`}
                >
                  <span className={`font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <span className={`text-xl flex-shrink-0 transition ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedFaq === faq.id && (
                  <div className={`px-4 pb-4 border-t ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                    <p className="pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 text-center ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Can't find what you're looking for? Contact support via your profile page.
          </p>
        </div>
      </div>
    </div>
  );
}
