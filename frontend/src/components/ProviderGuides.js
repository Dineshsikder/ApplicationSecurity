import React, { useState } from 'react';
import './ProviderGuides.css';

const ProviderGuides = () => {
  const [selectedProvider, setSelectedProvider] = useState('aws-cognito');
  const [copiedCode, setCopiedCode] = useState('');

  const providers = [
    {
      id: 'aws-cognito',
      name: 'AWS Cognito',
      description: 'Scalable authentication and user management for web and mobile apps',
      logo: '☁️',
      color: '#FF9900'
    },
    {
      id: 'okta',
      name: 'Okta',
      description: 'Enterprise-grade identity and access management platform',
      logo: '🔐',
      color: '#004DC0'
    },
    {
      id: 'keycloak',
      name: 'Keycloak',
      description: 'Open-source identity and access management solution',
      logo: '🗝️',
      color: '#4695EC'
    },
    {
      id: 'auth0',
      name: 'Auth0',
      description: 'Universal authentication and authorization platform',
      logo: '🛡️',
      color: '#EB5424'
    },
    {
      id: 'google',
      name: 'Google OAuth',
      description: 'Google\'s OAuth 2.0 and OpenID Connect implementation',
      logo: '🔍',
      color: '#4285F4'
    },
    {
      id: 'microsoft',
      name: 'Microsoft Azure AD',
      description: 'Microsoft\'s cloud-based identity and access management',
      logo: '☁️',
      color: '#0078D4'
    }
  ];

  const copyToClipboard = (text, codeId) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const renderProviderContent = () => {
    switch (selectedProvider) {
      case 'aws-cognito':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#FF9900' }}>
                  ☁️
                </div>
                <div>
                  <h2>AWS Cognito Integration Guide</h2>
                  <p>Complete setup guide for AWS Cognito User Pools and Identity Pools with OAuth 2.0 and OpenID Connect</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://docs.aws.amazon.com/cognito/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Official Docs
                </a>
                <a href="https://console.aws.amazon.com/cognito/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  AWS Console
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Create User Pool</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Navigate to Cognito Console</h4>
                  </div>
                  <p className="step-description">Go to AWS Console → Cognito → User Pools → Create user pool</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Console URL</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'cognito-console' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('https://console.aws.amazon.com/cognito/', 'cognito-console')}
                      >
                        {copiedCode === 'cognito-console' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>https://console.aws.amazon.com/cognito/</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Configure App Integration</h4>
                  </div>
                  <p className="step-description">Set up OAuth 2.0 settings and callback URLs</p>
                  <div className="code-block large">
                    <div className="code-header">
                      <span>OAuth Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'cognito-oauth' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`Allowed callback URLs:
http://localhost:3000/callback
https://yourdomain.com/callback

Allowed sign-out URLs:
http://localhost:3000
https://yourdomain.com

Allowed OAuth flows:
Authorization code grant
Implicit grant

Allowed OAuth scopes:
openid
email
profile`, 'cognito-oauth')}
                      >
                        {copiedCode === 'cognito-oauth' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`Allowed callback URLs:
http://localhost:3000/callback
https://yourdomain.com/callback

Allowed sign-out URLs:
http://localhost:3000
https://yourdomain.com

Allowed OAuth flows:
Authorization code grant
Implicit grant

Allowed OAuth scopes:
openid
email
profile`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Frontend Integration</h3>
              <div className="integration-section">
                <h3>Install AWS Amplify</h3>
                <p>Add AWS Amplify to your React application for easy Cognito integration</p>
                <div className="code-block">
                  <div className="code-header">
                    <span>Installation</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'amplify-install' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('npm install aws-amplify @aws-amplify/ui-react', 'amplify-install')}
                    >
                      {copiedCode === 'amplify-install' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>npm install aws-amplify @aws-amplify/ui-react</code></pre>
                </div>
              </div>

              <div className="integration-section">
                <h3>Configure Amplify</h3>
                <p>Set up Amplify configuration with your Cognito User Pool details</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Amplify Configuration</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'amplify-config' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_xxxxxxxxx',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    oauth: {
      domain: 'your-domain.auth.us-east-1.amazoncognito.com',
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: 'http://localhost:3000/callback',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'code'
    }
  }
});`, 'amplify-config')}
                    >
                      {copiedCode === 'amplify-config' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_xxxxxxxxx',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    oauth: {
      domain: 'your-domain.auth.us-east-1.amazoncognito.com',
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: 'http://localhost:3000/callback',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'code'
    }
  }
});`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'okta':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#004DC0' }}>
                  🔐
                </div>
                <div>
                  <h2>Okta Integration Guide</h2>
                  <p>Complete setup guide for Okta OAuth 2.0 and OpenID Connect integration</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://developer.okta.com/docs/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Developer Docs
                </a>
                <a href="https://admin.okta.com/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Okta Admin
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Create Okta Application</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Access Okta Admin Console</h4>
                  </div>
                  <p className="step-description">Log into your Okta admin console and navigate to Applications</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Admin Console</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'okta-admin' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('https://admin.okta.com/', 'okta-admin')}
                      >
                        {copiedCode === 'okta-admin' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>https://admin.okta.com/</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Create OIDC Application</h4>
                  </div>
                  <p className="step-description">Create a new Single Page Application (SPA) for React</p>
                  <div className="code-block large">
                    <div className="code-header">
                      <span>Application Settings</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'okta-app-settings' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`Application type: Single Page Application (SPA)
Base URIs: http://localhost:3000
Login redirect URIs: http://localhost:3000/callback
Logout redirect URIs: http://localhost:3000
Initiate login URI: http://localhost:3000
Grant type: Authorization Code
Response type: Code
Response mode: Query`, 'okta-app-settings')}
                      >
                        {copiedCode === 'okta-app-settings' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`Application type: Single Page Application (SPA)
Base URIs: http://localhost:3000
Login redirect URIs: http://localhost:3000/callback
Logout redirect URIs: http://localhost:3000
Initiate login URI: http://localhost:3000
Grant type: Authorization Code
Response type: Code
Response mode: Query`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Frontend Integration</h3>
              <div className="integration-section">
                <h3>Install Okta React SDK</h3>
                <p>Add the Okta React SDK to your application</p>
                <div className="code-block">
                  <div className="code-header">
                    <span>Installation</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'okta-install' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('npm install @okta/okta-react @okta/okta-auth-js', 'okta-install')}
                    >
                      {copiedCode === 'okta-install' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>npm install @okta/okta-react @okta/okta-auth-js</code></pre>
                </div>
              </div>

              <div className="integration-section">
                <h3>Configure Okta Provider</h3>
                <p>Set up the Okta configuration in your React app</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Okta Configuration</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'okta-config' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://your-domain.okta.com/oauth2/default',
  clientId: 'your-client-id',
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email']
});`, 'okta-config')}
                    >
                      {copiedCode === 'okta-config' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://your-domain.okta.com/oauth2/default',
  clientId: 'your-client-id',
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email']
});`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'keycloak':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#4695EC' }}>
                  🗝️
                </div>
                <div>
                  <h2>Keycloak Integration Guide</h2>
                  <p>Complete setup guide for self-hosted Keycloak OAuth 2.0 and OpenID Connect</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://www.keycloak.org/documentation" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Documentation
                </a>
                <a href="https://www.keycloak.org/downloads" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Download
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Install and Configure Keycloak</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Download Keycloak</h4>
                  </div>
                  <p className="step-description">Download and extract Keycloak server</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Download Command</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'keycloak-download' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('wget https://github.com/keycloak/keycloak/releases/download/21.1.2/keycloak-21.1.2.tar.gz', 'keycloak-download')}
                      >
                        {copiedCode === 'keycloak-download' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>wget https://github.com/keycloak/keycloak/releases/download/21.1.2/keycloak-21.1.2.tar.gz</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Start Keycloak Server</h4>
                  </div>
                  <p className="step-description">Start the Keycloak server in development mode</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Start Command</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'keycloak-start' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('./bin/kc.sh start-dev', 'keycloak-start')}
                      >
                        {copiedCode === 'keycloak-start' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>./bin/kc.sh start-dev</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Create Realm and Client</h3>
              <div className="integration-section">
                <h3>Create Realm</h3>
                <p>Create a new realm for your application</p>
                <div className="code-block">
                  <div className="code-header">
                    <span>Realm Configuration</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'keycloak-realm' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`Realm Name: my-app
Display Name: My Application
Enabled: true`, 'keycloak-realm')}
                    >
                      {copiedCode === 'keycloak-realm' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`Realm Name: my-app
Display Name: My Application
Enabled: true`}</code></pre>
                </div>
              </div>

              <div className="integration-section">
                <h3>Create Client</h3>
                <p>Create a new client for your React application</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Client Configuration</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'keycloak-client' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`Client ID: my-react-app
Client Protocol: openid-connect
Access Type: public
Valid Redirect URIs: http://localhost:3000/*
Web Origins: http://localhost:3000
Standard Flow Enabled: true
Direct Access Grants Enabled: false`, 'keycloak-client')}
                    >
                      {copiedCode === 'keycloak-client' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`Client ID: my-react-app
Client Protocol: openid-connect
Access Type: public
Valid Redirect URIs: http://localhost:3000/*
Web Origins: http://localhost:3000
Standard Flow Enabled: true
Direct Access Grants Enabled: false`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'auth0':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#EB5424' }}>
                  🛡️
                </div>
                <div>
                  <h2>Auth0 Integration Guide</h2>
                  <p>Complete setup guide for Auth0 OAuth 2.0 and OpenID Connect integration</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://auth0.com/docs" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Documentation
                </a>
                <a href="https://manage.auth0.com/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Auth0 Dashboard
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Create Auth0 Application</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Access Auth0 Dashboard</h4>
                  </div>
                  <p className="step-description">Log into your Auth0 dashboard and create a new application</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Dashboard URL</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'auth0-dashboard' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('https://manage.auth0.com/', 'auth0-dashboard')}
                      >
                        {copiedCode === 'auth0-dashboard' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>https://manage.auth0.com/</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Configure Application Settings</h4>
                  </div>
                  <p className="step-description">Set up your Single Page Application settings</p>
                  <div className="code-block large">
                    <div className="code-header">
                      <span>Application Settings</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'auth0-settings' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`Application Type: Single Page Application
Allowed Callback URLs: http://localhost:3000/callback
Allowed Logout URLs: http://localhost:3000
Allowed Web Origins: http://localhost:3000
Allowed Origins (CORS): http://localhost:3000`, 'auth0-settings')}
                      >
                        {copiedCode === 'auth0-settings' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`Application Type: Single Page Application
Allowed Callback URLs: http://localhost:3000/callback
Allowed Logout URLs: http://localhost:3000
Allowed Web Origins: http://localhost:3000
Allowed Origins (CORS): http://localhost:3000`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Frontend Integration</h3>
              <div className="integration-section">
                <h3>Install Auth0 React SDK</h3>
                <p>Add the Auth0 React SDK to your application</p>
                <div className="code-block">
                  <div className="code-header">
                    <span>Installation</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'auth0-install' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('npm install @auth0/auth0-react', 'auth0-install')}
                    >
                      {copiedCode === 'auth0-install' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>npm install @auth0/auth0-react</code></pre>
                </div>
              </div>

              <div className="integration-section">
                <h3>Configure Auth0 Provider</h3>
                <p>Wrap your app with the Auth0 provider</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Auth0 Provider Setup</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'auth0-provider' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="your-domain.auth0.com"
      clientId="your-client-id"
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback',
        audience: "https://your-api-identifier",
        scope: "openid profile email"
      }}
    >
      {/* Your app components */}
    </Auth0Provider>
  );
}`, 'auth0-provider')}
                    >
                      {copiedCode === 'auth0-provider' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="your-domain.auth0.com"
      clientId="your-client-id"
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback',
        audience: "https://your-api-identifier",
        scope: "openid profile email"
      }}
    >
      {/* Your app components */}
    </Auth0Provider>
  );
}`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'google':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#4285F4' }}>
                  🔍
                </div>
                <div>
                  <h2>Google OAuth Integration Guide</h2>
                  <p>Complete setup guide for Google OAuth 2.0 and OpenID Connect</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://developers.google.com/identity/protocols/oauth2" target="_blank" rel="noopener noreferrer" className="link-btn">
                  OAuth Docs
                </a>
                <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Google Cloud Console
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Create Google Cloud Project</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Access Google Cloud Console</h4>
                  </div>
                  <p className="step-description">Create a new project or select an existing one</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Console URL</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'google-console' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('https://console.cloud.google.com/', 'google-console')}
                      >
                        {copiedCode === 'google-console' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>https://console.cloud.google.com/</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Enable OAuth 2.0 API</h4>
                  </div>
                  <p className="step-description">Enable the Google+ API and OAuth 2.0</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>API Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'google-api' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`Enable APIs:
- Google+ API
- Google Identity and Access Management (IAM) API
- People API`, 'google-api')}
                      >
                        {copiedCode === 'google-api' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`Enable APIs:
- Google+ API
- Google Identity and Access Management (IAM) API
- People API`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Configure OAuth Consent Screen</h3>
              <div className="integration-section">
                <h3>OAuth Consent Screen</h3>
                <p>Configure the OAuth consent screen for your application</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Consent Screen Settings</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'google-consent' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`User Type: External
App name: My OAuth App
User support email: your-email@domain.com
Developer contact information: your-email@domain.com
Scopes: email, profile, openid`, 'google-consent')}
                    >
                      {copiedCode === 'google-consent' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`User Type: External
App name: My OAuth App
User support email: your-email@domain.com
Developer contact information: your-email@domain.com
Scopes: email, profile, openid`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'microsoft':
        return (
          <div className="provider-details">
            <div className="provider-header">
              <div className="provider-info-large">
                <div className="provider-logo-large" style={{ backgroundColor: '#0078D4' }}>
                  ☁️
                </div>
                <div>
                  <h2>Microsoft Azure AD Integration Guide</h2>
                  <p>Complete setup guide for Microsoft Azure Active Directory OAuth 2.0</p>
                </div>
              </div>
              <div className="provider-links">
                <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Azure AD Docs
                </a>
                <a href="https://portal.azure.com/" target="_blank" rel="noopener noreferrer" className="link-btn">
                  Azure Portal
                </a>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 1: Register Application in Azure AD</h3>
              <div className="steps-container">
                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <h4>Access Azure Portal</h4>
                  </div>
                  <p className="step-description">Navigate to Azure Active Directory in the Azure portal</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Portal URL</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'azure-portal' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard('https://portal.azure.com/', 'azure-portal')}
                      >
                        {copiedCode === 'azure-portal' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>https://portal.azure.com/</code></pre>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <h4>Register New Application</h4>
                  </div>
                  <p className="step-description">Register a new application in Azure AD</p>
                  <div className="code-block large">
                    <div className="code-header">
                      <span>Application Registration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'azure-app-reg' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`Name: My OAuth App
Supported account types: Accounts in any organizational directory and personal Microsoft accounts
Redirect URI: Single-page application (SPA)
Redirect URI value: http://localhost:3000/callback`, 'azure-app-reg')}
                      >
                        {copiedCode === 'azure-app-reg' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`Name: My OAuth App
Supported account types: Accounts in any organizational directory and personal Microsoft accounts
Redirect URI: Single-page application (SPA)
Redirect URI value: http://localhost:3000/callback`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="setup-section">
              <h3>Step 2: Configure API Permissions</h3>
              <div className="integration-section">
                <h3>API Permissions</h3>
                <p>Configure the required API permissions for your application</p>
                <div className="code-block large">
                  <div className="code-header">
                    <span>Required Permissions</span>
                    <button 
                      className={`copy-btn ${copiedCode === 'azure-permissions' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`Microsoft Graph:
- User.Read (Delegated)
- email (Delegated)
- profile (Delegated)
- openid (Delegated)

Azure Active Directory Graph:
- User.Read (Delegated)`, 'azure-permissions')}
                    >
                      {copiedCode === 'azure-permissions' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{`Microsoft Graph:
- User.Read (Delegated)
- email (Delegated)
- profile (Delegated)
- openid (Delegated)

Azure Active Directory Graph:
- User.Read (Delegated)`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="integration-content">
            <h3>Select a Provider</h3>
            <p>Choose an OAuth provider from the options above to view detailed integration guides, step-by-step instructions, and code examples.</p>
          </div>
        );
    }
  };

  return (
    <div className="provider-guides-container">
      <div className="hero-section">
        <h1 className="hero-title">OAuth Provider Integration Guides</h1>
        <p className="hero-subtitle">
          Comprehensive step-by-step guides for integrating popular OAuth 2.0 and OpenID Connect providers
        </p>
      </div>

      <div className="providers-selection">
        <h2 className="section-title">Choose Your Provider</h2>
        <div className="providers-grid">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`provider-card ${selectedProvider === provider.id ? 'active' : ''}`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div 
                className="provider-logo"
                style={{ backgroundColor: provider.color }}
              >
                {provider.logo}
              </div>
              <h3 className="provider-name">{provider.name}</h3>
              <p className="provider-description">{provider.description}</p>
            </div>
          ))}
        </div>
      </div>

      {renderProviderContent()}
    </div>
  );
};

export default ProviderGuides; 