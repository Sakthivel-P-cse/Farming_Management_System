import React, { useState } from 'react';
import { formatCurrency } from '../utils/issueUtils';

const TopCropsList = ({ cropsData }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewFarms = (crop) => {
    setSelectedCrop(crop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCrop(null);
  };

  if (!cropsData || cropsData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Affected Crops</h2>
        <p className="text-gray-600">No crop damage data available.</p>
      </div>
    );
  }

  const topCrop = cropsData[0];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Top Affected Crops</h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Ranked by Loss
          </span>
        </div>

        {/* Simple bar chart visualization */}
        <div className="space-y-3 mb-6">
          {cropsData.slice(0, 5).map((crop) => {
            const widthPercent = (crop.totalLoss / topCrop.totalLoss) * 100;
            const isTopCrop = crop.rank === 1;

            return (
              <div key={crop.cropName} className={`p-3 rounded-lg ${isTopCrop ? 'bg-red-50 border-2 border-red-500' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isTopCrop ? 'text-red-700' : 'text-gray-700'}`}>
                      #{crop.rank} {crop.cropName}
                    </span>
                    {isTopCrop && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full font-semibold">
                        MOST AFFECTED
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{formatCurrency(crop.totalLoss)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${isTopCrop ? 'bg-red-600' : 'bg-green-600'}`}
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{crop.farmCount} farms affected</span>
                  <span>{crop.totalAreaAffected.toFixed(1)} ha</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">Crop</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-800">Farms</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-800">Area (ha)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-800">Total Loss</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-800">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cropsData.map((crop) => (
                <tr key={crop.cropName} className={crop.rank === 1 ? 'bg-red-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3 font-semibold text-gray-700">#{crop.rank}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{crop.cropName}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{crop.farmCount}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{crop.totalAreaAffected.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">{formatCurrency(crop.totalLoss)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewFarms(crop)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      View Farms
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for viewing farms */}
      {showModal && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Farms Affected - {selectedCrop.cropName}</h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <p className="mt-2 text-green-100">
                {selectedCrop.farmCount} farms • {selectedCrop.totalAreaAffected.toFixed(1)} ha affected • {formatCurrency(selectedCrop.totalLoss)} total loss
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-3">
                {selectedCrop.farms.map((farm, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800">{farm.farmerName}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Area: {farm.areaAffected.toFixed(1)} ha • Loss: {formatCurrency(farm.loss)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        farm.severity === 'High' ? 'bg-red-100 text-red-700' :
                        farm.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {farm.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopCropsList;
