import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth(); // Get user and loading state from context

    // While loading, display a loading spinner or placeholder
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            {/* Redirect to dashboard if logged in, otherwise to login */}
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />

            {/* Public Routes */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

            {/* Protected Route for Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            {/* Add other protected or public routes as needed */}
        </Routes>
    );
};

export default AppRoutes;
