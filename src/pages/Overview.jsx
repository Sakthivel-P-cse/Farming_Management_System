import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthstore';

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Mock summary data
  const summaryData = {
    totalCrops: 6,
    totalMerchants: 6,
    totalIssues: 12,
    activeDisasters: 2,
  };

  // Summary cards data
  const summaryCards = [
    {
      title: 'Total Crops',
      value: summaryData.totalCrops,
      subtitle: 'In Godown',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      path: '/godown',
    },
    {
      title: 'Total Merchants',
      value: summaryData.totalMerchants,
      subtitle: 'Active Buyers',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      path: '/merchants',
    },
    {
      title: 'Total Issues',
      value: summaryData.totalIssues,
      subtitle: '5 Pending',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'from-yellow-500 to-yellow-600',
      path: '/issues',
    },
    {
      title: 'Active Disasters',
      value: summaryData.activeDisasters,
      subtitle: 'Alerts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-red-500 to-red-600',
      path: '/issues',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{user?.village || 'Village'} Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-green-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                {card.icon}
              </div>
            </div>
            <h3 className="text-base font-semibold mb-2 text-gray-700">{card.title}</h3>
            <p className="text-3xl font-bold mb-1 text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-600">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-700">Godown System</span>
              </div>
              <span className="text-sm text-green-600 font-semibold">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-700">Merchant Network</span>
              </div>
              <span className="text-sm text-green-600 font-semibold">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-700">Weather Service</span>
              </div>
              <span className="text-sm text-yellow-600 font-semibold">Warning</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-700">Issue Tracker</span>
              </div>
              <span className="text-sm text-green-600 font-semibold">Active</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock Updates</span>
                <span className="font-bold text-gray-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Merchants</span>
                <span className="font-bold text-gray-800">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Issues Resolved</span>
                <span className="font-bold text-gray-800">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Alerts Sent</span>
                <span className="font-bold text-gray-800">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics section removed for minimal layout */}
    </div>
  );
};

export default Overview;
