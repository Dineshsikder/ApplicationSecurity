import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, login, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    closeMenu();
  };

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home', tooltip: 'Home' },
    { path: '/agenda', icon: '📋', label: 'Agenda', tooltip: 'Presentation Agenda' },
    { path: '/how-it-works', icon: '❓', label: 'How It Works', tooltip: 'How OAuth2 Works' },
    { path: '/provider-guides', icon: '📚', label: 'Provider Guides', tooltip: 'OAuth Provider Guides' },
    { path: '/microservice-patterns', icon: '🔗', label: 'Microservice Patterns', tooltip: 'Microservice Patterns' },
    { path: '/devsecops', icon: '🔒', label: 'DevSecOps', tooltip: 'DevOps & DevSecOps' },
    { path: '/faq', icon: '💡', label: 'FAQ', tooltip: 'Interview Q&A' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="navbar-logo">
            <span>🔐</span>
          </div>
          <span>OAuth2 Demo</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span>☰</span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.path} className="navbar-item">
                <Link 
                  to={item.path} 
                  className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={closeMenu}
                  title={item.tooltip}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
            
            {isAuthenticated() && (
              <>
                <li className="navbar-item">
                  <Link 
                    to="/dashboard" 
                    className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                    onClick={closeMenu}
                    title="Dashboard"
                  >
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Dashboard</span>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link 
                    to="/profile" 
                    className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
                    onClick={closeMenu}
                    title="User Profile"
                  >
                    <span className="nav-icon">👤</span>
                    <span className="nav-label">Profile</span>
                  </Link>
                </li>
                {isAdmin() && (
                  <li className="navbar-item">
                    <Link 
                      to="/admin" 
                      className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
                      onClick={closeMenu}
                      title="Admin Panel"
                    >
                      <span className="nav-icon">⚙️</span>
                      <span className="nav-label">Admin</span>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="navbar-user">
            {isAuthenticated() ? (
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.firstName?.charAt(0) || user?.profile?.sub?.charAt(0) || 'U'}
                  </div>
                  <div className="user-details">
                    <span className="user-name">
                      {user?.firstName || user?.profile?.sub || 'User'}
                    </span>
                    {/* <span className="user-role">
                      {user?.role || 'USER'}
                    </span> */}
                  </div>
                </div>
                <button onClick={handleLogout} className="navbar-button" title="Logout">
                  <span className="button-icon">🚪</span>
                  <span className="button-text">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="navbar-button" title="Login">
                <span className="button-icon">🔑</span>
                <span className="button-text">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 