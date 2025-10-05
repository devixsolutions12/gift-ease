import React from 'react';

const MinimalApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: '800'
      }}>
        GiftEase
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Minimal React App - If you can see this, React is working!
      </p>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '25px',
        borderRadius: '15px',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#f1f5f9' }}>Success Indicators</h2>
        <ul style={{ textAlign: 'left', color: '#cbd5e1' }}>
          <li style={{ marginBottom: '10px' }}>✅ React is rendering correctly</li>
          <li style={{ marginBottom: '10px' }}>✅ CSS styles are applied</li>
          <li style={{ marginBottom: '10px' }}>✅ Component is mounted</li>
          <li style={{ marginBottom: '10px' }}>✅ Fonts are loading</li>
          <li>✅ Gradient backgrounds are visible</li>
        </ul>
      </div>
    </div>
  );
};

export default MinimalApp;