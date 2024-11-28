import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Notification from '../components/ui/Notification';
import { useAuth } from '../context/AuthContext'; // Import the auth context

const LoginPage: React.FC = () => {
    const { login } = useAuth(); // Use the login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
    } | null>(null);
    const [missingField, setMissingField] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMissingField(null);

        // Validation
        if (!email || !password) {
            const missing = !email ? 'Email' : 'Password';
            setMissingField(missing);
            setNotification({
                message: `${missing} is required.`,
                type: 'info',
            });
            return;
        }

        // Try to log in using the login function from context
        try {
            await login(email, password); // Use the login method from AuthContext
            setNotification({
                message: 'Login successful!',
                type: 'success',
            });
            setEmail('');
            setPassword('');
        } catch (error) {
            setNotification({
                message: 'Invalid login credentials.',
                type: 'error',
            });
        }
    };

    const handleNotificationClose = () => {
        setNotification(null); // Close the notification
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={handleNotificationClose} // Implemented onClose
                />
            )}

            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${missingField === 'Email' ? 'border-red-500' : ''}`}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${missingField === 'Password' ? 'border-red-500' : ''}`}
                    />
                </div>

                <Button type="submit" variant="default">
                    Login
                </Button>
            </form>

            <p className="mt-4 text-center">
                Don’t have an account?{' '}
                <a href="/register" className="text-blue-500">
                    Register here
                </a>
            </p>
        </div>
    );
};

export default LoginPage;
