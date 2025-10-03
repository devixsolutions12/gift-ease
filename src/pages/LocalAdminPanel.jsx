import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalOrders, updateLocalOrder, getLocalPaymentSettings, saveLocalPaymentSettings } from '../utils/localOrders';

const LocalAdminPanel = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [giftCode, setGiftCode] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
    processingOrders: 0,
    approvedOrders: 0,
    deliveredOrders: 0,
    rejectedOrders: 0,
    totalRevenue: 0
  });
  
  // Load data on component mount
  useEffect(() => {
    loadOrders();
    loadPaymentSettings();
  }, []);
  
  const loadOrders = () => {
    const ordersData = getLocalOrders();
    setOrders(ordersData);
    calculateStats(ordersData);
  };
  
  const loadPaymentSettings = () => {
    const settings = getLocalPaymentSettings();
    setPaymentSettings(settings);
    if (settings.qrCodeImage) {
      setQrCodePreview(settings.qrCodeImage);
    }
  };
  
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;
    const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
    const processingOrders = ordersData.filter(order => order.status === 'processing').length;
    const approvedOrders = ordersData.filter(order => order.status === 'approved').length;
    const deliveredOrders = ordersData.filter(order => order.status === 'delivered').length;
    const rejectedOrders = ordersData.filter(order => order.status === 'rejected').length;
    const totalRevenue = ordersData
      .filter(order => order.status === 'approved' || order.status === 'delivered')
      .reduce((sum, order) => sum + order.amount, 0);
    
    setStats({
      totalOrders,
      pendingOrders,
      processingOrders,
      approvedOrders,
      deliveredOrders,
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
        order.id.toLowerCase().includes(term) ||
        order.productName.toLowerCase().includes(term) ||
        (order.gmail && order.gmail.toLowerCase().includes(term)) ||
        (order.freeFireUid && order.freeFireUid.toLowerCase().includes(term)) ||
        (order.bgmiId && order.bgmiId.toLowerCase().includes(term)) ||
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
  
  const handleUpdateStatus = (orderId, status) => {
    const updatedOrder = updateLocalOrder(orderId, { status });
    if (updatedOrder) {
      // Update the order in the state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? updatedOrder : order
      );
      
      setOrders(updatedOrders);
      calculateStats(updatedOrders);
      
      // Reset form if this was the selected order
      if (selectedOrder === orderId) {
        setSelectedOrder(null);
      }
    } else {
      alert('Error updating order status. Please try again.');
    }
  };
  
  const handleApprove = (orderId) => {
    if (!giftCode) {
      alert('Please enter a gift code');
      return;
    }
    
    const updatedOrder = updateLocalOrder(orderId, { status: 'approved', giftCode });
    if (updatedOrder) {
      // Update the order in the state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? updatedOrder : order
      );
      
      setOrders(updatedOrders);
      calculateStats(updatedOrders);
      
      // Reset form
      setSelectedOrder(null);
      setGiftCode('');
    } else {
      alert('Error updating order. Please try again.');
    }
  };
  
  const handleReject = (orderId) => {
    if (!rejectionReason) {
      alert('Please enter a rejection reason');
      return;
    }
    
    const updatedOrder = updateLocalOrder(orderId, { status: 'rejected', rejectionReason });
    if (updatedOrder) {
      // Update the order in the state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? updatedOrder : order
      );
      
      setOrders(updatedOrders);
      calculateStats(updatedOrders);
      
      // Reset form
      setSelectedOrder(null);
      setRejectionReason('');
    } else {
      alert('Error updating order. Please try again.');
    }
  };
  
  const handleLogout = () => {
    // Clear admin session (in a real app, you might want to do more here)
    localStorage.removeItem('adminToken');
    navigate('/');
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
  
  const exportToCSV = () => {
    const csvContent = [
      ['Order ID', 'Product', 'User Info', 'Amount', 'Status', 'Transaction ID', 'Date', 'Gift Code', 'Rejection Reason'],
      ...filteredOrders.map(order => {
        // Determine which user info field is populated
        let userInfo = '';
        if (order.gmail) {
          userInfo = `Gmail: ${order.gmail}`;
        } else if (order.freeFireUid) {
          userInfo = `FF UID: ${order.freeFireUid}`;
        } else if (order.bgmiId) {
          userInfo = `BGMI ID: ${order.bgmiId}`;
        }
        
        return [
          order.id,
          order.productName,
          userInfo,
          order.amount,
          order.status,
          order.transactionId,
          new Date(order.createdAt).toLocaleString(),
          order.giftCode || '',
          order.rejectionReason || ''
        ];
      })
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
  const savePaymentSettings = () => {
    const success = saveLocalPaymentSettings(paymentSettings);
    if (success) {
      alert('Payment settings saved successfully!');
    } else {
      alert('Error saving payment settings. Please try again.');
    }
  };
  
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
                  <div className="stat-icon">🔄</div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.processingOrders}</div>
                    <div className="stat-label">Processing</div>
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
                  <div className="stat-icon">📦</div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.deliveredOrders}</div>
                    <div className="stat-label">Delivered</div>
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
                    placeholder="Search orders by ID, product, or user info..."
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
                    <option value="processing">Processing</option>
                    <option value="approved">Approved</option>
                    <option value="delivered">Delivered</option>
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
                    <div key={order.id} className="order-card-admin">
                      <div className="order-header-admin">
                        <div className="order-info-admin">
                          <h4>{order.productName}</h4>
                          <p className="order-meta">
                            <span>Order ID: {order.id}</span>
                            {/* Display the relevant user information based on product type */}
                            {order.gmail && <span>Gmail: {order.gmail}</span>}
                            {order.freeFireUid && <span>FF UID: {order.freeFireUid}</span>}
                            {order.bgmiId && <span>BGMI ID: {order.bgmiId}</span>}
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
                      
                      {selectedOrder === order.id ? (
                        <div className="approval-form-admin">
                          {order.status === 'pending' || order.status === 'processing' ? (
                            <div className="approval-section">
                              <h4>Process Order</h4>
                              <div className="form-group">
                                <label>Update Status:</label>
                                <div className="status-actions">
                                  <button 
                                    className="btn-secondary"
                                    onClick={() => handleUpdateStatus(order.id, 'processing')}
                                  >
                                    Mark as Processing
                                  </button>
                                  <button 
                                    className="btn-primary"
                                    onClick={() => handleUpdateStatus(order.id, 'approved')}
                                  >
                                    Mark as Approved
                                  </button>
                                  <button 
                                    className="btn-danger"
                                    onClick={() => {
                                      setSelectedOrder(order.id);
                                      // Show rejection form
                                    }}
                                  >
                                    Reject Order
                                  </button>
                                </div>
                              </div>
                              
                              {order.status === 'approved' && (
                                <div className="form-group">
                                  <label>Gift Code:</label>
                                  <input
                                    type="text"
                                    value={giftCode}
                                    onChange={(e) => setGiftCode(e.target.value)}
                                    placeholder="Enter gift code"
                                    className="form-control"
                                  />
                                  <button 
                                    className="btn-primary"
                                    onClick={() => handleApprove(order.id)}
                                    disabled={!giftCode}
                                  >
                                    Save Gift Code
                                  </button>
                                </div>
                              )}
                              
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-secondary"
                                  onClick={() => setSelectedOrder(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : order.status === 'approved' ? (
                            <div className="delivery-section">
                              <h4>Deliver Order</h4>
                              <div className="form-group">
                                <label>Gift Code:</label>
                                <input
                                  type="text"
                                  value={giftCode || order.giftCode}
                                  onChange={(e) => setGiftCode(e.target.value)}
                                  placeholder="Enter gift code"
                                  className="form-control"
                                />
                              </div>
                              <div className="form-group">
                                <label>Update Status:</label>
                                <div className="status-actions">
                                  <button 
                                    className="btn-primary"
                                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                                  >
                                    Mark as Delivered
                                  </button>
                                </div>
                              </div>
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-secondary"
                                  onClick={() => setSelectedOrder(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : order.status === 'rejected' ? (
                            <div className="rejection-section-admin">
                              <h4>Order Rejected</h4>
                              <div className="form-group">
                                <label>Rejection Reason:</label>
                                <textarea
                                  value={rejectionReason || order.rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Enter rejection reason"
                                  className="form-control"
                                  rows="3"
                                  disabled
                                />
                              </div>
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-secondary"
                                  onClick={() => setSelectedOrder(null)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="delivery-section">
                              <h4>Order Delivered</h4>
                              <div className="form-group">
                                <label>Gift Code:</label>
                                <input
                                  type="text"
                                  value={order.giftCode}
                                  className="form-control"
                                  disabled
                                />
                              </div>
                              <div className="approval-actions-admin">
                                <button 
                                  className="btn-secondary"
                                  onClick={() => setSelectedOrder(null)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="order-actions-admin">
                          <button 
                            className="btn-primary"
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            Process Order
                          </button>
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

export default LocalAdminPanel;