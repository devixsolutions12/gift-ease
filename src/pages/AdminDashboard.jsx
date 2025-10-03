import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, adminLogout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [giftCode, setGiftCode] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    upiId: '',
    upiName: '',
    paymentInstructions: '',
    qrCodeImage: ''
  });
  const [qrCodePreview, setQrCodePreview] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'settings'
  
  // Statistics
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    rejectedOrders: 0,
    totalRevenue: 0
  });
  
  // Check authentication on component mount
  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    
    fetchOrders();
    fetchPaymentSettings();
  }, [admin, navigate]);
  
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/admin/orders/pending', {
        headers: {
          Authorization: admin.token
        }
      });
      
      setOrders(response.data);
      setFilteredOrders(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
      
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        adminLogout();
        navigate('/admin/login');
      }
    }
  };
  
  const fetchPaymentSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/payment-settings', {
        headers: {
          Authorization: admin.token
        }
      });
      
      setPaymentSettings(response.data);
      if (response.data.qrCodeImage) {
        setQrCodePreview(response.data.qrCodeImage);
      }
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      // Initialize with default values if settings don't exist
      setPaymentSettings({
        upiId: 'giftease@upi',
        upiName: 'GiftEase Payments',
        paymentInstructions: 'Please make the payment using UPI to the following details:\n1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter the UPI ID above\n3. Enter the exact amount\n4. Complete the payment and note the transaction ID',
        qrCodeImage: ''
      });
    }
  };
  
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;
    const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
    const approvedOrders = ordersData.filter(order => order.status === 'approved').length;
    const rejectedOrders = ordersData.filter(order => order.status === 'rejected').length;
    const totalRevenue = ordersData
      .filter(order => order.status === 'approved')
      .reduce((sum, order) => sum + order.amount, 0);
    
    setStats({
      totalOrders,
      pendingOrders,
      approvedOrders,
      rejectedOrders,
      totalRevenue
    });
  };
  
  // Filter orders based on search term, status, and date
  useEffect(() => {
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.productName.toLowerCase().includes(term) ||
        order.userName.toLowerCase().includes(term) ||
        order.userEmail.toLowerCase().includes(term) ||
        order.transactionId.toLowerCase().includes(term)
      );
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(order => {
        const orderDate = new Date(order.createdAt);
        switch (dateFilter) {
          case 'today':
            return orderDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }
    
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter, dateFilter]);
  
  const handleApprove = async (orderId) => {
    if (!giftCode) {
      alert('Please enter a gift code');
      return;
    }
    
    try {
      const response = await axios.put(
        `http://localhost:5003/api/admin/orders/${orderId}`,
        { status: 'approved', giftCode },
        {
          headers: {
            Authorization: admin.token
          }
        }
      );
      
      // Update the order in the state
      const updatedOrders = orders.map(order => 
        order._id === orderId ? response.data : order
      );
      
      setOrders(updatedOrders);
      calculateStats(updatedOrders);
      
      // Reset form
      setSelectedOrder(null);
      setGiftCode('');
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Error approving order. Please try again.');
    }
  };
  
  const handleReject = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:5003/api/admin/orders/${orderId}`,
        { status: 'rejected', rejectionReason },
        {
          headers: {
            Authorization: admin.token
          }
        }
      );
      
      // Update the order in the state
      const updatedOrders = orders.map(order => 
        order._id === orderId ? response.data : order
      );
      
      setOrders(updatedOrders);
      calculateStats(updatedOrders);
      
      // Reset form
      setSelectedOrder(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Error rejecting order. Please try again.');
    }
  };
  
  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
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
  
  const exportToCSV = () => {
    const csvContent = [
      ['Order ID', 'Product', 'User', 'Email', 'Amount', 'Status', 'Transaction ID', 'Date', 'Gift Code', 'Rejection Reason'],
      ...filteredOrders.map(order => [
        order._id,
        order.productName,
        order.userName,
        order.userEmail,
        order.amount,
        order.status,
        order.transactionId,
        new Date(order.createdAt).toLocaleString(),
        order.giftCode || '',
        order.rejectionReason || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gift-ease-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle QR code file upload
  const handleQrCodeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setQrCodePreview(event.target.result);
        setPaymentSettings({
          ...paymentSettings,
          qrCodeImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save payment settings
  const savePaymentSettings = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5003/api/payment-settings',
        paymentSettings,
        {
          headers: {
            Authorization: admin.token
          }
        }
      );
      
      setPaymentSettings(response.data);
      alert('Payment settings saved successfully!');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('Error saving payment settings. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="container">
            <h1 className="logo">GiftEase Admin</h1>
            <div className="admin-nav">
              <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </div>
          </div>
        </header>
        
        <div className="container">
          <div className="dashboard-header">
            <h2>Admin Dashboard</h2>
          </div>
          <div className="loading-message">
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <h1 className="logo">GiftEase Admin</h1>
          <div className="admin-nav">
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {/* Tab Navigation */}
          <div className="admin-tabs">
            <button 
              className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button 
              className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Payment Settings
            </button>
          </div>
          
          {activeTab === 'orders' ? (
            <>
              <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
              </div>
              
              {/* Statistics Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.totalOrders}</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.pendingOrders}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.approvedOrders}</div>
                    <div className="stat-label">Approved</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
                    <div className="stat-label">Revenue</div>
                  </div>
                </div>
              </div>
              
              {/* Filters and Search */}
              <div className="admin-filters">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="filter-box">
                  <label htmlFor="statusFilter">Status:</label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="filter-box">
                  <label htmlFor="dateFilter">Date:</label>
                  <select
                    id="dateFilter"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>
                
                <div className="export-box">
                  <button onClick={exportToCSV} className="btn-primary">
                    Export CSV
                  </button>
                </div>
              </div>
              
              <h3>Orders ({filteredOrders.length})</h3>
              
              {filteredOrders.length === 0 ? (
                <div className="no-orders">
                  <p>No orders found matching your criteria.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="order-card-admin">
                      <div className="order-header-admin">
                        <div className="order-info-admin">
                          <h4>{order.productName}</h4>
                          <p className="order-meta">
                            <span>Order ID: {order._id}</span>
                            <span>User: {order.userName}</span>
                            <span>Email: {order.userEmail}</span>
                          </p>
                        </div>
                        <div className="order-status-section">
                          <span className={`order-amount status-badge ${getStatusClass(order.status)}`}>
                            ₹{order.amount}
                          </span>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-details-admin">
                        <div className="order-detail-item">
                          <span className="detail-label">Transaction ID:</span>
                          <span className="detail-value">{order.transactionId}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="detail-label">Date:</span>
                          <span className="detail-value">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        {order.rejectionReason && (
                          <div className="order-detail-item">
                            <span className="detail-label">Rejection Reason:</span>
                            <span className="detail-value rejection-reason-display">{order.rejectionReason}</span>
                          </div>
                        )}
                      </div>
                      
                      {selectedOrder === order._id ? (
                        <div className="approval-form-admin">
                          {order.status === 'pending' ? (
                            <div className="approval-section">
                              <h4>Approve Order</h4>
                              <div className="form-group">
                                <label>Gift Code:</label>
                                <input
                                  type="text"
                                  value={giftCode}
                                  onChange={(e) => setGiftCode(e.target.value)}
                                  placeholder="Enter gift code"
                                  className="form-control"
                                />
                              </div>
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-primary"
                                  onClick={() => handleApprove(order._id)}
                                  disabled={!giftCode}
                                >
                                  Approve Order
                                </button>
                                <button 
                                  className="btn-secondary"
                                  onClick={() => {
                                    setSelectedOrder(null);
                                    setGiftCode('');
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="rejection-section-admin">
                              <h4>Reject Order</h4>
                              <div className="form-group">
                                <label>Rejection Reason:</label>
                                <textarea
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Enter rejection reason"
                                  className="form-control"
                                  rows="3"
                                />
                              </div>
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-danger"
                                  onClick={() => handleReject(order._id)}
                                >
                                  Confirm Rejection
                                </button>
                                <button 
                                  className="btn-secondary"
                                  onClick={() => {
                                    setSelectedOrder(null);
                                    setRejectionReason('');
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="order-actions-admin">
                          {order.status === 'pending' && (
                            <button 
                              className="btn-primary"
                              onClick={() => setSelectedOrder(order._id)}
                            >
                              Process Order
                            </button>
                          )}
                          {order.status === 'approved' && order.giftCode && (
                            <div className="gift-code-display">
                              <strong>Gift Code:</strong> {order.giftCode}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Payment Settings Tab
            <div className="payment-settings-tab">
              <div className="dashboard-header">
                <h2>Payment Settings</h2>
              </div>
              
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID:</label>
                  <input
                    type="text"
                    id="upiId"
                    value={paymentSettings.upiId}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      upiId: e.target.value
                    })}
                    className="form-control"
                    placeholder="Enter UPI ID"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="upiName">UPI Name:</label>
                  <input
                    type="text"
                    id="upiName"
                    value={paymentSettings.upiName}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      upiName: e.target.value
                    })}
                    className="form-control"
                    placeholder="Enter UPI Name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="paymentInstructions">Payment Instructions:</label>
                  <textarea
                    id="paymentInstructions"
                    value={paymentSettings.paymentInstructions}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      paymentInstructions: e.target.value
                    })}
                    className="form-control"
                    rows="5"
                    placeholder="Enter payment instructions"
                  />
                </div>
                
                <div className="form-group">
                  <label>QR Code:</label>
                  <div className="qr-code-upload">
                    {qrCodePreview && (
                      <div className="qr-code-preview">
                        <img src={qrCodePreview} alt="QR Code Preview" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrCodeUpload}
                      className="file-input"
                    />
                    <p className="file-hint">Upload a QR code image (PNG, JPG)</p>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="btn-primary"
                    onClick={savePaymentSettings}
                  >
                    Save Settings
                  </button>
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
              <h3>GiftEase Admin</h3>
              <p>Admin panel for managing gift card orders.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={handleLogout} className="footer-link">Logout</button></li>
              </ul>
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

export default AdminDashboard;