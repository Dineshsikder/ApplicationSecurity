import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>OAuth2/OIDC Demo</h3>
          <p>A comprehensive demonstration of modern application security with Spring Boot and React.</p>
          <div className="social-links">
            <a href="https://github.com/Dineshsikder/ApplicationSecurity" className="social-link">GitHub</a>
            <a href="#" className="social-link">Documentation</a>
            <a href="#" className="social-link">Support</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul className="footer-links">
            <li><a href="#pkce">PKCE Flow</a></li>
            <li><a href="#jwt">JWT Tokens</a></li>
            <li><a href="#refresh">Token Refresh</a></li>
            <li><a href="#blacklist">Token Blacklisting</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Security</h4>
          <ul className="footer-links">
            <li><a href="#oauth2">OAuth2</a></li>
            <li><a href="#oidc">OpenID Connect</a></li>
            <li><a href="#rbac">Role-Based Access</a></li>
            <li><a href="#api-gateway">API Gateway</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Technology Stack</h4>
          <ul className="footer-links">
            <li>Spring Boot 3.2</li>
            <li>Spring Security</li>
            <li>React 18</li>
            <li>Redis</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} OAuth2/OIDC Demo. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 