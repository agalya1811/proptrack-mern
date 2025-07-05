import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import API from '../services/api';

const ViewingSchedule = () => {
  const {
    properties,
    clients,
    viewings,
    loading,
    fetchProperties,
    fetchClients,
    fetchViewings,
  } = useDashboardStore();

  const [formData, setFormData] = useState({
    client: '',
    property: '',
    scheduledAt: '',
    status: 'scheduled',
    notes: '',
  });

  const [editingViewingId, setEditingViewingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProperties();
    fetchClients();
    fetchViewings();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const startEdit = (viewing) => {
    setEditingViewingId(viewing._id);
    setFormData({
      client: viewing.client?._id || viewing.client || '',
      property: viewing.property?._id || viewing.property || '',
      scheduledAt: viewing.scheduledAt
        ? new Date(viewing.scheduledAt).toISOString().slice(0, 16)
        : '',
      status: viewing.status,
      notes: viewing.notes || '',
    });
    setShowModal(true);
  };

  const startAddNew = () => {
    setEditingViewingId(null);
    setFormData({
      client: '',
      property: '',
      scheduledAt: '',
      status: 'scheduled',
      notes: '',
    });
    setShowModal(true);
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditingViewingId(null);
    setFormData({
      client: '',
      property: '',
      scheduledAt: '',
      status: 'scheduled',
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.client || !formData.property || !formData.scheduledAt) {
      alert('Please fill client, property, and scheduled date/time');
      return;
    }

    try {
      if (editingViewingId) {
        await API.patch(`/api/viewings/${editingViewingId}`, formData);
        alert('Viewing updated successfully');
      } else {
        await API.post('/api/viewings', formData);
        alert('Viewing scheduled successfully');
      }
      fetchViewings();
      cancelEdit();
    } catch (error) {
      console.error('Error saving viewing:', error);
      alert('Failed to save viewing');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Viewing Schedule
      </h2>

      {/* Schedule Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={startAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Schedule Viewing
        </button>
      </div>

      {/* Modal for Add/Edit */}
     {showModal && (
  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-xl border border-gray-200 rounded-lg p-6 w-full max-w-md z-50">
    <h3 className="text-xl font-semibold mb-4">
      {editingViewingId ? 'Edit Viewing' : 'Schedule Viewing'}
    </h3>

    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Client:
        <select
          name="client"
          value={formData.client}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">Select a client</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Property:
        <select
          name="property"
          value={formData.property}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">Select a property</option>
          {properties.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Scheduled Date & Time:
        <input
          type="datetime-local"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block">
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="no-show">No-show</option>
        </select>
      </label>

      <label className="block">
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Internal notes"
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={cancelEdit}
          className="px-4 py-2 border rounded hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingViewingId ? 'Update Viewing' : 'Schedule Viewing'}
        </button>
      </div>
    </form>
  </div>
)}


      {/* Existing Viewings Table */}
      {/* Styled Viewings Table */}
<div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg mt-4">
  <table className="w-full text-sm text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100">
    <thead className="bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-800 font-semibold">
      <tr>
        <th className="px-4 py-3 border-b">Property</th>
        <th className="px-4 py-3 border-b">Client</th>
        <th className="px-4 py-3 border-b">Scheduled At</th>
        <th className="px-4 py-3 border-b">Status</th>
        <th className="px-4 py-3 border-b">Notes</th>
        <th className="px-4 py-3 border-b text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {viewings.map((v) => (
        <tr key={v._id} className="hover:bg-white/70 transition text-center">
          <td className="px-4 py-3 border-b">{v.property?.title || 'N/A'}</td>
          <td className="px-4 py-3 border-b">{v.client?.name || 'N/A'}</td>
          <td className="px-4 py-3 border-b">
            {new Date(v.scheduledAt).toLocaleString()}
          </td>
          <td className="px-4 py-3 border-b capitalize">{v.status}</td>
          <td className="px-4 py-3 border-b">{v.notes}</td>
          <td className="px-4 py-3 border-b">
            <button
              onClick={() => startEdit(v)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 rounded text-sm hover:from-blue-600 hover:to-blue-800 shadow"
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
      {viewings.length === 0 && (
        <tr>
          <td colSpan="6" className="text-center py-6 text-gray-500">
            No viewings scheduled.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ViewingSchedule;
