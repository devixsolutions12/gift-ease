import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [selectedOrder, setSelectedOrder] = useState(null); // For detailed order view

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        // Fetch user orders
        const ordersResponse = await axios.get(`http://localhost:5003/api/orders/user/${user._id}`, {
          headers: {
            Authorization: localStorage.getItem('userToken')
          }
        });
        
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          userLogout();
          navigate('/login');
        }
        showToastMessage('Error fetching orders. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, navigate, userLogout]);

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

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Loading your orders<span className="loading-dots"></span></p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>Your Orders</h1>
          <div className="header-actions">
            <button 
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              ← Back to Home
            </button>
            <button 
              onClick={exportToPDF}
              className="btn-secondary"
            >
              Export All Orders
            </button>
          </div>
        </div>
        
        {showToast.show && (
          <div className={`toast toast-${showToast.type} animate-zoomIn`}>
            {showToast.message}
          </div>
        )}
        
        {/* Detailed Order View Modal */}
        {selectedOrder && (
          <div className="order-detail-modal" role="dialog" aria-labelledby="order-detail-title">
            <div className="modal-content">
              <div className="modal-header">
                <h2 id="order-detail-title">Order Details</h2>
                <button className="close-button" onClick={closeOrderDetails} aria-label="Close order details">&times;</button>
              </div>
              <div className="modal-body">
                <div className="order-detail-item">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value">{selectedOrder._id}</span>
                </div>
                <div className="order-detail-item">
                  <span className="detail-label">Product:</span>
                  <span className="detail-value">{selectedOrder.productName}</span>
                </div>
                <div className="order-detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">₹{selectedOrder.amount}</span>
                </div>
                <div className="order-detail-item">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value">{selectedOrder.transactionId}</span>
                </div>
                <div className="order-detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="order-detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-badge-enhanced ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)} {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                {selectedOrder.status === 'approved' && selectedOrder.giftCode && (
                  <div className="order-detail-item">
                    <span className="detail-label">Gift Code:</span>
                    <span className="detail-value gift-code">{selectedOrder.giftCode}</span>
                  </div>
                )}
                {selectedOrder.status === 'rejected' && selectedOrder.rejectionReason && (
                  <div className="order-detail-item">
                    <span className="detail-label">Rejection Reason:</span>
                    <span className="detail-value rejection-reason">
                      {selectedOrder.rejectionReason}
                    </span>
                  </div>
                )}
                {selectedOrder.status === 'pending' && (
                  <div className="order-detail-item">
                    <span className="detail-label">Estimated Approval:</span>
                    <span className="detail-value">
                      {getEstimatedApprovalTime(selectedOrder)}
                    </span>
                  </div>
                )}
                <div className="order-detail-item">
                  <span className="detail-label">Support:</span>
                  <span className="detail-value">
                    <button 
                      className="btn-secondary"
                      onClick={() => navigate('/help')}
                    >
                      Contact Support
                    </button>
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                {selectedOrder.status === 'approved' && selectedOrder.giftCode && (
                  <button 
                    className="btn-primary btn-animated"
                    onClick={() => downloadGiftCode(selectedOrder)}
                  >
                    📥 Download Gift Code
                  </button>
                )}
                <button className="btn-secondary" onClick={closeOrderDetails}>Close</button>
              </div>
            </div>
          </div>
        )}
        
        {orders.length === 0 ? (
          <div className="no-orders-message">
            <p>You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary btn-animated"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Order Summary Stats */}
            <div className="order-stats grid-layout-enhanced grid-cols-4">
              <div className="stat-card trust-badge-enhanced">
                <div className="stat-value">{orders.length}</div>
                <div className="stat-label">Total Orders</div>
              </div>
              <div className="stat-card trust-badge-enhanced">
                <div className="stat-value">{pendingOrders.length}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card trust-badge-enhanced">
                <div className="stat-value">{approvedOrders.length}</div>
                <div className="stat-label">Approved</div>
              </div>
              <div className="stat-card trust-badge-enhanced">
                <div className="stat-value">{rejectedOrders.length}</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="orders-tabs flex-layout-enhanced flex-wrap justify-center">
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''} btn-animated`}
                onClick={() => setActiveTab('all')}
              >
                All Orders
              </button>
              <button 
                className={`tab-button ${activeTab === 'pending' ? 'active' : ''} btn-animated`}
                onClick={() => setActiveTab('pending')}
              >
                Pending <span className="badge badge-pending">{pendingOrders.length}</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'approved' ? 'active' : ''} btn-animated`}
                onClick={() => setActiveTab('approved')}
              >
                Approved <span className="badge badge-approved">{approvedOrders.length}</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'rejected' ? 'active' : ''} btn-animated`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejected <span className="badge badge-rejected">{rejectedOrders.length}</span>
              </button>
            </div>
            
            {/* Pending Orders Section */}
            {activeTab === 'all' || activeTab === 'pending' ? (
              <div className="pending-orders-section">
                <h2 className="section-title-enhanced">Pending Orders</h2>
                {pendingOrders.length > 0 ? (
                  <div className="orders-list">
                    {pendingOrders.map((order) => (
                      <div 
                        key={order._id} 
                        className="order-card-enhanced animate-bounceIn"
                        onClick={() => openOrderDetails(order)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            openOrderDetails(order);
                          }
                        }}
                        aria-label={`View details for order ${order._id}`}
                      >
                        <div className="order-header">
                          <h3>{order.productName}</h3>
                          <span className={`status-badge-enhanced ${getStatusClass(order.status)}`}>
                            {getStatusIcon(order.status)} {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        <div className="order-details">
                          <div className="order-detail-item">
                            <span className="detail-label">Order ID:</span>
                            <span className="detail-value">{order._id}</span>
                          </div>
                          <div className="order-detail-item">
                            <span className="detail-label">Amount:</span>
                            <span className="detail-value">₹{order.amount}</span>
                          </div>
                          <div className="order-detail-item">
                            <span className="detail-label">Transaction ID:</span>
                            <span className="detail-value">{order.transactionId}</span>
                          </div>
                          <div className="order-detail-item">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="order-detail-item">
                            <span className="detail-label">Estimated Approval:</span>
                            <span className="detail-value">
                              {getEstimatedApprovalTime(order)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="order-info">
                          <p className="info-text">
                            <strong>Next Step:</strong> Your order is pending admin approval. 
                            Please allow 1-2 business hours for processing.
                          </p>
                          <div className="processing-animation">
                            <div className="processing-bar"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-pending-orders">
                    <p>No pending orders at this time.</p>
                  </div>
                )}
              </div>
            ) : null}
            
            {/* Orders List */}
            <div className="orders-list">
              {filteredOrders.length === 0 ? (
                <div className="no-orders-message">
                  <p>No orders found in this category.</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div 
                    key={order._id} 
                    className="order-card-enhanced animate-on-scroll"
                    onClick={() => openOrderDetails(order)}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openOrderDetails(order);
                      }
                    }}
                    aria-label={`View details for order ${order._id}`}
                  >
                    <div className="order-header">
                      <h3>{order.productName}</h3>
                      <span className={`status-badge-enhanced ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)} {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="order-details">
                      <div className="order-detail-item">
                        <span className="detail-label">Order ID:</span>
                        <span className="detail-value">{order._id}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="detail-label">Amount:</span>
                        <span className="detail-value">₹{order.amount}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{order.transactionId}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {order.status === 'approved' && order.giftCode && (
                        <div className="order-detail-item">
                          <span className="detail-label">Gift Code:</span>
                          <span className="detail-value gift-code">{order.giftCode}</span>
                        </div>
                      )}
                      {order.status === 'rejected' && order.rejectionReason && (
                        <div className="order-detail-item">
                          <span className="detail-label">Rejection Reason:</span>
                          <span className="detail-value rejection-reason">
                            {order.rejectionReason}
                          </span>
                        </div>
                      )}
                      {order.status === 'pending' && (
                        <div className="order-detail-item">
                          <span className="detail-label">Estimated Approval:</span>
                          <span className="detail-value">
                            {getEstimatedApprovalTime(order)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {order.status === 'approved' && order.giftCode && (
                      <div className="order-actions flex-layout-enhanced justify-center">
                        <button 
                          className="btn-primary btn-animated"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadGiftCode(order);
                          }}
                        >
                          📥 Download Gift Code
                        </button>
                      </div>
                    )}
                    
                    {order.status === 'pending' && (
                      <div className="order-info">
                        <p className="info-text">
                          <strong>Next Step:</strong> Your order is pending admin approval. 
                          Please allow 1-2 business hours for processing.
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;