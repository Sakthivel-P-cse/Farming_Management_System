import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IssuesSummary from '../components/IssuesSummary';
import { mockIssuesData } from '../data/issuesMock';

const Issues = () => {
  const [activeTab, setActiveTab] = useState('damages');
  const navigate = useNavigate();

  // Mock data for disaster management
  const disasterData = {
    activeAlerts: [
      {
        id: 1,
        type: 'Flood Warning',
        severity: 'high',
        area: 'District North',
        description: 'Heavy rainfall expected in next 48 hours',
        timestamp: '2 hours ago',
      },
      {
        id: 2,
        type: 'Drought Alert',
        severity: 'medium',
        area: 'District South',
        description: 'Low rainfall detected in the past month',
        timestamp: '1 day ago',
      },
    ],
    weatherWarnings: [
      'Cyclone formation detected 200km offshore',
      'Temperature exceeding 40°C expected this week',
      'Unseasonal rainfall predicted next month',
    ],
    officerInCharge: {
      name: 'Dr. Rajesh Kumar',
      role: 'Disaster Management Officer',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@district.gov.in',
    },
    ongoingResponses: [
      { id: 1, disaster: 'Flood Relief - Block A', status: 'Active', progress: 75 },
      { id: 2, disaster: 'Drought Mitigation - Zone 3', status: 'Active', progress: 40 },
      { id: 3, disaster: 'Storm Damage Assessment', status: 'Completed', progress: 100 },
    ],
  };

  // Mock data for low yield crops
  const lowYieldCrops = [
    {
      id: 1,
      crop: 'Wheat',
      area: 'Block B',
      predictedYield: '45%',
      normalYield: '75%',
      reason: 'Insufficient rainfall and high temperature',
      recommendation: 'Increase irrigation frequency',
    },
    {
      id: 2,
      crop: 'Rice',
      area: 'Block C',
      predictedYield: '50%',
      normalYield: '80%',
      reason: 'Pest infestation detected',
      recommendation: 'Apply organic pesticides',
    },
    {
      id: 3,
      crop: 'Cotton',
      area: 'Block D',
      predictedYield: '55%',
      normalYield: '70%',
      reason: 'Soil nutrient deficiency',
      recommendation: 'Add nitrogen-based fertilizers',
    },
  ];

  // Mock data for general issues
  const generalIssues = [
    {
      id: 1,
      title: 'Irrigation pump failure in Block A',
      reportedBy: 'Farmer Ramesh',
      status: 'Pending',
      priority: 'High',
      date: '2024-12-08',
    },
    {
      id: 2,
      title: 'Seed quality complaint',
      reportedBy: 'Village Officer - Rampur',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-12-07',
    },
    {
      id: 3,
      title: 'Fertilizer shortage in godown',
      reportedBy: 'Dealer Krishna',
      status: 'Resolved',
      priority: 'High',
      date: '2024-12-06',
    },
    {
      id: 4,
      title: 'Road access blocked to farming area',
      reportedBy: 'Farmer Priya',
      status: 'Escalated',
      priority: 'High',
      date: '2024-12-05',
    },
    {
      id: 5,
      title: 'Water contamination in well',
      reportedBy: 'Village Officer - Nagar',
      status: 'Pending',
      priority: 'Critical',
      date: '2024-12-04',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Escalated':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Active':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 font-bold';
      case 'High':
        return 'text-orange-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'medium':
        return 'border-l-4 border-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
            title="Back"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Issues Management</h1>
            <p className="text-lg text-gray-600">Monitor disasters, crop yields, and general issues</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('damages')}
            className={`px-6 py-4 font-semibold transition-all ${
              activeTab === 'damages'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Crop & Equipment Damages
          </button>
          <button
            onClick={() => setActiveTab('disaster')}
            className={`px-6 py-4 font-semibold transition-all ${
              activeTab === 'disaster'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Disaster Management
          </button>
          <button
            onClick={() => setActiveTab('lowYield')}
            className={`px-6 py-4 font-semibold transition-all ${
              activeTab === 'lowYield'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Low Yield Crops
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-4 font-semibold transition-all ${
              activeTab === 'general'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            General Issues
          </button>
        </div>
      </div>

      {/* Crop & Equipment Damages Tab - NEW DASHBOARD */}
      {activeTab === 'damages' && (
        <div className="space-y-6">
          <IssuesSummary farmersData={mockIssuesData} />
        </div>
      )}

      {/* Disaster Management Tab */}
      {activeTab === 'disaster' && (
        <div className="space-y-6">
          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Disaster Alerts</h2>
            <div className="space-y-4">
              {disasterData.activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg bg-white border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{alert.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">{alert.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📍 {alert.area}</span>
                        <span>🕒 {alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Warnings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Warnings</h2>
            <div className="space-y-3">
              {disasterData.weatherWarnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-gray-700">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Low Yield Crops Tab */}
      {activeTab === 'lowYield' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-orange-50 border-b border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Low Yield Crop Predictions</h2>
            <p className="text-gray-600">Crops predicted to have lower yield based on weather and soil conditions</p>
          </div>
          <div className="divide-y divide-gray-200">
            {lowYieldCrops.map((crop) => (
              <div key={crop.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{crop.crop}</h3>
                    <p className="text-gray-600">📍 {crop.area}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Predicted Yield</p>
                    <p className="text-2xl font-bold text-orange-600">{crop.predictedYield}</p>
                    <p className="text-xs text-gray-500">Normal: {crop.normalYield}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Reason:</p>
                  <p className="text-gray-600">{crop.reason}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-700 mb-1">💡 Recommendation:</p>
                  <p className="text-green-800">{crop.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Issues Tab */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Issue Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Reported By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {generalIssues.map((issue, index) => (
                  <tr key={issue.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{issue.title}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{issue.reportedBy}</td>
                    <td className="px-6 py-4">
                      <span className={getPriorityColor(issue.priority)}>{issue.priority}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{issue.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;
