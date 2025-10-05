import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import AdminLogin from './pages/AdminLogin';
import LocalAdminPanel from './pages/LocalAdminPanel';
import HelpPage from './pages/HelpPage';
import PackagesPage from './pages/PackagesPage';
import CheckoutPage from './pages/CheckoutPage';
import TestPage from './pages/TestPage';
import ImageTestPage from './pages/ImageTestPage';
import DebugImages from './pages/DebugImages';
import OrdersPage from './pages/OrdersPage';
import ErrorPage from './pages/ErrorPage';
import TestLocalOrders from './pages/TestLocalOrders';
import TrackOrderPage from './pages/TrackOrderPage';
import TestSyncPage from './pages/TestSyncPage';
import MobileNavigation from './components/MobileNavigation';
import SettingsSyncTest from './pages/SettingsSyncTest';
import AdminRouteTest from './pages/AdminRouteTest';
import AuthDebug from './pages/AuthDebug';
import RoutingTest from './pages/RoutingTest';
import './App.css';
import './EnhancedStyles.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, you would apply the dark mode styles here
  };

  // Dark Mode Icon Component
  const DarkModeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {darkMode ? (
        // Sun icon for light mode
        <>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </>
      ) : (
        // Moon icon for dark mode (we'll use a simpler moon icon)
        <>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
        </>
      )}
    </svg>
  );

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages/:productType" element={<PackagesPage />} />
            <Route path="/checkout/:productType" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <LocalAdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/admin/test" element={<AdminRouteTest />} />
            <Route path="/admin/debug" element={<AuthDebug />} />
            <Route path="/routing-test" element={<RoutingTest />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/image-test" element={<ImageTestPage />} />
            <Route path="/debug-images" element={<DebugImages />} />
            <Route path="/test-local-orders" element={<TestLocalOrders />} />
            <Route path="/test-sync" element={<TestSyncPage />} />
            <Route path="/settings-sync-test" element={<SettingsSyncTest />} />
            {/* Catch-all route for any other URLs to show error page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          
          {/* Mobile Navigation - only visible on mobile devices */}
          <MobileNavigation />
          
          {/* Dark Mode Toggle */}
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <DarkModeIcon />
          </button>
          
          {/* Floating Help Widget - positioned at bottom right */}
          <button 
            className="floating-help"
            onClick={() => window.location.hash = '/help'}
            aria-label="Get help and support"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Help</span>
          </button>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;