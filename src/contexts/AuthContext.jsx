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
        // Check for admin token
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          // For local admin, just check if token exists
          setAdmin({ token: adminToken });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check auth status immediately
    checkAuthStatus();
  }, []);

  const adminLogin = (token) => {
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
    try {
      localStorage.removeItem('adminToken');
      setAdmin(null);
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