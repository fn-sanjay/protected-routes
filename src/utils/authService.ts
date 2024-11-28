// src/utils/authService.ts

import { auth } from './firebaseConfig';  // Firebase authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Sign up function
export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User registered:', user.uid);
    return user;
  } catch (error: any) {
    console.error('Sign up error:', error.message);
    throw new Error(error.message);
  }
};

// Sign in function
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user.uid);
    return user;
  } catch (error: any) {
    console.error('Sign in error:', error.message);
    throw new Error(error.message);
  }
};

// Sign out function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error: any) {
    console.error('Logout error:', error.message);
    throw new Error(error.message);
  }
};
