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
    fetchProperties(); // default fetch on load
  }, []);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Available Properties</h2>
        <div className="space-x-2 flex items-center">
          {/* Add Inquiry Button */}
          <button
            onClick={() => setShowInquiryModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Inquiry
          </button>

          {/* Dashboard Button */}
          <Link to="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Dashboard for Agents
            </button>
          </Link>
        </div>
      </div>

      {/* Property Filters (with location dropdown) */}
      <PropertyFilters />

      {/* Property Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((prop) => (
            <PropertyCard key={prop._id} property={prop} />
          ))}
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowInquiryModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // prevent background click from closing
          >
            <h3 className="text-lg font-bold mb-4">Add Inquiry</h3>
            <InquiryForm
              property="60f71c3d9a1e8b001cf52c44"
              onSuccess={() => setShowInquiryModal(false)}
            />
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
