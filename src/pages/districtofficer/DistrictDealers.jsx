import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Aggregated dealers data from all villages
const allDealersData = [
  // Rampur Village
  { id: 1, name: 'Sharma Agro Dealers', contact: '9876541111', email: 'sharma.agro@gmail.com', village: 'Rampur', type: 'Seller', address: 'Market Road, Rampur', items: ['Tractor', 'Plough', 'Seeds'], rating: 4.7 },
  { id: 2, name: 'Patel Equipment Rentals', contact: '9876542222', email: 'patel.rentals@gmail.com', village: 'Rampur', type: 'Rent Giver', address: 'Station Road, Rampur', items: ['Tractor', 'Harvester', 'Sprayer'], rating: 4.5 },
  { id: 3, name: 'Singh Farm Supplies', contact: '9876543333', email: 'singh.supplies@gmail.com', village: 'Rampur', type: 'Seller', address: 'Main Bazaar, Rampur', items: ['Fertilizer', 'Seeds', 'Tools'], rating: 4.2 },
  // Lakshmi Nagar Village
  { id: 4, name: 'Lakshmi Agro Services', contact: '9876544444', email: 'lakshmi.agro@gmail.com', village: 'Lakshmi Nagar', type: 'Rent Giver', address: 'Main Road, Lakshmi Nagar', items: ['Tractor', 'Cultivator', 'Sprayer'], rating: 4.6 },
  { id: 5, name: 'Nagar Farm Store', contact: '9876545555', email: 'nagar.store@gmail.com', village: 'Lakshmi Nagar', type: 'Seller', address: 'Market Area, Lakshmi Nagar', items: ['Seeds', 'Fertilizer', 'Pesticides'], rating: 4.3 },
  // Shanti Puram Village
  { id: 6, name: 'Shanti Equipment Hub', contact: '9876546666', email: 'shanti.hub@gmail.com', village: 'Shanti Puram', type: 'Rent Giver', address: 'Industrial Area, Shanti Puram', items: ['Harvester', 'Thresher', 'Tractor'], rating: 4.8 },
  { id: 7, name: 'Puram Agri Supplies', contact: '9876547777', email: 'puram.supplies@gmail.com', village: 'Shanti Puram', type: 'Seller', address: 'Village Center, Shanti Puram', items: ['Seeds', 'Tools', 'Irrigation'], rating: 4.4 },
  // Green Valley Village
  { id: 8, name: 'Valley Farm Equipment', contact: '9876548888', email: 'valley.equipment@gmail.com', village: 'Green Valley', type: 'Rent Giver', address: 'Highway Road, Green Valley', items: ['Tractor', 'Plough', 'Seeder'], rating: 4.5 },
  { id: 9, name: 'Green Agri Store', contact: '9876549999', email: 'green.store@gmail.com', village: 'Green Valley', type: 'Seller', address: 'Market Square, Green Valley', items: ['Fertilizer', 'Seeds', 'Pesticides'], rating: 4.1 },
  // Ganga Pur Village
  { id: 10, name: 'Ganga Farm Rentals', contact: '9876550000', email: 'ganga.rentals@gmail.com', village: 'Ganga Pur', type: 'Rent Giver', address: 'Near Temple, Ganga Pur', items: ['Harvester', 'Tractor', 'Sprayer'], rating: 4.7 },
  { id: 11, name: 'Pur Agro Dealers', contact: '9876551111', email: 'pur.dealers@gmail.com', village: 'Ganga Pur', type: 'Seller', address: 'Main Market, Ganga Pur', items: ['Seeds', 'Fertilizer', 'Tools'], rating: 4.2 },
];

const villages = ["All Villages", "Rampur", "Lakshmi Nagar", "Shanti Puram", "Green Valley", "Ganga Pur"];

const DistrictDealers = () => {
  const [filterType, setFilterType] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(null);
  const navigate = useNavigate();

  const filteredDealers = allDealersData.filter(dealer => {
    return (
      (searchTerm === '' || 
       dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       dealer.contact.includes(searchTerm) ||
       dealer.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (filterType === '' || dealer.type === filterType) &&
      (villageFilter === '' || villageFilter === 'All Villages' || dealer.village === villageFilter)
    );
  });

  // Statistics
  const totalDealers = allDealersData.length;

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">All Dealers - District Overview</h2>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search dealers, items..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Seller">Sellers</option>
              <option value="Rent Giver">Rent Givers</option>
            </select>
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map(dealer => (
            <div
              key={dealer.id}
              className="bg-gray-100/80 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-responsive-xl mr-4">
                  {dealer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-responsive-lg font-bold text-blue-700">{dealer.name}</h3>
                  <p className="text-gray-600 text-responsive-sm">{dealer.contact}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Village:</span>
                  <span className="font-semibold text-responsive-base text-green-600">{dealer.village}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Type:</span>
                  <span className={`font-semibold text-responsive-base ${dealer.type === 'Seller' ? 'text-purple-600' : 'text-orange-600'}`}>
                    {dealer.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-responsive-base">Rating:</span>
                  <span className="font-semibold text-responsive-base">⭐ {dealer.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-responsive-sm">Items/Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dealer.items.map(item => (
                    <span
                      key={item}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-responsive-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-responsive-sm truncate max-w-[60%]">{dealer.address}</span>
                <button 
                  onClick={() => setSelectedDealer(dealer)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-responsive-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No dealers found matching your criteria.</div>
          </div>
        )}

        {/* Dealer Details Modal */}
        {selectedDealer && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4" onClick={() => setSelectedDealer(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                      {selectedDealer.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedDealer.name}</h2>
                      <p className="text-blue-100">{selectedDealer.type}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDealer(null)}
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
                {/* Type Badge */}
                <div className="mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedDealer.type === 'Seller' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedDealer.type}
                  </span>
                  <span className="ml-3 text-yellow-600 text-lg font-semibold">
                    ⭐ {selectedDealer.rating} Rating
                  </span>
                </div>

                {/* Contact & Location Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Contact Number</p>
                        <p className="font-semibold text-gray-800">{selectedDealer.contact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Address</p>
                        <p className="font-semibold text-gray-800">{selectedDealer.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Village</p>
                        <p className="font-semibold text-green-700">{selectedDealer.village}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Business Type</p>
                        <p className="font-semibold text-gray-800">{selectedDealer.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Customer Rating</p>
                        <p className="font-semibold text-yellow-600">⭐ {selectedDealer.rating} / 5.0</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total Products/Services</p>
                        <p className="font-semibold text-gray-800">{selectedDealer.items.length} items</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items/Services */}
                <div className="bg-blue-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Items/Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDealer.items.map((item, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedDealer.contact}`}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Dealer
                  </button>
                  {selectedDealer.email && (
                    <button 
                      onClick={() => window.location.href = `mailto:${selectedDealer.email}`}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedDealer(null)}
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

export default DistrictDealers;
