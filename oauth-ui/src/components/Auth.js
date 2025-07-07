import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import './Auth.css';

const Auth = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState('authorization_code');
  const [selectedScopes, setSelectedScopes] = useState(['openid', 'profile', 'email']);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOAuth2Login = async () => {
    try {
      setIsLoggingIn(true);
      setAuthError(null);
      await login();
    } catch (error) {
      console.error('OAuth2 login error:', error);
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
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
        setAuthError(response.error);
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
      setAuthError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAuthError('');
    setSuccess('');
    setFormData({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    });
  };

  const authFeatures = [
    {
      icon: '🔐',
      title: 'OAuth2 Authorization',
      description: 'Secure authorization using industry-standard OAuth2 protocol'
    },
    {
      icon: '🆔',
      title: 'OpenID Connect',
      description: 'Identity layer on top of OAuth2 for authentication'
    },
    {
      icon: '🔑',
      title: 'PKCE Flow',
      description: 'Proof Key for Code Exchange for enhanced security'
    },
    {
      icon: '🎫',
      title: 'JWT Tokens',
      description: 'JSON Web Tokens for secure, stateless authentication'
    },
    {
      icon: '🔄',
      title: 'Token Refresh',
      description: 'Automatic token renewal for seamless user experience'
    },
    {
      icon: '🚫',
      title: 'Token Blacklisting',
      description: 'Immediate token revocation for enhanced security'
    }
  ];

  const securityBenefits = [
    {
      title: 'No Password Sharing',
      description: 'Applications never see your actual password'
    },
    {
      title: 'Limited Access',
      description: 'Apps only get the permissions you explicitly grant'
    },
    {
      title: 'Revocable Access',
      description: 'You can revoke access at any time'
    },
    {
      title: 'Secure Communication',
      description: 'All authentication uses encrypted HTTPS connections'
    }
  ];

  const oauthFlows = [
    {
      id: 'authorization_code',
      name: 'Authorization Code Flow',
      description: 'Most secure flow for web applications',
      features: ['PKCE support', 'Refresh tokens', 'Server-side validation']
    },
    {
      id: 'implicit',
      name: 'Implicit Flow',
      description: 'Legacy flow (deprecated)',
      features: ['Direct token response', 'No refresh tokens', 'Less secure']
    },
    {
      id: 'client_credentials',
      name: 'Client Credentials Flow',
      description: 'For server-to-server communication',
      features: ['No user interaction', 'Service accounts', 'API access']
    },
    {
      id: 'password',
      name: 'Resource Owner Password Flow',
      description: 'Legacy flow (avoid in new applications)',
      features: ['Direct password exchange', 'Limited security', 'Legacy support']
    }
  ];

  const availableScopes = [
    { id: 'openid', name: 'OpenID Connect', description: 'Authentication and identity information' },
    { id: 'profile', name: 'Profile', description: 'Basic profile information' },
    { id: 'email', name: 'Email', description: 'Email address access' },
    { id: 'address', name: 'Address', description: 'Physical address information' },
    { id: 'phone', name: 'Phone', description: 'Phone number access' },
    { id: 'offline_access', name: 'Offline Access', description: 'Refresh token access' }
  ];

  const technologyStack = {
    backend: [
      'Spring Boot 3.2 - Application framework',
      'Spring Security - Security framework',
      'Spring Authorization Server - OAuth2 server',
      'Redis - Token storage and caching',
      'H2 Database - Data persistence'
    ],
    frontend: [
      'React 18 - UI framework',
      'OIDC Client - Authentication library',
      'React Router - Navigation',
      'Modern CSS - Styling and layout',
      'Context API - State management'
    ]
  };

  const securityInfo = [
    {
      icon: '🔒',
      title: 'HTTPS Only',
      description: 'All communications use encrypted HTTPS connections'
    },
    {
      icon: '⏰',
      title: 'Token Expiration',
      description: 'Short-lived access tokens with automatic refresh'
    },
    {
      icon: '🛡️',
      title: 'CSRF Protection',
      description: 'Cross-Site Request Forgery protection enabled'
    }
  ];

  const demoInfo = {
    authorizationServer: 'http://localhost:9000',
    clientId: 'oauth2-demo-client',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile email'
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Loading authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Authentication</h1>
        <p className="page-subtitle">
          Secure login using OAuth2 and OpenID Connect protocols
        </p>
      </div>

      <div className="page-content">
        {/* Hero Section */}
        <section className="hero">
          <h2 className="hero-title">Welcome to OAuth2 Demo</h2>
          <p className="hero-subtitle">
            Experience secure authentication with industry-standard OAuth2 and OpenID Connect protocols. 
            This demo showcases modern application security best practices.
          </p>
          <div className="hero-actions">
            <button 
              onClick={handleOAuth2Login} 
              disabled={isLoggingIn}
              className="btn btn-primary btn-lg"
            >
              {isLoggingIn ? (
                <>
                  <div className="loading-skeleton w-4 h-4 rounded-full mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  🔐 Login with OAuth2
                </>
              )}
            </button>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="btn btn-secondary btn-lg"
            >
              Learn How It Works
            </button>
          </div>
        </section>

        {/* Advanced Configuration */}
        <section className="section">
          <div className="content-section">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Advanced Configuration</h3>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="btn btn-sm btn-secondary"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </button>
            </div>
            
            {showAdvanced && (
              <div className="space-y-6">
                {/* OAuth2 Flow Selection */}
                <div>
                  <h4 className="font-semibold mb-3">OAuth2 Flow</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {oauthFlows.map((flow) => (
                      <div 
                        key={flow.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedFlow === flow.id 
                            ? 'border-primary bg-primary-50' 
                            : 'border-border-primary hover:border-primary'
                        }`}
                        onClick={() => setSelectedFlow(flow.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{flow.name}</h5>
                          {selectedFlow === flow.id && (
                            <span className="text-primary">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-secondary mb-2">{flow.description}</p>
                        <ul className="text-xs text-secondary space-y-1">
                          {flow.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <h4 className="font-semibold mb-3">Requested Scopes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableScopes.map((scope) => (
                      <label key={scope.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedScopes.includes(scope.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedScopes([...selectedScopes, scope.id]);
                            } else {
                              setSelectedScopes(selectedScopes.filter(s => s !== scope.id));
                            }
                          }}
                          className="rounded border-border-primary text-primary focus:ring-primary"
                        />
                        <div>
                          <div className="font-medium">{scope.name}</div>
                          <div className="text-sm text-secondary">{scope.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Current Configuration */}
                <div className="bg-info-50 border border-info-200 rounded-lg p-4">
                  <h4 className="font-semibold text-info mb-2">Current Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Selected Flow:</span>
                      <span className="ml-2">{oauthFlows.find(f => f.id === selectedFlow)?.name}</span>
                    </div>
                    <div>
                      <span className="font-medium">Selected Scopes:</span>
                      <span className="ml-2">{selectedScopes.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Authentication Features */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Authentication Features</h2>
            <p className="section-subtitle">
              Advanced security features implemented in this OAuth2 demonstration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Benefits */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Why OAuth2 is Secure</h2>
            <p className="section-subtitle">
              Key security benefits of using OAuth2 for authentication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityBenefits.map((benefit, index) => (
              <div key={index} className="content-section">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">How OAuth2 Authentication Works</h2>
            <p className="section-subtitle">
              Step-by-step process of secure authentication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">👤</div>
              <h3 className="font-semibold mb-2">1. User Clicks Login</h3>
              <p className="text-secondary text-sm">
                User initiates authentication by clicking the login button
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🔐</div>
              <h3 className="font-semibold mb-2">2. Authorization Server</h3>
              <p className="text-secondary text-sm">
                User is redirected to the secure authorization server
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">✅</div>
              <h3 className="font-semibold mb-2">3. User Authentication</h3>
              <p className="text-secondary text-sm">
                User provides credentials and grants consent
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🎫</div>
              <h3 className="font-semibold mb-2">4. Token Exchange</h3>
              <p className="text-secondary text-sm">
                Application receives secure tokens for access
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-subtitle">
              Modern technologies powering this secure authentication system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Backend Technologies</h3>
              <ul className="space-y-2 text-secondary">
                {technologyStack.backend.map((tech, index) => (
                  <li key={index}>• {tech}</li>
                ))}
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Frontend Technologies</h3>
              <ul className="space-y-2 text-secondary">
                {technologyStack.frontend.map((tech, index) => (
                  <li key={index}>• {tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Security Information */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Information</h2>
            <p className="section-subtitle">
              Important security details about this demonstration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityInfo.map((info, index) => (
              <div key={index} className="content-section text-center">
                <div className="feature-icon mx-auto mb-3">{info.icon}</div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-secondary text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Error Display */}
        {authError && (
          <section className="section">
            <div className="content-section border-l-4 border-error bg-error-50 p-4">
              <h3 className="text-lg font-semibold text-error mb-2">Authentication Error</h3>
              <p className="text-error">{authError}</p>
              <button 
                onClick={() => setAuthError(null)}
                className="btn btn-sm btn-secondary mt-2"
              >
                Dismiss
              </button>
            </div>
          </section>
        )}

        {/* Demo Information */}
        <section className="section">
          <div className="content-section bg-info-50 border-l-4 border-info p-4">
            <h3 className="text-lg font-semibold text-info mb-2">Demo Information</h3>
            <p className="text-info mb-3">
              This is a demonstration application showcasing OAuth2 and OpenID Connect implementation. 
              The authentication server is configured for educational purposes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Authorization Server:</span>
                <span className="ml-2">{demoInfo.authorizationServer}</span>
              </div>
              <div>
                <span className="font-medium">Client ID:</span>
                <span className="ml-2">{demoInfo.clientId}</span>
              </div>
              <div>
                <span className="font-medium">Redirect URI:</span>
                <span className="ml-2">{demoInfo.redirectUri}</span>
              </div>
              <div>
                <span className="font-medium">Scope:</span>
                <span className="ml-2">{demoInfo.scope}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth; 