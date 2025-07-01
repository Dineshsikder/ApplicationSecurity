# React OIDC Frontend

A modern React application demonstrating OAuth2/OpenID Connect client implementation with secure token management and role-based access control.

## Features

### 🔐 OAuth2/OIDC Features
- **Authorization Code Flow with PKCE** - Secure authentication flow
- **Automatic Token Renewal** - Silent refresh before expiration
- **Token Storage** - Secure in-memory storage with localStorage backup
- **Session Monitoring** - Real-time session validation
- **Logout Handling** - Complete session cleanup

### 🎨 UI/UX Features
- **Modern Design** - Clean, responsive interface
- **Role-Based Navigation** - Dynamic menu based on user roles
- **Real-Time Updates** - Live token status and user information
- **Error Handling** - Graceful error display and recovery
- **Loading States** - Smooth loading indicators

### 🛡️ Security Features
- **Secure Token Storage** - In-memory with localStorage backup
- **Automatic Token Validation** - Real-time token health checks
- **CSRF Protection** - Built-in CSRF prevention
- **XSS Prevention** - Secure rendering and data handling
- **Session Management** - Proper session lifecycle management

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend services running (Auth Server, Resource Server, API Gateway)

### Installation

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start the development server:**
```bash
npm start
```

The application will start on `http://localhost:3000`

## Configuration

### OIDC Configuration

The OIDC client is configured in `src/contexts/AuthContext.js`:

```javascript
const config = {
  authority: 'http://localhost:9000/auth',
  client_id: 'react-client',
  redirect_uri: 'http://localhost:3000/callback',
  silent_redirect_uri: 'http://localhost:3000/silent-renew',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  scope: 'openid profile api.read api.write',
  loadUserInfo: true,
  automaticSilentRenew: true,
  silentRequestTimeout: 10000,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  monitorSession: true,
  checkSessionInterval: 2000,
};
```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
REACT_APP_AUTH_SERVER=http://localhost:9000/auth
REACT_APP_API_GATEWAY=http://localhost:8000
REACT_APP_CLIENT_ID=react-client
```

## Application Structure

```
src/
├── components/           # React components
│   ├── Home.js          # Landing page with login
│   ├── Profile.js       # User profile and token info
│   ├── Admin.js         # Admin-only functionality
│   ├── Navbar.js        # Navigation bar
│   ├── Callback.js      # OAuth2 callback handler
│   ├── SilentRenew.js   # Silent token renewal
│   └── Loading.js       # Loading states
├── contexts/            # React contexts
│   └── AuthContext.js   # OIDC authentication context
├── App.js              # Main application component
├── index.js            # Application entry point
└── styles/             # CSS files
```

## OIDC Implementation

### 1. Authentication Context

The `AuthContext` manages the complete OIDC lifecycle:

```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userManager, setUserManager] = useState(null);

  // OIDC configuration and event handling
  // Token management and renewal
  // Session monitoring
};
```

### 2. Login Flow

```javascript
const login = async () => {
  if (userManager) {
    try {
      await userManager.signinRedirect();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};
```

### 3. Token Management

```javascript
const getAccessToken = () => {
  return user?.access_token;
};

const isAuthenticated = () => {
  return user && !user.expired;
};
```

### 4. Automatic Token Renewal

```javascript
// Handle access token expired
manager.events.addAccessTokenExpired(() => {
  console.log('Access token expired');
  manager.signinSilent().catch((error) => {
    console.error('Silent signin failed:', error);
    setUser(null);
  });
});
```

## API Integration

### 1. Protected API Calls

```javascript
const testProtectedApi = async () => {
  if (!isAuthenticated()) {
    setApiResponse({ error: 'Not authenticated' });
    return;
  }

  try {
    const response = await fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setApiResponse(data);
  } catch (error) {
    setApiResponse({ error: 'Failed to fetch protected API' });
  }
};
```

### 2. Error Handling

```javascript
const handleApiError = (error) => {
  if (error.status === 401) {
    // Token expired, trigger renewal
    userManager.signinSilent();
  } else {
    // Handle other errors
    setError(error.message);
  }
};
```

## Security Features

### 1. Token Storage Security

- **In-Memory Storage**: Primary token storage in React state
- **localStorage Backup**: Fallback storage for page refreshes
- **Automatic Cleanup**: Tokens cleared on logout and expiration

### 2. Session Monitoring

```javascript
// Monitor session changes
manager.events.addUserLoaded((user) => {
  setUser(user);
  setLoading(false);
});

manager.events.addUserUnloaded(() => {
  setUser(null);
  setLoading(false);
});
```

### 3. CSRF Protection

- **State Parameter**: OAuth2 state parameter for CSRF protection
- **Secure Headers**: Proper Authorization headers
- **Token Validation**: Server-side token validation

### 4. XSS Prevention

- **Secure Rendering**: React's built-in XSS protection
- **Input Sanitization**: Proper data sanitization
- **Content Security Policy**: CSP headers in production

## User Interface

### 1. Home Page

The home page provides:
- **Login/Logout functionality**
- **API testing tools**
- **Security feature demonstrations**
- **Demo credentials display**

### 2. Profile Page

The profile page shows:
- **OIDC user information**
- **Token details and expiration**
- **API response testing**
- **Security feature explanations**

### 3. Admin Page

The admin page demonstrates:
- **Role-based access control**
- **Admin-only API endpoints**
- **System information display**
- **Maintenance actions**

### 4. Navigation

Dynamic navigation based on authentication status:
- **Public routes**: Always accessible
- **Protected routes**: Require authentication
- **Admin routes**: Require ADMIN role

## Testing

### 1. Manual Testing

```bash
# Start the application
npm start

# Test login flow
1. Click "Login with OAuth2"
2. Use demo credentials (user/password or admin/admin)
3. Verify successful authentication
4. Test protected endpoints
5. Test logout functionality
```

### 2. API Testing

The application includes built-in API testing tools:
- **Public API Test**: Test unauthenticated endpoints
- **Protected API Test**: Test authenticated endpoints
- **Token Validation**: Verify token integrity
- **Admin Functions**: Test role-based access

### 3. Browser Developer Tools

Monitor OIDC flow in browser:
```javascript
// Check authentication state
console.log(window.oidc.userManager.getUser());

// Monitor token expiration
console.log(window.oidc.userManager.events);
```

## Error Handling

### 1. Authentication Errors

```javascript
try {
  await userManager.signinRedirect();
} catch (error) {
  console.error('Login error:', error);
  // Handle specific error types
  if (error.error === 'login_required') {
    // Redirect to login
  } else if (error.error === 'consent_required') {
    // Handle consent required
  }
}
```

### 2. Token Renewal Errors

```javascript
manager.events.addAccessTokenExpired(() => {
  manager.signinSilent().catch((error) => {
    console.error('Silent signin failed:', error);
    // Redirect to login page
    setUser(null);
  });
});
```

### 3. Network Errors

```javascript
const handleNetworkError = (error) => {
  if (error.name === 'NetworkError') {
    // Handle network connectivity issues
    setError('Network error. Please check your connection.');
  }
};
```

## Production Deployment

### 1. Environment Configuration

```bash
# Production environment variables
REACT_APP_AUTH_SERVER=https://auth.yourdomain.com
REACT_APP_API_GATEWAY=https://api.yourdomain.com
REACT_APP_CLIENT_ID=your-production-client-id
```

### 2. Security Headers

Add security headers in production:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```

### 3. Build and Deploy

```bash
# Build for production
npm run build

# Deploy to your hosting platform
# (Netlify, Vercel, AWS S3, etc.)
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS configuration includes frontend origin
   - Check API Gateway CORS settings

2. **Token Expiration**
   - Verify automatic token renewal is working
   - Check silent renewal configuration

3. **Login Redirect Issues**
   - Verify redirect URI configuration
   - Check OIDC client settings

4. **API Call Failures**
   - Ensure proper Authorization headers
   - Verify token is not expired
   - Check API Gateway routing

### Debug Mode

Enable debug logging:
```javascript
// In AuthContext.js
const config = {
  // ... other config
  logger: console, // Enable debug logging
};
```

## Best Practices

### 1. Security
- **Never store tokens in localStorage** (use in-memory storage)
- **Implement proper error handling** for all OIDC operations
- **Use HTTPS in production** for all communications
- **Validate tokens on the server side**

### 2. User Experience
- **Provide clear loading states** during authentication
- **Handle errors gracefully** with user-friendly messages
- **Implement automatic token renewal** for seamless experience
- **Show authentication status** clearly to users

### 3. Performance
- **Lazy load components** for better performance
- **Implement proper caching** for user data
- **Optimize bundle size** for faster loading
- **Use React.memo** for expensive components

## Contributing

This is a demo application for educational purposes. For production use, consider:

- Using established OIDC libraries (Auth0, Okta, etc.)
- Implementing comprehensive error handling
- Adding proper logging and monitoring
- Setting up automated testing
- Implementing proper CI/CD pipelines

## Resources

### Documentation
- [OIDC Client TS Documentation](https://github.com/authts/oidc-client-ts)
- [React Router Documentation](https://reactrouter.com/)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)

### Tools
- [OIDC Debugger](https://oidcdebugger.com/)
- [JWT Debugger](https://jwt.io/)
- [OAuth 2.0 Playground](https://oauth2.thephpleague.com/playground/) 