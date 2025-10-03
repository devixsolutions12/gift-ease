import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalOrders, saveLocalOrder, updateLocalOrder } from '../utils/localOrders';

const TestLocalOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    productName: 'Test Product',
    amount: 100,
    gmail: '',
    freeFireUid: '',
    bgmiId: '',
    transactionId: 'TEST123'
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const ordersData = getLocalOrders();
    setOrders(ordersData);
  };

  const handleCreateOrder = () => {
    const savedOrder = saveLocalOrder(newOrder);
    if (savedOrder) {
      loadOrders();
      alert('Order created successfully!');
    } else {
      alert('Error creating order');
    }
  };

  const handleApproveOrder = (orderId) => {
    const updatedOrder = updateLocalOrder(orderId, { 
      status: 'approved', 
      giftCode: 'GIFT123CODE' 
    });
    if (updatedOrder) {
      loadOrders();
      alert('Order approved!');
    } else {
      alert('Error updating order');
    }
  };

  const handleRejectOrder = (orderId) => {
    const updatedOrder = updateLocalOrder(orderId, { 
      status: 'rejected', 
      rejectionReason: 'Test rejection reason' 
    });
    if (updatedOrder) {
      loadOrders();
      alert('Order rejected!');
    } else {
      alert('Error updating order');
    }
  };

  return (
    <div className="container">
      <h1>Local Orders Test</h1>
      <button onClick={() => navigate('/')}>Back to Home</button>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Create Test Order</h2>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={newOrder.productName}
            onChange={(e) => setNewOrder({...newOrder, productName: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={newOrder.amount}
            onChange={(e) => setNewOrder({...newOrder, amount: parseInt(e.target.value)})}
          />
        </div>
        <div className="form-group">
          <label>Gmail:</label>
          <input
            type="text"
            value={newOrder.gmail}
            onChange={(e) => setNewOrder({...newOrder, gmail: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Free Fire UID:</label>
          <input
            type="text"
            value={newOrder.freeFireUid}
            onChange={(e) => setNewOrder({...newOrder, freeFireUid: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>BGMI ID:</label>
          <input
            type="text"
            value={newOrder.bgmiId}
            onChange={(e) => setNewOrder({...newOrder, bgmiId: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Transaction ID:</label>
          <input
            type="text"
            value={newOrder.transactionId}
            onChange={(e) => setNewOrder({...newOrder, transactionId: e.target.value})}
          />
        </div>
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>

      <div>
        <h2>Current Orders ({orders.length})</h2>
        {orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Amount:</strong> ₹{order.amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            {order.gmail && <p><strong>Gmail:</strong> {order.gmail}</p>}
            {order.freeFireUid && <p><strong>FF UID:</strong> {order.freeFireUid}</p>}
            {order.bgmiId && <p><strong>BGMI ID:</strong> {order.bgmiId}</p>}
            <p><strong>Transaction ID:</strong> {order.transactionId}</p>
            <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            {order.status === 'pending' && (
              <div>
                <button onClick={() => handleApproveOrder(order.id)}>Approve</button>
                <button onClick={() => handleRejectOrder(order.id)}>Reject</button>
              </div>
            )}
            {order.status === 'approved' && <p><strong>Gift Code:</strong> {order.giftCode}</p>}
            {order.status === 'rejected' && <p><strong>Rejection Reason:</strong> {order.rejectionReason}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestLocalOrders;