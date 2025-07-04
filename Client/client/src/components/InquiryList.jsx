import React, { useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

const InquiryList = () => {
  const { inquiries, fetchInquiries, loading } = useDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) return <p className="p-4">Loading inquiries...</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Client Inquiries</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-md text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Property</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i._id} className="text-center hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{i.name}</td>
                <td className="px-4 py-2 border">{i.email}</td>
                <td className="px-4 py-2 border">{i.phone}</td>
                <td className="px-4 py-2 border">{i.property?.title || 'N/A'}</td>
                <td className="px-4 py-2 border">{i.message}</td>
                <td className="px-4 py-2 border">
                  {new Date(i.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
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
