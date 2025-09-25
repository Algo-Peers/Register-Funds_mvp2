import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, Share2 } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';

interface CompletedProps {
  campaigns: Campaign[];
  onView: (campaign: Campaign) => void;
  onShare: (campaign: Campaign) => void;
}

const Completed: React.FC<CompletedProps> = ({ campaigns, onView, onShare }) => {
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');

  if (completedCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No completed campaigns found</div>
        <p className="text-gray-500">Complete your active campaigns to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {completedCampaigns.map((campaign, index) => {
        const progressPercentage = Math.min((campaign.amountRaised / campaign.donationTarget) * 100, 100);
        
        return (
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
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </span>
                  <span className="text-gray-400 text-sm">Basic Campaigns</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{campaign.name}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{campaign.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Raised: ${campaign.amountRaised.toLocaleString()}</span>
                    <span>Goal: ${campaign.donationTarget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-green-400 mt-1">
                    {progressPercentage.toFixed(1)}% achieved
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{campaign.location.city}, {campaign.location.country}</span>
                  <span>•</span>
                  <span>Completed on {new Date(campaign.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onView(campaign)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onShare(campaign)}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  title="Share Campaign"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Completed;