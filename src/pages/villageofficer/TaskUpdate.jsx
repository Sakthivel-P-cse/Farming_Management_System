import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskUpdate = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([
    { id: 1, type: 'farmer', name: 'Rajesh Kumar', action: 'registered', time: '2 hours ago', date: '2025-12-10 08:30 AM' },
    { id: 2, type: 'dealer', name: 'Sharma Agro Dealers', action: 'added new equipment', time: '4 hours ago', date: '2025-12-10 06:30 AM' },
    { id: 3, type: 'issue', name: 'Water shortage in Sector 3', action: 'reported', time: '6 hours ago', date: '2025-12-10 04:30 AM' },
    { id: 4, type: 'farmer', name: 'Priya Sharma', action: 'updated crop information', time: '1 day ago', date: '2025-12-09 10:30 AM' },
    { id: 5, type: 'issue', name: 'Irrigation pump failure in Block B', action: 'reported', time: '1 day ago', date: '2025-12-09 09:15 AM' },
    { id: 6, type: 'dealer', name: 'Patel Equipment Rentals', action: 'updated rental rates', time: '1 day ago', date: '2025-12-09 02:00 PM' },
    { id: 7, type: 'farmer', name: 'Mohan Das', action: 'requested irrigation support', time: '2 days ago', date: '2025-12-08 11:45 AM' },
    { id: 8, type: 'dealer', name: 'Reddy Agri Solutions', action: 'registered', time: '2 days ago', date: '2025-12-08 09:30 AM' },
    { id: 9, type: 'issue', name: 'Pest outbreak in cotton fields', action: 'reported', time: '3 days ago', date: '2025-12-07 07:15 AM' },
    { id: 10, type: 'farmer', name: 'Harish Bose', action: 'approved for organic certification', time: '3 days ago', date: '2025-12-07 03:30 PM' },
    { id: 11, type: 'dealer', name: 'Bhandari Equipment Hub', action: 'added new machinery', time: '4 days ago', date: '2025-12-06 10:00 AM' },
    { id: 12, type: 'farmer', name: 'Lakshmi Iyer', action: 'submitted soil test report', time: '4 days ago', date: '2025-12-06 01:30 PM' }
  ]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: 'farmer',
    name: '',
    action: ''
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.action) {
      alert('Please fill in all fields');
      return;
    }

    const now = new Date();
    const newActivity = {
      id: activities.length + 1,
      type: formData.type,
      name: formData.name,
      action: formData.action,
      time: 'Just now',
      date: now.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };

    // Add to activities list
    setActivities([newActivity, ...activities]);
    
    // Reset form
    setFormData({
      type: 'farmer',
      name: '',
      action: ''
    });

    alert('Activity logged successfully!');
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'farmer': return '👨‍🌾';
      case 'dealer': return '🏪';
      case 'issue': return '📋';
      case 'godown': return '🏭';
      case 'merchant': return '💼';
      default: return '📌';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'farmer': return 'bg-green-200 text-green-700';
      case 'dealer': return 'bg-blue-200 text-blue-700';
      case 'issue': return 'bg-yellow-200 text-yellow-700';
      case 'godown': return 'bg-purple-200 text-purple-700';
      case 'merchant': return 'bg-indigo-200 text-indigo-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/overview')}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
            title="Back to Overview"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-responsive-3xl font-bold text-gray-900">Task Update Log</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Log New Activity Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Log New Activity</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="dealer">Dealer</option>
                    <option value="issue">Issue</option>
                    <option value="godown">Godown</option>
                    <option value="merchant">Merchant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name/Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe or Issue Title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action/Description
                  </label>
                  <input
                    type="text"
                    name="action"
                    value={formData.action}
                    onChange={handleInputChange}
                    placeholder="e.g., registered, updated, reported"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Add Activity
                </button>
              </form>
            </div>
          </div>

          {/* Recent Activities List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-800">{activity.name}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.type === 'farmer' ? 'bg-green-100 text-green-700' :
                            activity.type === 'dealer' ? 'bg-blue-100 text-blue-700' :
                            activity.type === 'issue' ? 'bg-yellow-100 text-yellow-700' :
                            activity.type === 'godown' ? 'bg-purple-100 text-purple-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>
                            {activity.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.action}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.date}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm ml-4 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;
