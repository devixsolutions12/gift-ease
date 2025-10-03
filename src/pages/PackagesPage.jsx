import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bgmiImage from '../assets/bgmi.png';
// Using professional SVG placeholders that represent actual product images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";
import '../App.css';

const PackagesPage = () => {
  const { productType } = useParams();
  const navigate = useNavigate();

  const handleBuyNow = (packageData) => {
    // Navigate directly to checkout with package data (no authentication required)
    navigate(`/checkout/${productType}`, { state: { package: packageData } });
  };

  const handleBack = () => {
    navigate('/');
  };

  // Product information
  const productDetails = {
    'play-store': {
      name: 'Play Store Redeem Code',
      description: 'Get redeem codes for Google Play Store',
      image: playStoreImage,
      alt: 'Google Play Redeem Code Card',
      gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
      packages: [
        { id: 1, price: '₹200', value: '₹500 code', savings: 'Save ₹300' },
        { id: 2, price: '₹500', value: '₹1150 code', savings: 'Save ₹650' },
        { id: 3, price: '₹800', value: '₹1650 code', savings: 'Save ₹850' },
        { id: 4, price: '₹1100', value: '₹2150 code', savings: 'Save ₹1050' },
        { id: 5, price: '₹1500', value: '₹3250 code', savings: 'Save ₹1750' }
      ]
    },
    'free-fire': {
      name: 'Free Fire Diamonds',
      description: 'Top up your Free Fire account with diamonds',
      image: freeFireImage,
      alt: 'Free Fire Diamonds Loot Chest',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      packages: [
        { id: 1, price: '₹300', value: '1060 diamonds', savings: 'Save 760 diamonds' },
        { id: 2, price: '₹600', value: '2200 diamonds', savings: 'Save 1600 diamonds' },
        { id: 3, price: '₹900', value: '3400 diamonds', savings: 'Save 2500 diamonds' },
        { id: 4, price: '₹1200', value: '4800 diamonds', savings: 'Save 3600 diamonds' },
        { id: 5, price: '₹1500', value: '6500 diamonds', savings: 'Save 5000 diamonds' }
      ]
    },
    'bgmi': {
      name: 'BGMI UC',
      description: 'Top up your BGMI account with UC',
      image: bgmiImage,
      alt: 'BGMI UC Currency Voucher',
      gradient: 'linear-gradient(135deg, #8A2BE2, #4B0082)',
      packages: [
        { id: 1, price: '₹300', value: '1060 UC', savings: 'Save 760 UC' },
        { id: 2, price: '₹600', value: '2200 UC', savings: 'Save 1600 UC' },
        { id: 3, price: '₹900', value: '3400 UC', savings: 'Save 2500 UC' },
        { id: 4, price: '₹1200', value: '4800 UC', savings: 'Save 3600 UC' },
        { id: 5, price: '₹1500', value: '6500 UC', savings: 'Save 5000 UC' }
      ]
    }
  };

  const currentProduct = productDetails[productType] || productDetails['play-store'];

  return (
    <div className="packages-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">GiftEase</h1>
          <nav className="nav">
            <button onClick={handleBack} className="nav-button">
              ← Back to Home
            </button>
            <button onClick={() => navigate('/help')} className="nav-button">
              Help
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="product-header-large" style={{ background: currentProduct.gradient }}>
            <div className="product-image-container-large">
              <img src={currentProduct.image} alt={currentProduct.alt || currentProduct.name} className="product-image-large" />
            </div>
            <div className="product-info-large">
              <h1>{currentProduct.name}</h1>
              <p>{currentProduct.description}</p>
            </div>
          </div>

          <h2 className="section-title">Available Packages</h2>
          <div className="packages-grid-large">
            {currentProduct.packages.map((pkg) => (
              <div key={pkg.id} className="package-card-large">
                <div className="package-header">
                  <div className="package-price-large">{pkg.price}</div>
                  <div className="package-value-large">{pkg.value}</div>
                  <div className="package-savings">{pkg.savings}</div>
                </div>
                <button 
                  className="buy-button-package"
                  onClick={() => handleBuyNow(pkg)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <div className="package-features">
            <h3>Why Our {currentProduct.name} Packages?</h3>
            <ul>
              <li>✅ Instant delivery after payment confirmation</li>
              <li>✅ 100% genuine and working codes</li>
              <li>✅ Secure payment with UPI</li>
              <li>✅ 24/7 customer support</li>
              <li>✅ No hidden fees or charges</li>
            </ul>
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

export default PackagesPage;