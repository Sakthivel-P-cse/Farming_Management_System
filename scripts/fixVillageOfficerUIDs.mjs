// Fix village officer Firestore documents to use Firebase UID as document ID
// Usage: node scripts/fixVillageOfficerUIDs.mjs

import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';

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

const villageOfficerEmails = [
  'village.rampur@glytch.gov.in',
  'village.lakshminagar@glytch.gov.in',
  'village.shantipuram@glytch.gov.in',
  'village.greenvalley@glytch.gov.in',
  'village.rosecolony@glytch.gov.in',
];

const villageOfficerData = {
  'village.rampur@glytch.gov.in': { name: 'Rajesh Kumar', village: 'Rampur' },
  'village.lakshminagar@glytch.gov.in': { name: 'Priya Singh', village: 'Lakshmi Nagar' },
  'village.shantipuram@glytch.gov.in': { name: 'Amit Verma', village: 'Shanti Puram' },
  'village.greenvalley@glytch.gov.in': { name: 'Neha Kapoor', village: 'Green Valley' },
  'village.rosecolony@glytch.gov.in': { name: 'Suresh Patel', village: 'Rose Colony' },
};

async function fixVillageOfficerUIDs() {
  try {
    console.log('🔧 Fixing village officer Firestore documents...\n');
    
    // Get all documents from the 'users' collection
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    let fixed = 0;
    let skipped = 0;
    const oldDocIds = [];
    
    // First pass: identify old documents and create new ones with UIDs
    for (const userDoc of snapshot.docs) {
      const userData = userDoc.data();
      const documentId = userDoc.id;
      
      // Check if this is a village officer with a custom ID
      if (userData.role === 'village' && villageOfficerEmails.includes(userData.email)) {
        const email = userData.email;
        
        // Check if document ID is already a Firebase UID (long alphanumeric string)
        if (documentId.length > 20 && !documentId.startsWith('village')) {
          console.log(`✓ ${email}`);
          console.log(`  Document ID already looks like Firebase UID: ${documentId}\n`);
          skipped++;
        } else {
          // This is a custom ID document
          console.log(`Found old document: ${email}`);
          console.log(`  Current Doc ID: ${documentId}`);
          
          // If userData contains uid field, use it
          if (userData.uid) {
            console.log(`  Has uid field: ${userData.uid}`);
            
            // Create new document with UID as ID
            await setDoc(doc(db, 'users', userData.uid), {
              email: userData.email,
              name: userData.name,
              role: userData.role,
              village: userData.village,
              contact: userData.contact || '9000000000',
              createdAt: userData.createdAt || serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            
            // Delete old document
            await deleteDoc(doc(db, 'users', documentId));
            
            console.log(`  ✓ Migrated to UID: ${userData.uid}`);
            console.log(`  ✓ Deleted old document\n`);
            fixed++;
            oldDocIds.push(documentId);
          } else {
            console.log(`  ⚠ No uid field found in document`);
            console.log(`  → Skipping (cannot determine Firebase UID)\n`);
            skipped++;
          }
        }
      }
    }
    
    console.log(`✅ Migration complete!`);
    console.log(`   Fixed: ${fixed} | Skipped: ${skipped}`);
    if (fixed > 0) {
      console.log(`\n📝 Migrated documents from IDs: ${oldDocIds.join(', ')}`);
    }
    process.exit(0);
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

fixVillageOfficerUIDs();
