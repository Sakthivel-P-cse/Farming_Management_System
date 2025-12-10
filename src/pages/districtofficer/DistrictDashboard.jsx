import React, { useState, useEffect, useMemo } from 'react'
import { getAllFarmers } from '../../services/farmerService'
import { getAllDealers } from '../../services/dealerService'
import { getAllIssues } from '../../services/issueService'

const DistrictDashboard = () => {
  const [farmers, setFarmers] = useState([])
  const [dealers, setDealers] = useState([])
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [yearFilter, setYearFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [farmersData, dealersData, issuesData] = await Promise.all([
          getAllFarmers(),
          getAllDealers(),
          getAllIssues()
        ])
        setFarmers(farmersData)
        setDealers(dealersData)
        setIssues(issuesData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calculate statistics from real data
  const stats = useMemo(() => {
    const totalFarmers = farmers.length
    const totalArea = farmers.reduce((sum, f) => sum + (parseFloat(f.landArea) || 0), 0)
    const cropTypes = Array.from(new Set(farmers.flatMap(f => 
      Array.isArray(f.crops) ? f.crops : (f.crops ? f.crops.split(',').map(c => c.trim()) : [])
    ))).filter(Boolean)
    
    const totalDealers = dealers.length
    
    // Group by village
    const villageGroups = {}
    farmers.forEach(farmer => {
      const village = farmer.village || 'Unknown'
      if (!villageGroups[village]) {
        villageGroups[village] = {
          name: village,
          farmers: 0,
          area: 0,
          crops: new Set(),
          dealers: 0,
          activeIssues: 0
        }
      }
      villageGroups[village].farmers++
      villageGroups[village].area += parseFloat(farmer.landArea) || 0
      if (Array.isArray(farmer.crops)) {
        farmer.crops.forEach(c => villageGroups[village].crops.add(c))
      } else if (farmer.crops) {
        farmer.crops.split(',').forEach(c => villageGroups[village].crops.add(c.trim()))
      }
    })

    dealers.forEach(dealer => {
      const village = dealer.village || 'Unknown'
      if (villageGroups[village]) {
        villageGroups[village].dealers++
      }
    })

    issues.filter(i => i.status !== 'Resolved').forEach(issue => {
      const village = issue.village || 'Unknown'
      if (villageGroups[village]) {
        villageGroups[village].activeIssues++
      }
    })

    const villageData = Object.values(villageGroups).map(v => ({
      ...v,
      crops: Array.from(v.crops)
    }))

    // Filter issues by date
    const filteredIssues = issues.filter(issue => {
      if (!issue.createdAt) return true
      const d = issue.createdAt.toDate ? issue.createdAt.toDate() : new Date(issue.createdAt)
      const matchYear = yearFilter ? d.getFullYear() === parseInt(yearFilter) : true
      const matchMonth = monthFilter ? d.getMonth() + 1 === parseInt(monthFilter) : true
      return matchYear && matchMonth
    })

    const issueStats = {
      total: filteredIssues.length,
      resolved: filteredIssues.filter(i => i.status === 'Resolved').length,
      pending: filteredIssues.filter(i => i.status === 'Pending').length,
      inProgress: filteredIssues.filter(i => i.status === 'In Progress').length,
      critical: filteredIssues.filter(i => i.priority === 'Critical').length,
    }

    return {
      totalFarmers,
      totalArea,
      cropTypes,
      totalDealers,
      totalGodowns: 0, // Will need godown service later
      villageData,
      issueStats,
      filteredIssues
    }
  }, [farmers, dealers, issues, yearFilter, monthFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-responsive-3xl font-bold text-gray-900">District Dashboard - Overview</h2>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 text-white">
            <h4 className="text-xs font-medium opacity-90 mb-1">Total Villages</h4>
            <p className="text-3xl font-bold">{stats.villageData.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 text-white">
            <h4 className="text-xs font-medium opacity-90 mb-1">Total Farmers</h4>
            <p className="text-3xl font-bold">{stats.totalFarmers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 text-white">
            <h4 className="text-xs font-medium opacity-90 mb-1">Total Dealers</h4>
            <p className="text-3xl font-bold">{stats.totalDealers}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 text-white">
            <h4 className="text-xs font-medium opacity-90 mb-1">Total Godowns</h4>
            <p className="text-3xl font-bold">{stats.totalGodowns}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-4 text-white">
            <h4 className="text-xs font-medium opacity-90 mb-1">Critical Issues</h4>
            <p className="text-3xl font-bold">{stats.issueStats.critical}</p>
          </div>
        </div>

        {/* Section 1 - Agriculture Overview */}
        <section className="mb-8">
          <h3 className="text-responsive-2xl font-bold text-green-700 mb-4">Agriculture Statistics</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Farming Area */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Total Farming Area</h4>
              <p className="text-3xl font-bold text-blue-700">{stats.totalArea.toLocaleString()} sqft</p>
              <p className="text-sm text-gray-500 mt-2">~{(stats.totalArea / 43560).toFixed(2)} acres</p>
            </div>

            {/* Crop Types */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Crop Varieties</h4>
              <p className="text-2xl font-bold text-yellow-700">{stats.cropTypes.length}</p>
              <p className="text-sm text-gray-600 mt-2">{stats.cropTypes.join(', ')}</p>
            </div>

            {/* Average Farm Size */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Avg. Farm Size</h4>
              <p className="text-3xl font-bold text-green-700">
                {stats.totalFarmers > 0 ? Math.round(stats.totalArea / stats.totalFarmers).toLocaleString() : 0} sqft
              </p>
              <p className="text-sm text-gray-500 mt-2">per farmer</p>
            </div>
          </div>
        </section>

        {/* Village Performance Section */}
        <section className="mb-8">
          <h3 className="text-responsive-2xl font-bold text-green-700 mb-4">Village Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.villageData.map((village) => (
              <div key={village.name} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{village.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Farmers:</span>
                    <span className="font-semibold text-green-700">{village.farmers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Area:</span>
                    <span className="font-semibold">{village.area.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dealers:</span>
                    <span className="font-semibold text-blue-700">{village.dealers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Issues:</span>
                    <span className={`font-semibold ${village.activeIssues > 2 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {village.activeIssues}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Crops: </span>
                    <span className="text-xs font-medium text-gray-700">
                      {village.crops.length > 0 ? village.crops.join(', ') : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 - Issue Overview */}
        <section>
          <h3 className="text-responsive-2xl font-bold text-green-700 mb-4">Issues Overview</h3>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
            <div className="flex flex-wrap gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-responsive-base bg-gray-50"
                value={yearFilter}
                onChange={e => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2025">2025</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-responsive-base bg-gray-50"
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
          </div>

          {/* Issue Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Issues */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Total Issues</h4>
              <p className="text-3xl font-bold text-purple-700">{stats.issueStats.total}</p>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">In Progress</h4>
              <p className="text-3xl font-bold text-yellow-700">{stats.issueStats.inProgress}</p>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Pending</h4>
              <p className="text-3xl font-bold text-red-600">{stats.issueStats.pending}</p>
            </div>

            {/* Resolved */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <h4 className="text-gray-600 text-sm font-medium mb-1">Resolved</h4>
              <p className="text-3xl font-bold text-green-700">{stats.issueStats.resolved}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DistrictDashboard
