import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const farmersData = [
  { 
    id: 1, 
    name: "Rajesh Kumar", 
    contact: "9876543210", 
    village: "Rampur",
    crops: ["Wheat", "Rice"], 
    landArea: 5.2, 
    status: "Active",
    farmingType: "Organic",
    experience: "15 years",
    address: "Plot 45, Rampur Village"
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    contact: "9876543221", 
    village: "Rampur",
    crops: ["Sugarcane", "Maize"], 
    landArea: 3.8, 
    status: "Active",
    farmingType: "Traditional",
    experience: "8 years",
    address: "Plot 23, Rampur Village"
  },
  { 
    id: 3, 
    name: "Amit Singh", 
    contact: "9876543232", 
    village: "Rampur",
    crops: ["Cotton", "Paddy"], 
    landArea: 7.1, 
    status: "Inactive",
    farmingType: "Hybrid",
    experience: "12 years",
    address: "Plot 67, Rampur Village"
  },
  { 
    id: 4, 
    name: "Sunita Devi", 
    contact: "9876543243", 
    village: "Rampur",
    crops: ["Vegetables", "Wheat"], 
    landArea: 2.5, 
    status: "Active",
    farmingType: "Organic",
    experience: "6 years",
    address: "Plot 12, Rampur Village"
  },
  { 
    id: 5, 
    name: "Ravi Patel", 
    contact: "9876543254", 
    village: "Rampur",
    crops: ["Rice", "Pulses"], 
    landArea: 4.3, 
    status: "Active",
    farmingType: "Traditional",
    experience: "20 years",
    address: "Plot 89, Rampur Village"
  },
  { 
    id: 6, 
    name: "Meera Gupta", 
    contact: "9876543265", 
    village: "Rampur",
    crops: ["Fruits", "Vegetables"], 
    landArea: 1.8, 
    status: "Active",
    farmingType: "Organic",
    experience: "4 years",
    address: "Plot 34, Rampur Village"
  },
  { 
    id: 7, 
    name: "Vikram Yadav", 
    contact: "9876543276", 
    village: "Rampur",
    crops: ["Wheat", "Barley"], 
    landArea: 6.7, 
    status: "Inactive",
    farmingType: "Traditional",
    experience: "18 years",
    address: "Plot 56, Rampur Village"
  },
  { 
    id: 8, 
    name: "Kavita Joshi", 
    contact: "9876543287", 
    village: "Rampur",
    crops: ["Sugarcane", "Vegetables"], 
    landArea: 3.2, 
    status: "Active",
    farmingType: "Hybrid",
    experience: "10 years",
    address: "Plot 78, Rampur Village"
  }
];

const FarmersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [farmingTypeFilter, setFarmingTypeFilter] = useState('');
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const navigate = useNavigate();

  // Mock pending registration requests from mobile app
  const pendingRequests = [
    {
      id: 'req_001',
      name: 'Ravi Patil',
      contact: '9876509876',
      village: 'Rampur',
      crops: ['Rice', 'Wheat'],
      landArea: 4.5,
      farmingType: 'Organic',
      experience: '7 years',
      address: 'Plot 92, Rampur Village',
      requestDate: '2024-12-08',
      status: 'Pending'
    },
    {
      id: 'req_002',
      name: 'Anita Kumari',
      contact: '9876598765',
      village: 'Rampur',
      crops: ['Cotton', 'Maize'],
      landArea: 3.2,
      farmingType: 'Traditional',
      experience: '5 years',
      address: 'Plot 15, Rampur Village',
      requestDate: '2024-12-07',
      status: 'Pending'
    },
    {
      id: 'req_003',
      name: 'Suresh Reddy',
      contact: '9876587654',
      village: 'Rampur',
      crops: ['Sugarcane'],
      landArea: 6.0,
      farmingType: 'Hybrid',
      experience: '10 years',
      address: 'Plot 44, Rampur Village',
      requestDate: '2024-12-06',
      status: 'Pending'
    }
  ];

  const filteredFarmers = farmersData.filter(farmer => {
    return (
      (searchTerm === '' || 
       farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       farmer.contact.includes(searchTerm) ||
       farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (statusFilter === '' || farmer.status === statusFilter) &&
      (farmingTypeFilter === '' || farmer.farmingType === farmingTypeFilter)
    );
  });

  const handleFarmerClick = (farmer) => {
    navigate('/farmer-detail', { state: { farmer } });
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
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
            <h2 className="text-responsive-3xl font-bold text-green-700">Farmers List - Rampur Village</h2>
          </div>
          <button
            onClick={() => setShowPendingRequests(true)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending Requests ({pendingRequests.length})
          </button>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search farmers, crops, or contact..."
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-responsive-base bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="" className="text-responsive-base">All Status</option>
              <option value="Active" className="text-responsive-base">Active</option>
              <option value="Inactive" className="text-responsive-base">Inactive</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={farmingTypeFilter}
              onChange={(e) => setFarmingTypeFilter(e.target.value)}
            >
              <option value="" className="text-responsive-base">All Farming Types</option>
              <option value="Organic" className="text-responsive-base">Organic</option>
              <option value="Traditional" className="text-responsive-base">Traditional</option>
              <option value="Hybrid" className="text-responsive-base">Hybrid</option>
            </select>
          </div>
        </div>

        

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map(farmer => (
            <div
              key={farmer.id}
              className="bg-gray-100/80 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 border-l-4 border-green-500"
              onClick={() => handleFarmerClick(farmer)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-responsive-xl mr-4">
                  {farmer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-responsive-xl font-bold text-green-700">{farmer.name}</h3>
                  <p className="text-gray-600 text-responsive-sm">{farmer.contact}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Land Area:</span>
                  <span className="font-semibold text-responsive-base">{farmer.landArea} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Experience:</span>
                  <span className="font-semibold text-responsive-base">{farmer.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Farming Type:</span>
                  <span className="font-semibold text-responsive-base">{farmer.farmingType}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-responsive-sm">Crops:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {farmer.crops.map(crop => (
                    <span
                      key={crop}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-responsive-xs font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-responsive-sm font-medium ${
                  farmer.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {farmer.status}
                </span>
                <button className="text-green-600 hover:text-green-800 font-medium text-responsive-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No farmers found matching your criteria.</div>
          </div>
        )}
      </div>

      {/* Pending Registration Requests Modal */}
      {showPendingRequests && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Pending Farmer Registration Requests</h2>
                <p className="text-sm text-gray-600 mt-1">Review and approve farmer registrations from mobile app</p>
              </div>
              <button
                onClick={() => setShowPendingRequests(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 text-lg">No pending requests at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="bg-white border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{request.name}</h3>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Request ID: {request.id} • Submitted: {request.requestDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Contact</p>
                          <p className="text-gray-800">{request.contact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Village</p>
                          <p className="text-gray-800">{request.village}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Land Area</p>
                          <p className="text-gray-800">{request.landArea} hectares</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Farming Type</p>
                          <p className="text-gray-800">{request.farmingType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Experience</p>
                          <p className="text-gray-800">{request.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Address</p>
                          <p className="text-gray-800">{request.address}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Crops</p>
                        <div className="flex flex-wrap gap-2">
                          {request.crops.map((crop) => (
                            <span key={crop} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            if (confirm(`Approve registration for ${request.name}?`)) {
                              alert('API integration pending. Approval will be sent to backend and farmer will be notified via mobile app.');
                            }
                          }}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Reject registration for ${request.name}?`)) {
                              alert('API integration pending. Rejection will be sent to backend and farmer will be notified via mobile app.');
                            }
                          }}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersList;
