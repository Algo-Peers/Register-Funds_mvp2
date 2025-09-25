import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';
import Draft from '../../components/Campaigns/Draft';
import Completed from '../../components/Campaigns/Completed';

interface InactiveCampaignsProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onView: (campaign: Campaign) => void;
  onShare: (campaign: Campaign) => void;
  onPreview?: (campaign: Campaign) => void;
}

const InactiveCampaigns: React.FC<InactiveCampaignsProps> = ({
  campaigns,
  onEdit,
  onDelete,
  onView,
  onShare,
  onPreview
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'draft' | 'completed'>('draft');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleFilterChange = (filter: 'draft' | 'completed') => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Inactive Campaigns</h2>
        
        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[#1C2F21] border border-gray-600 rounded-lg px-4 py-2 text-white flex items-center gap-2 min-w-[120px] justify-between"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="capitalize">{selectedFilter}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </motion.button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-1 right-0 bg-[#1C2F21] border border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value as 'draft' | 'completed')}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedFilter === option.value ? 'bg-green-600 text-white' : 'text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Campaign Content */}
      <motion.div
        key={selectedFilter}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedFilter === 'draft' && (
          <Draft
            campaigns={campaigns}
            onEdit={onEdit}
            onDelete={onDelete}
            onPreview={onPreview || onView}
          />
        )}

        {selectedFilter === 'completed' && (
          <Completed
            campaigns={campaigns}
            onView={onPreview || onView}
            onShare={onShare}
          />
        )}
      </motion.div>
    </div>
  );
};

export default InactiveCampaigns;