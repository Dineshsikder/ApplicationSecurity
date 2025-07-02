# OAuth2 Authorization Server

A Spring Authorization Server implementation that provides OAuth2/OIDC authentication and authorization services for the OAuth ecosystem.

## 🏗️ Architecture

The Authorization Server is built using Spring Authorization Server and serves as the central authentication hub for the entire OAuth ecosystem. It handles user authentication, token issuance, and OIDC compliance.

## 🚀 Features

- **OAuth2 Authorization Code Flow** with PKCE support
- **OpenID Connect (OIDC)** compliance
- **JWT Token Issuance** with RS256 signing
- **Token Customization** with user roles and claims
- **Token Blacklisting** via Redis
- **Silent Token Renewal** support
- **CORS Configuration** for frontend integration
- **User Management** with role-based access control

## 📁 Project Structure

```
auth-server/
├── src/main/java/com/oauth/auth_server/
│   ├── AuthServerApplication.java          # Main application class
│   ├── config/
│   │   ├── AuthorizationServerConfig.java  # OAuth2 server configuration
│   │   ├── ClientConfig.java              # OAuth2 client registration
│   │   ├── DataInitializer.java           # Initial data setup
│   │   ├── FrameOptionsFilter.java        # Iframe security filter
│   │   ├── RedisConfig.java               # Redis configuration
│   │   ├── SecurityConfig.java            # Spring Security configuration
│   │   └── SecurityCorsConfig.java        # CORS configuration
│   ├── controller/
│   │   ├── AuthController.java            # Authentication endpoints
│   │   ├── LogoutController.java          # Logout handling
│   │   └── UserInfoController.java        # OIDC userinfo endpoint
│   ├── model/
│   │   └── User.java                      # User entity
│   ├── repository/
│   │   └── UserRepository.java            # User data access
│   └── service/
│       ├── CustomUserDetailsService.java  # User details service
│       ├── TokenBlacklistService.java     # Token revocation service
│       └── UserService.java               # User business logic
├── src/main/resources/
│   ├── application.yml                    # Main configuration
│   ├── application-docker.yml             # Docker configuration
│   ├── application.properties             # Properties configuration
│   ├── static/                            # Static resources
│   └── templates/
│       └── login.html                     # Login page template
└── Dockerfile                             # Container configuration
```

## ⚙️ Configuration

### OAuth2 Client Registration

The server is configured with the following OAuth2 client:

```yaml
# React SPA Client
client_id: react-client
client_authentication_method: NONE
authorization_grant_types: 
  - authorization_code
  - refresh_token
redirect_uri: http://localhost:3000/callback
scopes:
  - openid
  - profile
  - email
  - api.read
  - api.write
require_proof_key: true  # PKCE enforcement
```

### JWT Token Configuration

```yaml
# Token Settings
access_token_time_to_live: 15 minutes
refresh_token_time_to_live: 1 day
id_token_signature_algorithm: RS256
```

### Security Configuration

- **CORS**: Configured for `http://localhost:3000`
- **Frame Options**: Set to `SAMEORIGIN` for silent renewal
- **JWT Signing**: RS256 with 2048-bit RSA key pair
- **Token Blacklisting**: Redis-based token revocation

## 🔧 Key Components

### AuthorizationServerConfig

The main configuration class that sets up:
- OAuth2 authorization server endpoints
- JWT token customization
- Security filter chains
- CORS configuration

```java
@Configuration
@EnableWebSecurity
public class AuthorizationServerConfig {
    // OAuth2 server configuration
    // JWT token customizer
    // Security filter chains
    // CORS configuration
}
```

### Token Customization

JWT tokens are customized to include:
- User roles and authorities
- Username claim
- Audience validation
- JTI for token revocation

```java
@Bean
public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
    return context -> {
        // Add roles, username, and audience claims
        // Ensure JTI for token revocation
    };
}
```

### User Management

The server includes a complete user management system:
- User entity with roles
- User repository for data access
- User service for business logic
- Custom user details service for Spring Security

## 🌐 Endpoints

### OAuth2 Endpoints

- `GET /oauth2/authorize` - Authorization endpoint
- `POST /oauth2/token` - Token endpoint
- `GET /oauth2/jwks.json` - JSON Web Key Set
- `GET /oauth2/introspect` - Token introspection

### OIDC Endpoints

- `GET /.well-known/openid_configuration` - OIDC discovery
- `GET /userinfo` - User information endpoint
- `POST /connect/logout` - Logout endpoint

### User Management Endpoints

- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🔐 Security Features

### PKCE (Proof Key for Code Exchange)

- Prevents authorization code interception attacks
- Code verifier generated using crypto.getRandomValues()
- Code challenge created using SHA-256 hash
- Enforced at authorization server level

### JWT Token Security

- RS256 asymmetric signing algorithm
- 15-minute access token lifetime
- 1-day refresh token lifetime
- Token blacklisting via Redis
- Automatic token refresh
- Minimal claims in access tokens
- User profile data in ID tokens
- JTI for token revocation tracking

### Role-Based Access Control

- User roles stored in JWT claims
- Role-based endpoint protection
- Admin and user role separation
- Method-level security with @PreAuthorize

## 🚀 Running the Application

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Redis server running

### Local Development

1. **Start Redis**:
   ```bash
   redis-server
   ```

2. **Build the application**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**:
   - Authorization Server: http://localhost:9000
   - OIDC Discovery: http://localhost:9000/.well-known/openid_configuration

### Docker Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t oauth-auth-server .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up auth-server
   ```

## 📊 Monitoring and Logging

### Log Levels

- **DEBUG**: Detailed token customization and validation
- **INFO**: Application startup and configuration
- **WARN**: Security warnings and validation failures
- **ERROR**: Authentication and authorization errors

### Key Log Messages

```
INFO  - Configuring authorization server security filter chain
INFO  - Customizing JWT token for principal: user123
INFO  - Extracted roles from UserDetails: [ROLE_USER]
INFO  - Final JWT claims - username: user123, roles: [ROLE_USER]
```

## 🔧 Customization

### Adding New Scopes

1. Update the client configuration in `ClientConfig.java`
2. Add scope validation in `AuthorizationServerConfig.java`
3. Update the frontend configuration

### Custom Token Claims

1. Modify the `tokenCustomizer()` method in `AuthorizationServerConfig.java`
2. Add custom claims to the JWT context
3. Update the API Gateway to handle new claims

### User Role Management

1. Extend the `User` entity with new roles
2. Update the `UserService` for role management
3. Configure role-based security in microservices

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CORS configuration matches frontend origin
2. **Token Validation Failures**: Check JWT signature and claims
3. **Silent Renewal Issues**: Verify frame options configuration
4. **Redis Connection**: Ensure Redis is running and accessible

### Debug Mode

Enable debug logging in `application.yml`:

```yaml
logging:
  level:
    com.oauth.auth_server: DEBUG
    org.springframework.security: DEBUG
```

## 📚 API Documentation

### OAuth2 Flow

1. **Authorization Request**:
   ```
   GET /oauth2/authorize?response_type=code&client_id=react-client&redirect_uri=http://localhost:3000/callback&scope=openid profile email&code_challenge=...&code_challenge_method=S256
   ```

2. **Token Exchange**:
   ```
   POST /oauth2/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=authorization_code&code=...&redirect_uri=http://localhost:3000/callback&client_id=react-client&code_verifier=...
   ```

3. **User Info**:
   ```
   GET /userinfo
   Authorization: Bearer <access_token>
   ```

## 🤝 Integration

### Frontend Integration

The auth server integrates with the React frontend through:
- OAuth2 authorization code flow with PKCE
- Silent token renewal for seamless UX
- CORS configuration for cross-origin requests
- OIDC userinfo endpoint for profile data

### Microservice Integration

Microservices integrate through:
- JWT token validation
- Role-based access control
- User information injection via headers
- Token blacklist checking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 