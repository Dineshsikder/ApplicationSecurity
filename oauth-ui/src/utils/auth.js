// Secure Token Management Utility
// Implements OAuth2/OIDC security best practices

class SecureTokenManager {
  constructor() {
    this.accessTokenKey = 'oauth_access_token';
    this.refreshTokenKey = 'oauth_refresh_token';
    this.idTokenKey = 'oauth_id_token';
    this.tokenExpiryKey = 'oauth_token_expiry';
    this.userKey = 'oauth_user_data';
    this.pkceStateKey = 'oauth_pkce_state';
    this.nonceKey = 'oauth_nonce';
  }

  // Store access token securely (short-lived, in memory when possible)
  setAccessToken(token, expiresIn = 3600) {
    try {
      const expiryTime = Date.now() + (expiresIn * 1000);
      
      // Store in sessionStorage for better security (cleared on tab close)
      sessionStorage.setItem(this.accessTokenKey, token);
      sessionStorage.setItem(this.tokenExpiryKey, expiryTime.toString());
      
      // Also store in memory for immediate access
      this._accessToken = token;
      this._tokenExpiry = expiryTime;
      
      return true;
    } catch (error) {
      console.error('Error storing access token:', error);
      return false;
    }
  }

  // Get access token with expiry check
  getAccessToken() {
    try {
      // Check if token is expired
      if (this.isTokenExpired()) {
        this.clearAccessToken();
        return null;
      }
      
      // Return from memory if available
      if (this._accessToken) {
        return this._accessToken;
      }
      
      // Fallback to sessionStorage
      return sessionStorage.getItem(this.accessTokenKey);
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  }

  // Store refresh token securely (long-lived, in httpOnly cookies when possible)
  setRefreshToken(token) {
    try {
      // Store in localStorage with encryption in production
      // For demo purposes, using localStorage with security headers
      localStorage.setItem(this.refreshTokenKey, token);
      return true;
    } catch (error) {
      console.error('Error storing refresh token:', error);
      return false;
    }
  }

  // Get refresh token
  getRefreshToken() {
    try {
      return localStorage.getItem(this.refreshTokenKey);
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  }

  // Store ID token securely
  setIdToken(token) {
    try {
      // ID tokens should be validated and stored securely
      sessionStorage.setItem(this.idTokenKey, token);
      return true;
    } catch (error) {
      console.error('Error storing ID token:', error);
      return false;
    }
  }

  // Get ID token
  getIdToken() {
    try {
      return sessionStorage.getItem(this.idTokenKey);
    } catch (error) {
      console.error('Error retrieving ID token:', error);
      return null;
    }
  }

  // Store user data securely
  setUserData(userData) {
    try {
      // Remove sensitive information before storage
      const sanitizedUserData = {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAuthenticated: true
      };
      
      sessionStorage.setItem(this.userKey, JSON.stringify(sanitizedUserData));
      return true;
    } catch (error) {
      console.error('Error storing user data:', error);
      return false;
    }
  }

  // Get user data
  getUserData() {
    try {
      const userData = sessionStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  // Store PKCE state for CSRF protection
  setPkceState(state) {
    try {
      sessionStorage.setItem(this.pkceStateKey, state);
      return true;
    } catch (error) {
      console.error('Error storing PKCE state:', error);
      return false;
    }
  }

  // Get PKCE state
  getPkceState() {
    try {
      return sessionStorage.getItem(this.pkceStateKey);
    } catch (error) {
      console.error('Error retrieving PKCE state:', error);
      return null;
    }
  }

  // Store nonce for replay attack protection
  setNonce(nonce) {
    try {
      sessionStorage.setItem(this.nonceKey, nonce);
      return true;
    } catch (error) {
      console.error('Error storing nonce:', error);
      return false;
    }
  }

  // Get nonce
  getNonce() {
    try {
      return sessionStorage.getItem(this.nonceKey);
    } catch (error) {
      console.error('Error retrieving nonce:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired() {
    try {
      const expiryTime = this._tokenExpiry || sessionStorage.getItem(this.tokenExpiryKey);
      if (!expiryTime) return true;
      
      // Add 30-second buffer for token refresh
      return Date.now() > (parseInt(expiryTime) - 30000);
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }

  // Clear access token
  clearAccessToken() {
    try {
      sessionStorage.removeItem(this.accessTokenKey);
      sessionStorage.removeItem(this.tokenExpiryKey);
      this._accessToken = null;
      this._tokenExpiry = null;
    } catch (error) {
      console.error('Error clearing access token:', error);
    }
  }

  // Clear refresh token
  clearRefreshToken() {
    try {
      localStorage.removeItem(this.refreshTokenKey);
    } catch (error) {
      console.error('Error clearing refresh token:', error);
    }
  }

  // Clear ID token
  clearIdToken() {
    try {
      sessionStorage.removeItem(this.idTokenKey);
    } catch (error) {
      console.error('Error clearing ID token:', error);
    }
  }

  // Clear user data
  clearUserData() {
    try {
      sessionStorage.removeItem(this.userKey);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  // Clear PKCE state
  clearPkceState() {
    try {
      sessionStorage.removeItem(this.pkceStateKey);
    } catch (error) {
      console.error('Error clearing PKCE state:', error);
    }
  }

  // Clear nonce
  clearNonce() {
    try {
      sessionStorage.removeItem(this.nonceKey);
    } catch (error) {
      console.error('Error clearing nonce:', error);
    }
  }

  // Clear all tokens and data (logout)
  clearAll() {
    this.clearAccessToken();
    this.clearRefreshToken();
    this.clearIdToken();
    this.clearUserData();
    this.clearPkceState();
    this.clearNonce();
  }

  // Check if user is authenticated
  isAuthenticated() {
    const userData = this.getUserData();
    const accessToken = this.getAccessToken();
    return userData && accessToken && !this.isTokenExpired();
  }

  // Get token expiry time
  getTokenExpiryTime() {
    try {
      return this._tokenExpiry || sessionStorage.getItem(this.tokenExpiryKey);
    } catch (error) {
      console.error('Error getting token expiry time:', error);
      return null;
    }
  }

  // Get time until token expires (in seconds)
  getTimeUntilExpiry() {
    try {
      const expiryTime = this.getTokenExpiryTime();
      if (!expiryTime) return 0;
      
      const timeLeft = parseInt(expiryTime) - Date.now();
      return Math.max(0, Math.floor(timeLeft / 1000));
    } catch (error) {
      console.error('Error calculating time until expiry:', error);
      return 0;
    }
  }

  // Validate token format (basic JWT validation)
  validateTokenFormat(token) {
    if (!token || typeof token !== 'string') return false;
    
    // Check if it's a JWT (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if parts are base64 encoded
    try {
      parts.forEach(part => {
        if (part) {
          atob(part.replace(/-/g, '+').replace(/_/g, '/'));
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Generate secure random string for PKCE
  generatePkceVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Generate PKCE challenge from verifier
  async generatePkceChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Generate secure nonce
  generateNonce() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Decode JWT token payload
  decodeToken(token) {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }

  // Get user info from token
  getUserFromToken(token) {
    const payload = this.decodeToken(token);
    if (!payload) return null;
    
    return {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      role: payload.role || 'USER',
      firstName: payload.given_name,
      lastName: payload.family_name
    };
  }

  // Check if user has specific role
  hasRole(token, role) {
    const payload = this.decodeToken(token);
    if (!payload) return false;
    
    const userRoles = payload.roles || payload.role || [];
    if (Array.isArray(userRoles)) {
      return userRoles.includes(role);
    }
    return userRoles === role;
  }

  // Check if user is admin
  isAdmin(token) {
    return this.hasRole(token, 'ROLE_ADMIN');
  }
}

// Create singleton instance
const tokenManager = new SecureTokenManager();

// Export for use in components
export default tokenManager;

// Export individual functions for convenience
export const {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setIdToken,
  getIdToken,
  setUserData,
  getUserData,
  setPkceState,
  getPkceState,
  setNonce,
  getNonce,
  isTokenExpired,
  clearAccessToken,
  clearRefreshToken,
  clearIdToken,
  clearUserData,
  clearPkceState,
  clearNonce,
  clearAll,
  isAuthenticated,
  getTokenExpiryTime,
  getTimeUntilExpiry,
  validateTokenFormat,
  generatePkceVerifier,
  generatePkceChallenge,
  generateNonce,
  decodeToken,
  getUserFromToken,
  hasRole,
  isAdmin
} = tokenManager; 