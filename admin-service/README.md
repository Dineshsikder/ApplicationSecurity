# Admin Service

A Spring Boot microservice that provides administrative functionality and system management capabilities for the OAuth ecosystem. It handles admin-specific operations, system metrics, and user management.

## 🏗️ Architecture

The Admin Service is a dedicated microservice that provides administrative capabilities, system monitoring, and user management features. It's secured with JWT-based authentication and role-based access control.

## 🚀 Features

- **Admin Dashboard Data** with system architecture information
- **User Management** with role-based operations
- **System Metrics** and performance monitoring
- **Security Audit** logging and monitoring
- **JWT-based Authentication** with role validation
- **RESTful API** for admin operations
- **Health Monitoring** and status reporting

## 📁 Project Structure

```
admin-service/
├── src/main/java/com/api/adminservice/
│   ├── AdminServiceApplication.java        # Main application class
│   ├── config/
│   │   └── SecurityConfig.java            # Security configuration
│   ├── controller/
│   │   └── AdminController.java           # Admin API endpoints
│   ├── model/
│   │   ├── SystemArchitecture.java        # System architecture model
│   │   ├── SystemMetrics.java             # System metrics model
│   │   └── UserManagement.java            # User management model
│   └── service/
│       └── AdminService.java              # Admin business logic
├── src/main/resources/
│   ├── application.yml                    # Main configuration
│   └── application-docker.yml             # Docker configuration
└── Dockerfile                             # Container configuration
```

## ⚙️ Configuration

### Security Configuration

```yaml
# Security Configuration
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:9000
          jwks-uri: http://localhost:9000/oauth2/jwks.json
```

### Service Configuration

```yaml
# Service Configuration
server:
  port: 8081
  servlet:
    context-path: /admin

# Admin Service Settings
admin:
  service:
    name: admin-service
    version: 1.0.0
    description: Administrative service for OAuth ecosystem
```

### JWT Security Configuration

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(Customizer.withDefaults())
            );
        return http.build();
    }
}
```

## 🔧 Key Components

### AdminController

REST controller that provides admin API endpoints:

```java
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        // Return comprehensive dashboard data
    }
    
    @GetMapping("/users")
    public ResponseEntity<UserManagement> getUserManagement() {
        // Return user management information
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<SystemMetrics> getSystemMetrics() {
        // Return system performance metrics
    }
}
```

### AdminService

Service layer that implements admin business logic:

```java
@Service
public class AdminService {
    
    public Map<String, Object> getDashboardData() {
        // Build comprehensive dashboard data
        // Include system architecture, metrics, and user info
    }
    
    public UserManagement getUserManagement() {
        // Retrieve user management statistics
        // Include user counts, roles, and admin users
    }
    
    public SystemMetrics getSystemMetrics() {
        // Collect system performance metrics
        // Include CPU, memory, and service health
    }
}
```

### Security Configuration

Configures JWT-based security with role-based access control:

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Configure JWT resource server
        // Set up role-based authorization
        // Configure CORS and security headers
    }
    
    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        // Configure JWT decoder with JWK source
    }
}
```

## 🌐 API Endpoints

### Dashboard Endpoints

- `GET /admin/dashboard` - Get comprehensive dashboard data
- `GET /admin/architecture` - Get system architecture information
- `GET /admin/metrics` - Get system performance metrics
- `GET /admin/users` - Get user management information

### Health and Monitoring

- `GET /actuator/health` - Service health status
- `GET /actuator/info` - Service information
- `GET /actuator/metrics` - Application metrics

### Security Endpoints

- `GET /admin/security/audit` - Security audit information
- `GET /admin/security/events` - Recent security events

## 🔐 Security Features

### JWT Authentication

- **Token Validation**: Validates JWT tokens from the auth server
- **Role Extraction**: Extracts user roles from JWT claims
- **Method Security**: Uses @PreAuthorize for endpoint protection
- **Audience Validation**: Ensures tokens are intended for admin service

### Role-Based Access Control

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/dashboard")
public ResponseEntity<Map<String, Object>> getDashboardData() {
    // Only accessible by users with ROLE_ADMIN
}

@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@GetMapping("/public-info")
public ResponseEntity<Object> getPublicInfo() {
    // Accessible by both admin and user roles
}
```

### Security Headers

The service automatically adds security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 📊 Dashboard Data Structure

### System Architecture

```json
{
  "services": [
    {
      "name": "auth-server",
      "description": "OAuth2 Authorization Server",
      "port": 9000,
      "status": "RUNNING"
    },
    {
      "name": "api-gateway",
      "description": "API Gateway with JWT validation",
      "port": 8080,
      "status": "RUNNING"
    }
  ],
  "databases": [
    {
      "name": "Redis",
      "purpose": "Token blacklisting and caching",
      "port": 6379,
      "status": "RUNNING"
    }
  ],
  "securityComponents": [
    {
      "name": "JWT Validation",
      "description": "Centralized JWT token validation",
      "status": "ACTIVE"
    }
  ]
}
```

### User Management

```json
{
  "totalUsers": 5,
  "activeUsers": 3,
  "adminUsernames": ["admin", "superuser"],
  "userRoles": {
    "ROLE_ADMIN": 2,
    "ROLE_USER": 3
  }
}
```

### System Metrics

```json
{
  "cpuUsage": 45.2,
  "memoryUsage": 67.8,
  "diskUsage": 23.1,
  "activeConnections": 12,
  "requestsPerMinute": 156,
  "averageResponseTime": 245
}
```

## 🚀 Running the Application

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Auth server running
- API Gateway running

### Local Development

1. **Start Auth Server**:
   ```bash
   cd auth-server && mvn spring-boot:run
   ```

2. **Start API Gateway**:
   ```bash
   cd api-gateway && mvn spring-boot:run
   ```

3. **Build the admin service**:
   ```bash
   mvn clean install
   ```

4. **Run the admin service**:
   ```bash
   mvn spring-boot:run
   ```

5. **Access the service**:
   - Admin Service: http://localhost:8081
   - Dashboard: http://localhost:8081/admin/dashboard
   - Health Check: http://localhost:8081/actuator/health

### Docker Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t oauth-admin-service .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up admin-service
   ```

## 📊 Monitoring and Logging

### Log Levels

- **DEBUG**: Detailed admin operations and security checks
- **INFO**: Service startup and dashboard data generation
- **WARN**: Security warnings and access attempts
- **ERROR**: Authentication failures and service errors

### Key Log Messages

```
INFO  - Admin dashboard data requested by user: admin
INFO  - System metrics collected successfully
WARN  - Unauthorized access attempt to admin endpoint
ERROR - JWT validation failed for admin request
```

### Health Checks

The service provides comprehensive health checks:

- `/actuator/health` - Overall health status
- `/actuator/health/diskSpace` - Disk space health
- `/actuator/health/db` - Database health (if applicable)

## 🔧 Customization

### Adding New Admin Features

1. Create new model classes for data structures
2. Add service methods in `AdminService`
3. Create controller endpoints in `AdminController`
4. Configure security with appropriate roles

### Custom Security Rules

1. Modify `SecurityConfig` for new security requirements
2. Add custom security annotations to endpoints
3. Implement custom security logic if needed

### Dashboard Customization

1. Extend dashboard data structure in `AdminService`
2. Add new metrics collection methods
3. Update frontend to display new data

## 🐛 Troubleshooting

### Common Issues

1. **JWT Validation Failures**: Check auth server connectivity
2. **Role Access Denied**: Verify user has ROLE_ADMIN
3. **Service Unavailable**: Check API Gateway routing
4. **CORS Errors**: Verify CORS configuration

### Debug Mode

Enable debug logging in `application.yml`:

```yaml
logging:
  level:
    com.api.adminservice: DEBUG
    org.springframework.security: DEBUG
    org.springframework.web: DEBUG
```

### Security Debugging

Monitor security events:

```bash
# Check security logs
tail -f logs/admin-service.log | grep SECURITY

# Monitor authentication attempts
tail -f logs/admin-service.log | grep AUTH
```

## 📚 API Documentation

### Authentication

All admin endpoints require JWT authentication:

```
Authorization: Bearer <jwt_token>
```

### Dashboard API

```bash
# Get comprehensive dashboard data
GET /admin/dashboard
Authorization: Bearer <jwt_token>

# Get system architecture
GET /admin/architecture
Authorization: Bearer <jwt_token>

# Get user management info
GET /admin/users
Authorization: Bearer <jwt_token>
```

### Response Format

All responses follow a consistent format:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": "success",
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

## 🤝 Integration

### Frontend Integration

The admin service integrates with the React frontend through:
- RESTful API endpoints for dashboard data
- JWT token validation for secure access
- Role-based access control for admin features
- Real-time system monitoring and metrics

### API Gateway Integration

The service integrates with the API Gateway through:
- JWT token validation at the gateway level
- User information injection via headers
- Circuit breaker for fault tolerance
- Load balancing for scalability

### Auth Server Integration

The auth server integration includes:
- JWT token validation using JWK
- Role extraction from JWT claims
- User authentication verification
- Token blacklist checking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 