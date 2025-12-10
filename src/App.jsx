import { useState, useEffect } from 'react'
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
// District Officer Pages
import DistrictFarmers from './pages/districtofficer/DistrictFarmers'
import DistrictDealers from './pages/districtofficer/DistrictDealers'
import DistrictGodowns from './pages/districtofficer/DistrictGodowns'
import DistrictMerchants from './pages/districtofficer/DistrictMerchants'
import DistrictIssues from './pages/districtofficer/DistrictIssues'
import DistrictOfficers from './pages/districtofficer/DistrictOfficers'
import TaskUpdate from './pages/villageofficer/TaskUpdate'
import SeedDataPage from './pages/SeedDataPage'

function App() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Clear stale auth data from localStorage on app load
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        // If user has "District Officer" as name (old cached data), clear it
        if (parsedAuth.state?.user?.name === 'District Officer') {
          localStorage.removeItem('auth-storage');
          window.location.reload();
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/seed-data" element={<SeedDataPage />} />
        
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
        <Route path="/task-update" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <TaskUpdate />
              </DashboardLayout>
            } 
            allowedRoles={['village']} 
          />
        } />
        
        {/* District Officer Routes - Using DashboardLayout */}
        <Route path="/district-dashboard" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictDashboard />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/village-list" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageList />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/village-detail" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <VillageDetail />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-farmers" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictFarmers />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-dealers" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictDealers />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-issues" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictIssues />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-godowns" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictGodowns />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-merchants" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictMerchants />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-officers" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictOfficers />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-issue" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictIssue />
              </DashboardLayout>
            } 
            allowedRoles={['district']} 
          />
        } />
        <Route path="/district-issue-detail" element={
          <ProtectedRoute 
            element={
              <DashboardLayout>
                <DistrictIssueDetail />
              </DashboardLayout>
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
            user?.role === 'district' ? (
              <Navigate to="/district-dashboard" replace />
            ) : (
              <Navigate to="/village-dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </div>
  )
}

export default App
