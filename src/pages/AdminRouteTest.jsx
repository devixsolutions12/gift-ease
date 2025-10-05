import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRouteTest = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Admin Route Test</h1>
      <p>This page confirms that routing is working correctly.</p>
      <div className="actions">
        <button onClick={() => navigate('/admin/login')} className="btn-primary">
          Go to Admin Login
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary">
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default AdminRouteTest;