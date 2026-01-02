import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Home, Trophy, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../common';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'TEACHER';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Shield className="navbar-logo" size={32} />
          <span className="navbar-title">CTF PLATFORM</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/scoreboard" className="navbar-link">
            <Trophy size={20} />
            <span>Scoreboard</span>
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="navbar-link">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>

              {isAdmin && (
                <Link to="/admin" className="navbar-link">
                  <Settings size={20} />
                  <span>Admin</span>
                </Link>
              )}

              <div className="navbar-user">
                <User size={20} />
                <span>{user?.teamName}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="navbar-logout"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
