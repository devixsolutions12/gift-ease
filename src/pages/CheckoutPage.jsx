import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
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
  const [captchaValue, setCaptchaValue] = useState(null);
  
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
    const savedSettings = localStorage.getItem('giftEasePaymentSettings');
    if (savedSettings) {
      try {
        setPaymentSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing payment settings:', error);
      }
    }
  }, []);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate CAPTCHA
    if (!captchaValue) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
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
          <div className="error-message">
            <h2>No package selected</h2>
            <p>Please go back and select a package.</p>
            <button className="btn-primary" onClick={handleBack}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="confirmation-message">
            <h2>Order Submitted Successfully!</h2>
            <p>Your order has been submitted for verification.</p>
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
            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="product-summary-card">
                <div className="product-header" style={{ background: currentProduct.gradient }}>
                  <div className="product-image-container-enhanced">
                    <img src={currentProduct.image} alt={currentProduct.alt || currentProduct.name} className="product-image-enhanced" />
                  </div>
                  <h4>{currentProduct.name}</h4>
                </div>
                <div className="package-details">
                  <div className="package-price-checkout">{selectedPackage.price}</div>
                  <div className="package-value-checkout">{selectedPackage.value}</div>
                  <div className="package-savings-checkout">{selectedPackage.savings}</div>
                </div>
              </div>
              
              <div className="order-total">
                <div className="total-label">Total Amount:</div>
                <div className="total-amount">{selectedPackage.price}</div>
              </div>
            </div>
            
            {/* Payment Instructions */}
            <div className="payment-section">
              <div className="payment-instructions">
                <h3>Payment Instructions</h3>
                <div className="upi-details">
                  <p>{paymentSettings.paymentInstructions}</p>
                  <div className="upi-id">
                    UPI ID: <strong>{paymentSettings.upiId}</strong>
                  </div>
                  {paymentSettings.qrCodeImage && (
                    <div className="qr-code-placeholder">
                      <p>Scan QR Code:</p>
                      <div className="qr-placeholder">
                        <img 
                          src={paymentSettings.qrCodeImage} 
                          alt="Payment QR Code" 
                          style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  )}
                  {!paymentSettings.qrCodeImage && (
                    <div className="qr-code-placeholder">
                      <p>QR Code would be displayed here in a real application</p>
                      <div className="qr-placeholder">[QR CODE PLACEHOLDER]</div>
                    </div>
                  )}
                  <div className="payment-steps">
                    <h4>How to Pay:</h4>
                    <ol>
                      <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code or enter the UPI ID above</li>
                      <li>Enter the exact amount: <strong>{selectedPackage.price}</strong></li>
                      <li>Complete the payment and note the transaction ID</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              {/* Transaction Form */}
              <form onSubmit={handleSubmit} className="payment-form">
                <h3>Required Information</h3>
                
                <div className="form-group">
                  <label htmlFor={currentProduct.fieldName}>{currentProduct.fieldLabel}</label>
                  <input
                    type="text"
                    id={currentProduct.fieldName}
                    name={currentProduct.fieldName}
                    value={formData[currentProduct.fieldName]}
                    onChange={handleChange}
                    placeholder={currentProduct.fieldPlaceholder}
                    required
                  />
                  <small>{currentProduct.fieldPlaceholder}</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="transactionId">Transaction ID</label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter UPI transaction ID"
                    required
                  />
                  <small>After completing the payment, enter the transaction ID from your UPI app</small>
                </div>
                
                <div className="form-group">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with your own
                    onChange={handleCaptchaChange}
                  />
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
                
                <button type="submit" className="btn-primary btn-large">
                  Submit Order
                </button>
              </form>
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