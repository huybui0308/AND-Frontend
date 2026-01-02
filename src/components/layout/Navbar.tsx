import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Home, Trophy, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '@/components/ui/button';
import { DemoModeBanner } from './DemoModeBanner';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'TEACHER';

  return (
    <>
      <nav className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">CTF PLATFORM</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/scoreboard"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors:text-primary"
            >
              <Trophy size={20} />
              <span>Scoreboard</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors:text-primary"
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors:text-primary"
                  >
                    <Settings size={20} />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                  <User size={16} className="text-muted-foreground" />
                  <span className="font-medium">{user?.teamName}</span>
                </div>

                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </Button>
              </>
            )}

            {!isAuthenticated && (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      {isAuthenticated && (
        <div className="container mx-auto px-4 pt-4">
          <DemoModeBanner />
        </div>
      )}
    </>
  );
};
