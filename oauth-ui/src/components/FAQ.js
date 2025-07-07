import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const getQuestionKey = (categoryTitle, question) => `${categoryTitle}::${question}`;

  const toggleItem = (key) => {
    setOpenItem(openItem === key ? null : key);
  };

  const handleCopy = (answer, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(answer).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = answer;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
      } catch (err) {}
      document.body.removeChild(textarea);
    }
  };

  // 30 best and important questions for each section
  const faqCategories = [
    {
      title: 'Basic OAuth2 Questions',
      icon: '🔰',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      questions: [
        { question: 'What is OAuth2?', answer: 'OAuth2 is an authorization framework that allows third-party applications to access user resources without sharing credentials.', tags: ['fundamentals', 'security'] },
        { question: 'What is the difference between OAuth2 and OpenID Connect?', answer: 'OAuth2 is for authorization, OpenID Connect (OIDC) is for authentication built on top of OAuth2.', tags: ['fundamentals', 'oidc'] },
        { question: 'What is an access token?', answer: 'A credential used to access protected resources, issued by the authorization server.', tags: ['tokens'] },
        { question: 'What is a refresh token?', answer: 'A credential used to obtain new access tokens without user interaction.', tags: ['tokens'] },
        { question: 'What is a client ID?', answer: 'A public identifier for apps, issued by the authorization server.', tags: ['client'] },
        { question: 'What is a client secret?', answer: 'A confidential value used by confidential clients to authenticate to the authorization server.', tags: ['client'] },
        { question: 'What is a redirect URI?', answer: 'The endpoint to which the authorization server sends the user after authorization.', tags: ['redirect'] },
        { question: 'What is the state parameter?', answer: 'Used to prevent CSRF attacks and maintain state between request and callback.', tags: ['security'] },
        { question: 'What is the scope parameter?', answer: 'Specifies the level of access requested by the client.', tags: ['scopes'] },
        { question: 'What is the audience parameter?', answer: 'Specifies the intended recipient of the token.', tags: ['tokens'] },
        { question: 'What is the authorization server?', answer: 'Responsible for authenticating users and issuing tokens.', tags: ['architecture'] },
        { question: 'What is the resource server?', answer: 'Hosts protected resources and validates access tokens.', tags: ['architecture'] },
        { question: 'What is the OAuth2 client?', answer: 'The application requesting access to protected resources.', tags: ['architecture'] },
        { question: 'What is the Authorization Code flow?', answer: 'The most secure OAuth2 flow, used by web apps to obtain tokens via a backend server.', tags: ['flows'] },
        { question: 'What is the Implicit flow?', answer: 'A legacy OAuth2 flow for browser-based apps, now discouraged in favor of Authorization Code with PKCE.', tags: ['flows'] },
        { question: 'What is PKCE?', answer: 'Proof Key for Code Exchange, a security extension for OAuth2 that prevents code interception attacks.', tags: ['security', 'pkce'] },
        { question: 'What is the client credentials flow?', answer: 'Used for server-to-server authentication, where no user is involved.', tags: ['flows'] },
        { question: 'What is the Resource Owner Password flow?', answer: 'A legacy flow where the user provides credentials directly to the client. Not recommended.', tags: ['flows'] },
        { question: 'What is the Device Authorization flow?', answer: 'Used for devices with limited input capabilities, like smart TVs.', tags: ['flows'] },
        { question: 'What is consent in OAuth2?', answer: 'The process where the user approves the permissions requested by the client.', tags: ['consent'] },
        { question: 'What is token expiration?', answer: 'The time after which a token is no longer valid.', tags: ['tokens'] },
        { question: 'What is token revocation?', answer: 'The process of invalidating a token before it expires.', tags: ['tokens'] },
        { question: 'What is token introspection?', answer: 'A process where a resource server validates a token by querying the authorization server.', tags: ['tokens'] },
        { question: 'What is OpenID Connect?', answer: 'An authentication layer built on top of OAuth2.', tags: ['oidc'] },
        { question: 'What is an ID token?', answer: 'A token used in OIDC to convey identity information about the user.', tags: ['oidc', 'tokens'] },
        { question: 'What is the userinfo endpoint?', answer: 'An OIDC endpoint that returns user profile information.', tags: ['oidc'] },
        { question: 'What is a refresh token rotation?', answer: 'A security technique where a new refresh token is issued each time the old one is used.', tags: ['security', 'tokens'] },
        { question: 'What is the difference between authorization and authentication?', answer: 'Authorization is about permissions, authentication is about identity.', tags: ['fundamentals'] },
        { question: 'What is a bearer token?', answer: 'A token that grants access to a resource, where possession of the token is sufficient for access.', tags: ['tokens'] },
        { question: 'What is the purpose of the response_type parameter?', answer: 'Indicates which OAuth2 flow is being used (e.g., code, token).', tags: ['flows'] },
      ],
    },
    {
      title: 'Intermediate OAuth2 Questions',
      icon: '⚡',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      questions: [
        { question: 'How should I securely store OAuth2 tokens?', answer: 'Store access tokens in memory for web applications, use secure storage for mobile apps, and never store them in localStorage or cookies.', tags: ['security', 'implementation'] },
        { question: 'What are common OAuth2 security vulnerabilities?', answer: 'Authorization code interception, CSRF, open redirect, token storage vulnerabilities, insufficient scope validation.', tags: ['security', 'vulnerabilities'] },
        { question: 'How do I implement proper token validation?', answer: 'Check signature, issuer, audience, expiration, issued at, and custom claims.', tags: ['implementation', 'security'] },
        { question: 'How do I integrate OAuth2 with Spring Boot?', answer: 'Use Spring Security OAuth2 Client, configure properties, set up security config, and implement custom user service if needed.', tags: ['implementation', 'spring'] },
        { question: 'What are best practices for OAuth2 in React apps?', answer: 'Use libraries like oidc-client-js, implement silent token renewal, secure token storage, error handling, and state management.', tags: ['implementation', 'react'] },
        { question: 'How do I handle OAuth2 token refresh?', answer: 'Implement automatic token refresh, secure storage, rotation, error handling, and fallback to re-authentication.', tags: ['implementation', 'tokens'] },
        { question: 'How do I debug OAuth2 authentication issues?', answer: 'Inspect network requests, check provider logs, validate redirect URIs, verify client credentials, check token contents, monitor logs, use debugging tools.', tags: ['debugging', 'troubleshooting'] },
        { question: 'What are common OAuth2 error codes?', answer: 'invalid_client, invalid_grant, invalid_redirect_uri, invalid_scope, access_denied, server_error.', tags: ['troubleshooting', 'errors'] },
        { question: 'How do I implement OAuth2 logout?', answer: 'Implement client-side and server-side logout, use OIDC end session endpoint, clear session data, implement logout confirmation.', tags: ['implementation', 'logout'] },
        { question: 'How do I implement role-based access control?', answer: 'Use OAuth2 scopes for permissions, custom claims for roles, validate scopes and roles on client and server.', tags: ['implementation', 'rbac'] },
        { question: 'What is the difference between public and confidential clients?', answer: 'Public clients cannot keep secrets (e.g., SPAs), confidential clients can (e.g., server apps).', tags: ['client'] },
        { question: 'How do I use the state parameter securely?', answer: 'Generate a random value, store it in session, verify it on callback.', tags: ['security'] },
        { question: 'What is the purpose of the nonce parameter in OIDC?', answer: 'Prevents replay attacks by binding the ID token to the authentication request.', tags: ['oidc', 'security'] },
        { question: 'How do I validate an ID token?', answer: 'Check signature, issuer, audience, expiration, nonce, and claims.', tags: ['oidc', 'security'] },
        { question: 'What is token binding?', answer: 'A technique to bind a token to a specific client or device, preventing token theft.', tags: ['security'] },
        { question: 'How do I implement consent screens?', answer: 'Show requested scopes, allow user to approve/deny, record consent, and handle consent withdrawal.', tags: ['consent'] },
        { question: 'What is dynamic client registration?', answer: 'Allows clients to register with the authorization server at runtime.', tags: ['client'] },
        { question: 'How do I implement multi-factor authentication with OAuth2?', answer: 'Integrate MFA at the authorization server, require additional verification during login.', tags: ['security', 'mfa'] },
        { question: 'What is the difference between access and ID tokens?', answer: 'Access tokens are for resource access, ID tokens are for user identity.', tags: ['tokens', 'oidc'] },
        { question: 'How do I handle token revocation?', answer: 'Implement a revocation endpoint, allow clients to revoke tokens, and check token status on the resource server.', tags: ['tokens', 'security'] },
        { question: 'What is the purpose of the prompt parameter?', answer: 'Controls whether the user is prompted for login or consent.', tags: ['oidc'] },
        { question: 'How do I implement token introspection?', answer: 'Expose an endpoint for resource servers to validate tokens with the authorization server.', tags: ['tokens'] },
        { question: 'What is the difference between implicit and hybrid flows?', answer: 'Implicit flow is for SPAs (now discouraged), hybrid flow combines code and token for OIDC.', tags: ['flows', 'oidc'] },
        { question: 'How do I secure redirect URIs?', answer: 'Use exact matching, HTTPS, and avoid wildcards.', tags: ['security', 'redirect'] },
        { question: 'What is the difference between offline_access and online_access scopes?', answer: 'offline_access allows refresh tokens, online_access is for immediate access.', tags: ['scopes'] },
        { question: 'How do I implement token expiration and renewal?', answer: 'Set short lifetimes for access tokens, use refresh tokens for renewal.', tags: ['tokens'] },
        { question: 'What is the purpose of the audience claim?', answer: 'Specifies the intended recipient of the token.', tags: ['tokens'] },
        { question: 'How do I handle user consent withdrawal?', answer: 'Allow users to revoke consent, remove granted scopes, and invalidate tokens.', tags: ['consent'] },
        { question: 'What is the difference between SSO and OAuth2?', answer: 'SSO is a use case, OAuth2 is a protocol. OAuth2 can enable SSO.', tags: ['fundamentals'] },
        { question: 'How do I implement PKCE in SPAs?', answer: 'Generate a code verifier and challenge, use them in the authorization request and token exchange.', tags: ['pkce', 'security'] },
      ],
    },
    {
      title: 'Expert OAuth2 Questions',
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      questions: [
        { question: 'How do I implement OAuth2 token introspection with caching?', answer: 'Use Redis or in-memory caching for introspection results, implement cache invalidation, and handle introspection failures gracefully.', tags: ['advanced', 'caching'] },
        { question: 'How do I implement JWT token rotation?', answer: 'Issue new JWTs on refresh, use refresh token rotation, and validate old tokens for revocation.', tags: ['advanced', 'security'] },
        { question: 'How do I implement mutual TLS authentication?', answer: 'Configure mTLS on the authorization server, require client certificates, and validate them on each request.', tags: ['advanced', 'mTLS'] },
        { question: 'How do I use hardware security modules (HSM) with OAuth2?', answer: 'Store signing keys in HSMs, use them for token signing and validation, and rotate keys securely.', tags: ['advanced', 'hsm'] },
        { question: 'How do I implement zero-knowledge proofs in OAuth2?', answer: 'Use ZKP libraries to prove identity or claims without revealing secrets, integrate with the authorization server.', tags: ['advanced', 'zkp'] },
        { question: 'How do I implement blockchain-based identity with OAuth2?', answer: 'Use decentralized identifiers (DIDs), smart contracts, and blockchain-based claims in the OAuth2 flow.', tags: ['advanced', 'blockchain'] },
        { question: 'How do I implement quantum-resistant cryptography in OAuth2?', answer: 'Use quantum-safe algorithms for key exchange and token signing, and update libraries as standards evolve.', tags: ['advanced', 'quantum'] },
        { question: 'How do I implement homomorphic encryption in OAuth2?', answer: 'Use homomorphic encryption for sensitive data, process encrypted data without decryption, and manage keys securely.', tags: ['advanced', 'encryption'] },
        { question: 'How do I implement federated identity management?', answer: 'Integrate with multiple identity providers, use SAML or OIDC federation, and manage user mapping.', tags: ['advanced', 'federation'] },
        { question: 'How do I implement attribute-based access control (ABAC)?', answer: 'Use user and resource attributes in access decisions, enforce policies at the resource server.', tags: ['advanced', 'abac'] },
        { question: 'How do I implement fine-grained scopes and permissions?', answer: 'Define granular scopes, use claims for detailed permissions, and validate on the resource server.', tags: ['advanced', 'scopes'] },
        { question: 'How do I secure OAuth2 for microservices?', answer: 'Use JWTs for stateless auth, validate tokens at each service, and use service-to-service scopes.', tags: ['advanced', 'microservices'] },
        { question: 'How do I implement distributed session management?', answer: 'Use centralized token storage, synchronize revocation, and propagate logout events.', tags: ['advanced', 'sessions'] },
        { question: 'How do I implement consent management at scale?', answer: 'Store user consents, allow granular consent, and provide consent dashboards.', tags: ['advanced', 'consent'] },
        { question: 'How do I implement OAuth2 for IoT devices?', answer: 'Use device flow, secure device credentials, and limit token lifetimes.', tags: ['advanced', 'iot'] },
        { question: 'How do I implement OAuth2 for mobile apps?', answer: 'Use PKCE, secure token storage, and handle app switching securely.', tags: ['advanced', 'mobile'] },
        { question: 'How do I implement OAuth2 for SPAs?', answer: 'Use Authorization Code with PKCE, store tokens in memory, and handle silent renewals.', tags: ['advanced', 'spa'] },
        { question: 'How do I implement OAuth2 for APIs?', answer: 'Use client credentials flow, validate scopes, and use API gateways for enforcement.', tags: ['advanced', 'api'] },
        { question: 'How do I implement OAuth2 for B2B scenarios?', answer: 'Support multi-tenancy, delegated admin, and partner integrations.', tags: ['advanced', 'b2b'] },
        { question: 'How do I implement OAuth2 for B2C scenarios?', answer: 'Support social login, user registration, and consent management.', tags: ['advanced', 'b2c'] },
        { question: 'How do I implement OAuth2 for healthcare?', answer: 'Comply with regulations (e.g., HIPAA), use SMART on FHIR, and secure PHI.', tags: ['advanced', 'healthcare'] },
        { question: 'How do I implement OAuth2 for financial services?', answer: 'Comply with regulations (e.g., PSD2), use strong customer authentication, and secure transactions.', tags: ['advanced', 'finance'] },
        { question: 'How do I implement OAuth2 for government?', answer: 'Support eIDAS, integrate with national ID providers, and ensure data sovereignty.', tags: ['advanced', 'government'] },
        { question: 'How do I implement OAuth2 for education?', answer: 'Integrate with campus identity providers, support SSO, and manage student consent.', tags: ['advanced', 'education'] },
        { question: 'How do I implement OAuth2 for enterprise SSO?', answer: 'Integrate with corporate directories, support SAML/OIDC, and manage user provisioning.', tags: ['advanced', 'sso'] },
        { question: 'How do I implement OAuth2 for SaaS platforms?', answer: 'Support tenant isolation, delegated admin, and API access management.', tags: ['advanced', 'saas'] },
        { question: 'How do I implement OAuth2 for legacy systems?', answer: 'Use API gateways, protocol adapters, and token translation.', tags: ['advanced', 'legacy'] },
        { question: 'How do I implement OAuth2 for serverless architectures?', answer: 'Use JWTs, validate tokens in functions, and manage secrets securely.', tags: ['advanced', 'serverless'] },
        { question: 'How do I implement OAuth2 for cross-domain SSO?', answer: 'Use federated identity, trust relationships, and secure cookies.', tags: ['advanced', 'cross-domain'] },
        { question: 'How do I implement OAuth2 for partner integrations?', answer: 'Use partner-specific clients, scopes, and consent flows.', tags: ['advanced', 'partner'] },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0);

  const allTags = [...new Set(faqCategories.flatMap(cat => cat.questions.flatMap(q => q.tags)))];

  const additionalResources = [
    {
      title: 'Official Documentation',
      icon: '📚',
      items: [
        'OAuth2 RFC 6749',
        'OpenID Connect Core 1.0',
        'OAuth2 Security Best Practices',
        'PKCE RFC 7636'
      ]
    },
    {
      title: 'Implementation Guides',
      icon: '🔧',
      items: [
        'Spring Security OAuth2',
        'React OIDC Client',
        'OAuth2 Provider Setup',
        'Security Testing Tools'
      ]
    },
    {
      title: 'Security Tools',
      icon: '🛡️',
      items: [
        'OWASP ZAP',
        'Burp Suite',
        'OAuth2 Playground',
        'JWT.io Debugger'
      ]
    }
  ];

  const filteredQuestions = faqCategories[activeCategory].questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      {/* Simple Heading */}
      <h2 className="faq-simple-heading">OAuth2 & OIDC Interview Questions</h2>

      {/* Search Bar */}
      <div className="faq-search-bar">
        <input
          type="text"
          className="faq-search-input"
          placeholder="Search questions or answers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className="category-nav">
        {faqCategories.map((cat, idx) => (
          <button
            key={cat.title}
            className={`category-btn${activeCategory === idx ? ' active' : ''}`}
            onClick={() => {
              setActiveCategory(idx);
              setOpenItem(null);
            }}
          >
            <span className="category-btn-icon" role="img" aria-label="icon">{cat.icon}</span>
            {cat.title.replace('OAuth2 ', '')}
            <span className="category-badge">{cat.questions.length}</span>
          </button>
        ))}
      </div>

      {/* FAQ Grid */}
      <div className="faq-grid">
        {filteredQuestions.map((q, i) => {
          const key = `${activeCategory}-${i}`;
          const isOpen = openItem === key;
          return (
            <div className={`faq-card${isOpen ? ' open' : ''}`} key={key}>
              <div className="faq-card-header-row">
                <div className="faq-card-badges">
                  {q.tags && q.tags.map(tag => (
                    <span className="faq-badge tag" key={tag}>{tag.toUpperCase()}</span>
                  ))}
                </div>
                <span
                  className={`faq-toggle-icon${isOpen ? ' open' : ''}`}
                  onClick={() => setOpenItem(isOpen ? null : key)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                >
                  {isOpen ? <>&#8722;</> : <>&#43;</>}
                </span>
              </div>
              <div className="faq-question-text">{q.question}</div>
              {isOpen && (
                <div className="faq-answer open"> 
                  <div className="faq-answer-content">
                    <div style={{marginTop: '1.1rem'}}>{q.answer}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section Divider before Additional Resources */}
      <hr className="faq-section-divider" />

      {/* Additional Resources */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Additional Resources</h2>
          <p className="section-subtitle">
            Further reading and tools to enhance your OAuth2 knowledge and implementation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalResources.map((resource, index) => (
            <div key={index} className="content-section group hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="text-lg font-semibold text-primary">{resource.title}</h3>
              </div>
              <ul className="space-y-3">
                {resource.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3 text-secondary group-hover:text-primary transition-colors">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                    <span className="hover:underline cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Quick Reference</h2>
          <p className="section-subtitle">
            Essential OAuth2 concepts and terminology for quick reference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="content-section">
            <h3 className="text-lg font-semibold mb-4 text-primary">OAuth2 Terms</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium text-blue-700">Resource Owner:</span>
                <span className="text-blue-600 ml-2">The user who owns the resource</span>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-green-700">Client:</span>
                <span className="text-green-600 ml-2">The application requesting access</span>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <span className="font-medium text-purple-700">Authorization Server:</span>
                <span className="text-purple-600 ml-2">Issues tokens after user consent</span>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <span className="font-medium text-orange-700">Resource Server:</span>
                <span className="text-orange-600 ml-2">Hosts protected resources</span>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3 className="text-lg font-semibold mb-4 text-primary">Common Scopes</h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <span className="font-medium text-indigo-700">openid:</span>
                <span className="text-indigo-600 ml-2">OpenID Connect authentication</span>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <span className="font-medium text-pink-700">profile:</span>
                <span className="text-pink-600 ml-2">Basic profile information</span>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <span className="font-medium text-teal-700">email:</span>
                <span className="text-teal-600 ml-2">Email address access</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <span className="font-medium text-amber-700">offline_access:</span>
                <span className="text-amber-600 ml-2">Refresh token access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="content-section bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FAQ Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">{faqCategories.length}</div>
                <div className="text-primary-100">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)}</div>
                <div className="text-primary-100">Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{allTags.length}</div>
                <div className="text-primary-100">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 