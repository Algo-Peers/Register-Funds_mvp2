import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          ...userDoc.data(),
        } as AuthUser;
        
        setUser(userData);
        return userData;
      } else {
        throw new Error('User profile not found');
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
      
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;
      
      // Create user profile in Firestore
      const userData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        role: 'School Administrator',
        staffId: '',
        schoolRole: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      // Create school profile
      const schoolProfileData = {
        schoolName: data.schoolName,
        country: data.country,
        region: data.region,
        isGESListed: data.isGESListed,
        emisCode: data.emisCode,
        schoolType: data.schoolType,
        challenges: data.challenges,
        address: '',
        city: '',
        postalCode: '',
        contactEmail: data.email,
        contactPhone: data.phone,
        website: '',
        principalName: `${data.firstName} ${data.lastName}`,
        establishedYear: new Date().getFullYear(),
        userId: firebaseUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'schoolProfiles', firebaseUser.uid), schoolProfileData);
      
      const authUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: userData.name,
        role: userData.role,
        schoolId: firebaseUser.uid,
      };
      
      setUser(authUser);
      return authUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
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