import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user, login } = useAuth();

  const handleOAuth2Login = async () => {
    try {
      await login();
    } catch (error) {
      console.error('OAuth2 login error:', error);
    }
  };

  const features = [
    {
      icon: '🔐',
      title: 'PKCE Flow',
      description: 'Proof Key for Code Exchange (PKCE) ensures secure authorization code flow for public clients, preventing authorization code interception attacks.'
    },
    {
      icon: '🎫',
      title: 'JWT Tokens',
      description: 'JSON Web Tokens (JWT) provide secure, stateless authentication with built-in expiration and signature verification.'
    },
    {
      icon: '🔄',
      title: 'Token Refresh',
      description: 'Automatic token renewal using refresh tokens ensures seamless user experience without requiring re-authentication.'
    },
    {
      icon: '🚫',
      title: 'Token Blacklisting',
      description: 'Redis-based token blacklisting provides immediate token revocation for enhanced security and compliance.'
    },
    {
      icon: '👥',
      title: 'Role-Based Access',
      description: 'Fine-grained access control based on user roles and permissions, ensuring users can only access authorized resources.'
    },
    {
      icon: '🌐',
      title: 'API Gateway',
      description: 'Centralized API gateway with JWT validation, rate limiting, and circuit breakers for robust microservices architecture.'
    },
    {
      icon: '🛡️',
      title: 'API Proxy',
      description: 'Secure API proxy configuration prevents CORS issues and hides backend endpoints, adding an extra layer of security and abstraction.'
    }
  ];

  const techStack = [
    {
      category: 'Backend',
      description: 'Spring Boot 3.2, Spring Security, Spring Cloud Gateway, Redis, H2 Database'
    },
    {
      category: 'Frontend',
      description: 'React 18, React Router, OIDC Client, Modern CSS with Flexbox and Grid'
    },
    {
      category: 'Security',
      description: 'OAuth2, OpenID Connect, JWT, PKCE, Token Blacklisting, CORS'
    },
    {
      category: 'Architecture',
      description: 'Microservices, API Gateway, Circuit Breakers, Rate Limiting, Monitoring'
    }
  ];

  const securityPractices = [
    { title: '🔒 Secure Token Storage', description: 'Tokens are stored securely in memory with automatic cleanup' },
    { title: '🛡️ HTTPS Only', description: 'All communications use HTTPS with proper certificate validation' },
    { title: '⏰ Token Expiration', description: 'Short-lived access tokens with automatic refresh mechanisms' },
    { title: '🚫 CSRF Protection', description: 'Cross-Site Request Forgery protection on all state-changing operations' },
    { title: '🌍 CORS Configuration', description: 'Properly configured Cross-Origin Resource Sharing policies' },
    { title: '📊 Security Headers', description: 'Security headers including CSP, HSTS, and X-Frame-Options' }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">OAuth2/OIDC Security Demo</h1>
        <p className="hero-subtitle">
          A comprehensive demonstration of modern application security with Spring Boot, 
          React, and industry best practices
        </p>
        <div className="hero-actions">
          {!isAuthenticated() ? (
            <button onClick={handleOAuth2Login} className="btn btn-primary btn-lg">
              🔐 Login with OAuth2
            </button>
          ) : (
            <Link to="/profile" className="btn btn-primary btn-lg">
              View Profile
            </Link>
          )}
          <Link to="/how-it-works" className="btn btn-secondary btn-lg">
            Learn How It Works
          </Link>
        </div>
      </section>

      {/* Welcome Message for Authenticated Users */}
      {isAuthenticated() && (
        <section className="content-section">
          <div className="content-section-header">
            <h2 className="content-section-title">
              Welcome back, {user?.profile?.sub || user?.profile?.preferred_username || 'User'}!
            </h2>
            <p className="content-section-subtitle">
              You're successfully authenticated using OAuth2. Explore the secure features below.
            </p>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Security Features</h2>
          <p className="section-subtitle">
            Comprehensive security implementation following industry best practices
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Technology Stack</h2>
          <p className="section-subtitle">
            Modern technologies powering this secure application
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="content-section">
              <h3 className="text-lg font-semibold mb-3">{tech.category}</h3>
              <p className="text-secondary">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      {isAuthenticated() && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
            <p className="section-subtitle">
              Access your account features and administrative tools
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Link to="/profile" className="feature-card">
              <div className="feature-icon">👤</div>
              <h3 className="feature-title">View Profile</h3>
              <p className="feature-description">Check your user information and token details</p>
            </Link>
            <Link to="/admin" className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">Admin Panel</h3>
              <p className="feature-description">Access admin-only features and system management</p>
            </Link>
          </div>
        </section>
      )}

      {/* Security Best Practices Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Security Best Practices Demonstrated</h2>
          <p className="section-subtitle">
            Industry-standard security measures implemented throughout the application
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {securityPractices.map((practice, index) => (
            <div key={index} className="content-section">
              <h4 className="font-semibold mb-2">{practice.title}</h4>
              <p className="text-secondary text-sm">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 