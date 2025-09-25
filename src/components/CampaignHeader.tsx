import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSchoolProfile } from '../hooks/useSchoolProfile';

interface CampaignHeaderProps {
  title?: string;
  className?: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ 
  title = 'Overview', 
  className = '' 
}) => {
  const { user } = useAuth();
  const { profile } = useSchoolProfile(user?.id || '');

  return (
    <motion.header
      className={`bg-[#020E05] text-white px-6 py-4 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-xl">Register</span>
              <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-sm font-medium">
                FUNDS
              </span>
            </div>
          </Link>
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
              className="bg-[#111C14] border border-gray-700 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
          </div>

          {/* User Profile */}
          <motion.div
            className="flex items-center space-x-2 bg-green-600 rounded-full px-3 py-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {(profile?.schoolName || user?.name || 'School').charAt(0)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default CampaignHeader;