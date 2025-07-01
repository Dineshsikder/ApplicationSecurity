import React, { useState, useEffect } from 'react';
import { adminService } from '../services/apiService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminDashboard();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🔧 Admin Dashboard</h1>
        <p>System administration and monitoring</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          🏗️ Architecture
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'oauth' ? 'active' : ''}`}
          onClick={() => setActiveTab('oauth')}
        >
          🔐 OAuth Config
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>System Health</h3>
                <div className="metric-value">
                  <span className="status-indicator healthy">●</span>
                  {dashboardData?.systemHealth?.status || 'UNKNOWN'}
                </div>
                <p>Uptime: {dashboardData?.systemHealth?.uptime || 'N/A'}</p>
              </div>
              
              <div className="metric-card">
                <h3>Security Score</h3>
                <div className="metric-value">
                  {dashboardData?.securityStatus?.securityScore || 0}%
                </div>
                <p>Status: {dashboardData?.securityStatus?.overallStatus || 'UNKNOWN'}</p>
              </div>
              
              <div className="metric-card">
                <h3>Active Services</h3>
                <div className="metric-value">
                  {dashboardData?.architecture?.microservices?.length || 0}
                </div>
                <p>All services operational</p>
              </div>
              
              <div className="metric-card">
                <h3>Security Events</h3>
                <div className="metric-value">
                  {dashboardData?.securityStatus?.activeThreats || 0}
                </div>
                <p>Active threats detected</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="architecture-section">
            <h2>System Architecture</h2>
            <div className="architecture-grid">
              <div className="arch-section">
                <h3>Microservices</h3>
                <div className="service-list">
                  {dashboardData?.architecture?.microservices?.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-header">
                        <span className="service-name">{service.name}</span>
                        <span className={`service-status ${service.status.toLowerCase()}`}>
                          {service.status}
                        </span>
                      </div>
                      <p className="service-description">{service.description}</p>
                      <span className="service-port">Port: {service.port}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="arch-section">
                <h3>Databases</h3>
                <div className="database-list">
                  {dashboardData?.architecture?.databases?.map((db, index) => (
                    <div key={index} className="database-item">
                      <div className="database-header">
                        <span className="database-name">{db.name}</span>
                        <span className={`database-status ${db.status.toLowerCase()}`}>
                          {db.status}
                        </span>
                      </div>
                      <p className="database-purpose">{db.purpose}</p>
                      <span className="database-port">Port: {db.port}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Security Overview</h2>
            <div className="security-grid">
              <div className="security-card">
                <h3>Security Components</h3>
                <div className="component-list">
                  {dashboardData?.architecture?.securityComponents?.map((component, index) => (
                    <div key={index} className="component-item">
                      <span className="component-name">{component.name}</span>
                      <span className={`component-status ${component.status.toLowerCase()}`}>
                        {component.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="security-card">
                <h3>Recent Security Events</h3>
                <div className="event-list">
                  {dashboardData?.securityAudit?.recentEvents?.map((event, index) => (
                    <div key={index} className="event-item">
                      <div className="event-header">
                        <span className={`event-severity ${event.severity.toLowerCase()}`}>
                          {event.severity}
                        </span>
                        <span className="event-time">{event.timestamp}</span>
                      </div>
                      <p className="event-description">{event.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="user-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.totalUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.activeUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Admin Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.adminUsers || 0}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'oauth' && (
          <div className="oauth-section">
            <h2>OAuth2 Configuration</h2>
            <div className="oauth-grid">
              <div className="oauth-card">
                <h3>Grant Types</h3>
                <div className="grant-list">
                  {dashboardData?.oauthConfiguration?.grantTypes?.map((grant, index) => (
                    <span key={index} className="grant-type">{grant}</span>
                  ))}
                </div>
              </div>
              
              <div className="oauth-card">
                <h3>Token Lifetimes</h3>
                <div className="token-lifetimes">
                  {Object.entries(dashboardData?.oauthConfiguration?.tokenLifetime || {}).map(([type, lifetime]) => (
                    <div key={type} className="lifetime-item">
                      <span className="token-type">{type}</span>
                      <span className="token-lifetime">{lifetime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 