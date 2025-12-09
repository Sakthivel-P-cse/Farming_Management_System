import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthstore';

// Protected Route component that checks if user is authenticated
// and has the correct role before rendering the requested component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If we have role restrictions and user's role is not included
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect district officers to district dashboard
    if (user.role === 'district') {
      return <Navigate to="/" replace />;
    }
    // Redirect village officers to village dashboard
    else if (user.role === 'village') {
      return <Navigate to="/village-dashboard" replace />;
    }
    // Fallback to login if somehow role is invalid
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and has correct role, render the requested component
  return element;
};

export default ProtectedRoute;