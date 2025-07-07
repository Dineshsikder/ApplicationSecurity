import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const { completeLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [callbackData, setCallbackData] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const processCallback = async () => {
      try {
        setStatus('processing');
        
        // Capture URL parameters for debugging
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        setDebugInfo({
          urlParams: Object.fromEntries(urlParams.entries()),
          hashParams: Object.fromEntries(hashParams.entries()),
          timestamp: new Date().toISOString()
        });
        
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        // Process the OAuth2 callback
        const result = await completeLogin();
        setCallbackData(result);
        
        clearInterval(progressInterval);
        setProgress(100);
        setStatus('success');
        
        // Redirect after successful authentication
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from, { replace: true });
        }, 1500);
        
      } catch (error) {
        console.error('Callback processing error:', error);
        setError(error.message || 'Authentication failed');
        setStatus('error');
        setProgress(100);
      }
    };

    processCallback();
  }, [completeLogin, navigate, location]);

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return '🔄';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return 'Renewing authentication token...';
      case 'success':
        return 'Token renewed successfully!';
      case 'error':
        return 'Token renewal failed';
      default:
        return 'Initializing renewal...';
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case 'processing':
        return 'Silently refreshing your authentication token to maintain your session';
      case 'success':
        return 'Your session has been extended. This window will close automatically.';
      case 'error':
        return 'There was an error renewing your token. You may need to log in again.';
      default:
        return 'Preparing to renew your authentication token';
    }
  };

  const renewalSteps = [
    {
      step: '1',
      title: 'Validating Current Token',
      description: 'Checking if current token is valid and near expiration',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '2',
      title: 'Requesting New Token',
      description: 'Using refresh token to obtain new access token',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '3',
      title: 'Token Validation',
      description: 'Validating the new token and updating session',
      status: status === 'success' ? 'completed' : 'pending'
    }
  ];

  const callbackSteps = [
    {
      step: '1',
      title: 'Receiving Authorization Code',
      description: 'Processing the authorization code from the OAuth2 provider',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '2',
      title: 'Validating PKCE',
      description: 'Verifying Proof Key for Code Exchange parameters',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '3',
      title: 'Token Exchange',
      description: 'Exchanging authorization code for access and refresh tokens',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '4',
      title: 'Token Validation',
      description: 'Validating JWT tokens and extracting user information',
      status: status === 'processing' ? 'active' : 'completed'
    },
    {
      step: '5',
      title: 'Session Creation',
      description: 'Creating user session and storing authentication state',
      status: status === 'success' ? 'completed' : 'pending'
    }
  ];

  const technicalDetails = {
    oauthFlow: 'Authorization Code Flow with PKCE',
    tokenType: 'JWT',
    validation: 'Server-side token validation',
    security: 'HTTPS communication, PKCE, state validation',
    features: 'Automatic token refresh, secure storage, session management'
  };

  const troubleshootingSteps = [
    'Check browser console for detailed error messages',
    'Verify OAuth2 provider is running and accessible',
    'Ensure redirect URI matches exactly',
    'Check client credentials and configuration',
    'Verify network connectivity and firewall settings',
    'Clear browser cache and cookies',
    'Try using incognito/private browsing mode'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">OAuth2 Callback</h1>
        <p className="page-subtitle">
          Processing your authentication request
        </p>
      </div>

      <div className="page-content">
        {/* Status Display */}
        <section className="section">
          <div className="content-section text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">{getStatusIcon()}</div>
              <h2 className="text-2xl font-bold mb-2">{getStatusMessage()}</h2>
              <p className="text-secondary">{getStatusDescription()}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-secondary mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="border-l-4 border-error bg-error-50 p-4 text-left max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-error mb-2">Callback Error</h3>
                <p className="text-error text-sm mb-3">{error}</p>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/auth')}
                    className="btn btn-primary w-full"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => setError(null)}
                    className="btn btn-secondary w-full"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Process Steps */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Authentication Process</h2>
            <p className="section-subtitle">
              Step-by-step breakdown of the OAuth2 callback processing
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {callbackSteps.map((step, index) => (
              <div key={index} className="content-section">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.status === 'completed' 
                      ? 'bg-success text-white' 
                      : step.status === 'active'
                      ? 'bg-primary text-white'
                      : 'bg-secondary-200 text-secondary-600'
                  }`}>
                    {step.status === 'completed' ? '✓' : step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-secondary text-sm">{step.description}</p>
                  </div>
                  {step.status === 'active' && (
                    <div className="loading-skeleton w-4 h-4 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Details */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Technical Information</h2>
            <p className="section-subtitle">
              Details about the OAuth2 callback process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">OAuth2 Flow</h3>
              <ul className="space-y-2 text-secondary">
                <li>• {technicalDetails.oauthFlow}</li>
                <li>• Secure token exchange</li>
                <li>• JWT token validation</li>
                <li>• Automatic token refresh</li>
                <li>• Session management</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Security Features</h3>
              <ul className="space-y-2 text-secondary">
                <li>• PKCE code verifier validation</li>
                <li>• State parameter verification</li>
                <li>• HTTPS communication</li>
                <li>• Token signature validation</li>
                <li>• Secure token storage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Debug Information */}
        {debugInfo && Object.keys(debugInfo).length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Debug Information</h2>
              <p className="section-subtitle">
                Technical details for debugging purposes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-3">URL Parameters</h3>
                <div className="bg-secondary-50 p-3 rounded-lg">
                  <pre className="text-xs text-secondary-700 overflow-x-auto">
                    {JSON.stringify(debugInfo.urlParams, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-3">Hash Parameters</h3>
                <div className="bg-secondary-50 p-3 rounded-lg">
                  <pre className="text-xs text-secondary-700 overflow-x-auto">
                    {JSON.stringify(debugInfo.hashParams, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="content-section md:col-span-2">
                <h3 className="text-lg font-semibold mb-3">Callback Data</h3>
                <div className="bg-secondary-50 p-3 rounded-lg">
                  <pre className="text-xs text-secondary-700 overflow-x-auto">
                    {JSON.stringify(callbackData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Troubleshooting */}
        {status === 'error' && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Troubleshooting</h2>
              <p className="section-subtitle">
                Common issues and solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-section">
                <h3 className="text-lg font-semibold mb-3">Common Issues</h3>
                <ul className="space-y-2 text-secondary">
                  <li>• Invalid authorization code</li>
                  <li>• Expired authorization code</li>
                  <li>• Mismatched redirect URI</li>
                  <li>• Network connectivity issues</li>
                  <li>• Server configuration problems</li>
                </ul>
              </div>

              <div className="content-section">
                <h3 className="text-lg font-semibold mb-3">Troubleshooting Steps</h3>
                <ul className="space-y-2 text-secondary">
                  {troubleshootingSteps.map((step, index) => (
                    <li key={index}>• {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Success Message */}
        {status === 'success' && (
          <section className="section">
            <div className="content-section bg-success-50 border-l-4 border-success p-4 text-center">
              <h3 className="text-lg font-semibold text-success mb-2">Authentication Successful!</h3>
              <p className="text-success mb-3">
                Your OAuth2 authentication has been completed successfully. You will be redirected to your dashboard shortly.
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-success"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="btn btn-secondary"
                >
                  View Profile
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Additional Resources */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Additional Resources</h2>
            <p className="section-subtitle">
              Learn more about OAuth2 callback processing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">📚</div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-secondary text-sm">
                Read the OAuth2 specification and implementation guides
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🔧</div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <p className="text-secondary text-sm">
                Use OAuth2 debugging tools and validators
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">❓</div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-secondary text-sm">
                Get help from the community and support forums
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Callback; 