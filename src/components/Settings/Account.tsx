import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import EditModal from './EditModal';

const Account: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'basic' | 'security' | 'staff' | null;
  }>({ isOpen: false, type: null });

  const [accountData, setAccountData] = useState({
    name: 'Josh Johnson',
    role: 'Teacher',
    email: 'bisakromschool@gmail.com',
    phone: '+233 (555) 000-0000',
    password: '••••••••',
    staffId: 'GHS827392',
    schoolRole: 'Teacher'
  });

  const openModal = (type: 'basic' | 'security' | 'staff') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = (data: Record<string, string>) => {
    setAccountData(prev => ({ ...prev, ...data }));
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'basic':
        return {
          title: 'Edit Basic Info',
          fields: [
            { label: 'Full Name', value: accountData.name, key: 'name' },
            { label: 'Role', value: accountData.role, key: 'role' },
            { label: 'Email', value: accountData.email, key: 'email', type: 'email' as const },
            { label: 'Phone Number', value: accountData.phone, key: 'phone', type: 'tel' as const }
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
            { label: 'Staff ID', value: accountData.staffId, key: 'staffId' },
            { label: 'School Role', value: accountData.schoolRole, key: 'schoolRole' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-[#2F3931] rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl">{accountData.name.charAt(0)}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">{accountData.name}</h3>
            <p className="text-gray-400">{accountData.role}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-green-400 text-sm mb-1">Email</p>
              <p className="text-white">{accountData.email}</p>
            </div>
            <div>
              <p className="text-green-400 text-sm mb-1">Phone Number</p>
              <p className="text-white">{accountData.phone}</p>
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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div>
          <p className="text-green-400 text-sm mb-2">Password</p>
          <p className="text-white font-mono">{accountData.password}</p>
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
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-green-400 text-sm mb-2">Staff ID</p>
            <p className="text-white">{accountData.staffId}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm mb-2">School Role</p>
            <p className="text-white">{accountData.schoolRole}</p>
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