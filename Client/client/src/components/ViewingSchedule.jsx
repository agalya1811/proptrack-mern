import React, { useEffect, useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import API from '../services/api';

const ViewingSchedule = () => {
  const { viewings, fetchViewings, loading } = useDashboardStore();
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchViewings();
  }, []);

  const startEdit = (viewing) => {
    setEditing(viewing);
    setStatus(viewing.status);
    setNotes(viewing.notes || '');
  };

  const saveEdit = async () => {
    try {
      await API.patch(`/viewings/${editing._id}`, { status, notes });
      fetchViewings();
      setEditing(null);
    } catch {
      alert('Failed to update viewing');
    }
  };

  if (loading) return <p>Loading viewings...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Viewing Schedule</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Property</th><th>Client</th><th>Date</th><th>Time</th><th>Status</th><th>Notes</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {viewings.map(v => (
            <tr key={v._id}>
              <td>{v.property?.title}</td>
              <td>{v.client?.name}</td>
              <td>{new Date(v.date).toLocaleDateString()}</td>
              <td>{v.time}</td>
              <td>{v.status}</td>
              <td>{v.notes}</td>
              <td>
                <button onClick={() => startEdit(v)} className="text-blue-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Update Viewing</h3>
          <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 mb-2 w-full">
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="no-show">No-show</option>
          </select>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add notes"
            className="border p-2 mb-2 w-full"
          />
          <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={() => setEditing(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewingSchedule;
