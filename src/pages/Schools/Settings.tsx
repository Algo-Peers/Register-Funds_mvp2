import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import Account from '../../components/Settings/Account';
import SchoolProfile from '../../components/Settings/SchoolProfile';
import SchoolData from '../../components/Settings/SchoolData';
import Notifications from '../../components/Settings/Notifications';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    { id: 'Account', label: 'Account' },
    { id: 'SchoolProfile', label: 'School Profile' },
    { id: 'SchoolData', label: 'School Data' },
    { id: 'Notifications', label: 'Notifications' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'Account':
        return <Account />;
      case 'SchoolProfile':
        return <SchoolProfile />;
      case 'SchoolData':
        return <SchoolData />;
      case 'Notifications':
        return <Notifications />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020E05]">
      {/* Header at the top */}
      <CampaignHeader title="" />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="w-full">
            {/* Header and Tab Navigation on same level */}
            <div className="flex items-end justify-between mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Settings</h1>
              
              {/* Tab Navigation */}
              <div className="flex space-x-8 border-b border-[#1B261E]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <motion.div
              className="bg-[#07130A] p-4 rounded-xl"
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveComponent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;