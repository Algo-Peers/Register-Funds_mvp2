import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export interface SchoolData {
  id: string;
  totalStudents: string;
  studentsGrowth: string;
  totalTeachers: string;
  teachersGrowth: string;
  males: string;
  females: string;
  steamInvolved: string;
  steamNotInvolved: string;
  updatedAt: Date;
  userId: string;
}

export interface UseSchoolDataReturn {
  schoolData: SchoolData | null;
  loading: boolean;
  error: string | null;
  updateSchoolData: (data: Partial<SchoolData>) => Promise<SchoolData>;
  refetch: () => Promise<void>;
}

export const useSchoolData = (userId: string): UseSchoolDataReturn => {
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchoolData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const schoolDataRef = doc(db, 'schoolData', userId);
      const schoolDataDoc = await getDoc(schoolDataRef);
      
      if (schoolDataDoc.exists()) {
        const data = {
          id: schoolDataDoc.id,
          ...schoolDataDoc.data(),
          updatedAt: schoolDataDoc.data().updatedAt?.toDate() || new Date(),
        } as SchoolData;
        setSchoolData(data);
      } else {
        // Create default school data if it doesn't exist
        const defaultData = {
          id: userId,
          totalStudents: '0',
          studentsGrowth: '+0%',
          totalTeachers: '0',
          teachersGrowth: '+0%',
          males: '0',
          females: '0',
          steamInvolved: '0',
          steamNotInvolved: '0',
          userId,
          updatedAt: new Date(),
        };
        
        await setDoc(schoolDataRef, defaultData);
        setSchoolData(defaultData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch school data');
    } finally {
      setLoading(false);
    }
  };

  const updateSchoolData = async (data: Partial<SchoolData>): Promise<SchoolData> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };
      
      const schoolDataRef = doc(db, 'schoolData', userId);
      await updateDoc(schoolDataRef, updateData);
      
      const updatedDoc = await getDoc(schoolDataRef);
      const updatedData = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        updatedAt: updatedDoc.data()?.updatedAt?.toDate() || new Date(),
      } as SchoolData;
      
      setSchoolData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update school data');
      throw err;
    }
  };

  const refetch = async () => {
    await fetchSchoolData();
  };

  useEffect(() => {
    if (userId) {
      fetchSchoolData();
    }
  }, [userId]);

  return {
    schoolData,
    loading,
    error,
    updateSchoolData,
    refetch,
  };
};