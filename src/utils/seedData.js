import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Mock data to seed
const farmersData = [
  { 
    name: "Rajesh Kumar", 
    contact: "9876543210", 
    village: "Rampur",
    crops: ["Wheat", "Rice"], 
    landArea: 5.2, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 45, Rampur Village"
  },
  { 
    name: "Priya Sharma", 
    contact: "9876543221", 
    village: "Rampur",
    crops: ["Sugarcane", "Maize"], 
    landArea: 3.8, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 23, Rampur Village"
  },
  { 
    name: "Amit Singh", 
    contact: "9876543232", 
    village: "Rampur",
    crops: ["Cotton", "Paddy"], 
    landArea: 7.1, 
    status: "Inactive",
    farmingType: "Hybrid",
    address: "Plot 67, Rampur Village"
  },
  { 
    name: "Sunita Devi", 
    contact: "9876543243", 
    village: "Rampur",
    crops: ["Vegetables", "Wheat"], 
    landArea: 2.5, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 12, Rampur Village"
  },
  { 
    name: "Ravi Patel", 
    contact: "9876543254", 
    village: "Rampur",
    crops: ["Rice", "Pulses"], 
    landArea: 4.3, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 89, Rampur Village"
  },
  { 
    name: "Meera Gupta", 
    contact: "9876543265", 
    village: "Rampur",
    crops: ["Fruits", "Vegetables"], 
    landArea: 1.8, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 34, Rampur Village"
  },
  { 
    name: "Vikram Yadav", 
    contact: "9876543276", 
    village: "Rampur",
    crops: ["Wheat", "Barley"], 
    landArea: 6.7, 
    status: "Inactive",
    farmingType: "Traditional",
    address: "Plot 56, Rampur Village"
  },
  { 
    name: "Kavita Joshi", 
    contact: "9876543287", 
    village: "Rampur",
    crops: ["Sugarcane", "Vegetables"], 
    landArea: 3.2, 
    status: "Active",
    farmingType: "Hybrid",
    address: "Plot 78, Rampur Village"
  },
  { 
    name: "Arjun Verma", 
    contact: "9876543298", 
    village: "Rampur",
    crops: ["Tomatoes", "Chili", "Onions"], 
    landArea: 2.1, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 101, Rampur Village"
  },
  { 
    name: "Deepa Nair", 
    contact: "9876543309", 
    village: "Rampur",
    crops: ["Groundnut", "Soybean"], 
    landArea: 4.8, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 22, Rampur Village"
  },
  { 
    name: "Satish Reddy", 
    contact: "9876543320", 
    village: "Rampur",
    crops: ["Mango", "Coconut"], 
    landArea: 8.5, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 15, Rampur Village"
  },
  { 
    name: "Lakshmi Iyer", 
    contact: "9876543331", 
    village: "Rampur",
    crops: ["Rice", "Turmeric"], 
    landArea: 3.6, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 88, Rampur Village"
  },
  { 
    name: "Mohan Das", 
    contact: "9876543342", 
    village: "Rampur",
    crops: ["Coffee", "Cardamom"], 
    landArea: 5.9, 
    status: "Inactive",
    farmingType: "Hybrid",
    address: "Plot 47, Rampur Village"
  },
  { 
    name: "Neha Kapoor", 
    contact: "9876543353", 
    village: "Rampur",
    crops: ["Strawberry", "Lettuce"], 
    landArea: 1.2, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 9, Rampur Village"
  },
  { 
    name: "Harish Bose", 
    contact: "9876543364", 
    village: "Rampur",
    crops: ["Mustard", "Wheat"], 
    landArea: 6.3, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 71, Rampur Village"
  },
  { 
    name: "Anjali Menon", 
    contact: "9876543375", 
    village: "Rampur",
    crops: ["Banana", "Papaya"], 
    landArea: 2.9, 
    status: "Active",
    farmingType: "Organic",
    address: "Plot 33, Rampur Village"
  },
  { 
    name: "Kiran Desai", 
    contact: "9876543386", 
    village: "Rampur",
    crops: ["Grapes", "Pomegranate"], 
    landArea: 4.5, 
    status: "Inactive",
    farmingType: "Hybrid",
    address: "Plot 52, Rampur Village"
  },
  { 
    name: "Ramesh Pillai", 
    contact: "9876543397", 
    village: "Rampur",
    crops: ["Cashew", "Rubber"], 
    landArea: 7.8, 
    status: "Active",
    farmingType: "Traditional",
    address: "Plot 96, Rampur Village"
  }
];

const dealersData = [
  {
    name: 'Sharma Agro Dealers',
    contact: '9876541111',
    type: 'Seller',
    address: 'Market Road, Rampur',
    items: ['Tractor', 'Plough', 'Seeds'],
    rating: 4.7
  },
  {
    name: 'Patel Equipment Rentals',
    contact: '9876542222',
    type: 'Rent Giver',
    address: 'Station Road, Rampur',
    items: ['Tractor', 'Harvester', 'Sprayer'],
    rating: 4.5
  },
  {
    name: 'Singh Farm Supplies',
    contact: '9876543333',
    type: 'Seller',
    address: 'Main Bazaar, Rampur',
    items: ['Fertilizer', 'Seeds', 'Tools'],
    rating: 4.2
  },
  {
    name: 'Yadav Rental Services',
    contact: '9876544444',
    type: 'Rent Giver',
    address: 'Near Bus Stand, Rampur',
    items: ['Plough', 'Seeder', 'Tractor'],
    rating: 4.6
  },
  {
    name: 'Kumar Agricultural Store',
    contact: '9876545555',
    type: 'Seller',
    address: 'Old City Road, Rampur',
    items: ['Pesticides', 'Irrigation', 'Hand Tools'],
    rating: 4.3
  },
  {
    name: 'Gupta Heavy Machinery Rent',
    contact: '9876546666',
    type: 'Rent Giver',
    address: 'Industrial Area, Rampur',
    items: ['Bulldozer', 'Excavator', 'Crane'],
    rating: 4.8
  },
  {
    name: 'Verma Seeds & Fertilizer',
    contact: '9876547777',
    type: 'Seller',
    address: 'Agricultural Market, Rampur',
    items: ['Hybrid Seeds', 'Bio-fertilizers', 'Growth Enhancers'],
    rating: 4.4
  },
  {
    name: 'Modern Farm Equipment Rental',
    contact: '9876548888',
    type: 'Rent Giver',
    address: 'Highway Road, Rampur',
    items: ['Combine Harvester', 'Thresher', 'Power Tiller'],
    rating: 4.7
  },
  {
    name: 'Reddy Agri Solutions',
    contact: '9876548899',
    type: 'Seller',
    address: 'Temple Street, Rampur',
    items: ['Drip Irrigation', 'Organic Manure', 'Soil Testing Kits'],
    rating: 4.6
  },
  {
    name: 'Chopra Farm Rentals',
    contact: '9876548900',
    type: 'Rent Giver',
    address: 'Railway Colony, Rampur',
    items: ['Rotavator', 'Leveller', 'Mulcher'],
    rating: 4.3
  },
  {
    name: 'Mehta Pesticides & Co',
    contact: '9876548911',
    type: 'Seller',
    address: 'Gandhi Nagar, Rampur',
    items: ['Insecticides', 'Fungicides', 'Herbicides'],
    rating: 4.1
  },
  {
    name: 'Bhandari Equipment Hub',
    contact: '9876548922',
    type: 'Rent Giver',
    address: 'Sector 5, Rampur',
    items: ['Seed Drill', 'Cultivator', 'Water Pump'],
    rating: 4.9
  },
  {
    name: 'Green Valley Nursery',
    contact: '9876548933',
    type: 'Seller',
    address: 'Farm Road, Rampur',
    items: ['Fruit Plants', 'Flower Seeds', 'Vegetable Seedlings'],
    rating: 4.5
  },
  {
    name: 'Jain Machinery Rentals',
    contact: '9876548944',
    type: 'Rent Giver',
    address: 'Industrial Estate, Rampur',
    items: ['Loader', 'Dozer', 'Mini Tractor'],
    rating: 4.4
  }
];

const pendingFarmerRequests = [
  {
    name: 'Ravi Patil',
    contact: '9876509876',
    village: 'Rampur',
    crops: ['Rice', 'Wheat'],
    landArea: 4.5,
    farmingType: 'Organic',
    address: 'Plot 92, Rampur Village',
    requestDate: '2024-12-08',
    requestType: 'farmer',
    status: 'Pending'
  },
  {
    name: 'Anita Kumari',
    contact: '9876598765',
    village: 'Rampur',
    crops: ['Cotton', 'Maize'],
    landArea: 3.2,
    farmingType: 'Traditional',
    address: 'Plot 15, Rampur Village',
    requestDate: '2024-12-07',
    requestType: 'farmer',
    status: 'Pending'
  },
  {
    name: 'Suresh Reddy',
    contact: '9876587654',
    village: 'Rampur',
    crops: ['Sugarcane'],
    landArea: 6.0,
    farmingType: 'Hybrid',
    address: 'Plot 44, Rampur Village',
    requestDate: '2024-12-06',
    requestType: 'farmer',
    status: 'Pending'
  },
  {
    name: 'Priya Sharma',
    contact: '9876598700',
    village: 'Rampur',
    crops: ['Sunflower', 'Mustard'],
    landArea: 2.8,
    farmingType: 'Organic',
    address: 'Plot 78, Rampur Village',
    requestDate: '2024-12-09',
    requestType: 'farmer',
    status: 'Pending'
  },
  {
    name: 'Vikram Singh',
    contact: '9876598711',
    village: 'Rampur',
    crops: ['Barley', 'Chickpea'],
    landArea: 5.3,
    farmingType: 'Traditional',
    address: 'Plot 101, Rampur Village',
    requestDate: '2024-12-09',
    requestType: 'farmer',
    status: 'Pending'
  }
];

const pendingDealerRequests = [
  {
    name: 'Modern Agri Equipment',
    contact: '9876512345',
    type: 'Seller',
    address: 'New Market Road, Rampur',
    items: ['Tractor', 'Cultivator', 'Seed Drill'],
    requestDate: '2024-12-08',
    requestType: 'dealer',
    status: 'Pending'
  },
  {
    name: 'Ramesh Rental Services',
    contact: '9876523456',
    type: 'Rent Giver',
    address: 'Gandhi Chowk, Rampur',
    items: ['Harvester', 'Tractor', 'Pump'],
    requestDate: '2024-12-07',
    requestType: 'dealer',
    status: 'Pending'
  },
  {
    name: 'Agro Tech Solutions',
    contact: '9876523467',
    type: 'Seller',
    address: 'IT Park Road, Rampur',
    items: ['Drone', 'Soil Sensors', 'Weather Stations'],
    requestDate: '2024-12-09',
    requestType: 'dealer',
    status: 'Pending'
  },
  {
    name: 'Gopal Equipment Rentals',
    contact: '9876523478',
    type: 'Rent Giver',
    address: 'Village Road, Rampur',
    items: ['Sprayer', 'Weeder', 'Transplanter'],
    requestDate: '2024-12-10',
    requestType: 'dealer',
    status: 'Pending'
  }
];

const activitiesData = [
  { 
    type: 'farmer', 
    name: 'Rajesh Kumar', 
    action: 'registered', 
    time: '2 hours ago', 
    date: '2025-12-10 08:30 AM' 
  },
  { 
    type: 'dealer', 
    name: 'Sharma Agro Dealers', 
    action: 'added new equipment', 
    time: '4 hours ago', 
    date: '2025-12-10 06:30 AM' 
  },
  { 
    type: 'issue', 
    name: 'Water shortage in Sector 3', 
    action: 'reported', 
    time: '6 hours ago', 
    date: '2025-12-10 04:30 AM' 
  },
  { 
    type: 'farmer', 
    name: 'Priya Sharma', 
    action: 'updated crop information', 
    time: '1 day ago', 
    date: '2025-12-09 10:30 AM' 
  },
  { 
    type: 'issue', 
    name: 'Irrigation pump failure in Block B', 
    action: 'reported', 
    time: '1 day ago', 
    date: '2025-12-09 09:15 AM' 
  },
  { 
    type: 'dealer', 
    name: 'Patel Equipment Rentals', 
    action: 'updated rental rates', 
    time: '1 day ago', 
    date: '2025-12-09 02:00 PM' 
  },
  { 
    type: 'farmer', 
    name: 'Mohan Das', 
    action: 'requested irrigation support', 
    time: '2 days ago', 
    date: '2025-12-08 11:45 AM' 
  },
  { 
    type: 'dealer', 
    name: 'Reddy Agri Solutions', 
    action: 'registered', 
    time: '2 days ago', 
    date: '2025-12-08 09:30 AM' 
  },
  { 
    type: 'issue', 
    name: 'Pest outbreak in cotton fields', 
    action: 'reported', 
    time: '3 days ago', 
    date: '2025-12-07 07:15 AM' 
  },
  { 
    type: 'farmer', 
    name: 'Harish Bose', 
    action: 'approved for organic certification', 
    time: '3 days ago', 
    date: '2025-12-07 03:30 PM' 
  },
  { 
    type: 'dealer', 
    name: 'Bhandari Equipment Hub', 
    action: 'added new machinery', 
    time: '4 days ago', 
    date: '2025-12-06 10:00 AM' 
  },
  { 
    type: 'farmer', 
    name: 'Lakshmi Iyer', 
    action: 'submitted soil test report', 
    time: '4 days ago', 
    date: '2025-12-06 01:30 PM' 
  }
];

// Seed farmers
export const seedFarmers = async () => {
  try {
    console.log('Seeding farmers...');
    const promises = farmersData.map(farmer => 
      addDoc(collection(db, 'farmers'), farmer)
    );
    await Promise.all(promises);
    console.log('✓ Farmers seeded successfully');
  } catch (error) {
    console.error('Error seeding farmers:', error);
    throw error;
  }
};

// Seed dealers
export const seedDealers = async () => {
  try {
    console.log('Seeding dealers...');
    const promises = dealersData.map(dealer => 
      addDoc(collection(db, 'dealers'), dealer)
    );
    await Promise.all(promises);
    console.log('✓ Dealers seeded successfully');
  } catch (error) {
    console.error('Error seeding dealers:', error);
    throw error;
  }
};

// Seed pending requests
export const seedPendingRequests = async () => {
  try {
    console.log('Seeding pending requests...');
    const allRequests = [...pendingFarmerRequests, ...pendingDealerRequests];
    const promises = allRequests.map(request => 
      addDoc(collection(db, 'pendingRequests'), request)
    );
    await Promise.all(promises);
    console.log('✓ Pending requests seeded successfully');
  } catch (error) {
    console.error('Error seeding pending requests:', error);
    throw error;
  }
};

// Seed activities
export const seedActivities = async () => {
  try {
    console.log('Seeding activities...');
    const promises = activitiesData.map(activity => 
      addDoc(collection(db, 'activities'), activity)
    );
    await Promise.all(promises);
    console.log('✓ Activities seeded successfully');
  } catch (error) {
    console.error('Error seeding activities:', error);
    throw error;
  }
};

// Seed dashboard stats
export const seedDashboardStats = async () => {
  try {
    console.log('Seeding dashboard stats...');
    
    const villageOverviewStats = {
      farmers: {
        total: 135,
        active: 108,
        inactive: 27,
        newThisMonth: 12
      },
      dealers: {
        total: 14,
        rentGivers: 6,
        sellers: 8,
        topRated: 5
      },
      issues: {
        total: 48,
        resolved: 30,
        pending: 13,
        inProgress: 5
      },
      equipment: {
        available: 24,
        rented: 15,
        maintenance: 3,
        categories: 6
      }
    };

    const todayStats = {
      stockUpdates: 12,
      newMerchants: 3,
      issuesResolved: 7,
      alertsSent: 5
    };

    await setDoc(doc(db, 'dashboardStats', 'village_overview'), villageOverviewStats);
    await setDoc(doc(db, 'dashboardStats', 'today_stats'), todayStats);
    
    console.log('✓ Dashboard stats seeded successfully');
  } catch (error) {
    console.error('Error seeding dashboard stats:', error);
    throw error;
  }
};

// Seed all data
export const seedAllData = async () => {
  try {
    console.log('\n🌱 Starting data seeding process...\n');
    
    await seedFarmers();
    await seedDealers();
    await seedPendingRequests();
    await seedActivities();
    await seedDashboardStats();
    
    console.log('\n✅ All data seeded successfully!\n');
    return true;
  } catch (error) {
    console.error('\n❌ Error seeding data:', error);
    throw error;
  }
};
