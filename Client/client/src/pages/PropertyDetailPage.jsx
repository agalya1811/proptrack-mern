import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import InquiryForm from '../components/InquiryForm';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    API.get(`/properties/${id}`).then(res => setProperty(res.data));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{property.title}</h2>
      <p className="text-gray-500">{property.location}</p>
      <img src={property.images?.[0]} className="my-4 w-full h-80 object-cover rounded" />
      <p>{property.description}</p>
      <InquiryForm propertyId={id} />
    </div>
  );
};

export default PropertyDetailPage;
