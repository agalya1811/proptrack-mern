import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`}>
      <div className="border rounded p-3 shadow hover:shadow-md transition">
        <img src={property.images?.[0]} alt={property.title} className="w-full h-40 object-cover rounded" />
        <h3 className="font-semibold mt-2">{property.title}</h3>
        <p>{property.location}</p>
        <p className="text-sm text-gray-600">{property.type} • ${property.price}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
