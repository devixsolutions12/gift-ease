import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthDebug = () => {
  const { admin, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Authentication Debug</h1>
      <div className="debug-info">
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Admin:</strong> {admin ? 'Authenticated' : 'Not Authenticated'}</p>
        {admin && <p><strong>Admin Token:</strong> {admin.token}</p>}
        <p><strong>localStorage adminToken:</strong> {localStorage.getItem('adminToken') || 'Not set'}</p>
      </div>
      
      <div className="actions">
        <button onClick={() => navigate('/admin/login')} className="btn-primary">
          Go to Admin Login
        </button>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary">
          Go to Admin Dashboard
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary">
          Go to Homepage
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.reload();
          }} 
          className="btn-danger"
        >
          Clear Auth and Reload
        </button>
      </div>
    </div>
  );
};

export default AuthDebug;