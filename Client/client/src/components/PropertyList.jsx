import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import PropertyForm from './PropertyForm';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const { properties, fetchProperties, deleteProperty, loading } = useDashboardStore();
  const [editingProperty, setEditingProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this property?')) {
      deleteProperty(id);
    }
  };

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          ← Back
        </button>

        <button
          onClick={() => setEditingProperty({})}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Property
        </button>
        
      </div>

      <h2 className="text-2xl font-semibold mb-4">Manage Properties</h2>

      {loading && <p>Loading...</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id} className="text-center hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{p.title}</td>
                <td className="px-4 py-2 border">${p.price}</td>
                <td className="px-4 py-2 border">{p.type}</td>
                <td className="px-4 py-2 border">{p.location}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => setEditingProperty(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No properties available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Property */}
      {editingProperty && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setEditingProperty(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <h3 className="text-lg font-semibold mb-4">
              {editingProperty._id ? 'Edit Property' : 'Add New Property'}
            </h3>
            <PropertyForm
              property={editingProperty}
              onClose={() => setEditingProperty(null)}
            />
            <button
              onClick={() => setEditingProperty(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
