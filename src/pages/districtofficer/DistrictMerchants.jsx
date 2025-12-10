import React, { useState } from 'react';

// Aggregated merchants data from all villages
const allMerchantsData = [
  // District-wide merchants
  {
    id: 1,
    name: 'Agarwal Traders',
    email: 'agarwal.traders@gmail.com',
    crops: ['Rice', 'Wheat', 'Maize'],
    rates: { Rice: 25, Wheat: 22, Maize: 18 },
    quantity: { Rice: 5000, Wheat: 3000, Maize: 2000 },
    contact: '+91 98765 12345',
    location: 'Market Area, District Center',
    rating: 4.5,
    villages: ['Rampur', 'Lakshmi Nagar', 'Shanti Puram']
  },
  {
    id: 2,
    name: 'Sharma Agro Products',
    email: 'sharma.agro@gmail.com',
    crops: ['Cotton', 'Soybean'],
    rates: { Cotton: 60, Soybean: 45 },
    quantity: { Cotton: 2500, Soybean: 3500 },
    contact: '+91 98765 23456',
    location: 'Industrial Zone, Block B',
    rating: 4.8,
    villages: ['Shanti Puram', 'Green Valley']
  },
  {
    id: 3,
    name: 'Krishna Commodities',
    email: 'krishna.commodities@gmail.com',
    crops: ['Rice', 'Cotton', 'Sugarcane'],
    rates: { Rice: 26, Cotton: 62, Sugarcane: 30 },
    quantity: { Rice: 4000, Cotton: 1500, Sugarcane: 5000 },
    contact: '+91 98765 34567',
    location: 'Main Road, City Center',
    rating: 4.6,
    villages: ['Ganga Pur', 'Rampur', 'Lakshmi Nagar']
  },
  {
    id: 4,
    name: 'Patel Grain Merchants',
    email: 'patel.merchants@gmail.com',
    crops: ['Wheat', 'Maize', 'Soybean'],
    rates: { Wheat: 23, Maize: 19, Soybean: 46 },
    quantity: { Wheat: 6000, Maize: 2500, Soybean: 2800 },
    contact: '+91 98765 45678',
    location: 'Agriculture Market Yard',
    rating: 4.3,
    villages: ['Rampur', 'Green Valley', 'Ganga Pur']
  },
  {
    id: 5,
    name: 'Gupta Exports',
    email: 'gupta.exports@gmail.com',
    crops: ['Rice', 'Cotton'],
    rates: { Rice: 27, Cotton: 65 },
    quantity: { Rice: 10000, Cotton: 4000 },
    contact: '+91 98765 56789',
    location: 'Export Zone, Highway Road',
    rating: 4.9,
    villages: ['All District']
  },
  {
    id: 6,
    name: 'Reddy Farm Produce',
    email: 'reddy.produce@gmail.com',
    crops: ['Sugarcane', 'Maize'],
    rates: { Sugarcane: 28, Maize: 17 },
    quantity: { Sugarcane: 8000, Maize: 3000 },
    contact: '+91 98765 67890',
    location: 'Village Road, Block C',
    rating: 4.2,
    villages: ['Lakshmi Nagar', 'Shanti Puram']
  },
  {
    id: 7,
    name: 'Singh & Sons Trading',
    email: 'singh.sons@gmail.com',
    crops: ['Paddy', 'Wheat', 'Millet'],
    rates: { Paddy: 24, Wheat: 21, Millet: 20 },
    quantity: { Paddy: 3500, Wheat: 4500, Millet: 2000 },
    contact: '+91 98765 78901',
    location: 'Old Market, District HQ',
    rating: 4.4,
    villages: ['Shanti Puram', 'Green Valley', 'Ganga Pur']
  },
  {
    id: 8,
    name: 'Verma Agri Business',
    email: 'verma.agri@gmail.com',
    crops: ['Barley', 'Millet', 'Wheat'],
    rates: { Barley: 18, Millet: 19, Wheat: 22 },
    quantity: { Barley: 2000, Millet: 1500, Wheat: 3000 },
    contact: '+91 98765 89012',
    location: 'New Market Complex',
    rating: 4.1,
    villages: ['Green Valley', 'Rampur']
  },
];

const allCrops = [...new Set(allMerchantsData.flatMap((m) => m.crops))];

const DistrictMerchants = () => {
  const [filterCrop, setFilterCrop] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  // Filter merchants
  const filteredMerchants = allMerchantsData.filter((merchant) => {
    const matchesCrop = filterCrop === 'all' || merchant.crops.includes(filterCrop);
    const matchesSearch = searchTerm === '' || 
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  // Sort merchants
  const sortedMerchants = [...filteredMerchants].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'highest-price') {
      const maxPriceA = Math.max(...Object.values(a.rates));
      const maxPriceB = Math.max(...Object.values(b.rates));
      return maxPriceB - maxPriceA;
    }
    return 0;
  });

  // Statistics
  const totalMerchants = allMerchantsData.length;
  const avgRating = (allMerchantsData.reduce((sum, m) => sum + m.rating, 0) / allMerchantsData.length).toFixed(1);
  const totalCropsTraded = allCrops.length;

  // Get highest price for a crop
  const getHighestPriceForCrop = (crop) => {
    const prices = allMerchantsData
      .filter((m) => m.crops.includes(crop))
      .map((m) => m.rates[crop]);
    return Math.max(...prices);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">All Merchants - District Overview</h2>
        </div>

        {/* Best Prices Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Best Market Prices (₹/kg)</h3>
          <div className="flex flex-wrap gap-3">
            {allCrops.map((crop) => (
              <div key={crop} className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <span className="text-gray-700 font-medium">{crop}:</span>
                <span className="text-green-700 font-bold ml-2">₹{getHighestPriceForCrop(crop)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search merchants..."
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-responsive-base bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
            >
              <option value="all">All Crops</option>
              {allCrops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-responsive-base bg-gray-50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
              <option value="highest-price">Sort by Highest Price</option>
            </select>
          </div>
        </div>

        {/* Merchants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="bg-gray-100/80 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-l-4 border-teal-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center text-teal-700 font-bold text-responsive-xl mr-4">
                    {merchant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-responsive-lg font-bold text-gray-800">{merchant.name}</h3>
                    <p className="text-gray-500 text-responsive-sm">{merchant.location}</p>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                  <span className="text-yellow-600 mr-1">⭐</span>
                  <span className="font-bold text-yellow-700">{merchant.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-responsive-sm font-medium">Crops & Rates:</span>
                <div className="mt-2 space-y-1">
                  {merchant.crops.map((crop) => (
                    <div key={crop} className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded">
                      <span className="text-gray-700">{crop}</span>
                      <span className="font-bold text-green-700">₹{merchant.rates[crop]}/kg</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-responsive-sm">Operates in:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {merchant.villages.map((village) => (
                    <span
                      key={village}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-responsive-xs font-medium"
                    >
                      {village}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-gray-500 text-responsive-sm">{merchant.contact}</span>
                <button 
                  onClick={() => setSelectedMerchant(merchant)}
                  className="text-teal-600 hover:text-teal-800 font-medium text-responsive-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedMerchants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No merchants found matching your criteria.</div>
          </div>
        )}

        {/* Merchant Details Modal */}
        {selectedMerchant && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4" onClick={() => setSelectedMerchant(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedMerchant.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedMerchant.name}</h2>
                      <p className="text-teal-100">{selectedMerchant.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMerchant(null)}
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
                {/* Rating Badge */}
                <div className="mb-6">
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center gap-2 w-fit">
                    <span>⭐</span> {selectedMerchant.rating} Rating
                  </span>
                </div>

                {/* Contact & Location Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-800">{selectedMerchant.contact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Location</p>
                        <p className="font-semibold text-gray-800">{selectedMerchant.location}</p>
                      </div>
                      {selectedMerchant.email && (
                        <div>
                          <p className="text-xs text-gray-600">Email</p>
                          <p className="font-semibold text-teal-600">{selectedMerchant.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Crops Traded</p>
                        <p className="font-semibold text-gray-800">{selectedMerchant.crops.length} types</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Rating</p>
                        <p className="font-semibold text-yellow-600">⭐ {selectedMerchant.rating} / 5.0</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Villages Served</p>
                        <p className="font-semibold text-teal-700">{selectedMerchant.villages.length} villages</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Crops & Rates */}
                <div className="bg-green-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Crops & Market Rates (₹/kg)</h3>
                  <div className="space-y-2">
                    {selectedMerchant.crops.map((crop) => (
                      <div key={crop} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-800">{crop}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Rate: <span className="font-bold text-green-700">₹{selectedMerchant.rates[crop]}</span></span>
                          <span className="text-sm text-gray-600">Qty: <span className="font-bold text-blue-700">{selectedMerchant.quantity[crop]} kg</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Villages Served */}
                <div className="bg-blue-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Operating Villages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMerchant.villages.map((village) => (
                      <span
                        key={village}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {village}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedMerchant.contact}`}
                    className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Merchant
                  </button>
                  {selectedMerchant.email && (
                    <button 
                      onClick={() => window.location.href = `mailto:${selectedMerchant.email}`}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedMerchant(null)}
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

export default DistrictMerchants;
