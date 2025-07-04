import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePropertyStore from '../components/zustand/usePropertyStore';
import useInquiryStore from '../components/zustand/useInquiryStore';

const DashboardPage = () => {
  //const { properties, fetchProperties } = usePropertyStore();
  const properties = usePropertyStore(state => state.properties);
  const fetchProperties = usePropertyStore(state => state.fetchProperties);
  const { inquiries, fetchInquiries } = useInquiryStore();

  useEffect(() => {
    fetchProperties();
    fetchInquiries();
  }, [fetchProperties]);
   console.log("PROPERTIES:", properties);

  return (
   <div className="p-6">
  {/* Top-left Buttons */}
  <div className="flex items-center gap-3 mb-4">
    <Link to="/">
      <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200">
        🏠 Home
      </button>
    </Link>
    <Link to="/dashboard/clients">
      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
        View Clients
      </button>
    </Link>
  </div>

  {/* Dashboard Title */}
  <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>


<section className="mb-8">
  <h2 className="text-xl font-semibold mb-2">Properties</h2>

  {Array.isArray(properties) && properties.length === 0 ? (
    <p className="text-gray-500">No properties listed.</p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((prop) => (
        <div key={prop._id} className="p-4 border rounded shadow">
          <h3 className="font-bold text-lg">{prop.title}</h3>
          <p className="text-sm text-gray-600">{prop.location}</p>
          <p className="text-sm font-semibold">${prop.price}</p>
        </div>
      ))}
    </div>
  )}
  
</section>


      <section>
        <h2 className="text-xl font-semibold mb-2">Inquiries</h2>
        <div className="space-y-2">
          {inquiries.length === 0 ? (
            <p>No inquiries yet.</p>
          ) : (
            inquiries.map((inq) => (
              <div key={inq._id} className="border p-4 rounded bg-gray-100">
                <p><strong>Name:</strong> {inq.name}</p>
                <p><strong>Email:</strong> {inq.email}</p>
                <p><strong>Message:</strong> {inq.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
