import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'dealers';

// Get all dealers
export const getAllDealers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting dealers:', error);
    throw error;
  }
};

// Get single dealer by ID
export const getDealerById = async (dealerId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, dealerId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Dealer not found');
    }
  } catch (error) {
    console.error('Error getting dealer:', error);
    throw error;
  }
};

// Add new dealer
export const addDealer = async (dealerData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...dealerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding dealer:', error);
    throw error;
  }
};

// Update dealer
export const updateDealer = async (dealerId, dealerData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, dealerId);
    await updateDoc(docRef, {
      ...dealerData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating dealer:', error);
    throw error;
  }
};

// Delete dealer
export const deleteDealer = async (dealerId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, dealerId));
    return true;
  } catch (error) {
    console.error('Error deleting dealer:', error);
    throw error;
  }
};

// Get dealers by type
export const getDealersByType = async (type) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('type', '==', type)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting dealers by type:', error);
    throw error;
  }
};

// Get dealer statistics
export const getDealerStats = async () => {
  try {
    const allDealers = await getAllDealers();
    const rentGivers = allDealers.filter(d => d.type === 'Rent Giver');
    const sellers = allDealers.filter(d => d.type === 'Seller');
    const topRated = allDealers.filter(d => d.rating >= 4.5);

    return {
      total: allDealers.length,
      rentGivers: rentGivers.length,
      sellers: sellers.length,
      topRated: topRated.length
    };
  } catch (error) {
    console.error('Error getting dealer stats:', error);
    throw error;
  }
};
