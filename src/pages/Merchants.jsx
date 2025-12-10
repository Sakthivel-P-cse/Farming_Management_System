import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Merchants = () => {
  const [filterCrop, setFilterCrop] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddModal, setShowAddModal] = useState(false);
  const [merchantsData, setMerchantsData] = useState([
    {
      id: 1,
      name: 'Agarwal Traders',
      crops: ['Rice', 'Wheat', 'Maize'],
      rates: { Rice: 25, Wheat: 22, Maize: 18 },
      quantity: { Rice: 5000, Wheat: 3000, Maize: 2000 },
      contact: '+91 98765 12345',
      location: 'Market Area, District Center',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Sharma Agro Products',
      crops: ['Cotton', 'Soybean'],
      rates: { Cotton: 60, Soybean: 45 },
      quantity: { Cotton: 2500, Soybean: 3500 },
      contact: '+91 98765 23456',
      location: 'Industrial Zone, Block B',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Krishna Commodities',
      crops: ['Rice', 'Cotton', 'Sugarcane'],
      rates: { Rice: 26, Cotton: 62, Sugarcane: 30 },
      quantity: { Rice: 4000, Cotton: 1500, Sugarcane: 5000 },
      contact: '+91 98765 34567',
      location: 'Main Road, City Center',
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Patel Grain Merchants',
      crops: ['Wheat', 'Maize', 'Soybean'],
      rates: { Wheat: 23, Maize: 19, Soybean: 46 },
      quantity: { Wheat: 6000, Maize: 2500, Soybean: 2800 },
      contact: '+91 98765 45678',
      location: 'Agriculture Market Yard',
      rating: 4.3,
    },
    {
      id: 5,
      name: 'Gupta Exports',
      crops: ['Rice', 'Cotton'],
      rates: { Rice: 27, Cotton: 65 },
      quantity: { Rice: 10000, Cotton: 4000 },
      contact: '+91 98765 56789',
      location: 'Export Zone, Highway Road',
      rating: 4.9,
    },
    {
      id: 6,
      name: 'Reddy Farm Produce',
      crops: ['Sugarcane', 'Maize'],
      rates: { Sugarcane: 28, Maize: 17 },
      quantity: { Sugarcane: 8000, Maize: 3000 },
      contact: '+91 98765 67890',
      location: 'Village Road, Block C',
      rating: 4.2,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    crops: [],
    contact: '',
    location: '',
    rates: {},
    quantity: {},
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle crop selection
  const handleCropToggle = (crop) => {
    const updatedCrops = formData.crops.includes(crop)
      ? formData.crops.filter(c => c !== crop)
      : [...formData.crops, crop];
    setFormData({
      ...formData,
      crops: updatedCrops,
      rates: {},
      quantity: {},
    });
  };

  // Handle rate input
  const handleRateChange = (crop, value) => {
    setFormData({
      ...formData,
      rates: {
        ...formData.rates,
        [crop]: parseFloat(value) || 0,
      },
    });
  };

  // Handle quantity input
  const handleQuantityChange = (crop, value) => {
    setFormData({
      ...formData,
      quantity: {
        ...formData.quantity,
        [crop]: parseFloat(value) || 0,
      },
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Please enter merchant name');
      return;
    }
    if (formData.crops.length === 0) {
      alert('Please select at least one crop');
      return;
    }
    if (!formData.contact.trim()) {
      alert('Please enter contact information');
      return;
    }
    if (!formData.location.trim()) {
      alert('Please enter location');
      return;
    }

    // Check if all crops have rates and quantities
    const missingData = formData.crops.some(
      crop => !formData.rates[crop] || !formData.quantity[crop]
    );
    if (missingData) {
      alert('Please enter rates and quantities for all selected crops');
      return;
    }

    // Create new merchant object
    const newMerchant = {
      id: Math.max(...merchantsData.map(m => m.id), 0) + 1,
      ...formData,
      rating: 4.5, // Default rating for new merchants
    };

    // Add to merchants list
    setMerchantsData([...merchantsData, newMerchant]);

    // Reset form and close modal
    setFormData({
      name: '',
      crops: [],
      contact: '',
      location: '',
      rates: {},
      quantity: {},
    });
    setShowAddModal(false);
    alert('Merchant added successfully!');
  };

  // Available crops
  const availableCrops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Soybean', 'Sugarcane'];

  // Filter merchants
  const filteredMerchants = merchantsData.filter((merchant) => {
    if (filterCrop === 'all') return true;
    return merchant.crops.includes(filterCrop);
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

  // Get highest price for a crop
  const getHighestPriceForCrop = (crop) => {
    const prices = merchantsData
      .filter((m) => m.crops.includes(crop))
      .map((m) => m.rates[crop]);
    return Math.max(...prices);
  };

  // Future backend integration (commented out)
  /*
  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get('/api/merchants');
        setMerchantsData(response.data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };
    fetchMerchants();
  }, []);
  */

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Merchants</h1>
            <p className="text-lg text-gray-600">Browse merchants and their buying rates</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Merchant
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Crop</label>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Crops</option>
              {availableCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Merchant Name</option>
              <option value="rating">Highest Rating</option>
              <option value="highest-price">Highest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Merchants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMerchants.map((merchant) => (
          <div key={merchant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
            {/* Merchant Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold">{merchant.name}</h3>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-semibold">{merchant.rating}</span>
                </div>
              </div>
              <p className="text-sm text-green-100">📍 {merchant.location}</p>
            </div>

            {/* Merchant Body */}
            <div className="p-6 flex flex-col flex-1">
              {/* Crops Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Crops Buying:</h4>
                <div className="flex flex-wrap gap-2">
                  {merchant.crops.map((crop) => (
                    <span
                      key={crop}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rates Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Buying Rates (₹/kg):</h4>
                <div className="space-y-2">
                  {merchant.crops.map((crop) => (
                    <div key={crop} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{crop}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">₹{merchant.rates[crop]}</span>
                        {merchant.rates[crop] === getHighestPriceForCrop(crop) && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                            Highest
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Quantity Needed (kg):</h4>
                <div className="grid grid-cols-2 gap-2">
                  {merchant.crops.map((crop) => (
                    <div key={crop} className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-xs text-gray-600">{crop}</p>
                      <p className="text-sm font-bold text-blue-600">{merchant.quantity[crop].toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Button at Bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{merchant.contact}</span>
                </div>
                <button className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Contact Merchant
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Merchant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Merchant</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Merchant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Merchant Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter merchant name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact *</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="+91 98765 12345"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Crops Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Crops *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableCrops.map(crop => (
                    <label key={crop} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.crops.includes(crop)}
                        onChange={() => handleCropToggle(crop)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rates and Quantities for Selected Crops */}
              {formData.crops.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Set Rates & Quantities</h3>
                  <div className="space-y-3">
                    {formData.crops.map(crop => (
                      <div key={crop} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">{crop} Rate (₹/unit) *</label>
                          <input
                            type="number"
                            value={formData.rates[crop] || ''}
                            onChange={(e) => handleRateChange(crop, e.target.value)}
                            placeholder="Enter rate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">{crop} Quantity (units) *</label>
                          <input
                            type="number"
                            value={formData.quantity[crop] || ''}
                            onChange={(e) => handleQuantityChange(crop, e.target.value)}
                            placeholder="Enter quantity"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchants;
