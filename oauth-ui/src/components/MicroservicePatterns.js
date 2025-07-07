import React from 'react';

const MicroservicePatterns = () => {
  const patterns = [
    {
      name: 'API Gateway Pattern',
      icon: '🚪',
      description: 'Centralized entry point for all client requests to microservices',
      benefits: [
        'Single point of entry for all clients',
        'Authentication and authorization',
        'Rate limiting and throttling',
        'Request routing and load balancing',
        'Cross-cutting concerns handling'
      ],
      implementation: [
        'Spring Cloud Gateway configuration',
        'JWT token validation',
        'Circuit breaker integration',
        'Request/response transformation',
        'Monitoring and logging'
      ]
    },
    {
      name: 'Circuit Breaker Pattern',
      icon: '⚡',
      description: 'Prevents cascading failures by monitoring service health and failing fast',
      benefits: [
        'Prevents cascading failures',
        'Improves system resilience',
        'Provides fallback mechanisms',
        'Reduces response times',
        'Better user experience'
      ],
      implementation: [
        'Resilience4j integration',
        'Circuit breaker configuration',
        'Fallback methods',
        'Health check endpoints',
        'Monitoring and alerting'
      ]
    },
    {
      name: 'Service Discovery',
      icon: '🔍',
      description: 'Dynamic service registration and discovery in distributed systems',
      benefits: [
        'Dynamic service registration',
        'Load balancing support',
        'Health check integration',
        'Service scaling',
        'Reduced configuration complexity'
      ],
      implementation: [
        'Eureka server setup',
        'Client registration',
        'Health check configuration',
        'Service metadata',
        'Discovery client integration'
      ]
    },
    {
      name: 'Distributed Tracing',
      icon: '🕵️',
      description: 'Track requests across multiple services for debugging and monitoring',
      benefits: [
        'Request flow visualization',
        'Performance bottleneck identification',
        'Error tracking and debugging',
        'Service dependency mapping',
        'Operational insights'
      ],
      implementation: [
        'Sleuth integration',
        'Trace ID propagation',
        'Span correlation',
        'Zipkin integration',
        'Custom trace annotations'
      ]
    },
    {
      name: 'Event-Driven Architecture',
      icon: '📡',
      description: 'Loose coupling through asynchronous event communication',
      benefits: [
        'Loose coupling between services',
        'Scalability and performance',
        'Fault tolerance',
        'Real-time processing',
        'Flexible integration'
      ],
      implementation: [
        'Spring Cloud Stream',
        'Event sourcing',
        'Message brokers (Kafka/RabbitMQ)',
        'Event versioning',
        'Dead letter queues'
      ]
    },
    {
      name: 'CQRS Pattern',
      icon: '📊',
      description: 'Separate read and write models for optimized performance and scalability',
      benefits: [
        'Optimized read/write operations',
        'Scalability improvements',
        'Flexible data models',
        'Performance optimization',
        'Event sourcing compatibility'
      ],
      implementation: [
        'Command and query separation',
        'Event sourcing integration',
        'Read model optimization',
        'Write model validation',
        'Data consistency patterns'
      ]
    }
  ];

  const securityPatterns = [
    {
      title: 'Zero Trust Security',
      description: 'Never trust, always verify approach to security',
      practices: [
        'Identity verification for every request',
        'Least privilege access control',
        'Continuous monitoring and validation',
        'Micro-segmentation of services'
      ]
    },
    {
      title: 'Defense in Depth',
      description: 'Multiple layers of security controls',
      practices: [
        'Network-level security',
        'Application-level security',
        'Data-level encryption',
        'Monitoring and alerting'
      ]
    },
    {
      title: 'Secure Communication',
      description: 'Encrypted communication between services',
      practices: [
        'TLS/SSL for all communications',
        'Certificate management',
        'Mutual TLS authentication',
        'Secure service mesh'
      ]
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Microservice Patterns</h1>
        <p className="page-subtitle">
          Essential patterns and best practices for building secure, scalable microservices architecture
        </p>
      </div>

      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Core Microservice Patterns</h2>
            <p className="section-subtitle">
              Fundamental patterns that ensure reliability, scalability, and maintainability
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {patterns.map((pattern, index) => (
              <div key={index} className="content-section">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="feature-icon">{pattern.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{pattern.name}</h3>
                    <p className="text-secondary mb-4">{pattern.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Benefits</h4>
                        <ul className="space-y-2">
                          {pattern.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center gap-2 text-secondary">
                              <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Implementation</h4>
                        <ul className="space-y-2">
                          {pattern.implementation.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-secondary">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Security Patterns</h2>
            <p className="section-subtitle">
              Security-first patterns for protecting microservices architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityPatterns.map((pattern, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{pattern.title}</h3>
                <p className="feature-description mb-4">{pattern.description}</p>
                <ul className="space-y-2">
                  {pattern.practices.map((practice, practiceIndex) => (
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
            <h2 className="section-title">Implementation Guidelines</h2>
            <p className="section-subtitle">
              Best practices for implementing microservices patterns effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Design Principles</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Single Responsibility Principle</li>
                <li>• Loose Coupling</li>
                <li>• High Cohesion</li>
                <li>• Fault Tolerance</li>
                <li>• Observability</li>
                <li>• Security by Design</li>
              </ul>
            </div>

            <div className="content-section">
              <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Spring Boot for services</li>
                <li>• Spring Cloud for patterns</li>
                <li>• Docker for containerization</li>
                <li>• Kubernetes for orchestration</li>
                <li>• Redis for caching</li>
                <li>• Prometheus for monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Monitoring & Observability</h2>
            <p className="section-subtitle">
              Essential monitoring patterns for microservices architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">📊</div>
              <h3 className="font-semibold mb-2">Metrics</h3>
              <p className="text-secondary text-sm">
                Collect and analyze performance metrics, business KPIs, and system health indicators
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">📝</div>
              <h3 className="font-semibold mb-2">Logging</h3>
              <p className="text-secondary text-sm">
                Centralized logging with structured data for debugging and audit trails
              </p>
            </div>

            <div className="content-section text-center">
              <div className="feature-icon mx-auto mb-3">🔍</div>
              <h3 className="font-semibold mb-2">Tracing</h3>
              <p className="text-secondary text-sm">
                Distributed tracing to understand request flow and identify bottlenecks
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MicroservicePatterns; 