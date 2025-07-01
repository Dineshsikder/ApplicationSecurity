# Complete OAuth2/OIDC Application Setup Guide

This guide will walk you through setting up the complete OAuth2/OIDC demonstration application with all components.

## 🎯 What You'll Build

A complete, production-ready OAuth2/OpenID Connect implementation featuring:

- **OAuth2 Authorization Server** (Spring Boot)
- **Resource Server** (Protected REST APIs)
- **API Gateway** (Request routing and security)
- **React Frontend** (OIDC client)
- **Redis** (Session management and token blacklisting)
- **Comprehensive Security Features**

## 📋 Prerequisites

### Required Software
- **Java 17+** - [Download here](https://adoptium.net/)
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **Maven 3.6+** - [Download here](https://maven.apache.org/)
- **Redis** - [Download here](https://redis.io/download)

### Optional Tools
- **Docker** - For containerized Redis
- **IDE** - IntelliJ IDEA, VS Code, or Eclipse
- **Postman** - For API testing

## 🚀 Step-by-Step Setup

### Step 1: Clone and Prepare

```bash
# Clone the repository
git clone <your-repo-url>
cd OAuth

# Verify Java version
java -version  # Should be 17+

# Verify Node.js version
node --version  # Should be 16+

# Verify Maven version
mvn --version   # Should be 3.6+
```

### Step 2: Start Redis

Choose one of the following methods:

#### Option A: Docker (Recommended)
```bash
# Start Redis container
docker run -d --name redis-oauth -p 6379:6379 redis:alpine

# Verify Redis is running
docker ps | grep redis
```

#### Option B: Local Installation

**Windows:**
```bash
# Using WSL2
wsl --install
wsl
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis-server
```

**macOS:**
```bash
# Using Homebrew
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Verify Redis:**
```bash
redis-cli ping
# Should return: PONG
```

### Step 3: Start Backend Services

Open **4 terminal windows** and run each service:

#### Terminal 1: Auth Server
```bash
cd auth-server
mvn clean install
mvn spring-boot:run
```
**Expected output:**
```
Started AuthServerApplication in X.XXX seconds
Auth Server running on http://localhost:9000/auth
```

#### Terminal 2: Resource Server
```bash
cd resource-server
mvn clean install
mvn spring-boot:run
```
**Expected output:**
```
Started ResourceServerApplication in X.XXX seconds
Resource Server running on http://localhost:8080/api
```

#### Terminal 3: API Gateway
```bash
cd api-gateway
mvn clean install
mvn spring-boot:run
```
**Expected output:**
```
Started ApiGatewayApplication in X.XXX seconds
API Gateway running on http://localhost:8000
```

#### Terminal 4: Frontend
```bash
cd frontend
npm install
npm start
```
**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 4: Verify All Services

Check that all services are running:

```bash
# Test Auth Server
curl http://localhost:9000/auth/actuator/health

# Test Resource Server
curl http://localhost:8080/api/actuator/health

# Test API Gateway
curl http://localhost:8000/actuator/health

# Test Frontend (should open in browser)
open http://localhost:3000
```

## 🧪 Testing the Application

### 1. Basic OAuth2 Flow Test

1. **Open the application:**
   ```
   http://localhost:3000
   ```

2. **Click "Login with OAuth2"**

3. **Use demo credentials:**
   - **Username:** `user`
   - **Password:** `password`

4. **Verify successful login and redirect**

### 2. API Testing

1. **Test Public API:**
   - Click "Test Public API" button
   - Should return public information

2. **Test Protected API:**
   - Click "Test Protected API" button
   - Should return user profile data

3. **Test Admin Functions:**
   - Login as admin (`admin/admin`)
   - Navigate to Admin page
   - Test admin-only endpoints

### 3. Manual OAuth2 Flow Test

```bash
# 1. Start authorization flow
curl "http://localhost:9000/auth/oauth2/authorize?response_type=code&client_id=react-client&redirect_uri=http://localhost:3000/callback&scope=openid profile api.read&state=test&code_challenge=test-challenge&code_challenge_method=S256"

# 2. Login and get authorization code
# 3. Exchange code for tokens
curl -X POST http://localhost:9000/auth/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&client_id=react-client&client_secret=secret&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback&code_verifier=test-verifier"

# 4. Test protected API with token
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/user/profile
```

## 🔧 Configuration Details

### Auth Server Configuration
- **Port:** 9000
- **Context Path:** /auth
- **Issuer:** http://localhost:9000/auth
- **JWT Expiry:** 15 minutes (access), 24 hours (refresh)

### Resource Server Configuration
- **Port:** 8080
- **Context Path:** /api
- **JWT Validation:** From Auth Server JWKS
- **Database:** H2 (in-memory)

### API Gateway Configuration
- **Port:** 8000
- **Routing:** /auth → Auth Server, /api → Resource Server
- **Rate Limiting:** 10 req/sec, burst 20
- **Circuit Breaker:** 50% failure threshold

### Frontend Configuration
- **Port:** 3000
- **OIDC Client:** react-client
- **Scopes:** openid profile api.read api.write
- **Automatic Renewal:** Enabled

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :9000  # For Auth Server
lsof -i :8080  # For Resource Server
lsof -i :8000  # For API Gateway
lsof -i :3000  # For Frontend

# Kill process
kill -9 <PID>
```

#### 2. Redis Connection Failed
```bash
# Check Redis status
redis-cli ping

# Restart Redis
docker restart redis-oauth  # If using Docker
sudo systemctl restart redis-server  # If using local
```

#### 3. Maven Build Failures
```bash
# Clean and rebuild
mvn clean install -U

# Check Java version
java -version  # Should be 17+
```

#### 4. Node.js Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. CORS Errors
- Ensure all services are running
- Check browser console for CORS errors
- Verify API Gateway CORS configuration

#### 6. JWT Validation Errors
```bash
# Test JWKS endpoint
curl http://localhost:9000/auth/oauth2/jwks.json

# Test OIDC discovery
curl http://localhost:9000/auth/.well-known/openid_configuration
```

### Debug Mode

Enable debug logging for each service:

#### Auth Server
```yaml
# application.yml
logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
```

#### Resource Server
```yaml
# application.yml
logging:
  level:
    org.springframework.security: DEBUG
    com.example.resourceserver: DEBUG
```

#### API Gateway
```yaml
# application.yml
logging:
  level:
    org.springframework.cloud.gateway: DEBUG
    org.springframework.security: DEBUG
```

#### Frontend
```javascript
// In AuthContext.js
const config = {
  // ... other config
  logger: console, // Enable debug logging
};
```

## 📊 Monitoring and Health Checks

### Health Endpoints
- **Auth Server:** http://localhost:9000/auth/actuator/health
- **Resource Server:** http://localhost:8080/api/actuator/health
- **API Gateway:** http://localhost:8000/actuator/health

### Metrics Endpoints
- **Auth Server:** http://localhost:9000/auth/actuator/metrics
- **Resource Server:** http://localhost:8080/api/actuator/metrics
- **API Gateway:** http://localhost:8000/actuator/metrics

### Redis Monitoring
```bash
# Connect to Redis CLI
redis-cli

# Check blacklisted tokens
KEYS blacklist:*

# Check active sessions
KEYS session:*

# Monitor Redis operations
MONITOR
```

## 🔒 Security Testing

### 1. Token Validation Test
```bash
# Get a valid token
# Try to use expired token
# Test blacklisted token
```

### 2. Rate Limiting Test
```bash
# Make rapid requests to test rate limiting
for i in {1..25}; do
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    http://localhost:8000/api/user/profile
done
```

### 3. Circuit Breaker Test
```bash
# Stop Resource Server
# Make requests through API Gateway
# Should see fallback responses
```

## 🚀 Production Deployment

### 1. Environment Variables
```bash
# Auth Server
AUTH_SERVER_PORT=9000
AUTH_SERVER_ISSUER=https://auth.yourdomain.com

# Resource Server
RESOURCE_SERVER_PORT=8080
RESOURCE_SERVER_JWT_ISSUER=https://auth.yourdomain.com

# API Gateway
GATEWAY_PORT=8000
GATEWAY_REDIS_HOST=your-redis-host
GATEWAY_REDIS_PORT=6379

# Frontend
REACT_APP_AUTH_SERVER=https://auth.yourdomain.com
REACT_APP_API_GATEWAY=https://api.yourdomain.com
```

### 2. SSL/TLS Configuration
- Use proper SSL certificates
- Configure HTTPS for all services
- Set up proper CORS origins

### 3. Database Configuration
- Replace H2 with production database (PostgreSQL, MySQL)
- Configure connection pooling
- Set up backup procedures

### 4. Monitoring and Logging
- Set up centralized logging (ELK Stack, Splunk)
- Configure monitoring and alerting
- Implement health checks and auto-scaling

## 📚 Learning Resources

### Documentation
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [JWT RFC 7519](https://tools.ietf.org/html/rfc7519)
- [PKCE RFC 7636](https://tools.ietf.org/html/rfc7636)

### Tools and Libraries
- [Spring Authorization Server](https://spring.io/projects/spring-authorization-server)
- [Spring Security](https://spring.io/projects/spring-security)
- [React OIDC](https://github.com/authts/react-oidc-context)
- [Keycloak](https://www.keycloak.org/)

### Security Resources
- [OWASP OAuth 2.0 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth_2.0_Cheat_Sheet.html)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)

## 🎉 Congratulations!

You now have a complete, production-ready OAuth2/OIDC implementation running locally. This demonstrates:

- ✅ OAuth2 Authorization Code flow with PKCE
- ✅ JWT token management and validation
- ✅ Token blacklisting and revocation
- ✅ Role-based access control
- ✅ API Gateway with security
- ✅ React OIDC client
- ✅ Comprehensive monitoring and health checks

Use this as a foundation for learning modern application security patterns and building secure applications!

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the logs for each service
3. Verify all prerequisites are met
4. Ensure all services are running and accessible
5. Check network connectivity and firewall settings

Happy coding! 🔐 