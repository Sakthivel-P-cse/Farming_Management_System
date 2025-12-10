// Check all district officer accounts
// Usage: node scripts/checkDistrictAccounts.mjs

import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Parse .env.local
function loadEnv() {
  try {
    const envContent = readFileSync('.env.local', 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    });
    return env;
  } catch (e) {
    console.error('❌ .env.local not found.');
    process.exit(1);
  }
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

async function checkDistrictAccounts() {
  try {
    console.log('🔍 Checking all district officer accounts in Firestore...\n');
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'district'));
    const snapshot = await getDocs(q);
    
    console.log(`Found ${snapshot.size} district officer account(s):\n`);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`📌 Document ID: ${doc.id}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Name: ${data.name}`);
      console.log(`   District: ${data.district || 'N/A'}`);
      console.log(`   Doc ID length: ${doc.id.length}`);
      console.log(`   Is Firebase UID format: ${doc.id.length > 20 ? '✓' : '✗'}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

checkDistrictAccounts();
