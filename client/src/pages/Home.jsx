import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HelpChatbot from '../components/HelpChatbot';

const Home = () => {
  const [showHelp, setShowHelp] = useState(true);
  const services = [
    { icon: '🧹', name: 'Cleaning', desc: 'Professional house cleaning' },
    { icon: '👨‍🍳', name: 'Cooking', desc: 'Meal preparation & cooking' },
    { icon: '👶', name: 'Babysitting', desc: 'Childcare & supervision' },
    { icon: '🧺', name: 'Laundry', desc: 'Laundry & ironing services' },
  ];

  const stats = [
    { icon: '⭐', value: '4.8', label: 'Service Rating', subtext: 'From 50K+ reviews' },
    { icon: '👥', value: '1000+', label: 'Active Maids', subtext: 'Verified professionals' },
    { icon: '📅', value: '5000+', label: 'Bookings', subtext: 'This month' },
    { icon: '😊', value: '95%', label: 'Satisfaction', subtext: 'Customer approved' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Home Services at <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Doorstep</span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">Find and book verified, trusted home service professionals. Quick, reliable, and hassle-free.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search-maids" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition text-center shadow-md">
                  Book Now
                </Link>
                <Link to="/register?role=maid" className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-center">
                  Become a Professional
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="https://maidqatar.com/wp-content/uploads/2025/03/Miad-qatar-scaled.jpg"
                alt="Professional Maid Service"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What Are You Looking For */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">What are you looking for?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link
                key={idx}
                to="/search-maids"
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-600 hover:shadow-md transition text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{service.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose TrustMaid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Why Choose TrustMaid?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Professionals</h3>
            <p className="text-gray-700">All professionals are thoroughly vetted and verified for safety, reliability, and quality standards.</p>
          </div>
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Book Anytime</h3>
            <p className="text-gray-700">Easy scheduling with flexible dates and times available round the clock to suit your schedule.</p>
          </div>
          <div className="p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Secure & Safe</h3>
            <p className="text-gray-700">Your data and payments are protected with industry-leading encryption and security protocols.</p>
          </div>
          <div className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <img 
              src="https://statusmaids.com/wp-content/uploads/2025/04/Tips-for-Building-Trust-with-Your-Maid.png" 
              alt="Building Trust with Your Maid" 
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Building Trust</h3>
            <p className="text-gray-700">Learn proven tips for building lasting trust and successful relationships with your home service professionals.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 my-12 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to book a professional?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Choose from thousands of verified professionals and get your work done at your convenience.</p>
          <Link to="/search-maids" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg">
            Explore Services
          </Link>
        </div>
      </div>
    </div>

    <HelpChatbot isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
};

export default Home;