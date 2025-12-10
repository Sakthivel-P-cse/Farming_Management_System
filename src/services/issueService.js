import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'issues';

// Get all issues (optionally filtered by status or village)
export const getAllIssues = async (filters = {}) => {
  const constraints = [];
  if (filters.status) constraints.push(where('status', '==', filters.status));
  if (filters.village) constraints.push(where('village', '==', filters.village));
  const q = constraints.length
    ? query(collection(db, COLLECTION_NAME), ...constraints, orderBy('createdAt', 'desc'))
    : query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Get single issue
export const getIssueById = async (issueId) => {
  const ref = doc(db, COLLECTION_NAME, issueId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Issue not found');
  return { id: snap.id, ...snap.data() };
};

// Add issue
export const addIssue = async (issue) => {
  const ref = await addDoc(collection(db, COLLECTION_NAME), {
    ...issue,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

// Update issue fields
export const updateIssue = async (issueId, updates) => {
  const ref = doc(db, COLLECTION_NAME, issueId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return true;
};

// Update issue status quickly
export const updateIssueStatus = async (issueId, status) => {
  return updateIssue(issueId, { status });
};

// Compute basic stats
export const getIssueStats = async () => {
  const issues = await getAllIssues();
  const statusCount = issues.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {});
  const priorityCount = issues.reduce((acc, i) => {
    acc[i.priority] = (acc[i.priority] || 0) + 1;
    return acc;
  }, {});

  return {
    total: issues.length,
    pending: statusCount['Pending'] || 0,
    inProgress: statusCount['In Progress'] || 0,
    resolved: statusCount['Resolved'] || 0,
    critical: (priorityCount['Critical'] || 0) + (statusCount['Critical'] || 0),
  };
};
