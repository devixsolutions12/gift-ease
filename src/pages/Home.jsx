import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgmiImage from '../assets/bgmi.png';
// Using professional SVG placeholders that represent actual product images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    const packageCards = document.querySelectorAll('.package-card-enhanced, .hero, .products-section, .features-section');
    packageCards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      packageCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  const handleBuyNow = (productType) => {
    // Navigate directly to packages page (no authentication required)
    navigate(`/packages/${productType}`);
  };

  const products = [
    {
      id: 'play-store',
      name: 'Play Store Redeem Code',
      description: 'Get redeem codes for Google Play Store',
      image: playStoreImage,
      alt: 'Google Play Redeem Code Card',
      gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
      packages: [
        { price: '₹200', value: '₹500 code' },
        { price: '₹500', value: '₹1150 code' },
        { price: '₹800', value: '₹1650 code' },
        { price: '₹1100', value: '₹2150 code' },
        { price: '₹1500', value: '₹3250 code' }
      ]
    },
    {
      id: 'free-fire',
      name: 'Free Fire Diamonds',
      description: 'Top up your Free Fire account with diamonds',
      image: freeFireImage,
      alt: 'Free Fire Diamonds Loot Chest',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      packages: [
        { price: '₹300', value: '1060 Diamonds' },
        { price: '₹600', value: '2200 Diamonds' },
        { price: '₹900', value: '3400 Diamonds' },
        { price: '₹1200', value: '4800 Diamonds' },
        { price: '₹1500', value: '6500 Diamonds' }
      ]
    },
    {
      id: 'bgmi',
      name: 'BGMI UC',
      description: 'Top up your BGMI account with UC',
      image: bgmiImage,
      alt: 'BGMI UC Currency Voucher',
      gradient: 'linear-gradient(135deg, #8A2BE2, #4B0082)',
      packages: [
        { price: '₹300', value: '1060 UC' },
        { price: '₹600', value: '2200 UC' },
        { price: '₹900', value: '3400 UC' },
        { price: '₹1200', value: '4800 UC' },
        { price: '₹1500', value: '6500 UC' }
      ]
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
            {/* Removed the Admin button from main navigation as requested */}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title">Instant Digital Gifts</h1>
            <p className="hero-subtitle">Get your favorite game credits and redeem codes delivered instantly</p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Instant Delivery</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" aria-labelledby="how-it-works-title">
        <div className="container">
          <h2 id="how-it-works-title" className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card animate-on-scroll">
              <div className="step-number">1</div>
              <h3>Choose Your Package</h3>
              <p>Select from our wide range of digital gift packages at competitive prices.</p>
            </div>
            <div className="step-card animate-on-scroll">
              <div className="step-number">2</div>
              <h3>Make Payment</h3>
              <p>Pay using UPI with our secure payment system. Scan QR or enter UPI ID.</p>
            </div>
            <div className="step-card animate-on-scroll">
              <div className="step-number">3</div>
              <h3>Submit Transaction ID</h3>
              <p>Enter your UPI transaction ID to verify your payment.</p>
            </div>
            <div className="step-card animate-on-scroll">
              <div className="step-number">4</div>
              <h3>Get Your Gift</h3>
              <p>Receive your digital gift code within hours after admin approval.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" aria-labelledby="products-title">
        <div className="container">
          <h2 id="products-title" className="section-title">Our Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card-enhanced animate-on-scroll">
                <div className="product-header-enhanced" style={{ background: product.gradient }}>
                  <div className="product-image-container-enhanced">
                    <img src={product.image} alt={product.alt} className="product-image-enhanced" loading="lazy" />
                  </div>
                  <div className="product-info-enhanced">
                    <h3 className="product-name-enhanced">{product.name}</h3>
                    <p className="product-description-enhanced">{product.description}</p>
                  </div>
                </div>
                
                <div className="packages-grid">
                  {product.packages.map((pkg, index) => (
                    <div key={index} className="package-card animate-on-scroll">
                      <div className="package-price">{pkg.price}</div>
                      <div className="package-value">{pkg.value}</div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleBuyNow(product.id)}
                  className="buy-button-enhanced"
                  aria-label={`Buy ${product.name}`}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-section" aria-labelledby="trust-title">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <div className="badge-text">100% Secure Payments</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⚡</div>
              <div className="badge-text">Instant Delivery</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">💯</div>
              <div className="badge-text">Genuine Products</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🎧</div>
              <div className="badge-text">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title">Why Choose GiftEase?</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Delivery</h3>
              <p className="feature-description">Get your digital gifts delivered within seconds of payment confirmation.</p>
            </div>
            
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure Payments</h3>
              <p className="feature-description">Your payment information is protected with industry-standard encryption.</p>
            </div>
            
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">💯</div>
              <h3 className="feature-title">100% Genuine</h3>
              <p className="feature-description">All our digital gifts are 100% genuine and sourced directly from official providers.</p>
            </div>
            
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">🎧</div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Our customer support team is available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title" className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <p>"Got my Free Fire diamonds within minutes! The process was so smooth and easy."</p>
                <div className="testimonial-author">- Rajesh Kumar</div>
              </div>
            </div>
            
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <p>"Best platform for Google Play codes. Never had any issues with delivery or authenticity."</p>
                <div className="testimonial-author">- Priya Sharma</div>
              </div>
            </div>
            
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <p>"The BGMI UC top-up was instant and the customer support was very helpful when I had a query."</p>
                <div className="testimonial-author">- Amit Patel</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;