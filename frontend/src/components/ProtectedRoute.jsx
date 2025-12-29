import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * Protected Route component that checks authentication and roles
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0) {
        const hasRequiredRole = user?.roles?.some((role) => allowedRoles.includes(role));

        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
