import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [selectedOrder, setSelectedOrder] = useState(null); // For detailed order view
  const [orderId, setOrderId] = useState(''); // For looking up orders by ID

  // Since we don't have user accounts, we'll allow users to look up orders by ID
  const fetchOrderById = async () => {
    if (!orderId) {
      showToastMessage('Please enter an order ID', 'error');
      return;
    }
    
    try {
      // Set base URL from environment variable or default to localhost
      const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5003';
      
      // For now, we'll fetch all orders and filter by ID (in a real app, you'd have a specific endpoint)
      const response = await axios.get(`${API_BASE_URL}/api/orders`);
      const order = response.data.find(o => o._id === orderId);
      
      if (order) {
        setOrders([order]);
        showToastMessage('Order found!', 'success');
      } else {
        showToastMessage('Order not found. Please check the ID and try again.', 'error');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      showToastMessage('Error fetching order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message, type) => {
    setShowToast({ show: true, message, type });
    setTimeout(() => {
      setShowToast({ ...showToast, show: false });
    }, 3000);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved-enhanced';
      case 'rejected':
        return 'status-rejected-enhanced';
      default:
        return 'status-pending-enhanced';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getEstimatedApprovalTime = (order) => {
    const orderDate = new Date(order.createdAt);
    const estimatedApproval = new Date(orderDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours from order creation
    
    if (order.status === 'pending') {
      return `Estimated approval by ${estimatedApproval.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return `Approved at ${new Date(order.updatedAt || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const downloadGiftCode = (order) => {
    if (order.status !== 'approved' || !order.giftCode) {
      showToastMessage('Gift code is not available for download yet.', 'error');
      return;
    }
    
    const content = `GiftEase Order Receipt
====================
Order ID: ${order._id}
Product: ${order.productName}
Amount: ₹${order.amount}
Date: ${new Date(order.createdAt).toLocaleString()}
Gift Code: ${order.giftCode}

Thank you for your purchase!
Visit GiftEase for more digital gifts.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `giftease-order-${order._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToastMessage('Gift code downloaded successfully!', 'success');
  };

  const exportToPDF = () => {
    // In a real implementation, you would use a library like jsPDF
    // For now, we'll just show a message
    showToastMessage('PDF export functionality would be implemented here', 'info');
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const approvedOrders = orders.filter(order => order.status === 'approved');
  const rejectedOrders = orders.filter(order => order.status === 'rejected');

  // Function to open detailed order view
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Function to close detailed order view
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="page-header">
            <h1>Order Lookup</h1>
          </div>
          
          <div className="order-lookup-section card">
            <h2>Find Your Order</h2>
            <p>Enter your order ID to view order details and status</p>
            <div className="form-group">
              <label htmlFor="orderId">Order ID</label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
              />
            </div>
            <button 
              onClick={fetchOrderById}
              className="btn-primary"
            >
              Look Up Order
            </button>
          </div>
        </div>
      </div>
    );
  }
  
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