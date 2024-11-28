import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Notification from '@/components/ui/Notification';
import { useAuth } from '../context/AuthContext'; // Importing AuthContext

const RegisterPage: React.FC = () => {
    const { register } = useAuth(); // Use the register function from AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [missingField, setMissingField] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMissingField(null);

        // Validation for missing fields
        if (!email || !password || !confirmPassword) {
            const missing = !email
                ? 'Email'
                : !password
                    ? 'Password'
                    : 'Confirm Password';
            setMissingField(missing);
            setNotification({
                message: `${missing} is required.`,
                type: 'info',
            });
            return;
        }

        // Validation for mismatched passwords
        if (password !== confirmPassword) {
            setNotification({ message: 'Passwords do not match', type: 'error' });
            return;
        }

        try {
            // Call the register function from context to handle actual registration
            await register(email, password); // Call register method from AuthContext
            setNotification({ message: 'Registration successful!', type: 'success' });

            // Clear form inputs
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
        }
    };

    const handleNotificationClose = () => {
        setNotification(null); // Close the notification
    };

    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                {/* Notification */}
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        duration={3000}
                        onClose={handleNotificationClose} // Implemented onClose
                    />
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${missingField === 'Email' ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${missingField === 'Password' ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div className="mb-6">
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${missingField === 'Confirm Password' ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <Button type="submit" variant="default" className="w-full">
                        Register
                    </Button>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
