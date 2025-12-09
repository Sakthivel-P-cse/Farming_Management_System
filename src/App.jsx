import { useState } from 'react'
import './index.css'
import FarmersList from './pages/villageofficer/FarmersList'
import FarmerDetail from './pages/villageofficer/FarmerDetail'
import VillageDashboard from './pages/villageofficer/VillageDashboard'
import VillageOverview from './pages/villageofficer/VillageOverview'
import DistrictDashboard from './pages/districtofficer/DistrictDashboard'
import { Routes, Route, Navigate } from 'react-router-dom'
import VillageList from './pages/districtofficer/VillageList'
import DistrictIssue from './pages/districtofficer/DistrictIssue'
import DealersList from './pages/villageofficer/DealersList'
import DealerDetail from './pages/villageofficer/DealerDetail'
import VillageIssue from './pages/villageofficer/VillageIssue'
import VillageIssueDetails from './pages/villageofficer/VillageIssueDetails'
import VillageDetail from './pages/districtofficer/VillageDetail'
import DistrictIssueDetail from './pages/districtofficer/DistrictIssueDetail'
import Navbar from './components/Navbar'
import Login from './pages/auth/login'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStore from './store/useAuthstore'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/Overview'
import Issues from './pages/Issues'
import GodownDetails from './pages/GodownDetails'
import Merchants from './pages/Merchants'

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* New Dashboard Routes with Sidebar */}
        <Route path="/overview" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            } 
            allowedRoles={['district', 'village']} 
          />
        } />
        <Route path="/issues" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <Issues />
              </DashboardLayout>
            } 
            allowedRoles={['district', 'village']} 
          />
        } />
        <Route path="/godown" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <GodownDetails />
              </DashboardLayout>
            } 
            allowedRoles={['district', 'village']} 
          />
        } />
        <Route path="/merchants" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <Merchants />
              </DashboardLayout>
            } 
            allowedRoles={['district', 'village']} 
          />
        } />
        
        {/* District Officer Routes - Keep existing ones with Navbar */}
        <Route path="/" element={
          <ProtectedRoute 
            element={
              <>
                <Navbar />
                <DistrictDashboard />
              </>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/village-list" element={
          <ProtectedRoute 
            element={
              <>
                <Navbar />
                <VillageList />
              </>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/village-detail" element={
          <ProtectedRoute 
            element={
              <>
                <Navbar />
                <VillageDetail />
              </>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-issue" element={
          <ProtectedRoute 
            element={
              <>
                <Navbar />
                <DistrictIssue />
              </>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-issue-detail" element={
          <ProtectedRoute 
            element={
              <>
                <Navbar />
                <DistrictIssueDetail />
              </>
            } 
            allowedRoles={['district']} 
          />
        } />
        
        {/* Village Officer Routes with Sidebar */}
        <Route path="/village-dashboard" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageDashboard />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/farmers-list" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <FarmersList />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/farmer-detail" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <FarmerDetail />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/Dealers-list" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DealersList />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/dealer-detail" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DealerDetail />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/Village-issue" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageIssue />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/village-issue-detail" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageIssueDetails />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        <Route path="/village-overview" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageOverview />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        
        {/* Redirect all other routes */}
        <Route path="*" element={
          isAuthenticated ? (
            <Navigate to="/overview" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </div>
  )
}

export default App
