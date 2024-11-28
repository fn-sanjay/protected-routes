import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    // If no user is authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the passed children or the outlet for nested routes
    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
