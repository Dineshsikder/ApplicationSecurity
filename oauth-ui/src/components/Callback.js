import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Callback.css';

const Callback = () => {
  const { completeLogin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setLoading(true);
        
        // Wait for auth context to be fully initialized
        if (authLoading) {
          console.log('Waiting for auth context to initialize...');
          return; // Exit early, will retry when authLoading becomes false
        }
        
        // Complete the OAuth2 login flow
        const user = await completeLogin();
        
        console.log('OAuth2 login completed successfully:', user);
        
        // Redirect to the appropriate page based on user role
        if (user && user.profile) {
          const roles = user.profile.role || user.profile.roles || [];
          if (Array.isArray(roles) && roles.includes('ADMIN')) {
            navigate('/admin');
          } else {
            navigate('/profile');
          }
        } else {
          navigate('/profile');
        }
      } catch (error) {
        console.error('OAuth2 callback error:', error);
        setError('Authentication failed. Please try again.');
        setLoading(false);
        
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    handleCallback();
  }, [completeLogin, navigate, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="callback-container">
        <div className="callback-card">
          <div className="callback-loading">
            <div className="loading-spinner">⏳</div>
            <h2>Completing Authentication...</h2>
            <p>Please wait while we complete your OAuth2 login.</p>
            <div className="loading-steps">
              <div className="step">1. Initializing authentication system</div>
              <div className="step">2. Validating authorization code</div>
              <div className="step">3. Exchanging for tokens</div>
              <div className="step">4. Loading user profile</div>
              <div className="step">5. Redirecting to dashboard</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="callback-container">
        <div className="callback-card">
          <div className="callback-error">
            <div className="error-icon">❌</div>
            <h2>Authentication Failed</h2>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/')}
              className="callback-button"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Callback; 