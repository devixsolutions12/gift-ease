import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing admin token on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        console.log('Checking auth status');
        // Check for admin token
        const adminToken = localStorage.getItem('adminToken');
        console.log('Admin token from localStorage:', adminToken);
        if (adminToken) {
          // For local admin, just check if token exists
          setAdmin({ token: adminToken });
          console.log('Admin authenticated with token');
        } else {
          console.log('No admin token found');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
        console.log('Auth check complete, loading:', loading);
      }
    };

    // Check auth status immediately
    checkAuthStatus();
  }, []);

  const adminLogin = (token) => {
    try {
      console.log('Logging in with token:', token);
      // Save token to localStorage
      localStorage.setItem('adminToken', token);
      setAdmin({ token });
      console.log('Login successful');
      return { success: true };
    } catch (error) {
      console.error('Admin login failed:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const adminLogout = () => {
    try {
      console.log('Logging out');
      localStorage.removeItem('adminToken');
      setAdmin(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Admin logout failed:', error);
    }
  };

  const value = {
    admin,
    loading,
    adminLogin,
    adminLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};