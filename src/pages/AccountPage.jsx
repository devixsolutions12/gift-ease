import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // If user is not logged in, redirect to login page
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    userLogout();
    navigate('/');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In a real implementation, you would call an API to change the password
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      return;
    }
    
    // Simulate password change
    showNotification('Password changed successfully', 'success');
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    // In a real implementation, you would call an API to update profile
    showNotification('Profile updated successfully', 'success');
    setShowEditProfile(false);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  // Icon components
  const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const HistoryIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SupportIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="account-page">
      <div className="container">
        <div className="page-header">
          <h1>Account</h1>
        </div>
        
        {notification.show && (
          <div className={`toast toast-${notification.type} animate-zoomIn`}>
            {notification.message}
          </div>
        )}
        
        <div className="account-content">
          {/* Profile Section */}
          <div className="profile-section card">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button 
                className="edit-button"
                onClick={() => setShowEditProfile(true)}
                aria-label="Edit profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.44772 4 3 4.44772 3 5V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V11M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="profile-details">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 21C3 18.7909 5.27361 17 8.08333 17H15.9167C18.7264 17 21 18.7909 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <button className="edit-avatar-button" aria-label="Edit avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V11M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px', verticalAlign: 'middle'}}>
                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Member since:
                  </span>
                  <span className="info-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Account Actions */}
          <div className="account-actions">
            <div className="card account-settings-card">
              <h2>Account Settings</h2>
              <div className="actions-list">
                <button 
                  className="action-button"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  <LockIcon />
                  <span>Change Password</span>
                </button>
                
                <button 
                  className="action-button"
                  onClick={() => navigate('/orders')}
                >
                  <HistoryIcon />
                  <span>View Order History</span>
                </button>
                
                <button 
                  className="action-button"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
                
                <button 
                  className="action-button"
                  onClick={() => navigate('/help')}
                >
                  <SupportIcon />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
            
            {/* Change Password Form */}
            {showChangePassword && (
              <div className="card">
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword} className="change-password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                    <small>Password must be at least 6 characters</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Update Password</button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setShowChangePassword(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Edit Profile Form */}
            {showEditProfile && (
              <div className="card">
                <h2>Edit Profile</h2>
                <form onSubmit={handleEditProfile} className="edit-profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Save Changes</button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setShowEditProfile(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" role="dialog" aria-labelledby="logout-modal-title">
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="logout-modal-title">Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout from your account?</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;