// Test district officer login
// Usage: node scripts/testDistrictOfficerLogin.mjs

import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

async function testDistrictOfficerLogin() {
  try {
    console.log('🧪 Testing district officer login flow...\n');
    
    const email = 'demo.district@glytch.local';
    const password = 'Demo@9999';
    
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}\n`);
    
    // Step 1: Sign in with Firebase Auth
    console.log('1️⃣  Signing in with Firebase Auth...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    console.log(`   ✓ Firebase Auth successful`);
    console.log(`   UID: ${firebaseUser.uid}`);
    console.log(`   Email: ${firebaseUser.email}\n`);
    
    // Step 2: Get user profile from Firestore
    console.log('2️⃣  Fetching user profile from Firestore...');
    const docRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log(`   ✓ User profile found`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   District: ${userData.district}\n`);
      
      // Step 3: Verify role routing
      console.log('3️⃣  Checking role-based routing...');
      if (userData.role === 'district') {
        console.log(`   ✓ User should be routed to: /\n`);
      } else {
        console.log(`   ✗ Unexpected role: ${userData.role}\n`);
      }
      
      console.log('✅ Login test successful!');
      console.log('\n📝 You can now login in the browser with:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
    } else {
      console.log(`   ✗ User profile not found in Firestore`);
      console.log(`   This is the problem!\n`);
      console.log('❌ Login test failed!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('💥 Error:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.error('   User not found in Firebase Auth');
    } else if (error.code === 'auth/wrong-password') {
      console.error('   Wrong password');
    } else if (error.code === 'auth/invalid-credential') {
      console.error('   Invalid email/password combination');
    }
    process.exit(1);
  }
}

testDistrictOfficerLogin();
