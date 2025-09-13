import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
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
  location?: string;
  createdAt: Date;
}

export interface UseCampaignsReturn {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  createCampaign: (data: CampaignData) => Promise<Campaign>;
  updateCampaign: (id: string, data: Partial<CampaignData>) => Promise<Campaign>;
  deleteCampaign: (id: string) => Promise<void>;
  getCampaignById: (id: string) => Promise<Campaign | null>;
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

const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
  const base64Promises = files.map(file => convertFileToBase64(file));
  return Promise.all(base64Promises);
};

export const useCampaigns = (userId?: string): UseCampaignsReturn => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const campaignsRef = collection(db, 'campaigns');
      let q = query(campaignsRef, orderBy('createdAt', 'desc'));
      
      if (userId) {
        q = query(campaignsRef, where('schoolId', '==', userId), orderBy('createdAt', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Campaign[];
      
      setCampaigns(campaignsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (data: CampaignData): Promise<Campaign> => {
    try {
      setError(null);
      
      // Convert media files to base64
      const mediaBase64 = data.media.length > 0 
        ? await convertFilesToBase64(data.media)
        : [];
      
      // Convert document files to base64
      const documentBase64 = data.documents.length > 0 
        ? await convertFilesToBase64(data.documents)
        : [];
      
      const campaignData = {
        name: data.title, // Map title to name
        description: data.description,
        category: data.category,
        donationTarget: data.donationTarget,
        amountRaised: 0, // Map currentAmount to amountRaised
        goal: data.donationTarget, // Set goal same as donationTarget
        status: 'draft' as const,
        schoolId: userId || '',
        mediaUrl: mediaBase64[0] || '', // Map image to mediaUrl
        additionalImages: mediaBase64.slice(1), // Store additional images
        currency: 'USD', // Default currency
        location: data.location || '',
        createdAt: new Date(),
      };
      
      const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
      const newCampaign = { id: docRef.id, ...campaignData };
      
      setCampaigns(prev => [newCampaign, ...prev]);
      return newCampaign;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
      throw err;
    }
  };

  const updateCampaign = async (id: string, data: Partial<CampaignData>): Promise<Campaign> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        name: data.title, // Map title to name if provided
      };
      
      const campaignRef = doc(db, 'campaigns', id);
      await updateDoc(campaignRef, updateData);
      
      const updatedDoc = await getDoc(campaignRef);
      const updatedCampaign = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        createdAt: updatedDoc.data()?.createdAt?.toDate() || new Date(),
      } as Campaign;
      
      setCampaigns(prev => prev.map(c => c.id === id ? updatedCampaign : c));
      return updatedCampaign;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
      throw err;
    }
  };

  const deleteCampaign = async (id: string): Promise<void> => {
    try {
      setError(null);
      
      await deleteDoc(doc(db, 'campaigns', id));
      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete campaign');
      throw err;
    }
  };

  const getCampaignById = async (id: string): Promise<Campaign | null> => {
    try {
      setError(null);
      
      const campaignRef = doc(db, 'campaigns', id);
      const campaignDoc = await getDoc(campaignRef);
      
      if (campaignDoc.exists()) {
        return {
          id: campaignDoc.id,
          ...campaignDoc.data(),
          createdAt: campaignDoc.data().createdAt?.toDate() || new Date(),
        } as Campaign;
      }
      
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaign');
      return null;
    }
  };

  const refetch = async () => {
    await fetchCampaigns();
  };

  useEffect(() => {
    fetchCampaigns();
  }, [userId]);

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