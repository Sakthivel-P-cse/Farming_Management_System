// Seed data for initializing Firebase Firestore
// Run this once to populate the database with initial data

import { db } from '../config/firebase.js';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// District Officers data
const districtOfficers = [
  {
    id: 'district1',
    email: 'district@example.com',
    name: 'Arun Krishnan',
    role: 'district',
    district: 'Central District',
    contact: '9876500001',
    villagesManaged: 10
  },
  {
    id: 'district-demo',
    email: 'demo.district@glytch.local',
    name: 'Demo District Officer',
    role: 'district',
    district: 'Demo District',
    contact: '9000000000',
    villagesManaged: 5,
    note: 'Forged demo account for UI showcases'
  },
  {
    id: 'district2',
    email: 'district2@example.com',
    name: 'Meera Sharma',
    role: 'district',
    district: 'North District',
    contact: '9876500002',
    villagesManaged: 8
  },
  {
    id: 'district3',
    email: 'district3@example.com',
    name: 'Vijay Reddy',
    role: 'district',
    district: 'South District',
    contact: '9876500003',
    villagesManaged: 12
  },
  {
    id: 'district4',
    email: 'district4@example.com',
    name: 'Sunita Patel',
    role: 'district',
    district: 'East District',
    contact: '9876500004',
    villagesManaged: 9
  },
  {
    id: 'district5',
    email: 'district5@example.com',
    name: 'Rajan Nair',
    role: 'district',
    district: 'West District',
    contact: '9876500005',
    villagesManaged: 11
  }
];

// Village Officers data
const villageOfficers = [
  {
    id: 'village1',
    email: 'village.rampur@glytch.gov.in',
    name: 'Rajesh Kumar',
    role: 'village',
    village: 'Rampur',
    contact: '9876543210'
  },
  {
    id: 'village2',
    email: 'village.lakshminagar@glytch.gov.in',
    name: 'Priya Singh',
    role: 'village',
    village: 'Lakshmi Nagar',
    contact: '9876543220'
  },
  {
    id: 'village3',
    email: 'village.shantipuram@glytch.gov.in',
    name: 'Amit Verma',
    role: 'village',
    village: 'Shanti Puram',
    contact: '9876543230'
  },
  {
    id: 'village4',
    email: 'village.greenvalley@glytch.gov.in',
    name: 'Neha Kapoor',
    role: 'village',
    village: 'Green Valley',
    contact: '9876543240'
  },
  {
    id: 'village5',
    email: 'village.rosecolony@glytch.gov.in',
    name: 'Suresh Patel',
    role: 'village',
    village: 'Rose Colony',
    contact: '9876543250'
  }
];

// Villages data
const villages = [
  { id: 'v1', name: 'Rampur', farmers: 120, crops: ['Wheat', 'Rice'], area: 54000, activeIssues: 2, dealers: 8, godowns: 2 },
  { id: 'v2', name: 'Lakshmi Nagar', farmers: 80, crops: ['Sugarcane', 'Maize'], area: 32000, activeIssues: 1, dealers: 5, godowns: 1 },
  { id: 'v3', name: 'Shanti Puram', farmers: 150, crops: ['Paddy', 'Cotton'], area: 75000, activeIssues: 3, dealers: 10, godowns: 3 },
  { id: 'v4', name: 'Green Valley', farmers: 90, crops: ['Rice', 'Vegetables'], area: 45000, activeIssues: 1, dealers: 6, godowns: 2 },
  { id: 'v5', name: 'Rose Colony', farmers: 70, crops: ['Wheat', 'Pulses'], area: 28000, activeIssues: 1, dealers: 4, godowns: 1 }
];

// Sample farmers data (landArea in sqft)
const farmers = [
  // Rampur
  { id: 'f1', name: 'Ravi Sharma', contact: '9876543211', village: 'Rampur', farmSize: 5000, landArea: 5000, crops: ['Wheat', 'Rice'], status: 'Active', email: 'ravi.sharma@email.com' },
  { id: 'f2', name: 'Sunita Devi', contact: '9876543212', village: 'Rampur', farmSize: 3500, landArea: 3500, crops: ['Rice'], status: 'Active', email: 'sunita.devi@email.com' },

  // Lakshmi Nagar (totals to ~32,000 sqft)
  { id: 'f3', name: 'Mohan Kumar', contact: '9876543213', village: 'Lakshmi Nagar', farmSize: 12000, landArea: 12000, crops: ['Sugarcane'], status: 'Active', email: 'mohan.kumar@email.com' },
  { id: 'f6', name: 'Pooja Desai', contact: '9876543216', village: 'Lakshmi Nagar', farmSize: 11000, landArea: 11000, crops: ['Maize', 'Pulses'], status: 'Active', email: 'pooja.desai@email.com' },
  { id: 'f7', name: 'Vijay Patil', contact: '9876543217', village: 'Lakshmi Nagar', farmSize: 9000, landArea: 9000, crops: ['Sugarcane', 'Maize'], status: 'Active', email: 'vijay.patil@email.com' },

  // Shanti Puram (totals to ~75,000 sqft)
  { id: 'f4', name: 'Lakshmi Bai', contact: '9876543214', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Cotton', 'Paddy'], status: 'Active', email: 'lakshmi.bai@email.com' },
  { id: 'f8', name: 'Harish Rao', contact: '9876543218', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Paddy', 'Millet'], status: 'Active', email: 'harish.rao@email.com' },
  { id: 'f9', name: 'Swapna Iyer', contact: '9876543219', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Cotton'], status: 'Inactive', email: 'swapna.iyer@email.com' },

  // Green Valley (totals to ~45,000 sqft)
  { id: 'f5', name: 'Ramesh Yadav', contact: '9876543215', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Vegetables'], status: 'Active', email: 'ramesh.yadav@email.com' },
  { id: 'f10', name: 'Seema Kulkarni', contact: '9876543220', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Rice', 'Vegetables'], status: 'Active', email: 'seema.kulkarni@email.com' },
  { id: 'f11', name: 'Arun Das', contact: '9876543221', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Rice'], status: 'Inactive', email: 'arun.das@email.com' },

  // Rose Colony (totals to ~28,000 sqft)
  { id: 'f12', name: 'Geeta Sharma', contact: '9876543222', village: 'Rose Colony', farmSize: 10000, landArea: 10000, crops: ['Wheat', 'Pulses'], status: 'Active', email: 'geeta.sharma@email.com' },
  { id: 'f13', name: 'Imran Khan', contact: '9876543223', village: 'Rose Colony', farmSize: 9000, landArea: 9000, crops: ['Pulses'], status: 'Active', email: 'imran.khan@email.com' },
  { id: 'f14', name: 'Nisha Lal', contact: '9876543224', village: 'Rose Colony', farmSize: 9000, landArea: 9000, crops: ['Wheat'], status: 'Inactive', email: 'nisha.lal@email.com' }
];

// Sample dealers data (match village counts)
const dealers = [
  // Rampur (8)
  { id: 'd1', name: 'Green Agro Supplies', contact: '9876500101', village: 'Rampur', license: 'AGR-2024-001', status: 'Active', items: ['Seeds', 'Fertilizers'], email: 'greenagro@email.com' },
  { id: 'd2', name: 'Patel Equip Rentals', contact: '9876500102', village: 'Rampur', license: 'AGR-2024-002', status: 'Active', items: ['Tractor', 'Harvester'], email: 'patel.rentals@email.com' },
  { id: 'd3', name: 'Singh Tools', contact: '9876500103', village: 'Rampur', license: 'AGR-2024-003', status: 'Active', items: ['Tools', 'Sprayers'], email: 'singh.tools@email.com' },
  { id: 'd4', name: 'Yadav Seeds', contact: '9876500104', village: 'Rampur', license: 'AGR-2024-004', status: 'Active', items: ['Seeds'], email: 'yadav.seeds@email.com' },
  { id: 'd5', name: 'Kumar Agro Center', contact: '9876500105', village: 'Rampur', license: 'AGR-2024-005', status: 'Active', items: ['Fertilizers', 'Pesticides'], email: 'kumar.agro@email.com' },
  { id: 'd6', name: 'Verma Implements', contact: '9876500106', village: 'Rampur', license: 'AGR-2024-006', status: 'Active', items: ['Implements'], email: 'verma.impl@email.com' },
  { id: 'd7', name: 'Joshi Rentals', contact: '9876500107', village: 'Rampur', license: 'AGR-2024-007', status: 'Active', items: ['Rentals'], email: 'joshi.rentals@email.com' },
  { id: 'd8', name: 'Mehta Crop Care', contact: '9876500108', village: 'Rampur', license: 'AGR-2024-008', status: 'Active', items: ['Crop Care'], email: 'mehta.crop@email.com' },

  // Lakshmi Nagar (5)
  { id: 'd9', name: 'Kisan Traders', contact: '9876500111', village: 'Lakshmi Nagar', license: 'AGR-2024-009', status: 'Active', items: ['Pesticides', 'Tools'], email: 'kisan.ln@email.com' },
  { id: 'd10', name: 'Sugarcane Inputs', contact: '9876500112', village: 'Lakshmi Nagar', license: 'AGR-2024-010', status: 'Active', items: ['Sugarcane Sets', 'Fertilizers'], email: 'sugarcane.inputs@email.com' },
  { id: 'd11', name: 'Maize Depot', contact: '9876500113', village: 'Lakshmi Nagar', license: 'AGR-2024-011', status: 'Active', items: ['Maize Seeds'], email: 'maize.depot@email.com' },
  { id: 'd12', name: 'Agro Tools LN', contact: '9876500114', village: 'Lakshmi Nagar', license: 'AGR-2024-012', status: 'Active', items: ['Implements'], email: 'agrotools.ln@email.com' },
  { id: 'd13', name: 'LN Rentals', contact: '9876500115', village: 'Lakshmi Nagar', license: 'AGR-2024-013', status: 'Active', items: ['Rentals'], email: 'ln.rentals@email.com' },

  // Shanti Puram (10)
  { id: 'd14', name: 'Farmers Hub', contact: '9876500121', village: 'Shanti Puram', license: 'AGR-2024-014', status: 'Active', items: ['Seeds', 'Equipment'], email: 'farmershub.sp@email.com' },
  { id: 'd15', name: 'Cotton Care', contact: '9876500122', village: 'Shanti Puram', license: 'AGR-2024-015', status: 'Active', items: ['Cotton Seeds'], email: 'cotton.care@email.com' },
  { id: 'd16', name: 'Paddy Plus', contact: '9876500123', village: 'Shanti Puram', license: 'AGR-2024-016', status: 'Active', items: ['Paddy Seeds'], email: 'paddy.plus@email.com' },
  { id: 'd17', name: 'SP Rentals', contact: '9876500124', village: 'Shanti Puram', license: 'AGR-2024-017', status: 'Active', items: ['Rentals'], email: 'sp.rentals@email.com' },
  { id: 'd18', name: 'Agro Mart SP', contact: '9876500125', village: 'Shanti Puram', license: 'AGR-2024-018', status: 'Active', items: ['Fertilizers'], email: 'agro.sp@email.com' },
  { id: 'd19', name: 'Harvest Equip', contact: '9876500126', village: 'Shanti Puram', license: 'AGR-2024-019', status: 'Active', items: ['Harvesters'], email: 'harvest.sp@email.com' },
  { id: 'd20', name: 'SP Implements', contact: '9876500127', village: 'Shanti Puram', license: 'AGR-2024-020', status: 'Active', items: ['Implements'], email: 'implements.sp@email.com' },
  { id: 'd21', name: 'Crop Shield', contact: '9876500128', village: 'Shanti Puram', license: 'AGR-2024-021', status: 'Active', items: ['Pesticides'], email: 'cropshield.sp@email.com' },
  { id: 'd22', name: 'SP Seeds', contact: '9876500129', village: 'Shanti Puram', license: 'AGR-2024-022', status: 'Active', items: ['Seeds'], email: 'sp.seeds@email.com' },
  { id: 'd23', name: 'Agri Store SP', contact: '9876500130', village: 'Shanti Puram', license: 'AGR-2024-023', status: 'Active', items: ['Tools'], email: 'agristore.sp@email.com' },

  // Green Valley (6)
  { id: 'd24', name: 'Green Valley Supplies', contact: '9876500131', village: 'Green Valley', license: 'AGR-2024-024', status: 'Active', items: ['Seeds', 'Veg Inputs'], email: 'gv.supplies@email.com' },
  { id: 'd25', name: 'GV Rentals', contact: '9876500132', village: 'Green Valley', license: 'AGR-2024-025', status: 'Active', items: ['Rentals'], email: 'gv.rentals@email.com' },
  { id: 'd26', name: 'Rice Depot GV', contact: '9876500133', village: 'Green Valley', license: 'AGR-2024-026', status: 'Active', items: ['Rice Seeds'], email: 'rice.gv@email.com' },
  { id: 'd27', name: 'Veg Care', contact: '9876500134', village: 'Green Valley', license: 'AGR-2024-027', status: 'Active', items: ['Vegetable Seeds'], email: 'vegcare.gv@email.com' },
  { id: 'd28', name: 'GV Implements', contact: '9876500135', village: 'Green Valley', license: 'AGR-2024-028', status: 'Active', items: ['Implements'], email: 'implements.gv@email.com' },
  { id: 'd29', name: 'Crop Guard GV', contact: '9876500136', village: 'Green Valley', license: 'AGR-2024-029', status: 'Active', items: ['Pesticides'], email: 'cropguard.gv@email.com' },

  // Rose Colony (4)
  { id: 'd30', name: 'Rose Agro', contact: '9876500137', village: 'Rose Colony', license: 'AGR-2024-030', status: 'Active', items: ['Seeds'], email: 'rose.agro@email.com' },
  { id: 'd31', name: 'Pulse Depot', contact: '9876500138', village: 'Rose Colony', license: 'AGR-2024-031', status: 'Active', items: ['Pulses'], email: 'pulse.rose@email.com' },
  { id: 'd32', name: 'RC Rentals', contact: '9876500139', village: 'Rose Colony', license: 'AGR-2024-032', status: 'Active', items: ['Rentals'], email: 'rc.rentals@email.com' },
  { id: 'd33', name: 'Wheat Corner', contact: '9876500140', village: 'Rose Colony', license: 'AGR-2024-033', status: 'Active', items: ['Wheat Seeds'], email: 'wheat.rose@email.com' },
];

// Sample merchants data
const merchants = [
  { id: 'm1', name: 'Krishna Rice Mill', contact: '9876600101', crops: ['Rice', 'Paddy'], villages: ['Rampur', 'Green Valley'], rate: '₹2,200/quintal', email: 'krishnamill@email.com' },
  { id: 'm2', name: 'Sharma Wheat Traders', contact: '9876600102', crops: ['Wheat'], villages: ['Rampur', 'Rose Colony'], rate: '₹2,400/quintal', email: 'sharmawheat@email.com' },
  { id: 'm3', name: 'Sugarcane Co-op', contact: '9876600103', crops: ['Sugarcane'], villages: ['Lakshmi Nagar'], rate: '₹350/quintal', email: 'sugarcanecoop@email.com' }
];

// Sample godowns data
const godowns = [
  // Rampur (2)
  { id: 'g1', name: 'Rampur Central Godown', village: 'Rampur', capacity: 5000, currentStock: 3200, manager: 'Suresh Kumar', contact: '9876700101' },
  { id: 'g2', name: 'Rampur East Storage', village: 'Rampur', capacity: 4000, currentStock: 2100, manager: 'Anil Mehta', contact: '9876700102' },

  // Lakshmi Nagar (1)
  { id: 'g3', name: 'Lakshmi Nagar Storage', village: 'Lakshmi Nagar', capacity: 3000, currentStock: 1800, manager: 'Anita Sharma', contact: '9876700103' },

  // Shanti Puram (3)
  { id: 'g4', name: 'Shanti Puram Warehouse', village: 'Shanti Puram', capacity: 7000, currentStock: 4500, manager: 'Prakash Reddy', contact: '9876700104' },
  { id: 'g5', name: 'SP West Storage', village: 'Shanti Puram', capacity: 6000, currentStock: 3000, manager: 'Geeta Rao', contact: '9876700105' },
  { id: 'g6', name: 'SP South Depot', village: 'Shanti Puram', capacity: 5000, currentStock: 2800, manager: 'Mahesh Varma', contact: '9876700106' },

  // Green Valley (2)
  { id: 'g7', name: 'Green Valley Depot', village: 'Green Valley', capacity: 4000, currentStock: 2000, manager: 'Ritu Singh', contact: '9876700107' },
  { id: 'g8', name: 'GV Storage North', village: 'Green Valley', capacity: 3500, currentStock: 1500, manager: 'Kunal Das', contact: '9876700108' },

  // Rose Colony (1)
  { id: 'g9', name: 'Rose Colony Godown', village: 'Rose Colony', capacity: 3000, currentStock: 1200, manager: 'Farah Ali', contact: '9876700109' },
];

// Sample issues data
const issues = [
  // Rampur (2 active-ish)
  { id: 'i1', title: 'Water shortage in fields', village: 'Rampur', status: 'Pending', priority: 'High', reportedBy: 'Ravi Sharma', description: 'Irrigation canal blocked' },
  { id: 'i2', title: 'Storage leak check', village: 'Rampur', status: 'In Progress', priority: 'Medium', reportedBy: 'Sunita Devi', description: 'Minor leak in godown roof' },

  // Lakshmi Nagar (1)
  { id: 'i3', title: 'Fertilizer delivery delayed', village: 'Lakshmi Nagar', status: 'Pending', priority: 'High', reportedBy: 'Mohan Kumar', description: 'Ordered fertilizers not received' },

  // Shanti Puram (3)
  { id: 'i4', title: 'Pest infestation', village: 'Shanti Puram', status: 'In Progress', priority: 'Medium', reportedBy: 'Lakshmi Bai', description: 'Cotton crop affected by pests' },
  { id: 'i5', title: 'Canal desilting needed', village: 'Shanti Puram', status: 'Pending', priority: 'High', reportedBy: 'Harish Rao', description: 'Sediment blocking flow' },
  { id: 'i6', title: 'Bridge repair near fields', village: 'Shanti Puram', status: 'In Progress', priority: 'Low', reportedBy: 'Swapna Iyer', description: 'Footbridge planks loose' },

  // Green Valley (1)
  { id: 'i7', title: 'Road repair needed', village: 'Green Valley', status: 'Resolved', priority: 'Low', reportedBy: 'Ramesh Yadav', description: 'Farm access road damaged' },

  // Rose Colony (1)
  { id: 'i8', title: 'Pump maintenance', village: 'Rose Colony', status: 'Pending', priority: 'Medium', reportedBy: 'Geeta Sharma', description: 'Borewell pump vibration' },
];

// Seed function
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Seed users (district and village officers)
    const allUsers = [...districtOfficers, ...villageOfficers];
    for (const user of allUsers) {
      const { id, ...userData } = user;
      await setDoc(doc(db, 'users', id), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Users seeded');

    // Seed villages
    for (const village of villages) {
      const { id, ...villageData } = village;
      await setDoc(doc(db, 'villages', id), {
        ...villageData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Villages seeded');

    // Seed farmers
    for (const farmer of farmers) {
      const { id, ...farmerData } = farmer;
      await setDoc(doc(db, 'farmers', id), {
        ...farmerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Farmers seeded');

    // Seed dealers
    for (const dealer of dealers) {
      const { id, ...dealerData } = dealer;
      await setDoc(doc(db, 'dealers', id), {
        ...dealerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Dealers seeded');

    // Seed merchants
    for (const merchant of merchants) {
      const { id, ...merchantData } = merchant;
      await setDoc(doc(db, 'merchants', id), {
        ...merchantData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Merchants seeded');

    // Seed godowns
    for (const godown of godowns) {
      const { id, ...godownData } = godown;
      await setDoc(doc(db, 'godowns', id), {
        ...godownData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Godowns seeded');

    // Seed issues
    for (const issue of issues) {
      const { id, ...issueData } = issue;
      await setDoc(doc(db, 'issues', id), {
        ...issueData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    console.log('✓ Issues seeded');

    console.log('Database seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error: error.message };
  }
};

export default seedDatabase;
