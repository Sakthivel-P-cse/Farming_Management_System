import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthstore';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/overview',
    },
    {
      name: 'Farmers',
      path: '/farmers-list',
    },
    {
      name: 'Dealers',
      path: '/Dealers-list',
    },
    {
      name: 'Issues',
      path: '/issues',
    },
    {
      name: 'Godown',
      path: '/godown',
    },
    {
      name: 'Merchants',
      path: '/merchants',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gray-100 shadow-lg flex flex-col border-r border-gray-300 fixed left-0 top-0 overflow-y-auto">
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-300 bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-10">
        <h2 className="text-xl font-bold">{user?.name || 'Village Officer'}</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-green-100 text-green-700 shadow-md border-l-4 border-green-600'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }
                `}
              >
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
