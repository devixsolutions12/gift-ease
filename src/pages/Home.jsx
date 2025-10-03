import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Simple header */}
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

      {/* Simple hero section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title">Instant Digital Gifts</h1>
            <p className="hero-subtitle">Get your favorite game credits and redeem codes delivered instantly</p>
          </div>
        </div>
      </section>

      {/* Simple content */}
      <section className="container">
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          margin: '30px 0'
        }}>
          <h2>Welcome to GiftEase</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Your one-stop shop for digital gift cards and in-game currency
          </p>
          <button 
            onClick={() => navigate('/packages/play-store')}
            style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '1.1rem',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;