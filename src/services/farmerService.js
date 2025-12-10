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
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'farmers';

// Get all farmers
export const getAllFarmers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting farmers:', error);
    throw error;
  }
};

// Get single farmer by ID
export const getFarmerById = async (farmerId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, farmerId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Farmer not found');
    }
  } catch (error) {
    console.error('Error getting farmer:', error);
    throw error;
  }
};

// Add new farmer
export const addFarmer = async (farmerData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...farmerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding farmer:', error);
    throw error;
  }
};

// Update farmer
export const updateFarmer = async (farmerId, farmerData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, farmerId);
    await updateDoc(docRef, {
      ...farmerData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating farmer:', error);
    throw error;
  }
};

// Delete farmer
export const deleteFarmer = async (farmerId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, farmerId));
    return true;
  } catch (error) {
    console.error('Error deleting farmer:', error);
    throw error;
  }
};

// Get farmers by status
export const getFarmersByStatus = async (status) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting farmers by status:', error);
    throw error;
  }
};

// Get farmers by farming type
export const getFarmersByType = async (farmingType) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('farmingType', '==', farmingType)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting farmers by type:', error);
    throw error;
  }
};

// Get farmer statistics
export const getFarmerStats = async () => {
  try {
    const allFarmers = await getAllFarmers();
    const activeFarmers = allFarmers.filter(f => f.status === 'Active');
    const inactiveFarmers = allFarmers.filter(f => f.status === 'Inactive');
    
    // Get farmers from current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newThisMonth = allFarmers.filter(farmer => {
      if (farmer.createdAt && farmer.createdAt.toDate) {
        const createdDate = farmer.createdAt.toDate();
        return createdDate.getMonth() === currentMonth && 
               createdDate.getFullYear() === currentYear;
      }
      return false;
    });

    return {
      total: allFarmers.length,
      active: activeFarmers.length,
      inactive: inactiveFarmers.length,
      newThisMonth: newThisMonth.length
    };
  } catch (error) {
    console.error('Error getting farmer stats:', error);
    throw error;
  }
};
