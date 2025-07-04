import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import PropertyForm from './PropertyForm';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const { properties, fetchProperties, deleteProperty, loading } = useDashboardStore();
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('Delete this property?')) {
      deleteProperty(id);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Properties</h2>
      {loading && <p>Loading...</p>}
      <div className="flex gap-4 mb-4">
  <button
    onClick={() => setEditingProperty({})}
    className="px-3 py-1 bg-blue-600 text-white rounded"
  >
    Add New Property
  </button>

  <Link to="/dashboard">
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Go to Dashboard
    </button>
  </Link>
</div>
      {editingProperty && (
        <PropertyForm property={editingProperty} onClose={() => setEditingProperty(null)} />
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th>Title</th><th>Price</th><th>Type</th><th>Location</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>{p.type}</td>
              <td>{p.location}</td>
              <td>
                <button onClick={() => setEditingProperty(p)} className="mr-2 text-blue-600">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
