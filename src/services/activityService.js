import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'activities';

// Get all activities
export const getAllActivities = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting activities:', error);
    throw error;
  }
};

// Add new activity
export const addActivity = async (activityData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...activityData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

// Get recent activities (for dashboard)
export const getRecentActivities = async (count = 5) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting recent activities:', error);
    throw error;
  }
};
