import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useCampaigns } from '../../hooks/useCampaigns';
import EditModal from './EditModal';

const SchoolData: React.FC = () => {
  const { user } = useAuth();
  const { schoolData, loading, updateSchoolData, refetch } = useSchoolData(user?.id || '');
  const { campaigns } = useCampaigns(user?.id);
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'males' | 'females' | 'steam' | 'nonsteam' | 'teachers' | 'students' | null;
  }>({ isOpen: false, type: null });

  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthCampaigns = campaigns.filter(campaign => {
      const campaignDate = new Date(campaign.createdAt);
      return campaignDate.getMonth() === currentMonth && campaignDate.getFullYear() === currentYear;
    }).length;

    const lastMonthCampaigns = campaigns.filter(campaign => {
      const campaignDate = new Date(campaign.createdAt);
      return campaignDate.getMonth() === lastMonth && campaignDate.getFullYear() === lastMonthYear;
    }).length;

    const studentsGrowth = lastMonthCampaigns > 0 
      ? Math.round(((currentMonthCampaigns - lastMonthCampaigns) / lastMonthCampaigns) * 100)
      : currentMonthCampaigns > 0 ? 100 : 0;

    const teachersGrowth = 0; // Placeholder - could be calculated from teacher data

    return {
      studentsGrowth: studentsGrowth >= 0 ? `↑ ${studentsGrowth}% vs last month` : `↓ ${Math.abs(studentsGrowth)}% vs last month`,
      teachersGrowth: `↑ ${teachersGrowth}% vs last month`
    };
  }, [campaigns]);

  const openModal = (type: 'males' | 'females' | 'steam' | 'nonsteam' | 'teachers' | 'students') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleSave = async (data: Record<string, string>) => {
    try {
      setIsUpdating(true);
      
      const updateData: any = {};
      
      if (modalState.type === 'students') {
        const males = parseInt(data.males) || 0;
        const females = parseInt(data.females) || 0;
        updateData.students = {
          ...schoolData?.students,
          male: males,
          female: females,
          total: males + females
        };
      } else if (modalState.type === 'males') {
        const males = parseInt(data.males) || 0;
        updateData.students = {
          ...schoolData?.students,
          male: males,
          total: males + (schoolData?.students?.female || 0)
        };
      } else if (modalState.type === 'females') {
        const females = parseInt(data.females) || 0;
        updateData.students = {
          ...schoolData?.students,
          female: females,
          total: (schoolData?.students?.male || 0) + females
        };
      } else if (modalState.type === 'steam') {
        const steamInvolved = parseInt(data.steamInvolved) || 0;
        updateData.teachers = {
          ...schoolData?.teachers,
          steamInvolved,
          total: steamInvolved + (schoolData?.teachers?.nonSteamInvolved || 0)
        };
      } else if (modalState.type === 'nonsteam') {
        const nonSteamInvolved = parseInt(data.nonSteamInvolved) || 0;
        updateData.teachers = {
          ...schoolData?.teachers,
          nonSteamInvolved,
          total: (schoolData?.teachers?.steamInvolved || 0) + nonSteamInvolved
        };
      } else if (modalState.type === 'teachers') {
        updateData.teachers = {
          ...schoolData?.teachers,
          total: parseInt(data.totalTeachers) || 0
        };
      }
      
      await updateSchoolData(updateData);
      await refetch();
    } catch (error) {
      console.error('Failed to update school data:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  type ModalField = {
    label: string;
    value: string;
    key: string;
    type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'textarea';
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  };
  const getModalConfig = (): { title: string; fields: ModalField[] } => {
    switch (modalState.type) {
      case 'students':
        return {
          title: 'Edit Students Data',
          fields: [
            { label: 'Number of Male Students', value: schoolData?.students?.male?.toString() || '0', key: 'males', type: 'number', min: 0, step: 1, placeholder: 'Enter male count' },
            { label: 'Number of Female Students', value: schoolData?.students?.female?.toString() || '0', key: 'females', type: 'number', min: 0, step: 1, placeholder: 'Enter female count' }
          ]
        };
      case 'males':
        return {
          title: 'Edit Male Students Data',
          fields: [
            { label: 'Number of Male Students', value: schoolData?.students?.male?.toString() || '0', key: 'males', type: 'number', min: 0, step: 1, placeholder: 'Enter male count' }
          ]
        };
      case 'females':
        return {
          title: 'Edit Female Students Data',
          fields: [
            { label: 'Number of Female Students', value: schoolData?.students?.female?.toString() || '0', key: 'females', type: 'number', min: 0, step: 1, placeholder: 'Enter female count' }
          ]
        };
      case 'steam':
        return {
          title: 'Edit STEAM Involvement Data',
          fields: [
            { label: 'Teachers Involved in STEAM', value: schoolData?.teachers?.steamInvolved?.toString() || '0', key: 'steamInvolved', type: 'number', min: 0, step: 1, placeholder: 'Enter number involved' }
          ]
        };
      case 'nonsteam':
        return {
          title: 'Edit Non-STEAM Data',
          fields: [
            { label: 'Teachers Not Involved in STEAM', value: schoolData?.teachers?.nonSteamInvolved?.toString() || '0', key: 'nonSteamInvolved', type: 'number', min: 0, step: 1, placeholder: 'Enter number not involved' }
          ]
        };
      case 'teachers':
        return {
          title: 'Edit Total Teachers',
          fields: [
            { label: 'Total Number of Teachers', value: schoolData?.teachers?.total?.toString() || '0', key: 'totalTeachers', type: 'number', min: 0, step: 1, placeholder: 'Enter total teachers' }
          ]
        };
      default:
        return { title: '', fields: [] as ModalField[] };
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
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-white">Total Students</h2>
              <button 
                onClick={() => openModal('students')}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isUpdating}
              >
                <EllipsisVertical size={18} />
              </button>
            </div>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {schoolData?.students?.total?.toLocaleString() || '0'}
            </div>
            <p className="text-green-400 text-sm">{stats.studentsGrowth}</p>
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
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">Total Teachers</h2>
                  <button 
                    onClick={() => openModal('teachers')}
                    className="text-gray-400 hover:text-white transition-colors"
                    disabled={isUpdating}
                  >
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {schoolData?.teachers?.total?.toLocaleString() || '0'}
                </div>
              </div>
              <p className="text-green-400 text-sm">{stats.teachersGrowth}</p>
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
              <span className="text-white font-bold text-xl">
                {schoolData?.students?.male?.toLocaleString() || '0'}
              </span>
              <button 
                onClick={() => openModal('males')}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isUpdating}
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
              <span className="text-white font-bold text-xl">
                {schoolData?.students?.female?.toLocaleString() || '0'}
              </span>
              <button 
                onClick={() => openModal('females')}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isUpdating}
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
              <span className="text-white font-bold text-xl">
                {schoolData?.teachers?.steamInvolved?.toLocaleString() || '0'}
              </span>
              <button 
                onClick={() => openModal('steam')}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isUpdating}
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
              <span className="text-white font-bold text-xl">
                {schoolData?.teachers?.nonSteamInvolved?.toLocaleString() || '0'}
              </span>
              <button 
                onClick={() => openModal('nonsteam')}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isUpdating}
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