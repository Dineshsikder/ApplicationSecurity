import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/apiService';

const Profile = () => {
  const { user, getAccessToken, logout } = useAuth();
  const [tokenInfo, setTokenInfo] = useState({});
  const [tokenLoading, setTokenLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setTokenInfo({
            ...payload,
            rawToken: token
          });
          console.log('Token payload:', payload);
        }
      } catch (err) {
        setError('Failed to fetch token information');
        console.error('Error fetching token info:', err);
      } finally {
        setTokenLoading(false);
      }
    };

    const loadUserData = async () => {
      try {
        const [profile, permissions, activity, oauthInfo] = await Promise.all([
          userService.getUserProfile(),
          userService.getUserPermissions(),
          userService.getUserActivity(),
          userService.getOAuthInfo()
        ]);

        setUserData({
          profile: profile.data,
          permissions: permissions.data,
          activity: activity.data,
          oauthInfo: oauthInfo.data
        });

        setFormData({
          firstName: profile.data.firstName || '',
          lastName: profile.data.lastName || '',
          email: profile.data.email || '',
          username: profile.data.username || ''
        });
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading user data:', err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchTokenInfo();
    loadUserData();
  }, [getAccessToken, user]);

  const loading = tokenLoading || userLoading;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await userService.updateUserProfile(formData);
      setEditing(false);
      // Reload user data
      const profile = await userService.getUserProfile();
      setUserData(prev => ({ ...prev, profile: profile.data }));
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data to original values
    setFormData({
      firstName: userData?.profile?.firstName || '',
      lastName: userData?.profile?.lastName || '',
      email: userData?.profile?.email || '',
      username: userData?.profile?.username || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: '👤' },
    { id: 'token', label: 'Token Details', icon: '🎫' },
    { id: 'security', label: 'Security Settings', icon: '🔒' },
    { id: 'activity', label: 'Activity Log', icon: '📊' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' }
  ];

  const userProfile = {
    basic: [
      { label: 'Username', value: userData?.profile?.username || user?.profile?.sub || user?.firstName || 'N/A' },
      { label: 'Email', value: userData?.profile?.email || user?.profile?.email || 'N/A' },
      { label: 'First Name', value: userData?.profile?.firstName || user?.firstName || 'N/A' },
      { label: 'Last Name', value: userData?.profile?.lastName || user?.lastName || 'N/A' },
      { label: 'Role', value: userData?.profile?.role || user?.role || 'USER' },
      { label: 'Account Status', value: userData?.profile?.status || 'Active' }
    ],
    oauth: [
      { label: 'Provider', value: 'Custom OAuth2 Server' },
      { label: 'Authentication Method', value: 'OAuth2 + OIDC' },
      { label: 'Last Login', value: formatDate(tokenInfo?.iat) },
      { label: 'Session Duration', value: '15 minutes' },
      { label: 'Token Type', value: 'JWT' },
      { label: 'PKCE Enabled', value: 'Yes' }
    ]
  };

  const securitySettings = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: userData?.profile?.twoFactorEnabled ? 'Enabled' : 'Not enabled',
      action: userData?.profile?.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA',
      icon: '🔐'
    },
    {
      title: 'Session Management',
      description: 'View and manage your active sessions',
      status: '1 active session',
      action: 'Manage Sessions',
      icon: '🖥️'
    },
    {
      title: 'Password Change',
      description: 'Update your account password',
      status: 'Last changed: Never',
      action: 'Change Password',
      icon: '🔑'
    },
    {
      title: 'Login History',
      description: 'Review your recent login activity',
      status: 'Available',
      action: 'View History',
      icon: '📋'
    }
  ];

  const activityLog = userData?.activity?.recentActivity?.slice(0, 10) || [
    {
      action: 'Login',
      timestamp: formatDate(tokenInfo?.iat),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    },
    {
      action: 'Token Refresh',
      timestamp: formatDate(tokenInfo?.iat - 300),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    },
    {
      action: 'Profile View',
      timestamp: formatDate(tokenInfo?.iat - 600),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    }
  ];

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">User Profile</h1>
        <p className="page-subtitle">
          Manage your account information, security settings, and view your authentication details
        </p>
      </div>

      <div className="page-content">
        {/* Profile Header */}
        <section className="section">
          <div className="content-section">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                  {userData?.profile?.firstName?.charAt(0) || user?.firstName?.charAt(0) || user?.profile?.sub?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData?.profile?.firstName || user?.firstName || user?.profile?.sub || 'User'}
                  </h2>
                  <p className="text-secondary">
                    {userData?.profile?.role || user?.role || 'USER'} • Member since {formatDate(userData?.profile?.createdAt || tokenInfo?.iat)}
                  </p>
                </div>
          </div>
              <div className="flex gap-3">
                {editing ? (
                  <>
                    <button onClick={handleSave} className="btn btn-primary">
                      💾 Save Changes
                    </button>
                    <button onClick={handleCancel} className="btn btn-secondary">
                      ❌ Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleEdit} className="btn btn-primary">
                      ✏️ Edit Profile
                    </button>
                    <button onClick={handleLogout} className="btn btn-secondary">
                      🚪 Logout
                    </button>
                  </>
                )}
          </div>
          </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="section">
          <div className="content-section" style={{ border: 'none', background: 'transparent', boxShadow: 'none', marginBottom: 0 }}>
            <div className="profile-tab-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`profile-tab-button${activeTab === tab.id ? ' active' : ''}`}
                  type="button"
                  tabIndex={0}
                >
                  <span className="profile-tab-icon">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="section">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
        </div>
      </div>
                ) : (
                  <div className="space-y-3">
                    {userProfile.basic.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-border-secondary">
                        <span className="text-secondary">{item.label}:</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
        </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-4">OAuth2 Information</h3>
                <div className="space-y-3">
                  {userProfile.oauth.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border-secondary">
                      <span className="text-secondary">{item.label}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

          {activeTab === 'token' && (
            <div>
              {tokenLoading ? (
                <div className="text-secondary p-4">Loading token info...</div>
              ) : !tokenInfo || Object.keys(tokenInfo).length === 0 ? (
                <div className="text-secondary p-4">No token info available.</div>
              ) : (
                <div className="space-y-6">
                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-4">Token Claims</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary">Issuer (iss):</span>
                        <span className="font-medium">{tokenInfo?.iss || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Subject (sub):</span>
                        <span className="font-medium">{tokenInfo?.sub || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Audience (aud):</span>
                        <span className="font-medium">{Array.isArray(tokenInfo?.aud) ? tokenInfo?.aud.join(', ') : tokenInfo?.aud || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Issued At (iat):</span>
                        <span className="font-medium">{formatDate(tokenInfo?.iat)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Expires At (exp):</span>
                        <span className="font-medium">{formatDate(tokenInfo?.exp)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Username:</span>
                        <span className="font-medium">{tokenInfo?.username || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-section">
                    <h3 className="text-lg font-semibold mb-4">Token Permissions</h3>
                    <div className="space-y-3">
                      <div className='flex justify-between'>
                        <span className="text-secondary">Roles:</span>
                        <div className="mt-2">
                          {Array.isArray(tokenInfo.roles) ? (
                            tokenInfo.roles.map((role, index) => (
                              <span key={index} className="inline-block bg-primary-50 text-primary px-2 py-1 rounded-md text-sm mr-2 mb-2">
                                {role}
                              </span> 
                            ))
                          ) : (
                            <span className="text-secondary">No roles assigned</span>
                          )}
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <span className="text-secondary">Authorities:</span>
                        <div className="mt-2">
                          {Array.isArray(tokenInfo.authorities) ? (
                            tokenInfo.authorities.map((auth, index) => (
                              <span key={index} className="inline-block bg-secondary-50 text-secondary-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">
                                {auth}
                              </span>
                            ))
                          ) : (
                            <span className="text-secondary">No authorities assigned</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Raw Token (JWT)</h4>
                      <div className="token-raw-container scrollable">
                        <code className="text-xs break-all text-secondary-700" style={{ wordBreak: 'break-all' }}>
                          {tokenInfo.rawToken}
                        </code>
                      </div>
                      <div className="mt-2 text-xs text-secondary">
                        <button 
                          onClick={() => navigator.clipboard.writeText(tokenInfo.rawToken)}
                          className="text-primary hover:text-primary-dark underline"
                        >
                          📋 Copy Token
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securitySettings.map((setting, index) => (
                <div key={index} className="content-section">
                  <div className="flex items-start gap-4">
                    <div className="feature-icon">{setting.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{setting.title}</h3>
                      <p className="text-secondary text-sm mb-3">{setting.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary">{setting.status}</span>
                        <button className="btn btn-sm btn-primary">{setting.action}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'success' ? 'bg-success' : 'bg-error'
                      }`}></div>
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-secondary">{activity.device}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{activity.timestamp}</div>
                      <div className="text-xs text-secondary">{activity.ip}</div>
                    </div>
                  </div>
                ))}
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

export default Profile; 