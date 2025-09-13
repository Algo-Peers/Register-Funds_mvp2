import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import EditModal from './EditModal';

const SchoolData: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'males' | 'females' | 'steam' | 'nonsteam' | null;
  }>({ isOpen: false, type: null });

  const [schoolData, setSchoolData] = useState({
    totalStudents: '2,923',
    totalTeachers: '29',
    males: '2,923',
    females: '2,923',
    steamInvolved: '2,923',
    steamNotInvolved: '2,923',
    studentsGrowth: '↑ 14% vs last month',
    teachersGrowth: '↑ 14% vs last month'
  });

  const openModal = (type: 'males' | 'females' | 'steam' | 'nonsteam') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = (data: Record<string, string>) => {
    setSchoolData(prev => ({ ...prev, ...data }));
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'males':
        return {
          title: 'Edit Male Students Data',
          fields: [
            { label: 'Number of Male Students', value: schoolData.males, key: 'males' }
          ]
        };
      case 'females':
        return {
          title: 'Edit Female Students Data',
          fields: [
            { label: 'Number of Female Students', value: schoolData.females, key: 'females' }
          ]
        };
      case 'steam':
        return {
          title: 'Edit STEAM Involvement Data',
          fields: [
            { label: 'Students Involved in STEAM', value: schoolData.steamInvolved, key: 'steamInvolved' }
          ]
        };
      case 'nonsteam':
        return {
          title: 'Edit Non-STEAM Data',
          fields: [
            { label: 'Students Not Involved in STEAM', value: schoolData.steamNotInvolved, key: 'steamNotInvolved' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

  return (
    <div className="flex gap-8">
      {/* Left Side*/}
      <div className="flex-1 space-y-8">
        {/* Total Students */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-6 h-48"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Total Students</h2>
            <div className="text-4xl font-bold text-green-400 mb-2">{schoolData.totalStudents}</div>
            <p className="text-green-400 text-sm">{schoolData.studentsGrowth}</p>
          </div>
        </motion.div>

        {/* Total Teachers */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-6 h-48"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <div className='flex flex-col justify-between'>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Total Teachers</h2>
              <div className="text-4xl font-bold text-green-400 mb-2">{schoolData.totalTeachers}</div>
            </div>
            <p className="text-green-400 text-sm">{schoolData.teachersGrowth}</p>
          </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="flex-1 grid grid-cols-1 gap-4">
        {/* Males */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-4 h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between h-full">
            <span className="text-white font-medium">Males</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xl">{schoolData.males}</span>
              <button 
                onClick={() => openModal('males')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <EllipsisVertical size={18}/>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Females */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-4 h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center justify-between h-full">
            <span className="text-white font-medium">Females</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xl">{schoolData.females}</span>
              <button 
                onClick={() => openModal('females')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <EllipsisVertical size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Involved in STEAM */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-4 h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between h-full">
            <span className="text-white font-medium">Involved in STEAM</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xl">{schoolData.steamInvolved}</span>
              <button 
                onClick={() => openModal('steam')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <EllipsisVertical size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Not Involved in STEAM */}
        <motion.div
          className="bg-[#0D180F] rounded-xl p-4 h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex items-center justify-between h-full">
            <span className="text-white font-medium">Not Involved in STEAM</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xl">{schoolData.steamNotInvolved}</span>
              <button 
                onClick={() => openModal('nonsteam')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <EllipsisVertical size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

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

export default SchoolData;