import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>Order Lookup</h1>
          <div className="header-actions">
            <button 
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              ← Back to Home
            </button>
          </div>
        </div>
        
        <div className="content-card">
          <h2>Track Your Order</h2>
          <p>To track your order, please visit our dedicated order tracking page.</p>
          <button 
            onClick={() => navigate('/track-order')}
            className="btn-primary"
          >
            Track Your Order
          </button>
        </div>
        
        <div className="info-card">
          <h3>How to Track Your Order</h3>
          <ol>
            <li>After placing an order, you'll receive an Order ID (e.g., GFT12345)</li>
            <li>Save this Order ID for future reference</li>
            <li>Visit the "Track Order" page and enter your Order ID</li>
            <li>View your order status and details</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;