import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/apiService';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOAuth2Login = async () => {
    try {
      setLoading(true);
      setError('');
      // Initiate OAuth2 Authorization Code flow with PKCE
      await login();
    } catch (error) {
      console.error('OAuth2 login error:', error);
      setError('OAuth2 login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.error) {
        setError(response.error);
      } else {
        setSuccess('Registration successful! Please login with OAuth2.');
        setIsLogin(true);
        setFormData({
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: ''
        });
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? '🔑 OAuth2 Login' : '📝 Register'}</h2>
          <p>
            {isLogin 
              ? 'Secure login using OAuth2 Authorization Code flow with PKCE' 
              : 'Create a new account to get started with OAuth2 authentication.'
            }
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        {success && (
          <div className="auth-success">
            <span>✅ {success}</span>
          </div>
        )}

        {isLogin ? (
          // OAuth2 Login Section
          <div className="oauth2-login-section">
            <div className="oauth2-info">
              <h3>🔐 Secure OAuth2 Authentication</h3>
              <ul>
                <li>✅ Authorization Code flow with PKCE</li>
                <li>✅ Secure token management</li>
                <li>✅ Automatic token refresh</li>
                <li>✅ Role-based access control</li>
              </ul>
            </div>
            
            <button 
              onClick={handleOAuth2Login}
              className="oauth2-login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                <>
                  <span className="oauth2-icon">🔐</span>
                  Login with OAuth2
                </>
              )}
            </button>

            <div className="oauth2-demo-credentials">
              <h4>Demo Credentials:</h4>
              <div className="credential-item">
                <strong>User:</strong> username: <code>user</code>, password: <code>password</code>
              </div>
              <div className="credential-item">
                <strong>Admin:</strong> username: <code>admin</code>, password: <code>admin</code>
              </div>
            </div>
          </div>
        ) : (
          // Registration Section
          <form onSubmit={handleRegistration} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="First name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Last name"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                'Register'
              )}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={toggleMode}
              className="auth-toggle-button"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        <div className="oauth2-security-info">
          <h4>🔒 Security Features</h4>
          <ul>
            <li>PKCE (Proof Key for Code Exchange) prevents authorization code interception</li>
            <li>Short-lived access tokens with automatic refresh</li>
            <li>Secure token storage in session storage</li>
            <li>Token blacklisting for immediate revocation</li>
            <li>Role-based access control (USER/ADMIN)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth; 