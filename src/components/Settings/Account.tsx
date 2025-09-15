import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSchoolData } from '../../hooks/useSchoolData';
import EditModal from './EditModal';

const Account: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { schoolData, loading: schoolLoading, updateSchoolData } = useSchoolData(user?.id || '');
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'basic' | 'security' | 'staff' | null;
  }>({ isOpen: false, type: null });

  const [isUpdating, setIsUpdating] = useState(false);

  const openModal = (type: 'basic' | 'security' | 'staff') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = async (data: Record<string, string>) => {
    try {
      setIsUpdating(true);
      
      if (modalState.type === 'basic') {
        await updateSchoolData({
          contactName: data.name,
          email: data.email,
          phone: data.phone,
        });
      } else if (modalState.type === 'staff') {
        // Update staff information in school data
        await updateSchoolData({
          contactName: data.name || schoolData?.contactName,
        });
      }
      // Note: Password updates would require additional Firebase Auth methods
      
    } catch (error) {
      console.error('Failed to update account data:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'basic':
        return {
          title: 'Edit Basic Info',
          fields: [
            { label: 'Full Name', value: schoolData?.contactName || '', key: 'name' },
            { label: 'Role', value: user?.role || 'Teacher', key: 'role' },
            { label: 'Email', value: schoolData?.email || user?.email || '', key: 'email', type: 'email' as const },
            { label: 'Phone Number', value: schoolData?.phone || '', key: 'phone', type: 'tel' as const }
          ]
        };
      case 'security':
        return {
          title: 'Edit Security',
          fields: [
            { label: 'New Password', value: '', key: 'password', type: 'password' as const },
            { label: 'Confirm Password', value: '', key: 'confirmPassword', type: 'password' as const }
          ]
        };
      case 'staff':
        return {
          title: 'Edit Staff Information',
          fields: [
            { label: 'Staff ID', value: user?.id || '', key: 'staffId' },
            { label: 'School Role', value: user?.role || 'Teacher', key: 'schoolRole' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

  if (authLoading || schoolLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Basic Info</h2>
          <button 
            onClick={() => openModal('basic')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-[#2F3931] rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl">
              {(schoolData?.contactName || user?.name || 'U').charAt(0)}
            </span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">
              {schoolData?.contactName || user?.name || 'Unknown User'}
            </h3>
            <p className="text-gray-400">{user?.role || 'Teacher'}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-green-400 text-sm mb-1">Email</p>
              <p className="text-white">{schoolData?.email || user?.email || 'No email'}</p>
            </div>
            <div>
              <p className="text-green-400 text-sm mb-1">Phone Number</p>
              <p className="text-white">{schoolData?.phone || 'No phone'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Security</h2>
          <button 
            onClick={() => openModal('security')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div>
          <p className="text-green-400 text-sm mb-2">Password</p>
          <p className="text-white font-mono">••••••••</p>
        </div>
      </motion.div>

      {/* Staff Information */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Staff Information</h2>
          <button 
            onClick={() => openModal('staff')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-green-400 text-sm mb-2">Staff ID</p>
            <p className="text-white">{user?.id?.substring(0, 8) || 'N/A'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">School Role</p>
            <p className="text-white">{user?.role || 'Teacher'}</p>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EditModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        {...getModalConfig()}
        onSave={handleSave}
      />
    </div>
  );
};

export default Account;