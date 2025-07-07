import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-64">
          <Loading message="Checking authentication..." size="large" />
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login page with return location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access if required roles are specified
  if (requiredRoles.length > 0) {
    const userRoles = user?.roles || user?.authorities || [];
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.includes(role) || userRoles.includes(`ROLE_${role}`)
    );

    if (!hasRequiredRole) {
      return (
        <div className="page-container">
          <div className="page-header">
            <h1 className="page-title">Access Denied</h1>
            <p className="page-subtitle">
              You don't have permission to access this resource
            </p>
          </div>

          <div className="page-content">
            <section className="section">
              <div className="content-section text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🚫</div>
                  <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                  <p className="text-secondary mb-4">
                    You don't have the required permissions to access this page.
                  </p>
                  
                  <div className="bg-error-50 border border-error-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                    <h3 className="font-semibold text-error mb-2">Required Roles</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {requiredRoles.map((role, index) => (
                        <span key={index} className="bg-error-100 text-error-700 px-2 py-1 rounded text-sm">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-info-50 border border-info-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                    <h3 className="font-semibold text-info mb-2">Your Roles</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {userRoles.length > 0 ? (
                        userRoles.map((role, index) => (
                          <span key={index} className="bg-info-100 text-info-700 px-2 py-1 rounded text-sm">
                            {role.replace('ROLE_', '')}
                          </span>
                        ))
                      ) : (
                        <span className="text-secondary">No roles assigned</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => window.history.back()}
                      className="btn btn-secondary"
                    >
                      Go Back
                    </button>
                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="btn btn-primary"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <h2 className="section-title">Need Help?</h2>
                <p className="section-subtitle">
                  If you believe you should have access to this resource, contact your administrator
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="content-section text-center">
                  <div className="feature-icon mx-auto mb-3">📧</div>
                  <h3 className="font-semibold mb-2">Contact Admin</h3>
                  <p className="text-secondary text-sm">
                    Reach out to your system administrator for access requests
                  </p>
                </div>

                <div className="content-section text-center">
                  <div className="feature-icon mx-auto mb-3">📋</div>
                  <h3 className="font-semibold mb-2">Check Permissions</h3>
                  <p className="text-secondary text-sm">
                    Review your current role and permission assignments
                  </p>
                </div>

                <div className="content-section text-center">
                  <div className="feature-icon mx-auto mb-3">❓</div>
                  <h3 className="font-semibold mb-2">Help & Support</h3>
                  <p className="text-secondary text-sm">
                    Visit our help center for more information
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required roles (if any)
  return children;
};

export default PrivateRoute; 