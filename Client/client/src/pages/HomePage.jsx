import React, { useEffect } from 'react';
import usePropertyStore from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';

const HomePage = () => {
  const { properties, fetchProperties, loading } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Properties</h2>
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
