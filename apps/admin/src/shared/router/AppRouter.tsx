import { AdminLayout } from '@shared/layout/AdminLayout';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

// Lazy-loaded route chunks — each feature is a separate bundle
const LoginPage = lazy(() =>
  import('@features/auth/components/LoginPage').then((m) => ({ default: m.LoginPage })),
);

const UsersPage = lazy(() =>
  import('@features/users/components/UsersPage').then((m) => ({ default: m.UsersPage })),
);

const DashboardPage = lazy(() =>
  import('@features/dashboard/components/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes — require auth */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
