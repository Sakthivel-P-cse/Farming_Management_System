# Firebase Integration - Village Dashboard

## Overview
This document describes the complete Firebase backend integration for the Village Dashboard application. All hardcoded mock data has been migrated to Firebase Firestore, and the application now uses real-time data from the cloud.

## Firebase Setup

### Configuration
Firebase is configured in `/src/config/firebase.js` with the following services:
- **Firestore Database**: For storing all application data
- **Firebase Storage**: Available for future file uploads
- **Firebase Authentication**: Available for future auth enhancements

### Environment Variables
All Firebase credentials are stored in `.env`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

## Database Structure

### Collections

#### 1. **farmers** Collection
Stores all farmer records with the following schema:
```javascript
{
  name: string,
  contact: string,
  village: string,
  crops: array of strings,
  landArea: number,
  status: "Active" | "Inactive",
  farmingType: "Organic" | "Traditional" | "Hybrid",
  address: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### 2. **dealers** Collection
Stores all dealer/rental service records:
```javascript
{
  name: string,
  contact: string,
  type: "Rent Giver" | "Seller",
  address: string,
  items: array of strings,
  rating: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### 3. **pendingRequests** Collection
Stores pending registration requests from mobile app:
```javascript
{
  name: string,
  contact: string,
  village: string,
  requestType: "farmer" | "dealer",
  requestDate: string,
  status: "Pending" | "Approved" | "Rejected",
  // Additional fields based on requestType
  createdAt: timestamp
}
```

#### 4. **activities** Collection
Stores task update log entries:
```javascript
{
  type: "farmer" | "dealer" | "issue" | "godown" | "merchant",
  name: string,
  action: string,
  time: string,
  date: string,
  createdAt: timestamp
}
```

#### 5. **dashboardStats** Collection
Stores aggregated statistics with two documents:
- `village_overview`: Overall statistics
- `today_stats`: Daily metrics

## Services Layer

### Farmer Service (`/src/services/farmerService.js`)
- `getAllFarmers()` - Fetch all farmers
- `getFarmerById(id)` - Get single farmer
- `addFarmer(data)` - Add new farmer
- `updateFarmer(id, data)` - Update farmer
- `deleteFarmer(id)` - Delete farmer
- `getFarmersByStatus(status)` - Filter by status
- `getFarmersByType(type)` - Filter by farming type
- `getFarmerStats()` - Get aggregated statistics

### Dealer Service (`/src/services/dealerService.js`)
- `getAllDealers()` - Fetch all dealers
- `getDealerById(id)` - Get single dealer
- `addDealer(data)` - Add new dealer
- `updateDealer(id, data)` - Update dealer
- `deleteDealer(id)` - Delete dealer
- `getDealersByType(type)` - Filter by type
- `getDealerStats()` - Get aggregated statistics

### Pending Request Service (`/src/services/pendingRequestService.js`)
- `getAllPendingRequests()` - Fetch all pending requests
- `getPendingRequestsByType(type)` - Filter by farmer/dealer
- `addPendingRequest(data)` - Add new request
- `updatePendingRequestStatus(id, status)` - Update status
- `deletePendingRequest(id)` - Delete request
- `approvePendingRequest(id, type)` - Approve and move to main collection
- `rejectPendingRequest(id)` - Reject request

### Activity Service (`/src/services/activityService.js`)
- `getAllActivities(limit)` - Fetch activities with limit
- `addActivity(data)` - Log new activity
- `getRecentActivities(count)` - Get recent activities

### Dashboard Service (`/src/services/dashboardService.js`)
- `getDashboardStats()` - Get village overview stats
- `updateDashboardStats(stats)` - Update stats
- `recalculateDashboardStats()` - Recalculate from sources
- `getTodayStats()` - Get today's metrics
- `updateTodayStats(stats)` - Update today's metrics

## Updated Components

### 1. VillageDashboard (`/src/pages/villageofficer/VillageDashboard.jsx`)
**Changes:**
- Removed hardcoded `overviewData` object
- Added state management with `useState`
- Added `useEffect` to fetch data on mount
- Fetches data from `getDashboardStats()` and `getTodayStats()`
- Added loading state with spinner
- All statistics now display live Firebase data

### 2. FarmersList (`/src/pages/villageofficer/FarmersList.jsx`)
**Changes:**
- Removed hardcoded `farmersData` array
- Removed hardcoded `pendingRequests` array
- Added state management for both datasets
- Added `useEffect` to fetch farmers and pending requests
- Implemented `handleApproveRequest()` - approves and moves to farmers collection
- Implemented `handleRejectRequest()` - updates status to rejected
- Added loading state
- All farmer data now comes from Firebase

### 3. DealersList (`/src/pages/villageofficer/DealersList.jsx`)
**Changes:**
- Removed hardcoded `dealersData` array
- Removed hardcoded `pendingRequests` array
- Added state management for both datasets
- Added `useEffect` to fetch dealers and pending requests
- Implemented `handleApproveRequest()` - approves and moves to dealers collection
- Implemented `handleRejectRequest()` - updates status to rejected
- Added loading state
- All dealer data now comes from Firebase

### 4. TaskUpdate (`/src/pages/villageofficer/TaskUpdate.jsx`)
**Changes:**
- Removed hardcoded `activities` array
- Added state management for activities
- Added `useEffect` to fetch activities on mount
- Updated `handleSubmit()` to save to Firebase
- Refreshes activity list after adding new entry
- Added loading state
- All activities now stored in and retrieved from Firebase

## Data Seeding

### Initial Data Population
To populate the Firebase database with initial data:

1. Navigate to: `http://localhost:5173/seed-data`
2. Click "Seed Firebase Data" button
3. Wait for confirmation message

### Seed Data Page (`/src/pages/SeedDataPage.jsx`)
A dedicated page for seeding initial data into Firebase. This page:
- Provides a user-friendly interface
- Shows what data will be seeded
- Displays success/error messages
- Includes warning about running only once

### Seed Utility (`/src/utils/seedData.js`)
Contains functions to seed all collections:
- `seedFarmers()` - Seeds 8 farmer records
- `seedDealers()` - Seeds 8 dealer records
- `seedPendingRequests()` - Seeds 5 pending request records
- `seedActivities()` - Seeds 5 activity log entries
- `seedDashboardStats()` - Seeds dashboard statistics
- `seedAllData()` - Runs all seed functions

## Features Implemented

### Real-time Data Loading
- All components fetch live data from Firebase on mount
- Loading spinners displayed during data fetch
- Error handling for failed requests

### CRUD Operations
- **Create**: Add new farmers, dealers, activities
- **Read**: Fetch and display all data types
- **Update**: Approve/reject pending requests, update records
- **Delete**: Delete farmers, dealers (service layer ready)

### Pending Request Workflow
1. Requests come from mobile app (simulated in seed data)
2. Village officer views pending requests
3. Officer can approve or reject
4. Approved requests automatically move to main collection
5. Rejected requests status updated
6. Lists refresh automatically after action

### Statistics & Analytics
- Real-time farmer statistics (total, active, inactive, new this month)
- Real-time dealer statistics (total, rent givers, sellers, top rated)
- Today's stats tracking
- Auto-calculation of derived metrics

## How to Use

### First Time Setup
1. Ensure `.env` file has Firebase credentials
2. Run the application: `npm run dev`
3. Navigate to `/seed-data` route
4. Click "Seed Firebase Data" to populate initial data
5. Navigate to village dashboard to see live data

### Daily Operations
1. **View Dashboard**: All stats load from Firebase automatically
2. **View Farmers**: Browse all farmers, filter by status/type
3. **View Dealers**: Browse all dealers, filter by type
4. **Approve Requests**: Click pending requests button, approve or reject
5. **Log Activities**: Go to Task Update, add new activity entries

## Firebase Console
To view data in Firebase:
1. Go to: https://console.firebase.google.com
2. Select project: `vital-glytch`
3. Navigate to Firestore Database
4. Browse collections: farmers, dealers, pendingRequests, activities, dashboardStats

## Data Flow

```
Mobile App → Firebase (pendingRequests) → Village Dashboard
                                        ↓
                                   Approve/Reject
                                        ↓
                            Firebase (farmers/dealers)
                                        ↓
                                 Village Dashboard
```

## Security Notes
- Firebase credentials are in `.env` - never commit this file
- Currently using Firebase in development mode
- Production deployment will require:
  - Firebase Security Rules
  - User authentication integration
  - Role-based access control

## Future Enhancements
- Real-time listeners for auto-refresh on data changes
- Offline support with Firebase caching
- Image upload to Firebase Storage
- Advanced querying and filtering
- Batch operations for bulk updates
- Data export functionality

## Troubleshooting

### Data Not Loading
1. Check console for errors
2. Verify `.env` file has correct Firebase credentials
3. Check Firebase Console for data
4. Ensure network connection is active

### Seed Data Issues
1. Run seed operation only once
2. If duplicate data, clear collections in Firebase Console
3. Check console logs for specific errors

### Permission Errors
1. Verify Firebase project is accessible
2. Check Firebase Security Rules (should allow read/write for now)
3. Ensure API key is valid

## Summary
✅ All hardcoded data removed
✅ Firebase fully integrated
✅ CRUD operations functional
✅ Real-time data loading
✅ Pending request workflow complete
✅ Statistics auto-calculated
✅ Loading states implemented
✅ Error handling in place
✅ Data seeding utility created

The Village Dashboard is now a fully functional Firebase-backed application with zero hardcoded mock data.
