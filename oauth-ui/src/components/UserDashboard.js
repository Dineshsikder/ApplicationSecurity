import React, { useState, useEffect } from 'react';
import { userService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, getAccessToken, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    // Only load data if we have a user
    if (userData === null) {
      loadUserData();
    }
  }, []); // Only run once on mount

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          // Decode JWT token to get information
          const payload = JSON.parse(atob(token.split('.')[1]));
          setTokenInfo({
            ...payload,
            rawToken: token
          });
        }
      } catch (err) {
        setError('Failed to fetch token information');
        console.error('Error fetching token info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenInfo();
  }, [getAccessToken]);

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getTimeRemaining = (exp) => { 
    if (!exp) return 'N/A';
    const now = Math.floor(Date.now() / 1000);
    const remaining = exp - now;
    if (remaining <= 0) return 'Expired';
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}m ${seconds}s`;
  };

  const userStats = [
    {
      title: 'Authentication Status',
      value: 'Authenticated',
      status: 'success',
      icon: '✅'
    },
    {
      title: 'Token Status',
      value: tokenInfo?.exp ? (tokenInfo.exp * 1000 > Date.now() ? 'Valid' : 'Expired') : 'Unknown',
      status: tokenInfo?.exp ? (tokenInfo.exp * 1000 > Date.now() ? 'success' : 'error') : 'warning',
      icon: '🎫'
    },
    {
      title: 'User Role',
      value: user?.role || userData?.profile?.role || 'USER',
      status: 'info',
      icon: '👤'
    },
    {
      title: 'Login Time',
      value: formatDate(tokenInfo?.iat),
      status: 'info',
      icon: '🕐'
    }
  ];

  const quickActions = [
    {
      title: 'View Profile',
      description: 'Check your user information and settings',
      icon: '👤',
      action: () => window.location.href = '/profile'
    },
    {
      title: 'Security Settings',
      description: 'Manage your account security preferences',
      icon: '🔒',
      action: () => alert('Security settings feature coming soon!')
    },
    {
      title: 'Activity Log',
      description: 'View your recent account activity',
      icon: '📊',
      action: () => setActiveTab('activity')
    },
    {
      title: 'Help & Support',
      description: 'Get help with your account',
      icon: '❓',
      action: () => window.location.href = '/faq'
    }
  ];

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' },
    { id: 'activity', label: 'Activity', icon: '📈' },
    { id: 'oauth', label: 'OAuth Info', icon: '🔑' }
  ];

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">User Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Here's an overview of your account and authentication status.
        </p>
      </div>

      <div className="page-content">
        {/* User Welcome Section */}
        <section className="section">
          <div className="content-section">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {user?.firstName?.charAt(0) || userData?.profile?.firstName?.charAt(0) || user?.profile?.sub?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Welcome, {user?.firstName || userData?.profile?.firstName || user?.profile?.sub || 'User'}!
                  </h2>
                  <p className="text-secondary">
                    You're successfully authenticated using OAuth2/OIDC
                  </p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                🚪 Logout
              </button>
            </div>
          </div>
        </section>

        {/* User Stats */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Account Overview</h2>
            <p className="section-subtitle">
              Current status of your authentication and account information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
              <div key={index} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon">{stat.icon}</div>
                  <span className={`status-badge status-${stat.status}`}>
                    {stat.value}
                  </span>
                </div>
                <h3 className="dashboard-card-title">{stat.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="section">
          <div className="content-section">
            <div className="flex border-b border-border-primary overflow-x-auto">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="section">
          {activeTab === 'overview' && (
            <>
              {/* Token Information */}
              {tokenInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-4">Token Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary">Issuer:</span>
                        <span className="font-mono text-sm">{tokenInfo.iss || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Subject:</span>
                        <span className="font-mono text-sm">{tokenInfo.sub || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Audience:</span>
                        <span className="font-mono text-sm">{Array.isArray(tokenInfo.aud) ? tokenInfo.aud.join(', ') : tokenInfo.aud || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Issued At:</span>
                        <span className="font-mono text-sm">{formatDate(tokenInfo.iat)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Expires At:</span>
                        <span className="font-mono text-sm">{formatDate(tokenInfo.exp)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Time Remaining:</span>
                        <span className="font-mono text-sm">{getTimeRemaining(tokenInfo.exp)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-4">Token Claims</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary">Username:</span>
                        <span className="font-mono text-sm">{tokenInfo.username || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Roles:</span>
                        <span className="font-mono text-sm">{Array.isArray(tokenInfo.roles) ? tokenInfo.roles.join(', ') : tokenInfo.roles || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Authorities:</span>
                        <span className="font-mono text-sm">{Array.isArray(tokenInfo.authorities) ? tokenInfo.authorities.join(', ') : tokenInfo.authorities || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Token Type:</span>
                        <span className="font-mono text-sm">{tokenInfo.token_type || 'Bearer'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dashboard Data */}
              {userData?.dashboard && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                    <div className="space-y-2">
                      {userData.dashboard.recentActivity?.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span className="text-secondary">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
                    <div className="space-y-2">
                      {userData.dashboard.stats?.map((stat, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-secondary">{stat.label}:</span>
                          <span className="font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-3">System Status</h3>
                    <div className="space-y-2">
                      {userData.dashboard.systemStatus?.map((status, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${status.status === 'online' ? 'bg-success' : 'bg-error'}`}></span>
                          <span className="text-secondary">{status.service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="section-header">
                <h2 className="section-title">Quick Actions</h2>
                <p className="section-subtitle">
                  Common tasks and account management options
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <div key={index} className="feature-card cursor-pointer" onClick={action.action}>
                    <div className="feature-icon">{action.icon}</div>
                    <h3 className="feature-title">{action.title}</h3>
                    <p className="feature-description">{action.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'profile' && userData?.profile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">First Name:</span>
                    <span className="font-medium">{userData.profile.firstName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Last Name:</span>
                    <span className="font-medium">{userData.profile.lastName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Email:</span>
                    <span className="font-medium">{userData.profile.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Username:</span>
                    <span className="font-medium">{userData.profile.username || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Role:</span>
                    <span className="font-medium">{userData.profile.role || 'USER'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Account Created:</span>
                    <span className="font-medium">{formatDate(userData.profile.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Account Status:</span>
                    <span className="font-medium">{userData.profile.status || 'Active'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Last Login:</span>
                    <span className="font-medium">{formatDate(userData.profile.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Login Count:</span>
                    <span className="font-medium">{userData.profile.loginCount || 0}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Email Verified:</span>
                    <span className="font-medium">{userData.profile.emailVerified ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Two-Factor Auth:</span>
                    <span className="font-medium">{userData.profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && userData?.permissions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">User Roles</h3>
                <div className="space-y-3">
                  {userData.permissions.roles?.map((role, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border-secondary">
                      <span className="text-secondary">{role.name}:</span>
                      <span className="font-medium">{role.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Permissions</h3>
                <div className="space-y-3">
                  {userData.permissions.permissions?.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border-secondary">
                      <span className="text-secondary">{permission.name}:</span>
                      <span className="font-medium">{permission.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Access Control Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-2">Resource</th>
                        <th className="text-left py-2">Read</th>
                        <th className="text-left py-2">Write</th>
                        <th className="text-left py-2">Delete</th>
                        <th className="text-left py-2">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.permissions.accessMatrix?.map((access, index) => (
                        <tr key={index} className="border-b border-border-secondary">
                          <td className="py-2 font-medium">{access.resource}</td>
                          <td className="py-2">{access.read ? '✅' : '❌'}</td>
                          <td className="py-2">{access.write ? '✅' : '❌'}</td>
                          <td className="py-2">{access.delete ? '✅' : '❌'}</td>
                          <td className="py-2">{access.admin ? '✅' : '❌'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && userData?.activity && (
            <div className="space-y-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {userData.activity.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border-primary rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${activity.type === 'login' ? 'bg-success' : activity.type === 'logout' ? 'bg-warning' : 'bg-info'}`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-secondary">{activity.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatDate(activity.timestamp)}</div>
                        <div className="text-xs text-secondary">{activity.ip}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="content-section">
                  <h3 className="text-lg font-semibold mb-4">Login History</h3>
                  <div className="space-y-2">
                    {userData.activity.loginHistory?.slice(0, 10).map((login, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-border-secondary">
                        <span className="text-secondary">{formatDate(login.timestamp)}</span>
                        <span className="font-medium">{login.ip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-section">
                  <h3 className="text-lg font-semibold mb-4">Failed Login Attempts</h3>
                  <div className="space-y-2">
                    {userData.activity.failedLogins?.slice(0, 10).map((attempt, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-border-secondary">
                        <span className="text-secondary">{formatDate(attempt.timestamp)}</span>
                        <span className="font-medium text-error">{attempt.ip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'oauth' && userData?.oauthInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">OAuth2 Configuration</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Client ID:</span>
                    <span className="font-mono text-sm">{userData.oauthInfo.clientId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Redirect URI:</span>
                    <span className="font-mono text-sm">{userData.oauthInfo.redirectUri || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Scopes:</span>
                    <span className="font-mono text-sm">
                      {Array.isArray(userData.oauthInfo.scopes) 
                        ? userData.oauthInfo.scopes.join(', ') 
                        : typeof userData.oauthInfo.scopes === 'string' 
                          ? userData.oauthInfo.scopes 
                          : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Grant Type:</span>
                    <span className="font-medium">{userData.oauthInfo.grantType || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Token Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Token Type:</span>
                    <span className="font-medium">{userData.oauthInfo.tokenType || 'Bearer'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Access Token Expiry:</span>
                    <span className="font-medium">{userData.oauthInfo.accessTokenExpiry || '15 minutes'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">Refresh Token Expiry:</span>
                    <span className="font-medium">{userData.oauthInfo.refreshTokenExpiry || '1 day'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-secondary">
                    <span className="text-secondary">PKCE Enabled:</span>
                    <span className="font-medium">{userData.oauthInfo.pkceEnabled ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="content-section md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">OAuth2 Endpoints</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.oauthInfo.endpoints?.map((endpoint, index) => (
                    <div key={index} className="p-3 border border-border-primary rounded-lg">
                      <div className="font-medium text-primary">{endpoint.name}</div>
                      <div className="font-mono text-sm text-secondary">{endpoint.url}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Security Tips */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Tips</h2>
            <p className="section-subtitle">
              Best practices to keep your account secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">🔒 Token Security</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Never share your access tokens</li>
                <li>• Logout when using shared devices</li>
                <li>• Monitor your account activity</li>
                <li>• Report suspicious activity immediately</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">🛡️ Best Practices</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Use strong, unique passwords</li>
                <li>• Enable two-factor authentication</li>
                <li>• Keep your browser updated</li>
                <li>• Be cautious of phishing attempts</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">📱 Device Management</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Review active sessions regularly</li>
                <li>• Logout from unused devices</li>
                <li>• Use secure networks only</li>
                <li>• Keep devices updated</li>
              </ul>
            </div>
          </div>
        </section>

        {error && (
          <section className="section">
            <div className="content-section border-l-4 border-error bg-error-50 p-4">
              <h3 className="text-lg font-semibold text-error mb-2">Error</h3>
              <p className="text-error">{error}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 