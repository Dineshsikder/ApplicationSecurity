# OAuth2/OIDC Microservices Ecosystem

A comprehensive OAuth2/OpenID Connect implementation with microservices architecture, featuring a Spring Authorization Server, API Gateway, React frontend, and multiple microservices with JWT-based security.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │  API Gateway    │    │ Auth Server     │
│   (Port 3000)   │◄──►│   (Port 8080)   │◄──►│  (Port 9000)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
              ┌─────────────────────────────────┐
              │                                 │
              ▼                                 ▼
    ┌─────────────────┐              ┌─────────────────┐
    │  Admin Service  │              │  User Service   │
    │   (Port 8081)   │              │   (Port 8082)   │
    └─────────────────┘              └─────────────────┘
              │                                 │
              └─────────┬───────────────────────┘
                        ▼
              ┌─────────────────┐
              │     Redis       │
              │   (Port 6379)   │
              └─────────────────┘
```

## 🚀 Features

### 🔐 Security Features
- **OAuth2 Authorization Code Flow** with PKCE support
- **OpenID Connect (OIDC)** compliance
- **JWT Token Security** with RS256 signing
- **Token Blacklisting** via Redis
- **Role-Based Access Control** (RBAC)
- **Silent Token Renewal** for seamless UX
- **CORS Configuration** for cross-origin requests

### 🏢 Microservices
- **Authorization Server**: OAuth2/OIDC provider
- **API Gateway**: Centralized routing and security
- **Admin Service**: Administrative functionality
- **User Service**: User management and profiles
- **React Frontend**: Modern SPA with OAuth2 integration

### 📊 Monitoring & Management
- **Health Checks** for all services
- **Circuit Breakers** for fault tolerance
- **Comprehensive Logging** and monitoring
- **Admin Dashboard** with system metrics
- **User Dashboard** with personalized content

## 📁 Project Structure

```
OAuth/
├── auth-server/                    # OAuth2 Authorization Server
│   ├── src/main/java/com/oauth/auth_server/
│   │   ├── config/                 # Security and OAuth2 configuration
│   │   ├── controller/             # REST endpoints
│   │   ├── model/                  # Data models
│   │   ├── repository/             # Data access layer
│   │   └── service/                # Business logic
│   ├── src/main/resources/
│   │   ├── application.yml         # Configuration
│   │   └── templates/              # Login templates
│   └── Dockerfile
├── api-gateway/                    # API Gateway with JWT validation
│   ├── src/main/java/com/api/apigateway/
│   │   ├── config/                 # Gateway configuration
│   │   ├── filter/                 # JWT validation filters
│   │   └── service/                # JWT validation service
│   ├── src/main/resources/
│   │   └── application.yml         # Gateway configuration
│   └── Dockerfile
├── admin-service/                  # Administrative microservice
│   ├── src/main/java/com/api/adminservice/
│   │   ├── config/                 # Security configuration
│   │   ├── controller/             # Admin API endpoints
│   │   ├── model/                  # Admin data models
│   │   └── service/                # Admin business logic
│   ├── src/main/resources/
│   │   └── application.yml         # Service configuration
│   └── Dockerfile
├── user-service/                   # User management microservice
│   ├── src/main/java/com/api/userservice/
│   │   ├── config/                 # Security configuration
│   │   ├── controller/             # User API endpoints
│   │   ├── model/                  # User data models
│   │   └── service/                # User business logic
│   ├── src/main/resources/
│   │   └── application.yml         # Service configuration
│   └── Dockerfile
├── oauth-ui/                       # React frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── contexts/               # React contexts
│   │   ├── services/               # API services
│   │   └── utils/                  # Utility functions
│   ├── public/                     # Static assets
│   ├── package.json                # Dependencies
│   ├── setupProxy.js               # Development proxy
│   └── Dockerfile
├── docker-compose.yml              # Docker orchestration
├── docker-scripts.sh               # Docker management scripts
├── docker-scripts.bat              # Windows Docker scripts
├── Makefile                        # Build automation
└── README.md                       # This file
```

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.x** - Microservices framework
- **Spring Authorization Server** - OAuth2/OIDC provider
- **Spring Cloud Gateway** - API Gateway
- **Spring Security** - Security framework
- **Spring WebFlux** - Reactive web framework
- **Redis** - Token blacklisting and caching
- **Maven** - Build tool

### Frontend
- **React 18** - UI framework
- **OIDC Client** - OAuth2/OIDC client library
- **Axios** - HTTP client
- **CSS3** - Styling
- **npm** - Package manager

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (production)
- **Health Checks** - Service monitoring

## 🚀 Quick Start

### Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **Maven 3.6+**
- **Redis 6+**
- **Docker** (optional)

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd OAuth
   ```

2. **Start Redis**:
   ```bash
   redis-server
   ```

3. **Start Backend Services**:
   ```bash
   # Start Authorization Server
   cd auth-server && mvn spring-boot:run
   
   # Start API Gateway (in new terminal)
   cd api-gateway && mvn spring-boot:run
   
   # Start Admin Service (in new terminal)
   cd admin-service && mvn spring-boot:run
   
   # Start User Service (in new terminal)
   cd user-service && mvn spring-boot:run
   ```

4. **Start Frontend**:
   ```bash
   cd oauth-ui
   npm install
   npm start
   ```

5. **Access the Application**:
   - Frontend: http://localhost:3000
   - Auth Server: http://localhost:9000
   - API Gateway: http://localhost:8080
   - Admin Service: http://localhost:8081
   - User Service: http://localhost:8082

### Docker Deployment

1. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

2. **Or use the provided scripts**:
   ```bash
   # Linux/Mac
   ./docker-scripts.sh start
   
   # Windows
   docker-scripts.bat start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - All services accessible through Docker network

## 🔐 OAuth2 Flow

### 1. User Authentication
```
User clicks Login → OAuth2 Authorization Request → Auth Server Login → 
Authorization Code → Token Exchange → User Profile Load → Dashboard
```

### 2. API Access
```
Frontend Request → API Gateway → JWT Validation → Microservice → 
Response → Frontend Update
```

### 3. Token Management
```
Access Token (15min) → Silent Renewal → New Access Token → 
Automatic API Calls → Token Expiration → Silent Renewal
```

## 📊 Service Endpoints

### Authorization Server (Port 9000)
- `GET /oauth2/authorize` - Authorization endpoint
- `POST /oauth2/token` - Token endpoint
- `GET /oauth2/jwks.json` - JSON Web Key Set
- `GET /userinfo` - User information endpoint
- `POST /connect/logout` - Logout endpoint

### API Gateway (Port 8080)
- `GET /api/admin/**` → Admin Service
- `GET /api/user/**` → User Service
- `GET /auth/**` → Auth Server (public)

### Admin Service (Port 8081)
- `GET /admin/dashboard` - Admin dashboard data
- `GET /admin/users` - User management
- `GET /admin/metrics` - System metrics

### User Service (Port 8082)
- `GET /user/profile` - User profile
- `GET /user/dashboard` - User dashboard
- `PUT /user/profile` - Update profile

### Frontend (Port 3000)
- `/` - Landing page
- `/login` - Authentication
- `/admin` - Admin dashboard
- `/profile` - User profile
- `/dashboard` - User dashboard

## 🔧 Configuration

### OAuth2 Client Configuration
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
```yaml
# Security Headers
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in auth server
   - Verify proxy settings in frontend

2. **JWT Validation Failures**:
   - Ensure auth server is running
   - Check JWK endpoint accessibility
   - Verify token expiration

3. **Service Connection Issues**:
   - Check service health endpoints
   - Verify Docker network connectivity
   - Check port availability

4. **Silent Renewal Problems**:
   - Verify iframe security settings
   - Check CORS configuration
   - Ensure proper redirect URIs

### Debug Mode

Enable debug logging in each service:

```yaml
logging:
  level:
    com.oauth: DEBUG
    com.api: DEBUG
    org.springframework.security: DEBUG
```

### Health Checks

Monitor service health:

```bash
# Auth Server
curl http://localhost:9000/actuator/health

# API Gateway
curl http://localhost:8080/actuator/health

# Admin Service
curl http://localhost:8081/actuator/health

# User Service
curl http://localhost:8082/actuator/health
```

## 📚 Documentation

### Component Documentation
- [Auth Server README](auth-server/README.md) - OAuth2 authorization server
- [API Gateway README](api-gateway/README.md) - API gateway with JWT validation
- [Admin Service README](admin-service/README.md) - Administrative microservice
- [User Service README](user-service/README.md) - User management microservice
- [Frontend README](oauth-ui/README.md) - React frontend application

### Architecture Documentation
- [OAuth2 Architecture](OAUTH2_ARCHITECTURE.md) - Detailed architecture overview
- [Docker Deployment](DOCKER_DEPLOYMENT.md) - Docker deployment guide

### API Documentation
- [OAuth2 Endpoints](auth-server/README.md#api-endpoints) - OAuth2/OIDC endpoints
- [Admin API](admin-service/README.md#api-endpoints) - Administrative API
- [User API](user-service/README.md#api-endpoints) - User management API

## 🔒 Security Features

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

### API Gateway Security
- Centralized JWT validation
- User information injection into headers
- Public endpoint bypass for auth endpoints
- Circuit breaker for fault tolerance
- Rate limiting for API protection

## 🚀 Deployment

### Production Deployment

1. **Environment Configuration**:
   ```bash
   # Set production environment variables
   export SPRING_PROFILES_ACTIVE=production
   export REDIS_HOST=production-redis
   export AUTH_SERVER_URL=https://auth.yourdomain.com
   ```

2. **Docker Production Build**:
   ```bash
   # Build production images
   docker-compose -f docker-compose.prod.yml build
   
   # Deploy to production
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **SSL/TLS Configuration**:
   ```nginx
   # Nginx SSL configuration
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           proxy_pass http://oauth-ui:3000;
       }
   }
   ```

### Monitoring and Logging

1. **Application Metrics**:
   - Prometheus metrics collection
   - Grafana dashboards
   - Health check monitoring

2. **Logging**:
   - Centralized logging with ELK stack
   - Structured JSON logging
   - Log rotation and retention

3. **Alerting**:
   - Service health alerts
   - Security event notifications
   - Performance monitoring

## 🤝 Contributing

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**:
   ```bash
   mvn test  # Backend tests
   npm test  # Frontend tests
   ```
5. **Submit a pull request**

### Code Style

- **Backend**: Follow Spring Boot conventions
- **Frontend**: Follow React/JavaScript conventions
- **Documentation**: Use clear, concise language
- **Security**: Follow OAuth2/OIDC best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Security team for OAuth2 implementation
- OIDC Client library maintainers
- React community for excellent tooling
- Docker team for containerization platform

## 📞 Support

For support and questions:

1. **Check the documentation** in each component's README
2. **Review troubleshooting section** above
3. **Open an issue** on GitHub
4. **Check existing issues** for similar problems

---

**Note**: This is a demonstration project showcasing OAuth2/OIDC implementation with microservices. For production use, ensure proper security hardening, monitoring, and compliance with your organization's security policies. 