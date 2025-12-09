import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GodownDetails = () => {
  const [sortBy, setSortBy] = useState('name');
  const [filterVariety, setFilterVariety] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // Mock data for crops in godown
  const cropsData = [
    {
      id: 1,
      name: 'Rice',
      varieties: ['Basmati', 'Sona Masoori', 'IR64'],
      totalStock: 5000,
      incomingStock: 1200,
      outgoingStock: 800,
      unit: 'kg',
      suppliers: ['Rajesh Kumar', 'Priya Sharma', 'Amit Verma'],
      buyers: ['AgriMart Traders', 'Green Valley Corp'],
    },
    {
      id: 2,
      name: 'Wheat',
      varieties: ['Durum', 'Common Wheat'],
      totalStock: 3500,
      incomingStock: 600,
      outgoingStock: 900,
      unit: 'kg',
      suppliers: ['Sunita Devi', 'Mohan Lal'],
      buyers: ['City Grain Merchants', 'Royal Flour Mills'],
    },
    {
      id: 3,
      name: 'Maize',
      varieties: ['Sweet Corn', 'Dent Corn'],
      totalStock: 2800,
      incomingStock: 500,
      outgoingStock: 400,
      unit: 'kg',
      suppliers: ['Ramesh Singh', 'Deepak Yadav'],
      buyers: ['Livestock Feed Co'],
    },
    {
      id: 4,
      name: 'Cotton',
      varieties: ['Bt Cotton', 'Organic Cotton'],
      totalStock: 1500,
      incomingStock: 300,
      outgoingStock: 200,
      unit: 'kg',
      suppliers: ['Kavita Singh'],
      buyers: ['Textile Industries Ltd'],
    },
    {
      id: 5,
      name: 'Sugarcane',
      varieties: ['Co 86032', 'Co 0238'],
      totalStock: 4200,
      incomingStock: 800,
      outgoingStock: 1000,
      unit: 'kg',
      suppliers: ['Vikram Patel', 'Anjali Gupta', 'Ravi Reddy'],
      buyers: ['Sugar Mill Corp', 'Sweet Industries'],
    },
    {
      id: 6,
      name: 'Soybean',
      varieties: ['JS 335', 'JS 95-60'],
      totalStock: 1800,
      incomingStock: 400,
      outgoingStock: 300,
      unit: 'kg',
      suppliers: ['Sita Devi', 'Manoj Kumar'],
      buyers: ['Oil Extraction Unit'],
    },
  ];

  // Analytics data
  const analytics = {
    mostUsed: { name: 'Rice', usage: 2400 },
    highDemandLowStock: { name: 'Wheat', stock: 3500, demand: 5000 },
    highStockLowDemand: { name: 'Sugarcane', stock: 4200, demand: 1200 },
  };

  // Sort crops
  const sortedCrops = [...cropsData].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock') return b.totalStock - a.totalStock;
    if (sortBy === 'incoming') return b.incomingStock - a.incomingStock;
    if (sortBy === 'outgoing') return b.outgoingStock - a.outgoingStock;
    return 0;
  });

  // Future backend integration (commented out)
  /*
  useEffect(() => {
    const fetchGodownData = async () => {
      try {
        const response = await axios.get('/api/godown/crops');
        setCropsData(response.data);
      } catch (error) {
        console.error('Error fetching godown data:', error);
      }
    };
    fetchGodownData();
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Godown Details</h1>
            <p className="text-lg text-gray-600">Crop inventory and storage analytics</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Crop Stock
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Most Used Crop */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-700">Most Used Crop</h3>
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">{analytics.mostUsed.name}</p>
          <p className="text-sm text-gray-600 mt-2">{analytics.mostUsed.usage} kg used this month</p>
        </div>

        {/* High Demand Low Stock */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-700">High Demand, Low Stock</h3>
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">{analytics.highDemandLowStock.name}</p>
          <p className="text-sm text-gray-600 mt-2">Stock: {analytics.highDemandLowStock.stock} kg | Demand: {analytics.highDemandLowStock.demand} kg</p>
        </div>

        {/* High Stock Low Demand */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-700">High Stock, Low Demand</h3>
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">{analytics.highStockLowDemand.name}</p>
          <p className="text-sm text-gray-600 mt-2">Stock: {analytics.highStockLowDemand.stock} kg | Demand: {analytics.highStockLowDemand.demand} kg</p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Crop Name</option>
              <option value="stock">Total Stock</option>
              <option value="incoming">Incoming Stock</option>
              <option value="outgoing">Outgoing Stock</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Variety</label>
            <select
              value={filterVariety}
              onChange={(e) => setFilterVariety(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Varieties</option>
              <option value="basmati">Basmati</option>
              <option value="organic">Organic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crops Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Crop Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Varieties</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">Total Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Incoming</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Outgoing</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">Net Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedCrops.map((crop, index) => {
                const netChange = crop.incomingStock - crop.outgoingStock;
                return (
                  <tr key={crop.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-lg">
                            {crop.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800">{crop.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {crop.varieties.map((variety, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {variety}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800">
                      {crop.totalStock.toLocaleString()} {crop.unit}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-green-600 font-medium">
                          +{crop.incomingStock.toLocaleString()} {crop.unit}
                        </p>
                        <div className="text-xs text-gray-600">
                          <p className="font-semibold mb-1">From:</p>
                          {crop.suppliers.map((supplier, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <span>{supplier}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-red-600 font-medium">
                          -{crop.outgoingStock.toLocaleString()} {crop.unit}
                        </p>
                        <div className="text-xs text-gray-600">
                          <p className="font-semibold mb-1">To:</p>
                          {crop.buyers.map((buyer, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                              </svg>
                              <span>{buyer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      <span className={netChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {netChange >= 0 ? '+' : ''}{netChange.toLocaleString()} {crop.unit}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Crops</p>
            <p className="text-3xl font-bold text-gray-800">{cropsData.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Stock</p>
            <p className="text-3xl font-bold text-gray-800">
              {cropsData.reduce((sum, crop) => sum + crop.totalStock, 0).toLocaleString()} kg
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Varieties</p>
            <p className="text-3xl font-bold text-gray-800">
              {cropsData.reduce((sum, crop) => sum + crop.varieties.length, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Add Crop Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add Crop Stock</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Add new crop stock to the godown. API integration pending.
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Crop Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Variety" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="number" placeholder="Quantity (kg)" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Supplier Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('API integration pending. Stock data will be sent to backend.');
                  setShowAddModal(false);
                }}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GodownDetails;
