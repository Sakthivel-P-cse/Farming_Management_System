import React, { useState } from 'react';
import { formatCurrency } from '../utils/issueUtils';

const MostAffectedFarmerCard = ({ farmerData }) => {
  const [showModal, setShowModal] = useState(false);

  if (!farmerData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Most Affected Farmer</h2>
        <p className="text-gray-600">No farmer damage data available.</p>
      </div>
    );
  }

  const { farmer, totalDamage, totalSubsidy, damageBreakdown } = farmerData;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Most Affected Farmer</h2>
          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold">
            PRIORITY
          </span>
        </div>

        {/* Farmer Info */}
        <div className="bg-red-50 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{farmer.name}</h3>
              <p className="text-gray-600 mt-1">{farmer.village} Village</p>
              <p className="text-gray-600">{farmer.contact}</p>
            </div>
            <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-2xl">
              {farmer.name.charAt(0)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white p-3 rounded">
              <p className="text-xs text-gray-600 font-semibold">Crops Grown</p>
              <p className="text-sm font-bold text-gray-800 mt-1">{farmer.crops.join(', ')}</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="text-xs text-gray-600 font-semibold">Total Area Affected</p>
              <p className="text-sm font-bold text-gray-800 mt-1">{farmer.totalAreaAffected.toFixed(1)} ha</p>
            </div>
          </div>
        </div>

        {/* Damage Summary */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-gray-300 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Total Estimated Damage</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDamage)}</p>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 text-center bg-green-50">
            <p className="text-sm text-gray-600 font-semibold mb-1">Estimated Subsidy</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(totalSubsidy)}</p>
          </div>
        </div>

        {/* Quick damage overview */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Crop Losses:</span>
            <span className="font-semibold text-gray-800">{damageBreakdown.cropLosses.length} incidents</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Equipment Damages:</span>
            <span className="font-semibold text-gray-800">{damageBreakdown.equipmentDamages.length} items</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          View Detailed Breakdown
        </button>
      </div>

      {/* Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{farmer.name} - Damage Details</h3>
                  <p className="mt-1 text-green-100">{farmer.village} Village • {farmer.contact}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <p className="text-sm text-gray-600 font-semibold">Total Damage</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(totalDamage)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                  <p className="text-sm text-gray-600 font-semibold">Est. Subsidy</p>
                  <p className="text-xl font-bold text-green-700 mt-1">{formatCurrency(totalSubsidy)}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
                  <p className="text-sm text-gray-600 font-semibold">Area Affected</p>
                  <p className="text-xl font-bold text-blue-700 mt-1">{farmer.totalAreaAffected.toFixed(1)} ha</p>
                </div>
              </div>

              {/* Crop Losses */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Crop Losses ({damageBreakdown.cropLosses.length})</h4>
                <div className="space-y-3">
                  {damageBreakdown.cropLosses.map((loss) => (
                    <div key={loss.id} className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-bold text-gray-800">{loss.cropName}</h5>
                          <p className="text-sm text-gray-600 mt-1">{loss.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          loss.severity === 'High' ? 'bg-red-100 text-red-700' :
                          loss.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {loss.severity}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                        <div>
                          <span className="text-gray-600">Area: </span>
                          <span className="font-semibold text-gray-800">{loss.areaAffected} ha</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Loss: </span>
                          <span className="font-semibold text-red-600">{formatCurrency(loss.estimatedLoss)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Subsidy: </span>
                          <span className="font-semibold text-green-700">{formatCurrency(loss.subsidy)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Damages */}
              {damageBreakdown.equipmentDamages.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Equipment Damages ({damageBreakdown.equipmentDamages.length})</h4>
                  <div className="space-y-3">
                    {damageBreakdown.equipmentDamages.map((equipment) => (
                      <div key={equipment.id} className="border border-gray-300 rounded-lg p-4 bg-orange-50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-bold text-gray-800">{equipment.equipmentType}</h5>
                            <p className="text-sm text-gray-600 mt-1">{equipment.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            equipment.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {equipment.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                          <div>
                            <span className="text-gray-600">Repair Cost: </span>
                            <span className="font-semibold text-red-600">{formatCurrency(equipment.estimatedRepairCost)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Subsidy (75%): </span>
                            <span className="font-semibold text-green-700">{formatCurrency(equipment.subsidy)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subsidy Calculation Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <h5 className="font-bold text-blue-900 mb-2">ℹ️ Subsidy Calculation Info</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Crop loss: Coverage based on severity (Low: 30%, Medium: 60%, High: 90%) up to crop-specific cap</li>
                  <li>• Equipment: 75% of repair cost up to equipment-specific cap</li>
                  <li>• Final amounts subject to verification and government approval</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MostAffectedFarmerCard;
