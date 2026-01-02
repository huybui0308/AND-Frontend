import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../common';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'TEACHER' | 'TEAM';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole) {
    const hasAccess =
      user?.role === 'ADMIN' ||
      (requiredRole === 'TEACHER' && user?.role === 'TEACHER') ||
      (requiredRole === 'TEAM' && user?.role === 'TEAM');

    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};
