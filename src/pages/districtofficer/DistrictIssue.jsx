import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Mock data for district issues
const issues = [
  {
    id: 1,
    title: "Water Pump Failure",
    description: "Irrigation pump in Rampur fields stopped working due to motor burn.",
    status: "Pending",
    category: "Electricity",
    reportedBy: "Village Officer - Rampur",
    village: "Rampur",
    date: "2025-10-01"
  },
  {
    id: 2,
    title: "Canal Blockage",
    description: "Water flow blocked due to debris in the main irrigation canal.",
    status: "In Progress",
    category: "Water",
    reportedBy: "Village Officer - Lakshmi Nagar",
    village: "Lakshmi Nagar",
    date: "2025-09-30"
  },
  {
    id: 3,
    title: "Crop Pest Infestation",
    description: "Paddy fields in Shanti Puram affected by brown planthopper pest.",
    status: "Pending",
    category: "Crop Issue",
    reportedBy: "Village Officer - Shanti Puram",
    village: "Shanti Puram",
    date: "2025-09-29"
  },
  // ...rest of the issues
];

// Fixed categories
const categories = ["Electricity", "Water", "Crop Issue"];
const villages = [...new Set(issues.map(i => i.village))];
const statusOptions = ["Pending", "Resolved", "In Progress"];

const DistrictIssue = () => {
  const [villageFilter, setVillageFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredIssues = issues.filter(issue => {
    return (
      (villageFilter === '' || issue.village === villageFilter) &&
      (categoryFilter === '' || issue.category === categoryFilter) &&
      (statusFilter === '' || issue.status === statusFilter) &&
      (
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h2 className="text-responsive-4xl font-bold mb-4 text-green-800">District Issues</h2>

      <div className="flex gap-4 mb-6 h-12 flex-wrap">
        <select
          className="rounded border-green-600 bg-gray-100 text-2xl border-2 px-2 py-1"
          value={villageFilter}
          onChange={e => setVillageFilter(e.target.value)}
        >
          <option value="">All Villages</option>
          {villages.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select
          className="rounded border-green-600 bg-gray-100 text-responsive-xl border-2 px-2 py-1"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="bg-gray-100 rounded text-responsive-xl border-2 border-green-600 px-2 py-1"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="text"
          className="border rounded px-2 py-1 text-responsive-xl bg-gray-100 border-green-600 flex-1"
          placeholder="Search issues..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredIssues.map(issue => (
          <div 
            className='flex justify-between bg-gray-100 shadow-md rounded-xl p-4 border-l-4 border-l-green-600 cursor-pointer'
            onClick={() => navigate('/district-issue-detail', { state: { issue } })}>
            <div
              key={issue.id}
              className=" "
            >
              <h3 className="text-responsive-2xl font-bold mb-1 text-green-800">{issue.title}</h3>
              <p className="text-gray-900 font-medium text-responsive-lg mb-2">{issue.description}</p>
              <div className="flex flex-wrap justify-between text-responsive-base font-medium text-gray-800 gap-2">
                <span>Reported By: {issue.reportedBy}</span>
              </div>

            </div>
            <div className='flex flex-col justify-around'>
              <span>
                Status: <span className={
                  issue.status === "Resolved" ? "text-green-600" :
                  issue.status === "Pending" ? "text-red-600" :
                  "text-yellow-600"
                }>{issue.status}</span>
              </span>
              
              <span>Date: {issue.date}</span>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="text-gray-500 text-responsive-lg">No issues found.</div>
        )}
      </div>
    </div>
  );
};

export default DistrictIssue;
