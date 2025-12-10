import React, { useState } from 'react';

// Aggregated godown data from all villages
const allGodownsData = [
  // Rampur Village Godowns
  {
    id: 1,
    name: 'Rampur Central Godown',
    village: 'Rampur',
    capacity: 5000,
    currentStock: 3200,
    crops: ['Wheat', 'Rice', 'Maize'],
    manager: 'Suresh Kumar',
    contact: '9876500001',
    address: 'Industrial Area, Rampur',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Rampur Cold Storage',
    village: 'Rampur',
    capacity: 2000,
    currentStock: 1500,
    crops: ['Vegetables', 'Fruits'],
    manager: 'Anita Sharma',
    contact: '9876500002',
    address: 'Market Road, Rampur',
    status: 'Active'
  },
  // Lakshmi Nagar Village Godowns
  {
    id: 3,
    name: 'Lakshmi Nagar Warehouse',
    village: 'Lakshmi Nagar',
    capacity: 4000,
    currentStock: 2800,
    crops: ['Sugarcane', 'Maize'],
    manager: 'Raj Patel',
    contact: '9876500003',
    address: 'Highway Road, Lakshmi Nagar',
    status: 'Active'
  },
  // Shanti Puram Village Godowns
  {
    id: 4,
    name: 'Shanti Puram Main Godown',
    village: 'Shanti Puram',
    capacity: 6000,
    currentStock: 4500,
    crops: ['Paddy', 'Cotton', 'Wheat'],
    manager: 'Vikram Singh',
    contact: '9876500004',
    address: 'Village Center, Shanti Puram',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Shanti Puram Cotton Storage',
    village: 'Shanti Puram',
    capacity: 3000,
    currentStock: 2100,
    crops: ['Cotton'],
    manager: 'Meera Devi',
    contact: '9876500005',
    address: 'Mill Road, Shanti Puram',
    status: 'Active'
  },
  // Green Valley Village Godowns
  {
    id: 6,
    name: 'Green Valley Storage',
    village: 'Green Valley',
    capacity: 3500,
    currentStock: 1800,
    crops: ['Millet', 'Barley'],
    manager: 'Arun Verma',
    contact: '9876500006',
    address: 'Farm Road, Green Valley',
    status: 'Active'
  },
  // Ganga Pur Village Godowns
  {
    id: 7,
    name: 'Ganga Pur Central Warehouse',
    village: 'Ganga Pur',
    capacity: 7000,
    currentStock: 5200,
    crops: ['Wheat', 'Sugarcane', 'Rice'],
    manager: 'Mohan Das',
    contact: '9876500007',
    address: 'Main Road, Ganga Pur',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Ganga Pur Cold Storage',
    village: 'Ganga Pur',
    capacity: 2500,
    currentStock: 800,
    crops: ['Vegetables', 'Fruits'],
    manager: 'Lakshmi Bai',
    contact: '9876500008',
    address: 'Market Area, Ganga Pur',
    status: 'Under Maintenance'
  },
];

const villages = ["All Villages", "Rampur", "Lakshmi Nagar", "Shanti Puram", "Green Valley", "Ganga Pur"];

const DistrictGodowns = () => {
  const [villageFilter, setVillageFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGodown, setSelectedGodown] = useState(null);

  const filteredGodowns = allGodownsData.filter(godown => {
    return (
      (searchTerm === '' || 
       godown.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       godown.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
       godown.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (villageFilter === '' || villageFilter === 'All Villages' || godown.village === villageFilter)
    );
  });

  // Statistics
  const totalGodowns = allGodownsData.length;
  const totalCapacity = allGodownsData.reduce((sum, g) => sum + g.capacity, 0);
  const totalStock = allGodownsData.reduce((sum, g) => sum + g.currentStock, 0);
  const utilizationRate = ((totalStock / totalCapacity) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">All Godowns - District Overview</h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium">Total Godowns</h3>
            <p className="text-2xl font-bold text-green-700">{totalGodowns}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-sm font-medium">Total Capacity</h3>
            <p className="text-2xl font-bold text-blue-700">{totalCapacity.toLocaleString()} quintals</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm font-medium">Current Stock</h3>
            <p className="text-2xl font-bold text-yellow-700">{totalStock.toLocaleString()} quintals</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <h3 className="text-gray-600 text-sm font-medium">Utilization Rate</h3>
            <p className="text-2xl font-bold text-purple-700">{utilizationRate}%</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search godowns, managers, crops..."
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
          </div>
        </div>

        {/* Godowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGodowns.map(godown => {
            const utilization = ((godown.currentStock / godown.capacity) * 100).toFixed(1);
            const utilizationColor = utilization > 80 ? 'text-red-600' : utilization > 50 ? 'text-yellow-600' : 'text-green-600';
            
            return (
              <div
                key={godown.id}
                className="bg-gray-100/80 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-l-4 border-orange-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-responsive-lg font-bold text-gray-800">{godown.name}</h3>
                    <p className="text-green-600 text-responsive-sm font-medium">{godown.village}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-responsive-xs font-medium ${
                    godown.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {godown.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-responsive-base">Capacity:</span>
                    <span className="font-semibold text-responsive-base">{godown.capacity.toLocaleString()} quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-responsive-base">Current Stock:</span>
                    <span className="font-semibold text-responsive-base">{godown.currentStock.toLocaleString()} quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-responsive-base">Utilization:</span>
                    <span className={`font-semibold text-responsive-base ${utilizationColor}`}>{utilization}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${utilization > 80 ? 'bg-red-500' : utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  ></div>
                </div>

                <div className="mb-4">
                  <span className="text-gray-600 text-responsive-sm">Crops Stored:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {godown.crops.map(crop => (
                      <span
                        key={crop}
                        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-responsive-xs font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-responsive-xs">Manager</p>
                      <p className="font-medium text-responsive-sm">{godown.manager}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedGodown(godown)}
                      className="text-orange-600 hover:text-orange-800 font-medium text-responsive-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGodowns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-responsive-lg">No godowns found matching your criteria.</div>
          </div>
        )}

        {/* Godown Details Modal */}
        {selectedGodown && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4" onClick={() => setSelectedGodown(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedGodown.name}</h2>
                    <p className="text-orange-100">{selectedGodown.village}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedGodown(null)}
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
                <div className="mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedGodown.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {selectedGodown.status}
                  </span>
                </div>

                {/* Capacity Overview */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Storage Capacity Overview</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-2xl font-bold text-blue-600">{selectedGodown.capacity.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Total Capacity (quintals)</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-2xl font-bold text-green-600">{selectedGodown.currentStock.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Current Stock (quintals)</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                      <p className={`text-2xl font-bold ${
                        ((selectedGodown.currentStock / selectedGodown.capacity) * 100) > 80 ? 'text-red-600' :
                        ((selectedGodown.currentStock / selectedGodown.capacity) * 100) > 50 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {((selectedGodown.currentStock / selectedGodown.capacity) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-600">Utilization</p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${(
                        (selectedGodown.currentStock / selectedGodown.capacity) * 100) > 80 ? 'bg-red-500' :
                        ((selectedGodown.currentStock / selectedGodown.capacity) * 100) > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(((selectedGodown.currentStock / selectedGodown.capacity) * 100), 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Available Space: {(selectedGodown.capacity - selectedGodown.currentStock).toLocaleString()} quintals
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Location & Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600">Address</p>
                        <p className="font-semibold text-gray-800">{selectedGodown.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Village</p>
                        <p className="font-semibold text-green-700">{selectedGodown.village}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Manager</p>
                        <p className="font-semibold text-gray-800">{selectedGodown.manager}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Contact</p>
                        <p className="font-semibold text-gray-800">{selectedGodown.contact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Crops Stored</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedGodown.crops.map((crop, index) => (
                        <span
                          key={index}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-600">Total Crop Types</p>
                      <p className="text-2xl font-bold text-orange-700">{selectedGodown.crops.length}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${selectedGodown.contact}`}
                    className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Manager
                  </button>
                  <button 
                    onClick={() => setSelectedGodown(null)}
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

export default DistrictGodowns;
