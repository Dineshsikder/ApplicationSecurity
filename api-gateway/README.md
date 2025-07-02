# API Gateway

A Spring Cloud Gateway implementation that serves as the central entry point for all API requests, providing JWT validation, routing, and security features for the OAuth ecosystem.

## 🏗️ Architecture

The API Gateway acts as a reverse proxy and security layer, routing requests to appropriate microservices while validating JWT tokens and injecting user information. It's built using Spring Cloud Gateway with custom JWT validation filters.

## 🚀 Features

- **Centralized JWT Validation** with automatic token verification
- **Dynamic Service Routing** to microservices
- **User Information Injection** into request headers
- **Token Blacklist Checking** via Redis
- **Circuit Breaker** for fault tolerance
- **Rate Limiting** for API protection
- **CORS Configuration** for frontend integration
- **Fallback Mechanisms** for service failures

## 📁 Project Structure

```
api-gateway/
├── src/main/java/com/api/apigateway/
│   ├── ApiGatewayApplication.java          # Main application class
│   ├── config/
│   │   ├── RedisConfig.java               # Redis configuration
│   │   ├── SecurityConfig.java            # Security configuration
│   │   └── WebClientConfig.java           # WebClient configuration
│   ├── controller/
│   │   └── FallbackController.java        # Circuit breaker fallback
│   ├── filter/
│   │   └── JwtValidationFilter.java       # JWT validation filter
│   └── service/
│       └── JwtValidationService.java      # JWT validation logic
├── src/main/resources/
│   ├── application.yml                    # Main configuration
│   └── application-docker.yml             # Docker configuration
└── Dockerfile                             # Container configuration
```

## ⚙️ Configuration

### Gateway Routes

```yaml
spring:
  cloud:
    gateway:
      routes:
        # Admin Service Route
        - id: admin-service
          uri: lb://admin-service
          predicates:
            - Path=/api/admin/**
          filters:
            - JwtValidationFilter
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: admin-service-circuit-breaker
                fallbackUri: forward:/fallback/admin
        
        # User Service Route
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/user/**
          filters:
            - JwtValidationFilter
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: user-service-circuit-breaker
                fallbackUri: forward:/fallback/user
        
        # Auth Server Route (Public)
        - id: auth-server
          uri: http://auth-server:9000
          predicates:
            - Path=/auth/**
          filters:
            - StripPrefix=1
```

### JWT Validation Configuration

```yaml
# JWT Configuration
jwt:
  issuer-uri: http://localhost:9000
  jwks-uri: http://localhost:9000/oauth2/jwks.json
  audience: api-gateway
  user-info-uri: http://localhost:9000/userinfo
```

### Redis Configuration

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    timeout: 2000ms
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
```

## 🔧 Key Components

### JwtValidationFilter

A custom filter that intercepts all requests and validates JWT tokens:

```java
@Component
public class JwtValidationFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Extract JWT token from Authorization header
        // Validate token using JwtValidationService
        // Inject user information into headers
        // Continue or reject request
    }
}
```

### JwtValidationService

Service responsible for JWT token validation and user information extraction:

```java
@Service
public class JwtValidationService {
    public Mono<JWTValidationResult> validateToken(String token) {
        // 1. Validate JWT signature
        // 2. Validate issuer
        // 3. Validate audience
        // 4. Validate expiration
        // 5. Check blacklist
        // 6. Extract authorities
    }
}
```

### Security Configuration

Configures security settings for the gateway:

```java
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        // Configure security for WebFlux
        // Set up CORS
        // Configure authentication
    }
}
```

## 🌐 Request Flow

### 1. Request Arrival

```
Client Request → API Gateway (Port 8080)
```

### 2. JWT Validation

```
JwtValidationFilter → Extract Token → Validate JWT → Check Blacklist
```

### 3. User Information Injection

```
Valid Token → Extract Claims → Inject Headers → Route to Service
```

### 4. Service Routing

```
Route Configuration → Load Balancer → Target Microservice
```

### 5. Response Processing

```
Service Response → Gateway → Client
```

## 🔐 Security Features

### JWT Token Validation

- **Signature Verification**: Validates JWT signature using JWK from auth server
- **Issuer Validation**: Ensures token was issued by the correct auth server
- **Audience Validation**: Verifies token is intended for api-gateway
- **Expiration Check**: Validates token hasn't expired
- **Blacklist Check**: Verifies token hasn't been revoked

### User Information Injection

The gateway injects user information into request headers:

```
X-User-ID: user123
X-User-Roles: ROLE_USER,ROLE_ADMIN
X-User-Username: johndoe
X-User-Authorities: ROLE_USER,ROLE_ADMIN
```

### Circuit Breaker

Provides fault tolerance for microservice failures:

```yaml
resilience4j:
  circuitbreaker:
    instances:
      admin-service-circuit-breaker:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 30s
      user-service-circuit-breaker:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 30s
```

## 🚀 Running the Application

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Redis server running
- Auth server running

### Local Development

1. **Start Redis**:
   ```bash
   redis-server
   ```

2. **Start Auth Server**:
   ```bash
   cd auth-server && mvn spring-boot:run
   ```

3. **Build the gateway**:
   ```bash
   mvn clean install
   ```

4. **Run the gateway**:
   ```bash
   mvn spring-boot:run
   ```

5. **Access the gateway**:
   - API Gateway: http://localhost:8080
   - Health Check: http://localhost:8080/actuator/health

### Docker Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t oauth-api-gateway .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up api-gateway
   ```

## 📊 Monitoring and Logging

### Log Levels

- **DEBUG**: Detailed JWT validation and routing
- **INFO**: Request routing and service calls
- **WARN**: Circuit breaker activations and timeouts
- **ERROR**: JWT validation failures and service errors

### Key Log Messages

```
INFO  - JWT validation successful for user: user123
INFO  - Routing request to admin-service: /api/admin/dashboard
INFO  - Circuit breaker activated for user-service
ERROR - JWT validation failed: Invalid signature
```

### Health Checks

The gateway provides health check endpoints:

- `/actuator/health` - Overall health status
- `/actuator/health/gateway` - Gateway-specific health
- `/actuator/health/redis` - Redis connection health

## 🔧 Customization

### Adding New Routes

1. Add route configuration in `application.yml`
2. Configure predicates and filters
3. Set up circuit breaker if needed
4. Update security configuration

### Custom Filters

1. Implement `GlobalFilter` interface
2. Add filter logic in `filter()` method
3. Configure filter order
4. Register as Spring bean

### JWT Claims Customization

1. Modify `JwtValidationService` to extract new claims
2. Update header injection in `JwtValidationFilter`
3. Configure microservices to handle new headers

## 🐛 Troubleshooting

### Common Issues

1. **JWT Validation Failures**: Check auth server JWK endpoint
2. **Service Routing Issues**: Verify service discovery and health
3. **Redis Connection**: Ensure Redis is accessible
4. **CORS Errors**: Check CORS configuration

### Debug Mode

Enable debug logging in `application.yml`:

```yaml
logging:
  level:
    com.api.apigateway: DEBUG
    org.springframework.cloud.gateway: DEBUG
    org.springframework.security: DEBUG
```

### Circuit Breaker Monitoring

Monitor circuit breaker status:

```bash
# Check circuit breaker metrics
curl http://localhost:8080/actuator/metrics/resilience4j.circuitbreaker.calls

# Check circuit breaker state
curl http://localhost:8080/actuator/health
```

## 📚 API Documentation

### Gateway Endpoints

- **Health Check**: `GET /actuator/health`
- **Metrics**: `GET /actuator/metrics`
- **Fallback**: `GET /fallback/{service}`

### Routing Examples

```
# Admin Service
GET /api/admin/dashboard → admin-service:8081/admin/dashboard

# User Service
GET /api/user/profile → user-service:8082/user/profile

# Auth Server (Public)
GET /auth/oauth2/jwks.json → auth-server:9000/oauth2/jwks.json
```

### Request Headers

The gateway adds the following headers to requests:

```
Authorization: Bearer <jwt_token>
X-User-ID: <user_id>
X-User-Roles: <comma_separated_roles>
X-User-Username: <username>
X-User-Authorities: <comma_separated_authorities>
```

## 🤝 Integration

### Frontend Integration

The gateway integrates with the React frontend by:
- Providing a single entry point for all API calls
- Handling CORS for cross-origin requests
- Validating JWT tokens automatically
- Injecting user information for microservices

### Microservice Integration

Microservices integrate through:
- JWT token validation at the gateway level
- User information injection via headers
- Circuit breaker for fault tolerance
- Load balancing for scalability

### Auth Server Integration

The auth server integration includes:
- JWT token validation using JWK
- Token blacklist checking via Redis
- User information retrieval from /userinfo endpoint
- OIDC compliance for token standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 