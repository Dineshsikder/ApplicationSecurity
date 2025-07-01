# OAuth2 Authorization Server

A complete OAuth2/OpenID Connect authorization server built with Spring Boot and Spring Authorization Server.

## Features

### 🔐 Security Features
- **OAuth2 Authorization Code Flow with PKCE** - Secure authentication for SPAs
- **JWT Token Issuance** - Self-contained access tokens and ID tokens
- **Refresh Token Rotation** - Enhanced security with token rotation
- **Token Blacklisting** - Immediate token revocation using Redis
- **Session Management** - Redis-based session tracking
- **JWKS Endpoint** - Public key discovery for JWT validation
- **CORS Support** - Cross-origin resource sharing configuration
- **Rate Limiting** - Protection against abuse

### 🏗️ Architecture
- **Spring Authorization Server** - OAuth2/OIDC compliant
- **Spring Security** - Comprehensive security framework
- **Redis** - Session storage and token blacklisting
- **JWT** - JSON Web Token support with asymmetric keys

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Redis (for session management and token blacklisting)

### Installation

1. **Clone and build:**
```bash
cd auth-server
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

The server will start on `http://localhost:9000/auth`

## Configuration

### Application Properties

Key configuration in `application.yml`:

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
              require-proof-key: true  # Enforce PKCE
```

### Registered Clients

The server comes pre-configured with a React client:

- **Client ID:** `react-client`
- **Client Secret:** `secret`
- **Redirect URIs:** 
  - `http://localhost:3000/callback`
  - `http://localhost:3000/silent-renew`
- **Scopes:** `openid`, `profile`, `api.read`, `api.write`
- **Grant Types:** Authorization Code, Refresh Token
- **PKCE:** Required

### Demo Users

- **User:** `user` / `password` (USER role)
- **Admin:** `admin` / `admin` (USER, ADMIN roles)

## API Endpoints

### OAuth2/OIDC Endpoints
- `GET /oauth2/authorize` - Authorization endpoint
- `POST /oauth2/token` - Token endpoint
- `GET /.well-known/openid_configuration` - OIDC discovery
- `GET /oauth2/jwks.json` - JSON Web Key Set

### Custom Endpoints
- `POST /api/auth/logout` - Logout and token revocation
- `POST /api/auth/revoke-all` - Revoke all user tokens

## Security Features Explained

### 1. PKCE (Proof Key for Code Exchange)
```java
// Enforced in client configuration
ClientSettings.builder()
    .requireProofKey(true)  // Enforce PKCE
    .build()
```

### 2. JWT Token Customization
```java
@Bean
public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
    return context -> {
        if (context.getTokenType().getValue().equals("access_token")) {
            context.getClaims().claims(claims -> {
                claims.put("custom_claim", "custom_value");
                claims.put("authorities", context.getPrincipal().getAuthorities());
            });
        }
    };
}
```

### 3. Token Blacklisting
```java
@Service
public class TokenBlacklistService {
    public void blacklistToken(String jti, Duration ttl) {
        String key = BLACKLIST_PREFIX + jti;
        redisTemplate.opsForValue().set(key, "revoked", ttl.toSeconds(), TimeUnit.SECONDS);
    }
}
```

### 4. Refresh Token Rotation
- New refresh token issued on each use
- Old refresh token immediately invalidated
- Prevents refresh token reuse attacks

## Testing the Authorization Server

### 1. Manual OAuth2 Flow Test

1. **Start authorization flow:**
```
GET http://localhost:9000/auth/oauth2/authorize?
    response_type=code&
    client_id=react-client&
    redirect_uri=http://localhost:3000/callback&
    scope=openid profile api.read&
    state=random-state&
    code_challenge=your-code-challenge&
    code_challenge_method=S256
```

2. **Login with demo credentials:**
   - Username: `user`
   - Password: `password`

3. **Exchange code for tokens:**
```
POST http://localhost:9000/auth/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
client_id=react-client&
client_secret=secret&
code=received-code&
redirect_uri=http://localhost:3000/callback&
code_verifier=your-code-verifier
```

### 2. JWKS Endpoint Test
```bash
curl http://localhost:9000/auth/oauth2/jwks.json
```

### 3. OIDC Discovery Test
```bash
curl http://localhost:9000/auth/.well-known/openid_configuration
```

## Monitoring and Health Checks

### Actuator Endpoints
- `GET /actuator/health` - Application health
- `GET /actuator/info` - Application information
- `GET /actuator/metrics` - Application metrics

### Redis Monitoring
```bash
# Connect to Redis CLI
redis-cli

# Check blacklisted tokens
KEYS blacklist:*

# Check active sessions
KEYS session:*
```

## Security Best Practices Implemented

1. **HTTPS Everywhere** - All endpoints require secure transport
2. **Short-lived Access Tokens** - 15-minute expiration
3. **Secure Refresh Tokens** - 24-hour expiration with rotation
4. **PKCE Enforcement** - Required for all public clients
5. **Token Blacklisting** - Immediate revocation capability
6. **Session Management** - Redis-based session tracking
7. **CORS Configuration** - Proper cross-origin handling
8. **Rate Limiting** - Protection against abuse

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Ensure Redis is running on localhost:6379
   - Check Redis logs: `redis-cli ping`

2. **PKCE Validation Failed**
   - Ensure `code_challenge` and `code_verifier` match
   - Use SHA256 for code challenge method

3. **Token Validation Issues**
   - Check JWKS endpoint is accessible
   - Verify token signature and expiration

### Logs
Enable debug logging in `application.yml`:
```yaml
logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
```

## Next Steps

1. **Resource Server Setup** - Create protected API endpoints
2. **API Gateway Configuration** - Add routing and security
3. **Frontend Integration** - React OIDC client implementation
4. **Production Deployment** - Security hardening and monitoring

## Contributing

This is a demo application for educational purposes. For production use, consider:

- Using a production-ready identity provider (Keycloak, Auth0, etc.)
- Implementing proper user management
- Adding audit logging
- Setting up monitoring and alerting
- Using proper SSL certificates
- Implementing backup and recovery procedures 