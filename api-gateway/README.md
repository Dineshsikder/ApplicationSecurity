# API Gateway

A Spring Cloud Gateway that acts as a single entry point for all API requests, providing routing, security, rate limiting, and circuit breaker functionality.

## Features

### 🚀 Gateway Features
- **Request Routing** - Routes requests to appropriate microservices
- **JWT Validation** - Validates JWT tokens from the Authorization Server
- **Rate Limiting** - Prevents API abuse with Redis-based rate limiting
- **Circuit Breaker** - Graceful degradation when services are down
- **CORS Support** - Cross-origin resource sharing for frontend integration
- **Load Balancing** - Distributes requests across service instances
- **Request/Response Transformation** - Modify requests and responses as needed

### 🔐 Security Features
- **JWT Token Validation** - Validates tokens before routing to services
- **Token Blacklisting** - Checks for revoked tokens using Redis
- **Route-Based Security** - Different security rules for different routes
- **CORS Configuration** - Proper cross-origin handling
- **Request Filtering** - Custom filters for security validation

### 📊 Monitoring Features
- **Health Checks** - Service health monitoring
- **Metrics** - Prometheus metrics export
- **Actuator Endpoints** - Runtime monitoring and management
- **Circuit Breaker Monitoring** - Track service availability

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Redis (for rate limiting and token blacklisting)
- Auth Server running on port 9000
- Resource Server running on port 8080

### Installation

1. **Clone and build:**
```bash
cd api-gateway
mvn clean install
```

2. **Start Redis:**
```bash
# On Windows (if using WSL or Docker)
docker run -d -p 6379:6379 redis:alpine

# On macOS
brew install redis
brew services start redis

# On Linux
sudo apt-get install redis-server
sudo systemctl start redis
```

3. **Run the application:**
```bash
mvn spring-boot:run
```

The gateway will start on `http://localhost:8000`

## Configuration

### Application Properties

Key configuration in `application.yml`:

```yaml
server:
  port: 8000

spring:
  cloud:
    gateway:
      routes:
        # Auth Server routes
        - id: auth-server
          uri: http://localhost:9000
          predicates:
            - Path=/auth/**
          filters:
            - StripPrefix=0
            - name: CircuitBreaker
              args:
                name: authCircuitBreaker
                fallbackUri: forward:/fallback/auth
        
        # Resource Server routes
        - id: resource-server
          uri: http://localhost:8080
          predicates:
            - Path=/api/**
          filters:
            - StripPrefix=0
            - name: CircuitBreaker
              args:
                name: resourceCircuitBreaker
                fallbackUri: forward:/fallback/resource
            - name: RateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
```

### Route Configuration

The gateway routes requests based on URL patterns:

| Route | Destination | Security | Features |
|-------|-------------|----------|----------|
| `/auth/**` | Auth Server (9000) | None | Circuit Breaker |
| `/api/**` | Resource Server (8080) | JWT Required | Circuit Breaker, Rate Limiting |
| `/public/**` | Resource Server (8080) | None | None |
| `/actuator/**` | Gateway | None | Monitoring |

## Security Implementation

### 1. JWT Token Validation
```java
@Bean
public ReactiveJwtDecoder jwtDecoder() {
    NimbusReactiveJwtDecoder jwtDecoder = ReactiveJwtDecoders.fromIssuerLocation(issuerUri);
    
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer);
    
    jwtDecoder.setJwtValidator(withAudience);
    
    return jwtDecoder;
}
```

### 2. Route-Based Security
```java
.authorizeExchange(authz -> authz
    .pathMatchers("/actuator/health").permitAll()
    .pathMatchers("/public/**").permitAll()
    .pathMatchers("/auth/**").permitAll()
    .anyExchange().authenticated()
)
```

### 3. Custom JWT Filter
```java
@Component
public class JwtValidationFilter extends AbstractGatewayFilterFactory<Config> {
    // Custom JWT validation logic
    // Token blacklisting checks
    // Request/response modification
}
```

### 4. CORS Configuration
```java
@Bean
public CorsWebFilter corsWebFilter() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
    corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    corsConfig.setAllowedHeaders(Arrays.asList("*"));
    corsConfig.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig);
    
    return new CorsWebFilter(source);
}
```

## Circuit Breaker Configuration

### Resilience4j Settings
```yaml
resilience4j:
  circuitbreaker:
    instances:
      authCircuitBreaker:
        sliding-window-size: 10
        minimum-number-of-calls: 5
        failure-rate-threshold: 50
        wait-duration-in-open-state: 30s
      resourceCircuitBreaker:
        sliding-window-size: 10
        minimum-number-of-calls: 5
        failure-rate-threshold: 50
        wait-duration-in-open-state: 30s
```

### Fallback Endpoints
- `/fallback/auth` - Auth service unavailable
- `/fallback/resource` - Resource service unavailable
- `/fallback/general` - General service unavailable

## Rate Limiting

### Redis Rate Limiter
```yaml
- name: RateLimiter
  args:
    redis-rate-limiter.replenishRate: 10    # Requests per second
    redis-rate-limiter.burstCapacity: 20    # Burst capacity
```

### Rate Limiting Rules
- **Replenish Rate**: 10 requests per second
- **Burst Capacity**: 20 requests maximum burst
- **Applied To**: All `/api/**` routes
- **Storage**: Redis for distributed rate limiting

## Testing the API Gateway

### 1. Test Public Endpoints
```bash
# Test public endpoint (no authentication required)
curl http://localhost:8000/public/info

# Test health check
curl http://localhost:8000/actuator/health
```

### 2. Test Protected Endpoints
```bash
# Test protected endpoint (requires JWT)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/user/profile

# Test admin endpoint
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/admin/dashboard
```

### 3. Test Auth Server Routing
```bash
# Test OIDC discovery (routed to auth server)
curl http://localhost:8000/auth/.well-known/openid_configuration

# Test JWKS endpoint
curl http://localhost:8000/auth/oauth2/jwks.json
```

### 4. Test Rate Limiting
```bash
# Make multiple rapid requests to test rate limiting
for i in {1..25}; do
  curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    http://localhost:8000/api/user/profile
  echo "Request $i"
done
```

### 5. Test Circuit Breaker
```bash
# Stop the resource server and test circuit breaker
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/user/profile
# Should return fallback response
```

## Monitoring and Health Checks

### Actuator Endpoints
- `GET /actuator/health` - Application health
- `GET /actuator/info` - Application information
- `GET /actuator/metrics` - Application metrics
- `GET /actuator/gateway` - Gateway routes and filters

### Circuit Breaker Metrics
```bash
# Check circuit breaker status
curl http://localhost:8000/actuator/health

# View circuit breaker metrics
curl http://localhost:8000/actuator/metrics/resilience4j.circuitbreaker.calls
```

### Rate Limiter Metrics
```bash
# Check rate limiter metrics
curl http://localhost:8000/actuator/metrics/spring.cloud.gateway.requests
```

## Request Flow

### 1. Public Request Flow
```
Client → Gateway (8000) → Resource Server (8080) → Response
```

### 2. Protected Request Flow
```
Client → Gateway (8000) → JWT Validation → Resource Server (8080) → Response
```

### 3. Auth Request Flow
```
Client → Gateway (8000) → Auth Server (9000) → Response
```

### 4. Circuit Breaker Flow
```
Client → Gateway (8000) → Circuit Breaker → Service (if available) → Response
Client → Gateway (8000) → Circuit Breaker → Fallback (if service down) → Response
```

## Security Best Practices Implemented

1. **JWT Validation** - Complete token validation at gateway level
2. **Route-Based Security** - Different security rules for different routes
3. **Token Blacklisting** - Redis-based token revocation checking
4. **Rate Limiting** - Protection against API abuse
5. **Circuit Breaker** - Graceful degradation when services are down
6. **CORS Configuration** - Proper cross-origin handling
7. **Request Filtering** - Custom security filters
8. **Monitoring** - Comprehensive health checks and metrics

## Troubleshooting

### Common Issues

1. **Service Unavailable**
   - Check if Auth Server is running on port 9000
   - Check if Resource Server is running on port 8080
   - Verify Redis is running on port 6379

2. **JWT Validation Failed**
   - Ensure Auth Server is accessible
   - Check JWKS endpoint is working
   - Verify token hasn't expired

3. **Rate Limiting Issues**
   - Check Redis connection
   - Verify rate limiter configuration
   - Monitor rate limiter metrics

4. **Circuit Breaker Issues**
   - Check circuit breaker configuration
   - Monitor circuit breaker metrics
   - Verify fallback endpoints are working

### Logs
Enable debug logging in `application.yml`:
```yaml
logging:
  level:
    org.springframework.cloud.gateway: DEBUG
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
```

## Integration with Frontend

### React Integration Example
```javascript
// API call through gateway
const response = await fetch('http://localhost:8000/api/user/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});

// Handle rate limiting
if (response.status === 429) {
  console.log('Rate limit exceeded');
}

// Handle circuit breaker
if (response.status === 503) {
  console.log('Service temporarily unavailable');
}
```

## Performance Considerations

### Optimization Tips
1. **Connection Pooling** - Configure Redis connection pools
2. **Caching** - Implement response caching for static resources
3. **Compression** - Enable response compression
4. **Load Balancing** - Use multiple service instances
5. **Monitoring** - Set up alerts for performance metrics

### Scaling
- **Horizontal Scaling** - Deploy multiple gateway instances
- **Load Balancer** - Use external load balancer (nginx, haproxy)
- **Service Discovery** - Integrate with service discovery (Eureka, Consul)
- **Distributed Rate Limiting** - Use Redis for shared rate limiting

## Next Steps

1. **Frontend Integration** - React OIDC client implementation
2. **Service Discovery** - Add service discovery and load balancing
3. **Production Deployment** - Security hardening and monitoring
4. **Distributed Tracing** - Add tracing with Sleuth/Zipkin
5. **API Documentation** - Add OpenAPI/Swagger documentation

## Contributing

This is a demo application for educational purposes. For production use, consider:

- Using a production load balancer (nginx, haproxy)
- Implementing comprehensive monitoring and alerting
- Adding distributed tracing and logging
- Setting up proper SSL certificates
- Implementing backup and recovery procedures
- Adding API versioning and documentation 