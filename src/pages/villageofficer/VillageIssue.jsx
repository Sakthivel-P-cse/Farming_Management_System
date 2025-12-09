import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IssuesSummary from '../../components/IssuesSummary';
import { mockIssuesData } from '../../data/issuesMock';

const VillageIssue = () => {
  const navigate = useNavigate();

  // Mock issues data
  const [issues] = useState([
    {
      id: 1,
      title: 'Water shortage in Sector 3',
      category: 'Water Supply',
      description: 'Bore well not working, affecting 15 farmers',
      reportedBy: 'Rajesh Kumar',
      reportedDate: '2024-10-01',
      status: 'Pending',
      priority: 'High',
      duration: 3, // days since reported
      location: 'Sector 3, Block A'
    },
    {
      id: 2,
      title: 'Irrigation pump failure in Block B',
      category: 'Equipment',
      description: 'Main irrigation pump stopped working',
      reportedBy: 'Priya Sharma',
      reportedDate: '2024-10-02',
      status: 'In Progress',
      priority: 'High',
      duration: 2,
      location: 'Block B, Field 12'
    },
    {
      id: 3,
      title: 'Fertilizer delivery delayed',
      category: 'Supply Chain',
      description: 'Expected fertilizer shipment is 5 days late',
      reportedBy: 'Amit Patel',
      reportedDate: '2024-09-28',
      status: 'Pending',
      priority: 'Medium',
      duration: 6,
      location: 'Village Storage Center'
    },
    {
      id: 4,
      title: 'Road damage affecting transportation',
      category: 'Infrastructure',
      description: 'Heavy rains damaged the main access road',
      reportedBy: 'Sunita Devi',
      reportedDate: '2024-09-30',
      status: 'Pending',
      priority: 'Medium',
      duration: 4,
      location: 'Main Village Road'
    },
    {
      id: 5,
      title: 'Pest infestation in wheat fields',
      category: 'Crop Health',
      description: 'Locust attack reported in multiple fields',
      reportedBy: 'Ramesh Singh',
      reportedDate: '2024-10-03',
      status: 'Pending',
      priority: 'High',
      duration: 1,
      location: 'Eastern Fields'
    },
    {
      id: 6,
      title: 'Storage facility roof leakage',
      category: 'Infrastructure',
      description: 'Grain storage roof has multiple leaks Grain storage roof has multiple leaks Grain storage roof has multiple leaks Grain storage roof has multiple leaks',
      reportedBy: 'Deepak Yadav',
      reportedDate: '2024-09-25',
      status: 'Resolved',
      priority: 'Low',
      duration: 9,
      location: 'Central Storage'
    },
    {
      id: 7,
      title: 'Electricity supply disruption',
      category: 'Infrastructure',
      description: 'Power outage affecting irrigation systems',
      reportedBy: 'Kavita Singh',
      reportedDate: '2024-08-15',
      status: 'Resolved',
      priority: 'High',
      duration: 50,
      location: 'Village Power Grid'
    },
    {
      id: 8,
      title: 'Seed quality issues',
      category: 'Supply Chain',
      description: 'Poor germination rate in distributed seeds',
      reportedBy: 'Mohan Lal',
      reportedDate: '2024-07-20',
      status: 'Resolved',
      priority: 'Medium',
      duration: 76,
      location: 'Seed Distribution Center'
    },
    {
      id: 9,
      title: 'Weather monitoring system failure',
      category: 'Equipment',
      description: 'Weather station not providing accurate data',
      reportedBy: 'Ravi Kumar',
      reportedDate: '2023-12-10',
      status: 'Resolved',
      priority: 'Medium',
      duration: 299,
      location: 'Weather Station'
    },
    {
      id: 10,
      title: 'Livestock disease outbreak',
      category: 'Crop Health',
      description: 'Foot and mouth disease affecting cattle',
      reportedBy: 'Sita Devi',
      reportedDate: '2023-11-05',
      status: 'Resolved',
      priority: 'High',
      duration: 334,
      location: 'Livestock Area'
    }
  ]);

  const [sortBy, setSortBy] = useState('date posted');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [timePeriod, setTimePeriod] = useState('All Time');

  // Time period options
  const timePeriods = [
    'All Time',
    'This Month',
    'Previous Month', 
    '2 Months Ago',
    '3 Months Ago',
    'This Year',
    'Previous Year'
  ];

  // Get unique categories
  const categories = ['All', ...new Set(issues.map(issue => issue.category))];
  const statuses = ['All', 'Pending', 'In Progress', 'Resolved'];

  // Helper function to filter issues by time period
  const filterByTimePeriod = (issues, period) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return issues.filter(issue => {
      const issueDate = new Date(issue.reportedDate);
      const issueMonth = issueDate.getMonth();
      const issueYear = issueDate.getFullYear();
      
      switch (period) {
        case 'This Month':
          return issueMonth === currentMonth && issueYear === currentYear;
        case 'Previous Month':
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return issueMonth === prevMonth && issueYear === prevMonthYear;
        case '2 Months Ago':
          const twoMonthsAgo = currentMonth < 2 ? 12 + currentMonth - 2 : currentMonth - 2;
          const twoMonthsAgoYear = currentMonth < 2 ? currentYear - 1 : currentYear;
          return issueMonth === twoMonthsAgo && issueYear === twoMonthsAgoYear;
        case '3 Months Ago':
          const threeMonthsAgo = currentMonth < 3 ? 12 + currentMonth - 3 : currentMonth - 3;
          const threeMonthsAgoYear = currentMonth < 3 ? currentYear - 1 : currentYear;
          return issueMonth === threeMonthsAgo && issueYear === threeMonthsAgoYear;
        case 'This Year':
          return issueYear === currentYear;
        case 'Previous Year':
          return issueYear === currentYear - 1;
        case 'All Time':
        default:
          return true;
      }
    });
  };

  // Filter and sort issues
  const filteredAndSortedIssues = issues
    .filter(issue => {
      const categoryMatch = filterCategory === 'All' || issue.category === filterCategory;
      const statusMatch = filterStatus === 'All' || issue.status === filterStatus;
      return categoryMatch && statusMatch;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'reportedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get filtered issues for summary based on time period
  const summaryIssues = filterByTimePeriod(issues, timePeriod);

  const handleIssueClick = (issue) => {
    navigate('/village-issue-detail', { state: { issue } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getDurationText = (duration) => {
    if (duration === 1) return '1 day ago';
    return `${duration} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/overview')}
              className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
              title="Back to Overview"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-responsive-4xl font-bold text-gray-800 mb-2">Village Issues</h1>
              <p className="text-responsive-lg text-gray-600">Manage and resolve village issues</p>
            </div>
          </div>
        </div>

        {/* New Issues Summary Dashboard - Crop & Equipment Damage Tracking */}
        <div className="mb-8">
          <IssuesSummary farmersData={mockIssuesData} />
        </div>

        {/* Divider */}
        <div className="mb-8 border-t-2 border-gray-300"></div>

        {/* Existing Issues Management Section */}
        <div className="mb-6">
          <h2 className="text-responsive-2xl font-bold text-gray-800 mb-2">General Issues Management</h2>
          <p className="text-responsive-base text-gray-600">Track and manage all village-level issues</p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-responsive-base font-semibold text-gray-800 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-responsive-base font-semibold text-gray-800 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-responsive-base font-semibold text-gray-800 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800"
              >
                <option value="priority">Priority</option>
                <option value="reportedDate">Date Reported</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-responsive-base font-semibold text-gray-800 mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-green-500"
              onClick={() => handleIssueClick(issue)}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-responsive-lg font-bold text-gray-800 mb-3">{issue.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-responsive-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-responsive-xs font-medium">
                      {issue.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-responsive-sm font-bold ${getPriorityColor(issue.priority)}`}>
                    {issue.priority} Priority
                  </p>
                  <p className="text-responsive-xs text-gray-600 mt-1">
                    {getDurationText(issue.duration)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-responsive-base text-gray-700 mb-4 border-t border-gray-200 pt-4">{issue.description}</p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-responsive-sm">
                <div>
                  <p className="text-gray-600 font-semibold">Reported by:</p>
                  <p className="text-gray-800 mt-1">{issue.reportedBy}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Location:</p>
                  <p className="text-gray-800 mt-1">{issue.location}</p>
                </div>
              </div>

              {/* Action indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-green-700 font-medium text-responsive-sm">
                  Click to view details and resolve →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-responsive-2xl font-bold text-gray-800">Summary</h3>
            <div className="w-48">
              <label className="block text-responsive-sm font-semibold text-gray-800 mb-2">Time Period</label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-responsive-base text-gray-800"
              >
                {timePeriods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-responsive-2xl font-bold text-blue-600">
                {summaryIssues.length}
              </p>
              <p className="text-responsive-sm text-gray-600">Total Issues</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-responsive-2xl font-bold text-red-600">
                {summaryIssues.filter(i => i.status === 'Pending').length}
              </p>
              <p className="text-responsive-sm text-gray-600">Pending Issues</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-responsive-2xl font-bold text-yellow-600">
                {summaryIssues.filter(i => i.status === 'In Progress').length}
              </p>
              <p className="text-responsive-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-responsive-2xl font-bold text-green-600">
                {summaryIssues.filter(i => i.status === 'Resolved').length}
              </p>
              <p className="text-responsive-sm text-gray-600">Resolved</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-responsive-2xl font-bold text-green-600">
                {summaryIssues.length > 0 ? Math.round(summaryIssues.filter(i => i.status === 'Resolved').length / summaryIssues.length * 100) : 0}%
              </p>
              <p className="text-responsive-sm text-gray-600">Resolution Rate</p>
            </div>
          </div>
          
          {/* Time Period Info */}
          <div className="mt-4 text-center">
            <p className="text-responsive-sm text-gray-500">
              Showing statistics for: <span className="font-medium text-gray-700">{timePeriod}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageIssue;
