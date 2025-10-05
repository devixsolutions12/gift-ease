import React from 'react';
import { Link } from 'react-router-dom';

const RoutingTest = () => {
  return (
    <div className="container">
      <h1>Routing Test</h1>
      <p>This page tests if routing is working correctly.</p>
      
      <div className="test-links">
        <h2>Test Links:</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/login">Admin Login</Link></li>
          <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
          <li><Link to="/admin/test">Admin Route Test</Link></li>
          <li><Link to="/admin/debug">Auth Debug</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/nonexistent">Non-existent Page (should show 404)</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default RoutingTest;