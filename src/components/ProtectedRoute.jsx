import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  
  console.log('ProtectedRoute - Admin:', admin, 'Loading:', loading);

  // Show loading state while checking auth
  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  // If no admin user, redirect to login
  if (!admin) {
    console.log('No admin user, redirecting to login');
    return <Navigate to="/admin/login" />;
  }

  // If admin user exists, render children
  console.log('Admin user exists, rendering children');
  return children;
};

export default ProtectedRoute;