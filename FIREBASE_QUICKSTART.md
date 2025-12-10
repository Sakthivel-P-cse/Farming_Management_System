# Firebase Backend - Quick Start Guide

## 🚀 Getting Started

### Step 1: First Time Setup
```bash
# Install dependencies (if not done already)
npm install

# Start the development server
npm run dev
```

### Step 2: Seed Initial Data
1. Open browser: `http://localhost:5173/seed-data`
2. Click **"Seed Firebase Data"** button
3. Wait for success message (✅ All data seeded successfully!)
4. **Important**: Only run this ONCE to avoid duplicate data

### Step 3: View Live Data
Navigate to any of these routes to see Firebase data in action:
- `http://localhost:5173/village-dashboard` - Dashboard with live stats
- `http://localhost:5173/farmers-list` - Farmers from Firebase
- `http://localhost:5173/dealers-list` - Dealers from Firebase
- `http://localhost:5173/task-update` - Activity log from Firebase

## 📊 What Was Migrated

### Before (Hardcoded)
```javascript
const farmersData = [
  { id: 1, name: "Rajesh Kumar", ... },
  { id: 2, name: "Priya Sharma", ... },
  // ... hardcoded array
];
```

### After (Firebase)
```javascript
const [farmersData, setFarmersData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const farmers = await getAllFarmers();
    setFarmersData(farmers);
  };
  fetchData();
}, []);
```

## 🗄️ Firebase Collections

| Collection | Records | Purpose |
|------------|---------|---------|
| `farmers` | 8 | All registered farmers |
| `dealers` | 8 | Equipment dealers/rental services |
| `pendingRequests` | 5 | Registration requests awaiting approval |
| `activities` | 5 | Task update log entries |
| `dashboardStats` | 2 docs | Village overview & today's stats |

## 🔧 Available Services

```javascript
// Farmers
import { getAllFarmers, addFarmer, getFarmerStats } from './services/farmerService';

// Dealers
import { getAllDealers, addDealer, getDealerStats } from './services/dealerService';

// Pending Requests
import { getPendingRequestsByType, approvePendingRequest } from './services/pendingRequestService';

// Activities
import { getAllActivities, addActivity } from './services/activityService';

// Dashboard Stats
import { getDashboardStats, getTodayStats } from './services/dashboardService';
```

## ✨ New Features

### 1. Approve/Reject Pending Requests
- Click "Pending Requests" button in Farmers or Dealers page
- Review request details
- Click **Approve** → Automatically added to main collection
- Click **Reject** → Status updated to rejected

### 2. Add Activity Log Entries
- Go to Task Update page
- Fill in activity type, name, and action
- Click "Log Activity"
- Entry saved to Firebase and appears in list

### 3. Real-time Statistics
Dashboard automatically calculates:
- Total farmers (active/inactive)
- New farmers this month
- Dealer counts by type
- Top-rated dealers (4.5+ rating)

## 📁 New Files Created

```
src/
├── config/
│   └── firebase.js              # Firebase initialization
├── services/
│   ├── farmerService.js         # Farmer CRUD operations
│   ├── dealerService.js         # Dealer CRUD operations
│   ├── pendingRequestService.js # Pending request handling
│   ├── activityService.js       # Activity log operations
│   └── dashboardService.js      # Dashboard statistics
├── utils/
│   └── seedData.js              # Initial data seeding
└── pages/
    └── SeedDataPage.jsx         # Data seeding UI
```

## 🎯 Modified Components

| Component | Changes |
|-----------|---------|
| `VillageDashboard.jsx` | Fetches stats from Firebase, removed hardcoded data |
| `FarmersList.jsx` | Loads farmers & requests from Firebase, approve/reject working |
| `DealersList.jsx` | Loads dealers & requests from Firebase, approve/reject working |
| `TaskUpdate.jsx` | Saves activities to Firebase, loads from Firebase |
| `App.jsx` | Added `/seed-data` route |

## 🔍 View Data in Firebase Console

1. Visit: https://console.firebase.google.com
2. Select project: **vital-glytch**
3. Click **Firestore Database** in left menu
4. Browse your collections and documents

## ⚡ Common Tasks

### Add a New Farmer
```javascript
import { addFarmer } from './services/farmerService';

const newFarmer = {
  name: "John Doe",
  contact: "1234567890",
  village: "Rampur",
  crops: ["Wheat", "Rice"],
  landArea: 5.0,
  status: "Active",
  farmingType: "Organic",
  address: "Plot 100, Rampur Village"
};

await addFarmer(newFarmer);
```

### Get Filtered Farmers
```javascript
import { getFarmersByStatus } from './services/farmerService';

const activeFarmers = await getFarmersByStatus('Active');
```

### Approve Pending Request
```javascript
import { approvePendingRequest } from './services/pendingRequestService';

await approvePendingRequest(requestId, 'farmer');
// Request automatically moves to farmers collection
```

## 🛡️ Error Handling

All service functions include try-catch blocks:
```javascript
try {
  const data = await getAllFarmers();
  setFarmersData(data);
} catch (error) {
  console.error('Error fetching farmers:', error);
  // Handle error appropriately
}
```

## 📝 Notes

- **Loading States**: All pages show spinner while fetching data
- **Auto Refresh**: Lists refresh after approve/reject/add operations
- **Timestamps**: All records have `createdAt` and `updatedAt` fields
- **No Duplicates**: Run seed data only once

## 🐛 Troubleshooting

**Problem**: Data not showing
- **Solution**: Check browser console for errors, verify Firebase credentials in `.env`

**Problem**: Seed data not working
- **Solution**: Check Firebase Console → Database, ensure no permission errors

**Problem**: Approve/Reject not working
- **Solution**: Check console logs, verify request ID exists in Firebase

## ✅ Success Checklist

- [ ] Firebase credentials in `.env` file
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Initial data seeded (visit `/seed-data`)
- [ ] Dashboard loads with statistics
- [ ] Farmers list displays data from Firebase
- [ ] Dealers list displays data from Firebase
- [ ] Pending requests can be approved/rejected
- [ ] Activity log entries can be added

## 🎉 You're All Set!

Your Village Dashboard is now powered by Firebase with:
✅ Zero hardcoded data
✅ Real-time cloud database
✅ Full CRUD operations
✅ Automatic statistics
✅ Production-ready backend

Happy coding! 🚀
