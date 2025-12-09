import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FarmerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const farmer = location.state?.farmer;

  // Current crops cultivation details with mock data
  const currentCropsData = [
    {
      name: farmer?.crops[0] || 'Wheat',
      plantedDate: '2024-10-15',
      expectedHarvestDate: '2025-03-20',
      area: 2.1,
      irrigationType: 'Drip Irrigation',
      fertilizer: 'Organic NPK',
      pestControl: 'Neem Oil Spray',
      currentStatus: 'Growing',
      healthStatus: 'Healthy',
    },
    {
      name: farmer?.crops[1] || 'Rice',
      plantedDate: '2024-09-10',
      expectedHarvestDate: '2024-12-25',
      area: 3.1,
      irrigationType: 'Flood Irrigation',
      fertilizer: 'Chemical NPK',
      pestControl: 'Chemical Pesticides',
      currentStatus: 'Ready for Harvest',
      healthStatus: 'Good',
    },
  ];

  if (!farmer) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-red-50">
        <div className="border-l-4 border-red-600 rounded-xl p-6 shadow-lg bg-white">
          <h2 className="text-responsive-xl font-bold text-red-700 mb-2">No Farmer Data</h2>
          <p className="text-gray-700 mb-4 text-responsive-base">
            No farmer details found. Please go back and select a farmer.
          </p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-responsive-base"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-xl shadow-lg min-h-screen overflow-hidden">
      {/* Header Section */}
      <div className="bg-gray-100 text-green-700 p-8 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-responsive-3xl font-bold mr-6 text-green-700">
              {farmer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-responsive-4xl font-bold text-green-800">{farmer.name}</h1>
              <p className="text-green-700 text-responsive-lg mt-1">{farmer.village} Village</p>
              <p className="text-green-700 text-responsive-base">{farmer.contact}</p>
            </div>
          </div>
          <div className="text-right leading-relaxed">
            <p className="text-green-700 text-responsive-base">
              <span className="font-semibold">Address:</span> {farmer.address}
            </p>
            <p className="text-green-700 text-responsive-base">
              <span className="font-semibold">Experience:</span> {farmer.experience}
            </p>
            <span
              className={`inline-block px-4 py-2 rounded-full text-responsive-sm font-medium mt-2 ${
                farmer.status === 'Active'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {farmer.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
<div className="bg-white rounded-lg p-6 shadow-md border border-gray-300">
  <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-300 pb-2">
    Personal Information
  </h3>

  <div className="space-y-6">
    {/* Profile */}
    <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-responsive-xl mr-4">
        {farmer.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-lg leading-tight">{farmer.name}</p>
        <p className="text-gray-600 text-base">{farmer.village} Village</p>
      </div>
    </div>

    {/* Details */}
    <div className="grid grid-cols-2 gap-6 pl-2 md:pl-6">
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
        <span className="font-semibold text-gray-800 text-lg">Contact Number:</span>
        <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base text-right break-words">
          {farmer.contact}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
        <span className="font-semibold text-gray-800 text-lg">Village:</span>
        <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base text-right break-words">
          {farmer.village}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
        <span className="font-semibold text-gray-800 text-lg">Address:</span>
        <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base text-right break-words">
          {farmer.address}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
        <span className="font-semibold text-gray-800 text-lg">Status:</span>
        <span
          className={`px-3 py-2 rounded-full text-base font-medium text-center ${
            farmer.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {farmer.status}
        </span>
      </div>
    </div>
  </div>
</div>


          {/* Farming Information */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-300">
            <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-300 pb-2">
              Farming Details
            </h3>

            <div className="space-y-6">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-lg w-1/2">Land Area:</span>
                  <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base w-1/2 text-right">
                    {farmer.landArea} acres
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-lg w-1/2">Farming Type:</span>
                  <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base w-1/2 text-right">
                    {farmer.farmingType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-lg w-1/2">Experience:</span>
                  <span className="text-gray-800 border border-gray-300 px-3 py-2 rounded bg-gray-50 text-base w-1/2 text-right">
                    {farmer.experience}
                  </span>
                </div>
              </div>

              {/* Crops Grown - List View */}
              <div className="mt-4">
                <span className="font-semibold text-gray-800 text-lg block mb-3">Crops Grown:</span>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {farmer.crops.map((crop) => (
                    <li
                      key={crop}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-medium text-base"
                    >
                      {crop}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Current Crops Cultivated Section */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md border border-gray-300">
          <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-300 pb-2">
            🌾 Current Crops Cultivated
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentCropsData.map((crop, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-600 shadow-md">
                {/* Crop Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-responsive-xl font-bold text-gray-800">{crop.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      crop.currentStatus === 'Ready for Harvest'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {crop.currentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      crop.healthStatus === 'Healthy'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Health: {crop.healthStatus}
                    </span>
                    <span className="text-gray-700 font-semibold">Area: {crop.area} acres</span>
                  </div>
                </div>

                {/* Crop Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <p className="text-gray-600 text-sm font-semibold">Planted Date</p>
                    <p className="text-gray-800 font-bold mt-1">{crop.plantedDate}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <p className="text-gray-600 text-sm font-semibold">Expected Harvest</p>
                    <p className="text-gray-800 font-bold mt-1">{crop.expectedHarvestDate}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <p className="text-gray-600 text-sm font-semibold">Irrigation Type</p>
                    <p className="text-gray-800 font-bold mt-1">{crop.irrigationType}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <p className="text-gray-600 text-sm font-semibold">Fertilizer</p>
                    <p className="text-gray-800 font-bold mt-1">{crop.fertilizer}</p>
                  </div>
                  <div className="bg-white p-3 rounded col-span-2 border border-gray-300">
                    <p className="text-gray-600 text-sm font-semibold">Pest Control Method</p>
                    <p className="text-gray-800 font-bold mt-1">{crop.pestControl}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetail;
