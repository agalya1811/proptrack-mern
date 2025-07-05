import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

const ClientListPage = () => {
  const navigate = useNavigate();
  const { clients, fetchClients, addClient } = useDashboardStore();
  const { properties, fetchProperties } = useDashboardStore();

  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    property: ''
  });

  useEffect(() => {
    fetchClients();
    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addClient(newClient);
      setShowModal(false);
      setNewClient({ name: '', email: '', phone: '', message: '', property: '' });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      {/* Title + Add */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Client Details</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
        >
          ➕ Add Client
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
        <table className="w-full text-sm text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <thead className="bg-gradient-to-r from-pink-100 to-red-100 text-red-700 font-semibold">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Phone</th>
              <th className="px-4 py-3 border-b">Message</th>
              <th className="px-4 py-3 border-b">Property</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="text-center hover:bg-white/70 transition">
                <td className="px-4 py-3 border-b">{client.name}</td>
                <td className="px-4 py-3 border-b">{client.email}</td>
                <td className="px-4 py-3 border-b">{client.phone}</td>
                <td className="px-4 py-3 border-b">{client.message}</td>
                <td className="px-4 py-3 border-b">
                  {client.property?.title || 'N/A'}
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
     {showModal && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Client</h3>
      <form onSubmit={handleAddClient} className="space-y-3">
        {/* input fields here... */}
        <input
                type="text"
                name="name"
                placeholder="Name"
                value={newClient.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newClient.email}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newClient.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="message"
                placeholder="Message"
                value={newClient.message}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <select
                name="property"
                value={newClient.property}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="" disabled>Select a property</option>
                {properties.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ClientListPage;
