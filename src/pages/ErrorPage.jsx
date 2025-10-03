import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been removed.</p>
          <p>GiftEase no longer requires account registration or login. You can purchase gift cards directly.</p>
          
          <div className="error-actions">
            <button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Go to Homepage
            </button>
            <button 
              onClick={() => navigate('/help')}
              className="btn-secondary"
            >
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;