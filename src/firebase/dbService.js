// Firebase Firestore Database Service
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// ==================== USERS ====================

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'User not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Create or update user profile
export const saveUserProfile = async (userId, userData) => {
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', role));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: users, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// ==================== FARMERS ====================

// Get all farmers
export const getAllFarmers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'farmers'));
    const farmers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: farmers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get farmers by village
export const getFarmersByVillage = async (village) => {
  try {
    const q = query(collection(db, 'farmers'), where('village', '==', village));
    const querySnapshot = await getDocs(q);
    const farmers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: farmers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get farmer by ID
export const getFarmerById = async (farmerId) => {
  try {
    const docRef = doc(db, 'farmers', farmerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Farmer not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Add new farmer
export const addFarmer = async (farmerData) => {
  try {
    const docRef = await addDoc(collection(db, 'farmers'), {
      ...farmerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Update farmer
export const updateFarmer = async (farmerId, farmerData) => {
  try {
    const docRef = doc(db, 'farmers', farmerId);
    await updateDoc(docRef, {
      ...farmerData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete farmer
export const deleteFarmer = async (farmerId) => {
  try {
    await deleteDoc(doc(db, 'farmers', farmerId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// ==================== DEALERS ====================

// Get all dealers
export const getAllDealers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dealers'));
    const dealers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: dealers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get dealers by village
export const getDealersByVillage = async (village) => {
  try {
    const q = query(collection(db, 'dealers'), where('village', '==', village));
    const querySnapshot = await getDocs(q);
    const dealers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: dealers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Add dealer
export const addDealer = async (dealerData) => {
  try {
    const docRef = await addDoc(collection(db, 'dealers'), {
      ...dealerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Update dealer
export const updateDealer = async (dealerId, dealerData) => {
  try {
    const docRef = doc(db, 'dealers', dealerId);
    await updateDoc(docRef, {
      ...dealerData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// ==================== MERCHANTS ====================

// Get all merchants
export const getAllMerchants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'merchants'));
    const merchants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: merchants, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Add merchant
export const addMerchant = async (merchantData) => {
  try {
    const docRef = await addDoc(collection(db, 'merchants'), {
      ...merchantData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// ==================== GODOWNS ====================

// Get all godowns
export const getAllGodowns = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'godowns'));
    const godowns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: godowns, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get godowns by village
export const getGodownsByVillage = async (village) => {
  try {
    const q = query(collection(db, 'godowns'), where('village', '==', village));
    const querySnapshot = await getDocs(q);
    const godowns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: godowns, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Update godown stock
export const updateGodownStock = async (godownId, stockData) => {
  try {
    const docRef = doc(db, 'godowns', godownId);
    await updateDoc(docRef, {
      ...stockData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// ==================== ISSUES ====================

// Get all issues
export const getAllIssues = async () => {
  try {
    const q = query(collection(db, 'issues'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: issues, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get issues by village
export const getIssuesByVillage = async (village) => {
  try {
    const q = query(
      collection(db, 'issues'), 
      where('village', '==', village),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: issues, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get issues by status
export const getIssuesByStatus = async (status) => {
  try {
    const q = query(collection(db, 'issues'), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: issues, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Create new issue
export const createIssue = async (issueData) => {
  try {
    const docRef = await addDoc(collection(db, 'issues'), {
      ...issueData,
      status: 'Pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Update issue status
export const updateIssueStatus = async (issueId, status, notes = '') => {
  try {
    const docRef = doc(db, 'issues', issueId);
    await updateDoc(docRef, {
      status,
      statusNotes: notes,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// ==================== VILLAGES ====================

// Get all villages
export const getAllVillages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'villages'));
    const villages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: villages, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get village by name
export const getVillageByName = async (villageName) => {
  try {
    const q = query(collection(db, 'villages'), where('name', '==', villageName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { data: { id: doc.id, ...doc.data() }, error: null };
    }
    return { data: null, error: 'Village not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// ==================== ACTIVITIES ====================

// Log activity
export const logActivity = async (activityData) => {
  try {
    const docRef = await addDoc(collection(db, 'activities'), {
      ...activityData,
      timestamp: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Get recent activities
export const getRecentActivities = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'activities'), 
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: activities, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get activities by village
export const getActivitiesByVillage = async (village, limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'activities'), 
      where('village', '==', village),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data: activities, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};
