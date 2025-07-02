import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user, login } = useAuth();

  const handleOAuth2Login = async () => {
    try {
      await login();
    } catch (error) {
      console.error('OAuth2 login error:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">OAuth2/OIDC Security Demo</h1>
          <p className="hero-subtitle">
            A comprehensive demonstration of modern application security with Spring Boot, 
            React, and industry best practices
          </p>
          <div className="hero-buttons">
            {!isAuthenticated() ? (
              <button onClick={handleOAuth2Login} className="btn btn-primary">
                🔐 Login with OAuth2
              </button>
            ) : (
              <Link to="/profile" className="btn btn-primary">
                View Profile
              </Link>
            )}
            <Link to="/how-it-works" className="btn btn-secondary">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Message for Authenticated Users */}
      {isAuthenticated() && (
        <div className="welcome-message">
          <h2>Welcome back, {user?.profile?.sub || user?.profile?.preferred_username || 'User'}!</h2>
          <p>You're successfully authenticated using OAuth2. Explore the secure features below.</p>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="text-center mb-4">Security Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3 className="feature-title">PKCE Flow</h3>
              <p className="feature-description">
                Proof Key for Code Exchange (PKCE) ensures secure authorization code flow 
                for public clients, preventing authorization code interception attacks.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3 className="feature-title">JWT Tokens</h3>
              <p className="feature-description">
                JSON Web Tokens (JWT) provide secure, stateless authentication with 
                built-in expiration and signature verification.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Token Refresh</h3>
              <p className="feature-description">
                Automatic token renewal using refresh tokens ensures seamless user 
                experience without requiring re-authentication.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚫</div>
              <h3 className="feature-title">Token Blacklisting</h3>
              <p className="feature-description">
                Redis-based token blacklisting provides immediate token revocation 
                for enhanced security and compliance.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-description">
                Fine-grained access control based on user roles and permissions, 
                ensuring users can only access authorized resources.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">API Gateway</h3>
              <p className="feature-description">
                Centralized API gateway with JWT validation, rate limiting, and 
                circuit breakers for robust microservices architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="info-section">
        <div className="container">
          <h2 className="text-center mb-4">Technology Stack</h2>
          <div className="info-content">
            <div className="info-item">
              <h3>Backend</h3>
              <p>Spring Boot 3.2, Spring Security, Spring Cloud Gateway, Redis, H2 Database</p>
            </div>
            <div className="info-item">
              <h3>Frontend</h3>
              <p>React 18, React Router, OIDC Client, Modern CSS with Flexbox and Grid</p>
            </div>
            <div className="info-item">
              <h3>Security</h3>
              <p>OAuth2, OpenID Connect, JWT, PKCE, Token Blacklisting, CORS</p>
            </div>
            <div className="info-item">
              <h3>Architecture</h3>
              <p>Microservices, API Gateway, Circuit Breakers, Rate Limiting, Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      {isAuthenticated() && (
        <section className="quick-actions">
          <div className="container">
            <h2 className="text-center mb-4">Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/profile" className="action-card">
                <div className="action-icon">👤</div>
                <h3>View Profile</h3>
                <p>Check your user information and token details</p>
              </Link>
              <Link to="/admin" className="action-card">
                <div className="action-icon">⚙️</div>
                <h3>Admin Panel</h3>
                <p>Access admin-only features and system management</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Security Best Practices Section */}
      <section className="security-practices">
        <div className="container">
          <h2 className="text-center mb-4">Security Best Practices Demonstrated</h2>
          <div className="practices-grid">
            <div className="practice-item">
              <h4>🔒 Secure Token Storage</h4>
              <p>Tokens are stored securely in memory with automatic cleanup</p>
            </div>
            <div className="practice-item">
              <h4>🛡️ HTTPS Only</h4>
              <p>All communications use HTTPS with proper certificate validation</p>
            </div>
            <div className="practice-item">
              <h4>⏰ Token Expiration</h4>
              <p>Short-lived access tokens with automatic refresh mechanisms</p>
            </div>
            <div className="practice-item">
              <h4>🚫 CSRF Protection</h4>
              <p>Cross-Site Request Forgery protection on all state-changing operations</p>
            </div>
            <div className="practice-item">
              <h4>🌍 CORS Configuration</h4>
              <p>Properly configured Cross-Origin Resource Sharing policies</p>
            </div>
            <div className="practice-item">
              <h4>📊 Security Headers</h4>
              <p>Security headers including CSP, HSTS, and X-Frame-Options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 