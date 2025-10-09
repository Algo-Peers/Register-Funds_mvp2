import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCampaigns, type Campaign } from '../../hooks/useCampaigns';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import EditCampaign from '../../components/Campaigns/EditCampaign';
import Preview from '../../components/Campaigns/Preview';
import Draft from '../../components/Campaigns/Draft';
import Completed from '../../components/Campaigns/Completed';

type ViewState = 'campaigns' | 'preview' | 'edit';

const InactiveCampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns, loading, error, deleteCampaign } = useCampaigns(user?.id);
  
  const [currentView, setCurrentView] = useState<ViewState>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'draft' | 'completed'>('draft');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter campaigns by status
  const inactiveCampaigns = campaigns.filter(campaign => 
    campaign.status === 'draft' || campaign.status === 'completed'
  );

  const filterOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleFilterChange = (filter: 'draft' | 'completed') => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  const handleBack = () => {
    navigate('/overview');
  };

  const handleBackToCampaigns = () => {
    setCurrentView('campaigns');
    setSelectedCampaign(null);
  };

  const handlePreviewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('preview');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('edit');
  };

  const handleDeleteCampaign = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(id);
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const handleShareCampaign = (campaign: Campaign) => {
    const shareUrl = `${window.location.origin}/campaigns/${campaign.id}`;
    if (navigator.share) {
      navigator.share({
        title: campaign.name,
        text: campaign.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Campaign link copied to clipboard!');
    }
  };

  const handleSaveCampaign = (updatedCampaign: Campaign) => {
    // The campaign will be automatically updated through the real-time listener
    console.log('Campaign updated:', updatedCampaign);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-[#020E05]">
        <CampaignHeader title="Campaigns" />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-lg">Loading campaigns...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-[#020E05]">
        <CampaignHeader title="Campaigns" />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-red-400 text-lg">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#020E05]">
      {/* Header */}
      <CampaignHeader title="Campaigns" />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Render different views based on current state */}
            {currentView === 'campaigns' && (
              <>
                {/* Back Button and Page Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={handleBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Back</span>
                    </motion.button>
                  </div>
                </div>

                {/* Filter Section */}
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
                        campaigns={inactiveCampaigns}
                        onEdit={handleEditCampaign}
                        onDelete={handleDeleteCampaign}
                        onPreview={handlePreviewCampaign}
                      />
                    )}

                    {selectedFilter === 'completed' && (
                      <Completed
                        campaigns={inactiveCampaigns}
                        onView={handlePreviewCampaign}
                        onShare={handleShareCampaign}
                      />
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {/* Preview View */}
            {currentView === 'preview' && selectedCampaign && (
              <Preview
                campaign={selectedCampaign}
                onBack={handleBackToCampaigns}
                onEdit={() => setCurrentView('edit')}
              />
            )}

            {/* Edit View */}
            {currentView === 'edit' && selectedCampaign && (
              <EditCampaign
                campaign={selectedCampaign}
                onBack={handleBackToCampaigns}
                onSave={handleSaveCampaign}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveCampaignsPage;