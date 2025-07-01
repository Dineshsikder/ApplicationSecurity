import React, { useState } from 'react';
import './MicroservicePatterns.css';

const MicroservicePatterns = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPattern, setSelectedPattern] = useState('synchronous');
  const [copiedCode, setCopiedCode] = useState('');

  const patterns = [
    {
      id: 'synchronous',
      name: 'Synchronous Communication',
      description: 'Direct request-response communication between services using HTTP/REST or gRPC. Best for simple workflows with immediate responses.',
      icon: '🔄',
      color: '#4CAF50',
      whenToUse: 'Use when you need immediate responses, simple workflows, or when services are tightly coupled. Good for CRUD operations and simple integrations.'
    },
    {
      id: 'asynchronous',
      name: 'Asynchronous Communication',
      description: 'Event-driven communication using message queues and event streaming. Enables loose coupling and better scalability.',
      icon: '📨',
      color: '#2196F3',
      whenToUse: 'Use for complex workflows, when you need high throughput, or when services should be loosely coupled. Ideal for event-driven architectures.'
    },
    {
      id: 'api-gateway',
      name: 'API Gateway Pattern',
      description: 'Centralized entry point for all client requests with routing, security, and cross-cutting concerns management.',
      icon: '🚪',
      color: '#FF9800',
      whenToUse: 'Use when you have multiple clients accessing multiple services, need centralized security, or want to simplify client integration.'
    },
    {
      id: 'service-mesh',
      name: 'Service Mesh',
      description: 'Infrastructure layer for service-to-service communication with advanced networking, security, and observability features.',
      icon: '🕸️',
      color: '#9C27B0',
      whenToUse: 'Use in large microservice deployments, when you need advanced traffic management, or want zero-trust security without code changes.'
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      description: 'Storing all changes as a sequence of events for complete audit trail and state reconstruction capabilities.',
      icon: '📊',
      color: '#607D8B',
      whenToUse: 'Use when you need complete audit trails, temporal querying, or want to decouple read and write models. Good for financial and compliance systems.'
    },
    {
      id: 'saga-pattern',
      name: 'Saga Pattern',
      description: 'Managing distributed transactions across multiple microservices with compensation logic for failure handling.',
      icon: '⚡',
      color: '#E91E63',
      whenToUse: 'Use for complex business workflows that span multiple services, when you need distributed transaction support, or long-running processes.'
    }
  ];

  const copyToClipboard = (text, codeId) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const renderPatternContent = () => {
    switch (selectedPattern) {
      case 'synchronous':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#4CAF50' }}>
                  🔄
                </div>
                <div>
                  <h2>Synchronous Communication Pattern</h2>
                  <p>Direct request-response communication between microservices using HTTP/REST or gRPC</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node gateway">
                  <div className="node-icon">🚪</div>
                  <div className="node-label">API Gateway</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service A</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service2">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service B</div>
                </div>
                <div className="arrow">←</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service A</div>
                </div>
                <div className="arrow">←</div>
                <div className="service-node gateway">
                  <div className="node-icon">🚪</div>
                  <div className="node-label">API Gateway</div>
                </div>
                <div className="arrow">←</div>
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
              </div>
            </div>

            <div className="implementation-section">
              <h3>Implementation Example</h3>
              <div className="code-block large">
                <div className="code-header">
                  <span>Spring Boot Service Communication (with JWT Validation)</span>
                  <button 
                    className={`copy-btn ${copiedCode === 'sync-spring' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(`// Service A: Sending JWT
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private UserServiceClient userServiceClient;
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request, @RequestHeader("Authorization") String token) {
        // Pass JWT to downstream service
        User user = userServiceClient.getUser(request.getUserId(), token);
        // ...
        return ResponseEntity.ok(orderService.save(order));
    }
}

// Service B: Validating JWT
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id, @RequestHeader("Authorization") String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // ...
        return ResponseEntity.ok(userService.findById(id));
    }
}`,'sync-spring')}
                  >
                    {copiedCode === 'sync-spring' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre><code>{`// Service A: Sending JWT
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private UserServiceClient userServiceClient;
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request, @RequestHeader("Authorization") String token) {
        // Pass JWT to downstream service
        User user = userServiceClient.getUser(request.getUserId(), token);
        // ...
        return ResponseEntity.ok(orderService.save(order));
    }
}

// Service B: Validating JWT
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id, @RequestHeader("Authorization") String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // ...
        return ResponseEntity.ok(userService.findById(id));
    }
}`}</code></pre>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Simple CRUD operations</li>
                    <li>Immediate response requirements</li>
                    <li>Tightly coupled services</li>
                    <li>Simple integrations</li>
                    <li>Low latency requirements</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Complex workflows</li>
                    <li>High throughput requirements</li>
                    <li>Long-running operations</li>
                    <li>Loose coupling needed</li>
                    <li>Fault tolerance critical</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use circuit breakers for resilience</li>
                    <li>Implement proper timeout handling</li>
                    <li>Add retry mechanisms</li>
                    <li>Monitor service dependencies</li>
                    <li>Use connection pooling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="security-section">
              <h3>Security Aspects</h3>
              <div className="security-grid">
                <div className="security-card">
                  <h4>🔐 Authentication</h4>
                  <p>JWT tokens for service-to-service authentication</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>JWT Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'sync-jwt' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt());
        return http.build();
    }
}`, 'sync-jwt')}
                      >
                        {copiedCode === 'sync-jwt' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt());
        return http.build();
    }
}`}</code></pre>
                  </div>
                </div>

                <div className="security-card">
                  <h4>🛡️ Authorization</h4>
                  <p>Role-based access control for service endpoints</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>RBAC Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'sync-rbac' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userService.findAll();
}

@PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
@GetMapping("/users/{userId}")
public User getUser(@PathVariable Long userId) {
    return userService.findById(userId);
}`, 'sync-rbac')}
                      >
                        {copiedCode === 'sync-rbac' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userService.findAll();
}

@PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
@GetMapping("/users/{userId}")
public User getUser(@PathVariable Long userId) {
    return userService.findById(userId);
}`}</code></pre>
                  </div>
                </div>

                <div className="security-card">
                  <h4>🔒 Encryption</h4>
                  <p>TLS/SSL encryption for data in transit</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>TLS Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'sync-tls' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`server:
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: your-keystore-password
    key-store-type: PKCS12
    key-alias: tomcat

spring:
  cloud:
    gateway:
      httpclient:
        ssl:
          useInsecureTrustManager: false`, 'sync-tls')}
                      >
                        {copiedCode === 'sync-tls' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`server:
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: your-keystore-password
    key-store-type: PKCS12
    key-alias: tomcat

spring:
  cloud:
    gateway:
      httpclient:
        ssl:
          useInsecureTrustManager: false`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Simple to implement and understand</li>
                    <li>Immediate response and error handling</li>
                    <li>Easy to debug and trace requests</li>
                    <li>Consistent with REST principles</li>
                    <li>Good for simple workflows</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>Creates tight coupling between services</li>
                    <li>Can cause cascading failures</li>
                    <li>Higher latency due to sequential calls</li>
                    <li>Difficult to scale independently</li>
                    <li>Blocking nature can impact performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'asynchronous':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#2196F3' }}>
                  📨
                </div>
                <div>
                  <h2>Asynchronous Communication Pattern</h2>
                  <p>Event-driven communication using message queues and event streaming</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram async">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node gateway">
                  <div className="node-icon">🚪</div>
                  <div className="node-label">API Gateway</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Order Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node queue">
                  <div className="node-icon">📨</div>
                  <div className="node-label">Message Queue</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service2">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Payment Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service3">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Notification Service</div>
                </div>
              </div>
            </div>

            <div className="implementation-section">
              <h3>Implementation Example</h3>
              <div className="code-block large">
                <div className="code-header">
                  <span>Event-Driven Communication with JWT Validation</span>
                  <button 
                    className={`copy-btn ${copiedCode === 'async-spring' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(`// Producer: Attach JWT to event
@Component
public class OrderEventProducer {
    @Autowired
    private StreamBridge streamBridge;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    public void publishOrderCreated(Order order) {
        String jwt = jwtTokenProvider.createToken(order.getUserId());
        OrderCreatedEvent event = new OrderCreatedEvent(order.getId(), order.getUserId(), order.getAmount(), jwt);
        streamBridge.send("order-created", event);
    }
}

// Consumer: Validate JWT from event
@Component
public class PaymentEventHandler {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        if (!jwtTokenProvider.validateToken(event.getJwt())) {
            throw new SecurityException("Invalid JWT");
        }
        // Process payment
        paymentService.processPayment(event.getOrderId(), event.getAmount());
    }
}`,'async-spring')}
                  >
                    {copiedCode === 'async-spring' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre><code>{`// Producer: Attach JWT to event
@Component
public class OrderEventProducer {
    @Autowired
    private StreamBridge streamBridge;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    public void publishOrderCreated(Order order) {
        String jwt = jwtTokenProvider.createToken(order.getUserId());
        OrderCreatedEvent event = new OrderCreatedEvent(order.getId(), order.getUserId(), order.getAmount(), jwt);
        streamBridge.send("order-created", event);
    }
}

// Consumer: Validate JWT from event
@Component
public class PaymentEventHandler {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        if (!jwtTokenProvider.validateToken(event.getJwt())) {
            throw new SecurityException("Invalid JWT");
        }
        // Process payment
        paymentService.processPayment(event.getOrderId(), event.getAmount());
    }
}`}</code></pre>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Complex workflows and business processes</li>
                    <li>High throughput requirements</li>
                    <li>Event-driven architectures</li>
                    <li>Loose coupling between services</li>
                    <li>Background processing tasks</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Immediate response required</li>
                    <li>Simple CRUD operations</li>
                    <li>Sequential processing needed</li>
                    <li>Real-time user interactions</li>
                    <li>Simple integrations</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use message brokers (Kafka, RabbitMQ)</li>
                    <li>Implement idempotency</li>
                    <li>Handle message ordering</li>
                    <li>Add dead letter queues</li>
                    <li>Monitor message processing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Loose coupling between services</li>
                    <li>Better fault tolerance and resilience</li>
                    <li>Improved scalability and performance</li>
                    <li>Supports complex workflows</li>
                    <li>Better resource utilization</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>More complex to implement and debug</li>
                    <li>Eventual consistency challenges</li>
                    <li>Message ordering and deduplication</li>
                    <li>Monitoring and tracing complexity</li>
                    <li>Potential message loss scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-gateway':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#FF9800' }}>
                  🚪
                </div>
                <div>
                  <h2>API Gateway Pattern</h2>
                  <p>Centralized entry point for routing, security, and cross-cutting concerns</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram gateway">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node gateway">
                  <div className="node-icon">🚪</div>
                  <div className="node-label">API Gateway</div>
                  <div className="gateway-features">
                    <span>🔐 Auth</span>
                    <span>🛡️ Rate Limit</span>
                    <span>📊 Monitoring</span>
                  </div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">User Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service2">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Order Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service3">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Payment Service</div>
                </div>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Multiple clients accessing multiple services</li>
                    <li>Centralized security requirements</li>
                    <li>API versioning and transformation</li>
                    <li>Cross-cutting concerns management</li>
                    <li>Simplified client integration</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Simple single-service applications</li>
                    <li>Direct service-to-service communication</li>
                    <li>Very low latency requirements</li>
                    <li>Minimal security requirements</li>
                    <li>Single client applications</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use Spring Cloud Gateway or Kong</li>
                    <li>Implement circuit breakers</li>
                    <li>Add comprehensive monitoring</li>
                    <li>Use rate limiting and throttling</li>
                    <li>Implement proper error handling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="security-section">
              <h3>Security Aspects</h3>
              <div className="security-grid">
                <div className="security-card">
                  <h4>🔐 Centralized Authentication</h4>
                  <p>JWT validation and token management at gateway level</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>JWT Validation Filter</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'gateway-jwt' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`@Component
public class JwtValidationFilter implements GlobalFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = extractToken(exchange.getRequest());
        
        if (token != null && validateToken(token)) {
            // Add user info to headers
            exchange.getRequest().mutate()
                .header("X-User-ID", getUserIdFromToken(token))
                .header("X-User-Roles", getUserRolesFromToken(token))
                .build();
        }
        
        return chain.filter(exchange);
    }
}`, 'gateway-jwt')}
                      >
                        {copiedCode === 'gateway-jwt' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`@Component
public class JwtValidationFilter implements GlobalFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = extractToken(exchange.getRequest());
        
        if (token != null && validateToken(token)) {
            // Add user info to headers
            exchange.getRequest().mutate()
                .header("X-User-ID", getUserIdFromToken(token))
                .header("X-User-Roles", getUserRolesFromToken(token))
                .build();
        }
        
        return chain.filter(exchange);
    }
}`}</code></pre>
                  </div>
                </div>

                <div className="security-card">
                  <h4>🛡️ Rate Limiting</h4>
                  <p>Protection against DDoS and abuse attacks</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>Rate Limiting Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'gateway-rate-limit' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`@Configuration
public class RateLimitingConfig {
    
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getHeaders().getFirst("X-User-ID") != null ?
            exchange.getRequest().getHeaders().getFirst("X-User-ID") :
            exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
        );
    }
    
    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 20); // replenishRate, burstCapacity
    }
}`, 'gateway-rate-limit')}
                      >
                        {copiedCode === 'gateway-rate-limit' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`@Configuration
public class RateLimitingConfig {
    
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getHeaders().getFirst("X-User-ID") != null ?
            exchange.getRequest().getHeaders().getFirst("X-User-ID") :
            exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
        );
    }
    
    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 20); // replenishRate, burstCapacity
    }
}`}</code></pre>
                  </div>
                </div>

                <div className="security-card">
                  <h4>🔒 CORS and CORS</h4>
                  <p>Cross-origin resource sharing and content security policy</p>
                  <div className="code-block">
                    <div className="code-header">
                      <span>CORS Configuration</span>
                      <button 
                        className={`copy-btn ${copiedCode === 'gateway-cors' ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(`@Configuration
public class CorsConfig {
    
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("https://yourdomain.com"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsWebFilter(source);
    }
}`, 'gateway-cors')}
                      >
                        {copiedCode === 'gateway-cors' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre><code>{`@Configuration
public class CorsConfig {
    
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("https://yourdomain.com"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsWebFilter(source);
    }
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Centralized security and monitoring</li>
                    <li>Simplified client integration</li>
                    <li>Cross-cutting concerns management</li>
                    <li>Load balancing and routing</li>
                    <li>API versioning and transformation</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>Single point of failure</li>
                    <li>Increased latency</li>
                    <li>Complex configuration</li>
                    <li>Potential bottleneck</li>
                    <li>Vendor lock-in risks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'saga-pattern':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#E91E63' }}>
                  ⚡
                </div>
                <div>
                  <h2>Saga Pattern</h2>
                  <p>Managing distributed transactions across multiple microservices with compensation logic</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram saga">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node saga">
                  <div className="node-icon">⚡</div>
                  <div className="node-label">Saga Orchestrator</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Order Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service2">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Payment Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service3">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Inventory Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service4">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Notification Service</div>
                </div>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Complex business workflows spanning multiple services</li>
                    <li>Distributed transactions requiring consistency</li>
                    <li>Long-running business processes</li>
                    <li>E-commerce order processing</li>
                    <li>Financial transaction processing</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Simple CRUD operations</li>
                    <li>Single service operations</li>
                    <li>Real-time user interactions</li>
                    <li>Stateless operations</li>
                    <li>Simple integrations</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use Spring State Machine for orchestration</li>
                    <li>Implement proper compensation logic</li>
                    <li>Add comprehensive error handling</li>
                    <li>Monitor saga state transitions</li>
                    <li>Use event sourcing for audit trail</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Maintains data consistency across services</li>
                    <li>Provides compensation mechanisms for failures</li>
                    <li>Supports complex business workflows</li>
                    <li>Enables distributed transactions</li>
                    <li>Good for long-running processes</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>Complex to implement and test</li>
                    <li>Difficult to debug and monitor</li>
                    <li>Compensation logic can be complex</li>
                    <li>Potential for partial failures</li>
                    <li>State management overhead</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'service-mesh':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#9C27B0' }}>
                  🕸️
                </div>
                <div>
                  <h2>Service Mesh Pattern</h2>
                  <p>Infrastructure layer for handling service-to-service communication with advanced networking features</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram mesh">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node gateway">
                  <div className="node-icon">🚪</div>
                  <div className="node-label">API Gateway</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service1">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service A</div>
                  <div className="proxy-sidecar">
                    <span>🔄 Sidecar</span>
                  </div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service2">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service B</div>
                  <div className="proxy-sidecar">
                    <span>🔄 Sidecar</span>
                  </div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service3">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Service C</div>
                  <div className="proxy-sidecar">
                    <span>🔄 Sidecar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Large-scale microservice deployments</li>
                    <li>Advanced traffic management needs</li>
                    <li>Zero-trust security requirements</li>
                    <li>Centralized observability and tracing</li>
                    <li>Multi-team, multi-language environments</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Small/simple microservice systems</li>
                    <li>Minimal networking/security needs</li>
                    <li>Resource-constrained environments</li>
                    <li>Teams new to service mesh concepts</li>
                    <li>Single-service applications</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use Istio, Linkerd, or Consul Connect</li>
                    <li>Enable mTLS for all services</li>
                    <li>Leverage built-in observability tools</li>
                    <li>Start with a small mesh and scale</li>
                    <li>Automate policy and config management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Centralized security and networking</li>
                    <li>Transparent to application code</li>
                    <li>Advanced traffic management</li>
                    <li>Built-in observability</li>
                    <li>Zero-trust security model</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>High complexity and learning curve</li>
                    <li>Performance overhead</li>
                    <li>Vendor lock-in risks</li>
                    <li>Resource consumption</li>
                    <li>Debugging complexity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'event-sourcing':
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#607D8B' }}>
                  📊
                </div>
                <div>
                  <h2>Event Sourcing Pattern</h2>
                  <p>Storing all changes as a sequence of events for complete audit trail and state reconstruction capabilities.</p>
                </div>
              </div>
            </div>

            <div className="architecture-section">
              <h3>Architecture Design</h3>
              <div className="architecture-diagram eventsourcing">
                <div className="service-node client">
                  <div className="node-icon">👤</div>
                  <div className="node-label">Client</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node service">
                  <div className="node-icon">🔧</div>
                  <div className="node-label">Order Service</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node eventstore">
                  <div className="node-icon">📊</div>
                  <div className="node-label">Event Store</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node projection">
                  <div className="node-icon">📈</div>
                  <div className="node-label">Projections</div>
                </div>
                <div className="arrow">→</div>
                <div className="service-node readmodel">
                  <div className="node-icon">📖</div>
                  <div className="node-label">Read Models</div>
                </div>
              </div>
            </div>

            <div className="implementation-section">
              <h3>Implementation Example</h3>
              <div className="code-block large">
                <div className="code-header">
                  <span>Event Sourcing with Axon Framework</span>
                  <button 
                    className={`copy-btn ${copiedCode === 'event-sourcing-axon' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(`@Aggregate
public class OrderAggregate {
    
    @AggregateIdentifier
    private String orderId;
    private OrderStatus status;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    
    public OrderAggregate() {}
    
    @CommandHandler
    public OrderAggregate(CreateOrderCommand command) {
        apply(new OrderCreatedEvent(
            command.getOrderId(),
            command.getUserId(),
            command.getItems(),
            command.getTotalAmount()
        ));
    }
    
    @CommandHandler
    public void handle(ProcessPaymentCommand command) {
        if (status != OrderStatus.CREATED) {
            throw new IllegalStateException("Order cannot be processed");
        }
        
        apply(new PaymentProcessedEvent(orderId, command.getPaymentId()));
    }
    
    @EventSourcingHandler
    public void on(OrderCreatedEvent event) {
        this.orderId = event.getOrderId();
        this.status = OrderStatus.CREATED;
        this.items = event.getItems();
        this.totalAmount = event.getTotalAmount();
    }
    
    @EventSourcingHandler
    public void on(PaymentProcessedEvent event) {
        this.status = OrderStatus.PAID;
    }
}`, 'event-sourcing-axon')}
                  >
                    {copiedCode === 'event-sourcing-axon' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre><code>{`@Aggregate
public class OrderAggregate {
    
    @AggregateIdentifier
    private String orderId;
    private OrderStatus status;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    
    public OrderAggregate() {}
    
    @CommandHandler
    public OrderAggregate(CreateOrderCommand command) {
        apply(new OrderCreatedEvent(
            command.getOrderId(),
            command.getUserId(),
            command.getItems(),
            command.getTotalAmount()
        ));
    }
    
    @CommandHandler
    public void handle(ProcessPaymentCommand command) {
        if (status != OrderStatus.CREATED) {
            throw new IllegalStateException("Order cannot be processed");
        }
        
        apply(new PaymentProcessedEvent(orderId, command.getPaymentId()));
    }
    
    @EventSourcingHandler
    public void on(OrderCreatedEvent event) {
        this.orderId = event.getOrderId();
        this.status = OrderStatus.CREATED;
        this.items = event.getItems();
        this.totalAmount = event.getTotalAmount();
    }
    
    @EventSourcingHandler
    public void on(PaymentProcessedEvent event) {
        this.status = OrderStatus.PAID;
    }
}`}</code></pre>
              </div>
            </div>

            <div className="usage-guidance-section">
              <h3>When to Use This Pattern</h3>
              <div className="usage-grid">
                <div className="usage-card">
                  <h4>✅ Good For</h4>
                  <ul>
                    <li>Systems requiring a complete audit trail</li>
                    <li>Temporal querying and state reconstruction</li>
                    <li>Financial and compliance systems</li>
                    <li>Event-driven architectures</li>
                    <li>Debugging and replaying events</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>❌ Avoid When</h4>
                  <ul>
                    <li>Simple CRUD applications</li>
                    <li>High write throughput with no audit needs</li>
                    <li>Short-lived or ephemeral data</li>
                    <li>Teams unfamiliar with event versioning</li>
                    <li>Storage is a major concern</li>
                  </ul>
                </div>
                <div className="usage-card">
                  <h4>🔧 Implementation Tips</h4>
                  <ul>
                    <li>Use frameworks like Axon or Eventuate</li>
                    <li>Encrypt sensitive event data</li>
                    <li>Implement event versioning</li>
                    <li>Monitor event store performance</li>
                    <li>Design for eventual consistency</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pros-cons-section">
              <h3>Pros and Cons</h3>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    <li>Complete audit trail</li>
                    <li>State reconstruction capability</li>
                    <li>Temporal querying</li>
                    <li>Event replay for debugging</li>
                    <li>Decoupled read and write models</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Disadvantages</h4>
                  <ul>
                    <li>Complex to implement</li>
                    <li>Event store performance</li>
                    <li>Event versioning challenges</li>
                    <li>Learning curve for team</li>
                    <li>Storage requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="pattern-details">
            <div className="pattern-header">
              <div className="pattern-info-large">
                <div className="pattern-logo-large" style={{ backgroundColor: '#607D8B' }}>
                  🔧
                </div>
                <div>
                  <h2>Select a Pattern</h2>
                  <p>Choose a microservice communication pattern to view detailed architecture, implementation, and security aspects.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="microservice-patterns-container">
      <div className="hero-section">
        <h1 className="hero-title">Microservice Inter-Communication Patterns</h1>
        <p className="hero-subtitle">
          Comprehensive guide to microservice communication patterns with security considerations and architecture design
        </p>
      </div>

      <div className="tabs-section">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'patterns' ? 'active' : ''}`}
            onClick={() => setActiveTab('patterns')}
          >
            Communication Patterns
          </button>
          <button 
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security Aspects
          </button>
          <button 
            className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Pattern Comparison
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="overview-section">
          <h2>Microservice Communication Overview</h2>
          <p>
            Microservice communication patterns define how services interact with each other in a distributed system. 
            The choice of pattern significantly impacts system performance, reliability, security, and maintainability.
          </p>
          
          <div className="overview-grid">
            <div className="overview-card">
              <h3>🔗 Service Coupling</h3>
              <p>Understanding the level of coupling between services and its impact on system design</p>
            </div>
            <div className="overview-card">
              <h3>🛡️ Security Considerations</h3>
              <p>Authentication, authorization, encryption, and other security aspects in microservice communication</p>
            </div>
            <div className="overview-card">
              <h3>📊 Performance Impact</h3>
              <p>How different patterns affect latency, throughput, and resource utilization</p>
            </div>
            <div className="overview-card">
              <h3>🔧 Implementation Complexity</h3>
              <p>Development effort, debugging complexity, and operational overhead</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="patterns-section">
          <h2>Communication Patterns</h2>
          <div className="patterns-grid">
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`pattern-card ${selectedPattern === pattern.id ? 'active' : ''}`}
                onClick={() => setSelectedPattern(pattern.id)}
              >
                <div 
                  className="pattern-logo"
                  style={{ backgroundColor: pattern.color }}
                >
                  {pattern.icon}
                </div>
                <h3 className="pattern-name">{pattern.name}</h3>
                <p className="pattern-description">{pattern.description}</p>
                <div className="pattern-usage">
                  <strong>When to Use:</strong> {pattern.whenToUse}
                </div>
              </div>
            ))}
          </div>
          
          {renderPatternContent()}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="security-overview-section">
          <h2>Security Aspects in Microservice Communication</h2>
          
          <div className="security-overview-grid">
            <div className="security-overview-card">
              <h3>🔐 Authentication</h3>
              <p>Verifying the identity of services and users in distributed communication</p>
              <ul>
                <li>JWT tokens for service-to-service auth</li>
                <li>OAuth 2.0 for user authentication</li>
                <li>mTLS for mutual authentication</li>
                <li>API keys for service identification</li>
              </ul>
            </div>
            
            <div className="security-overview-card">
              <h3>🛡️ Authorization</h3>
              <p>Controlling access to resources based on roles and permissions</p>
              <ul>
                <li>Role-based access control (RBAC)</li>
                <li>Attribute-based access control (ABAC)</li>
                <li>Policy-based authorization</li>
                <li>Fine-grained permissions</li>
              </ul>
            </div>
            
            <div className="security-overview-card">
              <h3>🔒 Encryption</h3>
              <p>Protecting data in transit and at rest</p>
              <ul>
                <li>TLS/SSL for transport security</li>
                <li>End-to-end encryption</li>
                <li>Message-level encryption</li>
                <li>Key management and rotation</li>
              </ul>
            </div>
            
            <div className="security-overview-card">
              <h3>📊 Monitoring & Auditing</h3>
              <p>Tracking and analyzing security events</p>
              <ul>
                <li>Security event logging</li>
                <li>Audit trails</li>
                <li>Real-time threat detection</li>
                <li>Compliance reporting</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="comparison-section">
          <h2>Pattern Comparison</h2>
          
          {/* New Pattern/Description/Examples Table */}
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Description</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Point-to-Point (P2P)</td>
                  <td>Direct synchronous calls</td>
                  <td>REST, gRPC</td>
                </tr>
                <tr>
                  <td>Message Queue / Pub-Sub</td>
                  <td>Asynchronous event communication</td>
                  <td>Kafka, RabbitMQ, SQS</td>
                </tr>
                <tr>
                  <td>API Gateway</td>
                  <td>Centralized routing with direct calls</td>
                  <td>Zuul, Kong, NGINX Gateway</td>
                </tr>
                <tr>
                  <td>Service Mesh</td>
                  <td>Managed communication with observability</td>
                  <td>Istio, Linkerd</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Existing Comparison Table */}
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Security Level</th>
                  <th>Performance</th>
                  <th>Complexity</th>
                  <th>Scalability</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Synchronous</td>
                  <td>Medium</td>
                  <td>High Latency</td>
                  <td>Low</td>
                  <td>Limited</td>
                  <td>Simple workflows</td>
                </tr>
                <tr>
                  <td>Asynchronous</td>
                  <td>High</td>
                  <td>High Throughput</td>
                  <td>High</td>
                  <td>Excellent</td>
                  <td>Complex workflows</td>
                </tr>
                <tr>
                  <td>API Gateway</td>
                  <td>Very High</td>
                  <td>Medium</td>
                  <td>Medium</td>
                  <td>Good</td>
                  <td>Multi-service APIs</td>
                </tr>
                <tr>
                  <td>Service Mesh</td>
                  <td>Very High</td>
                  <td>High</td>
                  <td>Very High</td>
                  <td>Excellent</td>
                  <td>Enterprise systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroservicePatterns; 