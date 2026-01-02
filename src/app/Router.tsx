import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth';

// Public Pages
import { LoginPage, SignupPage, ScoreboardPage } from '../pages/public';

// Team Pages
import { DashboardPage } from '../pages/team';

// Admin Pages
import {
  AdminDashboardPage,
  TeamsManagementPage,
  CreateTeamPage,
  ImportTeamsPage,
  GameControlPage,
  UploadFilesPage,
} from '../pages/admin';

// Error Pages
import { NotFoundPage, UnauthorizedPage } from '../pages/error';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />

        {/* Protected Routes - Team */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Admin/Teacher */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <TeamsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams/new"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <CreateTeamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams/import"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <ImportTeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/game"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <GameControlPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <UploadFilesPage />
            </ProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/scoreboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
