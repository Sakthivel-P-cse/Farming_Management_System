// Simple script to create demo Firebase Auth accounts
// Usage: node createDemoAccounts.mjs

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';

// Parse .env.local manually
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
    console.error('❌ .env.local not found. Please create it with Firebase config.');
    process.exit(1);
  }
}

const envVars = loadEnv();

const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY || '',
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: envVars.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: envVars.VITE_FIREBASE_APP_ID || '',
};

if (!firebaseConfig.projectId) {
  console.error('❌ Firebase config not found. Ensure .env.local has VITE_FIREBASE_* variables');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const demoAccounts = [
  { email: 'district2@example.com', password: 'Demo@2345', name: 'Meera Sharma', id: 'district2' },
  { email: 'district3@example.com', password: 'Demo@3456', name: 'Vijay Reddy', id: 'district3' },
  { email: 'district4@example.com', password: 'Demo@4567', name: 'Sunita Patel', id: 'district4' },
  { email: 'district5@example.com', password: 'Demo@5678', name: 'Rajan Nair', id: 'district5' },
  { email: 'demo.district@glytch.local', password: 'Demo@9999', name: 'Demo District Officer', id: 'district-demo' },
];

async function createDemoAccounts() {
  try {
    console.log('🔐 Creating demo Firebase Auth accounts...\n');
    let created = 0;
    let existing = 0;

    for (const account of demoAccounts) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, account.email, account.password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'users', uid), {
          email: account.email,
          name: account.name,
          role: 'district',
          district: 'Demo/Test District',
          contact: '9000000000',
          villagesManaged: 5,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        console.log(`✓ Created: ${account.email}`);
        console.log(`  Password: ${account.password}\n`);
        created++;
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⊘ Already exists: ${account.email}\n`);
          existing++;
        } else {
          console.error(`✗ Error for ${account.email}:`, error.message, '\n');
        }
      }
    }

    console.log(`\n✅ Demo account setup complete!`);
    console.log(`   Created: ${created} | Already existed: ${existing}`);
    console.log('\n📊 Next: Seed Firestore with demo data:');
    console.log('   node -e "import(\'./src/firebase/seedData.js\').then(m => m.seedDatabase())"');
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

createDemoAccounts();
