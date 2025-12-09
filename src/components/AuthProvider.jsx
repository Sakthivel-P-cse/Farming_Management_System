import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthstore';
import LoadingSpinner from './LoadingSpinner';

const AuthProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate checking auth status (already handled by zustand persist)
    const checkAuthStatus = () => {
      // If user is on the login page and is authenticated, redirect them
      if (location.pathname === '/login' && isAuthenticated) {
        // Redirect based on user role
        if (user?.role === 'district') {
          navigate('/');
        } else if (user?.role === 'village') {
          navigate('/village-dashboard');
        }
      }
      
      // Finished loading
      setIsLoading(false);
    };

    // Small delay to simulate auth check
    const timer = setTimeout(checkAuthStatus, 200);
    return () => clearTimeout(timer);
  }, [isAuthenticated, location.pathname, navigate, user]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return children;
};

export default AuthProvider;