import React from 'react';

const Agenda = () => {
  const agendaItems = [
    {
      time: '09:00 - 09:15',
      title: 'Introduction & Welcome',
      description: 'Overview of the OAuth2/OIDC demo application and agenda',
      icon: '👋'
    },
    {
      time: '09:15 - 09:45',
      title: 'OAuth2 Fundamentals',
      description: 'Understanding OAuth2 flows, tokens, and security concepts',
      icon: '🔐'
    },
    {
      time: '09:45 - 10:15',
      title: 'OpenID Connect (OIDC)',
      description: 'How OIDC extends OAuth2 for identity and authentication',
      icon: '🆔'
    },
    {
      time: '10:15 - 10:30',
      title: 'Break',
      description: 'Coffee break and networking',
      icon: '☕'
    },
    {
      time: '10:30 - 11:00',
      title: 'PKCE Flow Demonstration',
      description: 'Live demonstration of Proof Key for Code Exchange',
      icon: '🔑'
    },
    {
      time: '11:00 - 11:30',
      title: 'JWT Tokens & Security',
      description: 'JSON Web Tokens, validation, and security best practices',
      icon: '🎫'
    },
    {
      time: '11:30 - 12:00',
      title: 'Token Refresh & Blacklisting',
      description: 'Managing token lifecycle and revocation strategies',
      icon: '🔄'
    },
    {
      time: '12:00 - 13:00',
      title: 'Lunch Break',
      description: 'Lunch and informal discussions',
      icon: '🍽️'
    },
    {
      time: '13:00 - 13:30',
      title: 'Role-Based Access Control',
      description: 'Implementing RBAC with OAuth2 scopes and claims',
      icon: '👥'
    },
    {
      time: '13:30 - 14:00',
      title: 'API Gateway Security',
      description: 'Securing microservices with API gateway patterns',
      icon: '🌐'
    },
    {
      time: '14:00 - 14:30',
      title: 'Security Best Practices',
      description: 'Industry best practices for OAuth2 implementation',
      icon: '🛡️'
    },
    {
      time: '14:30 - 15:00',
      title: 'Q&A Session',
      description: 'Open discussion and questions from participants',
      icon: '❓'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Presentation Agenda</h1>
        <p className="page-subtitle">
          Comprehensive overview of OAuth2/OIDC security implementation and best practices
        </p>
      </div>

      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Agenda Overview</h2>
            <p className="section-subtitle">
              A structured presentation covering all aspects of modern application security
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {agendaItems.map((item, index) => (
              <div key={index} className="content-section">
                <div className="flex items-center gap-4">
                  <div className="feature-icon">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium text-secondary bg-secondary px-3 py-1 rounded-full">
                        {item.time}
                      </span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Learning Objectives</h2>
            <p className="section-subtitle">
              What you'll learn from this comprehensive security demonstration
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Understanding OAuth2 flows and use cases</li>
                <li>• Implementing PKCE for public clients</li>
                <li>• Managing JWT tokens securely</li>
                <li>• Setting up role-based access control</li>
                <li>• Securing microservices architecture</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Security Knowledge</h3>
              <ul className="space-y-2 text-secondary">
                <li>• OAuth2 security best practices</li>
                <li>• Token lifecycle management</li>
                <li>• Preventing common security vulnerabilities</li>
                <li>• Compliance and audit considerations</li>
                <li>• Incident response and monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Prerequisites</h2>
            <p className="section-subtitle">
              Recommended background knowledge for optimal learning experience
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">💻</div>
              <h3 className="font-semibold mb-2">Basic Programming</h3>
              <p className="text-secondary text-sm">
                Familiarity with Java/Spring Boot and JavaScript/React
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🌐</div>
              <h3 className="font-semibold mb-2">Web Technologies</h3>
              <p className="text-secondary text-sm">
                Understanding of HTTP, REST APIs, and web security concepts
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Security Basics</h3>
              <p className="text-secondary text-sm">
                Basic knowledge of authentication and authorization concepts
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Agenda; 