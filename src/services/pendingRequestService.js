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

const COLLECTION_NAME = 'pendingRequests';

// Get all pending requests
export const getAllPendingRequests = async () => {
  try {
    const q = query(
      collection(db, 'users'),
      where('profile.approvalStatus', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const profile = data.profile || {};
      return {
        id: doc.id,
        name: profile.fullName || '',
        contact: data.phone || profile.phone || '',
        email: data.email || profile.email || '',
        role: data.role || '',
        village: profile.village || '',
        documentUrl: profile.documentUrl || '',
        requestDate: data.createdAt || profile.submittedAt || '',
        status: 'Pending',
        ...data,
        profile
      };
    });
  } catch (error) {
    console.error('Error getting pending requests:', error);
    throw error;
  }
};

// Get pending requests by type (farmer or dealer)
export const getPendingRequestsByType = async (requestType) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', '==', requestType),
      where('profile.approvalStatus', '==', 'pending')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const profile = data.profile || {};
      return {
        id: doc.id,
        name: profile.fullName || '',
        contact: data.phone || profile.phone || '',
        email: data.email || profile.email || '',
        village: profile.village || '',
        crops: [
          profile.primaryCrop,
          ...(profile.secondaryCrops || [])
        ].filter(Boolean),
        landArea: profile.landArea || 0,
        landAreaUnit: profile.landAreaUnit || 'acres',
        farmingType: profile.soilType || 'Traditional',
        address: `${profile.village || ''}, ${profile.district || ''}, ${profile.state || ''}`,
        district: profile.district || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        documentType: profile.documentType || '',
        documentUrl: profile.documentUrl || '',
        requestDate: data.createdAt || profile.submittedAt || '',
        status: 'Pending',
        requestType: requestType,
        soilType: profile.soilType || ''
      };
    });
  } catch (error) {
    console.error('Error getting pending requests by type:', error);
    throw error;
  }
};

// Add new pending request
export const addPendingRequest = async (requestData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...requestData,
      status: 'Pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding pending request:', error);
    throw error;
  }
};

// Update pending request status
export const updatePendingRequestStatus = async (requestId, status) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, requestId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating pending request:', error);
    throw error;
  }
};

// Delete pending request
export const deletePendingRequest = async (requestId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, requestId));
    return true;
  } catch (error) {
    console.error('Error deleting pending request:', error);
    throw error;
  }
};

// Approve request and move to main collection
export const approvePendingRequest = async (requestId, requestType) => {
  try {
    const docRef = doc(db, 'users', requestId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Request not found');
    }

    const requestData = docSnap.data();
    
    // Add to appropriate collection based on type
    let newDocId;
    if (requestType === 'farmer') {
      const { addFarmer } = await import('./farmerService');
      newDocId = await addFarmer({
        name: requestData.name,
        contact: requestData.contact,
        village: requestData.village,
        crops: requestData.crops,
        landArea: requestData.landArea,
        farmingType: requestData.farmingType,
        address: requestData.address,
        status: 'Active'
      });
    } else if (requestType === 'dealer') {
      const { addDealer } = await import('./dealerService');
      newDocId = await addDealer({
        name: requestData.name,
        contact: requestData.contact,
        type: requestData.type,
        address: requestData.address,
        items: requestData.items,
        rating: 4.0 // Default rating for new dealers
      });
    }

    // Update request status
    await updatePendingRequestStatus(requestId, 'Approved');
    
    return newDocId;
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

// Reject request
export const rejectPendingRequest = async (requestId) => {
  try {
    await updatePendingRequestStatus(requestId, 'Rejected');
    return true;
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
};
