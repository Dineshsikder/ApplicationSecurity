import React, { useState, useEffect } from 'react';
import { userService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Only load data if we have a user
    if (userData === null) {
      loadUserData();
    }
  }, []); // Only run once on mount

  const loadUserData = async () => {
    try {
      setLoading(true);
      console.log('UserDashboard: Starting to load user data...');
      
      const [profile, dashboard, overview, permissions, activity, oauthInfo] = await Promise.all([
        userService.getUserProfile(),
        userService.getUserDashboard(),
        userService.getUserOverview(),
        userService.getUserPermissions(),
        userService.getUserActivity(),
        userService.getOAuthInfo()
      ]);
      
      console.log('UserDashboard: API responses received:');
      console.log('Profile:', profile);
      console.log('Dashboard:', dashboard);
      console.log('Overview:', overview);
      console.log('Permissions:', permissions);
      console.log('Activity:', activity);
      console.log('OAuth Info:', oauthInfo);
      
      setUserData({
        profile: profile.data,
        dashboard: dashboard.data,
        overview: overview.data,
        permissions: permissions.data,
        activity: activity.data,
        oauthInfo: oauthInfo.data
      });
      
      console.log('UserDashboard: userData state set:', {
        profile: profile.data,
        dashboard: dashboard.data,
        overview: overview.data,
        permissions: permissions.data,
        activity: activity.data,
        oauthInfo: oauthInfo.data
      });
    } catch (err) {
      setError('Failed to load user data');
      console.error('User data error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Loading user dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-dashboard">
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={loadUserData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>👤 User Dashboard</h1>
        <p>Welcome back, {userData?.profile?.sub || 'User'}!</p>
        <button 
          onClick={async () => {
            console.log('Testing API calls...');
            try {
              const profile = await userService.getUserProfile();
              console.log('Profile API response:', profile);
              console.log('Profile data:', profile.data);
            } catch (error) {
              console.error('Profile API error:', error);
            }
          }}
          style={{ marginTop: '10px', padding: '5px 10px' }}
        >
          Test API
        </button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          🔑 Permissions
        </button>
        <button 
          className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          📈 Activity
        </button>
        <button 
          className={`tab-button ${activeTab === 'oauth' ? 'active' : ''}`}
          onClick={() => setActiveTab('oauth')}
        >
          🔐 OAuth Info
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            {console.log('UserDashboard: Rendering profile tab with userData:', userData)}
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {userData?.profile?.firstName?.charAt(0) || userData?.profile?.username?.charAt(0) || 'U'}
                </div>
                <div className="profile-info">
                  <h2>{userData?.profile?.firstName || ''} {userData?.profile?.lastName || ''}</h2>
                  <p className="profile-role">{userData?.profile?.role || 'User'}</p>
                  <p className="profile-email">{userData?.profile?.email || 'No email'}</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">{userData?.profile?.username || 'Unknown'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-${(userData?.profile?.status || 'unknown')}`}>
                    {userData?.profile?.status || 'Unknown'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Member Since:</span>
                  <span className="detail-value">
                    {userData?.profile?.createdAt ? new Date(userData.profile.createdAt).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">
                    {userData?.profile?.lastLogin ? new Date(userData.profile.lastLogin).toLocaleString() : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Account Summary</h3>
                <div className="summary-stats">
                  <div className="stat-item">
                    <span className="stat-label">Account Status</span>
                    <span className="stat-value active">Active</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Login Count</span>
                    <span className="stat-value">{userData?.overview?.loginCount || 0}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Session Duration</span>
                    <span className="stat-value">{userData?.overview?.sessionDuration || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="overview-card">
                <h3>Recent Activity</h3>
                <div className="activity-summary">
                  <p>Last login: {userData?.profile?.lastLogin ? new Date(userData.profile.lastLogin).toLocaleString() : 'Unknown'}</p>
                  <p>Account created: {userData?.profile?.createdAt ? new Date(userData.profile.createdAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="permissions-section">
            <h2>Your Permissions</h2>
            <div className="permissions-grid">
              {userData?.permissions?.permissions?.length > 0 ? (
                userData.permissions.permissions.map((permission, index) => (
                  <div key={index} className="permission-card">
                    <div className="permission-icon">🔑</div>
                    <h3>{permission.name || 'Unknown Permission'}</h3>
                    <p>{permission.description || 'No description available'}</p>
                    <span className={`permission-status ${(permission.status || 'unknown')}`}>
                      {permission.status || 'Unknown'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <p>No permissions data available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-timeline">
              {userData?.activity?.recentActivity?.length > 0 ? (
                userData.activity.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-time">
                      {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'Unknown'}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.action || 'Unknown Action'}</h4>
                      <p>{activity.description || 'No description available'}</p>
                    </div>
                    <div className={`activity-status ${(activity.status || 'unknown')}`}>
                      {activity.status || 'Unknown'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <p>No activity data available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'oauth' && (
          <div className="oauth-section">
            <h2>OAuth2 Information</h2>
            <div className="oauth-info-grid">
              <div className="oauth-info-card">
                <h3>Token Information</h3>
                <div className="token-info">
                  <div className="info-item">
                    <span className="info-label">Token Type:</span>
                    <span className="info-value">JWT</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Issuer:</span>
                    <span className="info-value">OAuth2 Demo Auth Server</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Scopes:</span>
                    <span className="info-value">read, write</span>
                  </div>
                </div>
              </div>
              
              <div className="oauth-info-card">
                <h3>Session Information</h3>
                <div className="session-info">
                  <div className="info-item">
                    <span className="info-label">Session ID:</span>
                    <span className="info-value">{userData?.oauthInfo?.sessionId || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Client ID:</span>
                    <span className="info-value">{userData?.oauthInfo?.clientId || 'web-client'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Grant Type:</span>
                    <span className="info-value">Authorization Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 