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
    const checkAuthStatus = async () => {
      // Check for admin token
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        // For local admin, just check if token exists
        setAdmin({ token: adminToken });
      }

      setLoading(false);
    };

    // Set loading to false after a short delay to prevent blank page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    checkAuthStatus();
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, []);

  const adminLogin = async (token) => {
    try {
      // Save token to localStorage
      localStorage.setItem('adminToken', token);
      setAdmin({ token });
      return { success: true };
    } catch (error) {
      console.error('Admin login failed:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    admin,
    loading,
    adminLogin,
    adminLogout
  };

  // Always render children, even while loading
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};