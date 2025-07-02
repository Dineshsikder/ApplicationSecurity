import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/apiService';
import './Profile.css';

const Profile = () => {
  const { user, testTokenProvider } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userService.getUserProfile();
      setProfileData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed since userService uses the token provider

  useEffect(() => {
    // Only fetch if user is authenticated
    if (user && user.access_token) {
      fetchProfile();
    }
  }, [user?.access_token]); // Only depend on access token changes

  const testTokenValidation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userService.getOAuthInfo();
      setProfileData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      
      <div className="profile-section">
        <h2>OIDC User Information</h2>
        <div className="user-details">
          <div className="detail-item">
            <label>Username:</label>
            <span>{user.profile.preferred_username}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span>{user.profile.email}</span>
          </div>
          <div className="detail-item">
            <label>Name:</label>
            <span>{user.profile.name}</span>
          </div>
          <div className="detail-item">
            <label>Token Expires:</label>
            <span>{new Date(user.expires_at * 1000).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <label>Scopes:</label>
            <span>{user.scope}</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>API Profile Data</h2>
        <div className="api-actions">
          <button onClick={fetchProfile} className="btn btn-primary" disabled={loading}>
            Refresh Profile
          </button>
          <button onClick={testTokenValidation} className="btn btn-secondary" disabled={loading}>
            Validate Token
          </button>
          <button onClick={testTokenProvider} className="btn btn-info" disabled={loading}>
            Test Token Provider
          </button>
        </div>

        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {profileData && (
          <div className="api-response">
            <h3>API Response:</h3>
            <pre>{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Token Information</h2>
        <div className="token-info">
          <div className="detail-item">
            <label>Token Type:</label>
            <span>Bearer</span>
          </div>
          <div className="detail-item">
            <label>Issued At:</label>
            <span>{new Date(user.issued_at * 1000).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <label>Expires At:</label>
            <span>{new Date(user.expires_at * 1000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Security Features</h2>
        <div className="security-features">
          <div className="feature">
            <h4>🔐 JWT Validation</h4>
            <p>Your access token is validated on every API request using the JWKS endpoint.</p>
          </div>
          <div className="feature">
            <h4>🔄 Automatic Renewal</h4>
            <p>Access tokens are automatically renewed using refresh tokens before expiration.</p>
          </div>
          <div className="feature">
            <h4>🛡️ Token Blacklisting</h4>
            <p>Revoked tokens are immediately invalidated using Redis-based blacklisting.</p>
          </div>
          <div className="feature">
            <h4>👥 Role-Based Access</h4>
            <p>API endpoints are protected based on your user roles and permissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 