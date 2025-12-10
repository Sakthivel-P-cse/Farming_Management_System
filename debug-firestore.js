import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCDAA4aro1H6bIt-mVWpwGBtqGVVWZyVs",
  authDomain: "vital-glytch.firebaseapp.com",
  projectId: "vital-glytch",
  storageBucket: "vital-glytch.firebasestorage.app",
  messagingSenderId: "754962970144",
  appId: "1:754962970144:web:86690c5f06806c5f096e45",
  measurementId: "G-DJD4HWT8ST"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkFirestoreData() {
  try {
    console.log('=== Checking Users Collection ===\n');
    
    // Get all users with role 'farmer'
    const farmersQuery = query(collection(db, 'users'), where('role', '==', 'farmer'));
    const farmerSnapshot = await getDocs(farmersQuery);
    
    console.log(`Total farmers found: ${farmerSnapshot.size}\n`);
    
    farmerSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`--- Farmer ${index + 1} (ID: ${doc.id}) ---`);
      console.log(`Role: ${data.role}`);
      console.log(`Email: ${data.email}`);
      console.log(`Phone: ${data.phone}`);
      console.log(`Profile:`, data.profile);
      console.log(`ApprovalStatus: ${data.profile?.approvalStatus}`);
      console.log('');
    });
    
    // Check pending farmers
    console.log('\n=== Checking Pending Farmers ===\n');
    const pendingQuery = query(
      collection(db, 'users'),
      where('role', '==', 'farmer'),
      where('profile.approvalStatus', '==', 'pending')
    );
    const pendingSnapshot = await getDocs(pendingQuery);
    
    console.log(`Pending farmers found: ${pendingSnapshot.size}\n`);
    
    pendingSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`--- Pending Farmer ${index + 1} (ID: ${doc.id}) ---`);
      console.log(`Name: ${data.profile?.fullName}`);
      console.log(`Email: ${data.email}`);
      console.log(`Status: ${data.profile?.approvalStatus}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFirestoreData();
