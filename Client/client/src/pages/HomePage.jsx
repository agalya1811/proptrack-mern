import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePropertyStore from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import InquiryForm from '../components/InquiryForm';

const HomePage = () => {
  const { properties, fetchProperties, loading } = usePropertyStore();
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Available Properties</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowInquiryForm(!showInquiryForm)} // ✅ Toggle form
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {showInquiryForm ? 'Hide Inquiry Form' : 'Add Inquiry'}
          </button>
        <Link to="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Go to Dashboard
          </button>
        </Link>
        </div>
      </div>
        {/* Inquiry Form */}
      {showInquiryForm && (
        <div className="mb-4">
          <InquiryForm property="60f71c3d9a1e8b001cf52c44" />
        </div>
      )}
      <PropertyFilters />
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((prop) => (
            <PropertyCard key={prop._id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
