import React, { useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';

const InquiryList = () => {
  const { inquiries, fetchInquiries, loading } = useDashboardStore();

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) return <p>Loading inquiries...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Inquiries</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Property</th><th>Message</th><th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(i => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.phone}</td>
              <td>{i.property?.title || 'N/A'}</td>
              <td>{i.message}</td>
              <td>{new Date(i.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryList;
