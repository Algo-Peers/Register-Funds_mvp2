import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { db, auth } from '../config/Firebase';

export interface AccountData {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  staffId: string;
  schoolRole: string;
  avatarBase64?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseAccountReturn {
  account: AccountData | null;
  loading: boolean;
  error: string | null;
  updateAccount: (data: Partial<AccountData>) => Promise<AccountData>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
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

export const useAccount = (userId: string): UseAccountReturn => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const accountRef = doc(db, 'users', userId);
      const accountDoc = await getDoc(accountRef);
      
      if (accountDoc.exists()) {
        const data = {
          id: accountDoc.id,
          ...accountDoc.data(),
          createdAt: accountDoc.data().createdAt?.toDate() || new Date(),
          updatedAt: accountDoc.data().updatedAt?.toDate() || new Date(),
        } as AccountData;
        setAccount(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account');
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (data: Partial<AccountData>): Promise<AccountData> => {
    try {
      setError(null);
      
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };
      
      const accountRef = doc(db, 'users', userId);
      await updateDoc(accountRef, updateData);
      
      const updatedDoc = await getDoc(accountRef);
      const updatedAccount = {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        createdAt: updatedDoc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: updatedDoc.data()?.updatedAt?.toDate() || new Date(),
      } as AccountData;
      
      setAccount(updatedAccount);
      return updatedAccount;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update account');
      throw err;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      setError(null);
      
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('No authenticated user found');
      }
      
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
      throw err;
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    try {
      setError(null);
      
      const avatarBase64 = await convertFileToBase64(file);
      await updateAccount({ avatarBase64 });
      return avatarBase64;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      throw err;
    }
  };

  const refetch = async () => {
    await fetchAccount();
  };

  useEffect(() => {
    if (userId) {
      fetchAccount();
    }
  }, [userId]);

  return {
    account,
    loading,
    error,
    updateAccount,
    changePassword,
    uploadAvatar,
    refetch,
  };
};