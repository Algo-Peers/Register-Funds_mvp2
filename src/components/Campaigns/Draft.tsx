import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';

interface DraftProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onPreview: (campaign: Campaign) => void;
}

const Draft: React.FC<DraftProps> = ({ campaigns, onEdit, onDelete, onPreview }) => {
  const draftCampaigns = campaigns.filter(campaign => campaign.status === 'draft');

  if (draftCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No draft campaigns found</div>
        <p className="text-gray-500">Create a new campaign to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {draftCampaigns.map((campaign, index) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#1C2F21] rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  Draft
                </span>
                <span className="text-gray-400 text-sm">Basic Campaigns</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{campaign.name}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{campaign.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Goal: ${campaign.donationTarget.toLocaleString()}</span>
                <span>•</span>
                <span>{campaign.location.city}, {campaign.location.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPreview(campaign)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                title="Preview"
              >
                <Eye className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(campaign)}
                className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(campaign.id)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Draft;