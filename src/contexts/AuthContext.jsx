import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Set base URL from environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5003';

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
  const [connectionError, setConnectionError] = useState(false);

  // Check for existing tokens on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check for user token
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
              Authorization: userToken
            },
            timeout: 10000 // 10 second timeout
          });
          setUser(response.data);
          setConnectionError(false);
        } catch (error) {
          console.error('User token invalid or server unreachable:', error);
          if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('network')) {
            setConnectionError(true);
          }
          localStorage.removeItem('userToken');
        }
      }

      // Check for admin token
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        try {
          // Verify admin token by making a simple request
          await axios.get(`${API_BASE_URL}/api/admin/orders/pending`, {
            headers: {
              Authorization: adminToken
            },
            timeout: 10000 // 10 second timeout
          });
          // If successful, set admin as authenticated
          setAdmin({ token: adminToken });
          setConnectionError(false);
        } catch (error) {
          console.error('Admin token invalid or server unreachable:', error);
          if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('network')) {
            setConnectionError(true);
          }
          localStorage.removeItem('adminToken');
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const userLogin = async (token, userData) => {
    try {
      // Verify the token is valid before setting it
      await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: token
        },
        timeout: 10000 // 10 second timeout
      });
      localStorage.setItem('userToken', token);
      setUser(userData);
      setConnectionError(false);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('network')) {
        setConnectionError(true);
        return { success: false, message: 'Unable to connect to the server. Please check your internet connection and make sure the server is running.' };
      }
      return { success: false, message: 'Invalid credentials or server error.' };
    }
  };

  const userLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const adminLogin = async (token) => {
    try {
      // Verify the token is valid before setting it
      await axios.get(`${API_BASE_URL}/api/admin/orders/pending`, {
        headers: {
          Authorization: token
        },
        timeout: 10000 // 10 second timeout
      });
      localStorage.setItem('adminToken', token);
      setAdmin({ token });
      setConnectionError(false);
      return { success: true };
    } catch (error) {
      console.error('Admin login failed:', error);
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('network')) {
        setConnectionError(true);
        return { success: false, message: 'Unable to connect to the server. Please check your internet connection and make sure the server is running.' };
      }
      return { success: false, message: 'Invalid admin credentials or server error.' };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    user,
    admin,
    loading,
    connectionError,
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