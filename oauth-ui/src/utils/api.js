import axios from 'axios';

// Create axios instance with proxy configuration
const api = axios.create({
  baseURL: '', // Empty base URL - all calls go through proxy
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Gateway endpoints (proxied through /api)
export const gatewayAPI = {
  health: () => api.get('/api/health'),
  fallback: () => api.get('/api/fallback'),
};

// Auth Server endpoints (proxied through /auth)
export const authAPI = {
  token: (data) => api.post('/auth/oauth2/token', data),
  userInfo: () => api.get('/auth/userinfo'),
  logout: () => api.post('/auth/logout'),
  jwks: () => api.get('/auth/.well-known/jwks.json'),
  discovery: () => api.get('/auth/.well-known/openid_configuration'),
  health: () => api.get('/auth/health'),
};

// Resource Server endpoints (proxied through /resources)
export const resourceAPI = {
  getUsers: () => api.get('/api/users'),
  getUser: (id) => api.get(`/api/users/${id}`),
  createUser: (userData) => api.post('/api/users', userData),
  updateUser: (id, userData) => api.put(`/api/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/users/${id}`),
  getAdminData: () => api.get('/api/admin'),
  adminStats: () => api.get('/api/admin/stats'),
  health: () => api.get('/health'),
  validateToken: (token) => api.post('/resources/api/validate-token', { token }),
};

// Health check for all services
export const healthCheck = async () => {
  try {
    const [gateway, auth, resource] = await Promise.allSettled([
      gatewayAPI.health(),
      authAPI.health(),
      resourceAPI.health(),
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
};

export default api; 