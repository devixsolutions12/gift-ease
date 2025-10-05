import React, { useState, useEffect } from 'react';

const TestSyncPage = () => {
  const [adminSettings, setAdminSettings] = useState({
    upiId: '',
    upiName: '',
    paymentInstructions: '',
    qrCodeImage: ''
  });
  
  const [userSettings, setUserSettings] = useState({
    upiId: '',
    upiName: '',
    paymentInstructions: '',
    qrCodeImage: ''
  });
  
  const [lastUpdate, setLastUpdate] = useState(null);

  // Load initial settings
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('giftEasePaymentSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setAdminSettings(parsed);
          setUserSettings(parsed);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
    
    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'giftEasePaymentSettings') {
        try {
          const updatedSettings = JSON.parse(e.newValue);
          setUserSettings(updatedSettings);
          setLastUpdate(new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Error parsing updated settings:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Polling for updates
    const intervalId = setInterval(() => {
      try {
        const savedSettings = localStorage.getItem('giftEasePaymentSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setUserSettings(prev => {
            if (JSON.stringify(prev) !== savedSettings) {
              setLastUpdate(new Date().toLocaleTimeString());
              return parsedSettings;
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('giftEasePaymentSettings', JSON.stringify(adminSettings));
      
      // Dispatch storage event manually
      const storageEvent = new StorageEvent('storage', {
        key: 'giftEasePaymentSettings',
        newValue: JSON.stringify(adminSettings),
        storageArea: window.localStorage
      });
      
      window.dispatchEvent(storageEvent);
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Payment Settings Synchronization Test</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {/* Admin Panel Simulation */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h2>Admin Panel (Simulator)</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>UPI ID:</label>
            <input
              type="text"
              name="upiId"
              value={adminSettings.upiId}
              onChange={handleAdminChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>UPI Name:</label>
            <input
              type="text"
              name="upiName"
              value={adminSettings.upiName}
              onChange={handleAdminChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Payment Instructions:</label>
            <textarea
              name="paymentInstructions"
              value={adminSettings.paymentInstructions}
              onChange={handleAdminChange}
              rows="4"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <button 
            onClick={saveSettings}
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Save Settings
          </button>
        </div>
        
        {/* User View Simulation */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h2>User Payment Page (Simulator)</h2>
          <p><strong>Last Update:</strong> {lastUpdate || 'Never'}</p>
          
          <div style={{ marginBottom: '10px' }}>
            <label>UPI ID:</label>
            <div style={{ padding: '8px', backgroundColor: '#f8f9fa', marginTop: '5px' }}>
              {userSettings.upiId || 'Not set'}
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>UPI Name:</label>
            <div style={{ padding: '8px', backgroundColor: '#f8f9fa', marginTop: '5px' }}>
              {userSettings.upiName || 'Not set'}
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Payment Instructions:</label>
            <div style={{ padding: '8px', backgroundColor: '#f8f9fa', marginTop: '5px', whiteSpace: 'pre-wrap' }}>
              {userSettings.paymentInstructions || 'Not set'}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h3>Debug Information</h3>
        <p><strong>Current localStorage value:</strong></p>
        <pre style={{ backgroundColor: 'white', padding: '10px', overflow: 'auto' }}>
          {localStorage.getItem('giftEasePaymentSettings') || 'None'}
        </pre>
      </div>
    </div>
  );
};

export default TestSyncPage;