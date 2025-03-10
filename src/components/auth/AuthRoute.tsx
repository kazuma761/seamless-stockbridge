
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

type AuthRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireInventoryManager?: boolean;
};

const AuthRoute = ({ 
  children, 
  requireAdmin = false, 
  requireInventoryManager = false 
}: AuthRouteProps) => {
  const { user, isLoading, isAdmin, isInventoryManager } = useAuth();

  if (isLoading) {
    // Show a loading spinner or skeleton while checking auth status
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect if admin access is required but user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  if (requireInventoryManager && !(isInventoryManager || isAdmin)) {
    // Redirect if inventory manager access is required but user is neither inventory manager nor admin
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
