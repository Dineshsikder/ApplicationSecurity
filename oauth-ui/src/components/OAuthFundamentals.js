import React, { useState } from "react";
import "./OAuthFundamentals.css";

const sections = [
  { id: "what-is-oauth", title: "What is OAuth2 & OIDC" },
  { id: "why-introduced", title: "Why Were They Introduced?" },
  { id: "security", title: "How OAuth2 is Secure" },
  { id: "benefits", title: "Benefits of OAuth2/OIDC" },
  { id: "loopholes", title: "Loopholes & Cons" },
  { id: "future", title: "Future Plans & Improvements" }
];

export default function OAuthFundamentals() {
  const [activeSection, setActiveSection] = useState("what-is-oauth");

  return (
    <div className="oauth-fundamentals">
      <div className="fundamentals-header">
        <h1>🔐 OAuth2 & OpenID Connect Fundamentals</h1>
        <p className="fundamentals-description">
          A comprehensive guide to understanding OAuth2 and OpenID Connect, their security mechanisms, 
          benefits, challenges, and future developments in identity and access management.
        </p>
      </div>

      <div className="fundamentals-navigation">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="fundamentals-content">
        {activeSection === "what-is-oauth" && (
          <div className="content-section">
            <h2>🔍 What is OAuth2 & OpenID Connect?</h2>
            
            <div className="info-grid">
              <div className="info-card">
                <h3>🎯 OAuth2 (Open Authorization 2.0)</h3>
                <p>
                  OAuth2 is an <strong>authorization framework</strong> that enables third-party applications 
                  to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, 
                  or Google, without exposing the user's credentials.
                </p>
                <div className="key-points">
                  <h4>Key Characteristics:</h4>
                  <ul>
                    <li><strong>Authorization Protocol:</strong> Delegates access without sharing credentials</li>
                    <li><strong>Token-Based:</strong> Uses access tokens instead of passwords</li>
                    <li><strong>Scope-Based:</strong> Granular permission control</li>
                    <li><strong>Stateless:</strong> No server-side session storage required</li>
                    <li><strong>Standardized:</strong> RFC 6749 industry standard</li>
                  </ul>
                </div>
              </div>

              <div className="info-card">
                <h3>👤 OpenID Connect (OIDC)</h3>
                <p>
                  OpenID Connect is an <strong>identity layer</strong> built on top of OAuth2 that provides 
                  authentication and user information. It extends OAuth2 with an identity verification 
                  mechanism.
                </p>
                <div className="key-points">
                  <h4>Key Characteristics:</h4>
                  <ul>
                    <li><strong>Identity Protocol:</strong> Verifies user identity</li>
                    <li><strong>ID Tokens:</strong> JWT-based identity tokens</li>
                    <li><strong>Standard Claims:</strong> Predefined user attributes</li>
                    <li><strong>Discovery:</strong> Dynamic client configuration</li>
                    <li><strong>OIDC Compliance:</strong> Built on OAuth2 standards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="comparison-table">
              <h3>OAuth2 vs OpenID Connect Comparison</h3>
              <table>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>OAuth2</th>
                    <th>OpenID Connect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Primary Purpose</strong></td>
                    <td>Authorization (what you can do)</td>
                    <td>Authentication (who you are)</td>
                  </tr>
                  <tr>
                    <td><strong>Token Type</strong></td>
                    <td>Access Tokens</td>
                    <td>ID Tokens + Access Tokens</td>
                  </tr>
                  <tr>
                    <td><strong>User Information</strong></td>
                    <td>Limited (via /userinfo)</td>
                    <td>Rich (in ID token claims)</td>
                  </tr>
                  <tr>
                    <td><strong>Standardization</strong></td>
                    <td>Framework (flexible)</td>
                    <td>Protocol (strict)</td>
                  </tr>
                  <tr>
                    <td><strong>Use Cases</strong></td>
                    <td>API access, resource sharing</td>
                    <td>Single sign-on, user profiles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="info-card">
              <h3>🔄 OAuth2 Flow Example</h3>
              <div className="code-example">
                <h5>Authorization Code Flow with PKCE:</h5>
                <pre><code>{`1. User clicks "Login with OAuth2"
2. App redirects to: /oauth2/authorize?response_type=code&client_id=app&redirect_uri=...&code_challenge=...
3. User authenticates on auth server
4. Auth server redirects with authorization code
5. App exchanges code for tokens: POST /oauth2/token
6. App receives access_token and refresh_token
7. App uses access_token for API calls`}</code></pre>
              </div>
            </div>
          </div>
        )}

        {activeSection === "why-introduced" && (
          <div className="content-section">
            <h2>🚨 Why Were OAuth2 & OIDC Introduced?</h2>
            
            <div className="timeline-section">
              <h3>📅 Historical Context</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker">2005</div>
                  <div className="timeline-content">
                    <h4>Before OAuth - The Password Anti-Pattern</h4>
                    <p>
                      Applications required users to share their username and password with third-party 
                      services to access their data. This created significant security risks and privacy concerns.
                    </p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">2007</div>
                  <div className="timeline-content">
                    <h4>OAuth 1.0 Introduction</h4>
                    <p>
                      First attempt to solve the password sharing problem, but had complexity issues 
                      and was difficult to implement correctly. Used HMAC signatures and was stateless.
                    </p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">2012</div>
                  <div className="timeline-content">
                    <h4>OAuth 2.0 RFC 6749</h4>
                    <p>
                      Simplified and standardized authorization framework that became the industry standard.
                      Introduced bearer tokens and simplified the flow significantly.
                    </p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-marker">2014</div>
                  <div className="timeline-content">
                    <h4>OpenID Connect</h4>
                    <p>
                      Identity layer built on OAuth2 to provide standardized authentication and user information.
                      Added ID tokens and standardized user claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="problems-section">
              <h3>🔴 Problems Before OAuth2</h3>
              <div className="problems-grid">
                <div className="problem-card">
                  <h4>🛡️ Security Vulnerabilities</h4>
                  <ul>
                    <li><strong>Password Sharing:</strong> Users had to share credentials with third-party apps</li>
                    <li><strong>Credential Storage:</strong> Apps stored user passwords insecurely</li>
                    <li><strong>No Revocation:</strong> Couldn't revoke access without changing passwords</li>
                    <li><strong>Phishing Attacks:</strong> Easy to steal credentials through fake apps</li>
                    <li><strong>Credential Reuse:</strong> Same password used across multiple services</li>
                  </ul>
                </div>

                <div className="problem-card">
                  <h4>🎯 Attack Vectors</h4>
                  <ul>
                    <li><strong>Man-in-the-Middle:</strong> Intercepting credentials in transit</li>
                    <li><strong>Credential Stuffing:</strong> Using stolen passwords across services</li>
                    <li><strong>Session Hijacking:</strong> Stealing active sessions</li>
                    <li><strong>Cross-Site Request Forgery:</strong> Unauthorized actions on behalf of users</li>
                    <li><strong>Brute Force Attacks:</strong> Attempting to guess passwords</li>
                  </ul>
                </div>

                <div className="problem-card">
                  <h4>🔧 Implementation Issues</h4>
                  <ul>
                    <li><strong>No Standards:</strong> Each service implemented authentication differently</li>
                    <li><strong>Poor UX:</strong> Users had to remember multiple passwords</li>
                    <li><strong>Limited Scope:</strong> All-or-nothing access to user data</li>
                    <li><strong>No Audit Trail:</strong> Difficult to track who accessed what</li>
                    <li><strong>Vendor Lock-in:</strong> Difficult to switch between services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="solutions-section">
              <h3>✅ How OAuth2 Solves These Problems</h3>
              <div className="solutions-grid">
                <div className="solution-card">
                  <h4>🔐 No Password Sharing</h4>
                  <p>
                    OAuth2 eliminates the need for users to share their passwords with third-party 
                    applications. Instead, users authenticate directly with the authorization server.
                  </p>
                </div>

                <div className="solution-card">
                  <h4>🎫 Token-Based Access</h4>
                  <p>
                    Uses short-lived access tokens instead of long-lived credentials, reducing the 
                    window of opportunity for attacks and enabling easy revocation.
                  </p>
                </div>

                <div className="solution-card">
                  <h4>📋 Granular Permissions</h4>
                  <p>
                    Scopes allow fine-grained control over what data and actions third-party apps 
                    can access, implementing the principle of least privilege.
                  </p>
                </div>

                <div className="solution-card">
                  <h4>🔄 Easy Revocation</h4>
                  <p>
                    Access can be revoked instantly without affecting the user's main account or 
                    other applications, providing better security control.
                  </p>
                </div>

                <div className="solution-card">
                  <h4>📊 Audit Trail</h4>
                  <p>
                    Complete logging of who accessed what data and when, enabling security monitoring 
                    and compliance requirements.
                  </p>
                </div>

                <div className="solution-card">
                  <h4>🌐 Standardization</h4>
                  <p>
                    Industry-standard protocol ensures interoperability and reduces vendor lock-in, 
                    making it easier to switch between providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "security" && (
          <div className="content-section">
            <h2>🛡️ How OAuth2 is Secure</h2>
            
            <div className="security-overview">
              <h3>🔒 Security Mechanisms in OAuth2</h3>
              <p>
                OAuth2 implements multiple layers of security to protect user data and prevent 
                unauthorized access. Here's how each security feature works:
              </p>
            </div>

            <div className="security-features">
              <div className="security-feature">
                <h4>🔐 PKCE (Proof Key for Code Exchange)</h4>
                <div className="feature-details">
                  <p>
                    PKCE prevents authorization code interception attacks by using a code verifier 
                    and code challenge mechanism.
                  </p>
                  <div className="code-example">
                    <h5>How PKCE Works:</h5>
                    <pre><code>{`// 1. Generate code verifier (random string)
const codeVerifier = generateRandomString(128);

// 2. Create code challenge (SHA-256 hash)
const codeChallenge = await sha256(codeVerifier);

// 3. Send challenge in authorization request
// 4. Send verifier in token request
// 5. Server validates challenge matches verifier`}</code></pre>
                  </div>
                  <div className="security-benefit">
                    <strong>Security Benefit:</strong> Prevents authorization code interception 
                    and replay attacks, especially important for public clients like SPAs.
                  </div>
                </div>
              </div>

              <div className="security-feature">
                <h4>🎫 JWT Token Security</h4>
                <div className="feature-details">
                  <p>
                    JSON Web Tokens provide secure, stateless authentication with built-in 
                    security features.
                  </p>
                  <div className="token-security-grid">
                    <div className="token-aspect">
                      <h5>🔑 Digital Signatures</h5>
                      <p>Tokens are cryptographically signed to prevent tampering</p>
                    </div>
                    <div className="token-aspect">
                      <h5>⏰ Expiration</h5>
                      <p>Short-lived tokens reduce exposure window</p>
                    </div>
                    <div className="token-aspect">
                      <h5>🎯 Audience Validation</h5>
                      <p>Tokens are bound to specific applications</p>
                    </div>
                    <div className="token-aspect">
                      <h5>🏢 Issuer Validation</h5>
                      <p>Tokens are validated against trusted issuers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="security-feature">
                <h4>🔄 Token Refresh Mechanism</h4>
                <div className="feature-details">
                  <p>
                    Secure token refresh prevents token exposure while maintaining user experience.
                  </p>
                  <ul>
                    <li><strong>Short-lived Access Tokens:</strong> 15-60 minutes</li>
                    <li><strong>Long-lived Refresh Tokens:</strong> Days to weeks</li>
                    <li><strong>Automatic Renewal:</strong> Transparent to users</li>
                    <li><strong>Revocation Support:</strong> Can invalidate refresh tokens</li>
                    <li><strong>Rotation:</strong> New refresh tokens on each use</li>
                  </ul>
                </div>
              </div>

              <div className="security-feature">
                <h4>🚫 Token Blacklisting</h4>
                <div className="feature-details">
                  <p>
                    Immediate token revocation through blacklisting prevents unauthorized access.
                  </p>
                  <div className="blacklist-process">
                    <h5>Blacklisting Process:</h5>
                    <ol>
                      <li>User logs out or admin revokes access</li>
                      <li>JTI (JWT ID) is added to blacklist in Redis</li>
                      <li>API Gateway checks blacklist on each request</li>
                      <li>Blacklisted tokens are rejected immediately</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="security-feature">
                <h4>🎭 Role-Based Access Control (RBAC)</h4>
                <div className="feature-details">
                  <p>
                    Fine-grained access control based on user roles and permissions.
                  </p>
                  <div className="rbac-example">
                    <h5>RBAC Implementation:</h5>
                    <pre><code>{`// JWT contains user roles
{
  "sub": "user123",
  "roles": ["ROLE_USER", "ROLE_ADMIN"],
  "scope": "read write admin"
}

// API endpoints check roles
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/dashboard")
public ResponseEntity<?> getAdminDashboard() {
  // Only accessible by admins
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="security-best-practices">
              <h3>📋 OAuth2 Security Best Practices</h3>
              <div className="practices-grid">
                <div className="practice-card">
                  <h4>🔐 Client Security</h4>
                  <ul>
                    <li>Use HTTPS for all communications</li>
                    <li>Implement PKCE for public clients</li>
                    <li>Store client secrets securely</li>
                    <li>Validate redirect URIs</li>
                    <li>Use state parameter for CSRF protection</li>
                  </ul>
                </div>

                <div className="practice-card">
                  <h4>🎫 Token Security</h4>
                  <ul>
                    <li>Use short-lived access tokens</li>
                    <li>Implement token blacklisting</li>
                    <li>Validate token signatures</li>
                    <li>Check token expiration</li>
                    <li>Use secure token storage</li>
                  </ul>
                </div>

                <div className="practice-card">
                  <h4>🛡️ Server Security</h4>
                  <ul>
                    <li>Use strong cryptographic algorithms</li>
                    <li>Implement rate limiting</li>
                    <li>Log security events</li>
                    <li>Regular security audits</li>
                    <li>Monitor for suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "benefits" && (
          <div className="content-section">
            <h2>✅ Benefits of OAuth2/OIDC</h2>
            
            <div className="benefits-overview">
              <h3>🌟 Key Advantages</h3>
              <p>
                OAuth2 and OpenID Connect provide numerous benefits for developers, users, and 
                organizations. Here are the main advantages:
              </p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-category">
                <h3>🔐 Security Benefits</h3>
                <div className="benefit-items">
                  <div className="benefit-item">
                    <h4>🛡️ No Password Sharing</h4>
                    <p>Users never share their credentials with third-party applications, eliminating credential theft risks.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🎫 Short-lived Tokens</h4>
                    <p>Access tokens expire quickly, limiting the damage from token compromise.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🚫 Easy Revocation</h4>
                    <p>Access can be revoked instantly without affecting other services or requiring password changes.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🔍 Audit Trail</h4>
                    <p>Complete logging of who accessed what data and when, enabling security monitoring.</p>
                  </div>
                </div>
              </div>

              <div className="benefit-category">
                <h3>👥 User Experience Benefits</h3>
                <div className="benefit-items">
                  <div className="benefit-item">
                    <h4>🔑 Single Sign-On (SSO)</h4>
                    <p>Users can access multiple applications with one set of credentials, reducing password fatigue.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>📱 Seamless Integration</h4>
                    <p>Users can easily connect third-party services without complex setup processes.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🎯 Granular Permissions</h4>
                    <p>Users can grant specific permissions rather than all-or-nothing access.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🔄 Transparent Renewal</h4>
                    <p>Token refresh happens automatically, maintaining seamless user experience.</p>
                  </div>
                </div>
              </div>

              <div className="benefit-category">
                <h3>🏢 Business Benefits</h3>
                <div className="benefit-items">
                  <div className="benefit-item">
                    <h4>🌐 API Ecosystem</h4>
                    <p>Enables secure third-party integrations and API marketplaces.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>📊 User Analytics</h4>
                    <p>Better understanding of user behavior across integrated services.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>💰 Reduced Support Costs</h4>
                    <p>Fewer password-related support tickets and account lockouts.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🔧 Developer Productivity</h4>
                    <p>Standardized authentication reduces development time and complexity.</p>
                  </div>
                </div>
              </div>

              <div className="benefit-category">
                <h3>🛠️ Technical Benefits</h3>
                <div className="benefit-items">
                  <div className="benefit-item">
                    <h4>📋 Standardization</h4>
                    <p>Industry-standard protocol ensures interoperability and reduces vendor lock-in.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🔌 Pluggable Architecture</h4>
                    <p>Easy to switch between identity providers or add new ones.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>📈 Scalability</h4>
                    <p>Stateless design allows for horizontal scaling and high availability.</p>
                  </div>
                  <div className="benefit-item">
                    <h4>🔒 Compliance</h4>
                    <p>Helps meet regulatory requirements for data protection and access control.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="real-world-examples">
              <h3>🌍 Real-World Applications</h3>
              <div className="examples-grid">
                <div className="example-card">
                  <h4>📱 Mobile Apps</h4>
                  <p>Secure authentication for mobile applications without storing sensitive credentials.</p>
                </div>
                <div className="example-card">
                  <h4>🌐 Web Applications</h4>
                  <p>Single sign-on across multiple web services and applications.</p>
                </div>
                <div className="example-card">
                  <h4>🔌 API Integrations</h4>
                  <p>Secure third-party API access for data sharing and service integration.</p>
                </div>
                <div className="example-card">
                  <h4>🏢 Enterprise Systems</h4>
                  <p>Centralized identity management for large organizations with multiple systems.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "loopholes" && (
          <div className="content-section">
            <h2>⚠️ Loopholes & Cons of OAuth2/OIDC</h2>
            
            <div className="loopholes-overview">
              <h3>🔍 Known Vulnerabilities and Limitations</h3>
              <p>
                While OAuth2 and OIDC are robust security protocols, they are not without 
                vulnerabilities and limitations. Understanding these helps in implementing 
                proper security measures.
              </p>
            </div>

            <div className="loopholes-grid">
              <div className="loophole-category">
                <h3>🎯 Implementation Vulnerabilities</h3>
                <div className="loophole-items">
                  <div className="loophole-item">
                    <h4>🔗 Open Redirect Vulnerabilities</h4>
                    <p>
                      <strong>Issue:</strong> Poorly validated redirect URIs can lead to authorization 
                      code theft and account takeover.
                    </p>
                    <p>
                      <strong>Example:</strong> An attacker could redirect the authorization code 
                      to their own server instead of the legitimate application.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Strict redirect URI validation and whitelisting.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🎭 CSRF Attacks</h4>
                    <p>
                      <strong>Issue:</strong> Cross-Site Request Forgery can trick users into 
                      authorizing malicious applications.
                    </p>
                    <p>
                      <strong>Example:</strong> An attacker could force a user to authorize 
                      their application without the user's knowledge.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use state parameter and PKCE for additional protection.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🔑 Client Secret Exposure</h4>
                    <p>
                      <strong>Issue:</strong> Client secrets can be exposed in client-side code 
                      or through reverse engineering.
                    </p>
                    <p>
                      <strong>Example:</strong> Mobile apps or SPAs cannot securely store client secrets.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use PKCE for public clients, secure storage for confidential clients.
                    </div>
                  </div>
                </div>
              </div>

              <div className="loophole-category">
                <h3>🎫 Token-Related Issues</h3>
                <div className="loophole-items">
                  <div className="loophole-item">
                    <h4>⏰ Token Expiration Challenges</h4>
                    <p>
                      <strong>Issue:</strong> Balancing security (short tokens) with user experience 
                      (seamless access).
                    </p>
                    <p>
                      <strong>Example:</strong> Users may experience frequent re-authentication 
                      if tokens are too short-lived.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Implement silent token renewal and appropriate token lifetimes.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🚫 Token Revocation Complexity</h4>
                    <p>
                      <strong>Issue:</strong> Revoking tokens across distributed systems can be 
                      challenging and may have delays.
                    </p>
                    <p>
                      <strong>Example:</strong> A revoked token might still be valid for a short 
                      period in cached systems.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use short token lifetimes and implement token blacklisting.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🔍 Token Storage Security</h4>
                    <p>
                      <strong>Issue:</strong> Secure storage of tokens in client applications 
                      can be challenging.
                    </p>
                    <p>
                      <strong>Example:</strong> Tokens stored in localStorage are vulnerable to XSS attacks.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use secure storage mechanisms and implement proper CSP headers.
                    </div>
                  </div>
                </div>
              </div>

              <div className="loophole-category">
                <h3>🔧 Protocol Limitations</h3>
                <div className="loophole-items">
                  <div className="loophole-item">
                    <h4>📋 Scope Management</h4>
                    <p>
                      <strong>Issue:</strong> Granular scope management can be complex and may 
                      lead to over-privileged applications.
                    </p>
                    <p>
                      <strong>Example:</strong> Applications often request more permissions than 
                      they actually need.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Implement least-privilege principle and dynamic scope requests.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🌐 Cross-Origin Challenges</h4>
                    <p>
                      <strong>Issue:</strong> CORS and iframe restrictions can complicate 
                      OAuth2 implementation in web applications.
                    </p>
                    <p>
                      <strong>Example:</strong> Silent token renewal in iframes can be blocked 
                      by browser security policies.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Proper CORS configuration and alternative renewal methods.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>📱 Mobile App Vulnerabilities</h4>
                    <p>
                      <strong>Issue:</strong> Mobile apps face unique challenges with OAuth2 
                      implementation and token storage.
                    </p>
                    <p>
                      <strong>Example:</strong> Deep linking vulnerabilities and insecure token storage.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use App Links, secure storage, and proper app validation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="loophole-category">
                <h3>🏢 Organizational Challenges</h3>
                <div className="loophole-items">
                  <div className="loophole-item">
                    <h4>🔍 Complexity</h4>
                    <p>
                      <strong>Issue:</strong> OAuth2 implementation can be complex and error-prone, 
                      leading to security misconfigurations.
                    </p>
                    <p>
                      <strong>Example:</strong> Incorrect scope validation or token handling can 
                      create security vulnerabilities.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Use well-tested libraries and frameworks, conduct security audits.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>📊 Performance Overhead</h4>
                    <p>
                      <strong>Issue:</strong> Additional network calls and token validation can 
                      impact application performance.
                    </p>
                    <p>
                      <strong>Example:</strong> Each API call requires token validation and potential 
                      blacklist checking.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Implement caching strategies and optimize token validation.
                    </div>
                  </div>

                  <div className="loophole-item">
                    <h4>🔗 Vendor Lock-in</h4>
                    <p>
                      <strong>Issue:</strong> Dependence on specific OAuth2 providers can create 
                      vendor lock-in and migration challenges.
                    </p>
                    <p>
                      <strong>Example:</strong> Custom extensions and non-standard implementations 
                      can make switching providers difficult.
                    </p>
                    <div className="mitigation">
                      <strong>Mitigation:</strong> Stick to standards, use abstraction layers, plan for migration.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="security-checklist">
              <h3>✅ Security Checklist for OAuth2 Implementation</h3>
              <div className="checklist-grid">
                <div className="checklist-item">
                  <input type="checkbox" id="check1" />
                  <label htmlFor="check1">Implement PKCE for all public clients</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check2" />
                  <label htmlFor="check2">Validate redirect URIs strictly</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check3" />
                  <label htmlFor="check3">Use HTTPS for all communications</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check4" />
                  <label htmlFor="check4">Implement token blacklisting</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check5" />
                  <label htmlFor="check5">Use short-lived access tokens</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check6" />
                  <label htmlFor="check6">Implement proper error handling</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check7" />
                  <label htmlFor="check7">Log security events</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="check8" />
                  <label htmlFor="check8">Regular security audits</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "future" && (
          <div className="content-section">
            <h2>🚀 Future Plans & Improvements</h2>
            
            <div className="future-overview">
              <h3>🔮 Upcoming Developments in OAuth2/OIDC</h3>
              <p>
                The OAuth2 and OpenID Connect ecosystems are continuously evolving to address 
                new security challenges and improve user experience. Here are the key developments 
                and improvements planned:
              </p>
            </div>

            <div className="future-developments">
              <div className="development-category">
                <h3>🔐 Enhanced Security Standards</h3>
                <div className="development-items">
                  <div className="development-item">
                    <h4>🎯 OAuth 2.1 Specification</h4>
                    <p>
                      <strong>Status:</strong> In development
                    </p>
                    <p>
                      <strong>Key Improvements:</strong>
                    </p>
                    <ul>
                      <li>PKCE required for all clients (not just public)</li>
                      <li>Removal of implicit flow and password grant</li>
                      <li>Enhanced redirect URI validation</li>
                      <li>Improved security headers requirements</li>
                      <li>Stricter client authentication</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will significantly improve security by eliminating 
                      deprecated and insecure flows.
                    </div>
                  </div>

                  <div className="development-item">
                    <h4>🔑 FAPI 2.0 (Financial-grade API)</h4>
                    <p>
                      <strong>Status:</strong> Active development
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Enhanced security for financial applications</li>
                      <li>Advanced threat detection</li>
                      <li>Risk-based authentication</li>
                      <li>Compliance with regulatory requirements</li>
                      <li>Multi-factor authentication integration</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will set new security standards for high-value applications.
                    </div>
                  </div>

                  <div className="development-item">
                    <h4>🛡️ Enhanced Threat Detection</h4>
                    <p>
                      <strong>Status:</strong> Emerging
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Behavioral analysis for authentication patterns</li>
                      <li>Real-time threat intelligence integration</li>
                      <li>Adaptive authentication based on risk</li>
                      <li>Machine learning for anomaly detection</li>
                      <li>Automated response to security threats</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will provide proactive security measures against emerging threats.
                    </div>
                  </div>
                </div>
              </div>

              <div className="development-category">
                <h3>📱 Mobile & IoT Enhancements</h3>
                <div className="development-items">
                  <div className="development-item">
                    <h4>📱 Mobile App Security</h4>
                    <p>
                      <strong>Status:</strong> Active development
                    </p>
                    <p>
                      <strong>Key Improvements:</strong>
                    </p>
                    <ul>
                      <li>Enhanced deep linking security</li>
                      <li>App attestation and integrity checks</li>
                      <li>Secure token storage standards</li>
                      <li>Biometric authentication integration</li>
                      <li>Device fingerprinting for security</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will address mobile-specific security challenges.
                    </div>
                  </div>

                  <div className="development-item">
                    <h4>🌐 IoT Device Authentication</h4>
                    <p>
                      <strong>Status:</strong> Emerging
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Device certificate-based authentication</li>
                      <li>Lightweight OAuth2 for constrained devices</li>
                      <li>Group authentication for device fleets</li>
                      <li>Secure device onboarding</li>
                      <li>Zero-trust security model</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will enable secure authentication for IoT ecosystems.
                    </div>
                  </div>
                </div>
              </div>

              <div className="development-category">
                <h3>🔧 Protocol Improvements</h3>
                <div className="development-items">
                  <div className="development-item">
                    <h4>⚡ Performance Optimizations</h4>
                    <p>
                      <strong>Status:</strong> Ongoing
                    </p>
                    <p>
                      <strong>Key Improvements:</strong>
                    </p>
                    <ul>
                      <li>Token introspection caching</li>
                      <li>Batch token validation</li>
                      <li>Optimized JWT processing</li>
                      <li>Connection pooling for token servers</li>
                      <li>Reduced network overhead</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will improve performance for high-traffic applications.
                    </div>
                  </div>

                  <div className="development-item">
                    <h4>🔄 Enhanced Token Management</h4>
                    <p>
                      <strong>Status:</strong> In development
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Token binding for additional security</li>
                      <li>Dynamic scope negotiation</li>
                      <li>Conditional access policies</li>
                      <li>Advanced token revocation strategies</li>
                      <li>Token lifecycle management</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will provide more flexible and secure token management.
                    </div>
                  </div>
                </div>
              </div>

              <div className="development-category">
                <h3>🌍 Interoperability & Standards</h3>
                <div className="development-items">
                  <div className="development-item">
                    <h4>🔗 Cross-Platform Standards</h4>
                    <p>
                      <strong>Status:</strong> Active development
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Enhanced OIDC discovery mechanisms</li>
                      <li>Standardized error handling</li>
                      <li>Improved metadata exchange</li>
                      <li>Cross-provider compatibility</li>
                      <li>Unified identity federation</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will improve interoperability between different OAuth2 providers.
                    </div>
                  </div>

                  <div className="development-item">
                    <h4>📊 Privacy Enhancements</h4>
                    <p>
                      <strong>Status:</strong> Emerging
                    </p>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>GDPR-compliant data handling</li>
                      <li>Privacy-preserving authentication</li>
                      <li>User consent management</li>
                      <li>Data minimization techniques</li>
                      <li>Transparent data usage</li>
                    </ul>
                    <div className="impact">
                      <strong>Impact:</strong> Will address privacy concerns and regulatory requirements.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="roadmap-section">
              <h3>🗺️ Implementation Roadmap</h3>
              <div className="roadmap-timeline">
                <div className="roadmap-item">
                  <div className="roadmap-date">2024</div>
                  <div className="roadmap-content">
                    <h4>OAuth 2.1 Finalization</h4>
                    <p>Final specification release and industry adoption</p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-date">2025</div>
                  <div className="roadmap-content">
                    <h4>FAPI 2.0 Deployment</h4>
                    <p>Financial-grade security standards implementation</p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-date">2026</div>
                  <div className="roadmap-content">
                    <h4>IoT Authentication</h4>
                    <p>Widespread adoption of OAuth2 for IoT devices</p>
                  </div>
                </div>
                <div className="roadmap-item">
                  <div className="roadmap-date">2027+</div>
                  <div className="roadmap-content">
                    <h4>AI-Enhanced Security</h4>
                    <p>Machine learning integration for threat detection</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendations">
              <h3>💡 Recommendations for Organizations</h3>
              <div className="recommendations-grid">
                <div className="recommendation-card">
                  <h4>🔍 Stay Updated</h4>
                  <p>Monitor OAuth2/OIDC specification updates and security advisories regularly.</p>
                </div>
                <div className="recommendation-card">
                  <h4>🛠️ Plan Migration</h4>
                  <p>Prepare for OAuth 2.1 migration by updating implementations and testing thoroughly.</p>
                </div>
                <div className="recommendation-card">
                  <h4>🔐 Security First</h4>
                  <p>Implement security best practices and conduct regular security audits.</p>
                </div>
                <div className="recommendation-card">
                  <h4>📚 Training</h4>
                  <p>Invest in developer training and security awareness programs.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}