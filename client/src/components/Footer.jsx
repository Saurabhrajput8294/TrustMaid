import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="text-xl font-bold text-white">TrustMaid</h3>
                <p className="text-xs text-gray-500">Home Services</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Founded by <span className="font-semibold text-white">Saurabh Rajput</span>
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">For Customers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search-maids" className="text-gray-400 hover:text-white transition">
                  Browse Services
                </Link>
              </li>
              <li>
                <a href="#reviews" className="text-gray-400 hover:text-white transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-400 hover:text-white transition">
                  Support
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">For Professionals</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=maid" className="text-gray-400 hover:text-white transition">
                  Register as a Professional
                </Link>
              </li>
              <li>
                <a href="#earning" className="text-gray-400 hover:text-white transition">
                  How to Earn
                </a>
              </li>
              <li>
                <a href="#guidelines" className="text-gray-400 hover:text-white transition">
                  Professional Guidelines
                </a>
              </li>
              <li>
                <a href="#training" className="text-gray-400 hover:text-white transition">
                  Training & Support
                </a>
              </li>
              <li>
                <a href="#community" className="text-gray-400 hover:text-white transition">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Downloads */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Social Links</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#twitter"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-0.16 7-2" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a
                href="#facebook"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-700 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-500 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <path d="M2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            <h4 className="text-white font-bold text-sm mb-3">Download App</h4>
            <div className="space-y-2">
              <a href="#appstore" className="block">
                <button className="w-full bg-gray-800 hover:bg-gray-700 transition text-white px-4 py-2 rounded text-sm font-medium">
                  App Store
                </button>
              </a>
              <a href="#playstore" className="block">
                <button className="w-full bg-gray-800 hover:bg-gray-700 transition text-white px-4 py-2 rounded text-sm font-medium">
                  Google Play
                </button>
              </a>
            </div>
          </div>\n        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-3">
            © Copyright {currentYear} TrustMaid. All Rights Reserved. | Founded by{' '}
            <span className="font-semibold text-gray-300">Saurabh Rajput</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-white transition">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;