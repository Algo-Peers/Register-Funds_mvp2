import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export interface SchoolProfile {
  id: string;
  schoolName: string;
  country: string;
  region: string;
  isGESListed: string;
  emisCode: string;
  schoolType: string;
  challenges: string[];
  address: string;
  city: string;
  postalCode: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  principalName: string;
  establishedYear: number;
  logoBase64?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseSchoolProfileReturn {
  profile: SchoolProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<SchoolProfile>) => Promise<SchoolProfile>;
  uploadLogo: (file: File) => Promise<string>;
  refetch: () => Promise<void>;
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const useSchoolProfile = (userId: string): UseSchoolProfileReturn => {
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const profileRef = doc(db, 'schoolProfiles', userId);
      const profileDoc = await getDoc(profileRef);
      
      if (profileDoc.exists()) {
        const data = {
          id: profileDoc.id,
          ...profileDoc.data(),
          createdAt: profileDoc.data().createdAt?.toDate() || new Date(),
          updatedAt: profileDoc.data().updatedAt?.toDate() || new Date(),
        } as SchoolProfile;
        setProfile(data);
      } else {
        // Create default profile if it doesn't exist
        const defaultProfile = {
          id: userId,
          schoolName: '',
          country: '',
          region: '',
          isGESListed: '',
          emisCode: '',
          schoolType: '',
          challenges: [],
          address: '',
          city: '',
          postalCode: '',
          contactEmail: '',
          contactPhone: '',
          website: '',
          principalName: '',
          establishedYear: new Date().getFullYear(),
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await setDoc(profileRef, defaultProfile);
        setProfile(defaultProfile);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch school profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<SchoolProfile>): Promise<SchoolProfile> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };
      
      const profileRef = doc(db, 'schoolProfiles', userId);
      await updateDoc(profileRef, updateData);
      
      const updatedDoc = await getDoc(profileRef);
      const updatedProfile = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        createdAt: updatedDoc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: updatedDoc.data()?.updatedAt?.toDate() || new Date(),
      } as SchoolProfile;
      
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update school profile');
      throw err;
    }
  };

  const uploadLogo = async (file: File): Promise<string> => {
    try {
      setError(null);
      
      const logoBase64 = await convertFileToBase64(file);
      await updateProfile({ logoBase64 });
      return logoBase64;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload logo');
      throw err;
    }
  };

  const refetch = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadLogo,
    refetch,
  };
};