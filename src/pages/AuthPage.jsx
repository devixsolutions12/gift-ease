import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Set base URL from environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5003';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin } = useAuth();
  const isLogin = location.pathname === '/login';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };
  
  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    // Password strength check (at least one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }
    
    // Confirm password validation for registration
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate form
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      const url = isLogin 
        ? `${API_BASE_URL}/api/users/login` 
        : `${API_BASE_URL}/api/users/register`;
      const requestData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
      
      console.log('Sending request to:', url);
      console.log('Request data:', requestData);
      
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log('Response received:', response);
      
      // Save token to localStorage and update context
      userLogin(response.data.token, response.data.user);
      
      // Show success message
      setSuccess(isLogin ? 'Login successful! Redirecting...' : 'Registration successful! Welcome to GiftEase.');
      
      // Redirect to homepage after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Registration/Login error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
        errorMessage = error.response.data?.message || 
          (isLogin ? 'Invalid email or password' : 'Registration failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
        errorMessage = 'Unable to connect to the server. Please check your internet connection and make sure the server is running.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
        errorMessage = 'An error occurred while setting up the request: ' + error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-form-container">
          <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
                <small>Enter your full name as it appears on your ID</small>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
              <small>We'll never share your email with anyone else</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Enter a strong password"
              />
              {!isLogin && (
                <small>Password must be at least 6 characters with uppercase, lowercase, and number</small>
              )}
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
                <small>Make sure both passwords match</small>
              </div>
            )}
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => navigate(isLogin ? '/register' : '/login')}
                className="switch-button"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;