const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = function(app) {
  // Proxy configuration for API Gateway
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding to backend
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add security headers
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
        
        // Log proxy requests (remove in production)
        console.log(`[PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Remove sensitive headers from backend response
        delete proxyRes.headers['server'];
        delete proxyRes.headers['x-powered-by'];
        
        // Add security headers to response
        proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
        proxyRes.headers['X-Frame-Options'] = 'DENY';
        proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
        proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
        
        // Log proxy responses (remove in production)
        console.log(`[PROXY] ${req.method} ${req.path} <- ${proxyRes.statusCode}`);
      },
      onError: (err, req, res) => {
        console.error('[PROXY ERROR]', err);
        res.status(500).json({
          error: 'Service temporarily unavailable',
          message: 'Please try again later'
        });
      }
    })
  );

  // Proxy configuration for Auth Server
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '', // Remove /auth prefix when forwarding to auth server
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add security headers
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
        
        console.log(`[AUTH PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Remove sensitive headers
        delete proxyRes.headers['server'];
        delete proxyRes.headers['x-powered-by'];
        
        // Add security headers
        proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
        proxyRes.headers['X-Frame-Options'] = 'DENY';
        proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
        proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
        
        console.log(`[AUTH PROXY] ${req.method} ${req.path} <- ${proxyRes.statusCode}`);
      },
      onError: (err, req, res) => {
        console.error('[AUTH PROXY ERROR]', err);
        res.status(500).json({
          error: 'Authentication service unavailable',
          message: 'Please try again later'
        });
      }
    })
  );

  // Proxy configuration for Resource Server
  app.use(
    '/resources',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/resources': '', // Remove /resources prefix when forwarding to resource server
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add security headers
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
        
        console.log(`[RESOURCE PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Remove sensitive headers
        delete proxyRes.headers['server'];
        delete proxyRes.headers['x-powered-by'];
        
        // Add security headers
        proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
        proxyRes.headers['X-Frame-Options'] = 'DENY';
        proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
        proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
        
        console.log(`[RESOURCE PROXY] ${req.method} ${req.path} <- ${proxyRes.statusCode}`);
      },
      onError: (err, req, res) => {
        console.error('[RESOURCE PROXY ERROR]', err);
        res.status(500).json({
          error: 'Resource service unavailable',
          message: 'Please try again later'
        });
      }
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'frontend-proxy'
    });
  });

  // Serve index.html for non-API GET requests (SPA support)
  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api') &&
      !req.path.startsWith('/auth') &&
      !req.path.startsWith('/resources') &&
      !req.path.startsWith('/health')
    ) {
      res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    } else {
      next();
    }
  });
}; 