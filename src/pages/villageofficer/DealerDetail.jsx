import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DealerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dealer = location.state?.dealer;

  if (!dealer) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-red-50">
        <div className="border-l-4 border-red-600 rounded-xl p-6 shadow-lg bg-white">
          <h2 className="text-responsive-xl font-bold text-red-700 mb-2">No Dealer Data</h2>
          <p className="text-gray-700 mb-4 text-responsive-base">
            No dealer details found. Please go back and select a dealer.
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
    <div className="bg-gray-300 rounded-xl shadow-lg min-h-screen overflow-hidden">
      {/* Header Section */}
      <div className="bg-gray-200 text-green-700 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-responsive-3xl font-bold mr-6">
              {dealer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-responsive-4xl font-bold">{dealer.name}</h1>
              <p className="text-green-700 text-responsive-lg mt-1">Dealer Type: {dealer.type}</p>
              <p className="text-green-700 text-responsive-base">{dealer.contact}</p>
            </div>
          </div>
          <div className="text-right leading-relaxed">
            <p className="text-green-700 text-responsive-base">
              <span className="font-semibold">Address:</span> {dealer.address}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500 text-responsive-base font-bold">★</span>
              <span className="text-gray-700 text-responsive-base font-semibold">{dealer.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dealer Information */}
          <div className="bg-gray-200 border rounded-lg p-6 shadow-md">
            <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-200 pb-2">
              Dealer Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-responsive-xl mr-4">
                  {dealer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg leading-tight">{dealer.name}</p>
                  <p className="text-gray-600 text-base">{dealer.contact}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 pl-2 md:pl-6">
                <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
                  <span className="font-semibold text-gray-800 text-lg">Phone:</span>
                  <span className="text-gray-800 border px-3 py-2 rounded bg-gray-100 text-base text-right break-words">
                    {dealer.contact}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
                  <span className="font-semibold text-gray-800 text-lg">Type:</span>
                  <span className="text-gray-800 border px-3 py-2 rounded bg-gray-100 text-base text-right break-words">
                    {dealer.type}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
                  <span className="font-semibold text-gray-800 text-lg">Address:</span>
                  <span className="text-gray-800 border px-3 py-2 rounded bg-gray-100 text-base text-right break-words">
                    {dealer.address}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
                  <span className="font-semibold text-gray-800 text-lg">Rating:</span>
                  <span className="text-gray-800 border px-3 py-2 rounded bg-gray-100 text-base text-right break-words">
                    {dealer.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipments Information */}
          <div className="bg-gray-200 border rounded-lg p-6 shadow-md">
            <h3 className="text-responsive-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-200 pb-2">
              Equipments
            </h3>
            <div className="space-y-6">
              <div className="mt-4">
                <span className="font-semibold text-gray-800 text-lg block mb-3">Equipments Available:</span>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {dealer.items.map((item) => (
                    <li
                      key={item}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-medium text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetail;
