import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../services/apiService';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [auditLogs, setAuditLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminService.getAdminDashboard();
      setAdminData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  const fetchSystemInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminService.getSystemInfo();
      setSystemInfo(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminService.getSecurityAudit();
      setAuditLogs(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const performMaintenance = async (action) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminService.performMaintenance(action);
      alert(`Maintenance action '${action}' completed: ${response.message}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-section">
        <h2>Welcome, Administrator!</h2>
        <p>This dashboard demonstrates admin-only functionality and role-based access control.</p>
        
        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>Admin Dashboard Data</h2>
        <button onClick={fetchAdminDashboard} className="btn btn-primary" disabled={loading}>
          Refresh Dashboard
        </button>

        {adminData && (
          <div className="api-response">
            <h3>Dashboard Response:</h3>
            <pre>{JSON.stringify(adminData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>System Information</h2>
        <button onClick={fetchSystemInfo} className="btn btn-secondary" disabled={loading}>
          Get System Info
        </button>

        {systemInfo && (
          <div className="api-response">
            <h3>System Information:</h3>
            <pre>{JSON.stringify(systemInfo, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>Audit Logs</h2>
        <button onClick={fetchAuditLogs} className="btn btn-secondary" disabled={loading}>
          Get Audit Logs
        </button>

        {auditLogs && (
          <div className="api-response">
            <h3>Audit Logs:</h3>
            <pre>{JSON.stringify(auditLogs, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>Maintenance Actions</h2>
        <div className="maintenance-actions">
          <button 
            onClick={() => performMaintenance('clear-cache')} 
            className="btn btn-warning" 
            disabled={loading}
          >
            Clear Cache
          </button>
          <button 
            onClick={() => performMaintenance('restart-services')} 
            className="btn btn-warning" 
            disabled={loading}
          >
            Restart Services
          </button>
          <button 
            onClick={() => performMaintenance('backup-database')} 
            className="btn btn-warning" 
            disabled={loading}
          >
            Backup Database
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h2>Security Features Demonstrated</h2>
        <div className="security-features">
          <div className="feature">
            <h4>🔐 Role-Based Access Control</h4>
            <p>This page is only accessible to users with ADMIN role.</p>
          </div>
          <div className="feature">
            <h4>🛡️ JWT Claims Validation</h4>
            <p>Server validates JWT claims to ensure user has required roles.</p>
          </div>
          <div className="feature">
            <h4>📊 Audit Logging</h4>
            <p>All admin actions are logged for security monitoring.</p>
          </div>
          <div className="feature">
            <h4>🚪 API Gateway Protection</h4>
            <p>API Gateway enforces role-based routing and access control.</p>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>User Information</h2>
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
            <label>Roles:</label>
            <span>{user.profile.roles || 'ADMIN'}</span>
          </div>
          <div className="detail-item">
            <label>Token Expires:</label>
            <span>{new Date(user.expires_at * 1000).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 