# User Service

A Spring Boot microservice that provides user-specific functionality and profile management for the OAuth ecosystem. It handles user profiles, dashboards, and user-related operations.

## 🏗️ Architecture

The User Service is a dedicated microservice that provides user-specific capabilities, profile management, and user dashboard functionality. It's secured with JWT-based authentication and provides role-based access control for user operations.

## 🚀 Features

- **User Profile Management** with comprehensive user data
- **User Dashboard** with personalized information
- **Role-Based Access Control** for user operations
- **JWT-based Authentication** with user validation
- **RESTful API** for user operations
- **Health Monitoring** and status reporting
- **User Statistics** and activity tracking

## 📁 Project Structure

```
user-service/
├── src/main/java/com/api/userservice/
│   ├── UserServiceApplication.java         # Main application class
│   ├── config/
│   │   └── SecurityConfig.java            # Security configuration
│   ├── controller/
│   │   └── UserController.java            # User API endpoints
│   ├── model/
│   │   ├── UserDashboard.java             # User dashboard model
│   │   └── UserProfile.java               # User profile model
│   └── service/
│       └── UserService.java               # User business logic
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
  port: 8082
  servlet:
    context-path: /user

# User Service Settings
user:
  service:
    name: user-service
    version: 1.0.0
    description: User management service for OAuth ecosystem
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
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
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

### UserController

REST controller that provides user API endpoints:

```java
@RestController
@RequestMapping("/user")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class UserController {
    
    @GetMapping("/profile")
    public ResponseEntity<UserProfile> getUserProfile() {
        // Return user profile information
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboard> getUserDashboard() {
        // Return user dashboard data
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserProfile> updateUserProfile(@RequestBody UserProfile profile) {
        // Update user profile
    }
}
```

### UserService

Service layer that implements user business logic:

```java
@Service
public class UserService {
    
    public UserProfile getUserProfile(String username) {
        // Retrieve user profile information
        // Include personal details, preferences, and settings
    }
    
    public UserDashboard getUserDashboard(String username) {
        // Build user dashboard data
        // Include recent activity, statistics, and personalized content
    }
    
    public UserProfile updateUserProfile(String username, UserProfile profile) {
        // Update user profile information
        // Validate and persist changes
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

### User Profile Endpoints

- `GET /user/profile` - Get user profile information
- `PUT /user/profile` - Update user profile
- `GET /user/profile/{username}` - Get specific user profile (admin only)

### User Dashboard Endpoints

- `GET /user/dashboard` - Get user dashboard data
- `GET /user/activity` - Get user activity history
- `GET /user/statistics` - Get user statistics

### Health and Monitoring

- `GET /actuator/health` - Service health status
- `GET /actuator/info` - Service information
- `GET /actuator/metrics` - Application metrics

## 🔐 Security Features

### JWT Authentication

- **Token Validation**: Validates JWT tokens from the auth server
- **User Extraction**: Extracts user information from JWT claims
- **Method Security**: Uses @PreAuthorize for endpoint protection
- **Audience Validation**: Ensures tokens are intended for user service

### Role-Based Access Control

```java
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@GetMapping("/profile")
public ResponseEntity<UserProfile> getUserProfile() {
    // Accessible by both user and admin roles
}

@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/profile/{username}")
public ResponseEntity<UserProfile> getUserProfileByUsername(@PathVariable String username) {
    // Only accessible by admin role
}

@PreAuthorize("hasRole('USER')")
@PutMapping("/profile")
public ResponseEntity<UserProfile> updateUserProfile(@RequestBody UserProfile profile) {
    // Only accessible by user role
}
```

### User Context Security

The service validates that users can only access their own data:

```java
@PreAuthorize("hasRole('USER') and #username == authentication.name")
@GetMapping("/profile/{username}")
public ResponseEntity<UserProfile> getUserProfile(@PathVariable String username) {
    // Users can only access their own profile
}
```

## 📊 Data Models

### UserProfile

```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "dateOfBirth": "1990-01-15",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "USA"
  },
  "preferences": {
    "theme": "dark",
    "language": "en",
    "notifications": true,
    "timezone": "America/Los_Angeles"
  },
  "roles": ["ROLE_USER"],
  "status": "ACTIVE",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-15T10:30:00Z"
}
```

### UserDashboard

```json
{
  "username": "johndoe",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "status": "ACTIVE"
  },
  "statistics": {
    "totalLogins": 45,
    "lastLogin": "2024-01-15T10:30:00Z",
    "sessionDuration": 3600,
    "apiCalls": 156
  },
  "recentActivity": [
    {
      "action": "LOGIN",
      "timestamp": "2024-01-15T10:30:00Z",
      "details": "Successful login from 192.168.1.100"
    },
    {
      "action": "PROFILE_UPDATE",
      "timestamp": "2024-01-14T15:45:00Z",
      "details": "Updated email address"
    }
  ],
  "quickActions": [
    "UPDATE_PROFILE",
    "VIEW_ACTIVITY",
    "CHANGE_PASSWORD",
    "MANAGE_PREFERENCES"
  ]
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

3. **Build the user service**:
   ```bash
   mvn clean install
   ```

4. **Run the user service**:
   ```bash
   mvn spring-boot:run
   ```

5. **Access the service**:
   - User Service: http://localhost:8082
   - Profile: http://localhost:8082/user/profile
   - Dashboard: http://localhost:8082/user/dashboard
   - Health Check: http://localhost:8082/actuator/health

### Docker Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t oauth-user-service .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up user-service
   ```

## 📊 Monitoring and Logging

### Log Levels

- **DEBUG**: Detailed user operations and profile updates
- **INFO**: Service startup and user data retrieval
- **WARN**: Security warnings and access attempts
- **ERROR**: Authentication failures and service errors

### Key Log Messages

```
INFO  - User profile requested for: johndoe
INFO  - User dashboard data generated successfully
WARN  - Unauthorized access attempt to user profile
ERROR - JWT validation failed for user request
```

### Health Checks

The service provides comprehensive health checks:

- `/actuator/health` - Overall health status
- `/actuator/health/diskSpace` - Disk space health
- `/actuator/health/db` - Database health (if applicable)

## 🔧 Customization

### Adding New User Features

1. Create new model classes for user data structures
2. Add service methods in `UserService`
3. Create controller endpoints in `UserController`
4. Configure security with appropriate roles

### Custom User Roles

1. Define new roles in the auth server
2. Update security configuration for role-based access
3. Implement role-specific business logic
4. Update frontend to handle new roles

### Profile Customization

1. Extend `UserProfile` model with new fields
2. Add validation logic for new profile fields
3. Update service methods to handle new data
4. Modify frontend forms for new fields

## 🐛 Troubleshooting

### Common Issues

1. **JWT Validation Failures**: Check auth server connectivity
2. **Role Access Denied**: Verify user has appropriate roles
3. **Service Unavailable**: Check API Gateway routing
4. **Profile Update Failures**: Validate input data format

### Debug Mode

Enable debug logging in `application.yml`:

```yaml
logging:
  level:
    com.api.userservice: DEBUG
    org.springframework.security: DEBUG
    org.springframework.web: DEBUG
```

### User Data Debugging

Monitor user operations:

```bash
# Check user profile requests
tail -f logs/user-service.log | grep PROFILE

# Monitor authentication attempts
tail -f logs/user-service.log | grep AUTH
```

## 📚 API Documentation

### Authentication

All user endpoints require JWT authentication:

```
Authorization: Bearer <jwt_token>
```

### User Profile API

```bash
# Get user profile
GET /user/profile
Authorization: Bearer <jwt_token>

# Update user profile
PUT /user/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

### User Dashboard API

```bash
# Get user dashboard
GET /user/dashboard
Authorization: Bearer <jwt_token>

# Get user activity
GET /user/activity
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

The user service integrates with the React frontend through:
- RESTful API endpoints for user data
- JWT token validation for secure access
- Role-based access control for user features
- Real-time profile updates and dashboard data

### API Gateway Integration

The service integrates with the API Gateway through:
- JWT token validation at the gateway level
- User information injection via headers
- Circuit breaker for fault tolerance
- Load balancing for scalability

### Auth Server Integration

The auth server integration includes:
- JWT token validation using JWK
- User information extraction from JWT claims
- Role-based authorization
- Token blacklist checking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 