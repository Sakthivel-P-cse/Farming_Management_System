import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Aggregated issues data from all villages
const allIssuesData = [
  // Rampur Village Issues
  { 
    id: 1, 
    title: 'Water Shortage in Fields', 
    village: 'Rampur', 
    reportedBy: 'Rajesh Kumar', 
    contact: '9876543210',
    status: 'Pending', 
    priority: 'High', 
    date: '2025-12-08', 
    category: 'Irrigation',
    description: 'Severe water shortage affecting 50 acres of farmland in the eastern sector. Farmers are unable to irrigate their crops, which may lead to crop failure if not addressed urgently.',
    actions: [
      { date: '2025-12-08', action: 'Issue reported by Rajesh Kumar', user: 'Rajesh Kumar' },
      { date: '2025-12-08', action: 'Assigned to irrigation department', user: 'District Officer' }
    ]
  },
  { 
    id: 2, 
    title: 'Pest Attack on Wheat Crop', 
    village: 'Rampur', 
    reportedBy: 'Priya Sharma', 
    contact: '9876543211',
    status: 'In Progress', 
    priority: 'Critical', 
    date: '2025-12-07', 
    category: 'Pest Control',
    description: 'Locust swarm attacking wheat crops across 80 acres. Immediate pest control measures required to prevent complete crop loss. Estimated 30% damage already occurred.',
    actions: [
      { date: '2025-12-07', action: 'Issue reported with photographic evidence', user: 'Priya Sharma' },
      { date: '2025-12-07', action: 'Agricultural officer dispatched for inspection', user: 'District Officer' },
      { date: '2025-12-08', action: 'Pest control team deployed with pesticides', user: 'Agricultural Dept' },
      { date: '2025-12-09', action: 'Second round of spraying scheduled', user: 'Pest Control Team' }
    ]
  },
  { 
    id: 3, 
    title: 'Fertilizer Supply Delay', 
    village: 'Rampur', 
    reportedBy: 'Amit Singh', 
    contact: '9876543212',
    status: 'Resolved', 
    priority: 'Medium', 
    date: '2025-12-05', 
    category: 'Supply',
    description: 'Government subsidized fertilizer delivery delayed by 2 weeks. 25 farmers affected, impacting crop schedule for winter season.',
    actions: [
      { date: '2025-12-05', action: 'Delay reported by multiple farmers', user: 'Amit Singh' },
      { date: '2025-12-06', action: 'Contacted fertilizer supplier', user: 'Supply Officer' },
      { date: '2025-12-07', action: 'Emergency stock arranged from neighboring district', user: 'District Officer' },
      { date: '2025-12-08', action: 'Fertilizer distributed to all affected farmers', user: 'Supply Officer' },
      { date: '2025-12-08', action: 'Issue marked as resolved', user: 'Village Officer' }
    ]
  },
  // Lakshmi Nagar Village Issues
  { 
    id: 4, 
    title: 'Road Damage to Farm Access', 
    village: 'Lakshmi Nagar', 
    reportedBy: 'Suresh Patel', 
    contact: '9876543213',
    status: 'Pending', 
    priority: 'Medium', 
    date: '2025-12-08', 
    category: 'Infrastructure',
    description: 'Main access road to farmland severely damaged due to heavy rains. Tractors and harvesting equipment cannot reach the fields. Affecting 15 farmers.',
    actions: [
      { date: '2025-12-08', action: 'Road damage reported with location details', user: 'Suresh Patel' },
      { date: '2025-12-09', action: 'Site inspection scheduled', user: 'Public Works Dept' }
    ]
  },
  { 
    id: 5, 
    title: 'Electricity Fluctuation', 
    village: 'Lakshmi Nagar', 
    reportedBy: 'Meena Devi', 
    contact: '9876543214',
    status: 'In Progress', 
    priority: 'High', 
    date: '2025-12-06', 
    category: 'Electricity',
    description: 'Frequent power fluctuations damaging irrigation pump motors. Three motors burned out in the past week. Farmers facing difficulty in crop irrigation.',
    actions: [
      { date: '2025-12-06', action: 'Power issue reported', user: 'Meena Devi' },
      { date: '2025-12-07', action: 'Electricity board notified', user: 'Village Officer' },
      { date: '2025-12-08', action: 'Transformer inspection completed', user: 'Electricity Board' },
      { date: '2025-12-09', action: 'Voltage stabilizers being installed', user: 'Electricity Board' }
    ]
  },
  // Shanti Puram Village Issues
  { 
    id: 6, 
    title: 'Cotton Crop Disease', 
    village: 'Shanti Puram', 
    reportedBy: 'Ramesh Yadav', 
    contact: '9876543215',
    status: 'Critical', 
    priority: 'Critical', 
    date: '2025-12-09', 
    category: 'Crop Disease',
    description: 'Bacterial blight spreading rapidly in cotton fields. Over 100 acres affected. Requires immediate treatment to prevent total crop failure. Disease spreading to neighboring farms.',
    actions: [
      { date: '2025-12-09', action: 'Disease outbreak reported urgently', user: 'Ramesh Yadav' },
      { date: '2025-12-09', action: 'Agricultural experts dispatched immediately', user: 'District Officer' },
      { date: '2025-12-09', action: 'Quarantine measures implemented', user: 'Agricultural Dept' }
    ]
  },
  { 
    id: 7, 
    title: 'Godown Leakage', 
    village: 'Shanti Puram', 
    reportedBy: 'Kavita Mishra', 
    contact: '9876543216',
    status: 'In Progress', 
    priority: 'High', 
    date: '2025-12-07', 
    category: 'Infrastructure',
    description: 'Roof leakage in main storage godown during recent rains. 500 quintals of stored wheat at risk of water damage. Immediate repairs needed.',
    actions: [
      { date: '2025-12-07', action: 'Leakage reported with damage photos', user: 'Kavita Mishra' },
      { date: '2025-12-08', action: 'Stock relocated to dry section', user: 'Godown Manager' },
      { date: '2025-12-09', action: 'Repair contractor hired', user: 'PWD' }
    ]
  },
  { 
    id: 8, 
    title: 'Seed Quality Complaint', 
    village: 'Shanti Puram', 
    reportedBy: 'Dinesh Kumar', 
    contact: '9876543217',
    status: 'Resolved', 
    priority: 'Medium', 
    date: '2025-12-04', 
    category: 'Supply',
    description: 'Poor quality paddy seeds distributed through government scheme. Low germination rate reported by multiple farmers.',
    actions: [
      { date: '2025-12-04', action: 'Quality complaint filed', user: 'Dinesh Kumar' },
      { date: '2025-12-05', action: 'Sample seeds sent for testing', user: 'Agricultural Officer' },
      { date: '2025-12-06', action: 'Test results confirmed poor quality', user: 'Seed Lab' },
      { date: '2025-12-07', action: 'Replacement seeds distributed', user: 'Supply Officer' },
      { date: '2025-12-08', action: 'Compensation approved for affected farmers', user: 'District Officer' }
    ]
  },
  // Green Valley Village Issues
  { 
    id: 9, 
    title: 'Wild Animal Attack', 
    village: 'Green Valley', 
    reportedBy: 'Arun Verma', 
    contact: '9876543218',
    status: 'Pending', 
    priority: 'High', 
    date: '2025-12-08', 
    category: 'Wildlife',
    description: 'Wild boars destroying vegetable crops at night. Multiple farms affected. Farmers requesting protective fencing and forest department intervention.',
    actions: [
      { date: '2025-12-08', action: 'Wildlife damage reported', user: 'Arun Verma' },
      { date: '2025-12-09', action: 'Forest department notified', user: 'Village Officer' }
    ]
  },
  { 
    id: 10, 
    title: 'Irrigation Canal Blocked', 
    village: 'Green Valley', 
    reportedBy: 'Sita Gupta', 
    contact: '9876543219',
    status: 'In Progress', 
    priority: 'Critical', 
    date: '2025-12-07', 
    category: 'Irrigation',
    description: 'Main irrigation canal blocked by debris and silt accumulation. Water flow reduced to 30%. Affecting irrigation for 200 acres of farmland.',
    actions: [
      { date: '2025-12-07', action: 'Blockage reported', user: 'Sita Gupta' },
      { date: '2025-12-08', action: 'Cleaning crew mobilized', user: 'Irrigation Dept' },
      { date: '2025-12-09', action: 'Canal cleaning 60% complete', user: 'Work Supervisor' }
    ]
  },
  // Ganga Pur Village Issues
  { 
    id: 11, 
    title: 'Flood Warning', 
    village: 'Ganga Pur', 
    reportedBy: 'Mohan Das', 
    contact: '9876543220',
    status: 'Critical', 
    priority: 'Critical', 
    date: '2025-12-09', 
    category: 'Natural Disaster',
    description: 'Heavy rainfall warning issued. River water level rising. Low-lying farms at risk of flooding. Evacuation plan needed for livestock and stored crops.',
    actions: [
      { date: '2025-12-09', action: 'Flood warning received from meteorological dept', user: 'Mohan Das' },
      { date: '2025-12-09', action: 'Emergency meeting called', user: 'District Officer' },
      { date: '2025-12-09', action: 'Sandbag distribution started', user: 'Disaster Management' },
      { date: '2025-12-09', action: 'Evacuation centers prepared', user: 'Village Officer' }
    ]
  },
  { 
    id: 12, 
    title: 'Equipment Breakdown', 
    village: 'Ganga Pur', 
    reportedBy: 'Lakshmi Bai', 
    contact: '9876543221',
    status: 'Pending', 
    priority: 'Medium', 
    date: '2025-12-06', 
    category: 'Equipment',
    description: 'Community harvester machine broken down during peak harvest season. Repair parts needed urgently. 40 farmers waiting to harvest their crops.',
    actions: [
      { date: '2025-12-06', action: 'Machine breakdown reported', user: 'Lakshmi Bai' },
      { date: '2025-12-07', action: 'Mechanic inspection completed', user: 'Equipment Manager' },
      { date: '2025-12-08', action: 'Spare parts ordered', user: 'Equipment Manager' }
    ]
  },
];

const villages = ["All Villages", "Rampur", "Lakshmi Nagar", "Shanti Puram", "Green Valley", "Ganga Pur"];
const statuses = ["All Status", "Pending", "In Progress", "Resolved", "Critical"];

const DistrictIssues = () => {
  const [villageFilter, setVillageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const navigate = useNavigate();

  const filteredIssues = allIssuesData.filter(issue => {
    return (
      (searchTerm === '' || 
       issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       issue.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
       issue.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (villageFilter === '' || villageFilter === 'All Villages' || issue.village === villageFilter) &&
      (statusFilter === '' || statusFilter === 'All Status' || issue.status === statusFilter)
    );
  });

  // Statistics
  const totalIssues = allIssuesData.length;
  const criticalIssues = allIssuesData.filter(i => i.priority === 'Critical' || i.status === 'Critical').length;
  const pendingIssues = allIssuesData.filter(i => i.status === 'Pending').length;
  const resolvedIssues = allIssuesData.filter(i => i.status === 'Resolved').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">All Issues - District Overview</h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-gray-500">
            <h3 className="text-gray-600 text-sm font-medium">Total Issues</h3>
            <p className="text-2xl font-bold text-gray-700">{totalIssues}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
            <h3 className="text-gray-600 text-sm font-medium">Critical</h3>
            <p className="text-2xl font-bold text-red-700">{criticalIssues}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
            <p className="text-2xl font-bold text-yellow-700">{pendingIssues}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium">Resolved</h3>
            <p className="text-2xl font-bold text-green-700">{resolvedIssues}</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search issues..."
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-responsive-base bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
            >
              <option value="">All Villages</option>
              {villages.slice(1).map(village => (
                <option key={village} value={village}>{village}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status === 'All Status' ? '' : status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map(issue => (
            <div
              key={issue.id}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-l-4 ${
                issue.status === 'Critical' ? 'border-red-500' :
                issue.status === 'Pending' ? 'border-yellow-500' :
                issue.status === 'In Progress' ? 'border-blue-500' : 'border-green-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{issue.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Village:</span>
                      <span className="text-blue-600 font-semibold">{issue.village}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Reported by:</span>
                      <span>{issue.reportedBy}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Category:</span>
                      <span>{issue.category}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Date:</span>
                      <span>{issue.date}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <button 
                    onClick={() => setSelectedIssue(issue)}
                    className="text-green-600 hover:text-green-800 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No issues found matching your criteria.</div>
          </div>
        )}

        {/* Issue Details Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4" onClick={() => setSelectedIssue(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className={`text-white p-6 rounded-t-2xl ${
                selectedIssue.status === 'Critical' ? 'bg-gradient-to-r from-red-600 to-red-700' :
                selectedIssue.status === 'Pending' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' :
                selectedIssue.status === 'In Progress' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                'bg-gradient-to-r from-green-600 to-green-700'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">{selectedIssue.title}</h2>
                    <p className="text-white/90">Issue #{selectedIssue.id} - {selectedIssue.category}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedIssue(null)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {/* Status Badge */}
                <div className="mb-6 flex gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status}
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {selectedIssue.date}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedIssue.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Issue Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Village</p>
                        <p className="font-semibold text-green-700">{selectedIssue.village}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Category</p>
                        <p className="font-semibold text-gray-800">{selectedIssue.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Reported Date</p>
                        <p className="font-semibold text-gray-800">{selectedIssue.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Reporter Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Name</p>
                        <p className="font-semibold text-gray-800">{selectedIssue.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Contact</p>
                        <p className="font-semibold text-gray-800">{selectedIssue.contact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                          {selectedIssue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action History Timeline */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Action History
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      {selectedIssue.actions.map((action, index) => (
                        <div key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{action.action}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-gray-500">{action.date}</p>
                              <span className="text-xs text-gray-400">•</span>
                              <p className="text-xs text-blue-600 font-medium">{action.user}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedIssue.contact}`}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Reporter
                  </button>
                  <button 
                    onClick={() => setSelectedIssue(null)}
                    className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictIssues;
