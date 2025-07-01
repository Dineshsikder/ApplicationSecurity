# OAuth2/OIDC Architecture Documentation

## Overview
This document describes the proper OAuth2/OIDC implementation architecture for the microservices application.

## Architecture Components

### 1. Authorization Server (Auth Server)
- **Port**: 9000
- **Context Path**: `/auth`
- **Purpose**: Central OAuth2/OIDC authorization server
- **Responsibilities**:
  - User authentication
  - Token issuance (Access, Refresh, ID tokens)
  - Client registration
  - PKCE support
  - JWK endpoint for token validation

### 2. API Gateway
- **Port**: 8080
- **Purpose**: Central entry point for all API requests
- **Responsibilities**:
  - JWT token validation
  - Route requests to appropriate microservices
  - Rate limiting
  - Circuit breaker implementation
  - CORS handling

### 3. Microservices
- **Admin Service**: Handles admin-specific operations
- **User Service**: Handles user-specific operations
- **Responsibilities**:
  - Validate JWT tokens from API Gateway
  - Implement role-based access control
  - Process business logic

## OAuth2 Flow

### 1. Authorization Code Flow with PKCE

```
Frontend (React)                    Auth Server                    API Gateway                    Microservices
     |                                   |                              |                              |
     | 1. Authorization Request         |                              |                              |
     |--------------------------------->|                              |                              |
     |    (with PKCE challenge)         |                              |                              |
     |                                   |                              |                              |
     | 2. User Login                    |                              |                              |
     |<-------------------------------->|                              |                              |
     |                                   |                              |                              |
     | 3. Authorization Code            |                              |                              |
     |<----------------------------------|                              |                              |
     |                                   |                              |                              |
     | 4. Token Request                 |                              |                              |
     |--------------------------------->|                              |                              |
     |    (with PKCE verifier)          |                              |                              |
     |                                   |                              |                              |
     | 5. Access Token + ID Token       |                              |                              |
     |<----------------------------------|                              |                              |
     |                                   |                              |                              |
     | 6. API Request with JWT          |                              |                              |
     |---------------------------------->|                              |                              |
     |                                   |                              |                              |
     | 7. Validate JWT                  |                              |                              |
     |                                   |                              |                              |
     | 8. Forward to Microservice       |                              |                              |
     |                                   |                              |                              |
     | 9. Validate JWT + Process        |                              |                              |
     |                                   |                              |                              |
     | 10. Response                     |                              |                              |
     |<----------------------------------|<-----------------------------|<-----------------------------|
```

### 2. Token Validation Flow

```
API Gateway                          Auth Server                    Microservice
     |                                     |                              |
     | 1. Extract JWT from request         |                              |
     |                                     |                              |
     | 2. Validate JWT signature           |                              |
     |    (using JWK from auth server)     |                              |
     |                                     |                              |
     | 3. Check token blacklist            |                              |
     |                                     |                              |
     | 4. Introspect token (optional)      |                              |
     |------------------------------------>|                              |
     |                                     |                              |
     | 5. Token valid response             |                              |
     |<------------------------------------|                              |
     |                                     |                              |
     | 6. Add user info to headers         |                              |
     |                                     |                              |
     | 7. Forward to microservice          |                              |
     |------------------------------------>|                              |
     |                                     |                              |
     | 8. Validate JWT + Process           |                              |
     |                                     |                              |
     | 9. Response                         |                              |
     |<------------------------------------|                              |
```

## Security Features

### 1. JWT Token Security
- **Algorithm**: RS256 (RSA with SHA-256)
- **Key Size**: 2048 bits
- **Token Lifetime**: 15 minutes (Access), 24 hours (Refresh)
- **Claims**: Custom claims for user roles and permissions

### 2. PKCE (Proof Key for Code Exchange)
- **Purpose**: Prevent authorization code interception attacks
- **Implementation**: Required for all public clients
- **Challenge**: SHA256 hash of random verifier

### 3. Token Blacklisting
- **Storage**: Redis
- **Purpose**: Immediate token revocation
- **TTL**: 24 hours

### 4. Rate Limiting
- **Admin APIs**: 10 requests/minute
- **User APIs**: 20 requests/minute
- **Implementation**: Redis-based rate limiter

### 5. Circuit Breaker
- **Purpose**: Prevent cascade failures
- **Configuration**: 50% failure threshold, 30s open state

## Configuration

### Auth Server Configuration
```yaml
server:
  port: 9000
  servlet:
    context-path: /auth

spring:
  security:
    oauth2:
      authorizationserver:
        issuer: http://localhost:9000/auth
        client:
          registration:
            react-client:
              client-id: react-client
              client-secret: "{noop}secret"
              require-proof-key: true
```

### API Gateway Configuration
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:9000/auth
          jwk-set-uri: http://localhost:9000/auth/oauth2/jwks.json
```

### Microservice Configuration
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:9000/auth
```

## Best Practices Implemented

### 1. Security
- ✅ JWT signature validation
- ✅ Token expiration checking
- ✅ PKCE implementation
- ✅ Token blacklisting
- ✅ Role-based access control
- ✅ CORS configuration

### 2. Performance
- ✅ Redis caching for token validation
- ✅ Rate limiting
- ✅ Circuit breaker pattern
- ✅ Load balancing

### 3. Monitoring
- ✅ Health checks
- ✅ Metrics collection
- ✅ Logging
- ✅ Actuator endpoints

## API Endpoints

### Auth Server Endpoints
- `POST /auth/oauth2/authorize` - Authorization endpoint
- `POST /auth/oauth2/token` - Token endpoint
- `GET /auth/oauth2/jwks.json` - JWK endpoint
- `POST /auth/oauth2/introspect` - Token introspection
- `POST /auth/oauth2/revoke` - Token revocation

### API Gateway Endpoints
- `GET /api/admin/**` - Admin service routes
- `GET /api/user/**` - User service routes
- `GET /actuator/**` - Monitoring endpoints

### Microservice Endpoints
- `GET /api/admin/**` - Admin operations
- `GET /api/user/**` - User operations

## Troubleshooting

### Common Issues
1. **JWT Validation Fails**: Check issuer URI and JWK endpoint
2. **CORS Errors**: Verify CORS configuration in all services
3. **Token Expired**: Implement proper token refresh logic
4. **Rate Limiting**: Check Redis connection and rate limit configuration

### Debug Mode
Enable debug logging:
```yaml
logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
```

## Security Checklist

- [x] JWT tokens signed with RS256
- [x] PKCE implemented for public clients
- [x] Token blacklisting for revocation
- [x] Rate limiting on sensitive endpoints
- [x] CORS properly configured
- [x] HTTPS in production
- [x] Secure headers configured
- [x] Input validation implemented
- [x] Error handling without information leakage
- [x] Audit logging enabled 