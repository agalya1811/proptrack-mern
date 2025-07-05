import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePropertyStore from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import InquiryForm from '../components/InquiryForm';


const HomePage = () => {
  const { properties, fetchProperties, loading } = usePropertyStore();
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    fetchProperties(); // fetch on load
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-200 py-10 px-4 sm:px-6 lg:px-12 animate-fadeInSlow">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Available Properties
          </h2>
          <div className="space-x-3">
            <button
              onClick={() => setShowInquiryModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
            >
              Add Inquiry
            </button>

            <Link to="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105">
                Dashboard for Agents
              </button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white bg-opacity-80 shadow-lg rounded-xl p-5 mb-6 backdrop-blur-md animate-slideInUp">
          <PropertyFilters />
        </div>

        {/* Property Cards */}
        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No properties found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((prop) => (
              <div
                key={prop._id}
                className="transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
          onClick={() => setShowInquiryModal(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Add Inquiry</h3>
            <InquiryForm
              property="60f71c3d9a1e8b001cf52c44"
              onSuccess={() => setShowInquiryModal(false)}
            />
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
