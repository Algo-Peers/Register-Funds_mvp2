import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';
import { useCampaigns } from '../../hooks/useCampaigns';
import { useAuth } from '../../hooks/useAuth';
import QuickShare from '../QuickShare';
import CampaignMainContent from './CampaignMainContent';

interface PreviewProps {
  campaign: Campaign | null;
  onBack: () => void;
  onEdit: (campaign: Campaign) => void;
  onLaunch?: (campaign: Campaign) => void;
}

const Preview: React.FC<PreviewProps> = ({ 
  campaign, 
  onBack, 
  onEdit, 
  onLaunch 
}) => {
  const { user } = useAuth();
  const { updateCampaign } = useCampaigns(user?.id);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleLaunch = async () => {
    if (!campaign) return;

    setLoading(true);
    try {
      const updatedCampaign = await updateCampaign(campaign.id, {
        title: campaign.name,
        description: campaign.description,
        category: campaign.category,
        donationTarget: campaign.donationTarget,
      });

      // Update campaign status to active (this would need to be handled in the backend)
      if (onLaunch) {
        onLaunch({ ...updatedCampaign, status: 'active' });
      }
      onBack();
    } catch (error) {
      console.error('Error launching campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (campaign) {
      onEdit(campaign);
    }
  };

  if (!campaign) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </div>
        
        {/* Action Buttons on the Right */}
        <div className="flex items-center gap-4">
          {/* <motion.button
            onClick={openShareModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.button> */}


          <motion.button
            onClick={handleEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#18231B] text-white px-6 py-2 rounded-3xl font-medium transition-colors flex items-center gap-2"
          >
            Edit Campaign
          </motion.button>

          <motion.button
            onClick={handleEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#102F18] text-white px-6 py-2 rounded-2xl font-medium transition-colors flex items-center gap-2"
          >
            Launch Campaign
          </motion.button>

          {campaign.status === 'draft' && (
            <motion.button
              onClick={handleLaunch}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              {loading ? 'Launching...' : 'Launch Campaign'}
            </motion.button>
          )}
        </div>
      </div>

      {/* Campaign Details Content - Using CampaignMainContent component */}
      <div className="max-w-7xl mx-auto pb-12">
        <div className="max-w-4xl">
          <CampaignMainContent
            campaign={campaign}
            showFullDescription={showFullDescription}
            setShowFullDescription={setShowFullDescription}
            openShareModal={openShareModal}
            hideActions={true}
          />
        </div>
      </div>

      {/* QuickShare Modal */}
      <QuickShare
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        campaign={{
          name: campaign.name || 'Campaign',
          url: window.location.href
        }}
      />
    </motion.div>
  );
};

export default Preview;