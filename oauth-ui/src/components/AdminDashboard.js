import React, { useState, useEffect } from 'react';
import { adminService } from '../services/apiService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('AdminDashboard: Starting to load dashboard data...');
      
      const response = await adminService.getAdminDashboard();
      console.log('AdminDashboard: API response received:', response);
      console.log('AdminDashboard: Response type:', typeof response);
      console.log('AdminDashboard: Response keys:', Object.keys(response));
      
      // Check if response has data property (axios response)
      const data = response.data || response;
      console.log('AdminDashboard: Extracted data:', data);
      console.log('AdminDashboard: Data type:', typeof data);
      console.log('AdminDashboard: Data keys:', Object.keys(data));
      
      setDashboardData(data);
      console.log('AdminDashboard: Dashboard data set successfully');
    } catch (err) {
      console.error('AdminDashboard: Error loading dashboard data:', err);
      console.error('AdminDashboard: Error response:', err.response);
      console.error('AdminDashboard: Error message:', err.message);
      setError(`Failed to load dashboard data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🔧 Admin Dashboard</h1>
        <p>System administration and monitoring</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          🏗️ Architecture
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'oauth' ? 'active' : ''}`}
          onClick={() => setActiveTab('oauth')}
        >
          🔐 OAuth Config
        </button>
        <button 
          className={`tab-button ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          🔄 OAuth2 Workflow
        </button>
      </div>

      <div className="dashboard-content">
        {/* Debug Section - Remove this after fixing */}
        <div className="debug-section" style={{ background: '#f0f0f0', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h4>🔍 Debug Info</h4>
          <p><strong>Loading:</strong> {loading.toString()}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
          <p><strong>Dashboard Data:</strong> {dashboardData ? 'Present' : 'Null'}</p>
          <p><strong>Data Keys:</strong> {dashboardData ? Object.keys(dashboardData).join(', ') : 'None'}</p>
          <button onClick={loadDashboardData} style={{ marginTop: '10px', padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Reload Data
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>System Health</h3>
                <div className="metric-value">
                  <span className={`status-indicator ${dashboardData?.systemHealth?.status?.toLowerCase() === 'up' ? 'healthy' : 'unhealthy'}`}>●</span>
                  {dashboardData?.systemHealth?.status || 'UNKNOWN'}
                </div>
                <p>Database: {dashboardData?.systemHealth?.db || 'N/A'}</p>
              </div>
              
              <div className="metric-card">
                <h3>CPU Usage</h3>
                <div className="metric-value">
                  {dashboardData?.metrics?.cpuUsage || 0}%
                </div>
                <p>Current CPU utilization</p>
              </div>
              
              <div className="metric-card">
                <h3>Memory Usage</h3>
                <div className="metric-value">
                  {dashboardData?.metrics?.memoryUsage || 0}%
                </div>
                <p>Current memory utilization</p>
              </div>
              
              <div className="metric-card">
                <h3>Disk Usage</h3>
                <div className="metric-value">
                  {dashboardData?.metrics?.diskUsage || 0}%
                </div>
                <p>Current disk utilization</p>
              </div>
            </div>
            
            <div className="security-overview">
              <h3>Security Status</h3>
              <div className="security-status-grid">
                <div className="security-status-item">
                  <span className="status-label">Encryption:</span>
                  <span className={`status-value ${dashboardData?.securityStatus?.encryption === 'enabled' ? 'enabled' : 'disabled'}`}>
                    {dashboardData?.securityStatus?.encryption || 'Unknown'}
                  </span>
                </div>
                <div className="security-status-item">
                  <span className="status-label">Firewall:</span>
                  <span className={`status-value ${dashboardData?.securityStatus?.firewall === 'active' ? 'active' : 'inactive'}`}>
                    {dashboardData?.securityStatus?.firewall || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="architecture-section">
            <h2>System Architecture</h2>
            <div className="architecture-grid">
              <div className="arch-section">
                <h3>Microservices</h3>
                <div className="service-list">
                  {dashboardData?.architecture?.microservices?.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-header">
                        <span className="service-name">{service.name}</span>
                        <span className={`service-status ${service.status}`}>
                          {service.status}
                        </span>
                      </div>
                      <p className="service-description">{service.description}</p>
                      <span className="service-port">Port: {service.port}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="arch-section">
                <h3>Databases</h3>
                <div className="database-list">
                  {dashboardData?.architecture?.databases?.map((db, index) => (
                    <div key={index} className="database-item">
                      <div className="database-header">
                        <span className="database-name">{db.name}</span>
                        <span className={`database-status ${db.status}`}>
                          {db.status}
                        </span>
                      </div>
                      <p className="database-purpose">{db.purpose}</p>
                      <span className="database-port">Port: {db.port}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Security Overview</h2>
            <div className="security-grid">
              <div className="security-card">
                <h3>Security Components</h3>
                <div className="component-list">
                  {dashboardData?.architecture?.securityComponents?.map((component, index) => (
                    <div key={index} className="component-item">
                      <span className="component-name">{component.name}</span>
                      <span className={`component-status ${component.status}`}>
                        {component.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="security-card">
                <h3>Recent Security Events</h3>
                <div className="event-list">
                  {dashboardData?.securityAudit?.recentEvents?.map((event, index) => (
                    <div key={index} className="event-item">
                      <div className="event-header">
                        <span className={`event-severity ${event.severity}`}>
                          {event.severity}
                        </span>
                        <span className="event-time">{event.timestamp}</span>
                      </div>
                      <p className="event-description">{event.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="user-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.totalUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.activeUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Admin Users</h3>
                <div className="stat-value">{dashboardData?.userManagement?.adminUsernames?.length || 0}</div>
              </div>
            </div>
            
            <div className="admin-users-section">
              <h3>Admin Usernames</h3>
              <div className="admin-list">
                {dashboardData?.userManagement?.adminUsernames?.map((username, index) => (
                  <div key={index} className="admin-item">
                    <span className="admin-username">{username}</span>
                  </div>
                )) || (
                  <p>No admin users found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'oauth' && (
          <div className="oauth-section">
            <h2>OAuth2 Configuration</h2>
            <div className="oauth-grid">
              <div className="oauth-card">
                <h3>System Configuration</h3>
                <div className="config-list">
                  {Object.entries(dashboardData?.architecture?.configuration || {}).map(([key, value]) => (
                    <div key={key} className="config-item">
                      <span className="config-key">{key}:</span>
                      <span className="config-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="oauth-card">
                <h3>Security Components</h3>
                <div className="component-list">
                  {dashboardData?.architecture?.securityComponents?.map((component, index) => (
                    <div key={index} className="component-item">
                      <div className="component-header">
                        <span className="component-name">{component.name}</span>
                        <span className={`component-status ${component.status?.toLowerCase()}`}>
                          {component.status}
                        </span>
                      </div>
                      <p className="component-description">{component.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="workflow-section">
            <h2>🔐 OAuth2/OIDC Security Workflow</h2>
            <p className="workflow-description">
              This section provides a detailed breakdown of how OAuth2/OIDC security is implemented in our application, 
              including exact class names, methods, and the complete authentication flow.
            </p>

            <div className="workflow-container">
              {/* Phase 1: Frontend Initiation */}
              <div className="workflow-phase">
                <h3>📱 Phase 1: Frontend Authentication Initiation</h3>
                <div className="workflow-step">
                  <h4>1.1 User Login Request</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: oauth-ui/src/components/Auth.js</span>
                    </div>
                    <pre><code>{`// User clicks "Login with OAuth2" button
const handleOAuth2Login = async () => {
  try {
    setLoading(true);
    setError('');
    // Initiate OAuth2 Authorization Code flow with PKCE
    await login();
  } catch (error) {
    console.error('OAuth2 login error:', error);
    setError('OAuth2 login failed. Please try again.');
    setLoading(false);
  }
};`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>1.2 UserManager Configuration</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: oauth-ui/src/contexts/AuthContext.js</span>
                    </div>
                    <pre><code>{`// Create UserManager instance with OIDC configuration
const config = {
  authority: 'http://localhost:9000',
  client_id: 'react-client',
  redirect_uri: 'http://localhost:3000/callback',
  silent_redirect_uri: 'http://localhost:3000/silent-renew',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code', // Authorization Code flow
  scope: 'openid profile email api.read api.write',
  loadUserInfo: true,
  automaticSilentRenew: true,
  code_challenge_method: 'S256', // PKCE
  filterProtocolClaims: true,
  validateSubOnSilentRenew: true,
};

const userManager = new UserManager(config);`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>1.3 PKCE Code Generation</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: oauth-ui/src/utils/auth.js</span>
                    </div>
                    <pre><code>{`// Generate PKCE verifier and challenge
generatePkceVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');
}

async generatePkceChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* Phase 2: Authorization Server */}
              <div className="workflow-phase">
                <h3>🔐 Phase 2: Authorization Server Processing</h3>
                <div className="workflow-step">
                  <h4>2.1 Authorization Endpoint</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: auth-server/src/main/java/com/oauth/auth_server/config/AuthorizationServerConfig.java</span>
                    </div>
                    <pre><code>{`@Bean
@Order(Ordered.HIGHEST_PRECEDENCE)
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) {
  OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
  
  http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
      .oidc(Customizer.withDefaults()); // Enable OpenID Connect
  
  return http.build();
}

// Authorization endpoint: /oauth2/authorize
// Token endpoint: /oauth2/token
// JWKS endpoint: /oauth2/jwks.json`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>2.2 JWT Token Customization</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: auth-server/src/main/java/com/oauth/auth_server/config/AuthorizationServerConfig.java</span>
                    </div>
                    <pre><code>{`@Bean
public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
  return context -> {
    if (context.getTokenType().getValue().equals("access_token")) {
      context.getClaims().claims(claims -> {
        // Add audience claim
        claims.put("aud", List.of("api-gateway"));
        
        // Extract and add user roles
        if (context.getPrincipal() instanceof UserDetails) {
          UserDetails userDetails = (UserDetails) context.getPrincipal();
          List<String> roles = userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());
          
          claims.put("username", userDetails.getUsername());
          claims.put("roles", roles);
          claims.put("authorities", roles);
        }
      });
    }
  };
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>2.3 Token Settings Configuration</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: auth-server/src/main/java/com/oauth/auth_server/config/AuthorizationServerConfig.java</span>
                    </div>
                    <pre><code>{`@Bean
public TokenSettings tokenSettings() {
  return TokenSettings.builder()
      .accessTokenTimeToLive(Duration.ofMinutes(15))
      .refreshTokenTimeToLive(Duration.ofDays(1))
      .idTokenSignatureAlgorithm(SignatureAlgorithm.RS256)
      .build();
}

@Bean
public ClientSettings clientSettings() {
  return ClientSettings.builder()
      .requireProofKey(true) // Enforce PKCE
      .requireAuthorizationConsent(true)
      .build();
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* Phase 3: API Gateway */}
              <div className="workflow-phase">
                <h3>🚪 Phase 3: API Gateway Token Validation</h3>
                <div className="workflow-step">
                  <h4>3.1 JWT Validation Filter</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: api-gateway/src/main/java/com/api/apigateway/filter/JwtValidationFilter.java</span>
                    </div>
                    <pre><code>{`@Component
public class JwtValidationFilter extends AbstractGatewayFilterFactory<Config> {
  
  @Override
  public GatewayFilter apply(Config config) {
    return (exchange, chain) -> {
      ServerHttpRequest request = exchange.getRequest();
      String path = request.getPath().value();
      
      // Skip validation for public endpoints
      if (isPublicEndpoint(path)) {
        return chain.filter(exchange);
      }
      
      // Extract JWT token from Authorization header
      String token = extractToken(request);
      if (!StringUtils.hasText(token)) {
        return createErrorResponse(response, "Missing JWT token", HttpStatus.UNAUTHORIZED);
      }
      
      // Validate token and add user info to headers
      return jwtValidationService.validateToken(token)
          .flatMap(validationResult -> {
            if (!validationResult.isValid()) {
              return createErrorResponse(response, validationResult.getMessage(), HttpStatus.UNAUTHORIZED);
            }
            
            ServerHttpRequest modifiedRequest = addUserInfoToHeaders(request, validationResult);
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
          });
    };
  }
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>3.2 JWT Validation Service</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: api-gateway/src/main/java/com/api/apigateway/service/JwtValidationService.java</span>
                    </div>
                    <pre><code>{`@Service
public class JwtValidationService {
  
  public Mono<JWTValidationResult> validateToken(String token) {
    return Mono.fromCallable(() -> {
      // 1. Validate JWT signature and claims
      JWTClaimsSet claimsSet = validateJwtSignature(token);
      if (claimsSet == null) {
        return new JWTValidationResult(false, "Invalid JWT signature", null, null);
      }
      
      // 2. Extract JTI and check blacklist
      String jti = claimsSet.getJWTID();
      if (isTokenBlacklisted(jti)) {
        return new JWTValidationResult(false, "Token revoked", null, null);
      }
      
      // 3. Extract authorities from claims
      List<String> authorities = extractAuthorities(claimsSet);
      
      return new JWTValidationResult(true, "Token valid", claimsSet, authorities);
    });
  }
  
  private JWTClaimsSet validateJwtSignature(String token) {
    // Load JWK set from auth server
    JWKSet jwkSet = JWKSet.load(new URL(jwkSetUri));
    
    // Configure JWT processor with RS256 algorithm
    ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
    JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
    jwtProcessor.setJWSKeySelector(keySelector);
    
    // Process and validate JWT
    JWTClaimsSet claimsSet = jwtProcessor.process(token, null);
    
    // Validate issuer, audience, and expiry
    if (!issuerUri.equals(claimsSet.getIssuer())) return null;
    if (!claimsSet.getAudience().contains("api-gateway")) return null;
    if (claimsSet.getExpirationTime().before(new Date())) return null;
    
    return claimsSet;
  }
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>3.3 Route Configuration</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: api-gateway/src/main/resources/application.yml</span>
                    </div>
                    <pre><code>{`spring:
  cloud:
    gateway:
      routes:
        # Admin Service routes with JWT validation
        - id: admin-service
          uri: http://admin-service:8083
          predicates:
            - Path=/api/admin/**
          filters:
            - StripPrefix=1
            - name: JwtValidationFilter
            - name: CircuitBreaker
              args:
                name: adminCircuitBreaker
                fallbackUri: forward:/fallback/admin
        
        # User Service routes with JWT validation
        - id: user-service
          uri: http://user-service:8084
          predicates:
            - Path=/api/user/**
          filters:
            - StripPrefix=1
            - name: JwtValidationFilter
            - name: CircuitBreaker
              args:
                name: userCircuitBreaker
                fallbackUri: forward:/fallback/user`}</code></pre>
                  </div>
                </div>
              </div>

              {/* Phase 4: Microservices */}
              <div className="workflow-phase">
                <h3>🔧 Phase 4: Microservice Authorization</h3>
                <div className="workflow-step">
                  <h4>4.1 Security Configuration</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: admin-service/src/main/java/com/api/adminservice/config/SecurityConfig.java</span>
                    </div>
                    <pre><code>{`@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
  
  @Bean
  public JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
    grantedAuthoritiesConverter.setAuthorityPrefix("");
    
    JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
    converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    return converter;
  }
  
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.oauth2ResourceServer(oauth2 -> oauth2
        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
    );
    return http.build();
  }
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>4.2 Method-Level Authorization</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: admin-service/src/main/java/com/api/adminservice/controller/AdminController.java</span>
                    </div>
                    <pre><code>{`@RestController
@RequestMapping("/admin")
public class AdminController {
  
  @GetMapping("/dashboard")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Map<String, Object>> getAdminDashboard() {
    Map<String, Object> dashboard = new HashMap<>();
    dashboard.put("architecture", adminService.getSystemArchitecture());
    dashboard.put("metrics", adminService.getSystemMetrics());
    dashboard.put("userManagement", adminService.getUserManagement());
    return ResponseEntity.ok(dashboard);
  }
  
  @PostMapping("/users/{userId}/role")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> roleRequest) {
    String newRole = roleRequest.get("role");
    Map<String, Object> result = adminService.updateUserRole(userId, newRole);
    return ResponseEntity.ok(result);
  }
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>4.3 User Service Authorization</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: user-service/src/main/java/com/api/userservice/controller/UserController.java</span>
                    </div>
                    <pre><code>{`@RestController
@RequestMapping("/user")
public class UserController {
  
  @GetMapping("/profile")
  @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
  public ResponseEntity<UserProfile> getUserProfile() {
    return ResponseEntity.ok(userService.getUserProfile());
  }
  
  @GetMapping("/dashboard")
  @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
  public ResponseEntity<UserDashboard> getUserDashboard() {
    return ResponseEntity.ok(userService.getUserDashboard());
  }
  
  @PutMapping("/profile")
  @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
  public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> profileUpdate) {
    Map<String, Object> result = userService.updateUserProfile(profileUpdate);
    return ResponseEntity.ok(result);
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* Phase 5: Token Management */}
              <div className="workflow-phase">
                <h3>🔄 Phase 5: Token Management & Refresh</h3>
                <div className="workflow-step">
                  <h4>5.1 Token Storage & Management</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: oauth-ui/src/utils/auth.js</span>
                    </div>
                    <pre><code>{`class SecureTokenManager {
  constructor() {
    this.accessTokenKey = 'oauth_access_token';
    this.refreshTokenKey = 'oauth_refresh_token';
    this.idTokenKey = 'oauth_id_token';
    this.tokenExpiryKey = 'oauth_token_expiry';
    this.userKey = 'oauth_user_data';
    this.pkceStateKey = 'oauth_pkce_state';
    this.nonceKey = 'oauth_nonce';
  }
  
  // Store access token securely
  setAccessToken(token) {
    try {
      sessionStorage.setItem(this.accessTokenKey, token);
      return true;
    } catch (error) {
      console.error('Error storing access token:', error);
      return false;
    }
  }
  
  // Check if token is expired
  isTokenExpired() {
    const expiryTime = this.getTokenExpiryTime();
    if (!expiryTime) return true;
    return new Date().getTime() > expiryTime;
  }
  
  // Validate token format
  validateTokenFormat(token) {
    if (!token || typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    return true;
  }
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>5.2 Automatic Token Refresh</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: oauth-ui/src/contexts/AuthContext.js</span>
                    </div>
                    <pre><code>{`// UserManager configuration for automatic token refresh
const config = {
  authority: 'http://localhost:9000',
  client_id: 'react-client',
  redirect_uri: 'http://localhost:3000/callback',
  silent_redirect_uri: 'http://localhost:3000/silent-renew',
  automaticSilentRenew: true,
  silentRequestTimeout: 30000,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  monitorSession: true,
  checkSessionInterval: 2000,
};

// Silent renewal happens automatically when token is about to expire
userManager.events.addSilentRenewError((error) => {
  console.error('Silent renewal error:', error);
  // Handle renewal failure (redirect to login)
});

userManager.events.addUserLoaded((user) => {
  console.log('User loaded:', user);
  setUser(user);
  setLoading(false);
});`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>5.3 Token Blacklisting</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: auth-server/src/main/java/com/oauth/auth_server/service/TokenBlacklistService.java</span>
                    </div>
                    <pre><code>{`@Service
public class TokenBlacklistService {
  
  @Autowired
  private RedisTemplate<String, Object> redisTemplate;
  
  private static final String BLACKLIST_PREFIX = "blacklist:";
  
  /**
   * Blacklist a JWT token by its JTI (JWT ID)
   */
  public void blacklistToken(String jti, Duration ttl) {
    String key = BLACKLIST_PREFIX + jti;
    redisTemplate.opsForValue().set(key, "revoked", ttl.toSeconds(), TimeUnit.SECONDS);
  }
  
  /**
   * Check if a token is blacklisted
   */
  public boolean isTokenBlacklisted(String jti) {
    String key = BLACKLIST_PREFIX + jti;
    return Boolean.TRUE.equals(redisTemplate.hasKey(key));
  }
  
  /**
   * Store session information
   */
  public void storeSession(String sessionId, String userId, Duration ttl) {
    String key = "session:" + sessionId;
    redisTemplate.opsForValue().set(key, userId, ttl.toSeconds(), TimeUnit.SECONDS);
  }
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* Security Features Summary */}
              <div className="workflow-phase">
                <h3>🛡️ Security Features Summary</h3>
                <div className="security-features-grid">
                  <div className="security-feature">
                    <h4>🔐 PKCE (Proof Key for Code Exchange)</h4>
                    <ul>
                      <li>Prevents authorization code interception attacks</li>
                      <li>Code verifier generated using crypto.getRandomValues()</li>
                      <li>Code challenge created using SHA-256 hash</li>
                      <li>Enforced at authorization server level</li>
                    </ul>
                  </div>
                  
                  <div className="security-feature">
                    <h4>🎫 JWT Token Security</h4>
                    <ul>
                      <li>RS256 asymmetric signing algorithm</li>
                      <li>15-minute access token lifetime</li>
                      <li>1-day refresh token lifetime</li>
                      <li>Token blacklisting via Redis</li>
                      <li>Automatic token refresh</li>
                      <li>Minimal claims in access tokens (subject, roles, scopes)</li>
                      <li>User profile data in ID tokens via OIDC scopes</li>
                      <li>/userinfo endpoint for fresh user data</li>
                      <li>JTI (JWT ID) for token revocation tracking</li>
                      <li>Audience validation (api-gateway)</li>
                      <li>Issuer validation (http://localhost:9000)</li>
                      <li>Expiration time validation</li>
                    </ul>
                  </div>
                  
                  <div className="security-feature">
                    <h4>🔒 Role-Based Access Control</h4>
                    <ul>
                      <li>@PreAuthorize annotations for method-level security</li>
                      <li>hasRole('ROLE_ADMIN') for admin-only endpoints</li>
                      <li>hasAnyRole('ROLE_USER', 'ROLE_ADMIN') for user endpoints</li>
                      <li>Roles extracted from JWT claims</li>
                    </ul>
                  </div>
                  
                  <div className="security-feature">
                    <h4>🚪 API Gateway Security</h4>
                    <ul>
                      <li>Centralized JWT validation</li>
                      <li>User information injection into headers</li>
                      <li>Public endpoint bypass for auth endpoints</li>
                      <li>Circuit breaker for fault tolerance</li>
                      <li>Rate limiting for API protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed JWT Security Section */}
              <div className="workflow-phase">
                <h3>🔐 Detailed JWT Security Implementation</h3>
                
                <div className="workflow-step">
                  <h4>JWT Token Structure & Best Practices</h4>
                  <div className="jwt-details-grid">
                    <div className="jwt-section">
                      <h5>🎯 Access Token Claims (Minimal)</h5>
                      <div className="code-block">
                        <div className="code-header">
                          <span>Access Token Structure</span>
                        </div>
                        <pre><code>{`{
  "iss": "http://localhost:9000",           // Issuer
  "sub": "user123",                        // Subject (User ID)
  "aud": ["api-gateway"],                  // Audience
  "exp": 1640995200,                       // Expiration time
  "iat": 1640994300,                       // Issued at
  "jti": "unique-token-id",                // JWT ID for revocation
  "roles": ["ROLE_USER"],                  // User roles
  "scope": "openid profile email api.read" // Granted scopes
}`}</code></pre>
                      </div>
                      <p><strong>Why minimal claims?</strong> Access tokens are for API authorization, not user profile data. Less sensitive information reduces security risk.</p>
                    </div>

                    <div className="jwt-section">
                      <h5>👤 ID Token Claims (Profile Data)</h5>
                      <div className="code-block">
                        <div className="code-header">
                          <span>ID Token Structure</span>
                        </div>
                        <pre><code>{`{
  "iss": "http://localhost:9000",
  "sub": "user123",
  "aud": "react-client",
  "exp": 1640995200,
  "iat": 1640994300,
  "nonce": "random-nonce-value",
  "email": "user@example.com",             // Profile claims
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "preferred_username": "johndoe"
}`}</code></pre>
                      </div>
                      <p><strong>Profile data location:</strong> ID tokens contain user profile information requested via OIDC scopes (profile, email).</p>
                    </div>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>User Information Strategy</h4>
                  <div className="info-strategy-grid">
                    <div className="strategy-item">
                      <h5>📄 Access Token</h5>
                      <ul>
                        <li><strong>Purpose:</strong> API authorization</li>
                        <li><strong>Contains:</strong> Subject, roles, scopes, audience</li>
                        <li><strong>Lifetime:</strong> 15 minutes (short-lived)</li>
                        <li><strong>Security:</strong> Minimal claims reduce exposure risk</li>
                      </ul>
                    </div>

                    <div className="strategy-item">
                      <h5>🆔 ID Token</h5>
                      <ul>
                        <li><strong>Purpose:</strong> User authentication & profile</li>
                        <li><strong>Contains:</strong> Profile claims (email, name, etc.)</li>
                        <li><strong>Lifetime:</strong> Same as access token</li>
                        <li><strong>Security:</strong> Contains user info for client use</li>
                      </ul>
                    </div>

                    <div className="strategy-item">
                      <h5>🌐 /userinfo Endpoint</h5>
                      <ul>
                        <li><strong>Purpose:</strong> Fresh user data retrieval</li>
                        <li><strong>Contains:</strong> Complete, up-to-date user profile</li>
                        <li><strong>Lifetime:</strong> Always current</li>
                        <li><strong>Security:</strong> Requires valid access token</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>JWT Validation Process</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: api-gateway/src/main/java/com/api/apigateway/service/JwtValidationService.java</span>
                    </div>
                    <pre><code>{`public Mono<JWTValidationResult> validateToken(String token) {
  return Mono.fromCallable(() -> {
    // 1. Validate JWT signature using JWK from auth server
    JWTClaimsSet claimsSet = validateJwtSignature(token);
    if (claimsSet == null) {
      return new JWTValidationResult(false, "Invalid JWT signature", null, null);
    }
    
    // 2. Validate issuer (must match auth server)
    if (!issuerUri.equals(claimsSet.getIssuer())) {
      return new JWTValidationResult(false, "Invalid issuer", null, null);
    }
    
    // 3. Validate audience (must contain api-gateway)
    if (!claimsSet.getAudience().contains("api-gateway")) {
      return new JWTValidationResult(false, "Invalid audience", null, null);
    }
    
    // 4. Validate expiration time
    Date expiry = claimsSet.getExpirationTime();
    if (expiry != null && expiry.before(new Date())) {
      return new JWTValidationResult(false, "Token expired", null, null);
    }
    
    // 5. Extract JTI and check blacklist
    String jti = claimsSet.getJWTID();
    if (isTokenBlacklisted(jti)) {
      return new JWTValidationResult(false, "Token revoked", null, null);
    }
    
    // 6. Extract authorities from claims
    List<String> authorities = extractAuthorities(claimsSet);
    
    return new JWTValidationResult(true, "Token valid", claimsSet, authorities);
  });
}`}</code></pre>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>Token Revocation & Blacklisting</h4>
                  <div className="code-block">
                    <div className="code-header">
                      <span>File: auth-server/src/main/java/com/oauth/auth_server/service/TokenBlacklistService.java</span>
                    </div>
                    <pre><code>{`@Service
public class TokenBlacklistService {
  
  @Autowired
  private RedisTemplate<String, Object> redisTemplate;
  
  private static final String BLACKLIST_PREFIX = "blacklist:";
  
  /**
   * Blacklist a JWT token by its JTI (JWT ID)
   * JTI is unique identifier in JWT for revocation tracking
   */
  public void blacklistToken(String jti, Duration ttl) {
    String key = BLACKLIST_PREFIX + jti;
    // Store in Redis with TTL matching token expiration
    redisTemplate.opsForValue().set(key, "revoked", ttl.toSeconds(), TimeUnit.SECONDS);
  }
  
  /**
   * Check if a token is blacklisted
   * Called during JWT validation in API Gateway
   */
  public boolean isTokenBlacklisted(String jti) {
    String key = BLACKLIST_PREFIX + jti;
    return Boolean.TRUE.equals(redisTemplate.hasKey(key));
  }
}`}</code></pre>
                  </div>
                  <div className="security-note">
                    <h5>🔒 Security Benefits of JTI-based Blacklisting:</h5>
                    <ul>
                      <li><strong>Unique Identification:</strong> Each token has a unique JTI for precise revocation</li>
                      <li><strong>Stateless Validation:</strong> No need to store full tokens, just JTI references</li>
                      <li><strong>Automatic Cleanup:</strong> Redis TTL automatically removes expired blacklist entries</li>
                      <li><strong>Performance:</strong> Fast O(1) lookup for blacklist checks</li>
                      <li><strong>Scalability:</strong> Redis can handle millions of blacklisted JTIs</li>
                    </ul>
                  </div>
                </div>

                <div className="workflow-step">
                  <h4>Client Authentication Methods</h4>
                  <div className="client-auth-grid">
                    <div className="auth-method">
                      <h5>📱 SPA (React) - Recommended</h5>
                      <div className="code-block">
                        <div className="code-header">
                          <span>Client Configuration</span>
                        </div>
                        <pre><code>{`@Bean
public RegisteredClient registeredClient() {
  return RegisteredClient.withId("react-client")
      .clientId("react-client")
      .clientAuthenticationMethod(ClientAuthenticationMethod.NONE) // No secret
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
      .redirectUri("http://localhost:3000/callback")
      .scope("openid")
      .scope("profile")
      .scope("email")
      .scope("api.read")
      .scope("api.write")
      .clientSettings(ClientSettings.builder()
          .requireProofKey(true) // Enforce PKCE
          .build())
      .build();
}`}</code></pre>
                      </div>
                      <ul>
                        <li><strong>Authentication:</strong> NONE (no client secret)</li>
                        <li><strong>Security:</strong> PKCE for code exchange protection</li>
                        <li><strong>Use Case:</strong> Browser-based applications</li>
                        <li><strong>Risk:</strong> No client secret exposure in browser</li>
                      </ul>
                    </div>

                    <div className="auth-method">
                      <h5>🖥️ Server-Side Application</h5>
                      <div className="code-block">
                        <div className="code-header">
                          <span>Client Configuration</span>
                        </div>
                        <pre><code>{`@Bean
public RegisteredClient registeredClient() {
  return RegisteredClient.withId("server-client")
      .clientId("server-client")
      .clientSecret("{noop}server-secret") // Client secret
      .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
      .redirectUri("http://localhost:8080/callback")
      .scope("openid")
      .scope("profile")
      .scope("email")
      .clientSettings(ClientSettings.builder()
          .requireProofKey(false) // Not needed for server apps
          .build())
      .build();
}`}</code></pre>
                      </div>
                      <ul>
                        <li><strong>Authentication:</strong> CLIENT_SECRET_BASIC</li>
                        <li><strong>Security:</strong> Client secret in Authorization header</li>
                        <li><strong>Use Case:</strong> Backend applications</li>
                        <li><strong>Risk:</strong> Secret must be kept secure on server</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 