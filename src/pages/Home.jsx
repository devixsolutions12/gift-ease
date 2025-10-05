import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgmiImage from '../assets/bgmi.png';
// Using professional SVG placeholders that represent actual product images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 'play-store',
      name: 'Play Store',
      description: 'Redeem codes for Google Play Store',
      image: playStoreImage,
      gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
      alt: 'Google Play Redeem Code Card'
    },
    {
      id: 'free-fire',
      name: 'Free Fire Diamonds',
      description: 'Top up your Free Fire account with diamonds',
      image: freeFireImage,
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      alt: 'Free Fire Diamonds Loot Chest'
    },
    {
      id: 'bgmi',
      name: 'BGMI UC',
      description: 'Top up your BGMI account with UC',
      image: bgmiImage,
      gradient: 'linear-gradient(135deg, #8A2BE2, #4B0082)',
      alt: 'BGMI UC Currency Voucher'
    }
  ];

  return (
    <div className="home">
      {/* Header */}
      <header className="header" role="banner">
        <div className="container">
          <h1 className="logo" aria-label="GiftEase Logo">GiftEase</h1>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <button onClick={() => navigate('/track-order')} className="nav-button" aria-label="Track your order">
              Track Order
            </button>
            <button onClick={() => navigate('/help')} className="nav-button" aria-label="Get help and support">
              Help
            </button>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title">Instant Digital Gifts</h1>
            <p className="hero-subtitle">Get your favorite game credits and redeem codes delivered instantly</p>
            
            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Orders Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="container">
        <h2 className="section-title">Our Digital Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card-enhanced">
              <div className="product-header-enhanced" style={{ background: product.gradient }}>
                <div className="product-image-container-enhanced">
                  <img 
                    src={product.image} 
                    alt={product.alt} 
                    className="product-image-enhanced"
                  />
                </div>
                <div className="product-info-enhanced">
                  <h3 className="product-name-enhanced">{product.name}</h3>
                  <p className="product-description-enhanced">{product.description}</p>
                </div>
              </div>
              <div className="packages-grid">
                <div className="package-card">
                  <div className="package-price">₹300</div>
                  <div className="package-value">Starting Price</div>
                </div>
                <div className="package-card">
                  <div className="package-price">₹1500</div>
                  <div className="package-value">Max Value</div>
                </div>
              </div>
              <button 
                className="buy-button-enhanced"
                onClick={() => navigate(`/packages/${product.id}`)}
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="container">
        <h2 className="section-title">Why Choose GiftEase?</h2>
        <div className="features-grid">
          <div className="feature-card-enhanced">
            <div className="feature-icon">⚡</div>
            <h3>Instant Delivery</h3>
            <p>Get your codes delivered within minutes after payment confirmation</p>
          </div>
          <div className="feature-card-enhanced">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>Safe and secure UPI payments with complete transaction privacy</p>
          </div>
          <div className="feature-card-enhanced">
            <div className="feature-icon">💯</div>
            <h3>100% Genuine</h3>
            <p>All codes are genuine and verified for immediate use</p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card-enhanced">
            <div className="step-number">1</div>
            <h3>Choose Product</h3>
            <p>Select your desired gift card or in-game currency package</p>
          </div>
          <div className="step-card-enhanced">
            <div className="step-number">2</div>
            <h3>Make Payment</h3>
            <p>Pay via UPI using our secure payment gateway</p>
          </div>
          <div className="step-card-enhanced">
            <div className="step-number">3</div>
            <h3>Get Code</h3>
            <p>Receive your redeem code instantly after payment confirmation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;