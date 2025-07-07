import React from 'react';

const DevSecOps = () => {
  const devsecopsPillars = [
    {
      title: 'Development Security',
      icon: '💻',
      description: 'Integrating security into the development lifecycle',
      practices: [
        'Secure coding practices',
        'Code review with security focus',
        'Static application security testing (SAST)',
        'Dependency vulnerability scanning',
        'Security-focused unit testing'
      ]
    },
    {
      title: 'Operations Security',
      icon: '⚙️',
      description: 'Securing infrastructure and deployment processes',
      practices: [
        'Infrastructure as Code (IaC) security',
        'Container security scanning',
        'Secrets management',
        'Network security configuration',
        'Monitoring and alerting'
      ]
    },
    {
      title: 'Security Automation',
      icon: '🤖',
      description: 'Automating security processes and compliance',
      practices: [
        'Automated security testing',
        'Compliance automation',
        'Security policy enforcement',
        'Incident response automation',
        'Continuous security monitoring'
      ]
    }
  ];

  const securityTools = [
    {
      category: 'Static Analysis',
      tools: [
        { name: 'SonarQube', purpose: 'Code quality and security analysis' },
        { name: 'OWASP ZAP', purpose: 'Web application security testing' },
        { name: 'Bandit', purpose: 'Python security linter' },
        { name: 'SpotBugs', purpose: 'Java static analysis' }
      ]
    },
    {
      category: 'Dependency Scanning',
      tools: [
        { name: 'OWASP Dependency Check', purpose: 'Vulnerability scanning' },
        { name: 'Snyk', purpose: 'Dependency and container security' },
        { name: 'WhiteSource', purpose: 'Open source security' },
        { name: 'GitHub Dependabot', purpose: 'Automated dependency updates' }
      ]
    },
    {
      category: 'Container Security',
      tools: [
        { name: 'Trivy', purpose: 'Container vulnerability scanner' },
        { name: 'Clair', purpose: 'Container image analysis' },
        { name: 'Falco', purpose: 'Runtime security monitoring' },
        { name: 'Anchore', purpose: 'Container security platform' }
      ]
    },
    {
      category: 'Secrets Management',
      tools: [
        { name: 'HashiCorp Vault', purpose: 'Secrets and encryption management' },
        { name: 'AWS Secrets Manager', purpose: 'Cloud secrets management' },
        { name: 'Azure Key Vault', purpose: 'Microsoft secrets management' },
        { name: 'GitGuardian', purpose: 'Secrets detection in code' }
      ]
    }
  ];

  const ciCdPipeline = [
    {
      stage: 'Code Commit',
      security: [
        'Pre-commit hooks for security checks',
        'Branch protection rules',
        'Required security reviews',
        'Automated dependency scanning'
      ]
    },
    {
      stage: 'Build',
      security: [
        'SAST scanning during build',
        'Dependency vulnerability checks',
        'Container image scanning',
        'Security policy validation'
      ]
    },
    {
      stage: 'Test',
      security: [
        'Dynamic application security testing (DAST)',
        'Penetration testing automation',
        'Security regression testing',
        'Compliance validation'
      ]
    },
    {
      stage: 'Deploy',
      security: [
        'Secrets injection',
        'Infrastructure security validation',
        'Runtime security monitoring',
        'Compliance verification'
      ]
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">DevSecOps & Security Automation</h1>
        <p className="page-subtitle">
          Integrating security into every phase of the development and operations lifecycle
        </p>
      </div>

      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">DevSecOps Pillars</h2>
            <p className="section-subtitle">
              Core principles for integrating security into DevOps practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devsecopsPillars.map((pillar, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{pillar.icon}</div>
                <h3 className="feature-title">{pillar.title}</h3>
                <p className="feature-description mb-4">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-start gap-2 text-secondary">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Tools & Technologies</h2>
            <p className="section-subtitle">
              Essential tools for implementing DevSecOps practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityTools.map((category, index) => (
              <div key={index} className="content-section">
                <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium text-primary">{tool.name}</h4>
                      <p className="text-secondary text-sm">{tool.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">CI/CD Security Pipeline</h2>
            <p className="section-subtitle">
              Security integration at every stage of the continuous integration and deployment pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ciCdPipeline.map((stage, index) => (
              <div key={index} className="content-section">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold">{stage.stage}</h3>
                </div>
                <ul className="space-y-2">
                  {stage.security.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-secondary">
                      <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Best Practices</h2>
            <p className="section-subtitle">
              Essential practices for maintaining security throughout the development lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Development Practices</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Implement secure coding standards</li>
                <li>• Regular security training for developers</li>
                <li>• Code review with security checklist</li>
                <li>• Automated security testing in CI/CD</li>
                <li>• Dependency vulnerability management</li>
                <li>• Secrets management best practices</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Operations Practices</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Infrastructure security hardening</li>
                <li>• Container security scanning</li>
                <li>• Network segmentation and monitoring</li>
                <li>• Incident response procedures</li>
                <li>• Regular security audits</li>
                <li>• Compliance monitoring and reporting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Monitoring & Compliance</h2>
            <p className="section-subtitle">
              Continuous monitoring and compliance verification for security assurance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">📊</div>
              <h3 className="font-semibold mb-2">Security Metrics</h3>
              <p className="text-secondary text-sm">
                Track security KPIs, vulnerability trends, and compliance status
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🚨</div>
              <h3 className="font-semibold mb-2">Alerting</h3>
              <p className="text-secondary text-sm">
                Real-time alerts for security incidents and policy violations
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">📋</div>
              <h3 className="font-semibold mb-2">Compliance</h3>
              <p className="text-secondary text-sm">
                Automated compliance checking and reporting for regulatory requirements
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DevSecOps; 