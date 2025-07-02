// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" /> 
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Agenda from './components/Agenda';
import HowItWorks from './components/HowItWorks';
import ProviderGuides from './components/ProviderGuides';
import MicroservicePatterns from './components/MicroservicePatterns';
import DevSecOps from './components/DevSecOps';
import FAQ from './components/FAQ';
import Callback from './components/Callback';
import SilentRenew from './components/SilentRenew';
import Loading from './components/Loading';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, hasRole, loading } = useAuth(); 

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Main App Component
const App = () => {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Auth />
          } />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/provider-guides" element={<ProviderGuides />} />
          <Route path="/microservice-patterns" element={<MicroservicePatterns />} />
          <Route path="/devsecops" element={<DevSecOps />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/silent-renew" element={<SilentRenew />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {isAdmin() ? <AdminDashboard /> : <UserDashboard />}
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="ADMIN">
              <Admin />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 