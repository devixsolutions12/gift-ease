import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple local authentication (in a real app, you'd want something more secure)
    // For demo purposes, we'll use a simple check
    if (credentials.username === 'admin' && credentials.password === 'password') {
      // Create a simple token for demo purposes
      const token = 'local-admin-token-' + Date.now();
      
      // Save token to localStorage and update context
      adminLogin(token);
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. For demo purposes, use username: "admin" and password: "password"');
    }
    
    setLoading(false);
  };
  
  return (
    <div className="admin-login">
      <div className="container">
        <div className="login-form-container">
          <h2>Admin Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="demo-credentials">
              <p><strong>Demo credentials:</strong> username: "admin", password: "password"</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;