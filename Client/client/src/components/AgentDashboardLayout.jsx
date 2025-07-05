import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AgentDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Sidebar */}
      <nav
        className={`w-64 h-screen fixed left-0 top-0 p-6 shadow-md z-30 transition-transform transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block
          bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 text-gray-800
          `}
      >
        <Link to="/dashboard">
          <h2 className="font-bold text-2xl mb-8 text-purple-700 hover:underline">
            Agent Dashboard
          </h2>
        </Link>
        <ul className="space-y-6 font-semibold">
          <li>
            <Link
              to="properties"
              className="block hover:text-purple-500 transition-colors"
            >
              🏠 Properties
            </Link>
          </li>
          <li>
            <Link
              to="inquiries"
              className="block hover:text-purple-500 transition-colors"
            >
              📩 Inquiries
            </Link>
          </li>
          <li>
            <Link
              to="viewings"
              className="block hover:text-purple-500 transition-colors"
            >
              📅 Viewings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Topbar for Mobile */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-40">
        <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 p-4 shadow-sm flex justify-between items-center text-gray-700">
          <h2 className="text-lg font-bold">
            Agent Dashboard
          </h2>
          <button
            className="text-gray-700 text-2xl font-bold"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="ml-0 lg:ml-64 pt-20 lg:pt-6 px-4 sm:px-6 lg:px-8 overflow-y-auto h-screen">
        <div
          className="p-6 rounded-xl shadow-sm min-h-[85vh] bg-white bg-opacity-80 backdrop-blur-sm"
          style={{ border: '1px solid rgba(200, 200, 200, 0.3)' }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AgentDashboardLayout;
