# API Proxying Security Implementation

## Overview

This document explains the API proxying implementation that hides backend service URLs from the frontend, providing an additional layer of security and preventing direct access to internal services.

## 🛡️ Security Benefits

### 1. **Backend URL Hiding**
- **Problem**: Frontend code and network requests expose backend service URLs
- **Solution**: All API calls go through proxy endpoints that hide actual backend URLs
- **Benefit**: Attackers cannot directly enumerate or access backend services

### 2. **Service Enumeration Prevention**
- **Problem**: Network tab reveals internal service structure
- **Solution**: Proxy paths like `/api`, `/auth`, `/resources` hide actual endpoints
- **Benefit**: Internal architecture remains hidden from client-side inspection

### 3. **Centralized Security Controls**
- **Problem**: Each service needs individual security configuration
- **Solution**: Proxy middleware handles security headers, logging, and error handling
- **Benefit**: Consistent security policies across all services

### 4. **Request/Response Filtering**
- **Problem**: Sensitive headers and information leak through responses
- **Solution**: Proxy removes sensitive headers and adds security headers
- **Benefit**: Information disclosure prevention and enhanced security

## 🔧 Implementation Details

### Proxy Configuration (`setupProxy.js`)

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // API Gateway Proxy
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    // Security features...
  }));

  // Auth Server Proxy
  app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:9000',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    // Security features...
  }));

  // Resource Server Proxy
  app.use('/resources', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: { '^/resources': '' },
    // Security features...
  }));
};
```

### Proxy Endpoints

| Frontend Path | Backend Service | Internal URL | Purpose |
|---------------|----------------|--------------|---------|
| `/api/*` | API Gateway | `localhost:8000` | Main API routing and security |
| `/auth/*` | Auth Server | `localhost:9000` | OAuth2/OIDC authentication |
| `/resources/*` | Resource Server | `localhost:8080` | Protected resources and data |
| `/health` | Frontend | - | Health check endpoint |

### Security Features Implemented

#### 1. **Header Sanitization**
```javascript
onProxyRes: (proxyRes, req, res) => {
  // Remove sensitive headers
  delete proxyRes.headers['server'];
  delete proxyRes.headers['x-powered-by'];
  
  // Add security headers
  proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
  proxyRes.headers['X-Frame-Options'] = 'DENY';
  proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
  proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
}
```

#### 2. **Request Logging**
```javascript
onProxyReq: (proxyReq, req, res) => {
  console.log(`[PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
}
```

#### 3. **Error Handling**
```javascript
onError: (err, req, res) => {
  console.error('[PROXY ERROR]', err);
  res.status(500).json({
    error: 'Service temporarily unavailable',
    message: 'Please try again later'
  });
}
```

## 📊 Network Tab Comparison

### ❌ Without Proxy (Exposed)
```
Network Tab Shows:
- localhost:8000/api/users
- localhost:9000/oauth2/token
- localhost:8080/api/admin
- Internal service structure visible
- Backend URLs directly accessible
```

### ✅ With Proxy (Hidden)
```
Network Tab Shows:
- /api/users
- /auth/oauth2/token
- /resources/api/admin
- Backend URLs completely hidden
- Internal structure masked
```

## 🚀 Usage Examples

### Frontend API Calls
```javascript
// Instead of: axios.get('http://localhost:8000/api/users')
// Use: axios.get('/api/users')

// Instead of: axios.post('http://localhost:9000/oauth2/token', data)
// Use: axios.post('/auth/oauth2/token', data)

// Instead of: axios.get('http://localhost:8080/api/admin')
// Use: axios.get('/resources/api/admin')
```

### API Service Implementation
```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // Empty base URL - all calls go through proxy
  timeout: 10000,
});

export const userService = {
  getUsers: () => apiClient.get('/api/users'),
  getUser: (id) => apiClient.get(`/api/users/${id}`),
  createUser: (data) => apiClient.post('/api/users', data),
};

export const authService = {
  token: (data) => apiClient.post('/auth/oauth2/token', data),
  userInfo: () => apiClient.get('/auth/userinfo'),
  logout: () => apiClient.post('/auth/logout'),
};
```

## 🔒 Security Headers Added

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-XSS-Protection` | `1; mode=block` | Enables XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install http-proxy-middleware
```

### 2. Create Proxy Configuration
Create `src/setupProxy.js` with the provided configuration.

### 3. Update API Calls
Replace all direct backend URLs with proxy paths.

### 4. Environment Configuration
```javascript
// .env.development
REACT_APP_API_BASE_URL=''

// .env.production
REACT_APP_API_BASE_URL='https://your-domain.com'
```

## 🔍 Monitoring and Debugging

### Health Check Endpoints
```javascript
// Check all services
GET /health

// Response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "frontend-proxy"
}
```

### Proxy Logging
```bash
# Development logs show:
[PROXY] GET /api/users -> /users
[PROXY] GET /api/users <- 200
[AUTH PROXY] POST /auth/oauth2/token -> /oauth2/token
[AUTH PROXY] POST /auth/oauth2/token <- 200
```

## 🚨 Security Considerations

### 1. **Production Deployment**
- Use reverse proxy (nginx, Apache) in production
- Configure SSL/TLS termination at proxy level
- Implement rate limiting and DDoS protection

### 2. **Environment Variables**
- Never hardcode backend URLs
- Use environment-specific configurations
- Secure sensitive configuration data

### 3. **Monitoring**
- Monitor proxy logs for suspicious activity
- Set up alerts for proxy errors
- Track request patterns and anomalies

### 4. **Error Handling**
- Don't expose internal error details
- Provide generic error messages
- Log detailed errors server-side only

## 📈 Performance Impact

### Minimal Overhead
- Proxy adds ~1-2ms latency per request
- Negligible memory usage
- No impact on frontend bundle size

### Benefits Outweigh Costs
- Enhanced security
- Simplified client configuration
- Centralized monitoring and logging

## 🔄 Migration Guide

### Step 1: Identify Direct URLs
```javascript
// Find all instances of:
axios.get('http://localhost:8000/...')
axios.post('http://localhost:9000/...')
fetch('http://localhost:8080/...')
```

### Step 2: Replace with Proxy Paths
```javascript
// Replace with:
axios.get('/api/...')
axios.post('/auth/...')
fetch('/resources/...')
```

### Step 3: Update Environment Variables
```javascript
// Remove or update:
REACT_APP_API_URL=http://localhost:8000
REACT_APP_AUTH_URL=http://localhost:9000

// Use:
REACT_APP_API_BASE_URL=''
```

### Step 4: Test Thoroughly
- Verify all API calls work through proxy
- Check network tab for hidden URLs
- Test error handling and fallbacks

## 🎯 Best Practices

1. **Consistent Naming**: Use clear, consistent proxy path names
2. **Error Handling**: Implement graceful error handling for proxy failures
3. **Logging**: Log proxy requests for monitoring and debugging
4. **Security Headers**: Always add security headers through proxy
5. **Health Checks**: Implement health check endpoints for monitoring
6. **Documentation**: Document proxy configuration and usage
7. **Testing**: Test proxy behavior in different environments

## 🔗 Related Documentation

- [http-proxy-middleware Documentation](https://github.com/chimurai/http-proxy-middleware)
- [React Development Server Proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
- [Security Headers Best Practices](https://owasp.org/www-project-secure-headers/)
- [OAuth2 Security Considerations](https://tools.ietf.org/html/rfc6819) 