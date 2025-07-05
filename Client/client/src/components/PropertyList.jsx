import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import PropertyForm from './PropertyForm';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PropertyList = () => {
  const { properties, fetchProperties, deleteProperty, loading } = useDashboardStore();
  const [editingProperty, setEditingProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
    }
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded shadow"
        >
          ← Back
        </button>

        <button
          onClick={() => setEditingProperty({})}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2 rounded shadow"
        >
          + Add New Property
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-gray-800">Manage Properties</h2>

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      {/* Table */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
        <table className="w-full text-sm text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold">
            <tr>
              <th className="px-5 py-3 border-b">Title</th>
              <th className="px-5 py-3 border-b">Price</th>
              <th className="px-5 py-3 border-b">Type</th>
              <th className="px-5 py-3 border-b">Location</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id} className="hover:bg-white/70 transition">
                <td className="px-5 py-3 border-b">{p.title}</td>
                <td className="px-5 py-3 border-b">${p.price}</td>
                <td className="px-5 py-3 border-b">{p.type}</td>
                <td className="px-5 py-3 border-b">{p.location}</td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    onClick={() => setEditingProperty(p)}
                    className="inline-flex items-center bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-3 py-1 rounded mr-2 text-sm shadow"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-3 py-1 rounded text-sm shadow"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
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
    className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50"
    onClick={() => setEditingProperty(null)}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]"
      onClick={(e) => e.stopPropagation()}
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
