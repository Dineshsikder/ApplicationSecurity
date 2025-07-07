import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'User Initiates Login',
      description: 'User clicks "Login with OAuth2" button on the React frontend',
      icon: '👤',
      details: [
        'Frontend redirects to authorization server',
        'PKCE code challenge is generated',
        'State parameter prevents CSRF attacks'
      ]
    },
    {
      step: '02',
      title: 'Authorization Server',
      description: 'Spring Boot authorization server handles the OAuth2 flow',
      icon: '🔐',
      details: [
        'Validates client credentials',
        'Presents login form to user',
        'Generates authorization code'
      ]
    },
    {
      step: '03',
      title: 'User Authentication',
      description: 'User provides credentials and grants consent',
      icon: '✅',
      details: [
        'Username/password validation',
        'Role-based permissions check',
        'Consent screen for requested scopes'
      ]
    },
    {
      step: '04',
      title: 'Token Exchange',
      description: 'Frontend exchanges authorization code for tokens',
      icon: '🔄',
      details: [
        'PKCE code verifier validation',
        'JWT access token generation',
        'Refresh token for long-term access'
      ]
    },
    {
      step: '05',
      title: 'API Gateway',
      description: 'All API requests go through the secure gateway',
      icon: '🌐',
      details: [
        'JWT token validation',
        'Rate limiting and circuit breakers',
        'Request routing to microservices'
      ]
    },
    {
      step: '06',
      title: 'Microservices',
      description: 'Protected microservices process business logic',
      icon: '⚙️',
      details: [
        'Role-based access control',
        'User profile management',
        'Admin dashboard functionality'
      ]
    }
  ];

  const securityFeatures = [
    {
      title: 'PKCE Flow',
      description: 'Proof Key for Code Exchange prevents authorization code interception',
      icon: '🔑',
      benefits: ['Prevents code interception attacks', 'Secure for public clients', 'OAuth2.1 compliant']
    },
    {
      title: 'JWT Tokens',
      description: 'JSON Web Tokens provide stateless authentication',
      icon: '🎫',
      benefits: ['Self-contained user information', 'Digital signature verification', 'Configurable expiration']
    },
    {
      title: 'Token Refresh',
      description: 'Automatic token renewal for seamless user experience',
      icon: '🔄',
      benefits: ['No re-authentication required', 'Secure refresh token storage', 'Automatic cleanup']
    },
    {
      title: 'Role-Based Access',
      description: 'Fine-grained permissions based on user roles',
      icon: '👥',
      benefits: ['Granular permission control', 'Dynamic role assignment', 'Audit trail support']
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">How OAuth2 Works</h1>
        <p className="page-subtitle">
          Step-by-step guide to understanding the OAuth2/OIDC authentication flow in this application
        </p>
      </div>

      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Authentication Flow</h2>
            <p className="section-subtitle">
              The complete OAuth2 authorization code flow with PKCE implementation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="content-section">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="feature-icon">{step.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-bold text-primary bg-primary-50 px-3 py-1 rounded-full">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-secondary mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-secondary">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Features</h2>
            <p className="section-subtitle">
              Key security mechanisms that protect the application and user data
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm text-secondary">
                      <span className="w-1 h-1 bg-success rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Architecture Overview</h2>
            <p className="section-subtitle">
              High-level view of the microservices architecture and security layers
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Frontend Layer</h3>
              <p className="text-secondary text-sm">
                React application with OIDC client library for secure authentication
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🚪</div>
              <h3 className="font-semibold mb-2">Gateway Layer</h3>
              <p className="text-secondary text-sm">
                Spring Cloud Gateway with JWT validation and security policies
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">⚙️</div>
              <h3 className="font-semibold mb-2">Service Layer</h3>
              <p className="text-secondary text-sm">
                Microservices with role-based access control and business logic
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-subtitle">
              Modern technologies used to implement secure OAuth2/OIDC authentication
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Backend Technologies</h3>
              <div className="space-y-2 text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Spring Boot 3.2 - Application framework
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Spring Security - Security framework
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Spring Cloud Gateway - API gateway
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Redis - Token storage and caching
                </div>
              </div>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Frontend Technologies</h3>
              <div className="space-y-2 text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  React 18 - UI framework
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  OIDC Client - Authentication library
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  React Router - Navigation
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Modern CSS - Styling and layout
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks; 