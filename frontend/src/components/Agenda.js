import React, { useState, useEffect, useRef } from 'react';
import './Agenda.css';

const Agenda = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Modern Application Security: From Monoliths to OAuth2 / OIDC and JWT Management",
      type: "title",
      content: {
        speaker: "Security Architect & Developer",
        date: new Date().toLocaleDateString(),
        objectives: [
          "Understand the evolution from session-based to token-based authentication",
          "Master OAuth2 and OpenID Connect fundamentals",
          "Implement secure JWT token management",
          "Learn best practices for modern application security"
        ]
      }
    },
    {
      id: 2,
      title: "Agenda",
      type: "agenda",
      content: {
        topics: [
          "Authentication vs Authorization",
          "Legacy Session-Based Authentication",
          "OAuth / OAuth2 Overview",
          "OpenID Connect (OIDC)",
          "JWT Anatomy & Token Types",
          "Token Lifecycle & Revocation",
          "Preventing Token Abuse",
          "End-to-End Flow (SPA + API + Auth Server)",
          "Best Practices & Tooling",
          "FAQs & Interview Questions"
        ]
      }
    },
    {
      id: 3,
      title: "Authentication vs Authorization",
      type: "comparison",
      content: {
        authentication: {
          title: "Authentication (AuthN)",
          description: "Proving identity - who you are",
          examples: [
            "Username/password verification",
            "Multi-factor authentication",
            "Biometric authentication",
            "Certificate-based authentication"
          ]
        },
        authorization: {
          title: "Authorization (AuthZ)",
          description: "Granting permissions - what you can do",
          examples: [
            "Role-based access control (RBAC)",
            "Resource-level permissions",
            "API endpoint access",
            "Data access policies"
          ]
        }
      }
    },
    {
      id: 4,
      title: "Authentication Methods",
      type: "methods",
      content: {
        methods: [
          {
            name: "Username/Password",
            description: "Traditional credential-based authentication",
            security: "bcrypt, Argon2 hashing",
            icon: "🔐"
          },
          {
            name: "Multi-Factor Authentication (MFA)",
            description: "Multiple verification factors",
            security: "TOTP, SMS, WebAuthn",
            icon: "🔢"
          },
          {
            name: "Certificate-based",
            description: "PKI-based authentication",
            security: "mTLS, client certificates",
            icon: "📜"
          },
          {
            name: "Federated Authentication",
            description: "External identity providers",
            security: "SAML, OIDC social login",
            icon: "🌐"
          }
        ]
      }
    },
    {
      id: 5,
      title: "Authorization Models",
      type: "models",
      content: {
        models: [
          {
            name: "Role-Based Access Control (RBAC)",
            description: "Permissions based on user roles",
            example: "Admin role → full access, User role → limited access",
            icon: "👥"
          },
          {
            name: "Attribute-Based Access Control (ABAC)",
            description: "Permissions based on attributes and policies",
            example: "Time-based access, location-based restrictions",
            icon: "🏷️"
          },
          {
            name: "Policy-Based Access Control (PBAC)",
            description: "External policy engines",
            example: "Open Policy Agent (OPA), custom policy engines",
            icon: "⚖️"
          }
        ]
      }
    },
    {
      id: 6,
      title: "Legacy Monolith & Session-Based Auth",
      type: "legacy",
      content: {
        architecture: {
          title: "Monolith Architecture",
          description: "All logic in one codebase with direct database access",
          characteristics: [
            "Single application deployment",
            "Direct database lookups for users & roles",
            "Shared session storage",
            "Tight coupling of components"
          ]
        },
        flow: {
          title: "Session-Based Flow",
          steps: [
            "User login → create session record in database",
            "Issue session cookie to client",
            "Every request → session lookup in database",
            "Validate session and retrieve user context"
          ]
        }
      }
    },
    {
      id: 7,
      title: "Session-Based Authentication Drawbacks",
      type: "drawbacks",
      content: {
        issues: [
          {
            title: "Stateful Architecture",
            description: "Requires session replication and sticky sessions",
            impact: "Complex scaling and high availability challenges"
          },
          {
            title: "Microservices Incompatibility",
            description: "Hard to scale to distributed microservices",
            impact: "Session sharing across services becomes complex"
          },
          {
            title: "Mobile App Limitations",
            description: "Poor support for mobile applications",
            impact: "Cookie-based sessions don't work well on mobile"
          },
          {
            title: "Tight Coupling",
            description: "Authentication logic tightly coupled to application",
            impact: "Difficult to change auth mechanisms"
          }
        ]
      }
    },
    {
      id: 8,
      title: "OAuth & OAuth2 Evolution",
      type: "oauth",
      content: {
        oauth1: {
          title: "OAuth 1.0 Recap",
          description: "Delegated access with cryptographic signatures",
          limitations: [
            "Complex signature generation",
            "Limited mobile application support",
            "Poor SPA (Single Page Application) support",
            "Difficult to implement correctly"
          ]
        },
        oauth2: {
          title: "OAuth2 Fundamentals",
          description: "Bearer tokens over HTTPS with simplified flow",
          grantTypes: [
            "Authorization Code (with PKCE)",
            "Client Credentials",
            "Device Code",
            "Resource Owner Password Credentials (deprecated)",
            "Implicit Flow (deprecated)"
          ]
        }
      }
    },
    {
      id: 9,
      title: "OAuth2 Token Types",
      type: "tokens",
      content: {
        tokenTypes: [
          {
            name: "Access Token",
            description: "Short-lived token for API access",
            lifetime: "5-15 minutes",
            format: "JWT or opaque string",
            purpose: "Authorize API requests"
          },
          {
            name: "Refresh Token",
            description: "Longer-lived token for token renewal",
            lifetime: "Days to weeks",
            format: "Opaque string (recommended)",
            purpose: "Obtain new access tokens"
          },
          {
            name: "ID Token (OIDC)",
            description: "JWT containing user identity information",
            lifetime: "5-15 minutes",
            format: "JWT only",
            purpose: "User authentication claims"
          }
        ]
      }
    },
    {
      id: 10,
      title: "OpenID Connect (OIDC)",
      type: "oidc",
      content: {
        overview: {
          title: "Why OIDC?",
          description: "Identity layer built on top of OAuth2",
          benefits: [
            "Standardized ID Token (JWT format)",
            "UserInfo endpoint for additional claims",
            "Discovery endpoint for configuration",
            "Standardized scopes (openid, profile, email)"
          ]
        },
        flow: {
          title: "OIDC Authorization Code Flow with PKCE",
          steps: [
            "/authorize redirect with code_challenge",
            "User login and consent at authorization server",
            "Redirect back with authorization code + state",
            "/token exchange with code_verifier",
            "Receive id_token, access_token, and refresh_token"
          ]
        }
      }
    },
    {
      id: 11,
      title: "JWT Anatomy & Token Types",
      type: "jwt",
      content: {
        structure: {
          title: "JWT Structure",
          description: "Three parts separated by dots",
          parts: [
            "Header: Algorithm and token type",
            "Payload: Claims and data",
            "Signature: Cryptographic signature"
          ],
          format: "Base64URL-encoded JSON"
        },
        comparison: {
          title: "Token Comparison",
          tokens: [
            {
              type: "Access Token",
              format: "JWT/Opaque",
              expiry: "5-15 min",
              use: "API calls"
            },
            {
              type: "ID Token",
              format: "JWT",
              expiry: "5-15 min",
              use: "User identity claims"
            },
            {
              type: "Refresh Token",
              format: "Opaque/JWT",
              expiry: "Days-weeks",
              use: "Renew access tokens"
            }
          ]
        }
      }
    },
    {
      id: 12,
      title: "Token Lifecycle & Revocation",
      type: "lifecycle",
      content: {
        strategy: {
          title: "Short-Lived Access + Refresh Strategy",
          description: "Minimize window of misuse with token rotation",
          benefits: [
            "Short access token lifetime (5-15 minutes)",
            "Refresh token rotation on each use",
            "Immediate revocation capability",
            "Reduced attack surface"
          ]
        },
        revocation: {
          title: "Session Store & Revocation",
          methods: [
            "Store jti (JWT ID) or session version in database/Redis",
            "On logout/password change → mark tokens as revoked",
            "API validates token against revocation list",
            "Automatic cleanup of expired revoked tokens"
          ]
        }
      }
    },
    {
      id: 13,
      title: "Preventing Token Abuse",
      type: "prevention",
      content: {
        measures: [
          {
            title: "One-Time Refresh Tokens",
            description: "Detect refresh token reuse and revoke all sessions",
            implementation: "Track refresh token usage and invalidate on reuse"
          },
          {
            title: "Client Binding",
            description: "Bind refresh tokens to client characteristics",
            implementation: "IP address, User-Agent fingerprint, device ID"
          },
          {
            title: "Rate Limiting",
            description: "Prevent brute force attacks on token endpoints",
            implementation: "Rate-limit token endpoints per user/IP"
          },
          {
            title: "Token Versioning",
            description: "Include version claim in JWT for invalidation",
            implementation: "Bump version on password change or admin revocation"
          }
        ]
      }
    },
    {
      id: 14,
      title: "End-to-End Real-Time Flow",
      type: "flow",
      content: {
        userJourney: {
          title: "User Journey",
          steps: [
            "User visits SPA → no token → redirect to IdP",
            "Login at Authorization Server (OIDC)",
            "Code exchange → tokens issued",
            "SPA stores access/id in memory; refresh in secure cookie",
            "SPA calls API → validates JWT via JWKS",
            "On expiry → silent refresh with cookie",
            "Logout → clear cookie + revoke session"
          ]
        },
        sequence: {
          title: "Sequence Diagram",
          description: "Visual representation of the authentication flow",
          components: [
            "SPA (Frontend)",
            "API Gateway",
            "Authorization Server",
            "Resource Server",
            "User Database"
          ]
        }
      }
    },
    {
      id: 15,
      title: "Best Practices & Tooling",
      type: "best-practices",
      content: {
        securityControls: {
          title: "Security Controls Checklist",
          items: [
            "HTTPS everywhere with HSTS headers",
            "Secure cookie attributes (HttpOnly, Secure, SameSite)",
            "Strong password policies and MFA enforcement",
            "Least privilege principle and scope management",
            "Content Security Policy (CSP) implementation",
            "CORS configuration with allowed origins",
            "Security headers (X-Frame-Options, X-Content-Type-Options)",
            "Automated SAST/DAST in CI/CD pipeline"
          ]
        },
        tooling: {
          title: "Free & Open-Source Solutions",
          categories: [
            {
              category: "Identity Server",
              tools: ["Keycloak", "ORY Hydra", "Auth0 (free tier)"]
            },
            {
              category: "Auth SDKs",
              tools: ["Authlib (Python)", "Spring Auth Server", "Passport.js"]
            },
            {
              category: "Security Testing",
              tools: ["OWASP ZAP", "SonarQube Community", "OWASP Dependency-Check"]
            }
          ]
        }
      }
    },
    {
      id: 16,
      title: "FAQs & Interview Questions",
      type: "faq",
      content: {
        questions: [
          {
            question: "What's the difference between OAuth2 and OIDC?",
            answer: "OAuth2 is for authorization, OIDC adds identity layer with standardized ID tokens"
          },
          {
            question: "Why use PKCE with Authorization Code flow?",
            answer: "PKCE prevents authorization code interception attacks, especially important for public clients"
          },
          {
            question: "How do you handle token revocation?",
            answer: "Use token blacklisting, versioning, or short-lived tokens with refresh token rotation"
          },
          {
            question: "What's the recommended token lifetime?",
            answer: "Access tokens: 5-15 minutes, ID tokens: 5-15 minutes, Refresh tokens: days to weeks"
          },
          {
            question: "How do you secure refresh tokens?",
            answer: "Store in secure HTTP-only cookies, implement rotation, bind to client characteristics"
          }
        ]
      }
    }
  ];

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Voice commands
        const lowerTranscript = transcript.toLowerCase();
        if (lowerTranscript.includes('next') || lowerTranscript.includes('next slide')) {
          nextSlide();
        } else if (lowerTranscript.includes('previous') || lowerTranscript.includes('previous slide')) {
          previousSlide();
        } else if (lowerTranscript.includes('first slide') || lowerTranscript.includes('start')) {
          setCurrentSlide(0);
        } else if (lowerTranscript.includes('last slide') || lowerTranscript.includes('end')) {
          setCurrentSlide(slides.length - 1);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const previousSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="slide-title">
            <h1>{slide.title}</h1>
            <div className="speaker-info">
              <h3>{slide.content.speaker}</h3>
              <p className="date">{slide.content.date}</p>
            </div>
            <div className="objectives">
              <h3>Objectives:</h3>
              <ul>
                {slide.content.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'agenda':
        return (
          <div className="slide-agenda">
            <h2>{slide.title}</h2>
            <div className="agenda-list">
              {slide.content.topics.map((topic, index) => (
                <div key={index} className="agenda-item">
                  <span className="agenda-number">{index + 1}.</span>
                  <span className="agenda-topic">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="slide-comparison">
            <h2>{slide.title}</h2>
            <div className="comparison-container">
              <div className="comparison-column">
                <h3>{slide.content.authentication.title}</h3>
                <p>{slide.content.authentication.description}</p>
                <ul>
                  {slide.content.authentication.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              <div className="comparison-column">
                <h3>{slide.content.authorization.title}</h3>
                <p>{slide.content.authorization.description}</p>
                <ul>
                  {slide.content.authorization.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'methods':
        return (
          <div className="slide-methods">
            <h2>{slide.title}</h2>
            <div className="methods-grid">
              {slide.content.methods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.name}</h3>
                  <p>{method.description}</p>
                  <div className="method-security">
                    <strong>Security:</strong> {method.security}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'models':
        return (
          <div className="slide-models">
            <h2>{slide.title}</h2>
            <div className="models-grid">
              {slide.content.models.map((model, index) => (
                <div key={index} className="model-card">
                  <div className="model-icon">{model.icon}</div>
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>
                  <div className="model-example">
                    <strong>Example:</strong> {model.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'legacy':
        return (
          <div className="slide-legacy">
            <h2>{slide.title}</h2>
            <div className="legacy-content">
              <div className="legacy-section">
                <h3>{slide.content.architecture.title}</h3>
                <p>{slide.content.architecture.description}</p>
                <ul>
                  {slide.content.architecture.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
              <div className="legacy-section">
                <h3>{slide.content.flow.title}</h3>
                <ol>
                  {slide.content.flow.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );

      case 'drawbacks':
        return (
          <div className="slide-drawbacks">
            <h2>{slide.title}</h2>
            <div className="drawbacks-grid">
              {slide.content.issues.map((issue, index) => (
                <div key={index} className="drawback-card">
                  <h3>{issue.title}</h3>
                  <p>{issue.description}</p>
                  <div className="impact">
                    <strong>Impact:</strong> {issue.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'oauth':
        return (
          <div className="slide-oauth">
            <h2>{slide.title}</h2>
            <div className="oauth-content">
              <div className="oauth-section">
                <h3>{slide.content.oauth1.title}</h3>
                <p>{slide.content.oauth1.description}</p>
                <ul>
                  {slide.content.oauth1.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
              <div className="oauth-section">
                <h3>{slide.content.oauth2.title}</h3>
                <p>{slide.content.oauth2.description}</p>
                <ul>
                  {slide.content.oauth2.grantTypes.map((grant, index) => (
                    <li key={index}>{grant}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'tokens':
        return (
          <div className="slide-tokens">
            <h2>{slide.title}</h2>
            <div className="tokens-grid">
              {slide.content.tokenTypes.map((token, index) => (
                <div key={index} className="token-card">
                  <h3>{token.name}</h3>
                  <p>{token.description}</p>
                  <div className="token-details">
                    <div><strong>Lifetime:</strong> {token.lifetime}</div>
                    <div><strong>Format:</strong> {token.format}</div>
                    <div><strong>Purpose:</strong> {token.purpose}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'oidc':
        return (
          <div className="slide-oidc">
            <h2>{slide.title}</h2>
            <div className="oidc-content">
              <div className="oidc-section">
                <h3>{slide.content.overview.title}</h3>
                <p>{slide.content.overview.description}</p>
                <ul>
                  {slide.content.overview.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="oidc-section">
                <h3>{slide.content.flow.title}</h3>
                <ol>
                  {slide.content.flow.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );

      case 'jwt':
        return (
          <div className="slide-jwt">
            <h2>{slide.title}</h2>
            <div className="jwt-content">
              <div className="jwt-section">
                <h3>{slide.content.structure.title}</h3>
                <div className="jwt-structure-visual">
                  <div className="jwt-part header">
                    <div className="jwt-part-label">Header</div>
                    <div className="jwt-part-content">
                      <code>{"{"} "alg": "RS256", "typ": "JWT" {"}"}</code>
                    </div>
                  </div>
                  <div className="jwt-separator">.</div>
                  <div className="jwt-part payload">
                    <div className="jwt-part-label">Payload</div>
                    <div className="jwt-part-content">
                      <code>{"{"} "sub": "user123", "exp": 1516239022 {"}"}</code>
                    </div>
                  </div>
                  <div className="jwt-separator">.</div>
                  <div className="jwt-part signature">
                    <div className="jwt-part-label">Signature</div>
                    <div className="jwt-part-content">
                      <code>HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)</code>
                    </div>
                  </div>
                </div>
                <div className="jwt-info">
                  <p><strong>Format:</strong> {slide.content.structure.format}</p>
                  <div className="jwt-features">
                    <div className="feature">
                      <span className="feature-icon">🔒</span>
                      <span>Cryptographically signed</span>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">📦</span>
                      <span>Self-contained</span>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">⚡</span>
                      <span>Stateless</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="jwt-section">
                <h3>{slide.content.comparison.title}</h3>
                <div className="token-comparison-table">
                  <div className="table-header">
                    <div>Token</div>
                    <div>Format</div>
                    <div>Expiry</div>
                    <div>Use</div>
                  </div>
                  {slide.content.comparison.tokens.map((token, index) => (
                    <div key={index} className="table-row">
                      <div className="token-type">{token.type}</div>
                      <div className="token-format">{token.format}</div>
                      <div className="token-expiry">{token.expiry}</div>
                      <div className="token-use">{token.use}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'lifecycle':
        return (
          <div className="slide-lifecycle">
            <h2>{slide.title}</h2>
            <div className="lifecycle-content">
              <div className="lifecycle-section">
                <h3>{slide.content.strategy.title}</h3>
                <p>{slide.content.strategy.description}</p>
                <ul>
                  {slide.content.strategy.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="lifecycle-section">
                <h3>{slide.content.revocation.title}</h3>
                <ol>
                  {slide.content.revocation.methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );

      case 'prevention':
        return (
          <div className="slide-prevention">
            <h2>{slide.title}</h2>
            <div className="prevention-grid">
              {slide.content.measures.map((measure, index) => (
                <div key={index} className="prevention-card">
                  <h3>{measure.title}</h3>
                  <p>{measure.description}</p>
                  <div className="implementation">
                    <strong>Implementation:</strong> {measure.implementation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="slide-flow">
            <h2>{slide.title}</h2>
            <div className="flow-content">
              <div className="flow-section">
                <h3>{slide.content.userJourney.title}</h3>
                <ol>
                  {slide.content.userJourney.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="flow-section">
                <h3>{slide.content.sequence.title}</h3>
                <p>{slide.content.sequence.description}</p>
                <div className="sequence-components">
                  {slide.content.sequence.components.map((component, index) => (
                    <div key={index} className="component">{component}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'best-practices':
        return (
          <div className="slide-best-practices">
            <h2>{slide.title}</h2>
            <div className="best-practices-content">
              <div className="practices-section">
                <h3>{slide.content.securityControls.title}</h3>
                <ul>
                  {slide.content.securityControls.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="practices-section">
                <h3>{slide.content.tooling.title}</h3>
                {slide.content.tooling.categories.map((category, index) => (
                  <div key={index} className="tooling-category">
                    <h4>{category.category}</h4>
                    <ul>
                      {category.tools.map((tool, toolIndex) => (
                        <li key={toolIndex}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="slide-faq">
            <h2>{slide.title}</h2>
            <div className="faq-content">
              {slide.content.questions.map((qa, index) => (
                <div key={index} className="faq-item">
                  <h3>Q: {qa.question}</h3>
                  <p><strong>A:</strong> {qa.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Slide content not found</div>;
    }
  };

  return (
    <div className="agenda-container">
      <div className="presentation-header">
        <h1>Modern Application Security Presentation</h1>
        <div className="voice-controls">
          <button 
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? '🎤 Stop Listening' : '🎤 Start Voice Control'}
          </button>
          <div className="voice-status">
            {isListening ? 'Listening... Say "next" or "previous"' : 'Voice control ready'}
          </div>
        </div>
      </div>

      <div className="presentation-container">
        <div className="slide-navigation">
          <button onClick={previousSlide} disabled={currentSlide === 0}>
            ← Previous
          </button>
          <span className="slide-counter">
            {currentSlide + 1} / {slides.length}
          </span>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
            Next →
          </button>
        </div>

        <div className="slide-container">
          {renderSlide(slides[currentSlide])}
        </div>

        <div className="slide-thumbnails">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <div className="thumbnail-number">{slide.id}</div>
              <div className="thumbnail-title">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>

      {transcript && (
        <div className="transcript">
          <h3>Voice Input:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default Agenda; 