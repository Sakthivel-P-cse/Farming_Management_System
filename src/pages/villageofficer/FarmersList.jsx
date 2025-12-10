import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingRequestsByType } from '../../services/pendingRequestService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const FarmersList = () => {
  const [farmersData] = useState([
    { id: 1, name: 'Rajesh Kumar', contact: '9876543210', village: 'Rampur', crops: ['Wheat', 'Rice'], landArea: 5.5, status: 'Active', farmingType: 'Organic', address: 'Plot 45, Rampur Village' },
    { id: 2, name: 'Priya Sharma', contact: '9876543211', village: 'Rampur', crops: ['Cotton', 'Sugarcane'], landArea: 3.2, status: 'Active', farmingType: 'Traditional', address: 'Plot 12, Rampur Village' },
    { id: 3, name: 'Amit Patel', contact: '9876543212', village: 'Rampur', crops: ['Rice', 'Vegetables'], landArea: 4.0, status: 'Active', farmingType: 'Hybrid', address: 'Plot 78, Rampur Village' },
    { id: 4, name: 'Sunita Devi', contact: '9876543213', village: 'Rampur', crops: ['Wheat', 'Mustard'], landArea: 6.8, status: 'Inactive', farmingType: 'Organic', address: 'Plot 23, Rampur Village' },
    { id: 5, name: 'Ramesh Singh', contact: '9876543214', village: 'Rampur', crops: ['Sugarcane', 'Cotton'], landArea: 7.5, status: 'Active', farmingType: 'Traditional', address: 'Plot 56, Rampur Village' },
    { id: 6, name: 'Deepak Yadav', contact: '9876543215', village: 'Rampur', crops: ['Vegetables', 'Fruits'], landArea: 2.3, status: 'Active', farmingType: 'Organic', address: 'Plot 89, Rampur Village' },
    { id: 7, name: 'Kavita Singh', contact: '9876543216', village: 'Rampur', crops: ['Rice', 'Wheat'], landArea: 5.0, status: 'Active', farmingType: 'Hybrid', address: 'Plot 34, Rampur Village' },
    { id: 8, name: 'Mohan Lal', contact: '9876543217', village: 'Rampur', crops: ['Cotton', 'Maize'], landArea: 4.5, status: 'Inactive', farmingType: 'Traditional', address: 'Plot 67, Rampur Village' },
    { id: 9, name: 'Arjun Verma', contact: '9876543218', village: 'Rampur', crops: ['Tomatoes', 'Chili', 'Onions'], landArea: 3.5, status: 'Active', farmingType: 'Organic', address: 'Plot 91, Rampur Village' },
    { id: 10, name: 'Deepa Nair', contact: '9876543219', village: 'Rampur', crops: ['Groundnut', 'Soybean'], landArea: 4.2, status: 'Active', farmingType: 'Traditional', address: 'Plot 105, Rampur Village' },
    { id: 11, name: 'Satish Reddy', contact: '9876543220', village: 'Rampur', crops: ['Mango', 'Coconut'], landArea: 6.0, status: 'Active', farmingType: 'Organic', address: 'Plot 118, Rampur Village' },
    { id: 12, name: 'Lakshmi Iyer', contact: '9876543221', village: 'Rampur', crops: ['Rice', 'Turmeric'], landArea: 3.8, status: 'Active', farmingType: 'Traditional', address: 'Plot 132, Rampur Village' },
    { id: 13, name: 'Mohan Das', contact: '9876543222', village: 'Rampur', crops: ['Coffee', 'Cardamom'], landArea: 5.5, status: 'Inactive', farmingType: 'Hybrid', address: 'Plot 145, Rampur Village' },
    { id: 14, name: 'Neha Kapoor', contact: '9876543223', village: 'Rampur', crops: ['Strawberry', 'Lettuce'], landArea: 2.1, status: 'Active', farmingType: 'Organic', address: 'Plot 158, Rampur Village' },
    { id: 15, name: 'Harish Bose', contact: '9876543224', village: 'Rampur', crops: ['Mustard', 'Wheat'], landArea: 4.7, status: 'Active', farmingType: 'Traditional', address: 'Plot 171, Rampur Village' },
    { id: 16, name: 'Anjali Menon', contact: '9876543225', village: 'Rampur', crops: ['Banana', 'Papaya'], landArea: 3.3, status: 'Active', farmingType: 'Organic', address: 'Plot 184, Rampur Village' },
    { id: 17, name: 'Kiran Desai', contact: '9876543226', village: 'Rampur', crops: ['Grapes', 'Pomegranate'], landArea: 5.2, status: 'Inactive', farmingType: 'Hybrid', address: 'Plot 197, Rampur Village' },
    { id: 18, name: 'Ramesh Pillai', contact: '9876543227', village: 'Rampur', crops: ['Cashew', 'Rubber'], landArea: 7.0, status: 'Active', farmingType: 'Traditional', address: 'Plot 210, Rampur Village' }
  ]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [farmingTypeFilter, setFarmingTypeFilter] = useState('');
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const navigate = useNavigate();

  // Fetch pending requests from Firebase
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const requests = await getPendingRequestsByType('farmer');
        console.log('Fetched pending requests:', requests);
        setPendingRequests(requests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showPendingRequests) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPendingRequests]);

  // Handle approve request
  const handleApproveRequest = async (requestId) => {
    try {
      const docRef = doc(db, 'users', requestId);
      await updateDoc(docRef, {
        'profile.approvalStatus': 'approved',
        updatedAt: new Date().toISOString()
      });
      // Refresh pending requests
      const requests = await getPendingRequestsByType('farmer');
      setPendingRequests(requests);
      alert('Farmer request approved successfully!');
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request. Please try again.');
    }
  };

  // Handle reject request
  const handleRejectRequest = async (requestId) => {
    try {
      const docRef = doc(db, 'users', requestId);
      await updateDoc(docRef, {
        'profile.approvalStatus': 'rejected',
        updatedAt: new Date().toISOString()
      });
      // Refresh pending requests
      const requests = await getPendingRequestsByType('farmer');
      setPendingRequests(requests);
      alert('Farmer request rejected.');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Error rejecting request. Please try again.');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading farmers...</p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-responsive-3xl font-bold text-gray-900">Farmers List - Rampur Village</h2>
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
        <div className="fixed top-4 right-4 z-50 w-[600px] max-h-[calc(100vh-2rem)] flex flex-col">
          <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-300 flex flex-col max-h-full overflow-hidden">
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
            
            <div className="p-6 overflow-y-auto flex-1">
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
                          <p className="text-sm text-gray-600 font-semibold">Email</p>
                          <p className="text-gray-800 text-sm">{request.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Village</p>
                          <p className="text-gray-800">{request.village}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">District / State</p>
                          <p className="text-gray-800">{request.district}, {request.state}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Land Area</p>
                          <p className="text-gray-800">{request.landArea} {request.landAreaUnit || 'acres'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Soil Type</p>
                          <p className="text-gray-800">{request.soilType || request.farmingType}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Primary & Secondary Crops</p>
                        <div className="flex flex-wrap gap-2">
                          {request.crops.map((crop) => (
                            <span key={crop} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      {request.documentUrl && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 font-semibold mb-2">Document ({request.documentType || 'Land Record'})</p>
                          <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                            <a
                              href={request.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>View Document (Pautta)</span>
                            </a>
                            <img
                              src={request.documentUrl}
                              alt="Document preview"
                              className="mt-2 max-w-full h-auto rounded border border-gray-200 cursor-pointer hover:opacity-90"
                              onClick={() => window.open(request.documentUrl, '_blank')}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            if (confirm(`Approve registration for ${request.name}?`)) {
                              handleApproveRequest(request.id);
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
                              handleRejectRequest(request.id);
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
