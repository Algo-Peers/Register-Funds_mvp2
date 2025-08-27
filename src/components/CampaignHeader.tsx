import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell } from 'lucide-react';

interface CampaignHeaderProps {
  title?: string;
  className?: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ 
  title = 'Overview', 
  className = '' 
}) => {
  return (
    <motion.header
      className={`bg-gray-900 text-white px-6 py-4 border-b border-gray-700 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <motion.button
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} className="text-gray-300" />
          </motion.button>

          {/* User Profile */}
          <motion.div
            className="flex items-center space-x-2 bg-green-600 rounded-full px-3 py-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">J</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default CampaignHeader;