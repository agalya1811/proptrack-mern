import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AgentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="w-60 bg-gray-100 p-4">
        <Link to="/dashboard">
          <h2 className="font-bold mb-6 text-blue-600 hover:underline cursor-pointer">
            Agent Dashboard
          </h2>
        </Link>
        <ul>
          <li><Link to="properties" className="block py-2">Properties</Link></li>
          <li><Link to="inquiries" className="block py-2">Inquiries</Link></li>
          <li><Link to="viewings" className="block py-2">Viewings</Link></li>
        </ul>
      </nav>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentDashboardLayout;
