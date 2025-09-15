import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  type User
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';
import type { FormData } from '../components/SignupSteps/types';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  schoolId: string;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<AuthUser>;
  register: (data: FormData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData): Promise<AuthUser> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;
      
      // Get user data from schools collection
      const schoolDoc = await getDoc(doc(db, 'schools', firebaseUser.uid));
      
      if (schoolDoc.exists()) {
        const schoolData = schoolDoc.data();
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: schoolData.name,
          role: schoolData.role,
          schoolId: firebaseUser.uid,
        } as AuthUser;
        
        setUser(userData);
        return userData;
      } else {
        throw new Error('School profile not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: FormData): Promise<AuthUser> => {
    try {
      setLoading(true);
      setError(null);
      
      // First, check if email is already registered
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
        if (signInMethods.length > 0) {
          throw new Error('An account with this email already exists. Please use a different email or try logging in.');
        }
      } catch (emailCheckError: any) {
        // If it's not a network error, re-throw
        if (emailCheckError.code !== 'auth/network-request-failed') {
          throw emailCheckError;
        }
        // Continue if it's just a network issue
      }

      let userCredential;
      let firebaseUser;
      
      try {
        userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        firebaseUser = userCredential.user;
      } catch (createError: any) {
        // Handle specific Firebase auth errors
        if (createError.code === 'auth/email-already-in-use') {
          // Try to clean up any orphaned data and retry once
          try {
            // Check if there's orphaned data in Firestore (only schools collection now)
            const existingSchoolDoc = await getDoc(doc(db, 'schools', createError.customData?.email || ''));
            
            // If documents exist but auth failed, clean them up
            if (existingSchoolDoc.exists()) {
              await deleteDoc(doc(db, 'schools', existingSchoolDoc.id));
            }
            
            // Retry account creation
            userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            firebaseUser = userCredential.user;
          } catch (retryError) {
            throw new Error('This email is already registered. Please use a different email address or try logging in.');
          }
        } else if (createError.code === 'auth/weak-password') {
          throw new Error('Password is too weak. Please choose a stronger password.');
        } else if (createError.code === 'auth/invalid-email') {
          throw new Error('Please enter a valid email address.');
        } else if (createError.code === 'auth/network-request-failed') {
          throw new Error('Network error. Please check your internet connection and try again.');
        } else {
          throw new Error(createError.message || 'Registration failed. Please try again.');
        }
      }

      // Create comprehensive school profile with user data in single 'schools' collection
      const schoolData = {
        // School Information
        schoolName: data.schoolName,
        country: data.country,
        region: data.region,
        isGESListed: data.isGESListed,
        emisCode: data.emisCode,
        schoolType: data.schoolType,
        challenges: data.challenges,
        
        // User/Contact Information (consolidated)
        contactName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        
        // User Authentication Data
        userId: firebaseUser.uid,
        name: `${data.firstName} ${data.lastName}`,
        role: 'School Administrator',
        schoolRole: 'Administrator',
        
        // Administrative Details
        principalName: `${data.firstName} ${data.lastName}`,
        contactEmail: data.email,
        contactPhone: data.phone,
        staffId: '',
        
        // Additional Fields (can be updated later)
        address: '',
        city: '',
        postalAddress: '',
        website: '',
        establishedYear: new Date().getFullYear(),
        
        // Student & Teacher Data (placeholder structure)
        students: {
          female: 0,
          male: 0,
          total: 0
        },
        teachers: {
          nonSteamInvolved: 0,
          steamInvolved: 0,
          total: 0
        },
        
        // Notification Settings
        notificationSettings: {
          email: true,
          sms: true
        },
        
        // Timestamps
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        // Save all data to single 'schools' collection only
        await setDoc(doc(db, 'schools', firebaseUser.uid), schoolData);
      } catch (firestoreError) {
        // If Firestore fails, clean up the auth user
        try {
          await firebaseUser.delete();
        } catch (deleteError) {
          console.error('Failed to clean up user after Firestore error:', deleteError);
        }
        throw new Error('Failed to save user data. Please try again.');
      }
      
      const authUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: schoolData.name,
        role: schoolData.role,
        schoolId: firebaseUser.uid,
      };
      
      setUser(authUser);
      return authUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          const schoolDoc = await getDoc(doc(db, 'schools', firebaseUser.uid));
          
          if (schoolDoc.exists()) {
            const schoolData = schoolDoc.data();
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: schoolData.name,
              role: schoolData.role,
              schoolId: firebaseUser.uid,
            } as AuthUser;
            
            setUser(userData);
          }
        } catch (err) {
          console.error('Error fetching school data:', err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              ...userDoc.data(),
            } as AuthUser;
            
            setUser(userData);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  };
};