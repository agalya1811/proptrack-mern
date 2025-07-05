import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePropertyStore from '../components/zustand/usePropertyStore';
import useInquiryStore from '../components/zustand/useInquiryStore';

const DashboardPage = () => {
  const properties = usePropertyStore((state) => state.properties);
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);
  const { inquiries, fetchInquiries } = useInquiryStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchProperties();
    fetchInquiries();
  }, [fetchProperties, fetchInquiries]);

  const filteredProperties = properties.filter(
    (prop) =>
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`p-4 sm:p-6 lg:p-10 min-h-screen `}
    >
      {/* Top bar: Stats + Dark Mode Toggle */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-6 font-semibold text-lg">
          <div className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
            Total Properties: {properties.length}
          </div>
          <div className="bg-gradient-to-r from-green-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
            Total Inquiries: {inquiries.length}
          </div>
        </div>
      
      </div>

      {/* Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link to="/">
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200">
            🏠 Home
          </button>
        </Link>
        <Link to="/dashboard/clients">
          <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow">
            View Clients
          </button>
        </Link>
      </div>

      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 bg-clip-text text-transparent">
        Agent Dashboard
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search properties by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-3 rounded-lg border focus:outline-none shadow-md ${
            darkMode
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 placeholder-gray-400 text-gray-100'
              : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900'
          }`}
        />
      </div>

      {/* Properties Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Properties
        </h2>

        {Array.isArray(filteredProperties) && filteredProperties.length === 0 ? (
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No properties match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop._id}
                className={`relative rounded-xl p-6 shadow-lg transition hover:shadow-2xl
                  ${
                    darkMode
                      ? 'bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 bg-opacity-70 backdrop-blur-sm border border-gray-700 text-gray-100'
                      : 'bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 border border-transparent text-gray-900'
                  }
                  `}
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
              >
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                  {prop.title}
                </h3>
                <p className="mb-1 text-sm">{prop.location}</p>
                <p className="text-lg font-semibold text-gradient bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                  ${prop.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Inquiries Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
          Inquiries
        </h2>
        <div className="space-y-5">
          {inquiries.length === 0 ? (
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No inquiries yet.</p>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq._id}
                className={`flex items-start space-x-4 rounded-lg p-4 border-l-8 transition hover:shadow-lg
                  ${
                    darkMode
                      ? 'bg-gradient-to-r from-green-900 to-teal-800 border-teal-400 text-gray-100'
                      : 'bg-white border-l-green-500 shadow-sm text-gray-900'
                  }
                `}
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg">{inq.name}</p>
                  <p className="text-sm mb-1">{inq.email}</p>
                  <p className="italic">{inq.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
