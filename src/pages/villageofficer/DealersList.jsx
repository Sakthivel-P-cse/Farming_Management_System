
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dealersData = [
  {
    id: 1,
    name: 'Sharma Agro Dealers',
    contact: '9876541111',
    type: 'Seller',
    address: 'Market Road, Rampur',
    items: ['Tractor', 'Plough', 'Seeds'],
    rating: 4.7
  },
  {
    id: 2,
    name: 'Patel Equipment Rentals',
    contact: '9876542222',
    type: 'Rent Giver',
    address: 'Station Road, Rampur',
    items: ['Tractor', 'Harvester', 'Sprayer'],
    rating: 4.5
  },
  {
    id: 3,
    name: 'Singh Farm Supplies',
    contact: '9876543333',
    type: 'Seller',
    address: 'Main Bazaar, Rampur',
    items: ['Fertilizer', 'Seeds', 'Tools'],
    rating: 4.2
  },
  {
    id: 4,
    name: 'Yadav Rental Services',
    contact: '9876544444',
    type: 'Rent Giver',
    address: 'Near Bus Stand, Rampur',
    items: ['Plough', 'Seeder', 'Tractor'],
    rating: 4.6
  },
  {
    id: 5,
    name: 'Kumar Agricultural Store',
    contact: '9876545555',
    type: 'Seller',
    address: 'Old City Road, Rampur',
    items: ['Pesticides', 'Irrigation', 'Hand Tools'],
    rating: 4.3
  },
  {
    id: 6,
    name: 'Gupta Heavy Machinery Rent',
    contact: '9876546666',
    type: 'Rent Giver',
    address: 'Industrial Area, Rampur',
    items: ['Bulldozer', 'Excavator', 'Crane'],
    rating: 4.8
  },
  {
    id: 7,
    name: 'Verma Seeds & Fertilizer',
    contact: '9876547777',
    type: 'Seller',
    address: 'Agricultural Market, Rampur',
    items: ['Hybrid Seeds', 'Bio-fertilizers', 'Growth Enhancers'],
    rating: 4.4
  },
  {
    id: 8,
    name: 'Modern Farm Equipment Rental',
    contact: '9876548888',
    type: 'Rent Giver',
    address: 'Highway Road, Rampur',
    items: ['Combine Harvester', 'Thresher', 'Power Tiller'],
    rating: 4.7
  }
];

const DealersList = () => {
  const [filterType, setFilterType] = useState('Rent Giver');
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const navigate = useNavigate();

  // Mock pending dealer registration requests from mobile app
  const pendingRequests = [
    {
      id: 'dealer_req_001',
      name: 'Modern Agri Equipment',
      contact: '9876512345',
      type: 'Seller',
      address: 'New Market Road, Rampur',
      items: ['Tractor', 'Cultivator', 'Seed Drill'],
      requestDate: '2024-12-08',
      status: 'Pending'
    },
    {
      id: 'dealer_req_002',
      name: 'Ramesh Rental Services',
      contact: '9876523456',
      type: 'Rent Giver',
      address: 'Gandhi Chowk, Rampur',
      items: ['Harvester', 'Tractor', 'Pump'],
      requestDate: '2024-12-07',
      status: 'Pending'
    }
  ];

  const handleDealerClick = (dealer) => {
    navigate('/dealer-detail', { state: { dealer } });
  };

  const filteredDealers =
    filterType === 'All'
      ? dealersData
      : dealersData.filter((dealer) => dealer.type === filterType);

  return (
      <div className="min-h-screen bg-gray-200 p-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/overview')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Overview"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-responsive-3xl font-bold text-gray-800">Dealers List - Rampur Village</h2>
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
          <div className="flex gap-4 flex-wrap">
            <button
              className={`px-6 py-2 rounded-lg font-semibold text-responsive-base transition-colors duration-150 border ${
                filterType === 'All'
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-green-50 hover:text-green-700'
              }`}
              onClick={() => setFilterType('All')}
            >
              All
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold text-responsive-base transition-colors duration-150 border ${
                filterType === 'Rent Giver'
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-green-50 hover:text-green-700'
              }`}
              onClick={() => setFilterType('Rent Giver')}
            >
              Rent Givers
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold text-responsive-base transition-colors duration-150 border ${
                filterType === 'Seller'
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-green-50 hover:text-green-700'
              }`}
              onClick={() => setFilterType('Seller')}
            >
              Sellers
            </button>
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDealerClick(dealer)}
            >
              {/* Dealer Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-responsive-lg">
                  {dealer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-responsive-lg font-bold text-gray-800">{dealer.name}</h3>
                  <span className={`text-responsive-xs font-medium px-2 py-1 rounded-full ${
                    dealer.type === 'Rent Giver'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {dealer.type}
                  </span>
                </div>
              </div>

              {/* Dealer Info */}
              <div className="space-y-3 mb-4">
                <p className="text-gray-700 text-responsive-sm">
                  <span className="font-semibold text-gray-800">Phone:</span> {dealer.contact}
                </p>
                <p className="text-gray-700 text-responsive-sm">
                  <span className="font-semibold text-gray-800">Address:</span> {dealer.address}
                </p>
                <div>
                  <p className="font-semibold text-gray-800 text-responsive-sm mb-2">Equipments:</p>
                  <div className="flex flex-wrap gap-2">
                    {dealer.items.map((item) => (
                      <span
                        key={item}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-responsive-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="border-t border-gray-300 pt-3">
                <span className="text-responsive-sm font-semibold text-gray-800">Rating: </span>
                <span className="text-yellow-600 text-responsive-base">⭐ {dealer.rating}</span>
              </div>
            </div>
          ))}
        </div>
        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No dealers found for this category.</div>
          </div>
        )}

        {/* Pending Dealer Registration Requests Modal */}
        {showPendingRequests && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Pending Dealer Registration Requests</h2>
                  <p className="text-sm text-gray-600 mt-1">Review and approve dealer registrations from mobile app</p>
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
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.type === 'Seller' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                              }`}>
                                {request.type}
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
                            <p className="text-sm text-gray-600 font-semibold">Address</p>
                            <p className="text-gray-800">{request.address}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 font-semibold mb-2">Items/Services</p>
                          <div className="flex flex-wrap gap-2">
                            {request.items.map((item) => (
                              <span key={item} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => {
                              if (confirm(`Approve registration for ${request.name}?`)) {
                                alert('API integration pending. Approval will be sent to backend and dealer will be notified via mobile app.');
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
                                alert('API integration pending. Rejection will be sent to backend and dealer will be notified via mobile app.');
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

export default DealersList;
