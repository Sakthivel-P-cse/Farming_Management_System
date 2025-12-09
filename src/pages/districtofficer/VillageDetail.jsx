import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VillageDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const village = location.state?.village;

  if (!village) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="border-l-4 border-red-600 rounded-xl p-6 shadow-lg bg-white max-w-md w-full">
          <h2 className="text-responsive-xl font-bold text-red-700 mb-2">Village Not Found</h2>
          <p className="text-gray-700 mb-4 text-responsive-base">The requested village could not be found.</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => navigate(-1)}
          >Back</button>
        </div>
      </div>
    );
  }

  return (
          <div className="bg-gray-200 w-full shadow-lg rounded-b-xl overflow-hidden">
            {/* Back button */}
            <div className="bg-gray-100 p-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-green-700 hover:text-green-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium text-responsive-base">Back to Villages</span>
              </button>
            </div>
            
            {/* Header Section */}
            <div className="bg-gray-300 text-green-700 p-6 max-w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-responsive-3xl md:text-responsive-4xl font-bold break-words">{village.name}</h1>
                  <p className="text-green-700 text-responsive-lg mt-2">Village Details & Information</p>
                  {village.pincode !== "N/A" && (
                    <p className="text-green-700 text-responsive-base">PIN: {village.pincode}</p>
                  )}
                </div>
                <div className="text-left md:text-right">
                  {village.established !== "N/A" && (
                    <p className="text-green-700 text-responsive-base">Established: {village.established}</p>
                  )}
                  {village.nearestTown !== "N/A" && (
                    <p className="text-green-700 text-responsive-base">Nearest Town: {village.nearestTown}</p>
                  )}
                </div>
              </div>
            </div>


            {/* Main Content */}
            <div className="p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                {/* Village Officer Information */}
                <div className="bg-gray-300 border rounded-lg p-6 shadow-md">
                  <h3 className="text-responsive-xl font-bold text-gray-800 mb-6 border-b-2 border-green-200 pb-2">
                    Village Officer Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-responsive-xl mr-4">
                        {village.officer.name !== "N/A" ? village.officer.name.charAt(0) : "?"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-responsive-base">{village.officer.name}</p>
                        <p className="text-gray-600 text-responsive-sm">{village.officer.designation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                        <span className="font-semibold text-gray-600 text-responsive-base">Contact Number:</span>
                        <span className="text-gray-800 break-all text-responsive-base">{village.officer.contact}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                        <span className="font-semibold text-gray-600 text-responsive-base">Email:</span>
                        <span className="text-gray-800 text-responsive-sm break-all">{village.officer.email}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                        <span className="font-semibold text-gray-600 text-responsive-base">Designation:</span>
                        <span className="text-gray-800 text-responsive-base">{village.officer.designation}</span>
                      </div>
                    </div>

                    {village.officer.name !== "N/A" && (
                      <div className="mt-4 space-y-2">
                        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-responsive-base">
                          Contact Officer
                        </button>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-responsive-base">
                          Schedule Meeting
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Agricultural Information */}
                <div className="bg-gray-300 border rounded-lg p-6 shadow-md">
                  <h3 className="text-responsive-xl font-bold text-gray-800 mb-6 border-b-2 border-green-200 pb-2">
                    Agricultural Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                      <span className="font-semibold text-gray-600 text-responsive-base">Total Farming Area:</span>
                      <span className="text-gray-800">
                        {village.area !== "N/A" ? `${village.area.toLocaleString()} sqft` : "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                      <span className="font-semibold text-gray-600 text-responsive-base">Number of Farmers:</span>
                      <span className="text-gray-800 text-responsive-base">{village.farmers}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                      <span className="font-semibold text-gray-600 text-responsive-base">Main Occupation:</span>
                      <span className="text-gray-800 break-words text-responsive-base">{village.mainOccupation}</span>
                    </div>
                    
                    <div className="mt-4">
                      <span className="font-semibold text-gray-600 text-responsive-base block mb-3">Crops Grown:</span>
                      {village.crops.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {village.crops.map(crop => (
                            <div
                              key={crop}
                              className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-center font-medium truncate text-responsive-base"
                              title={crop}
                            >
                              {crop}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic text-responsive-base">No crop information available</p>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-responsive-base">
                        View Farmers List
                      </button>
                      <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition-colors text-responsive-base">
                        Agricultural Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
  );
};

export default VillageDetail;
