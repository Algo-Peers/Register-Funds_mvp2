import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCampaigns, type Campaign } from '../../hooks/useCampaigns';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import CampaignCard from '../../components/CampaignCard';
import EditCampaign from '../../components/Campaigns/EditCampaign';
import Preview from '../../components/Campaigns/Preview';

type ViewState = 'campaigns' | 'preview' | 'edit';

const ActiveCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns, loading, error } = useCampaigns(user?.id);
  
  const [activeTab] = useState<'active' | 'inactive'>('active');
  const [currentView, setCurrentView] = useState<ViewState>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Filter campaigns by status
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');

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

  const handleSaveCampaign = (updatedCampaign: Campaign) => {
    // The campaign will be automatically updated through the real-time listener
    console.log('Campaign updated:', updatedCampaign);
  };

  const handleLaunchCampaign = (campaign: Campaign) => {
    // Handle campaign launch logic here
    console.log('Campaign launched:', campaign);
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


                <div className="text-white text-2xl font-bold py-4">
                  <h3>Active Campaigns</h3>
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'active' && (
                    <div>
                      {activeCampaigns.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-gray-400 text-lg mb-4">No active campaigns found</div>
                          <p className="text-gray-500 mb-6">Create your first campaign to start fundraising</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {activeCampaigns.map((campaign, index) => (
                            <CampaignCard
                              key={campaign.id}
                              id={campaign.id}
                              image={campaign.mediaUrl || '/students-happy.jpg'}
                              category={campaign.category}
                              location={campaign.location}
                              title={campaign.name}
                              description={campaign.description}
                              currentAmount={campaign.amountRaised}
                              donationTarget={campaign.donationTarget}
                              index={index}
                              onClick={() => handlePreviewCampaign(campaign)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'inactive' && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-lg mb-4">Inactive campaigns are managed separately</div>
                      <p className="text-gray-500 mb-6">Visit the Inactive Campaigns page to view and manage draft and completed campaigns</p>
                      <button
                        onClick={() => navigate('/inactive-campaigns')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Go to Inactive Campaigns
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {/* Preview View */}
            {currentView === 'preview' && (
              <Preview
                campaign={selectedCampaign}
                onBack={handleBackToCampaigns}
                onEdit={handleEditCampaign}
                onLaunch={handleLaunchCampaign}
              />
            )}

            {/* Edit View */}
            {currentView === 'edit' && (
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

export default ActiveCampaigns;
