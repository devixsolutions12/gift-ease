import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalPaymentSettings, saveLocalPaymentSettings } from '../utils/localOrders';

const SettingsSyncTest = () => {
  const navigate = useNavigate();
  const [paymentSettings, setPaymentSettings] = useState({
    upiId: '',
    upiName: '',
    paymentInstructions: '',
    qrCodeImage: ''
  });
  const [testValue, setTestValue] = useState('');
  const [syncStatus, setSyncStatus] = useState('Not tested');

  // Load current payment settings
  useEffect(() => {
    const loadSettings = () => {
      try {
        const settings = getLocalPaymentSettings();
        setPaymentSettings(settings);
        setTestValue(settings.upiId || '');
      } catch (error) {
        console.error('Error loading payment settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Handle storage changes (simulate real-time sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'giftEasePaymentSettings') {
        try {
          const updatedSettings = JSON.parse(e.newValue);
          setPaymentSettings(updatedSettings);
          setSyncStatus('Settings updated in real-time!');
          setTimeout(() => setSyncStatus('Not tested'), 3000);
        } catch (error) {
          console.error('Error parsing updated payment settings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleUpdateSettings = () => {
    try {
      const updatedSettings = {
        ...paymentSettings,
        upiId: testValue
      };
      
      const success = saveLocalPaymentSettings(updatedSettings);
      if (success) {
        setPaymentSettings(updatedSettings);
        setSyncStatus('Settings saved successfully!');
        setTimeout(() => setSyncStatus('Not tested'), 3000);
      } else {
        setSyncStatus('Error saving settings');
      }
    } catch (error) {
      console.error('Error updating payment settings:', error);
      setSyncStatus('Error updating settings');
    }
  };

  return (
    <div className="settings-sync-test">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={() => navigate('/')} className="nav-button">
              ← Back to Home
            </button>
            <button onClick={() => navigate('/admin/dashboard')} className="nav-button">
              Admin Panel
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <h2 className="section-title">Payment Settings Sync Test</h2>
          
          <div className="checkout-grid">
            <div className="order-summary-card card">
              <div className="card-header">
                <h3>Current Settings</h3>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label><strong>UPI ID:</strong></label>
                  <p>{paymentSettings.upiId || 'Not set'}</p>
                </div>
                <div className="form-group">
                  <label><strong>UPI Name:</strong></label>
                  <p>{paymentSettings.upiName || 'Not set'}</p>
                </div>
                <div className="form-group">
                  <label><strong>Payment Instructions:</strong></label>
                  <p>{paymentSettings.paymentInstructions || 'Not set'}</p>
                </div>
                <div className="form-group">
                  <label><strong>QR Code:</strong></label>
                  {paymentSettings.qrCodeImage ? (
                    <img 
                      src={paymentSettings.qrCodeImage} 
                      alt="QR Code" 
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  ) : (
                    <p>No QR code set</p>
                  )}
                </div>
              </div>
            </div>

            <div className="payment-instructions-card card">
              <div className="card-header">
                <h3>Update Settings</h3>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="testValue">New UPI ID:</label>
                  <input
                    type="text"
                    id="testValue"
                    value={testValue}
                    onChange={(e) => setTestValue(e.target.value)}
                    className="form-control"
                    placeholder="Enter new UPI ID"
                  />
                </div>
                
                <div className="form-group">
                  <button 
                    className="btn-primary"
                    onClick={handleUpdateSettings}
                  >
                    Update Settings
                  </button>
                </div>
                
                <div className="form-group">
                  <div className={`sync-status ${syncStatus === 'Settings saved successfully!' ? 'success' : syncStatus.includes('Error') ? 'error' : ''}`}>
                    <strong>Status:</strong> {syncStatus}
                  </div>
                </div>
                
                <div className="instructions">
                  <h4>Testing Instructions:</h4>
                  <ol>
                    <li>Update the UPI ID in the input field above</li>
                    <li>Click "Update Settings" to save changes</li>
                    <li>Open the Admin Panel in another tab</li>
                    <li>Verify that the changes appear in the Admin Panel</li>
                    <li>Make changes in the Admin Panel</li>
                    <li>Verify that the changes appear here in real-time</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GiftEase</h3>
              <p>Settings synchronization test page.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')} className="footer-link">Home</button></li>
                <li><button onClick={() => navigate('/admin/dashboard')} className="footer-link">Admin Panel</button></li>
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

export default SettingsSyncTest;