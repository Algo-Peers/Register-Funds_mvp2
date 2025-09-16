import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export interface SchoolData {
  id: string;
  schoolName: string;
  city: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
  postalAddress: string;
  schoolType: string;
  challenges: string[];
  students: {
    male: number;
    female: number;
    total: number;
  };
  teachers: {
    steamInvolved: number;
    nonSteamInvolved: number;
    total: number;
  };
  notificationSettings: {
    email: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SchoolDataHistory {
  id?: string;
  schoolId: string;
  students: {
    male: number;
    female: number;
    total: number;
  };
  teachers: {
    steamInvolved: number;
    nonSteamInvolved: number;
    total: number;
  };
  month: number;
  year: number;
  createdAt: string;
}

export interface GrowthStats {
  studentsGrowth: string;
  teachersGrowth: string;
  studentsGrowthPercent: number;
  teachersGrowthPercent: number;
}

export interface UseSchoolDataReturn {
  schoolData: SchoolData | null;
  loading: boolean;
  error: string | null;
  growthStats: GrowthStats;
  updateSchoolData: (data: Partial<SchoolData>) => Promise<SchoolData>;
  refetch: () => Promise<void>;
}

export const useSchoolData = (userId: string): UseSchoolDataReturn => {
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [growthStats, setGrowthStats] = useState<GrowthStats>({
    studentsGrowth: '↑ 0% vs last month',
    teachersGrowth: '↑ 0% vs last month',
    studentsGrowthPercent: 0,
    teachersGrowthPercent: 0,
  });

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
        
        // Fetch growth statistics
        await calculateGrowthStats(userId, data);
      } else {
        // Create default school data if it doesn't exist
        const defaultData: Partial<SchoolData> = {
          id: userId,
          schoolName: '',
          city: '',
          country: '',
          contactName: '',
          email: '',
          phone: '',
          postalAddress: '',
          schoolType: '',
          challenges: [],
          students: {
            male: 0,
            female: 0,
            total: 0
          },
          teachers: {
            steamInvolved: 0,
            nonSteamInvolved: 0,
            total: 0
          },
          notificationSettings: {
            email: true,
            sms: true
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        await setDoc(schoolDataRef, defaultData);
        setSchoolData(defaultData as SchoolData);
        
        // Initialize growth stats for new data
        setGrowthStats({
          studentsGrowth: '↑ 0% vs last month',
          teachersGrowth: '↑ 0% vs last month',
          studentsGrowthPercent: 0,
          teachersGrowthPercent: 0,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch school data');
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowthStats = async (schoolId: string, currentData: SchoolData) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      // Query for last month's data
      const historyRef = collection(db, 'schoolDataHistory');
      const lastMonthQuery = query(
        historyRef,
        where('schoolId', '==', schoolId),
        where('month', '==', lastMonth),
        where('year', '==', lastMonthYear),
        orderBy('createdAt', 'desc'),
        limit(1)
      );

      const lastMonthSnapshot = await getDocs(lastMonthQuery);
      
      if (!lastMonthSnapshot.empty) {
        const lastMonthData = lastMonthSnapshot.docs[0].data() as SchoolDataHistory;
        
        // Calculate growth percentages
        const studentsGrowthPercent = calculatePercentageChange(
          currentData.students.total,
          lastMonthData.students.total
        );
        
        const teachersGrowthPercent = calculatePercentageChange(
          currentData.teachers.total,
          lastMonthData.teachers.total
        );

        setGrowthStats({
          studentsGrowth: formatGrowthString(studentsGrowthPercent),
          teachersGrowth: formatGrowthString(teachersGrowthPercent),
          studentsGrowthPercent,
          teachersGrowthPercent,
        });
      } else {
        // No historical data available
        setGrowthStats({
          studentsGrowth: 'No previous data',
          teachersGrowth: 'No previous data',
          studentsGrowthPercent: 0,
          teachersGrowthPercent: 0,
        });
      }
    } catch (err) {
      console.error('Error calculating growth stats:', err);
      setGrowthStats({
        studentsGrowth: 'Error calculating',
        teachersGrowth: 'Error calculating',
        studentsGrowthPercent: 0,
        teachersGrowthPercent: 0,
      });
    }
  };

  const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const formatGrowthString = (percentage: number): string => {
    if (percentage === 0) return '→ 0% vs last month';
    const direction = percentage > 0 ? '↑' : '↓';
    return `${direction} ${Math.abs(percentage)}% vs last month`;
  };

  const saveHistoricalData = async (schoolId: string, data: SchoolData) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Check if we already have data for this month
      const historyRef = collection(db, 'schoolDataHistory');
      const existingQuery = query(
        historyRef,
        where('schoolId', '==', schoolId),
        where('month', '==', currentMonth),
        where('year', '==', currentYear),
        limit(1)
      );

      const existingSnapshot = await getDocs(existingQuery);
      
      if (existingSnapshot.empty) {
        // Save new historical record
        const historyData: SchoolDataHistory = {
          schoolId,
          students: data.students,
          teachers: data.teachers,
          month: currentMonth,
          year: currentYear,
          createdAt: new Date().toISOString(),
        };

        await addDoc(historyRef, historyData);
      }
    } catch (err) {
      console.error('Error saving historical data:', err);
    }
  };

  const updateSchoolData = async (data: Partial<SchoolData>): Promise<SchoolData> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
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
      
      // Save historical data when significant changes occur
      if (data.students || data.teachers) {
        await saveHistoricalData(userId, updatedData);
        await calculateGrowthStats(userId, updatedData);
      }
      
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
    growthStats,
    updateSchoolData,
    refetch,
  };
};