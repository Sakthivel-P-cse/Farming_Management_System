import React from 'react'

// Mock data
const villageData = [
  { name: "Rampur", farmers: 120, crops: ["Wheat", "Rice"], area: 54000 },
  { name: "Lakshmi Nagar", farmers: 80, crops: ["Sugarcane", "Maize"], area: 32000 },
  { name: "Shanti Puram", farmers: 150, crops: ["Paddy", "Cotton"], area: 75000 },
]

const issues = [
  { id: 1, status: "Pending", date: "2025-10-01" },
  { id: 2, status: "In Progress", date: "2025-09-30" },
  { id: 3, status: "Pending", date: "2025-09-29" },
  { id: 4, status: "Resolved", date: "2025-09-27" },
  { id: 5, status: "In Progress", date: "2025-09-26" },
  { id: 6, status: "Pending", date: "2025-09-25" },
  { id: 7, status: "In Progress", date: "2025-09-28" },
  { id: 8, status: "Pending", date: "2025-09-29" },
  { id: 9, status: "Pending", date: "2025-09-30" },
  { id: 10, status: "Resolved", date: "2025-09-25" },
  { id: 11, status: "Pending", date: "2025-09-24" },
  { id: 12, status: "In Progress", date: "2025-09-30" },
  { id: 13, status: "Pending", date: "2025-09-27" },
  { id: 14, status: "Resolved", date: "2025-09-28" },
  { id: 15, status: "In Progress", date: "2025-09-29" },
];

// Utility functions
const getTotalFarmers = () => villageData.reduce((sum, v) => sum + v.farmers, 0)
const getTotalFarmingArea = () => villageData.reduce((sum, v) => sum + v.area, 0)
const getCropTypes = () => Array.from(new Set(villageData.flatMap(v => v.crops)))
const getFilteredIssues = (year, month) => {
  return issues.filter(issue => {
    const d = new Date(issue.date);
    const matchYear = year ? d.getFullYear() === parseInt(year) : true;
    const matchMonth = month ? d.getMonth() + 1 === parseInt(month) : true;
    return matchYear && matchMonth;
  });
};
const getStats = (filtered) => ({
  total: filtered.length,
  resolved: filtered.filter(i => i.status === 'Resolved').length,
  pending: filtered.filter(i => i.status === 'Pending').length,
  inProgress: filtered.filter(i => i.status === 'In Progress').length,
});

const DistrictDashboard = () => {
  const totalFarmers = getTotalFarmers()
  const totalArea = getTotalFarmingArea()
  const cropTypes = getCropTypes()
  const [yearFilter, setYearFilter] = React.useState('');
  const [monthFilter, setMonthFilter] = React.useState('');

  const filteredIssues = getFilteredIssues(yearFilter, monthFilter);
  const stats = getStats(filteredIssues);

  return (
    <div className="p-10 bg-gray-300 min-h-screen">

      {/* Section 1 - Agriculture Overview */}
      <section className="mb-12">
        <h2 className="text-responsive-4xl font-bold text-green-800 mb-3 border-b-2 border-green-600 inline-block pb-1">
          Agriculture
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {/* Total Farmers */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-xl font-semibold text-gray-700 mb-2">Total Farmers</h3>
            <p className="text-responsive-3xl font-extrabold text-green-800">{totalFarmers}</p>
          </div>

          {/* Total Farming Area */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-xl font-semibold text-gray-700 mb-2">Total Farming Area</h3>
            <p className="text-responsive-3xl font-extrabold text-green-800">{totalArea} sqft</p>
          </div>

          {/* Crop Types */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-xl font-semibold text-gray-700 mb-2">Crop Types</h3>
            <p className="text-responsive-lg font-semibold text-green-800">{cropTypes.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Issue Overview */}
      <section>
        <p className="text-responsive-4xl font-bold text-green-800 mb-3 border-b-2 border-green-600 inline-block pb-1">
          Issues
        </p>

        <div className="flex gap-4 mb-8">
          <select
            className="border rounded px-3 py-2 bg-white"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="2025">2025</option>
          </select>
          <select
            className="border rounded px-3 py-2 bg-white"
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Total Issues */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-lg font-semibold text-gray-700 mb-2">Total Issues</h3>
            <p className="text-responsive-3xl font-extrabold text-gray-800">{stats.total}</p>
          </div>

          {/* In Progress */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-lg font-semibold text-gray-700 mb-2">In Progress</h3>
            <p className="text-responsive-3xl font-extrabold text-yellow-700">{stats.inProgress}</p>
          </div>

          {/* Pending */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-lg font-semibold text-gray-700 mb-2">Pending</h3>
            <p className="text-responsive-3xl font-extrabold text-red-600">{stats.pending}</p>
          </div>

          {/* Resolved */}
          <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <h3 className="text-responsive-lg font-semibold text-gray-700 mb-2">Resolved</h3>
            <p className="text-responsive-3xl font-extrabold text-teal-700">{stats.resolved}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DistrictDashboard
