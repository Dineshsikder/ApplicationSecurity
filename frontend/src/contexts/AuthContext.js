import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { authAPI } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userManager, setUserManager] = useState(null);

  // Secure token storage keys
  const TOKEN_KEYS = {
    ACCESS_TOKEN: 'oauth_access_token',
    REFRESH_TOKEN: 'oauth_refresh_token',
    ID_TOKEN: 'oauth_id_token',
    USER_DATA: 'oauth_user_data',
    TOKEN_EXPIRY: 'oauth_token_expiry'
  };

  // Secure token management functions
  const secureStorage = {
    // Store access token in sessionStorage (cleared on tab close)
    setAccessToken: (token, expiresIn = 3600) => {
      try {
        const expiryTime = Date.now() + (expiresIn * 1000);
        sessionStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
        sessionStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
        return true;
      } catch (error) {
        console.error('Error storing access token:', error);
        return false;
      }
    },

    getAccessToken: () => {
      try {
        const token = sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
        const expiry = sessionStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
        
        if (!token || !expiry) return null;
        
        // Check if token is expired (with 30-second buffer)
        if (Date.now() > (parseInt(expiry) - 30000)) {
          sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
          sessionStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY);
          return null;
        }
        
        return token;
      } catch (error) {
        console.error('Error retrieving access token:', error);
        return null;
      }
    },

    // Store refresh token in localStorage (long-lived)
    setRefreshToken: (token) => {
      try {
        localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
        return true;
      } catch (error) {
        console.error('Error storing refresh token:', error);
        return null;
      }
    },

    getRefreshToken: () => {
      try {
        return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
      } catch (error) {
        console.error('Error retrieving refresh token:', error);
        return null;
      }
    },

    // Store ID token in sessionStorage
    setIdToken: (token) => {
      try {
        sessionStorage.setItem(TOKEN_KEYS.ID_TOKEN, token);
        return true;
      } catch (error) {
        console.error('Error storing ID token:', error);
        return false;
      }
    },

    getIdToken: () => {
      try {
        return sessionStorage.getItem(TOKEN_KEYS.ID_TOKEN);
      } catch (error) {
        console.error('Error retrieving ID token:', error);
        return null;
      }
    },

    // Store user data securely
    setUserData: (userData) => {
      try {
        const sanitizedData = {
          id: userData.id,
          username: userData.username,
          role: userData.role,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          isAuthenticated: true
        };
        sessionStorage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(sanitizedData));
        return true;
      } catch (error) {
        console.error('Error storing user data:', error);
        return false;
      }
    },

    getUserData: () => {
      try {
        const data = sessionStorage.getItem(TOKEN_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
      }
    },

    // Clear all tokens and data
    clearAll: () => {
      try {
        sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(TOKEN_KEYS.ID_TOKEN);
        sessionStorage.removeItem(TOKEN_KEYS.USER_DATA);
        sessionStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY);
        localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
      } catch (error) {
        console.error('Error clearing tokens:', error);
      }
    }
  };

  useEffect(() => {
    // OAuth2/OIDC Configuration following best practices
    const config = {
      authority: 'http://localhost:9000/auth',
      client_id: 'react-client',
      redirect_uri: 'http://localhost:3000/callback',
      silent_redirect_uri: 'http://localhost:3000/silent-renew',
      post_logout_redirect_uri: 'http://localhost:3000',
      response_type: 'code', // Authorization Code flow
      scope: 'openid profile email api.read api.write',
      loadUserInfo: true,
      automaticSilentRenew: true,
      silentRequestTimeout: 10000,
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      monitorSession: true,
      checkSessionInterval: 2000,
      // PKCE configuration
      code_challenge_method: 'S256',
      // Additional security settings
      filterProtocolClaims: true,
      validateSubOnSilentRenew: true,
    };

    const manager = new UserManager(config);
    setUserManager(manager);

    // Handle user loaded
    manager.events.addUserLoaded((user) => {
      console.log('User loaded:', user);
      setUser(user);
      setLoading(false);
      setError(null);
    });

    // Handle user unloaded
    manager.events.addUserUnloaded(() => {
      console.log('User unloaded');
      setUser(null);
      setLoading(false);
      secureStorage.clearAll();
    });

    // Handle access token expired
    manager.events.addAccessTokenExpired(() => {
      console.log('Access token expired, attempting silent renewal');
      manager.signinSilent().catch((error) => {
        console.error('Silent signin failed:', error);
        setUser(null);
        setError('Session expired. Please login again.');
        secureStorage.clearAll();
      });
    });

    // Handle user signed out
    manager.events.addUserSignedOut(() => {
      console.log('User signed out');
      setUser(null);
      setLoading(false);
      secureStorage.clearAll();
    });

    // Handle silent renew error
    manager.events.addSilentRenewError((error) => {
      console.error('Silent renew error:', error);
      setError('Token renewal failed. Please login again.');
      setUser(null);
      secureStorage.clearAll();
    });

    // Check if user is already signed in
    manager.getUser().then((user) => {
      if (user && !user.expired) {
        console.log('User found in storage:', user);
        setUser(user);
        setLoading(false);
      } else {
        console.log('No valid user found');
        setLoading(false);
      }
    }).catch((error) => {
      console.error('Error getting user:', error);
      setLoading(false);
    });

  }, []);

  // OAuth2 Login - initiates Authorization Code flow with PKCE
  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      await userManager.signinRedirect();
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  // OAuth2 Logout - proper logout with token revocation
  const logout = async () => {
    try {
      setLoading(true);
      // Revoke tokens on the server
      const token = secureStorage.getAccessToken();
      if (token) {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
          });
        } catch (error) {
          console.error('Token revocation failed:', error);
        }
      }
      
      // Clear local storage
      secureStorage.clearAll();
      
      // Redirect to logout
      await userManager.signoutRedirect();
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed. Please try again.');
      setLoading(false);
    }
  };

  // Complete login after OAuth2 callback
  const completeLogin = async () => {
    try {
      setLoading(true);
      const user = await userManager.signinRedirectCallback();
      setUser(user);
      setLoading(false);
      return user;
    } catch (error) {
      console.error('Login completion error:', error);
      setError('Login completion failed. Please try again.');
      setLoading(false);
      throw error;
    }
  };

  // Complete silent token renewal
  const completeSilentRenew = async () => {
    try {
      const user = await userManager.signinSilentCallback();
      setUser(user);
      return user;
    } catch (error) {
      console.error('Silent renew completion error:', error);
      throw error;
    }
  };

  // Get current access token
  const getAccessToken = () => {
    return user?.access_token || secureStorage.getAccessToken();
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user && !user.expired;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user) return false;
    
    // Try to get role from JWT token claims first
    if (user.access_token) {
      try {
        const tokenPayload = JSON.parse(atob(user.access_token.split('.')[1]));
        const tokenRole = tokenPayload.role;
        if (tokenRole === role) return true;
      } catch (error) {
        console.error('Error parsing JWT token:', error);
      }
    }
    
    // Fallback to user profile
    if (user.profile) {
      const roles = user.profile.role || user.profile.roles || [];
      return Array.isArray(roles) ? roles.includes(role) : roles === role;
    }
    
    return false;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('ADMIN');
  };

  // Check if user is regular user
  const isUser = () => {
    return hasRole('USER');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    completeLogin,
    completeSilentRenew,
    getAccessToken,
    isAuthenticated,
    hasRole,
    isAdmin,
    isUser,
    secureStorage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 