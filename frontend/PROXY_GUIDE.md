# API Proxying Security Guide

## Overview
This implementation hides backend URLs from the frontend using proxy endpoints.

## Security Benefits
- Backend URLs hidden from network tab
- Prevents direct service enumeration
- Centralized security controls
- Request/response filtering

## Proxy Configuration
- `/api` → API Gateway (localhost:8000)
- `/auth` → Auth Server (localhost:9000)
- `/resources` → Resource Server (localhost:8080)

## Usage
```javascript
// Instead of: axios.get('http://localhost:8000/api/users')
// Use: axios.get('/api/users')

// Instead of: axios.post('http://localhost:9000/oauth2/token', data)
// Use: axios.post('/auth/oauth2/token', data)
```

## Security Features
- Header sanitization
- Security headers injection
- Request logging
- Error handling
- Health check endpoints

## Setup
1. Install: `npm install http-proxy-middleware`
2. Proxy config: `src/setupProxy.js`
3. API utility: `src/utils/api.js`
4. Use proxy paths in all API calls 