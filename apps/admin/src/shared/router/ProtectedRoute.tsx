import { useAuthStore } from '@features/auth/store/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


/**
 * Guards all child routes. If the user is not authenticated,
 * they are redirected to /login with the attempted URL preserved
 * so we can redirect back after successful login.
 */
export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
