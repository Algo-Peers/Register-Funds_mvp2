import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import EditModal from './EditModal';

const SchoolProfile: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'basic' | 'address' | 'contact' | null;
  }>({ isOpen: false, type: null });

  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: 'Bisakrom Gyedua D/A Primary School',
    schoolType: 'Public School',
    addressLine1: 'Opposite Aboom Clinic',
    addressLine2: 'Pedu Estate, Cape Coast',
    digitalAddress: 'CC-123-4567',
    townCity: 'Cape Coast',
    districtRegion: 'Cape Coast Metropolis, Central Region',
    email: 'bisakromschool@gmail.com',
    phone: '+233 240 838 649',
    postalAddress: 'P.O. Box 241, Cape Coast, Central Region'
  });

  const openModal = (type: 'basic' | 'address' | 'contact') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = (data: Record<string, string>) => {
    setSchoolProfile(prev => ({ ...prev, ...data }));
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'basic':
        return {
          title: 'Edit School Basic Information',
          fields: [
            { label: 'School Name', value: schoolProfile.schoolName, key: 'schoolName' },
            { label: 'School Type', value: schoolProfile.schoolType, key: 'schoolType' }
          ]
        };
      case 'address':
        return {
          title: 'Edit Address Information',
          fields: [
            { label: 'Address Line 1', value: schoolProfile.addressLine1, key: 'addressLine1' },
            { label: 'Address Line 2', value: schoolProfile.addressLine2, key: 'addressLine2' },
            { label: 'Digital Address', value: schoolProfile.digitalAddress, key: 'digitalAddress' },
            { label: 'Town/City', value: schoolProfile.townCity, key: 'townCity' },
            { label: 'District/Region', value: schoolProfile.districtRegion, key: 'districtRegion' }
          ]
        };
      case 'contact':
        return {
          title: 'Edit Contact Information',
          fields: [
            { label: 'Email Address', value: schoolProfile.email, key: 'email', type: 'email' as const },
            { label: 'Phone Number', value: schoolProfile.phone, key: 'phone', type: 'tel' as const },
            { label: 'Postal Address', value: schoolProfile.postalAddress, key: 'postalAddress' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-[#2F3931] rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl">{schoolProfile.schoolName.charAt(0)}</span>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {schoolProfile.schoolName}
            </h3>
            <p className="text-gray-400">{schoolProfile.schoolType}</p>
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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-green-400 text-sm mb-2">Address Line 1</p>
            <p className="text-white">{schoolProfile.addressLine1}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Address Line 2</p>
            <p className="text-white">{schoolProfile.addressLine2}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Digital Address</p>
            <p className="text-white">{schoolProfile.digitalAddress}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Town/City</p>
            <p className="text-white">{schoolProfile.townCity}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">District/Region</p>
            <p className="text-white">{schoolProfile.districtRegion}</p>
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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-green-400 text-sm mb-2">Email Address</p>
            <p className="text-white">{schoolProfile.email}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Phone</p>
            <p className="text-white">{schoolProfile.phone}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">Postal Address</p>
            <p className="text-white">{schoolProfile.postalAddress}</p>
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