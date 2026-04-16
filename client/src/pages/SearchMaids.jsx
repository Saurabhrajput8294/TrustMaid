import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const SearchMaids = () => {
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const { data } = await API.get('/maids');

        setMaids(data);
      } catch (err) {
        console.error('Error fetching maids:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaids();
  }, []);

  // Get all unique skills for filter (normalized to title case)
  const allSkills = ['All', ...new Set(maids.flatMap(m => m.skills || []).map(skill => 
    skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase()
  ))];

  const filteredMaids = maids.filter(maid => {
    const matchesSearch = !searchTerm || maid.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const normalizedSelectedSkill = selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1).toLowerCase();
    const matchesSkill = selectedSkill === 'All' || maid.skills?.some(skill => 
      skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase() === normalizedSelectedSkill
    );
    const matchesRating = !maid.rating || maid.rating >= ratingFilter;
    return matchesSearch && matchesSkill && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Home Service Professionals</h1>
          <p className="text-gray-600 text-lg">Browse verified professionals and book instantly</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <svg className="absolute left-4 top-5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by skill (e.g., cleaning, cooking, babysitting)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition text-lg font-medium"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">Filter by Skill:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedSkill === skill
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">Min Rating:</p>
            <div className="flex gap-2">
              {[0, 3.5, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRatingFilter(rating)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    ratingFilter === rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}⭐`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading professionals...</p>
          </div>
        ) : filteredMaids.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 text-xl font-medium">No professionals found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-6">{filteredMaids.length} professionals available</p>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredMaids.map(maid => (
                <div key={maid.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group border border-gray-100">
                  {/* Card Header with Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
                    <span className="text-7xl">👩‍💼</span>
                  </div>

                  <div className="p-6">
                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{maid.user?.name || maid.User?.name || 'Professional'}</h3>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.round(maid.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{maid.rating ? `${maid.rating.toFixed(1)}` : 'New'}</span>
                      <span className="text-sm text-gray-500">(450+ reviews)</span>
                    </div>

                    {/* Experience */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">Experience:</span>
                      </p>
                      <p className="text-lg font-bold text-blue-600">{maid.experience} years</p>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {maid.skills?.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                            {skill}
                          </span>
                        ))}
                        {maid.skills?.length > 4 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                            +{maid.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        maid.availability
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {maid.availability ? '✓ Available Now' : '✗ Not Available'}
                      </span>
                    </div>

                    {/* CTA Button */}
                    {maid.availability ? (
                      <Link
                        to={`/book/${maid.id}`}
                        className="w-full block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                      >
                        View & Book
                      </Link>
                    ) : (
                      <button disabled className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-bold cursor-not-allowed">
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMaids;