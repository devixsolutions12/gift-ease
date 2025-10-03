import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgmiImage from '../assets/bgmi.png';
import '../App.css';

// Test images
const playStoreImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%234285F4'/%3E%3Crect x='40' y='40' width='120' height='80' rx='10' fill='white'/%3E%3Ccircle cx='70' cy='80' r='15' fill='%2334A853'/%3E%3Ccircle cx='110' cy='80' r='15' fill='%23FBBC05'/%3E%3Ccircle cx='150' cy='80' r='15' fill='%23EA4335'/%3E%3Crect x='60' y='130' width='80' height='15' rx='7' fill='%23ccc'/%3E%3Ctext x='100' y='165' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EGoogle Play%3C/text%3E%3C/svg%3E";
const freeFireImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='20' fill='%23FF6B35'/%3E%3Cpath d='M100 50 L130 100 L100 150 L70 100 Z' fill='white'/%3E%3Ccircle cx='100' cy='100' r='25' fill='%23FF6B35'/%3E%3Crect x='60' y='160' width='80' height='15' rx='7' fill='%23fff'/%3E%3Ctext x='100' y='190' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white'%3EFree Fire%3C/text%3E%3C/svg%3E";

const ImageTestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Image Test Page</h1>
      <p>This page tests if the SVG images are rendering correctly.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <div>
          <h2>Google Play Image</h2>
          <div className="product-image-container-enhanced">
            <img 
              src={playStoreImage} 
              alt="Google Play Redeem Code Card" 
              className="product-image-enhanced"
            />
          </div>
        </div>
        
        <div>
          <h2>Free Fire Image</h2>
          <div className="product-image-container-enhanced">
            <img 
              src={freeFireImage} 
              alt="Free Fire Diamonds Loot Chest" 
              className="product-image-enhanced"
            />
          </div>
        </div>
        
        <div>
          <h2>BGMI UC Image</h2>
          <div className="product-image-container-enhanced">
            <img 
              src={bgmiImage} 
              alt="BGMI UC Currency Voucher" 
              className="product-image-enhanced"
            />
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Direct Image Test (without CSS)</h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src={playStoreImage} alt="Google Play" style={{ width: '100px', height: '100px' }} />
          <img src={freeFireImage} alt="Free Fire" style={{ width: '100px', height: '100px' }} />
          <img src={bgmiImage} alt="BGMI UC" style={{ width: '100px', height: '100px' }} />
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#818cf8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ImageTestPage;