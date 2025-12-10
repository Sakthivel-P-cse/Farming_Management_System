import React, { useState } from 'react';
import { seedAllData } from '../utils/seedData';

const SeedDataPage = () => {
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSeedData = async () => {
    setSeeding(true);
    setMessage('');
    setError('');

    try {
      await seedAllData();
      setMessage('✅ All data has been successfully seeded to Firebase!');
    } catch (err) {
      setError('❌ Error seeding data: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Firebase Data Seeding</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to seed the Firebase database with initial mock data.
          This will populate the following collections:
        </p>
        
        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
          <li>Farmers (8 records)</li>
          <li>Dealers (8 records)</li>
          <li>Pending Requests (5 records)</li>
          <li>Activities (5 records)</li>
          <li>Dashboard Statistics</li>
        </ul>

        <div className="mb-6">
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              seeding 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {seeding ? 'Seeding Data...' : 'Seed Firebase Data'}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ <strong>Note:</strong> This should only be run once. Running it multiple times will create duplicate data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeedDataPage;
