import React, { useState } from 'react';

const DistrictTaskUpdate = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'village', name: 'Rampur Village', action: 'submitted monthly report', time: '1 hour ago', date: '2025-12-10 09:30 AM', officer: 'Rajesh Kumar' },
    { id: 2, type: 'farmer', name: 'District-wide crop survey', action: 'completed', time: '3 hours ago', date: '2025-12-10 07:30 AM', officer: 'District Office' },
    { id: 3, type: 'issue', name: 'Water supply issue - Shanti Puram', action: 'resolved', time: '5 hours ago', date: '2025-12-10 05:30 AM', officer: 'Vikram Singh' },
    { id: 4, type: 'merchant', name: 'New merchant registration', action: 'approved for Lakshmi Nagar', time: '8 hours ago', date: '2025-12-10 02:30 AM', officer: 'District Office' },
    { id: 5, type: 'godown', name: 'Godown inspection - Green Valley', action: 'completed', time: '1 day ago', date: '2025-12-09 10:30 AM', officer: 'Arun Verma' }
  ]);

  const [formData, setFormData] = useState({
    type: 'village',
    name: '',
    action: '',
    officer: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.action || !formData.officer) {
      alert('Please fill in all fields');
      return;
    }

    const now = new Date();
    const newActivity = {
      id: activities.length + 1,
      type: formData.type,
      name: formData.name,
      action: formData.action,
      officer: formData.officer,
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

    setActivities([newActivity, ...activities]);
    
    // Reset form
    setFormData({
      type: 'village',
      name: '',
      action: '',
      officer: ''
    });
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'village': return '🏘️';
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
      case 'village': return 'bg-emerald-200 text-emerald-700';
      case 'farmer': return 'bg-green-200 text-green-700';
      case 'dealer': return 'bg-blue-200 text-blue-700';
      case 'issue': return 'bg-yellow-200 text-yellow-700';
      case 'godown': return 'bg-purple-200 text-purple-700';
      case 'merchant': return 'bg-indigo-200 text-indigo-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">District Task Update Log</h2>

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
                    <option value="village">Village</option>
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
                    placeholder="e.g., Village name or Activity title"
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
                    placeholder="e.g., completed, approved, resolved"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsible Officer
                  </label>
                  <input
                    type="text"
                    name="officer"
                    value={formData.officer}
                    onChange={handleInputChange}
                    placeholder="e.g., Officer name or District Office"
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
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-800">{activity.name}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.type === 'village' ? 'bg-emerald-100 text-emerald-700' :
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
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-gray-400 text-xs">{activity.date}</p>
                          <span className="text-gray-400">•</span>
                          <p className="text-gray-500 text-xs">👤 {activity.officer}</p>
                        </div>
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

export default DistrictTaskUpdate;
