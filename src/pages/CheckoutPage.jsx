import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import bgmiImage from '../assets/bgmi.png';
// Using professional SVG placeholders that represent actual product images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";
import '../App.css';

const CheckoutPage = () => {
  const { productType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    transactionId: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)'
    },
    'free-fire': {
      name: 'Free Fire Diamonds',
      image: freeFireImage,
      alt: 'Free Fire Diamonds Loot Chest',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)'
    },
    'bgmi': {
      name: 'BGMI UC',
      image: bgmiImage,
      alt: 'BGMI UC Currency Voucher',
      gradient: 'linear-gradient(135deg, #8A2BE2, #4B0082)'
    }
  };
  
  const currentProduct = productDetails[productType] || productDetails['play-store'];
  const selectedPackage = location.state?.package;
  
  // Get user profile and payment settings on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:5003/api/users/profile', {
          headers: {
            Authorization: token
          }
        });
        
        setUser(response.data);
        setFormData({
          ...formData,
          userName: response.data.name,
          userEmail: response.data.email
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchPaymentSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/payment-settings');
        setPaymentSettings(response.data);
      } catch (error) {
        console.error('Error fetching payment settings:', error);
        // Use default settings if unable to fetch
        setPaymentSettings({
          upiId: 'giftease@upi',
          upiName: 'GiftEase Payments',
          paymentInstructions: 'Please make the payment using UPI to the following details:\n1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Scan the QR code or enter the UPI ID above\n3. Enter the exact amount\n4. Complete the payment and note the transaction ID',
          qrCodeImage: ''
        });
      }
    };
    
    fetchUserProfile();
    fetchPaymentSettings();
  }, [navigate]);
  
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
    
    try {
      const token = localStorage.getItem('userToken');
      
      const orderData = {
        productName: `${currentProduct.name} - ${selectedPackage.value}`,
        amount: parseInt(selectedPackage.price.replace('₹', '')),
        userId: user._id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        transactionId: formData.transactionId
      };
      
      // Submit order to backend
      await axios.post('http://localhost:5003/api/orders', orderData, {
        headers: {
          Authorization: token
        }
      });
      
      setIsSubmitted(true);
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
            <p>You will receive your gift code in the "Your Orders" section once approved.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/orders')}
            >
              View Your Orders
            </button>
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
            <button onClick={() => navigate('/orders')} className="nav-button">
              Your Orders
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
                <h3>Transaction Details</h3>
                
                <div className="form-group">
                  <label htmlFor="userName">Full Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="userEmail">Email Address</label>
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                    readOnly
                  />
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