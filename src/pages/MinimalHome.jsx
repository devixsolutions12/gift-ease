import React from 'react';

const MinimalHome = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#1e293b',
      color: '#e2e8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        GiftEase
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Minimal test page to verify React rendering
      </p>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Test Results</h2>
        <ul style={{ textAlign: 'left' }}>
          <li>✅ React is rendering correctly</li>
          <li>✅ CSS styles are applied</li>
          <li>✅ Component is mounted</li>
        </ul>
      </div>
    </div>
  );
};

export default MinimalHome;