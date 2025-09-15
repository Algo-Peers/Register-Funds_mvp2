import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSchoolProfile } from '../../hooks/useSchoolProfile';
import EditModal from './EditModal';

const SchoolProfile: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useSchoolProfile(user?.id || '');
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'basic' | 'address' | 'contact' | null;
  }>({ isOpen: false, type: null });

  const [isUpdating, setIsUpdating] = useState(false);

  const openModal = (type: 'basic' | 'address' | 'contact') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = async (data: Record<string, string>) => {
    try {
      setIsUpdating(true);
      await updateProfile(data);
    } catch (error) {
      console.error('Failed to update school profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'basic':
        return {
          title: 'Edit School Basic Information',
          fields: [
            { label: 'School Name', value: profile?.schoolName || '', key: 'schoolName' },
            { label: 'School Type', value: profile?.schoolType || '', key: 'schoolType' }
          ]
        };
      case 'address':
        return {
          title: 'Edit Address Information',
          fields: [
            { label: 'Address', value: profile?.address || '', key: 'address' },
            { label: 'City', value: profile?.city || '', key: 'city' },
            { label: 'Region', value: profile?.region || '', key: 'region' },
            { label: 'Country', value: profile?.country || '', key: 'country' },
            { label: 'Postal Code', value: profile?.postalCode || '', key: 'postalCode' }
          ]
        };
      case 'contact':
        return {
          title: 'Edit Contact Information',
          fields: [
            { label: 'Email Address', value: profile?.contactEmail || '', key: 'contactEmail', type: 'email' as const },
            { label: 'Phone Number', value: profile?.contactPhone || '', key: 'contactPhone', type: 'tel' as const },
            { label: 'Website', value: profile?.website || '', key: 'website' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* School Basic Information */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">School Basic Information</h2>
          <button 
            onClick={() => openModal('basic')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-[#2F3931] rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl">
              {(profile?.schoolName || 'School').charAt(0)}
            </span>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {profile?.schoolName || 'School Name Not Set'}
            </h3>
            <p className="text-gray-400">{profile?.schoolType || 'School Type Not Set'}</p>
          </div>
        </div>
      </motion.div>

      {/* Address */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Address</h2>
          <button 
            onClick={() => openModal('address')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-green-400 text-sm mb-2">Address</p>
            <p className="text-white">{profile?.address || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">City</p>
            <p className="text-white">{profile?.city || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Region</p>
            <p className="text-white">{profile?.region || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Country</p>
            <p className="text-white">{profile?.country || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Postal Code</p>
            <p className="text-white">{profile?.postalCode || 'Not set'}</p>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Contact Information</h2>
          <button 
            onClick={() => openModal('contact')}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isUpdating}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-green-400 text-sm mb-2">Email Address</p>
            <p className="text-white">{profile?.contactEmail || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Phone</p>
            <p className="text-white">{profile?.contactPhone || 'Not set'}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Website</p>
            <p className="text-white">{profile?.website || 'Not set'}</p>
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

export default SchoolProfile;