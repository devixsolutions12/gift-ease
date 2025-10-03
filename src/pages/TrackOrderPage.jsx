import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalOrderById } from '../utils/localOrders';

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId) {
      setError('Please enter an Order ID');
      return;
    }

    const foundOrder = getLocalOrderById(orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setError('');
    } else {
      setError('Order not found. Please check the Order ID and try again.');
      setOrder(null);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'processing':
        return 'Processing';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Pending';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'processing':
        return 'status-processing';
      case 'delivered':
        return 'status-delivered';
      default:
        return 'status-pending';
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="track-order-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={handleBack} className="nav-button">
              ← Back to Home
            </button>
            <button onClick={() => navigate('/help')} className="nav-button">
              Help
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <h2 className="section-title">Track Your Order</h2>
          
          <div className="track-order-form card">
            <form onSubmit={handleTrackOrder}>
              <div className="form-group">
                <label htmlFor="orderId">Order ID</label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  placeholder="Enter your Order ID (e.g., GFT12345)"
                  className="form-control"
                />
                <small>Enter the Order ID you received after placing your order</small>
              </div>
              <button type="submit" className="btn-primary">
                Track Order
              </button>
            </form>
            
            {error && <div className="error-message">{error}</div>}
          </div>

          {order && (
            <div className="order-details card">
              <h3>Order Details</h3>
              <div className="order-summary-card">
                <div className="order-header">
                  <h4>{order.productName}</h4>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div className="order-info">
                  <div className="info-item">
                    <span className="info-label">Order ID:</span>
                    <span className="info-value">{order.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Amount:</span>
                    <span className="info-value">₹{order.amount}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Transaction ID:</span>
                    <span className="info-value">{order.transactionId}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Order Date:</span>
                    <span className="info-value">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Display the relevant user information based on product type */}
                  {order.gmail && (
                    <div className="info-item">
                      <span className="info-label">Gmail:</span>
                      <span className="info-value">{order.gmail}</span>
                    </div>
                  )}
                  {order.freeFireUid && (
                    <div className="info-item">
                      <span className="info-label">Free Fire UID:</span>
                      <span className="info-value">{order.freeFireUid}</span>
                    </div>
                  )}
                  {order.bgmiId && (
                    <div className="info-item">
                      <span className="info-label">BGMI ID:</span>
                      <span className="info-value">{order.bgmiId}</span>
                    </div>
                  )}
                  
                  {order.status === 'approved' && order.giftCode && (
                    <div className="info-item">
                      <span className="info-label">Gift Code:</span>
                      <span className="info-value gift-code">{order.giftCode}</span>
                    </div>
                  )}
                  {order.status === 'rejected' && order.rejectionReason && (
                    <div className="info-item">
                      <span className="info-label">Rejection Reason:</span>
                      <span className="info-value rejection-reason">
                        {order.rejectionReason}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="order-status-info">
                  <h4>Order Status Information</h4>
                  <ul>
                    <li><strong>Pending:</strong> Your order is waiting for admin review</li>
                    <li><strong>Processing:</strong> Your order is being processed</li>
                    <li><strong>Approved:</strong> Your order has been approved and gift code is ready</li>
                    <li><strong>Delivered:</strong> Your gift code has been delivered</li>
                    <li><strong>Rejected:</strong> Your order was rejected with a reason provided</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GiftEase</h3>
              <p>Your trusted partner for digital gift cards and in-game currency.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')} className="footer-link">Home</button></li>
                <li><button onClick={() => navigate('/help')} className="footer-link">Help Center</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: support@giftease.com</p>
              <p>Hours: 24/7 Support</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GiftEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackOrderPage;