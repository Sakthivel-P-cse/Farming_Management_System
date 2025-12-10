import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthstore';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  // Menu items for Village Officer
  const villageMenuItems = [
    {
      name: 'Dashboard',
      path: '/village-dashboard',
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
      name: 'Godown',
      path: '/godown',
    },
    {
      name: 'Issues',
      path: '/issues',
    },
    {
      name: 'Merchants',
      path: '/merchants',
    },
    {
      name: 'Task Update',
      path: '/task-update',
    },
  ];

  // Menu items for District Officer
  const districtMenuItems = [
    {
      name: 'Dashboard',
      path: '/district-dashboard',
    },
    {
      name: 'Village Officers',
      path: '/district-officers',
    },
    {
      name: 'Farmers',
      path: '/district-farmers',
    },
    {
      name: 'Merchants',
      path: '/district-merchants',
    },
    {
      name: 'Dealers',
      path: '/district-dealers',
    },
    {
      name: 'Godowns',
      path: '/district-godowns',
    },
    {
      name: 'Issues',
      path: '/district-issues',
    },
  ];

  // Select menu items based on user role
  const menuItems = user?.role === 'district' ? districtMenuItems : villageMenuItems;

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-green-600 to-green-700 shadow-lg flex flex-col border-r border-green-800 fixed left-0 top-0 overflow-y-auto">
      {/* Logo/Header */}
      <div className="h-48 border-b border-green-800 bg-green-800 sticky top-0 z-10 flex items-center justify-center px-4 py-4">
        <img src="/image.png" alt="VITAL Logo" className="h-40 w-auto object-contain" />
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
                      ? 'bg-white text-green-700 shadow-md border-l-4 border-white'
                      : 'text-white hover:bg-green-800 hover:text-white'
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
