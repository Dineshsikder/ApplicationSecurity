import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, login, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleMouseEnter = (itemPath) => {
    setActiveHover(itemPath);
  };

  const handleMouseLeave = () => {
    setActiveHover(null);
  };

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/agenda', icon: '📋', label: 'Agenda' },
    { path: '/how-it-works', icon: '❓', label: 'How It Works' },
    { path: '/fundamentals', icon: '🔐', label: 'OAuth Fundamentals' },
    { path: '/provider-guides', icon: '📚', label: 'Provider Guides' },
    { path: '/microservice-patterns', icon: '🔗', label: 'Microservice Patterns' },
    { path: '/devsecops', icon: '🔒', label: 'DevSecOps' },
    { path: '/faq', icon: '💡', label: 'FAQ' }
  ];

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="navbar-logo">
            <span role="img" aria-label="logo">🔐</span>
          </div>
          <span className="sr-only">OAuth2 Demo</span>
        </Link>
        <div className="navbar-links-wrapper">
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <li 
                key={item.path} 
                className="navbar-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link 
                  to={item.path} 
                  className={`navbar-link ${isActive(item.path) ? 'active' : ''} ${activeHover === item.path ? 'hovering' : ''}`}
                  onClick={closeMenu}
                  onMouseEnter={() => handleMouseEnter(item.path)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={0}
                  aria-label={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-tooltip">{item.label}</span>
                  <div className="nav-ripple"></div>
                </Link>
              </li>
            ))}
            
            {isAuthenticated() && (
              <>
                <li className="navbar-item">
                  <Link 
                    to="/dashboard" 
                    className={`navbar-link ${isActive('/dashboard') ? 'active' : ''} ${activeHover === '/dashboard' ? 'hovering' : ''}`}
                    onClick={closeMenu}
                    onMouseEnter={() => handleMouseEnter('/dashboard')}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    aria-label="Dashboard"
                  >
                    <span className="nav-icon">📊</span>
                    <span className="nav-tooltip">Dashboard</span>
                    <div className="nav-ripple"></div>
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link 
                    to="/profile" 
                    className={`navbar-link ${isActive('/profile') ? 'active' : ''} ${activeHover === '/profile' ? 'hovering' : ''}`}
                    onClick={closeMenu}
                    onMouseEnter={() => handleMouseEnter('/profile')}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    aria-label="Profile"
                  >
                    <span className="nav-icon">👤</span>
                    <span className="nav-tooltip">Profile</span>
                    <div className="nav-ripple"></div>
                  </Link>
                </li>
                {isAdmin() && (
                  <li className="navbar-item">
                    <Link 
                      to="/admin" 
                      className={`navbar-link ${isActive('/admin') ? 'active' : ''} ${activeHover === '/admin' ? 'hovering' : ''}`}
                      onClick={closeMenu}
                      onMouseEnter={() => handleMouseEnter('/admin')}
                      onMouseLeave={handleMouseLeave}
                      tabIndex={0}
                      aria-label="Admin"
                    >
                      <span className="nav-icon">⚙️</span>
                      <span className="nav-tooltip">Admin</span>
                      <div className="nav-ripple"></div>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
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
                </div>
              </div>
              <button onClick={handleLogout} className="navbar-button" aria-label="Logout">
                <span className="button-icon">🚪</span>
                <span className="nav-tooltip">Logout</span>
                <div className="button-ripple"></div>
              </button>
            </div>
          ) : (
            <Link to="/auth" className="navbar-button" aria-label="Login">
              <span className="button-icon">🔑</span>
              <span className="nav-tooltip">Login</span>
              <div className="button-ripple"></div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 