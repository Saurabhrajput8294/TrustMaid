import React, { useState, useEffect } from 'react';
import API from '../services/api';

const ManageMaids = () => {
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const { data } = await API.get('/admin/maids');
        setMaids(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaids();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Maids</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : maids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No maids found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Skills</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {maids.map(maid => (
                  <tr key={maid.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-semibold">{maid.userId?.name}</td>
                    <td className="px-6 py-4 text-gray-600">{maid.skills?.join(', ')}</td>
                    <td className="px-6 py-4 text-gray-600">{maid.experience} years</td>
                    <td className="px-6 py-4 text-gray-600">⭐ {maid.rating}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        maid.availability ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {maid.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMaids;