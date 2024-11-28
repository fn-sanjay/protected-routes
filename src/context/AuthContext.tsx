// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../utils/firebaseConfig'; // Firebase auth
import { onAuthStateChanged, User } from 'firebase/auth'; // Firebase listener for auth state
import * as authService from '../utils/authService'; // Import authService methods
import { useNavigate } from 'react-router-dom'; // For navigation after login

// Defining the context type with user as User or null and loading status
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

// Creating the context with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props interface for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component that manages authentication state
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to track user
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate(); // Navigate for page redirection

  // Listen for auth state changes (when the user logs in/out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
      } else {
        setUser(null); // Set user to null when not authenticated
      }
      setLoading(false); // Stop loading once the authentication state is checked
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  // Login function for handling user login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.signInUser(email, password); // Call the authService to sign in
      setUser(user); // Set the user on successful login
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Register function for handling new user registration
  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.signUpUser(email, password); // Call the authService to sign up
      setUser(user); // Set the user on successful registration
      navigate('/dashboard'); // Redirect to the dashboard after registration
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function to log the user out
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logoutUser(); // Call the authService to log out
      setUser(null); // Clear user state after logout
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
