import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('basic');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const faqData = {
    basic: [
      {
        id: 'basic-1',
        question: 'Why use short-lived JWTs if revocation is hard?',
        answer: 'Short TTL minimizes misuse window; combine with refresh rotation & blacklists. Short-lived tokens reduce the attack surface and limit the damage if compromised.',
        category: 'JWT Security',
        difficulty: 'Basic'
      },
      {
        id: 'basic-2',
        question: 'Should I store JWTs in localStorage or cookies?',
        answer: 'Use HttpOnly, Secure, SameSite cookies to prevent XSS & CSRF. localStorage is vulnerable to XSS attacks, while HttpOnly cookies provide better security.',
        category: 'Token Storage',
        difficulty: 'Basic'
      },
      {
        id: 'basic-3',
        question: 'How often should I rotate signing keys?',
        answer: 'At least quarterly or after any suspected compromise; automate via JWKS. Regular key rotation is crucial for maintaining security.',
        category: 'Key Management',
        difficulty: 'Basic'
      },
      {
        id: 'basic-4',
        question: "What's PKCE and why is it needed?",
        answer: 'Proof Key for Code Exchange protects the Authorization Code flow in public clients. It prevents authorization code interception attacks.',
        category: 'PKCE',
        difficulty: 'Basic'
      },
      {
        id: 'basic-5',
        question: 'Can I mix opaque tokens with JWTs?',
        answer: 'Yes—opaque for refresh tokens, JWT for access tokens to keep size down. This hybrid approach provides security and performance benefits.',
        category: 'Token Types',
        difficulty: 'Basic'
      },
      {
        id: 'basic-6',
        question: 'How to handle multi-tenant key management?',
        answer: 'Use separate key pairs per tenant or include kid in JWT header and route via JWKS. This ensures proper isolation between tenants.',
        category: 'Multi-tenancy',
        difficulty: 'Basic'
      },
      {
        id: 'basic-7',
        question: "What's the difference between scopes and roles?",
        answer: 'Scopes are API permissions; roles are higher-level groupings of permissions. Scopes define what resources can be accessed.',
        category: 'Authorization',
        difficulty: 'Basic'
      },
      {
        id: 'basic-8',
        question: 'Is OAuth2 secure for mobile apps?',
        answer: 'Yes, using Authorization Code + PKCE—never use Implicit flow. PKCE is essential for mobile app security.',
        category: 'Mobile Security',
        difficulty: 'Basic'
      },
      {
        id: 'basic-9',
        question: 'How do I log out a user on all devices?',
        answer: 'Revoke all refresh tokens or bump a global token-version in user record. This ensures complete session termination.',
        category: 'Session Management',
        difficulty: 'Basic'
      },
      {
        id: 'basic-10',
        question: 'How to monitor token misuse?',
        answer: 'Log auth events centrally, alert on refresh storms or invalid JWT errors. Monitoring is crucial for detecting attacks.',
        category: 'Monitoring',
        difficulty: 'Basic'
      },
      {
        id: 'basic-11',
        question: 'What is the difference between OAuth2 and OIDC?',
        answer: 'OAuth2 is for authorization (what you can do), OIDC is for authentication (who you are). OIDC extends OAuth2 with identity layer.',
        category: 'OAuth2 vs OIDC',
        difficulty: 'Basic'
      },
      {
        id: 'basic-12',
        question: 'What are the main OAuth2 grant types?',
        answer: 'Authorization Code, Implicit, Resource Owner Password Credentials, Client Credentials, and Refresh Token. Authorization Code is most secure.',
        category: 'Grant Types',
        difficulty: 'Basic'
      },
      {
        id: 'basic-13',
        question: 'How do you validate a JWT token?',
        answer: 'Check signature, verify issuer, audience, expiration time, and not-before time. Use public key from JWKS endpoint.',
        category: 'JWT Validation',
        difficulty: 'Basic'
      },
      {
        id: 'basic-14',
        question: 'What is a refresh token?',
        answer: 'A long-lived token used to obtain new access tokens without user interaction. Should be stored securely and rotated regularly.',
        category: 'Token Types',
        difficulty: 'Basic'
      },
      {
        id: 'basic-15',
        question: 'What is the purpose of the state parameter?',
        answer: 'Prevents CSRF attacks by ensuring the response comes from the same request. Should be random and validated.',
        category: 'Security',
        difficulty: 'Basic'
      },
      {
        id: 'basic-16',
        question: 'How do you handle token expiration?',
        answer: 'Use refresh tokens to get new access tokens, or redirect user to re-authenticate. Implement proper error handling.',
        category: 'Token Management',
        difficulty: 'Basic'
      },
      {
        id: 'basic-17',
        question: 'What is the redirect URI in OAuth2?',
        answer: 'The URL where the authorization server sends the user after authentication. Must be pre-registered and validated.',
        category: 'OAuth2 Flow',
        difficulty: 'Basic'
      },
      {
        id: 'basic-18',
        question: 'What are OAuth2 scopes?',
        answer: 'Permissions that define what resources the application can access. Examples: read, write, admin, profile, email.',
        category: 'Authorization',
        difficulty: 'Basic'
      },
      {
        id: 'basic-19',
        question: 'How do you secure OAuth2 in production?',
        answer: 'Use HTTPS, implement PKCE, validate redirect URIs, use short-lived tokens, implement proper error handling.',
        category: 'Security',
        difficulty: 'Basic'
      },
      {
        id: 'basic-20',
        question: 'What is the difference between public and confidential clients?',
        answer: 'Public clients cannot keep secrets (mobile apps, SPAs), confidential clients can (server-side apps). Different security requirements.',
        category: 'Client Types',
        difficulty: 'Basic'
      },
      {
        id: 'basic-21',
        question: 'What is token introspection?',
        answer: 'A way to check if a token is valid by asking the authorization server. Useful for opaque tokens.',
        category: 'Token Validation',
        difficulty: 'Basic'
      },
      {
        id: 'basic-22',
        question: 'How do you implement logout in OAuth2?',
        answer: 'Revoke tokens, clear client-side storage, redirect to logout endpoint. Consider end-session endpoint for OIDC.',
        category: 'Session Management',
        difficulty: 'Basic'
      },
      {
        id: 'basic-23',
        question: 'What is the purpose of the nonce parameter?',
        answer: 'Prevents replay attacks in OIDC by ensuring ID tokens are used only once. Should be random and validated.',
        category: 'OIDC Security',
        difficulty: 'Basic'
      },
      {
        id: 'basic-24',
        question: 'How do you handle OAuth2 errors?',
        answer: 'Check error codes (invalid_request, invalid_client, invalid_grant, etc.), implement proper error handling and user feedback.',
        category: 'Error Handling',
        difficulty: 'Basic'
      },
      {
        id: 'basic-25',
        question: 'What is the difference between access and ID tokens?',
        answer: 'Access tokens are for API access, ID tokens contain user identity information. ID tokens are JWTs, access tokens can be opaque.',
        category: 'Token Types',
        difficulty: 'Basic'
      },
      {
        id: 'basic-26',
        question: 'How do you implement OAuth2 in a web application?',
        answer: 'Use Authorization Code flow with PKCE, store tokens securely, implement proper redirect handling and error management.',
        category: 'Implementation',
        difficulty: 'Basic'
      },
      {
        id: 'basic-27',
        question: 'What is the purpose of the client_id?',
        answer: 'Identifies the application to the authorization server. Must be registered and validated.',
        category: 'OAuth2 Basics',
        difficulty: 'Basic'
      },
      {
        id: 'basic-28',
        question: 'How do you handle OAuth2 in microservices?',
        answer: 'Use JWT tokens, implement token validation, consider centralized auth service, use proper service-to-service authentication.',
        category: 'Microservices',
        difficulty: 'Basic'
      },
      {
        id: 'basic-29',
        question: 'What is the difference between authorization and authentication?',
        answer: 'Authentication verifies identity (who you are), authorization determines permissions (what you can do). OAuth2 handles authorization.',
        category: 'Concepts',
        difficulty: 'Basic'
      },
      {
        id: 'basic-30',
        question: 'How do you test OAuth2 implementations?',
        answer: 'Use OAuth2 testing tools, test all flows, validate error scenarios, test token validation, use mock authorization servers.',
        category: 'Testing',
        difficulty: 'Basic'
      }
    ],
    advanced: [
      {
        id: 'advanced-1',
        question: 'Explain the OAuth2 Authorization Code flow with PKCE.',
        answer: 'User agent requests /authorize with code_challenge; after login, app exchanges code + code_verifier at /token; PKCE prevents interception of auth code by ensuring only the original client can redeem it. The code_challenge is a SHA256 hash of the code_verifier.',
        category: 'OAuth2 Flow',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-2',
        question: 'How would you implement immediate JWT revocation?',
        answer: 'Embed a jti and session version in JWT; store active jti in Redis/DB; on logout, mark it revoked; API checks jti on each request. This provides real-time revocation capabilities.',
        category: 'JWT Revocation',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-3',
        question: 'What are the security risks of using localStorage for tokens?',
        answer: 'Vulnerable to XSS theft; better to use HttpOnly cookies, and store minimal data client-side. localStorage is accessible via JavaScript, making it a target for XSS attacks.',
        category: 'Security Risks',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-4',
        question: "Compare OAuth2's Client Credentials vs. Authorization Code grants.",
        answer: 'Client Credentials is machine-to-machine: no user context. Authorization Code is user-centric: requires user login, consent, and returns ID Token. Choose based on the use case.',
        category: 'Grant Types',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-5',
        question: 'How do you secure microservices with JWTs and prevent replay attacks?',
        answer: 'Use HTTPS, short TTL, nonce or jti checks, HTTPS mutual TLS for service-to-service, and rotate keys often. Implement proper token validation and monitoring.',
        category: 'Microservices Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-6',
        question: 'Explain JWT signature verification and key rotation strategies.',
        answer: 'Verify signature using public key from JWKS; implement key rotation with overlapping validity periods; use kid header to identify signing key; cache JWKS for performance.',
        category: 'JWT Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-7',
        question: 'How to implement OAuth2 with multiple identity providers?',
        answer: 'Use OIDC discovery endpoints; implement provider-specific adapters; handle different claim formats; implement proper error handling and fallback mechanisms.',
        category: 'Multi-Provider',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-8',
        question: 'What are the security implications of JWT size limitations?',
        answer: 'Large JWTs impact performance; consider using opaque tokens for large claims; implement claim compression; use external storage for non-essential data.',
        category: 'Performance',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-9',
        question: 'How to implement OAuth2 in a serverless architecture?',
        answer: 'Use stateless JWT validation; implement proper caching strategies; handle cold starts; use managed services for token storage and validation.',
        category: 'Serverless',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-10',
        question: 'Explain OAuth2 threat models and mitigation strategies.',
        answer: 'Threats include CSRF, XSS, authorization code interception, token theft; mitigate with PKCE, proper redirect URIs, secure token storage, and comprehensive monitoring.',
        category: 'Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-11',
        question: 'How to implement OAuth2 with custom claims and user attributes?',
        answer: 'Extend JWT with custom claims; implement claim mapping; validate claim format; consider privacy implications; implement claim filtering.',
        category: 'Custom Claims',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-12',
        question: 'What are the performance implications of JWT validation?',
        answer: 'Signature verification is CPU-intensive; implement caching; use CDN for JWKS; consider token size; optimize validation algorithms.',
        category: 'Performance',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-13',
        question: 'How to implement OAuth2 with API rate limiting?',
        answer: 'Use token-based rate limiting; implement sliding windows; consider user vs client limits; use Redis for distributed rate limiting.',
        category: 'Rate Limiting',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-14',
        question: 'Explain OAuth2 consent and authorization patterns.',
        answer: 'Implement granular consent; use scopes for permission grouping; implement consent revocation; provide clear consent UI; audit consent changes.',
        category: 'Consent Management',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-15',
        question: 'How to implement OAuth2 with event-driven architecture?',
        answer: 'Publish auth events; implement event sourcing; use message queues; handle event ordering; implement event replay capabilities.',
        category: 'Event-Driven',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-16',
        question: 'What are the security considerations for OAuth2 in IoT devices?',
        answer: 'Use device certificates; implement constrained tokens; handle offline scenarios; implement secure key storage; use lightweight protocols.',
        category: 'IoT Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-17',
        question: 'How to implement OAuth2 with blockchain-based identity?',
        answer: 'Use DIDs (Decentralized Identifiers); implement verifiable credentials; handle on-chain verification; integrate with traditional OAuth2 flows.',
        category: 'Blockchain',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-18',
        question: 'Explain OAuth2 federation and trust relationships.',
        answer: 'Establish trust between providers; implement metadata exchange; handle certificate validation; implement proper error handling; consider legal agreements.',
        category: 'Federation',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-19',
        question: 'How to implement OAuth2 with zero-knowledge proofs?',
        answer: 'Use selective disclosure; implement proof generation; validate proofs; consider privacy implications; integrate with existing flows.',
        category: 'Privacy',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-20',
        question: 'What are the implications of OAuth2 in edge computing?',
        answer: 'Implement edge token validation; use distributed JWKS; handle network partitions; implement eventual consistency; optimize for low latency.',
        category: 'Edge Computing',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-21',
        question: 'How to implement OAuth2 with quantum-resistant cryptography?',
        answer: 'Use post-quantum algorithms; implement hybrid schemes; plan for migration; maintain backward compatibility; monitor quantum computing developments.',
        category: 'Quantum Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-22',
        question: 'Explain OAuth2 with homomorphic encryption.',
        answer: 'Process encrypted data; implement secure computation; handle performance implications; consider use cases; implement proper key management.',
        category: 'Advanced Crypto',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-23',
        question: 'How to implement OAuth2 with differential privacy?',
        answer: 'Add noise to data; implement privacy budgets; handle utility vs privacy trade-offs; consider regulatory compliance; implement proper auditing.',
        category: 'Privacy',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-24',
        question: 'What are the security implications of OAuth2 in 5G networks?',
        answer: 'Handle network slicing; implement edge authentication; consider latency requirements; implement proper key management; handle roaming scenarios.',
        category: '5G Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-25',
        question: 'How to implement OAuth2 with federated learning?',
        answer: 'Share models securely; implement privacy-preserving aggregation; handle model poisoning; consider regulatory compliance; implement proper auditing.',
        category: 'ML Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-26',
        question: 'Explain OAuth2 with secure multi-party computation.',
        answer: 'Compute on distributed data; implement secure protocols; handle performance implications; consider trust assumptions; implement proper key management.',
        category: 'Advanced Crypto',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-27',
        question: 'How to implement OAuth2 with confidential computing?',
        answer: 'Use trusted execution environments; implement attestation; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Confidential Computing',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-28',
        question: 'What are the implications of OAuth2 in satellite communications?',
        answer: 'Handle high latency; implement offline capabilities; consider bandwidth constraints; implement proper key management; handle intermittent connectivity.',
        category: 'Satellite Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-29',
        question: 'How to implement OAuth2 with post-quantum signatures?',
        answer: 'Use quantum-resistant algorithms; implement hybrid schemes; plan for migration; maintain backward compatibility; monitor quantum computing developments.',
        category: 'Quantum Security',
        difficulty: 'Advanced'
      },
      {
        id: 'advanced-30',
        question: 'Explain OAuth2 with secure hardware modules.',
        answer: 'Use HSMs for key storage; implement secure key generation; handle key backup; consider performance implications; implement proper monitoring.',
        category: 'Hardware Security',
        difficulty: 'Advanced'
      }
    ],
    expert: [
      {
        id: 'expert-1',
        question: 'Design a distributed OAuth2 system with high availability.',
        answer: 'Use distributed caching (Redis Cluster); implement stateless JWT validation; use load balancers with sticky sessions; implement circuit breakers and fallback mechanisms.',
        category: 'Architecture',
        difficulty: 'Expert'
      },
      {
        id: 'expert-2',
        question: 'How to implement OAuth2 with blockchain-based identity?',
        answer: 'Use DIDs (Decentralized Identifiers); implement verifiable credentials; handle on-chain verification; integrate with traditional OAuth2 flows.',
        category: 'Blockchain',
        difficulty: 'Expert'
      },
      {
        id: 'expert-3',
        question: 'Explain OAuth2 security in IoT environments.',
        answer: 'Use device certificates; implement constrained tokens; handle offline scenarios; implement secure key storage; use lightweight protocols.',
        category: 'IoT Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-4',
        question: 'How to implement OAuth2 with quantum-resistant cryptography?',
        answer: 'Use post-quantum algorithms; implement hybrid schemes; plan for migration; maintain backward compatibility; monitor quantum computing developments.',
        category: 'Quantum Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-5',
        question: 'Design an OAuth2 system for edge computing.',
        answer: 'Implement edge token validation; use distributed JWKS; handle network partitions; implement eventual consistency; optimize for low latency.',
        category: 'Edge Computing',
        difficulty: 'Expert'
      },
      {
        id: 'expert-6',
        question: 'How to implement OAuth2 with zero-knowledge proofs at scale?',
        answer: 'Use efficient ZKP protocols; implement batch verification; handle proof generation; consider privacy implications; implement proper key management.',
        category: 'Advanced Privacy',
        difficulty: 'Expert'
      },
      {
        id: 'expert-7',
        question: 'Design a quantum-secure OAuth2 system.',
        answer: 'Use post-quantum algorithms; implement quantum key distribution; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Quantum Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-8',
        question: 'How to implement OAuth2 with homomorphic encryption for privacy?',
        answer: 'Process encrypted data; implement secure computation; handle performance implications; consider use cases; implement proper key management.',
        category: 'Advanced Crypto',
        difficulty: 'Expert'
      },
      {
        id: 'expert-9',
        question: 'Design an OAuth2 system for satellite networks.',
        answer: 'Handle high latency; implement offline capabilities; consider bandwidth constraints; implement proper key management; handle intermittent connectivity.',
        category: 'Satellite Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-10',
        question: 'How to implement OAuth2 with secure multi-party computation?',
        answer: 'Compute on distributed data; implement secure protocols; handle performance implications; consider trust assumptions; implement proper key management.',
        category: 'Advanced Crypto',
        difficulty: 'Expert'
      },
      {
        id: 'expert-11',
        question: 'Design a privacy-preserving OAuth2 system.',
        answer: 'Implement differential privacy; use zero-knowledge proofs; handle privacy budgets; consider regulatory compliance; implement proper auditing.',
        category: 'Privacy',
        difficulty: 'Expert'
      },
      {
        id: 'expert-12',
        question: 'How to implement OAuth2 with confidential computing?',
        answer: 'Use trusted execution environments; implement attestation; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Confidential Computing',
        difficulty: 'Expert'
      },
      {
        id: 'expert-13',
        question: 'Design an OAuth2 system for quantum networks.',
        answer: 'Use quantum key distribution; implement quantum-resistant algorithms; handle quantum entanglement; consider performance implications; implement proper monitoring.',
        category: 'Quantum Networks',
        difficulty: 'Expert'
      },
      {
        id: 'expert-14',
        question: 'How to implement OAuth2 with federated learning?',
        answer: 'Share models securely; implement privacy-preserving aggregation; handle model poisoning; consider regulatory compliance; implement proper auditing.',
        category: 'ML Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-15',
        question: 'Design a post-quantum OAuth2 system.',
        answer: 'Use quantum-resistant algorithms; implement hybrid schemes; plan for migration; maintain backward compatibility; monitor quantum computing developments.',
        category: 'Quantum Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-16',
        question: 'How to implement OAuth2 with secure hardware modules?',
        answer: 'Use HSMs for key storage; implement secure key generation; handle key backup; consider performance implications; implement proper monitoring.',
        category: 'Hardware Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-17',
        question: 'Design an OAuth2 system for 6G networks.',
        answer: 'Handle terahertz communications; implement AI-driven security; consider energy efficiency; implement proper key management; handle massive connectivity.',
        category: '6G Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-18',
        question: 'How to implement OAuth2 with quantum machine learning?',
        answer: 'Use quantum algorithms; implement quantum neural networks; handle quantum advantage; consider performance implications; implement proper monitoring.',
        category: 'Quantum ML',
        difficulty: 'Expert'
      },
      {
        id: 'expert-19',
        question: 'Design a quantum-resistant OAuth2 system.',
        answer: 'Use post-quantum algorithms; implement quantum key distribution; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Quantum Security',
        difficulty: 'Expert'
      },
      {
        id: 'expert-20',
        question: 'How to implement OAuth2 with quantum internet?',
        answer: 'Use quantum entanglement; implement quantum repeaters; handle quantum memory; consider performance implications; implement proper monitoring.',
        category: 'Quantum Internet',
        difficulty: 'Expert'
      },
      {
        id: 'expert-21',
        question: 'Design an OAuth2 system for space-based computing.',
        answer: 'Handle radiation effects; implement fault tolerance; consider power constraints; implement proper key management; handle communication delays.',
        category: 'Space Computing',
        difficulty: 'Expert'
      },
      {
        id: 'expert-22',
        question: 'How to implement OAuth2 with quantum sensors?',
        answer: 'Use quantum sensing; implement quantum metrology; handle quantum noise; consider performance implications; implement proper monitoring.',
        category: 'Quantum Sensors',
        difficulty: 'Expert'
      },
      {
        id: 'expert-23',
        question: 'Design a quantum-secure OAuth2 system for IoT.',
        answer: 'Use quantum-resistant algorithms; implement quantum key distribution; handle constrained devices; consider performance implications; implement proper monitoring.',
        category: 'Quantum IoT',
        difficulty: 'Expert'
      },
      {
        id: 'expert-24',
        question: 'How to implement OAuth2 with quantum random number generation?',
        answer: 'Use quantum entropy; implement quantum random number generators; handle quantum noise; consider performance implications; implement proper monitoring.',
        category: 'Quantum Randomness',
        difficulty: 'Expert'
      },
      {
        id: 'expert-25',
        question: 'Design an OAuth2 system for quantum cloud computing.',
        answer: 'Use quantum processors; implement quantum algorithms; handle quantum advantage; consider performance implications; implement proper monitoring.',
        category: 'Quantum Cloud',
        difficulty: 'Expert'
      },
      {
        id: 'expert-26',
        question: 'How to implement OAuth2 with quantum-resistant signatures?',
        answer: 'Use post-quantum signature schemes; implement hybrid signatures; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Quantum Signatures',
        difficulty: 'Expert'
      },
      {
        id: 'expert-27',
        question: 'Design a quantum-secure OAuth2 system for edge computing.',
        answer: 'Use quantum-resistant algorithms; implement quantum key distribution; handle edge constraints; consider performance implications; implement proper monitoring.',
        category: 'Quantum Edge',
        difficulty: 'Expert'
      },
      {
        id: 'expert-28',
        question: 'How to implement OAuth2 with quantum-resistant encryption?',
        answer: 'Use post-quantum encryption schemes; implement hybrid encryption; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Quantum Encryption',
        difficulty: 'Expert'
      },
      {
        id: 'expert-29',
        question: 'Design a quantum-secure OAuth2 system for 5G/6G.',
        answer: 'Use quantum-resistant algorithms; implement quantum key distribution; handle network slicing; consider performance implications; implement proper monitoring.',
        category: 'Quantum Networks',
        difficulty: 'Expert'
      },
      {
        id: 'expert-30',
        question: 'How to implement OAuth2 with quantum-resistant authentication?',
        answer: 'Use post-quantum authentication schemes; implement quantum key distribution; handle key management; consider performance implications; implement proper monitoring.',
        category: 'Quantum Authentication',
        difficulty: 'Expert'
      }
    ]
  };

  const categories = [
    { id: 'basic', name: 'Basic Questions', icon: '🔰', count: faqData.basic.length },
    { id: 'advanced', name: 'Advanced Questions', icon: '⚡', count: faqData.advanced.length },
    { id: 'expert', name: 'Expert Questions', icon: '🚀', count: faqData.expert.length }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Basic': return '#28a745';
      case 'Advanced': return '#ffc107';
      case 'Expert': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'JWT Security': '#e74c3c',
      'Token Storage': '#3498db',
      'Key Management': '#f39c12',
      'PKCE': '#9b59b6',
      'Token Types': '#1abc9c',
      'Multi-tenancy': '#34495e',
      'Authorization': '#e67e22',
      'Mobile Security': '#2ecc71',
      'Session Management': '#95a5a6',
      'Monitoring': '#8e44ad',
      'OAuth2 Flow': '#16a085',
      'JWT Revocation': '#c0392b',
      'Security Risks': '#d35400',
      'Grant Types': '#27ae60',
      'Microservices Security': '#2980b9',
      'Multi-Provider': '#f1c40f',
      'Performance': '#e74c3c',
      'Serverless': '#3498db',
      'Security': '#e67e22',
      'Architecture': '#9b59b6',
      'Blockchain': '#1abc9c',
      'IoT Security': '#34495e',
      'Quantum Security': '#e74c3c',
      'Edge Computing': '#3498db'
    };
    return colors[category] || '#6c757d';
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>🔍 OAuth2 & OIDC Interview Questions</h1>
        <p>Comprehensive Q&A covering basic to expert-level concepts</p>
      </div>

      <div className="faq-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className="faq-content">
        <div className="faq-grid">
          {faqData[activeCategory].map((item) => (
            <div key={item.id} className="faq-card">
              <div 
                className={`faq-question ${expandedQuestions.has(item.id) ? 'expanded' : ''}`}
                onClick={() => toggleQuestion(item.id)}
              >
                <div className="question-header">
                  <div className="question-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(item.difficulty) }}
                    >
                      {item.difficulty}
                    </span>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(item.category) }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="question-toggle">
                    {expandedQuestions.has(item.id) ? '−' : '+'}
                  </div>
                </div>
                <h3 className="question-text">{item.question}</h3>
              </div>
              
              <div className={`faq-answer ${expandedQuestions.has(item.id) ? 'expanded' : ''}`}>
                <div className="answer-content">
                  <p>{item.answer}</p>
                </div>
                <div className="answer-footer">
                  <span className="answer-tip">💡 Tip: This is a common interview question!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="faq-footer">
        <div className="faq-stats">
          <div className="stat-item">
            <span className="stat-number">{Object.values(faqData).flat().length}</span>
            <span className="stat-label">Total Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{new Set(Object.values(faqData).flat().map(q => q.category)).size}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Difficulty Levels</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 