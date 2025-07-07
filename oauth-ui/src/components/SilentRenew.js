import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './SilentRenew.css';

const SilentRenew = () => {
  const { completeSilentRenew } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processSilentRenew = async () => {
      try {
        setStatus('processing');
        
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 15;
          });
        }, 100);

        // Process silent token renewal
        await completeSilentRenew();
        
        clearInterval(progressInterval);
        setProgress(100);
        setStatus('success');
        
        // Close the popup after successful renewal
        setTimeout(() => {
          window.close();
        }, 1000);
        
      } catch (error) {
        console.error('Silent renew error:', error);
        setError(error.message || 'Token renewal failed');
        setStatus('error');
        setProgress(100);
      }
    };

    processSilentRenew();
  }, [completeSilentRenew]);

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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Silent Token Renewal</h1>
        <p className="page-subtitle">
          Automatically refreshing your authentication session
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
                <h3 className="text-lg font-semibold text-error mb-2">Renewal Error</h3>
                <p className="text-error text-sm">{error}</p>
                <button 
                  onClick={() => window.close()}
                  className="btn btn-primary mt-3"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Renewal Process */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Renewal Process</h2>
            <p className="section-subtitle">
              Step-by-step breakdown of the silent token renewal
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renewalSteps.map((step, index) => (
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

        {/* Technical Information */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Technical Details</h2>
            <p className="section-subtitle">
              Information about silent token renewal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">How It Works</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Uses hidden iframe for renewal</li>
                <li>• Leverages refresh token</li>
                <li>• Maintains user session</li>
                <li>• No user interaction required</li>
                <li>• Automatic background process</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Seamless user experience</li>
                <li>• No session interruptions</li>
                <li>• Enhanced security</li>
                <li>• Reduced login prompts</li>
                <li>• Better performance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Information */}
        <section className="section">
          <div className="content-section bg-info-50 border-l-4 border-info p-4">
            <h3 className="text-lg font-semibold text-info mb-2">Security Information</h3>
            <p className="text-info mb-3">
              Silent token renewal is a secure process that happens in the background to maintain your authentication session without requiring you to log in again.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Token Type:</span>
                <span className="ml-2">Refresh Token</span>
              </div>
              <div>
                <span className="font-medium">Renewal Method:</span>
                <span className="ml-2">Hidden iframe</span>
              </div>
              <div>
                <span className="font-medium">Frequency:</span>
                <span className="ml-2">Before token expiration</span>
              </div>
              <div>
                <span className="font-medium">User Impact:</span>
                <span className="ml-2">None (background process)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {status === 'success' && (
          <section className="section">
            <div className="content-section bg-success-50 border-l-4 border-success p-4 text-center">
              <h3 className="text-lg font-semibold text-success mb-2">Renewal Successful!</h3>
              <p className="text-success mb-3">
                Your authentication token has been renewed successfully. This window will close automatically.
              </p>
              <div className="text-sm text-success-600">
                You can continue using the application without interruption.
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SilentRenew; 