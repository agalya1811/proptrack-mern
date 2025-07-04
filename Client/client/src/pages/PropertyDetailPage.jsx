import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="p-6">
      <button
  onClick={() => navigate(-1)}
  className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
>
  ← Back
</button>
      <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
      <img
        src={property.images?.[0]}
        alt={property.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p className="mt-2"><strong>Description:</strong> {property.description}</p>
    </div>
  );
};

export default PropertyDetailPage;
