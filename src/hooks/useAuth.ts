// src/hooks/useAuth.ts

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/context/AuthContext'; // Correct import for both context and type

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Error handling if the hook is used outside of the AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
