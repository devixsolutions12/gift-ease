import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const PaymentPage = () => {
  const { productType } = useParams();
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
        productName: currentProduct.name,
        amount: currentProduct.price,
        userId: user._id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        transactionId: formData.transactionId
      };
      
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
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="payment-page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
      <div className="payment-page">
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
    <div className="payment-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={handleBack} className="nav-button">
              ← Back to Home
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
              <div className="product-info">
                <h3>{currentProduct.name}</h3>
                <p>{currentProduct.description}</p>
                <div className="price">₹{currentProduct.price}</div>
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
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleCaptchaChange}
                  />
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

export default PaymentPage;