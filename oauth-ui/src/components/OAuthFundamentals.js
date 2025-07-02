import React, { useState } from "react";
import "./OAuthFundamentals.css";

const sections = [
  { id: "what", label: "What is OAuth2 & OIDC?" },
  { id: "why", label: "Why Were They Introduced?" },
  { id: "security", label: "How OAuth2 is Secure" },
  { id: "benefits", label: "Benefits" },
  { id: "loopholes", label: "Loopholes & Cons" },
  { id: "future", label: "Future & Improvements" },
];

export default function OAuthFundamentals() {
  const [active, setActive] = useState("what");

  return (
    <div className="oauth-fundamentals">
      <h1>🔐 OAuth2 & OpenID Connect: Fundamentals & Security</h1>
      <div className="fundamentals-tabs">
        {sections.map((s) => (
          <button
            key={s.id}
            className={active === s.id ? "active" : ""}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="fundamentals-content">
        {active === "what" && (
          <>
            <h2>What is OAuth2?</h2>
            <p>
              OAuth2 is an <b>authorization framework</b> that allows third-party applications to obtain limited access to a user’s resources without exposing their credentials.
            </p>
            <h2>What is OIDC?</h2>
            <p>
              OpenID Connect (OIDC) is an <b>identity layer</b> built on top of OAuth2, providing authentication and user profile information using ID tokens.
            </p>
          </>
        )}
        {active === "why" && (
          <>
            <h2>Why Were They Introduced?</h2>
            <ul>
              <li>
                <b>Before OAuth:</b> Apps required users to share their passwords with third parties, leading to <b>security risks</b> like credential theft, phishing, and no way to revoke access.
              </li>
              <li>
                <b>Common Attacks:</b> Man-in-the-middle, credential stuffing, session hijacking, CSRF, phishing.
              </li>
              <li>
                <b>OAuth2/OIDC Solution:</b> No password sharing, token-based access, granular permissions, easy revocation, and standardized authentication.
              </li>
            </ul>
          </>
        )}
        {active === "security" && (
          <>
            <h2>How OAuth2 is Secure</h2>
            <ul>
              <li>PKCE (Proof Key for Code Exchange) prevents code interception.</li>
              <li>Short-lived, signed JWT tokens (RS256) with audience, issuer, and expiration validation.</li>
              <li>Token blacklisting and revocation support.</li>
              <li>Role-based access control and scopes for least-privilege access.</li>
              <li>HTTPS enforced for all communication.</li>
            </ul>
          </>
        )}
        {active === "benefits" && (
          <>
            <h2>Benefits of OAuth2/OIDC</h2>
            <ul>
              <li>No password sharing with third parties.</li>
              <li>Single Sign-On (SSO) and seamless user experience.</li>
              <li>Granular, revocable permissions.</li>
              <li>Standardized, interoperable, and scalable.</li>
              <li>Audit trails and compliance support.</li>
            </ul>
          </>
        )}
        {active === "loopholes" && (
          <>
            <h2>Loopholes & Cons</h2>
            <ul>
              <li>Implementation mistakes (open redirect, CSRF, improper token storage) can introduce vulnerabilities.</li>
              <li>Token revocation is not always instant across distributed systems.</li>
              <li>Short token lifetimes can impact UX if not handled with silent renewal.</li>
              <li>Mobile and SPA clients can’t securely store secrets.</li>
              <li>Complexity and misconfiguration risks.</li>
            </ul>
          </>
        )}
        {active === "future" && (
          <>
            <h2>Future Plans & Improvements</h2>
            <ul>
              <li>OAuth 2.1 (in progress): PKCE for all clients, removal of implicit flow, stricter redirect validation.</li>
              <li>FAPI 2.0: Financial-grade security for APIs.</li>
              <li>Better mobile and IoT support (secure storage, attestation).</li>
              <li>Machine learning for threat detection and adaptive authentication.</li>
              <li>Privacy enhancements and improved interoperability.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}