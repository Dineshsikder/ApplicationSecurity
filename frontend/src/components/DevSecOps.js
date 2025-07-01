import React, { useState } from 'react';
import './DevSecOps.css';

const DevSecOps = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArchitecture, setSelectedArchitecture] = useState('production');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏗️' },
    { id: 'architecture', label: 'Architecture', icon: '🏛️' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'monitoring', label: 'Monitoring', icon: '📊' },
    { id: 'disaster', label: 'Disaster Recovery', icon: '🚨' },
    { id: 'performance', label: 'Performance & TPS', icon: '⚡' },
    { id: 'automation', label: 'Automation', icon: '🤖' },
    { id: 'compliance', label: 'Compliance', icon: '📋' }
  ];

  const architectures = {
    development: {
      name: 'Development Environment',
      description: 'Local development setup with minimal security for rapid iteration',
      components: [
        'Local Docker containers',
        'In-memory databases',
        'Self-signed certificates',
        'Basic authentication',
        'Local Redis instance',
        'Development OAuth server'
      ],
      security: 'Basic security for development only',
      scaling: 'Single instance, no scaling'
    },
    staging: {
      name: 'Staging Environment',
      description: 'Pre-production environment with production-like security',
      components: [
        'Container orchestration (Docker Swarm)',
        'Managed databases',
        'Valid SSL certificates',
        'Full OAuth2/OIDC implementation',
        'Redis cluster',
        'Load balancer',
        'Monitoring stack'
      ],
      security: 'Production-like security policies',
      scaling: 'Auto-scaling based on load'
    },
    production: {
      name: 'Production Environment',
      description: 'High-availability production environment with enterprise security',
      components: [
        'Kubernetes orchestration',
        'Multi-region deployment',
        'Enterprise databases (RDS/Azure SQL)',
        'WAF and DDoS protection',
        'Advanced OAuth2/OIDC with PKCE',
        'Redis Enterprise cluster',
        'Global load balancer',
        'Comprehensive monitoring',
        'Security scanning',
        'Backup and disaster recovery'
      ],
      security: 'Enterprise-grade security with compliance',
      scaling: 'Global auto-scaling with 99.9% uptime'
    }
  };

  const securityPractices = {
    private: [
      {
        category: 'Infrastructure Security',
        practices: [
          {
            name: 'Network Segmentation',
            description: 'Isolate different tiers of the application',
            implementation: 'VPC, subnets, security groups, network ACLs',
            tools: ['AWS VPC', 'Azure VNet', 'GCP VPC', 'Cisco ACI']
          },
          {
            name: 'Secrets Management',
            description: 'Secure storage and rotation of sensitive data',
            implementation: 'Centralized secrets management with automatic rotation',
            tools: ['HashiCorp Vault', 'AWS Secrets Manager', 'Azure Key Vault', 'CyberArk']
          },
          {
            name: 'Container Security',
            description: 'Secure container images and runtime',
            implementation: 'Image scanning, runtime protection, least privilege',
            tools: ['Aqua Security', 'Twistlock', 'Snyk', 'Falco']
          },
          {
            name: 'Infrastructure as Code Security',
            description: 'Secure infrastructure provisioning',
            implementation: 'Static analysis, policy enforcement, drift detection',
            tools: ['Checkov', 'Terraform Sentinel', 'AWS Config', 'Azure Policy']
          }
        ]
      },
      {
        category: 'Application Security',
        practices: [
          {
            name: 'Static Application Security Testing (SAST)',
            description: 'Analyze source code for security vulnerabilities',
            implementation: 'Automated scanning in CI/CD pipeline',
            tools: ['SonarQube', 'Snyk', 'Checkmarx', 'Veracode']
          },
          {
            name: 'Dynamic Application Security Testing (DAST)',
            description: 'Test running applications for security issues',
            implementation: 'Automated security testing in staging/production',
            tools: ['OWASP ZAP', 'Burp Suite', 'Acunetix', 'AppScan']
          },
          {
            name: 'Interactive Application Security Testing (IAST)',
            description: 'Real-time security testing during application execution',
            implementation: 'Runtime security monitoring and testing',
            tools: ['Contrast Security', 'Hdiv', 'Seeker', 'CxSAST']
          },
          {
            name: 'Software Composition Analysis (SCA)',
            description: 'Identify vulnerabilities in third-party dependencies',
            implementation: 'Automated dependency scanning and updates',
            tools: ['Snyk', 'OWASP Dependency Check', 'WhiteSource', 'FOSSA']
          }
        ]
      },
      {
        category: 'Runtime Security',
        practices: [
          {
            name: 'Runtime Application Self-Protection (RASP)',
            description: 'Real-time application protection and monitoring',
            implementation: 'Embedded security controls in application runtime',
            tools: ['Contrast Security', 'Hdiv', 'Immunio', 'Prevoty']
          },
          {
            name: 'Web Application Firewall (WAF)',
            description: 'Protect against web application attacks',
            implementation: 'Layer 7 traffic filtering and attack prevention',
            tools: ['AWS WAF', 'Azure Application Gateway', 'Cloudflare', 'Imperva']
          },
          {
            name: 'API Security',
            description: 'Protect API endpoints and data',
            implementation: 'Rate limiting, authentication, input validation',
            tools: ['Kong', 'Tyk', 'AWS API Gateway', 'Azure API Management']
          }
        ]
      }
    ],
    public: [
      {
        category: 'Public Security Measures',
        practices: [
          {
            name: 'HTTPS Enforcement',
            description: 'Force all traffic over encrypted connections',
            implementation: 'HSTS headers, SSL/TLS configuration, certificate management',
            tools: ['Let\'s Encrypt', 'AWS Certificate Manager', 'Cloudflare SSL']
          },
          {
            name: 'Content Security Policy (CSP)',
            description: 'Prevent XSS attacks and control resource loading',
            implementation: 'CSP headers with strict policies',
            tools: ['CSP Builder', 'CSP Evaluator', 'Report-URI']
          },
          {
            name: 'Security Headers',
            description: 'Implement security headers for protection',
            implementation: 'X-Frame-Options, X-Content-Type-Options, etc.',
            tools: ['Security Headers', 'Mozilla Observatory', 'OWASP Security Headers']
          },
          {
            name: 'Rate Limiting',
            description: 'Prevent abuse and DDoS attacks',
            implementation: 'Request rate limiting per IP/user',
            tools: ['Redis Rate Limiting', 'Cloudflare Rate Limiting', 'AWS WAF']
          }
        ]
      }
    ]
  };

  const disasterRecovery = {
    strategies: [
      {
        name: 'Backup Strategy',
        description: 'Comprehensive data backup and recovery',
        components: [
          'Automated daily backups',
          'Point-in-time recovery',
          'Cross-region backup replication',
          'Backup encryption at rest',
          'Regular backup testing',
          'Backup monitoring and alerting'
        ],
        rto: '4 hours',
        rpo: '1 hour'
      },
      {
        name: 'High Availability',
        description: 'Multi-region deployment for continuous availability',
        components: [
          'Active-active deployment',
          'Global load balancing',
          'Database replication',
          'Auto-failover mechanisms',
          'Health check monitoring',
          'Traffic routing optimization'
        ],
        rto: '5 minutes',
        rpo: 'Near real-time'
      },
      {
        name: 'Disaster Recovery Sites',
        description: 'Geographically distributed recovery sites',
        components: [
          'Primary site (US East)',
          'Secondary site (US West)',
          'Tertiary site (Europe)',
          'Warm standby environments',
          'Automated failover testing',
          'Recovery documentation'
        ],
        rto: '30 minutes',
        rpo: '15 minutes'
      }
    ],
    procedures: [
      {
        phase: 'Detection',
        actions: [
          'Automated monitoring alerts',
          'Manual incident reporting',
          'Impact assessment',
          'Stakeholder notification'
        ]
      },
      {
        phase: 'Response',
        actions: [
          'Incident response team activation',
          'Communication plan execution',
          'Initial containment measures',
          'Customer notification'
        ]
      },
      {
        phase: 'Recovery',
        actions: [
          'Failover to secondary site',
          'Data restoration from backups',
          'Service validation',
          'Performance monitoring'
        ]
      },
      {
        phase: 'Restoration',
        actions: [
          'Primary site restoration',
          'Data synchronization',
          'Failback procedures',
          'Post-incident analysis'
        ]
      }
    ]
  };

  const performanceMetrics = {
    targets: {
      tps: '10,000 TPS',
      latency: '< 100ms (95th percentile)',
      availability: '99.9% uptime',
      errorRate: '< 0.1%'
    },
    scaling: {
      horizontal: [
        'Auto-scaling based on CPU/memory usage',
        'Load balancer distribution',
        'Database read replicas',
        'Redis cluster scaling',
        'CDN for static content'
      ],
      vertical: [
        'Instance type upgrades',
        'Memory optimization',
        'CPU optimization',
        'Storage performance tuning'
      ]
    },
    optimization: {
      application: [
        'Connection pooling',
        'Caching strategies',
        'Database query optimization',
        'Code profiling and optimization',
        'Async processing'
      ],
      infrastructure: [
        'CDN implementation',
        'Load balancer optimization',
        'Database indexing',
        'Network optimization',
        'Storage performance tuning'
      ]
    }
  };

  const monitoringStack = {
    infrastructure: [
      { name: 'Prometheus', purpose: 'Metrics collection and storage' },
      { name: 'Grafana', purpose: 'Visualization and dashboards' },
      { name: 'AlertManager', purpose: 'Alert routing and notification' },
      { name: 'Node Exporter', purpose: 'System metrics collection' }
    ],
    application: [
      { name: 'Jaeger', purpose: 'Distributed tracing' },
      { name: 'ELK Stack', purpose: 'Log aggregation and analysis' },
      { name: 'APM Tools', purpose: 'Application performance monitoring' },
      { name: 'Custom Metrics', purpose: 'Business metrics collection' }
    ],
    security: [
      { name: 'SIEM', purpose: 'Security information and event management' },
      { name: 'Vulnerability Scanners', purpose: 'Continuous security scanning' },
      { name: 'Compliance Monitoring', purpose: 'Regulatory compliance tracking' },
      { name: 'Threat Intelligence', purpose: 'Real-time threat detection' }
    ]
  };

  const automationPipelines = {
    ci: {
      stages: [
        {
          name: 'Code Quality',
          tools: ['SonarQube', 'ESLint', 'Prettier'],
          actions: ['Static analysis', 'Code formatting', 'Security scanning']
        },
        {
          name: 'Testing',
          tools: ['Jest', 'Cypress', 'Postman'],
          actions: ['Unit tests', 'Integration tests', 'API tests']
        },
        {
          name: 'Security',
          tools: ['Snyk', 'OWASP ZAP', 'Trivy'],
          actions: ['Dependency scanning', 'Vulnerability assessment', 'Container scanning']
        },
        {
          name: 'Build',
          tools: ['Docker', 'Maven', 'npm'],
          actions: ['Container building', 'Artifact creation', 'Image scanning']
        }
      ]
    },
    cd: {
      environments: [
        {
          name: 'Development',
          triggers: ['Push to develop branch'],
          approvals: 'None',
          rollback: 'Automatic on failure'
        },
        {
          name: 'Staging',
          triggers: ['Merge to staging branch'],
          approvals: 'Automated tests',
          rollback: 'Manual or automatic'
        },
        {
          name: 'Production',
          triggers: ['Merge to main branch'],
          approvals: 'Manual approval required',
          rollback: 'Blue-green deployment'
        }
      ]
    }
  };

  const complianceFrameworks = [
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 compliance',
      requirements: [
        'Security controls implementation',
        'Access management',
        'Change management',
        'Incident response',
        'Risk assessment'
      ],
      tools: ['Vanta', 'Drata', 'Secureframe', 'Custom monitoring']
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system',
      requirements: [
        'Information security policies',
        'Asset management',
        'Human resource security',
        'Physical and environmental security',
        'Operations security'
      ],
      tools: ['ISO 27001 toolkit', 'Risk assessment tools', 'Documentation management']
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation compliance',
      requirements: [
        'Data protection by design',
        'Consent management',
        'Data subject rights',
        'Data breach notification',
        'Privacy impact assessments'
      ],
      tools: ['OneTrust', 'TrustArc', 'Custom privacy tools']
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      requirements: [
        'Network security',
        'Vulnerability management',
        'Access control',
        'Monitoring and testing',
        'Information security policy'
      ],
      tools: ['Qualys', 'Rapid7', 'Custom PCI tools']
    }
  ];

  const renderArchitectureDiagram = () => (
    <div className="architecture-diagram">
      <div className="diagram-header">
        <h3>{architectures[selectedArchitecture].name}</h3>
        <p>{architectures[selectedArchitecture].description}</p>
      </div>
      
      <div className="diagram-container">
        <div className="diagram-layer">
          <div className="layer-title">Load Balancer / CDN</div>
          <div className="layer-components">
            <div className="component">Global Load Balancer</div>
            <div className="component">CDN</div>
            <div className="component">WAF</div>
          </div>
        </div>
        
        <div className="diagram-layer">
          <div className="layer-title">Application Layer</div>
          <div className="layer-components">
            <div className="component">API Gateway</div>
            <div className="component">Auth Server</div>
            <div className="component">Resource Server</div>
            <div className="component">Frontend</div>
          </div>
        </div>
        
        <div className="diagram-layer">
          <div className="layer-title">Data Layer</div>
          <div className="layer-components">
            <div className="component">Primary DB</div>
            <div className="component">Read Replicas</div>
            <div className="component">Redis Cluster</div>
            <div className="component">Backup Storage</div>
          </div>
        </div>
        
        <div className="diagram-layer">
          <div className="layer-title">Monitoring & Security</div>
          <div className="layer-components">
            <div className="component">Prometheus</div>
            <div className="component">Grafana</div>
            <div className="component">SIEM</div>
            <div className="component">Vault</div>
          </div>
        </div>
      </div>
      
      <div className="architecture-details">
        <div className="detail-section">
          <h4>Components</h4>
          <ul>
            {architectures[selectedArchitecture].components.map((component, index) => (
              <li key={index}>{component}</li>
            ))}
          </ul>
        </div>
        <div className="detail-section">
          <h4>Security</h4>
          <p>{architectures[selectedArchitecture].security}</p>
        </div>
        <div className="detail-section">
          <h4>Scaling</h4>
          <p>{architectures[selectedArchitecture].scaling}</p>
        </div>
      </div>
    </div>
  );

  const renderSecurityPractices = () => (
    <div className="security-practices">
      <div className="security-section">
        <h3>🔒 Private Security Practices</h3>
        {securityPractices.private.map((category, index) => (
          <div key={index} className="security-category">
            <h4>{category.category}</h4>
            <div className="practices-grid">
              {category.practices.map((practice, pIndex) => (
                <div key={pIndex} className="practice-card">
                  <h5>{practice.name}</h5>
                  <p>{practice.description}</p>
                  <div className="practice-details">
                    <strong>Implementation:</strong> {practice.implementation}
                  </div>
                  <div className="practice-tools">
                    <strong>Tools:</strong> {practice.tools.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="security-section">
        <h3>🌐 Public Security Measures</h3>
        {securityPractices.public.map((category, index) => (
          <div key={index} className="security-category">
            <h4>{category.category}</h4>
            <div className="practices-grid">
              {category.practices.map((practice, pIndex) => (
                <div key={pIndex} className="practice-card">
                  <h5>{practice.name}</h5>
                  <p>{practice.description}</p>
                  <div className="practice-details">
                    <strong>Implementation:</strong> {practice.implementation}
                  </div>
                  <div className="practice-tools">
                    <strong>Tools:</strong> {practice.tools.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDisasterRecovery = () => (
    <div className="disaster-recovery">
      <div className="dr-strategies">
        <h3>🚨 Disaster Recovery Strategies</h3>
        <div className="strategies-grid">
          {disasterRecovery.strategies.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <h4>{strategy.name}</h4>
              <p>{strategy.description}</p>
              <div className="strategy-metrics">
                <div className="metric">
                  <strong>RTO:</strong> {strategy.rto}
                </div>
                <div className="metric">
                  <strong>RPO:</strong> {strategy.rpo}
                </div>
              </div>
              <div className="strategy-components">
                <h5>Components:</h5>
                <ul>
                  {strategy.components.map((component, cIndex) => (
                    <li key={cIndex}>{component}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="dr-procedures">
        <h3>📋 Disaster Recovery Procedures</h3>
        <div className="procedures-timeline">
          {disasterRecovery.procedures.map((phase, index) => (
            <div key={index} className="procedure-phase">
              <div className="phase-header">
                <h4>{phase.phase}</h4>
                <div className="phase-number">{index + 1}</div>
              </div>
              <ul>
                {phase.actions.map((action, aIndex) => (
                  <li key={aIndex}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="performance-section">
      <div className="performance-targets">
        <h3>⚡ Performance Targets</h3>
        <div className="targets-grid">
          {Object.entries(performanceMetrics.targets).map(([key, value]) => (
            <div key={key} className="target-card">
              <h4>{key.toUpperCase()}</h4>
              <div className="target-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="scaling-strategies">
        <h3>📈 Scaling Strategies</h3>
        <div className="scaling-container">
          <div className="scaling-type">
            <h4>Horizontal Scaling</h4>
            <ul>
              {performanceMetrics.scaling.horizontal.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>
          <div className="scaling-type">
            <h4>Vertical Scaling</h4>
            <ul>
              {performanceMetrics.scaling.vertical.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="optimization-strategies">
        <h3>🔧 Optimization Strategies</h3>
        <div className="optimization-container">
          <div className="optimization-type">
            <h4>Application Optimization</h4>
            <ul>
              {performanceMetrics.optimization.application.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>
          <div className="optimization-type">
            <h4>Infrastructure Optimization</h4>
            <ul>
              {performanceMetrics.optimization.infrastructure.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="monitoring-section">
      <div className="monitoring-stack">
        <h3>📊 Monitoring Stack</h3>
        <div className="stack-categories">
          <div className="stack-category">
            <h4>Infrastructure Monitoring</h4>
            <div className="tools-grid">
              {monitoringStack.infrastructure.map((tool, index) => (
                <div key={index} className="tool-card">
                  <h5>{tool.name}</h5>
                  <p>{tool.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="stack-category">
            <h4>Application Monitoring</h4>
            <div className="tools-grid">
              {monitoringStack.application.map((tool, index) => (
                <div key={index} className="tool-card">
                  <h5>{tool.name}</h5>
                  <p>{tool.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="stack-category">
            <h4>Security Monitoring</h4>
            <div className="tools-grid">
              {monitoringStack.security.map((tool, index) => (
                <div key={index} className="tool-card">
                  <h5>{tool.name}</h5>
                  <p>{tool.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="automation-section">
      <div className="ci-pipeline">
        <h3>🔄 CI/CD Pipeline</h3>
        <div className="pipeline-stages">
          <h4>Continuous Integration</h4>
          <div className="stages-grid">
            {automationPipelines.ci.stages.map((stage, index) => (
              <div key={index} className="stage-card">
                <h5>{stage.name}</h5>
                <div className="stage-tools">
                  <strong>Tools:</strong> {stage.tools.join(', ')}
                </div>
                <div className="stage-actions">
                  <strong>Actions:</strong>
                  <ul>
                    {stage.actions.map((action, aIndex) => (
                      <li key={aIndex}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cd-pipeline">
          <h4>Continuous Deployment</h4>
          <div className="environments-grid">
            {automationPipelines.cd.environments.map((env, index) => (
              <div key={index} className="environment-card">
                <h5>{env.name}</h5>
                <div className="env-details">
                  <div><strong>Triggers:</strong> {env.triggers}</div>
                  <div><strong>Approvals:</strong> {env.approvals}</div>
                  <div><strong>Rollback:</strong> {env.rollback}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="compliance-section">
      <h3>📋 Compliance Frameworks</h3>
      <div className="compliance-grid">
        {complianceFrameworks.map((framework, index) => (
          <div key={index} className="compliance-card">
            <h4>{framework.name}</h4>
            <p>{framework.description}</p>
            <div className="framework-requirements">
              <h5>Requirements:</h5>
              <ul>
                {framework.requirements.map((req, rIndex) => (
                  <li key={rIndex}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="framework-tools">
              <h5>Tools:</h5>
              <p>{framework.tools.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-section">
            <h2>DevOps & DevSecOps Overview</h2>
            <div className="overview-content">
              <div className="overview-card">
                <h3>🚀 What is DevOps?</h3>
                <p>DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality.</p>
                <ul>
                  <li>Automated CI/CD pipelines</li>
                  <li>Infrastructure as Code</li>
                  <li>Continuous monitoring and feedback</li>
                  <li>Collaboration and communication</li>
                </ul>
              </div>
              
              <div className="overview-card">
                <h3>🔒 What is DevSecOps?</h3>
                <p>DevSecOps integrates security practices within the DevOps process, creating a 'Security as Code' culture with continuous, flexible collaboration between release engineers and security teams.</p>
                <ul>
                  <li>Security integrated into CI/CD</li>
                  <li>Automated security testing</li>
                  <li>Continuous security monitoring</li>
                  <li>Security compliance automation</li>
                </ul>
              </div>
              
              <div className="overview-card">
                <h3>🎯 Key Benefits</h3>
                <ul>
                  <li><strong>Faster Delivery:</strong> Automated pipelines reduce time to market</li>
                  <li><strong>Improved Quality:</strong> Continuous testing and monitoring</li>
                  <li><strong>Enhanced Security:</strong> Security built into every stage</li>
                  <li><strong>Better Collaboration:</strong> Cross-functional teams</li>
                  <li><strong>Reduced Risk:</strong> Early detection and prevention</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'architecture':
        return (
          <div className="architecture-section">
            <h2>Architecture Diagrams</h2>
            <div className="architecture-selector">
              <button 
                className={selectedArchitecture === 'development' ? 'active' : ''}
                onClick={() => setSelectedArchitecture('development')}
              >
                Development
              </button>
              <button 
                className={selectedArchitecture === 'staging' ? 'active' : ''}
                onClick={() => setSelectedArchitecture('staging')}
              >
                Staging
              </button>
              <button 
                className={selectedArchitecture === 'production' ? 'active' : ''}
                onClick={() => setSelectedArchitecture('production')}
              >
                Production
              </button>
            </div>
            {renderArchitectureDiagram()}
          </div>
        );
      case 'security':
        return (
          <div className="security-section">
            <h2>Security Practices</h2>
            {renderSecurityPractices()}
          </div>
        );
      case 'monitoring':
        return (
          <div className="monitoring-section">
            <h2>Monitoring & Observability</h2>
            {renderMonitoring()}
          </div>
        );
      case 'disaster':
        return (
          <div className="disaster-section">
            <h2>Disaster Recovery</h2>
            {renderDisasterRecovery()}
          </div>
        );
      case 'performance':
        return (
          <div className="performance-section">
            <h2>Performance & TPS Handling</h2>
            {renderPerformance()}
          </div>
        );
      case 'automation':
        return (
          <div className="automation-section">
            <h2>Automation & CI/CD</h2>
            {renderAutomation()}
          </div>
        );
      case 'compliance':
        return (
          <div className="compliance-section">
            <h2>Compliance & Governance</h2>
            {renderCompliance()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="devsecops-container">
      <div className="devsecops-header">
        <h1>DevOps & DevSecOps</h1>
        <p>Comprehensive guide to modern DevOps practices, security integration, and operational excellence</p>
      </div>

      <div className="devsecops-content">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DevSecOps; 