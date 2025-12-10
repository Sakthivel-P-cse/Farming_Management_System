import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPendingRequests } from '../../services/pendingRequestService';

const VillageDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [overviewData] = useState({
    farmers: { total: 135, active: 108, inactive: 27, newThisMonth: 12 },
    dealers: { total: 14, rentGivers: 6, sellers: 8, topRated: 5 },
    issues: { total: 48, resolved: 30, pending: 13, inProgress: 5 },
    equipment: { available: 145, rented: 89, maintenance: 12, categories: 8 }
  });
  const [todayStats] = useState({
    stockUpdates: 15,
    newMerchants: 3,
    issuesResolved: 7,
    alertsSent: 24
  });

  useEffect(() => {
    // Fetch pending requests count
    const fetchPendingCount = async () => {
      try {
        setLoading(true);
        const requests = await getAllPendingRequests();
        setPendingCount(requests.length);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingCount();
  }, []);

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
      path: '/VillageIssue'
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

  const handleCardClick = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-responsive-3xl font-bold text-gray-900 mb-2">Village Overview</h1>
          <p className="text-responsive-lg text-gray-600">Rampur Village Dashboard</p>
        </div>

        {/* Pending Requests Alert */}
        {pendingCount > 0 && (
          <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-orange-800">Pending Registration Requests</h3>
                  <p className="text-orange-700">You have {pendingCount} pending registration request{pendingCount > 1 ? 's' : ''} awaiting review</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/farmers-list')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Review Now
              </button>
            </div>
          </div>
        )}

        {/* Main Content Grid - Farmers, Dealers, Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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

        {/* System Status and Today's Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
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
                  <span className="font-bold text-gray-800">{todayStats.stockUpdates}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Merchants</span>
                  <span className="font-bold text-gray-800">{todayStats.newMerchants}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Issues Resolved</span>
                  <span className="font-bold text-gray-800">{todayStats.issuesResolved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Alerts Sent</span>
                  <span className="font-bold text-gray-800">{todayStats.alertsSent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageDashboard;