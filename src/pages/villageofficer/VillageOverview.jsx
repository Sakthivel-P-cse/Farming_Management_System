import React from 'react';
import { useNavigate } from 'react-router-dom';

const VillageOverview = () => {
  const navigate = useNavigate();

  // Mock data for overview
  const overviewData = {
    farmers: {
      total: 120,
      active: 95,
      inactive: 25,
      newThisMonth: 8
    },
    dealers: {
      total: 8,
      rentGivers: 4,
      sellers: 4,
      topRated: 3
    },
    issues: {
      total: 45,
      resolved: 28,
      pending: 12,
      inProgress: 5
    },
    equipment: {
      available: 24,
      rented: 15,
      maintenance: 3,
      categories: 6
    }
  };

  const quickStats = [
    {
      title: 'Total Farmers',
      value: overviewData.farmers.total,
      subtitle: `${overviewData.farmers.active} Active`,
      icon: '👨‍🌾',
      color: 'bg-green-500',
      path: '/farmers-list'
    },
    {
      title: 'Dealers Available',
      value: overviewData.dealers.total,
      subtitle: `${overviewData.dealers.rentGivers} Rent Givers`,
      icon: '🏪',
      color: 'bg-blue-500',
      path: '/Dealers-list'
    },
    {
      title: 'Issues Tracked',
      value: overviewData.issues.total,
      subtitle: `${overviewData.issues.pending} Pending`,
      icon: '📋',
      color: 'bg-yellow-500',
      path: '/Village-issue'
    },
    {
      title: 'Equipment Pool',
      value: overviewData.equipment.available,
      subtitle: `${overviewData.equipment.categories} Categories`,
      icon: '🚜',
      color: 'bg-purple-500',
      path: '/Dealers-list'
    }
  ];

  const recentActivities = [
    { type: 'farmer', name: 'Rajesh Kumar', action: 'registered', time: '2 hours ago' },
    { type: 'dealer', name: 'Sharma Agro Dealers', action: 'added new equipment', time: '4 hours ago' },
    { type: 'issue', name: 'Water shortage in Sector 3', action: 'reported', time: '6 hours ago' },
    { type: 'farmer', name: 'Priya Sharma', action: 'updated crop information', time: '1 day ago' },
    { type: 'issue', name: 'Irrigation pump failure in Block B', action: 'reported', time: '1 day ago' }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              title="Back"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
          <h1 className="text-responsive-4xl font-bold text-green-700 mb-2">Village Overview</h1>
          <p className="text-responsive-lg text-gray-600">Rampur Village</p>
        </div>

        

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Farmers Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-responsive-2xl font-bold text-gray-800">Farmers</h3>
              <button
                onClick={() => navigate('/farmers-list')}
                className="text-green-600 hover:text-green-800 font-medium text-responsive-sm"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Total Farmers:</span>
                <span className="text-green-600 font-bold text-responsive-lg">{overviewData.farmers.total}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Active:</span>
                <span className="text-gray-800 font-bold text-responsive-base">{overviewData.farmers.active}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Inactive:</span>
                <span className="text-gray-800 font-bold text-responsive-base">{overviewData.farmers.inactive}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">New This Month:</span>
                <span className="text-blue-600 font-bold text-responsive-base">{overviewData.farmers.newThisMonth}</span>
              </div>
            </div>
          </div>

          {/* Dealers Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-responsive-2xl font-bold text-gray-800">Dealers</h3>
              <button
                onClick={() => navigate('/Dealers-list')}
                className="text-green-600 hover:text-green-800 font-medium text-responsive-sm"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Total Dealers:</span>
                <span className="text-green-600 font-bold text-responsive-lg">{overviewData.dealers.total}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Rent Givers:</span>
                <span className="text-gray-800 font-bold text-responsive-base">{overviewData.dealers.rentGivers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Sellers:</span>
                <span className="text-gray-800 font-bold text-responsive-base">{overviewData.dealers.sellers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Top Rated (4.5+):</span>
                <span className="text-yellow-600 font-bold text-responsive-base">{overviewData.dealers.topRated}</span>
              </div>
            </div>
          </div>

          {/* Issues Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-responsive-2xl font-bold text-gray-800">Issues</h3>
              <button
                onClick={() => navigate('/Village-issue')}
                className="text-green-600 hover:text-green-800 font-medium text-responsive-sm"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Total Issues:</span>
                <span className="text-green-600 font-bold text-responsive-lg">{overviewData.issues.total}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Resolved:</span>
                <span className="text-gray-800 font-bold text-responsive-base">{overviewData.issues.resolved}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">Pending:</span>
                <span className="text-red-600 font-bold text-responsive-base">{overviewData.issues.pending}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-700 text-responsive-base">In Progress:</span>
                <span className="text-blue-600 font-bold text-responsive-base">{overviewData.issues.inProgress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-responsive-sm font-bold ${
                    activity.type === 'farmer' ? 'bg-green-200 text-green-700' :
                    activity.type === 'dealer' ? 'bg-blue-200 text-blue-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {activity.type === 'farmer' ? '👨‍🌾' : activity.type === 'dealer' ? '🏪' : '📋'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-responsive-base">{activity.name}</p>
                    <p className="text-gray-600 text-responsive-sm">{activity.action}</p>
                  </div>
                </div>
                <span className="text-gray-500 text-responsive-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageOverview;