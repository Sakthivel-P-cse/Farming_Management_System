import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFarmers } from '../../services/farmerService';

const DistrictFarmers = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [farmingTypeFilter, setFarmingTypeFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAllFarmers();
        setFarmers(data || []);
      } catch (err) {
        console.error('Error loading farmers:', err);
        setError('Could not load farmers. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredFarmers = useMemo(() => {
    return farmers.filter(f => {
      const term = searchTerm.toLowerCase();
      const matchTerm = term
        ? (f.name || '').toLowerCase().includes(term) ||
          (f.village || '').toLowerCase().includes(term) ||
          (f.contact || '').toLowerCase().includes(term)
        : true;
      const matchStatus = statusFilter ? f.status === statusFilter : true;
      const matchType = farmingTypeFilter ? f.farmingType === farmingTypeFilter : true;
      const matchVillage = villageFilter ? f.village === villageFilter : true;
      return matchTerm && matchStatus && matchType && matchVillage;
    });
  }, [farmers, searchTerm, statusFilter, farmingTypeFilter, villageFilter]);

  const stats = useMemo(() => {
    const total = farmers.length;
    const active = farmers.filter(f => f.status === 'Active').length;
    const inactive = farmers.filter(f => f.status === 'Inactive').length;
    const landArea = farmers.reduce((sum, f) => sum + (Number(f.landArea) || 0), 0);
    const villages = Array.from(new Set(farmers.map(f => f.village).filter(Boolean)));
    return { total, active, inactive, landArea: landArea.toFixed(1), villages };
  }, [farmers]);

  const villageOptions = ['All Villages', ...stats.villages];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">District Farmers</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Farmers</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-xs text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Land Area</p>
          <p className="text-2xl font-bold text-gray-800">{stats.landArea} acres</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-wrap gap-3 items-center">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name, village, contact"
          className="flex-1 min-w-52 px-3 py-2 border rounded-lg"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={farmingTypeFilter}
          onChange={e => setFarmingTypeFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Farming Types</option>
          <option value="Organic">Organic</option>
          <option value="Traditional">Traditional</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={villageFilter}
          onChange={e => setVillageFilter(e.target.value === 'All Villages' ? '' : e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          {villageOptions.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {loading && <div className="text-gray-600">Loading farmers…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFarmers.map(farmer => (
            <div key={farmer.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{farmer.name}</p>
                  <p className="text-sm text-gray-500">{farmer.village}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  farmer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {farmer.status || 'Unknown'}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p>Contact: {farmer.contact || 'N/A'}</p>
                <p>Crops: {(farmer.crops || []).join(', ') || 'N/A'}</p>
                <p>Land: {farmer.landArea || 0} acres</p>
                <p>Type: {farmer.farmingType || 'N/A'}</p>
              </div>

              <button
                onClick={() => setSelectedFarmer(farmer)}
                className="text-green-700 font-medium text-sm hover:underline"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredFarmers.length === 0 && (
        <div className="text-center text-gray-500 py-10">No farmers found.</div>
      )}

      {selectedFarmer && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFarmer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedFarmer.name}</h2>
                <p className="text-sm text-gray-500">{selectedFarmer.village} • {selectedFarmer.farmingType}</p>
              </div>
              <button onClick={() => setSelectedFarmer(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p><span className="font-semibold">Status:</span> {selectedFarmer.status || 'N/A'}</p>
                <p><span className="font-semibold">Contact:</span> {selectedFarmer.contact || 'N/A'}</p>
                <p><span className="font-semibold">Email:</span> {selectedFarmer.email || 'N/A'}</p>
                <p><span className="font-semibold">Address:</span> {selectedFarmer.address || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Land Area:</span> {selectedFarmer.landArea || 0} acres</p>
                <p><span className="font-semibold">Crops:</span> {(selectedFarmer.crops || []).join(', ') || 'N/A'}</p>
                <p><span className="font-semibold">Farming Type:</span> {selectedFarmer.farmingType || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictFarmers;
