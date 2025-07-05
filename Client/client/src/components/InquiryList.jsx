import React, { useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

const InquiryList = () => {
  const { inquiries, fetchInquiries, loading } = useDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) return <p className="p-6 text-gray-700">Loading inquiries...</p>;

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded shadow"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">Client Inquiries</h2>

      {/* Inquiry Table */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
        <table className="w-full text-sm text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <thead className="bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 font-semibold">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Phone</th>
              <th className="px-4 py-3 border-b">Property</th>
              <th className="px-4 py-3 border-b">Message</th>
              <th className="px-4 py-3 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i._id} className="hover:bg-white/70 transition text-center">
                <td className="px-4 py-3 border-b">{i.name}</td>
                <td className="px-4 py-3 border-b">{i.email}</td>
                <td className="px-4 py-3 border-b">{i.phone}</td>
                <td className="px-4 py-3 border-b">{i.property?.title || 'N/A'}</td>
                <td className="px-4 py-3 border-b">{i.message}</td>
                <td className="px-4 py-3 border-b">
                  {new Date(i.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryList;
