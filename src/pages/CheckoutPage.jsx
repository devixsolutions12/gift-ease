import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import bgmiImage from '../assets/bgmi.png';
import { saveLocalOrder } from '../utils/localOrders';
// Using professional SVG placeholders that represent actual product images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";
import '../App.css';

const CheckoutPage = () => {
  const { productType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    gmail: '',
    freeFireUid: '',
    bgmiId: '',
    transactionId: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isQrExpanded, setIsQrExpanded] = useState(false); // State for QR code expansion
  
  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    upiId: 'giftease@upi',
    upiName: 'GiftEase Payments',
    paymentInstructions: 'Please make the payment using UPI to the following details:\n1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter the UPI ID above\n3. Enter the exact amount\n4. Complete the payment and note the transaction ID',
    qrCodeImage: ''
  });
  
  // Product information
  const productDetails = {
    'play-store': {
      name: 'Play Store Redeem Code',
      image: playStoreImage,
      alt: 'Google Play Redeem Code Card',
      gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
      fieldLabel: 'Gmail Address',
      fieldPlaceholder: 'Enter your Gmail address to receive code',
      fieldName: 'gmail'
    },
    'free-fire': {
      name: 'Free Fire Diamonds',
      image: freeFireImage,
      alt: 'Free Fire Diamonds Loot Chest',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      fieldLabel: 'Free Fire UID',
      fieldPlaceholder: 'Enter your Free Fire UID for delivery',
      fieldName: 'freeFireUid'
    },
    'bgmi': {
      name: 'BGMI UC',
      image: bgmiImage,
      alt: 'BGMI UC Currency Voucher',
      gradient: 'linear-gradient(135deg, #8A2BE2, #4B0082)',
      fieldLabel: 'BGMI ID',
      fieldPlaceholder: 'Enter your BGMI ID for delivery',
      fieldName: 'bgmiId'
    }
  };
  
  const currentProduct = productDetails[productType] || productDetails['play-store'];
  const selectedPackage = location.state?.package;
  
  // Get payment settings on component mount
  useEffect(() => {
    // Load payment settings from local storage
    const loadPaymentSettings = () => {
      try {
        const savedSettings = localStorage.getItem('giftEasePaymentSettings');
        if (savedSettings) {
          setPaymentSettings(JSON.parse(savedSettings));
        } else {
          // Save default settings to localStorage if not present
          const defaultSettings = {
            upiId: 'giftease@upi',
            upiName: 'GiftEase Payments',
            paymentInstructions: 'Complete your payment using any UPI app:\n\n1. Open your preferred UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or manually enter the UPI ID\n3. Verify the exact amount matches the product price\n4. Complete the payment and save the transaction ID\n5. Enter the transaction ID in the form below',
            qrCodeImage: ''
          };
          localStorage.setItem('giftEasePaymentSettings', JSON.stringify(defaultSettings));
          setPaymentSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Error loading payment settings:', error);
      }
    };
    
    loadPaymentSettings();
    
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'giftEasePaymentSettings') {
        try {
          const updatedSettings = JSON.parse(e.newValue);
          console.log('CheckoutPage: Storage event received, updating settings', updatedSettings);
          setPaymentSettings(updatedSettings);
        } catch (error) {
          console.error('Error parsing updated payment settings:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes when component mounts (in case settings were updated in another tab)
    const checkForUpdates = () => {
      try {
        const savedSettings = localStorage.getItem('giftEasePaymentSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          // Only update if different from current state
          setPaymentSettings(prevSettings => {
            // Deep comparison to check if settings actually changed
            const prevStr = JSON.stringify({
              upiId: prevSettings.upiId,
              upiName: prevSettings.upiName,
              paymentInstructions: prevSettings.paymentInstructions,
              qrCodeImage: prevSettings.qrCodeImage
            });
            
            const newStr = JSON.stringify({
              upiId: parsedSettings.upiId,
              upiName: parsedSettings.upiName,
              paymentInstructions: parsedSettings.paymentInstructions,
              qrCodeImage: parsedSettings.qrCodeImage
            });
            
            if (prevStr !== newStr) {
              console.log('CheckoutPage: Polling detected settings change, updating', parsedSettings);
              return parsedSettings;
            }
            return prevSettings;
          });
        }
      } catch (error) {
        console.error('Error checking for payment settings updates:', error);
      }
    };
    
    // Check for updates every 2 seconds
    const intervalId = setInterval(checkForUpdates, 2000);
    console.log('CheckoutPage: Started polling for updates every 2 seconds');
    
    // Cleanup event listener and interval
    return () => {
      console.log('CheckoutPage: Cleaning up event listener and interval');
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required field based on product type
    if (!formData[currentProduct.fieldName]) {
      alert(`Please enter your ${currentProduct.fieldLabel}`);
      return;
    }
    
    try {
      const orderData = {
        productName: `${currentProduct.name} - ${selectedPackage.value}`,
        amount: parseInt(selectedPackage.price.replace('₹', '')),
        [currentProduct.fieldName]: formData[currentProduct.fieldName],
        transactionId: formData.transactionId
      };
      
      // Save order to local storage
      const savedOrder = saveLocalOrder(orderData);
      
      if (savedOrder) {
        setIsSubmitted(true);
        setSubmittedOrderId(savedOrder.id);
      } else {
        alert('Error saving order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };
  
  const toggleQrExpansion = () => {
    setIsQrExpanded(!isQrExpanded);
  };
  
  if (loading) {
    return (
      <div className="checkout-page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!selectedPackage) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="error-message card">
            <div className="card-header">
              <h2>No package selected</h2>
            </div>
            <div className="card-content">
              <p>Please go back and select a package.</p>
              <button className="btn-primary" onClick={handleBack}>Go Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="confirmation-card card">
            <div className="card-header">
              <h2>Order Submitted Successfully!</h2>
            </div>
            <div className="card-content">
              <div className="confirmation-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#10B981" stroke="#10B981" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="confirmation-text">Your order has been submitted for verification.</p>
              <div className="order-id-display">
                <p><strong>Your Order ID is: {submittedOrderId}</strong></p>
                <p>Save this Order ID to track your order progress.</p>
              </div>
              <div className="next-steps">
                <h3>Next Steps:</h3>
                <ol>
                  <li>Complete your payment using the instructions above</li>
                  <li>Wait for admin verification (usually within 1-2 hours)</li>
                  <li>Track your order status using the Order ID above</li>
                  <li>Receive your gift code when approved</li>
                </ol>
              </div>
              <div className="action-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/track-order')}
                >
                  Track Your Order
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={handleBack} className="nav-button">
              ← Back
            </button>
            <button onClick={() => navigate('/help')} className="nav-button">
              Help
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          <h2 className="section-title">Complete Your Purchase</h2>
          
          <div className="checkout-grid">
            {/* Order Summary Card */}
            <div className="order-summary-card card">
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-content">
                <div className="product-image-container">
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.alt}
                    className="product-image"
                    style={{ background: currentProduct.gradient }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{currentProduct.name}</h3>
                  <div className="package-details">
                    <div className="package-price">{selectedPackage.price}</div>
                    <div className="package-value">{selectedPackage.value}</div>
                    <div className="package-savings">{selectedPackage.savings}</div>
                  </div>
                  <div className="order-total">
                    <div className="total-label">Total Amount:</div>
                    <div className="total-amount">{selectedPackage.price}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Instructions Card */}
            <div className="payment-instructions-card card">
              <div className="card-header">
                <h3>Payment Instructions</h3>
              </div>
              <div className="card-content">
                <div className="payment-steps">
                  <h4 className="steps-title">Follow these steps to complete your payment:</h4>
                  <ol className="steps-list">
                    <li>
                      <div className="step-content">
                        <span className="step-icon">1</span>
                        <span className="step-text">Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</span>
                      </div>
                    </li>
                    <li>
                      <div className="step-content">
                        <span className="step-icon">2</span>
                        <span className="step-text">Scan the QR code or enter the UPI ID</span>
                      </div>
                    </li>
                    <li>
                      <div className="step-content">
                        <span className="step-icon">3</span>
                        <span className="step-text">Enter the exact amount: <strong>{selectedPackage.price}</strong></span>
                      </div>
                    </li>
                    <li>
                      <div className="step-content">
                        <span className="step-icon">4</span>
                        <span className="step-text">Complete the payment and note the transaction ID</span>
                      </div>
                    </li>
                  </ol>
                </div>
                
                <div className="upi-details-section">
                  <div className="section-title-small">Payment Method</div>
                  
                  <div className="upi-id-container">
                    <label className="upi-label">UPI ID:</label>
                    <div className="upi-id-display">
                      <span className="upi-id-text">{paymentSettings.upiId}</span>
                      <button 
                        className="copy-button btn-secondary"
                        onClick={() => copyToClipboard(paymentSettings.upiId)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C6.89543 5 6 4.10457 6 3V5H8ZM14 5C14 3.89543 13.1046 3 12 3H10C8.89543 3 8 3.89543 8 5M14 5H16C17.1046 5 18 5.89543 18 7V10M18 14V19C18 20.1046 17.1046 21 16 21H14M18 14C19.1046 14 20 13.1046 20 12V10C20 8.89543 19.1046 8 18 8H16C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16H18ZM18 14H16C14.8954 14 14 13.1046 14 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copy UPI
                      </button>
                    </div>
                  </div>
                  
                  <div className="qr-code-section">
                    <label className="qr-label">QR Code:</label>
                    <div className="qr-code-container">
                      {paymentSettings.qrCodeImage ? (
                        <div className={`qr-code-display ${isQrExpanded ? 'expanded' : ''}`}>
                          <img 
                            src={paymentSettings.qrCodeImage} 
                            alt="Payment QR Code" 
                            className="qr-code-image"
                          />
                        </div>
                      ) : (
                        <div className="qr-placeholder">
                          <div className="qr-placeholder-box">[QR CODE PLACEHOLDER]</div>
                        </div>
                      )}
                      <div className="qr-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => copyToClipboard(paymentSettings.upiId)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C6.89543 5 6 4.10457 6 3V5H8ZM14 5C14 3.89543 13.1046 3 12 3H10C8.89543 3 8 3.89543 8 5M14 5H16C17.1046 5 18 5.89543 18 7V10M18 14V19C18 20.1046 17.1046 21 16 21H14M18 14C19.1046 14 20 13.1046 20 12V10C20 8.89543 19.1046 8 18 8H16C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16H18ZM18 14H16C14.8954 14 14 13.1046 14 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Copy UPI
                        </button>
                        <button 
                          className="btn-secondary"
                          onClick={toggleQrExpansion}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {isQrExpanded ? (
                              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                              <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                          {isQrExpanded ? 'Collapse QR' : 'Expand QR'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction Form Card */}
          <div className="transaction-form-card card">
            <div className="card-header">
              <h3>Transaction Details</h3>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-section">
                  <div className="section-title-small">Required Information</div>
                  
                  <div className="form-group floating-label">
                    <input
                      type="text"
                      id={currentProduct.fieldName}
                      name={currentProduct.fieldName}
                      value={formData[currentProduct.fieldName]}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor={currentProduct.fieldName}>{currentProduct.fieldLabel}</label>
                    <small className="form-hint">{currentProduct.fieldPlaceholder}</small>
                  </div>
                  
                  <div className="form-group floating-label">
                    <input
                      type="text"
                      id="transactionId"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="transactionId">Transaction ID</label>
                    <small className="form-hint">After completing the payment, enter the transaction ID from your UPI app</small>
                  </div>
                </div>
                
                <div className="security-tips">
                  <h4>🔒 Payment Security Tips</h4>
                  <ul>
                    <li>Always verify the UPI ID before making payment</li>
                    <li>Pay the exact amount shown above</li>
                    <li>Keep your transaction ID safe for reference</li>
                    <li>Never share your gift codes with anyone</li>
                  </ul>
                </div>
                
                <button type="submit" className="btn-primary btn-large submit-button">
                  Submit Order
                </button>
              </form>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="trust-badges-section">
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="badge-text">100% Genuine</div>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="badge-text">Secure Payments</div>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="badge-text">Fast Delivery</div>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="badge-text">24/7 Support</div>
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

export default CheckoutPage;