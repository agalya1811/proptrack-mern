import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!property) return <p className="p-6 text-red-500">Property not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow"
      >
        ← Back
      </button>

      {/* Property Detail Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image */}
        <div className="h-64 w-full">
          {property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-3">
          <h1 className="text-3xl font-bold">{property.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Type:</strong> {property.type}
            </p>
            <p>
              <strong>Price:</strong> ${property.price}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms || 'N/A'}
            </p>
            <p>
              <strong>Bathrooms:</strong> {property.bathrooms || 'N/A'}
            </p>
            
          </div>

          <div>
            <strong>Description:</strong>
            <p className="mt-1 text-gray-700">{property.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
