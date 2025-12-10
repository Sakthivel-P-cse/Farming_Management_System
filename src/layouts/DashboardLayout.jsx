import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../store/useAuthstore';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with left margin to account for fixed sidebar */}
      <main className="flex-1 ml-64">
        {/* Top Bar with Name, Role and Logout - Fixed at top */}
        <div className="bg-white border-b border-gray-300 px-8 py-4 flex items-center justify-between gap-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
            <span className="text-xl font-bold text-gray-900">{user?.name || 'Officer'}</span>
            {user?.role === 'district' && (
              <span className="text-sm text-gray-600">- District Officer</span>
            )}
            {user?.role === 'village' && (
              <span className="text-sm text-gray-600">- Village Officer</span>
            )}
            {user?.district && (
              <span className="text-sm text-gray-500">• {user.district}</span>
            )}
            {user?.village && (
              <span className="text-sm text-gray-500">• {user.village}</span>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
