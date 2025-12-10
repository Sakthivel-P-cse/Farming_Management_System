import { 
  collection, 
  getDocs, 
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'dashboardStats';
const STATS_DOC_ID = 'village_overview';

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const docRef = doc(db, COLLECTION_NAME, STATS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Return default stats if document doesn't exist
      return {
        farmers: { total: 0, active: 0, inactive: 0, newThisMonth: 0 },
        dealers: { total: 0, rentGivers: 0, sellers: 0, topRated: 0 },
        issues: { total: 0, resolved: 0, pending: 0, inProgress: 0 },
        equipment: { available: 0, rented: 0, maintenance: 0, categories: 0 }
      };
    }
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// Update dashboard statistics
export const updateDashboardStats = async (stats) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, STATS_DOC_ID);
    await setDoc(docRef, {
      ...stats,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating dashboard stats:', error);
    throw error;
  }
};

// Recalculate and update all dashboard stats
export const recalculateDashboardStats = async () => {
  try {
    // Import services
    const { getFarmerStats } = await import('./farmerService');
    const { getDealerStats } = await import('./dealerService');
    
    // Get stats from each service
    const farmerStats = await getFarmerStats();
    const dealerStats = await getDealerStats();
    
    // For now, using mock data for issues and equipment
    // You can create separate services for these when needed
    const issuesStats = {
      total: 45,
      resolved: 28,
      pending: 12,
      inProgress: 5
    };
    
    const equipmentStats = {
      available: 24,
      rented: 15,
      maintenance: 3,
      categories: 6
    };
    
    const stats = {
      farmers: farmerStats,
      dealers: dealerStats,
      issues: issuesStats,
      equipment: equipmentStats
    };
    
    await updateDashboardStats(stats);
    return stats;
  } catch (error) {
    console.error('Error recalculating dashboard stats:', error);
    throw error;
  }
};

// Get today's stats
export const getTodayStats = async () => {
  try {
    const docRef = doc(db, COLLECTION_NAME, 'today_stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Return default stats
      return {
        stockUpdates: 12,
        newMerchants: 3,
        issuesResolved: 7,
        alertsSent: 5
      };
    }
  } catch (error) {
    console.error('Error getting today stats:', error);
    throw error;
  }
};

// Update today's stats
export const updateTodayStats = async (stats) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, 'today_stats');
    await setDoc(docRef, {
      ...stats,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating today stats:', error);
    throw error;
  }
};
