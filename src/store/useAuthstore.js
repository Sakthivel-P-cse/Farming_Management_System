import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginWithEmail, logoutUser } from '../firebase/authService';
import { getUserById, saveUserProfile } from '../firebase/dbService';

// Dummy user data for testing (fallback when Firebase is not configured)
const dummyUsers = [
  // District Officers
  {
    email: 'district@example.com',
    password: 'district123',
    name: 'Arun Krishnan',
    role: 'district',
    district: 'Central District',
    contact: '9876500001',
    villagesManaged: 10
  },
  {
    email: 'district2@example.com',
    password: 'district123',
    name: 'Meera Sharma',
    role: 'district',
    district: 'North District',
    contact: '9876500002',
    villagesManaged: 8
  },
  {
    email: 'district3@example.com',
    password: 'district123',
    name: 'Vijay Reddy',
    role: 'district',
    district: 'South District',
    contact: '9876500003',
    villagesManaged: 12
  },
  {
    email: 'district4@example.com',
    password: 'district123',
    name: 'Sunita Patel',
    role: 'district',
    district: 'East District',
    contact: '9876500004',
    villagesManaged: 9
  },
  {
    email: 'district5@example.com',
    password: 'district123',
    name: 'Rajan Nair',
    role: 'district',
    district: 'West District',
    contact: '9876500005',
    villagesManaged: 11
  },
  // Village Officers
  {
    email: 'village@example.com',
    password: 'village123',
    name: 'Rajesh Kumar',
    role: 'village',
    village: 'Rampur'
  },
  {
    email: 'village2@example.com',
    password: 'village123',
    name: 'Priya Singh',
    role: 'village',
    village: 'Lakshmi Nagar'
  }
];

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY && 
         import.meta.env.VITE_FIREBASE_PROJECT_ID;
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      useFirebase: isFirebaseConfigured(),
      
      // Login action - supports both Firebase and dummy data
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        const useFirebase = get().useFirebase;
        
        if (useFirebase) {
          // Firebase Authentication
          try {
            const { user: firebaseUser, error } = await loginWithEmail(email, password);
            
            if (error) {
              // Fallback to dummy users if Firebase auth fails
              const foundUser = dummyUsers.find(
                (u) => u.email === email && u.password === password
              );
              
              if (foundUser) {
                const { password: _, ...secureUserData } = foundUser;
                set({ 
                  user: secureUserData,
                  isAuthenticated: true, 
                  isLoading: false,
                  error: null
                });
                return true;
              }
              
              set({ 
                user: null,
                isAuthenticated: false, 
                isLoading: false,
                error: error
              });
              return false;
            }
            
            // Get user profile from Firestore
            const { data: userProfile } = await getUserById(firebaseUser.uid);
            
            const userData = userProfile || {
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'User',
              role: 'district'
            };
            
            set({ 
              user: userData,
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });
            return true;
          } catch (err) {
            // Fallback to dummy users
            const foundUser = dummyUsers.find(
              (u) => u.email === email && u.password === password
            );
            
            if (foundUser) {
              const { password: _, ...secureUserData } = foundUser;
              set({ 
                user: secureUserData,
                isAuthenticated: true, 
                isLoading: false,
                error: null
              });
              return true;
            }
            
            set({ 
              user: null,
              isAuthenticated: false, 
              isLoading: false,
              error: 'Invalid email or password'
            });
            return false;
          }
        } else {
          // Dummy data authentication (original behavior)
          return new Promise((resolve) => {
            setTimeout(() => {
              const foundUser = dummyUsers.find(
                (user) => user.email === email && user.password === password
              );
              
              if (foundUser) {
                const { password: _, ...secureUserData } = foundUser;
                set({ 
                  user: secureUserData,
                  isAuthenticated: true, 
                  isLoading: false,
                  error: null
                });
                resolve(true);
              } else {
                set({ 
                  user: null,
                  isAuthenticated: false, 
                  isLoading: false,
                  error: 'Invalid email or password'
                });
                resolve(false);
              }
            }, 500);
          });
        }
      },
      
      // Logout action
      logout: async () => {
        const useFirebase = get().useFirebase;
        
        if (useFirebase) {
          await logoutUser();
        }
        
        set({ 
          user: null,
          isAuthenticated: false,
          error: null
        });
      },
      
      // Update user profile
      updateProfile: async (profileData) => {
        const useFirebase = get().useFirebase;
        const currentUser = get().user;
        
        if (useFirebase && currentUser?.id) {
          const { error } = await saveUserProfile(currentUser.id, profileData);
          if (error) {
            set({ error });
            return false;
          }
        }
        
        set({ 
          user: { ...currentUser, ...profileData },
          error: null
        });
        return true;
      },
      
      // Clear any errors
      clearErrors: () => {
        set({ error: null });
      },
      
      // Toggle Firebase mode (for development/testing)
      setUseFirebase: (value) => {
        set({ useFirebase: value });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);

export default useAuthStore;
