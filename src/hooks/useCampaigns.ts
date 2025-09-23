import { useState, useEffect } from 'react';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/Firebase';
import type { CampaignData } from '../components/CreateCampaign/types';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  category: string;
  donationTarget: number;
  amountRaised: number;
  goal: number;
  status: 'active' | 'draft' | 'completed';
  schoolId: string;
  mediaUrl: string;
  additionalImages: string[];
  currency: string;
  location: {
    city: string;
    country: string;
    fullLocation?: string; // For backward compatibility
  };
  schoolName?: string;
  createdAt: Date;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface UseCampaignsReturn {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  createCampaign: (data: CampaignData) => Promise<Campaign>;
  updateCampaign: (id: string, data: Partial<CampaignData>) => Promise<Campaign>;
  deleteCampaign: (id: string) => Promise<void>;
  getCampaignById: (id: string) => Promise<Campaign | null>;
  refetch: () => void;
}

export const useCampaigns = (userId?: string): UseCampaignsReturn => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schoolsCache, setSchoolsCache] = useState<Map<string, any>>(new Map());

  // Function to fetch school data for a campaign
  const fetchSchoolData = async (schoolId: string) => {
    if (schoolsCache.has(schoolId)) {
      return schoolsCache.get(schoolId);
    }

    try {
      const schoolRef = doc(db, 'schools', schoolId);
      const schoolDoc = await getDoc(schoolRef);
      
      if (schoolDoc.exists()) {
        const schoolData = schoolDoc.data();
        setSchoolsCache(prev => new Map(prev.set(schoolId, schoolData)));
        return schoolData;
      }
    } catch (err) {
      console.error('Error fetching school data:', err);
    }
    return null;
  };

  // Real-time data fetching with onSnapshot
  useEffect(() => {
    const campaignsRef = collection(db, 'campaigns');
    let q;
    
    if (userId) {
      // Use only where clause to avoid composite index requirement
      q = query(campaignsRef, where('schoolId', '==', userId));
    } else {
      // For all campaigns, just order by createdAt
      q = query(campaignsRef, orderBy('createdAt', 'desc'));
    }
    
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const campaignsData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data();
              
              // Fetch school data for location information
              const schoolData = data.schoolId ? await fetchSchoolData(data.schoolId) : null;
              
              return {
                id: doc.id,
                name: data.name || data.title || '',
                description: data.description || '',
                category: data.category || '',
                donationTarget: Number(data.donationTarget || 0),
                amountRaised: Number(data.amountRaised || 0),
                goal: Number(data.goal || data.donationTarget || 0),
                status: data.status || 'active',
                schoolId: data.schoolId || '',
                mediaUrl: data.mediaUrl || data.image || '',
                additionalImages: data.additionalImages || [],
                currency: data.currency || 'USD',
                location: {
                  city: schoolData?.city || data.location?.city || 'Unknown City',
                  country: schoolData?.country || data.location?.country || 'Unknown Country',
                  fullLocation: schoolData ? `${schoolData.city}, ${schoolData.country}` : (data.location || 'Unknown Location')
                },
                schoolName: schoolData?.schoolName || '',
                featured: data.featured || false,
                startDate: data.startDate || new Date().toISOString(),
                endDate: data.endDate || new Date().toISOString(),
                createdAt: data.createdAt?.toDate?.() || new Date(),
              } as Campaign;
            })
          );
          
          // Sort campaigns by createdAt in JavaScript after fetching
          const sortedCampaigns = campaignsData.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          setCampaigns(sortedCampaigns);
          setLoading(false);
          setError(null);
        } catch (err) {
          console.error('Error processing campaign data:', err);
          setError('Failed to process campaign data');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error listening to campaigns:', err);
        setError('Failed to load campaign data');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const createCampaign = async (data: CampaignData): Promise<Campaign> => {
    try {
      setError(null);
      
      // Fetch school data for location information
      const schoolData = userId ? await fetchSchoolData(userId) : null;
      
      const campaignData = {
        name: data.title,
        description: data.description,
        category: data.category || 'education',
        donationTarget: data.donationTarget,
        amountRaised: 0,
        goal: data.donationTarget,
        status: 'draft' as const,
        schoolId: userId || '',
        mediaUrl: '',
        additionalImages: [],
        currency: 'USD',
        location: {
          city: schoolData?.city || data.location || 'Unknown City',
          country: schoolData?.country || 'Unknown Country',
          fullLocation: schoolData ? `${schoolData.city}, ${schoolData.country}` : (data.location || 'Unknown Location')
        },
        featured: false,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(),
      };
      
      const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
      const newCampaign = { id: docRef.id, ...campaignData };
      
      return newCampaign;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create campaign';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateCampaign = async (id: string, data: Partial<CampaignData>): Promise<Campaign> => {
    try {
      setError(null);
      
      const updateData: any = { ...data };
      if (data.title) {
        updateData.name = data.title;
        delete updateData.title;
      }
      
      const campaignRef = doc(db, 'campaigns', id);
      await updateDoc(campaignRef, updateData);
      
      const updatedDoc = await getDoc(campaignRef);
      if (!updatedDoc.exists()) {
        throw new Error('Campaign not found after update');
      }
      
      const updatedCampaign = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        createdAt: updatedDoc.data()?.createdAt?.toDate() || new Date(),
      } as Campaign;
      
      return updatedCampaign;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update campaign';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteCampaign = async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteDoc(doc(db, 'campaigns', id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete campaign';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getCampaignById = async (id: string): Promise<Campaign | null> => {
    try {
      setError(null);
      
      const campaignRef = doc(db, 'campaigns', id);
      const campaignDoc = await getDoc(campaignRef);
      
      if (campaignDoc.exists()) {
        const data = campaignDoc.data();
        
        // Fetch school data for location information (same as in main fetch)
        const schoolData = data.schoolId ? await fetchSchoolData(data.schoolId) : null;
        
        return {
          id: campaignDoc.id,
          name: data.name || data.title || '',
          description: data.description || '',
          category: data.category || '',
          donationTarget: Number(data.donationTarget || 0),
          amountRaised: Number(data.amountRaised || 0),
          goal: Number(data.goal || data.donationTarget || 0),
          status: data.status || 'active',
          schoolId: data.schoolId || '',
          mediaUrl: data.mediaUrl || data.image || '',
          additionalImages: data.additionalImages || [],
          currency: data.currency || 'USD',
          location: {
            city: schoolData?.city || data.location?.city || 'Unknown City',
            country: schoolData?.country || data.location?.country || 'Unknown Country',
            fullLocation: schoolData ? `${schoolData.city}, ${schoolData.country}` : (data.location?.fullLocation || `${data.location?.city || 'Unknown'}, ${data.location?.country || 'Location'}`)
          },
          schoolName: schoolData?.schoolName || '',
          featured: data.featured || false,
          startDate: data.startDate || new Date().toISOString(),
          endDate: data.endDate || new Date().toISOString(),
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Campaign;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campaign';
      setError(errorMessage);
      return null;
    }
  };

  const refetch = () => {
    console.log('Real-time updates are active, manual refetch not needed');
  };

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignById,
    refetch,
  };
};