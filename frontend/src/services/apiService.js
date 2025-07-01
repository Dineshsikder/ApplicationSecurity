import axios from 'axios';
import { getAccessToken } from '../utils/auth';

// Create axios instance with proxy configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Gateway endpoints (proxied through /api)
export const apiGatewayService = {
  // Health check
  health: () => apiClient.get('/api/actuator/health'),
  
  // Fallback endpoint
  fallback: () => apiClient.get('/api/fallback'),
  
  // Gateway info
  gatewayInfo: () => apiClient.get('/api/actuator/info'),
};

// Auth Server endpoints (proxied through /auth)
export const authService = {
  // OAuth2/OIDC endpoints
  authorize: (params) => apiClient.get('/auth/oauth2/authorize', { params }),
  token: (data) => apiClient.post('/auth/oauth2/token', data),
  userInfo: () => apiClient.get('/auth/userinfo'),
  logout: () => apiClient.post('/auth/logout'),
  
  // JWKS endpoint
  jwks: () => apiClient.get('/auth/oauth2/jwks.json'),
  
  // OIDC discovery
  discovery: () => apiClient.get('/auth/.well-known/openid_configuration'),
  
  // Health check
  health: () => apiClient.get('/auth/actuator/health'),
  
  // User management endpoints
  register: (userData) => apiClient.post('/auth/api/auth/register', userData),
  getAllUsers: () => apiClient.get('/auth/api/auth/users'),
  updateUserRole: (userId, role) => apiClient.post(`/auth/api/auth/users/${userId}/role`, { role }),
};

// Admin Service endpoints (proxied through /api/admin)
export const adminService = {
  // System architecture
  getSystemArchitecture: () => apiClient.get('/api/admin/architecture'),
  
  // System metrics
  getSystemMetrics: () => apiClient.get('/api/admin/metrics'),
  
  // User management
  getUserManagement: () => apiClient.get('/api/admin/users'),
  
  // Admin dashboard
  getAdminDashboard: () => apiClient.get('/api/admin/dashboard'),
  
  // Security audit
  getSecurityAudit: () => apiClient.get('/api/admin/security/audit'),
  
  // System health
  getSystemHealth: () => apiClient.get('/api/admin/system/health'),
  
  // OAuth configuration
  getOAuthConfiguration: () => apiClient.get('/api/admin/oauth/configuration'),
  
  // Update user role
  updateUserRole: (userId, role) => apiClient.post(`/api/admin/users/${userId}/role`, { role }),
};

// User Service endpoints (proxied through /api/user)
export const userService = {
  // User profile
  getUserProfile: () => apiClient.get('/api/user/profile'),
  
  // User dashboard
  getUserDashboard: () => apiClient.get('/api/user/dashboard'),
  
  // User overview
  getUserOverview: () => apiClient.get('/api/user/overview'),
  
  // User permissions
  getUserPermissions: () => apiClient.get('/api/user/permissions'),
  
  // User activity
  getUserActivity: () => apiClient.get('/api/user/activity'),
  
  // Update user profile
  updateUserProfile: (profileData) => apiClient.put('/api/user/profile', profileData),
  
  // OAuth info
  getOAuthInfo: () => apiClient.get('/api/user/oauth/info'),
};

// Resource Server endpoints (proxied through /resources)
export const resourceService = {
  // User endpoints
  getUsers: () => apiClient.get('/resources/user/admin/users'),
  getUser: (id) => apiClient.get(`/resources/user/admin/users/${id}`),
  createUser: (userData) => apiClient.post('/resources/user/admin/users', userData),
  updateUser: (id, userData) => apiClient.put(`/resources/user/admin/users/${id}`, userData),
  deleteUser: (id) => apiClient.delete(`/resources/user/admin/users/${id}`),
  
  // User profile
  getUserProfile: () => apiClient.get('/resources/user/profile'),
  
  // Public info
  getPublicInfo: () => apiClient.get('/resources/user/public-info'),
  
  // Admin endpoints
  getAdminDashboard: () => apiClient.get('/resources/admin/dashboard'),
  getSystemInfo: () => apiClient.get('/resources/admin/system-info'),
  performMaintenance: (action) => apiClient.post('/resources/admin/maintenance', { action }),
  
  // Health check
  health: () => apiClient.get('/resources/actuator/health'),
  
  // Token validation
  validateToken: (token) => apiClient.post('/resources/user/validate-token', { token }),
};

// Health check for all services
export const healthService = {
  checkAll: async () => {
    try {
      const [gateway, auth, resource] = await Promise.allSettled([
        apiGatewayService.health(),
        authService.health(),
        resourceService.health(),
      ]);
      
      return {
        gateway: gateway.status === 'fulfilled' ? gateway.value.data : null,
        auth: auth.status === 'fulfilled' ? auth.value.data : null,
        resource: resource.status === 'fulfilled' ? resource.value.data : null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      };
    }
  },
};

// Legacy API endpoints (for backward compatibility)
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch('/auth/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch('/auth/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getAllUsers: async () => {
    const token = getAccessToken();
    const response = await fetch('/auth/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  updateUserRole: async (userId, role) => {
    const token = getAccessToken();
    const response = await fetch(`/auth/api/auth/users/${userId}/role`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    return response.json();
  },
};

// Export the main apiClient for custom requests
export default apiClient; 