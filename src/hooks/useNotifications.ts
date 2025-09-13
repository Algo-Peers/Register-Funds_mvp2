import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export interface NotificationSettings {
  id: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  campaignUpdates: boolean;
  donationAlerts: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
  userId: string;
  updatedAt: Date;
}

export interface UseNotificationsReturn {
  settings: NotificationSettings | null;
  loading: boolean;
  error: string | null;
  updateSettings: (data: Partial<NotificationSettings>) => Promise<NotificationSettings>;
  refetch: () => Promise<void>;
}

export const useNotifications = (userId: string): UseNotificationsReturn => {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const settingsRef = doc(db, 'notificationSettings', userId);
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const data = {
          id: settingsDoc.id,
          ...settingsDoc.data(),
          updatedAt: settingsDoc.data().updatedAt?.toDate() || new Date(),
        } as NotificationSettings;
        setSettings(data);
      } else {
        // Create default settings if they don't exist
        const defaultSettings = {
          id: userId,
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          campaignUpdates: true,
          donationAlerts: true,
          systemUpdates: true,
          marketingEmails: false,
          userId,
          updatedAt: new Date(),
        };
        
        await setDoc(settingsRef, defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notification settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };
      
      const settingsRef = doc(db, 'notificationSettings', userId);
      await updateDoc(settingsRef, updateData);
      
      const updatedDoc = await getDoc(settingsRef);
      const updatedSettings = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        updatedAt: updatedDoc.data()?.updatedAt?.toDate() || new Date(),
      } as NotificationSettings;
      
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification settings');
      throw err;
    }
  };

  const refetch = async () => {
    await fetchSettings();
  };

  useEffect(() => {
    if (userId) {
      fetchSettings();
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch,
  };
};