import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MobileNavigation.css';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: 'HomeAsIcon', path: '/' },
    { id: 'orders', label: 'Orders', icon: 'OrdersAsIcon', path: '/orders' },
    { id: 'account', label: user ? 'Account' : 'Login', icon: user ? 'AccountAsIcon' : 'LoginAsIcon', path: user ? '/account' : '/login' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Icon components
  const HomeAsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const OrdersAsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H10C10.5523 4 11 4.44772 11 5V7C11 7.55228 10.5523 8 10 8H4C3.44772 8 3 7.55228 3 7V5C3 4.44772 3.44772 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 16H10C10.5523 16 11 16.4477 11 17V19C11 19.5523 10.5523 20 10 20H4C3.44772 20 3 19.5523 3 19V17C3 16.4477 3.44772 16 4 16Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 7H20C20.5523 7 21 7.44772 21 8V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V8C13 7.44772 13.4477 7 14 7Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 17H20C20.5523 17 21 17.4477 21 18V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V18C13 17.4477 13.4477 17 14 17Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const AccountAsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 21C3 18.7909 5.27361 17 8.08333 17H15.9167C18.7264 17 21 18.7909 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const LoginAsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8V6C14 4.89543 13.1046 4 12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H12C13.1046 20 14 19.1046 14 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'HomeAsIcon':
        return <HomeAsIcon />;
      case 'OrdersAsIcon':
        return <OrdersAsIcon />;
      case 'AccountAsIcon':
        return <AccountAsIcon />;
      case 'LoginAsIcon':
        return <LoginAsIcon />;
      default:
        return <span>{iconName}</span>;
    }
  };

  return (
    <nav className="mobile-navigation" role="navigation" aria-label="Mobile navigation">
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">
              {renderIcon(item.icon)}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;