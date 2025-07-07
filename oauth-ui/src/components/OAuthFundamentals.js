import React, { useState } from 'react';

const OAuthFundamentals = () => {
  const [activeSection, setActiveSection] = useState('what');

  const sections = [
    { id: 'what', title: 'What is OAuth2?', icon: '❓' },
    { id: 'oidc', title: 'What is OIDC?', icon: '🆔' },
    { id: 'diff', title: 'OIDC vs OAuth2', icon: '🔄' },
    { id: 'why', title: 'Why OAuth2?', icon: '🎯' },
    { id: 'security', title: 'Security Aspects', icon: '🛡️' },
    { id: 'benefits', title: 'Benefits', icon: '✅' },
    { id: 'loopholes', title: 'Security Loopholes', icon: '⚠️' },
    { id: 'future', title: 'Future Plans', icon: '🚀' }
  ];

  const content = {
    what: {
      title: 'What is OAuth2?',
      description: 'OAuth2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service.',
      details: [
        {
          subtitle: 'Authorization vs Authentication',
          text: 'OAuth2 is primarily an authorization protocol, not an authentication protocol. It allows third-party applications to access user resources without sharing credentials.'
        },
        {
          subtitle: 'Key Concepts',
          text: 'OAuth2 introduces several key concepts: Resource Owner (user), Client (application), Authorization Server, and Resource Server.'
        },
        {
          subtitle: 'Token-Based',
          text: 'Instead of sharing passwords, OAuth2 uses access tokens that grant specific permissions for a limited time.'
        }
      ]
    },
    oidc: {
      title: 'What is OpenID Connect (OIDC)?',
      description: 'OpenID Connect (OIDC) is an authentication layer built on top of OAuth2, enabling secure user login and identity information sharing.',
      details: [
        {
          subtitle: 'Authentication Layer',
          text: 'OIDC extends OAuth2 by providing a standardized way to authenticate users and obtain their identity information (such as name, email, and profile) using ID tokens.'
        },
        {
          subtitle: 'ID Token',
          text: 'OIDC introduces the ID token, a JWT (JSON Web Token) that contains information about the authenticated user, issued by the authorization server.'
        },
        {
          subtitle: 'UserInfo Endpoint',
          text: 'OIDC defines a UserInfo endpoint that allows clients to retrieve additional user profile information after authentication.'
        },
        {
          subtitle: 'Interoperability',
          text: 'OIDC is widely adopted and supported by major identity providers (Google, Microsoft, etc.), making it easy to implement single sign-on (SSO) and federated identity.'
        }
      ]
    },
    diff: {
      title: 'OIDC vs OAuth2',
      description: 'While OIDC and OAuth2 are closely related, they serve different purposes. Here are the key differences:',
      details: [
        {
          subtitle: 'Purpose',
          text: 'OAuth2 is for authorization (granting access to resources), while OIDC is for authentication (verifying user identity).'
        },
        {
          subtitle: 'Tokens',
          text: 'OAuth2 issues access tokens for resource access. OIDC issues both access tokens and ID tokens (for user identity).'
        },
        {
          subtitle: 'User Info',
          text: 'OIDC provides a standard UserInfo endpoint for retrieving user profile data. OAuth2 does not define this.'
        },
        {
          subtitle: 'Protocol Layer',
          text: 'OIDC is a thin identity layer on top of OAuth2, using the same flows but adding authentication and identity features.'
        },
        {
          subtitle: 'Adoption',
          text: 'OIDC is the modern standard for authentication and SSO, while OAuth2 remains the standard for delegated authorization.'
        }
      ]
    },
    why: {
      title: 'Why was OAuth2 Introduced?',
      description: 'OAuth2 was created to solve critical security and usability problems in web application authorization.',
      details: [
        {
          subtitle: 'Password Anti-Pattern',
          text: 'Before OAuth2, applications often required users to share their passwords, creating security risks and trust issues.'
        },
        {
          subtitle: 'Limited Access Control',
          text: 'Traditional methods provided all-or-nothing access, making it impossible to grant limited permissions.'
        },
        {
          subtitle: 'Scalability Issues',
          text: 'As web services grew, managing user credentials across multiple applications became increasingly complex and insecure.'
        }
      ]
    },
    security: {
      title: 'Security Aspects',
      description: 'OAuth2 implements multiple security layers to protect user data and prevent unauthorized access.',
      details: [
        {
          subtitle: 'Token Security',
          text: 'Access tokens are short-lived and can be revoked. Refresh tokens provide secure long-term access without storing credentials.'
        },
        {
          subtitle: 'Scope Limitation',
          text: 'OAuth2 scopes limit what resources an application can access, following the principle of least privilege.'
        },
        {
          subtitle: 'State Parameter',
          text: 'The state parameter prevents CSRF attacks by ensuring the authorization response matches the original request.'
        },
        {
          subtitle: 'PKCE (Proof Key for Code Exchange)',
          text: 'PKCE prevents authorization code interception attacks, especially important for public clients like mobile apps.'
        }
      ]
    },
    benefits: {
      title: 'Benefits of OAuth2',
      description: 'OAuth2 provides numerous advantages for both users and application developers.',
      details: [
        {
          subtitle: 'Enhanced Security',
          text: 'Eliminates password sharing, provides fine-grained access control, and enables token revocation.'
        },
        {
          subtitle: 'User Experience',
          text: 'Single sign-on capabilities, reduced friction, and better control over application permissions.'
        },
        {
          subtitle: 'Developer Benefits',
          text: 'Standardized protocol, reduced liability, and easier integration with existing identity providers.'
        },
        {
          subtitle: 'Compliance',
          text: 'Helps meet regulatory requirements for data protection and privacy standards.'
        }
      ]
    },
    loopholes: {
      title: 'Security Loopholes & Mitigations',
      description: 'Understanding potential vulnerabilities and how to address them is crucial for secure OAuth2 implementation.',
      details: [
        {
          subtitle: 'Authorization Code Interception',
          text: 'Attackers might intercept authorization codes. Mitigation: Use PKCE, HTTPS, and secure redirect URIs.'
        },
        {
          subtitle: 'Token Storage',
          text: 'Poor token storage can lead to exposure. Mitigation: Secure storage, encryption, and automatic cleanup.'
        },
        {
          subtitle: 'Scope Validation',
          text: 'Insufficient scope validation can grant excessive permissions. Mitigation: Strict scope checking and validation.'
        },
        {
          subtitle: 'Redirect URI Validation',
          text: 'Open redirect vulnerabilities can be exploited. Mitigation: Whitelist and validate all redirect URIs.'
        }
      ]
    },
    future: {
      title: 'Future Plans & Evolution',
      description: 'OAuth2 continues to evolve with new security features and integration capabilities.',
      details: [
        {
          subtitle: 'OAuth2.1',
          text: 'The upcoming OAuth2.1 specification will mandate PKCE for all clients and improve security requirements.'
        },
        {
          subtitle: 'Enhanced Security',
          text: 'New security features like device authorization flow and improved token binding mechanisms.'
        },
        {
          subtitle: 'Better Integration',
          text: 'Improved integration with modern identity standards and enhanced developer experience.'
        },
        {
          subtitle: 'AI & Machine Learning',
          text: 'Integration with AI-powered security systems for better threat detection and prevention.'
        }
      ]
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">OAuth2 & OpenID Connect Fundamentals</h1>
        <p className="page-subtitle">
          Comprehensive guide to understanding OAuth2, OpenID Connect, and modern application security
        </p>
      </div>

      <div className="page-content">
        {/* Navigation */}
        <section className="section">
          <div className="content-section">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    activeSection === section.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-border-primary bg-bg-elevated hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{section.icon}</div>
                  <div className="font-medium text-sm">{section.title}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="content-section">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">{content[activeSection].title}</h2>
              <p className="text-secondary text-lg">{content[activeSection].description}</p>
            </div>

            <div className="space-y-6">
              {content[activeSection].details.map((detail, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold mb-2">{detail.subtitle}</h3>
                  <p className="text-secondary">{detail.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Additional Resources</h2>
            <p className="section-subtitle">
              Further reading and resources to deepen your understanding
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Official Documentation</h3>
              <ul className="space-y-2 text-secondary">
                <li>• OAuth2 RFC 6749</li>
                <li>• OpenID Connect Core 1.0</li>
                <li>• OAuth2 Security Best Practices</li>
                <li>• PKCE RFC 7636</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Implementation Guides</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Spring Security OAuth2</li>
                <li>• React OIDC Client</li>
                <li>• OAuth2 Provider Setup</li>
                <li>• Security Testing Tools</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OAuthFundamentals;