const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = function (app) {
  // Proxy /api and /user requests to the API Gateway
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      // No pathRewrite needed; gateway should handle both /api/user/** and /user/**
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
        console.log(`[PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        delete proxyRes.headers['server'];
        delete proxyRes.headers['x-powered-by'];
        proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
        proxyRes.headers['X-Frame-Options'] = 'DENY';
        proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
        proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
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

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
        console.log(`[AUTH PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        delete proxyRes.headers['server'];
        delete proxyRes.headers['x-powered-by'];
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

  // app.use(
  //   '/resources',
  //   createProxyMiddleware({
  //     target: 'http://localhost:8080',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/resources': '',
  //     },
  //     onProxyReq: (proxyReq, req, res) => {
  //       proxyReq.setHeader('X-Forwarded-For', req.ip);
  //       proxyReq.setHeader('X-Real-IP', req.ip);
  //       proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
  //       console.log(`[RESOURCE PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
  //     },
  //     onProxyRes: (proxyRes, req, res) => {
  //       delete proxyRes.headers['server'];
  //       delete proxyRes.headers['x-powered-by'];
  //       proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
  //       proxyRes.headers['X-Frame-Options'] = 'DENY';
  //       proxyRes.headers['X-XSS-Protection'] = '1; mode=block';
  //       proxyRes.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
  //       console.log(`[RESOURCE PROXY] ${req.method} ${req.path} <- ${proxyRes.statusCode}`);
  //     },
  //     onError: (err, req, res) => {
  //       console.error('[RESOURCE PROXY ERROR]', err);
  //       res.status(500).json({
  //         error: 'Resource service unavailable',
  //         message: 'Please try again later'
  //       });
  //     }
  //   })
  // );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'frontend-proxy'
    });
  });

  // Serve index.html for non-API GET requests (SPA support), but NOT for static files (with extension)
  // app.use((req, res, next) => {
  //   if (
  //     req.method === 'GET' &&
  //     !req.path.startsWith('/api') &&
  //     !req.path.startsWith('/auth') &&
  //     !req.path.startsWith('/resources') &&
  //     !req.path.startsWith('/health') &&
  //     !/\.[^/]+$/.test(req.path) // Do NOT serve index.html for requests with a file extension
  //   ) {
  //     res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  //   } else {
  //     next();
  //   }
  // });
}; 