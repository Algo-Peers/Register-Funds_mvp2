import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
  addressLine1: string;
  addressLine2: string;
  digitalAddress: string;
  townCity: string;
  districtRegion: string;
  contactEmail: string;
  contactPhone: string;
  postalAddress: string;
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
  refetch: () => Promise<void>;
}

export const useSchoolProfile = (userId: string): UseSchoolProfileReturn => {
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from the main 'schools' collection
      const schoolRef = doc(db, 'schools', userId);
      const schoolDoc = await getDoc(schoolRef);
      
      if (schoolDoc.exists()) {
        const schoolData = schoolDoc.data();
        const data = {
          id: schoolDoc.id,
          // Map existing fields from schools collection
          schoolName: schoolData.schoolName || '',
          country: schoolData.country || '',
          region: schoolData.region || '',
          isGESListed: schoolData.isGESListed || '',
          emisCode: schoolData.emisCode || '',
          schoolType: schoolData.schoolType || '',
          challenges: schoolData.challenges || [],
          // Original address fields
          address: schoolData.address || '',
          city: schoolData.city || '',
          postalCode: schoolData.postalCode || '',
          // New address fields
          addressLine1: schoolData.addressLine1 || '',
          addressLine2: schoolData.addressLine2 || '',
          digitalAddress: schoolData.digitalAddress || '',
          townCity: schoolData.townCity || '',
          districtRegion: schoolData.districtRegion || '',
          // Contact fields
          contactEmail: schoolData.contactEmail || schoolData.email || '',
          contactPhone: schoolData.contactPhone || schoolData.phone || '',
          postalAddress: schoolData.postalAddress || '',
          principalName: schoolData.principalName || schoolData.contactName || '',
          establishedYear: schoolData.establishedYear || new Date().getFullYear(),
          userId,
          createdAt: schoolData.createdAt ? new Date(schoolData.createdAt) : new Date(),
          updatedAt: schoolData.updatedAt ? new Date(schoolData.updatedAt) : new Date(),
        } as SchoolProfile;
        setProfile(data);
      } else {
        setError('School profile not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch school profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<SchoolProfile>): Promise<SchoolProfile> => {
    try {
      if (!profile) throw new Error('No profile to update');
      
      const schoolRef = doc(db, 'schools', userId);
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      await updateDoc(schoolRef, updateData);
      
      const updatedProfile = { ...profile, ...data, updatedAt: new Date() };
      setProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
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
    refetch,
  };
};