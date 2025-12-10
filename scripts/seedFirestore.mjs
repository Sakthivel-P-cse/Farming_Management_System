// Standalone seed script for Firestore
// Usage: node scripts/seedFirestore.mjs

import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';

// Parse .env.local
function loadEnv() {
  const envContent = readFileSync('.env.local', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  return env;
}

const envVars = loadEnv();

const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed data
const farmers = [
  { id: 'f1', name: 'Ravi Sharma', contact: '9876543211', village: 'Rampur', farmSize: 5000, landArea: 5000, crops: ['Wheat', 'Rice'], status: 'Active', email: 'ravi.sharma@email.com' },
  { id: 'f2', name: 'Sunita Devi', contact: '9876543212', village: 'Rampur', farmSize: 3500, landArea: 3500, crops: ['Rice'], status: 'Active', email: 'sunita.devi@email.com' },
  { id: 'f3', name: 'Mohan Kumar', contact: '9876543213', village: 'Lakshmi Nagar', farmSize: 12000, landArea: 12000, crops: ['Sugarcane'], status: 'Active', email: 'mohan.kumar@email.com' },
  { id: 'f4', name: 'Lakshmi Bai', contact: '9876543214', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Cotton', 'Paddy'], status: 'Active', email: 'lakshmi.bai@email.com' },
  { id: 'f5', name: 'Ramesh Yadav', contact: '9876543215', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Vegetables'], status: 'Active', email: 'ramesh.yadav@email.com' },
  { id: 'f6', name: 'Pooja Desai', contact: '9876543216', village: 'Lakshmi Nagar', farmSize: 11000, landArea: 11000, crops: ['Maize', 'Pulses'], status: 'Active', email: 'pooja.desai@email.com' },
  { id: 'f7', name: 'Vijay Patil', contact: '9876543217', village: 'Lakshmi Nagar', farmSize: 9000, landArea: 9000, crops: ['Sugarcane', 'Maize'], status: 'Active', email: 'vijay.patil@email.com' },
  { id: 'f8', name: 'Harish Rao', contact: '9876543218', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Paddy', 'Millet'], status: 'Active', email: 'harish.rao@email.com' },
  { id: 'f9', name: 'Swapna Iyer', contact: '9876543219', village: 'Shanti Puram', farmSize: 25000, landArea: 25000, crops: ['Cotton'], status: 'Inactive', email: 'swapna.iyer@email.com' },
  { id: 'f10', name: 'Seema Kulkarni', contact: '9876543220', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Rice', 'Vegetables'], status: 'Active', email: 'seema.kulkarni@email.com' },
  { id: 'f11', name: 'Arun Das', contact: '9876543221', village: 'Green Valley', farmSize: 15000, landArea: 15000, crops: ['Rice'], status: 'Inactive', email: 'arun.das@email.com' },
  { id: 'f12', name: 'Geeta Sharma', contact: '9876543222', village: 'Rose Colony', farmSize: 10000, landArea: 10000, crops: ['Wheat', 'Pulses'], status: 'Active', email: 'geeta.sharma@email.com' },
  { id: 'f13', name: 'Imran Khan', contact: '9876543223', village: 'Rose Colony', farmSize: 9000, landArea: 9000, crops: ['Pulses'], status: 'Active', email: 'imran.khan@email.com' },
  { id: 'f14', name: 'Nisha Lal', contact: '9876543224', village: 'Rose Colony', farmSize: 9000, landArea: 9000, crops: ['Wheat'], status: 'Inactive', email: 'nisha.lal@email.com' },
];

const dealers = [
  { id: 'd1', name: 'Green Agro Supplies', contact: '9876500101', village: 'Rampur', license: 'AGR-2024-001', status: 'Active', items: ['Seeds', 'Fertilizers'], email: 'greenagro@email.com' },
  { id: 'd2', name: 'Patel Equip Rentals', contact: '9876500102', village: 'Rampur', license: 'AGR-2024-002', status: 'Active', items: ['Tractor', 'Harvester'], email: 'patel.rentals@email.com' },
  { id: 'd3', name: 'Singh Tools', contact: '9876500103', village: 'Rampur', license: 'AGR-2024-003', status: 'Active', items: ['Tools', 'Sprayers'], email: 'singh.tools@email.com' },
  { id: 'd4', name: 'Yadav Seeds', contact: '9876500104', village: 'Rampur', license: 'AGR-2024-004', status: 'Active', items: ['Seeds'], email: 'yadav.seeds@email.com' },
  { id: 'd5', name: 'Kumar Agro Center', contact: '9876500105', village: 'Rampur', license: 'AGR-2024-005', status: 'Active', items: ['Fertilizers', 'Pesticides'], email: 'kumar.agro@email.com' },
];

const godowns = [
  { id: 'g1', name: 'Rampur Central Godown', village: 'Rampur', capacity: 5000, currentStock: 3200, manager: 'Suresh Kumar', contact: '9876700101' },
  { id: 'g2', name: 'Lakshmi Nagar Storage', village: 'Lakshmi Nagar', capacity: 3000, currentStock: 1800, manager: 'Anita Sharma', contact: '9876700102' },
  { id: 'g3', name: 'Shanti Puram Warehouse', village: 'Shanti Puram', capacity: 7000, currentStock: 4500, manager: 'Prakash Reddy', contact: '9876700103' },
];

const issues = [
  { id: 'i1', title: 'Water shortage in fields', village: 'Rampur', status: 'Pending', priority: 'High', reportedBy: 'Ravi Sharma', description: 'Irrigation canal blocked' },
  { id: 'i2', title: 'Pest infestation', village: 'Shanti Puram', status: 'In Progress', priority: 'Medium', reportedBy: 'Lakshmi Bai', description: 'Cotton crop affected by pests' },
  { id: 'i3', title: 'Fertilizer delivery delayed', village: 'Lakshmi Nagar', status: 'Pending', priority: 'High', reportedBy: 'Mohan Kumar', description: 'Ordered fertilizers not received' },
  { id: 'i4', title: 'Road repair needed', village: 'Green Valley', status: 'Resolved', priority: 'Low', reportedBy: 'Ramesh Yadav', description: 'Farm access road damaged' },
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding Firestore database...\n');

    // Seed farmers
    for (const farmer of farmers) {
      const { id, ...data } = farmer;
      await setDoc(doc(db, 'farmers', id), { ...data, createdAt: serverTimestamp() });
    }
    console.log(`✓ Farmers seeded (${farmers.length})`);

    // Seed dealers
    for (const dealer of dealers) {
      const { id, ...data } = dealer;
      await setDoc(doc(db, 'dealers', id), { ...data, createdAt: serverTimestamp() });
    }
    console.log(`✓ Dealers seeded (${dealers.length})`);

    // Seed godowns
    for (const godown of godowns) {
      const { id, ...data } = godown;
      await setDoc(doc(db, 'godowns', id), { ...data, createdAt: serverTimestamp() });
    }
    console.log(`✓ Godowns seeded (${godowns.length})`);

    // Seed issues
    for (const issue of issues) {
      const { id, ...data } = issue;
      await setDoc(doc(db, 'issues', id), { ...data, createdAt: serverTimestamp() });
    }
    console.log(`✓ Issues seeded (${issues.length})`);

    console.log('\n✅ Database seeding complete!');
    console.log('\n📊 Summary:');
    console.log(`   Farmers: ${farmers.length}`);
    console.log(`   Dealers: ${dealers.length}`);
    console.log(`   Godowns: ${godowns.length}`);
    console.log(`   Issues: ${issues.length}`);
    console.log(`   Total Farming Area: 234,000 sqft (~5.37 acres)`);
    console.log('\n✅ Start the app: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding:', error.message);
    process.exit(1);
  }
}

seedDatabase();
