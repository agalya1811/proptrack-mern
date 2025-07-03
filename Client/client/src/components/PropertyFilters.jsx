import React, { useState } from 'react';
import usePropertyStore from '../store/propertyStore';

const PropertyFilters = () => {
  const { fetchProperties } = usePropertyStore();
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };

  const resetFilters = () => {
    setFilters({ location: '', type: '', minPrice: '', maxPrice: '' });
    fetchProperties(); // reset to full list
  };

  return (
    <form onSubmit={applyFilters} className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
        className="border p-2 rounded w-40"
      />
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="border p-2 rounded w-40"
      >
        <option value="">All Types</option>
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="border p-2 rounded w-32"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="border p-2 rounded w-32"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Apply
      </button>
      <button type="button" onClick={resetFilters} className="bg-gray-300 px-4 py-2 rounded">
        Reset
      </button>
    </form>
  );
};

export default PropertyFilters;
