import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Village Officers data from all villages
const villageOfficersData = [
  { 
    id: 1,
    name: "Amit Kumar", 
    contact: "9876543210", 
    designation: "Village Officer", 
    email: "amit.kumar@village.gov.in",
    village: "Rampur",
    joiningDate: "2020-03-15",
    farmersManaged: 120,
    status: "Active",
    performance: "Excellent",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 8,
    totalYield: "4500 tons",
    activeIssues: 3,
    resolvedIssues: 45,
    villageArea: "54000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Approved new farmer registration - Ravi Sharma" },
      { date: "2025-12-08", action: "Resolved irrigation issue in North block" },
      { date: "2025-12-07", action: "Conducted farmer training on organic farming" },
      { date: "2025-12-05", action: "Inspected godown facility - Stock verified" },
      { date: "2025-12-03", action: "Distributed fertilizer subsidies to 15 farmers" }
    ]
  },
  { 
    id: 2,
    name: "Priya Singh", 
    contact: "9876543222", 
    designation: "Village Officer", 
    email: "priya.singh@village.gov.in",
    village: "Lakshmi Nagar",
    joiningDate: "2019-07-20",
    farmersManaged: 80,
    status: "Active",
    performance: "Very Good",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 5,
    totalYield: "3200 tons",
    activeIssues: 2,
    resolvedIssues: 58,
    villageArea: "32000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Organized crop market visit for farmers" },
      { date: "2025-12-08", action: "Updated dealer license - Green Agro Supplies" },
      { date: "2025-12-06", action: "Resolved pest control issue in sugarcane fields" },
      { date: "2025-12-04", action: "Approved merchant pricing for maize" },
      { date: "2025-12-02", action: "Conducted village meeting on water conservation" }
    ]
  },
  { 
    id: 3,
    name: "Ravi Verma", 
    contact: "9876543233", 
    designation: "Village Officer", 
    email: "ravi.verma@village.gov.in",
    village: "Shanti Puram",
    joiningDate: "2021-01-10",
    farmersManaged: 150,
    status: "Active",
    performance: "Excellent",
    lastActiveDate: "2025-12-08",
    merchantsManaged: 10,
    totalYield: "5800 tons",
    activeIssues: 4,
    resolvedIssues: 32,
    villageArea: "75000 sqft",
    recentActions: [
      { date: "2025-12-08", action: "Launched new cotton procurement scheme" },
      { date: "2025-12-07", action: "Resolved land dispute between two farmers" },
      { date: "2025-12-06", action: "Inspected paddy harvest quality" },
      { date: "2025-12-05", action: "Approved 3 new dealer applications" },
      { date: "2025-12-03", action: "Coordinated with merchants for better pricing" }
    ]
  },
  { 
    id: 4,
    name: "Suresh Patil", 
    contact: "9876543244", 
    designation: "Village Officer", 
    email: "suresh.patil@village.gov.in",
    village: "Green Valley",
    joiningDate: "2018-11-05",
    farmersManaged: 90,
    status: "Active",
    performance: "Good",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 6,
    totalYield: "3800 tons",
    activeIssues: 1,
    resolvedIssues: 67,
    villageArea: "45000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Verified rice harvest records for 20 farmers" },
      { date: "2025-12-08", action: "Conducted workshop on sustainable farming" },
      { date: "2025-12-06", action: "Resolved electricity issue in pump house" },
      { date: "2025-12-04", action: "Facilitated crop insurance claims" },
      { date: "2025-12-01", action: "Organized health checkup camp for farmers" }
    ]
  },
  { 
    id: 5,
    name: "Anjali Mehta", 
    contact: "9876543255", 
    designation: "Village Officer", 
    email: "anjali.mehta@village.gov.in",
    village: "Rose Colony",
    joiningDate: "2022-04-18",
    farmersManaged: 70,
    status: "Active",
    performance: "Very Good",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 4,
    totalYield: "2900 tons",
    activeIssues: 2,
    resolvedIssues: 28,
    villageArea: "28000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Implemented new digital record system" },
      { date: "2025-12-07", action: "Resolved merchant payment delay issue" },
      { date: "2025-12-05", action: "Approved wheat quality certification" },
      { date: "2025-12-03", action: "Conducted soil testing awareness program" },
      { date: "2025-12-01", action: "Updated farmer database with new entries" }
    ]
  },
  { 
    id: 6,
    name: "Vikram Singh", 
    contact: "9876543266", 
    designation: "Village Officer", 
    email: "vikram.singh@village.gov.in",
    village: "Nirmal Nagar",
    joiningDate: "2020-09-12",
    farmersManaged: 110,
    status: "On Leave",
    performance: "Good",
    lastActiveDate: "2025-12-05",
    merchantsManaged: 7,
    totalYield: "4200 tons",
    activeIssues: 5,
    resolvedIssues: 41,
    villageArea: "48000 sqft",
    recentActions: [
      { date: "2025-12-05", action: "Submitted leave application for medical reasons" },
      { date: "2025-12-04", action: "Completed monthly yield report submission" },
      { date: "2025-12-03", action: "Resolved godown storage capacity issue" },
      { date: "2025-12-02", action: "Coordinated with dealers for seed distribution" },
      { date: "2025-11-30", action: "Approved 5 farmer loan applications" }
    ]
  },
  { 
    id: 7,
    name: "Rekha Sharma", 
    contact: "9876543277", 
    designation: "Village Officer", 
    email: "rekha.sharma@village.gov.in",
    village: "Sunpura",
    joiningDate: "2019-02-28",
    farmersManaged: 95,
    status: "Active",
    performance: "Excellent",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 6,
    totalYield: "4100 tons",
    activeIssues: 1,
    resolvedIssues: 52,
    villageArea: "42000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Launched farmer welfare scheme enrollment" },
      { date: "2025-12-08", action: "Resolved water supply issue in East sector" },
      { date: "2025-12-07", action: "Verified merchant price compliance" },
      { date: "2025-12-06", action: "Conducted agricultural equipment demo" },
      { date: "2025-12-04", action: "Approved harvest subsidy for pulses farmers" }
    ]
  },
  { 
    id: 8,
    name: "Ajay Kumar", 
    contact: "9876543288", 
    designation: "Village Officer", 
    email: "ajay.kumar@village.gov.in",
    village: "Nehru Nagar",
    joiningDate: "2021-06-22",
    farmersManaged: 85,
    status: "Active",
    performance: "Good",
    lastActiveDate: "2025-12-08",
    merchantsManaged: 5,
    totalYield: "3500 tons",
    activeIssues: 3,
    resolvedIssues: 29,
    villageArea: "38000 sqft",
    recentActions: [
      { date: "2025-12-08", action: "Coordinated vegetable market transport" },
      { date: "2025-12-07", action: "Resolved fertilizer shortage complaint" },
      { date: "2025-12-05", action: "Inspected dealer warehouse facilities" },
      { date: "2025-12-03", action: "Organized farmer grievance redressal meeting" },
      { date: "2025-12-01", action: "Updated crop yield tracking system" }
    ]
  },
  { 
    id: 9,
    name: "Neha Joshi", 
    contact: "9876543299", 
    designation: "Village Officer", 
    email: "neha.joshi@village.gov.in",
    village: "Ganga Pur",
    joiningDate: "2018-08-14",
    farmersManaged: 130,
    status: "Active",
    performance: "Excellent",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 9,
    totalYield: "5200 tons",
    activeIssues: 2,
    resolvedIssues: 71,
    villageArea: "62000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Implemented new merchant registration portal" },
      { date: "2025-12-08", action: "Resolved crop insurance claim delays" },
      { date: "2025-12-07", action: "Conducted quality check on harvested crops" },
      { date: "2025-12-06", action: "Approved price revision for local merchants" },
      { date: "2025-12-05", action: "Organized digital literacy program for farmers" }
    ]
  },
  { 
    id: 10,
    name: "Ramesh Iyer", 
    contact: "9876543300", 
    designation: "Village Officer", 
    email: "ramesh.iyer@village.gov.in",
    village: "Lotus Park",
    joiningDate: "2022-01-08",
    farmersManaged: 75,
    status: "Active",
    performance: "Very Good",
    lastActiveDate: "2025-12-09",
    merchantsManaged: 4,
    totalYield: "3100 tons",
    activeIssues: 1,
    resolvedIssues: 25,
    villageArea: "35000 sqft",
    recentActions: [
      { date: "2025-12-09", action: "Facilitated direct farmer-merchant meeting" },
      { date: "2025-12-08", action: "Resolved tractor rental dispute" },
      { date: "2025-12-06", action: "Approved organic certification for 10 farmers" },
      { date: "2025-12-04", action: "Inspected irrigation canal maintenance" },
      { date: "2025-12-02", action: "Coordinated pesticide safety training" }
    ]
  },
];

const villages = ["All Villages", ...new Set(villageOfficersData.map(o => o.village))];
const performanceLevels = ["All Performance", "Excellent", "Very Good", "Good"];

const DistrictOfficers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [performanceFilter, setPerformanceFilter] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const navigate = useNavigate();

  const filteredOfficers = villageOfficersData.filter(officer => {
    return (
      (searchTerm === '' || 
       officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       officer.contact.includes(searchTerm) ||
       officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       officer.village.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (villageFilter === '' || villageFilter === 'All Villages' || officer.village === villageFilter) &&
      (statusFilter === '' || officer.status === statusFilter) &&
      (performanceFilter === '' || performanceFilter === 'All Performance' || officer.performance === performanceFilter)
    );
  });

  // Statistics
  const totalOfficers = villageOfficersData.length;
  const activeOfficers = villageOfficersData.filter(o => o.status === 'Active').length;
  const totalFarmersManaged = villageOfficersData.reduce((sum, o) => sum + o.farmersManaged, 0);
  const excellentPerformers = villageOfficersData.filter(o => o.performance === 'Excellent').length;

  const getPerformanceColor = (performance) => {
    switch(performance) {
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Very Good': return 'bg-blue-100 text-blue-700';
      case 'Good': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">Village Officers - District Management</h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium">Total Officers</h3>
            <p className="text-2xl font-bold text-green-700">{totalOfficers}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-sm font-medium">Active Officers</h3>
            <p className="text-2xl font-bold text-blue-700">{activeOfficers}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm font-medium">Farmers Managed</h3>
            <p className="text-2xl font-bold text-yellow-700">{totalFarmersManaged}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <h3 className="text-gray-600 text-sm font-medium">Excellent Performers</h3>
            <p className="text-2xl font-bold text-purple-700">{excellentPerformers}</p>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search officers, villages, or contact..."
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
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
            >
              {performanceLevels.map(perf => (
                <option key={perf} value={perf}>{perf}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map(officer => (
            <div
              key={officer.id}
              className="bg-gray-100/80 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-l-4 border-indigo-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-responsive-xl mr-4">
                  {officer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-responsive-lg font-bold text-gray-800">{officer.name}</h3>
                  <p className="text-blue-600 text-responsive-sm font-medium">{officer.village}</p>
                  <p className="text-gray-500 text-responsive-xs">{officer.designation}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-responsive-sm">Contact:</span>
                  <span className="font-semibold text-responsive-sm">{officer.contact}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-responsive-sm">Email:</span>
                  <span className="font-medium text-responsive-xs text-gray-700 truncate max-w-[60%]" title={officer.email}>
                    {officer.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-responsive-sm">Farmers:</span>
                  <span className="font-semibold text-responsive-sm text-green-700">{officer.farmersManaged}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-responsive-sm">Joined:</span>
                  <span className="font-medium text-responsive-sm">{officer.joiningDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-responsive-sm">Last Active:</span>
                  <span className="font-medium text-responsive-sm">{officer.lastActiveDate}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-responsive-xs font-medium ${
                    officer.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {officer.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-responsive-xs font-medium ${getPerformanceColor(officer.performance)}`}>
                    {officer.performance}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => window.location.href = `tel:${officer.contact}`}
                  className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg text-responsive-sm font-medium hover:bg-indigo-700 transition-colors">
                  Contact
                </button>
                <button 
                  onClick={() => setSelectedOfficer(officer)}
                  className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-responsive-sm font-medium hover:bg-gray-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOfficers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No village officers found matching your criteria.</div>
          </div>
        )}

        {/* Officer Details Modal */}
        {selectedOfficer && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4" onClick={() => setSelectedOfficer(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                      {selectedOfficer.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedOfficer.name}</h2>
                      <p className="text-indigo-100">{selectedOfficer.designation}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedOfficer(null)}
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
                {/* Status Badges */}
                <div className="flex gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedOfficer.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedOfficer.status}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPerformanceColor(selectedOfficer.performance)}`}>
                    Performance: {selectedOfficer.performance}
                  </span>
                </div>

                {/* Village Management Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Village: {selectedOfficer.village}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <p className="text-2xl font-bold text-green-600">{selectedOfficer.farmersManaged}</p>
                      <p className="text-xs text-gray-600">Farmers</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <p className="text-2xl font-bold text-purple-600">{selectedOfficer.merchantsManaged}</p>
                      <p className="text-xs text-gray-600">Merchants</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <p className="text-2xl font-bold text-blue-600">{selectedOfficer.totalYield}</p>
                      <p className="text-xs text-gray-600">Total Yield</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <p className="text-2xl font-bold text-gray-600">{selectedOfficer.villageArea}</p>
                      <p className="text-xs text-gray-600">Village Area</p>
                    </div>
                  </div>
                </div>

                {/* Issues Summary */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Issues</p>
                        <p className="text-3xl font-bold text-red-600">{selectedOfficer.activeIssues}</p>
                      </div>
                      <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Resolved Issues</p>
                        <p className="text-3xl font-bold text-green-600">{selectedOfficer.resolvedIssues}</p>
                      </div>
                      <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Task Updates Timeline */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Task Updates
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-3">
                      {selectedOfficer.recentActions.map((action, index) => (
                        <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-500">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 mb-1">{action.action}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{action.date}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-indigo-600 font-medium">{selectedOfficer.village}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact and Work Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Mobile Number</p>
                        <p className="font-semibold text-gray-800">{selectedOfficer.contact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-800 text-sm break-all">{selectedOfficer.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Last Active</p>
                        <p className="font-semibold text-gray-800">{selectedOfficer.lastActiveDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Work Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Work Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Joining Date</p>
                        <p className="font-semibold text-gray-800">{selectedOfficer.joiningDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Years of Service</p>
                        <p className="font-semibold text-gray-800">
                          {Math.floor((new Date() - new Date(selectedOfficer.joiningDate)) / (365.25 * 24 * 60 * 60 * 1000))} years
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Resolution Rate</p>
                        <p className="font-semibold text-green-600">
                          {Math.round((selectedOfficer.resolvedIssues / (selectedOfficer.resolvedIssues + selectedOfficer.activeIssues)) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedOfficer.contact}`}
                    className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </button>
                  {selectedOfficer.email && (
                    <button 
                      onClick={() => window.location.href = `mailto:${selectedOfficer.email}`}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictOfficers;
