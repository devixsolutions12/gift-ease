import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing tokens on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check for user token
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        try {
          const response = await axios.get('http://localhost:5003/api/users/profile', {
            headers: {
              Authorization: userToken
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('User token invalid:', error);
          localStorage.removeItem('userToken');
        }
      }

      // Check for admin token
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        try {
          // Verify admin token by making a simple request
          await axios.get('http://localhost:5003/api/admin/orders/pending', {
            headers: {
              Authorization: adminToken
            }
          });
          // If successful, set admin as authenticated
          setAdmin({ token: adminToken });
        } catch (error) {
          console.error('Admin token invalid:', error);
          localStorage.removeItem('adminToken');
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const userLogin = (token, userData) => {
    localStorage.setItem('userToken', token);
    setUser(userData);
  };

  const userLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const adminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setAdmin({ token });
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    user,
    admin,
    loading,
    userLogin,
    userLogout,
    adminLogin,
    adminLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};