import React, { useState, useEffect } from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const authFlowSteps = [
    {
      title: "1. User Initiates Login",
      description: "User clicks 'Login' button on the application",
      icon: "👤",
      details: "The user wants to access protected resources and clicks the login button. The application redirects them to the authorization server."
    },
    {
      title: "2. Authorization Request",
      description: "Application redirects to OAuth server with PKCE parameters",
      icon: "🔐",
      details: "The app generates a code verifier and challenge, then redirects to the authorization server with client_id, scope, and PKCE parameters."
    },
    {
      title: "3. User Authentication",
      description: "User authenticates with the authorization server",
      icon: "🔑",
      details: "The user enters their credentials on the authorization server's secure login page. This keeps credentials separate from the application."
    },
    {
      title: "4. Authorization Grant",
      description: "Server returns authorization code to application",
      icon: "📋",
      details: "After successful authentication, the authorization server redirects back to the application with an authorization code."
    },
    {
      title: "5. Token Exchange",
      description: "Application exchanges code for access token",
      icon: "🔄",
      details: "The application sends the authorization code and code verifier to the token endpoint to exchange for access and refresh tokens."
    },
    {
      title: "6. API Access",
      description: "Application uses access token for API calls",
      icon: "🌐",
      details: "The application includes the access token in API requests to access protected resources on behalf of the user."
    }
  ];

  const providers = [
    {
      name: "AWS Cognito",
      logo: "☁️",
      description: "Amazon's managed authentication service",
      features: ["User pools and identity pools", "Social identity providers", "MFA support", "Lambda triggers"],
      pros: ["Fully managed", "AWS integration", "Scalable", "Cost-effective"],
      cons: ["AWS lock-in", "Limited customization", "Complex pricing"]
    },
    {
      name: "Okta",
      logo: "🔒",
      description: "Enterprise identity platform",
      features: ["Single Sign-On (SSO)", "Universal Directory", "Lifecycle Management", "API Access Management"],
      pros: ["Enterprise-grade", "Rich features", "Good documentation", "Strong security"],
      cons: ["Expensive", "Complex setup", "Overkill for small apps"]
    },
    {
      name: "Keycloak",
      logo: "🗝️",
      description: "Open-source identity and access management",
      features: ["User federation", "Social login", "Admin console", "Custom themes"],
      pros: ["Free and open-source", "Self-hosted", "Highly customizable", "Active community"],
      cons: ["Requires maintenance", "Steep learning curve", "Limited support"]
    },
    {
      name: "Auth0",
      logo: "🛡️",
      description: "Modern authentication platform",
      features: ["Universal Login", "Rules and Hooks", "Multi-factor auth", "Social connections"],
      pros: ["Developer-friendly", "Rich SDKs", "Good documentation", "Flexible"],
      cons: ["Can be expensive", "Vendor lock-in", "Complex pricing"]
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % authFlowSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, authFlowSteps.length]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setIsPlaying(false);
  };

  return (
    <div className="how-it-works-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">How OAuth2/OIDC Works</h1>
          <p className="hero-subtitle">
            Understanding the authentication flow and security mechanisms behind modern web applications
          </p>
        </div>
      </section>

      {/* Authentication Flow Section */}
      <section className="flow-section">
        <div className="container">
          <h2 className="section-title">OAuth2 Authorization Code Flow with PKCE</h2>
          <p className="section-description">
            This is the most secure OAuth2 flow, commonly used for single-page applications and mobile apps.
          </p>

          <div className="flow-controls">
            <button 
              className={`control-btn ${isPlaying ? 'active' : ''}`}
              onClick={toggleAnimation}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'} Animation
            </button>
            <button 
              className="control-btn"
              onClick={() => setCurrentStep(0)}
            >
              🔄 Reset
            </button>
          </div>

          <div className="flow-diagram">
            <div className="flow-steps">
              {authFlowSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flow-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                  onClick={() => goToStep(index)}
                >
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                    {index === currentStep && (
                      <div className="step-details">
                        <p>{step.details}</p>
                      </div>
                    )}
                  </div>
                  <div className="step-number">{index + 1}</div>
                </div>
              ))}
            </div>

            <div className="flow-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="security-section">
        <div className="container">
          <h2 className="section-title">Security Features & Best Practices</h2>
          <p className="section-description">
            Comprehensive security measures implemented to protect against various attack vectors and ensure secure authentication
          </p>
          
          <div className="security-grid">
            <div className="security-card">
              <div className="security-icon">🔐</div>
              <h3>PKCE (Proof Key for Code Exchange)</h3>
              <p>Prevents authorization code interception attacks by using a code verifier and challenge mechanism.</p>
              <div className="security-details">
                <h4>How it works:</h4>
                <ul>
                  <li>Client generates code_verifier (random string)</li>
                  <li>Client creates code_challenge using SHA256 hash</li>
                  <li>Server validates code_verifier against stored challenge</li>
                  <li>Prevents authorization code theft attacks</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">⏰</div>
              <h3>Token Lifecycle Management</h3>
              <p>Comprehensive token management with short-lived access tokens and secure refresh mechanisms.</p>
              <div className="security-details">
                <h4>Token Configuration:</h4>
                <ul>
                  <li>Access tokens: 15-60 minutes (short-lived)</li>
                  <li>Refresh tokens: 7-30 days (longer-lived)</li>
                  <li>ID tokens: 15-60 minutes (JWT-based)</li>
                  <li>Automatic token refresh before expiration</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔄</div>
              <h3>Refresh Token Rotation</h3>
              <p>Refresh tokens are rotated on each use to prevent token reuse and replay attacks.</p>
              <div className="security-details">
                <h4>Security Benefits:</h4>
                <ul>
                  <li>New refresh token issued on each use</li>
                  <li>Previous refresh token immediately invalidated</li>
                  <li>Prevents refresh token replay attacks</li>
                  <li>Detects token theft attempts</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🚫</div>
              <h3>Token Blacklisting & Revocation</h3>
              <p>Immediate token invalidation using Redis-based blacklisting for secure logout and token revocation.</p>
              <div className="security-details">
                <h4>Implementation:</h4>
                <ul>
                  <li>Redis-based token blacklist storage</li>
                  <li>Immediate token invalidation on logout</li>
                  <li>Admin-initiated token revocation</li>
                  <li>Automatic cleanup of expired blacklisted tokens</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔒</div>
              <h3>Transport Layer Security (TLS/HTTPS)</h3>
              <p>All communications use HTTPS with proper certificate validation and secure cipher suites.</p>
              <div className="security-details">
                <h4>TLS Configuration:</h4>
                <ul>
                  <li>TLS 1.2/1.3 with strong cipher suites</li>
                  <li>Certificate pinning for additional security</li>
                  <li>HSTS headers for HTTPS enforcement</li>
                  <li>Secure cookie attributes (HttpOnly, Secure, SameSite)</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">👥</div>
              <h3>Role-Based Access Control (RBAC)</h3>
              <p>Fine-grained access control based on user roles, permissions, and resource-based authorization.</p>
              <div className="security-details">
                <h4>Access Control:</h4>
                <ul>
                  <li>User roles: ADMIN, USER, GUEST</li>
                  <li>Resource-based permissions</li>
                  <li>JWT claims for role information</li>
                  <li>Method-level security annotations</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🛡️</div>
              <h3>Cross-Site Request Forgery (CSRF) Protection</h3>
              <p>Protection against CSRF attacks using state parameters and secure token validation.</p>
              <div className="security-details">
                <h4>CSRF Mitigation:</h4>
                <ul>
                  <li>State parameter in authorization requests</li>
                  <li>CSRF tokens in forms</li>
                  <li>SameSite cookie attributes</li>
                  <li>Origin header validation</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔍</div>
              <h3>Input Validation & Sanitization</h3>
              <p>Comprehensive input validation to prevent injection attacks and malicious payloads.</p>
              <div className="security-details">
                <h4>Validation Measures:</h4>
                <ul>
                  <li>Request parameter validation</li>
                  <li>SQL injection prevention</li>
                  <li>XSS protection with content security policy</li>
                  <li>File upload security validation</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">📊</div>
              <h3>Security Monitoring & Auditing</h3>
              <p>Comprehensive logging and monitoring for security events and audit trails.</p>
              <div className="security-details">
                <h4>Monitoring Features:</h4>
                <ul>
                  <li>Authentication event logging</li>
                  <li>Failed login attempt tracking</li>
                  <li>Token usage analytics</li>
                  <li>Security incident alerting</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔐</div>
              <h3>JWT Security & Validation</h3>
              <p>Secure JWT implementation with proper signature validation and claim verification.</p>
              <div className="security-details">
                <h4>JWT Security:</h4>
                <ul>
                  <li>RS256 algorithm for token signing</li>
                  <li>JWKS endpoint for public key distribution</li>
                  <li>Token expiration validation</li>
                  <li>Issuer and audience claim verification</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🌐</div>
              <h3>Cross-Origin Resource Sharing (CORS)</h3>
              <p>Properly configured CORS policies to prevent unauthorized cross-origin requests.</p>
              <div className="security-details">
                <h4>CORS Configuration:</h4>
                <ul>
                  <li>Whitelist of allowed origins</li>
                  <li>Secure credential handling</li>
                  <li>Preflight request validation</li>
                  <li>Content-Type restrictions</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">⚡</div>
              <h3>Rate Limiting & DDoS Protection</h3>
              <p>Protection against brute force attacks and DDoS using rate limiting and circuit breakers.</p>
              <div className="security-details">
                <h4>Protection Measures:</h4>
                <ul>
                  <li>IP-based rate limiting</li>
                  <li>User-based request throttling</li>
                  <li>Circuit breaker pattern implementation</li>
                  <li>DDoS mitigation strategies</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔑</div>
              <h3>Secure Key Management</h3>
              <p>Proper key management practices for JWT signing, encryption, and sensitive data protection.</p>
              <div className="security-details">
                <h4>Key Management:</h4>
                <ul>
                  <li>Key rotation policies</li>
                  <li>Secure key storage (HSM/KMS)</li>
                  <li>Key versioning and rollback</li>
                  <li>Encryption at rest and in transit</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🛡️</div>
              <h3>Content Security Policy (CSP)</h3>
              <p>Implementation of CSP headers to prevent XSS attacks and control resource loading.</p>
              <div className="security-details">
                <h4>CSP Features:</h4>
                <ul>
                  <li>Script source restrictions</li>
                  <li>Style source validation</li>
                  <li>Frame-ancestors policy</li>
                  <li>Nonce-based script execution</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔒</div>
              <h3>Secure Session Management</h3>
              <p>Secure session handling with proper timeout, storage, and session fixation protection.</p>
              <div className="security-details">
                <h4>Session Security:</h4>
                <ul>
                  <li>Session timeout configuration</li>
                  <li>Secure session storage</li>
                  <li>Session fixation protection</li>
                  <li>Concurrent session control</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🔐</div>
              <h3>Multi-Factor Authentication (MFA)</h3>
              <p>Support for multi-factor authentication to add an additional layer of security.</p>
              <div className="security-details">
                <h4>MFA Support:</h4>
                <ul>
                  <li>TOTP (Time-based One-Time Password)</li>
                  <li>SMS-based verification</li>
                  <li>Email verification codes</li>
                  <li>Hardware security keys (FIDO2)</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">📋</div>
              <h3>Security Headers & Hardening</h3>
              <p>Implementation of security headers and server hardening measures.</p>
              <div className="security-details">
                <h4>Security Headers:</h4>
                <ul>
                  <li>X-Frame-Options: DENY</li>
                  <li>X-Content-Type-Options: nosniff</li>
                  <li>X-XSS-Protection: 1; mode=block</li>
                  <li>Referrer-Policy: strict-origin-when-cross-origin</li>
                </ul>
              </div>
            </div>
            
            <div className="security-card">
              <div className="security-icon">🕵️</div>
              <h3>API Proxying & Backend URL Hiding</h3>
              <p>Frontend proxy configuration to hide backend service URLs and prevent direct access to internal services.</p>
              <div className="security-details">
                <h4>Proxy Configuration:</h4>
                <ul>
                  <li>/api → API Gateway (localhost:8000)</li>
                  <li>/auth → Auth Server (localhost:9000)</li>
                  <li>/resources → Resource Server (localhost:8080)</li>
                  <li>Automatic header sanitization</li>
                </ul>
                <h4>Security Benefits:</h4>
                <ul>
                  <li>Backend URLs hidden from network tab</li>
                  <li>Prevents direct service enumeration</li>
                  <li>Centralized request/response filtering</li>
                  <li>Additional security headers injection</li>
                  <li>Request logging and monitoring</li>
                  <li>Error handling and graceful degradation</li>
                </ul>
                <h4>Implementation:</h4>
                <ul>
                  <li>http-proxy-middleware for React development</li>
                  <li>Path rewriting to hide internal structure</li>
                  <li>Header modification and sanitization</li>
                  <li>Health check endpoints for monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Comparison Section */}
      <section className="providers-section">
        <div className="container">
          <h2 className="section-title">Popular OAuth2/OIDC Providers</h2>
          <p className="section-description">
            Comparison of major identity providers and their features
          </p>

          <div className="providers-grid">
            {providers.map((provider, index) => (
              <div key={index} className="provider-card">
                <div className="provider-header">
                  <div className="provider-logo">{provider.logo}</div>
                  <div className="provider-info">
                    <h3 className="provider-name">{provider.name}</h3>
                    <p className="provider-description">{provider.description}</p>
                  </div>
                </div>

                <div className="provider-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {provider.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="provider-pros-cons">
                  <div className="pros">
                    <h4>✅ Pros</h4>
                    <ul>
                      {provider.pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>❌ Cons</h4>
                    <ul>
                      {provider.cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Details Section */}
      <section className="implementation-section">
        <div className="container">
          <h2 className="section-title">Implementation Details</h2>
          <div className="implementation-grid">
            <div className="implementation-card">
              <h3>🔧 Backend Implementation</h3>
              <ul>
                <li>Spring Boot 3.2 with Spring Security</li>
                <li>OAuth2 Authorization Server</li>
                <li>JWT token generation and validation</li>
                <li>Redis for token blacklisting</li>
                <li>PKCE support for public clients</li>
                <li>Role-based access control</li>
              </ul>
            </div>
            <div className="implementation-card">
              <h3>🎨 Frontend Implementation</h3>
              <ul>
                <li>React 18 with React Router</li>
                <li>OIDC Client for authentication</li>
                <li>Automatic token refresh</li>
                <li>Secure token storage</li>
                <li>Protected route components</li>
                <li>Modern UI with responsive design</li>
              </ul>
            </div>
            <div className="implementation-card">
              <h3>🌐 API Gateway</h3>
              <ul>
                <li>Spring Cloud Gateway</li>
                <li>JWT validation middleware</li>
                <li>Rate limiting and circuit breakers</li>
                <li>CORS configuration</li>
                <li>Request routing and load balancing</li>
                <li>Monitoring and logging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 