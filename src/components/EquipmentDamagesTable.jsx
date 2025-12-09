import React, { useState, useMemo } from 'react';
import { formatCurrency, exportToCSV } from '../utils/issueUtils';

const EquipmentDamagesTable = ({ equipmentData }) => {
  const [sortBy, setSortBy] = useState('subsidy'); // 'subsidy' | 'cost' | 'farmer'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Pending' | 'Verified'

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = equipmentData;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'subsidy':
          compareValue = a.subsidy - b.subsidy;
          break;
        case 'cost':
          compareValue = a.estimatedRepairCost - b.estimatedRepairCost;
          break;
        case 'farmer':
          compareValue = a.farmerName.localeCompare(b.farmerName);
          break;
        default:
          compareValue = 0;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [equipmentData, sortBy, sortOrder, filterStatus]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    const exportData = processedData.map(item => ({
      'Equipment Type': item.equipmentType,
      'Farmer': item.farmerName,
      'Village': item.village,
      'Description': item.description,
      'Repair Cost': item.estimatedRepairCost,
      'Subsidy Amount': item.subsidy,
      'Status': item.status
    }));
    
    exportToCSV(exportData, 'equipment_damages');
  };

  const totalSubsidy = processedData.reduce((sum, item) => sum + item.subsidy, 0);
  const totalCost = processedData.reduce((sum, item) => sum + item.estimatedRepairCost, 0);

  if (!equipmentData || equipmentData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Equipment Damages & Subsidies</h2>
        <p className="text-gray-600">No equipment damage data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Equipment Damages & Subsidies</h2>
          <p className="text-sm text-gray-600 mt-1">
            {processedData.length} items • Total subsidy: {formatCurrency(totalSubsidy)}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-600 font-semibold">Total Equipment Damages</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{equipmentData.length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-300">
          <p className="text-sm text-gray-600 font-semibold">Total Repair Cost</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalCost)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-300">
          <p className="text-sm text-gray-600 font-semibold">Total Subsidy (75%)</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(totalSubsidy)}</p>
        </div>
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="subsidy">Subsidy Amount</option>
            <option value="cost">Repair Cost</option>
            <option value="farmer">Farmer Name</option>
          </select>
        </div>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Equipment Type</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Farmer / Farm</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Description</th>
              <th 
                className="px-4 py-3 text-right font-semibold text-gray-800 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('cost')}
              >
                Repair Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-4 py-3 text-right font-semibold text-gray-800 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('subsidy')}
              >
                Subsidy (75%) {sortBy === 'subsidy' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-800">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-700 font-bold text-xs">
                      {item.equipmentType.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{item.equipmentType}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800">{item.farmerName}</p>
                    <p className="text-xs text-gray-600">{item.village}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={item.description}>
                  {item.description}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-red-600">
                  {formatCurrency(item.estimatedRepairCost)}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-green-700">
                  {formatCurrency(item.subsidy)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Verified' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-2">ℹ️ Subsidy Calculation Method</h5>
        <p className="text-sm text-blue-800">
          Equipment subsidy is calculated as 75% of estimated repair/replacement cost, capped at equipment-specific maximum amounts. 
          Final subsidy amounts are subject to field verification and government approval.
        </p>
      </div>
    </div>
  );
};

export default EquipmentDamagesTable;
