// Create village officer Firebase Auth accounts
// Usage: node scripts/createVillageOfficers.mjs

import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

const villageOfficers = [
  { email: 'village.rampur@glytch.gov.in', password: 'Village@1234', name: 'Rajesh Kumar', village: 'Rampur', id: 'village1' },
  { email: 'village.lakshminagar@glytch.gov.in', password: 'Village@1234', name: 'Priya Singh', village: 'Lakshmi Nagar', id: 'village2' },
  { email: 'village.shantipuram@glytch.gov.in', password: 'Village@1234', name: 'Amit Verma', village: 'Shanti Puram', id: 'village3' },
  { email: 'village.greenvalley@glytch.gov.in', password: 'Village@1234', name: 'Neha Kapoor', village: 'Green Valley', id: 'village4' },
  { email: 'village.rosecolony@glytch.gov.in', password: 'Village@1234', name: 'Suresh Patel', village: 'Rose Colony', id: 'village5' },
];

async function createVillageOfficers() {
  try {
    console.log('🌾 Creating village officer Firebase Auth accounts...\n');
    let created = 0;
    let existing = 0;

    for (const officer of villageOfficers) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, officer.email, officer.password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'users', uid), {
          email: officer.email,
          name: officer.name,
          role: 'village',
          village: officer.village,
          contact: '9000000000',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        console.log(`✓ Created: ${officer.email}`);
        console.log(`  Village: ${officer.village}`);
        console.log(`  Password: ${officer.password}\n`);
        created++;
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⊘ Already exists: ${officer.email}\n`);
          existing++;
        } else {
          console.error(`✗ Error for ${officer.email}:`, error.message, '\n');
        }
      }
    }

    console.log(`\n✅ Village officer setup complete!`);
    console.log(`   Created: ${created} | Already existed: ${existing}`);
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

createVillageOfficers();
