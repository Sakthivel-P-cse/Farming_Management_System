// Script to add demo district officer account to Firebase Auth
// Run this once to create the auth user, then seed the Firestore data

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Demo credentials
const demoAccounts = [
  {
    email: 'district2@example.com',
    password: 'Demo@2345',
    name: 'Meera Sharma',
    id: 'district2'
  },
  {
    email: 'district3@example.com',
    password: 'Demo@3456',
    name: 'Vijay Reddy',
    id: 'district3'
  },
  {
    email: 'district4@example.com',
    password: 'Demo@4567',
    name: 'Sunita Patel',
    id: 'district4'
  },
  {
    email: 'district5@example.com',
    password: 'Demo@5678',
    name: 'Rajan Nair',
    id: 'district5'
  },
  {
    email: 'demo.district@glytch.local',
    password: 'Demo@9999',
    name: 'Demo District Officer',
    id: 'district-demo'
  }
];

async function createDemoAccounts() {
  try {
    console.log('Creating demo Firebase Auth accounts...\n');

    for (const account of demoAccounts) {
      try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          account.email,
          account.password
        );

        const uid = userCredential.user.uid;

        // Add user document to Firestore
        await setDoc(doc(db, 'users', account.id), {
          uid,
          email: account.email,
          name: account.name,
          role: 'district',
          district: 'Demo/Test District',
          contact: '9000000000',
          villagesManaged: 5,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        console.log(`✓ Created: ${account.email} (Password: ${account.password})`);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⊘ Already exists: ${account.email}`);
        } else {
          console.error(`✗ Error creating ${account.email}:`, error.message);
        }
      }
    }

    console.log('\n✓ Demo accounts setup complete!');
    console.log('\nNext step: Run the seed script to populate Firestore with demo data:');
    console.log('  node -e "import(\'./src/firebase/seedData.js\').then(m => m.seedDatabase())"');
    
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the function
createDemoAccounts();
