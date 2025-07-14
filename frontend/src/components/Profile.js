import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

function Profile() {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await authAPI.updatePassword(passwordData);
      setMessage('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update password');
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      
      <div className="profile-info">
        <div className="info-item">
          <strong>Name:</strong> {user?.name}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {user?.email}
        </div>
        <div className="info-item">
          <strong>Address:</strong> {user?.address}
        </div>
        <div className="info-item">
          <strong>Aadhar Card Number:</strong> {user?.aadharCardNumber}
        </div>
        <div className="info-item">
          <strong>Mobile:</strong> {user?.mobile}
        </div>
        <div className="info-item">
          <strong>Age:</strong> {user?.age}
        </div>
        <div className="info-item">
          <strong>Role:</strong> {user?.role}
        </div>
        <div className="info-item">
          <strong>Voting Status:</strong> {user?.isVoted ? 'Voted' : 'Not Voted'}
        </div>
      </div>

      <div className="profile-actions">
        <button 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="change-password-btn"
        >
          {showPasswordForm ? 'Cancel' : 'Change Password'}
        </button>
      </div>

      {showPasswordForm && (
        <div className="password-form">
          <h3>Change Password</h3>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Update Password</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
