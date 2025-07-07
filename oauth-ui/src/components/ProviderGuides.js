import React from 'react';

const ProviderGuides = () => {
  const providers = [
    {
      name: 'Google OAuth2',
      icon: '🔍',
      description: 'Google\'s OAuth2 implementation for accessing Google APIs and user data',
      features: [
        'Google Sign-In integration',
        'Gmail, Calendar, Drive APIs',
        'OpenID Connect support',
        'PKCE flow support'
      ],
      setupSteps: [
        'Create Google Cloud Project',
        'Enable OAuth2 API',
        'Configure OAuth consent screen',
        'Create OAuth2 credentials',
        'Set authorized redirect URIs'
      ],
      scopes: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/userinfo.email']
    },
    {
      name: 'GitHub OAuth2',
      icon: '🐙',
      description: 'GitHub\'s OAuth2 for accessing repositories and user information',
      features: [
        'Repository access',
        'User profile data',
        'Organization membership',
        'Fine-grained permissions'
      ],
      setupSteps: [
        'Create GitHub OAuth App',
        'Configure application settings',
        'Set callback URL',
        'Generate client credentials',
        'Configure required scopes'
      ],
      scopes: ['read:user', 'user:email', 'repo', 'read:org']
    },
    {
      name: 'Microsoft Azure AD',
      icon: '☁️',
      description: 'Microsoft\'s enterprise identity platform with OAuth2/OIDC support',
      features: [
        'Enterprise SSO',
        'Multi-tenant support',
        'Conditional access',
        'Advanced security features'
      ],
      setupSteps: [
        'Register application in Azure AD',
        'Configure authentication',
        'Set redirect URIs',
        'Configure API permissions',
        'Generate client secret'
      ],
      scopes: ['openid', 'profile', 'email', 'User.Read', 'Calendars.Read']
    },
    {
      name: 'Auth0',
      icon: '🔐',
      description: 'Universal identity platform with comprehensive OAuth2/OIDC support',
      features: [
        'Universal login',
        'Social connections',
        'Enterprise connections',
        'Custom domains'
      ],
      setupSteps: [
        'Create Auth0 account',
        'Create new application',
        'Configure application type',
        'Set allowed callbacks',
        'Configure social connections'
      ],
      scopes: ['openid', 'profile', 'email', 'read:user_idp_tokens']
    },
    {
      name: 'Okta',
      icon: '🆔',
      description: 'Enterprise identity platform with advanced OAuth2/OIDC capabilities',
      features: [
        'Single sign-on',
        'Multi-factor authentication',
        'Lifecycle management',
        'Advanced policies'
      ],
      setupSteps: [
        'Create Okta developer account',
        'Create new application',
        'Configure OAuth2 settings',
        'Set redirect URIs',
        'Configure scopes and claims'
      ],
      scopes: ['openid', 'profile', 'email', 'offline_access']
    },
    {
      name: 'Custom OAuth2 Server',
      icon: '⚙️',
      description: 'Building your own OAuth2 authorization server with Spring Security',
      features: [
        'Full control over implementation',
        'Custom scopes and claims',
        'Integration with existing systems',
        'Compliance with specific requirements'
      ],
      setupSteps: [
        'Configure Spring Security OAuth2',
        'Set up authorization server',
        'Configure client registration',
        'Implement user authentication',
        'Set up token endpoints'
      ],
      scopes: ['read', 'write', 'admin', 'custom:scope']
    }
  ];

  const bestPractices = [
    {
      title: 'Security Configuration',
      items: [
        'Always use HTTPS for all OAuth2 endpoints',
        'Implement PKCE for public clients',
        'Use secure token storage',
        'Validate redirect URIs strictly',
        'Implement proper scope validation'
      ]
    },
    {
      title: 'Error Handling',
      items: [
        'Handle OAuth2 error responses properly',
        'Implement retry logic for network failures',
        'Log security events for monitoring',
        'Provide user-friendly error messages',
        'Implement proper session management'
      ]
    },
    {
      title: 'Performance Optimization',
      items: [
        'Cache user information appropriately',
        'Use token refresh efficiently',
        'Implement connection pooling',
        'Monitor OAuth2 endpoint performance',
        'Optimize token validation'
      ]
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">OAuth Provider Guides</h1>
        <p className="page-subtitle">
          Comprehensive guides for integrating with popular OAuth2 providers and building custom solutions
        </p>
      </div>

      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Popular OAuth2 Providers</h2>
            <p className="section-subtitle">
              Step-by-step integration guides for major OAuth2 providers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {providers.map((provider, index) => (
              <div key={index} className="content-section">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="feature-icon">{provider.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
                    <p className="text-secondary mb-4">{provider.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Key Features</h4>
                        <ul className="space-y-2">
                          {provider.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-secondary">
                              <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Setup Steps</h4>
                        <ol className="space-y-2">
                          {provider.setupSteps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-2 text-secondary">
                              <span className="flex-shrink-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-primary">Common Scopes</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.scopes.map((scope, scopeIndex) => (
                          <span key={scopeIndex} className="px-2 py-1 bg-secondary text-secondary-700 text-xs rounded-md font-mono">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Best Practices</h2>
            <p className="section-subtitle">
              Essential guidelines for secure and efficient OAuth2 implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{practice.title}</h3>
                <ul className="space-y-2">
                  {practice.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-secondary">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Implementation Checklist</h2>
            <p className="section-subtitle">
              Essential checklist for successful OAuth2 integration
            </p>
          </div>

          <div className="content-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Pre-Implementation</h3>
                <ul className="space-y-2 text-secondary">
                  <li>• Choose appropriate OAuth2 flow</li>
                  <li>• Register application with provider</li>
                  <li>• Configure redirect URIs</li>
                  <li>• Set up development environment</li>
                  <li>• Review security requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Post-Implementation</h3>
                <ul className="space-y-2 text-secondary">
                  <li>• Test all OAuth2 flows</li>
                  <li>• Implement error handling</li>
                  <li>• Set up monitoring and logging</li>
                  <li>• Configure production settings</li>
                  <li>• Document integration details</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProviderGuides; 