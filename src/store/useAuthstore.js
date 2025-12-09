import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Dummy user data for testing
const dummyUsers = [
  {
    email: 'district@example.com',
    password: 'district123',
    name: 'District Officer',
    role: 'district',
    district: 'Central District'
  },
  {
    email: 'village@example.com',
    password: 'village123',
    name: 'Rajesh Kumar',
    role: 'village',
    village: 'Rampur'
  }
];

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Login action
      login: (email, password) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        setTimeout(() => {
          const foundUser = dummyUsers.find(
            (user) => user.email === email && user.password === password
          );
          
          if (foundUser) {
            // Remove password from user data before storing
            const { password, ...secureUserData } = foundUser;
            set({ 
              user: secureUserData,
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({ 
              user: null,
              isAuthenticated: false, 
              isLoading: false,
              error: 'Invalid email or password'
            });
            return false;
          }
        }, 500); // Simulate network delay
      },
      
      // Logout action
      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false,
          error: null
        });
      },
      
      // Clear any errors
      clearErrors: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage', // Name for the localStorage key
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);

export default useAuthStore;
