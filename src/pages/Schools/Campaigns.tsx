import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useCampaigns, type Campaign } from '../../hooks/useCampaigns';
import { useAuth } from '../../hooks/useAuth';

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns, loading, error } = useCampaigns(user?.schoolId);
  const [activeTab] = useState<'all' | 'drafts' | 'completed'>('all');

  // Filter campaigns by status AND current user
  const userCampaigns = campaigns.filter(c => c.schoolId === user?.schoolId);
  
  // Filter user's campaigns by status
  const activeCampaigns = userCampaigns.filter(c => c.status === 'active');
  const draftCampaigns = userCampaigns.filter(c => c.status === 'draft');
  const completedCampaigns = userCampaigns.filter(c => c.status === 'completed');

  const getDraftsAndCompleted = () => {
    if (activeTab === 'drafts') return draftCampaigns;
    if (activeTab === 'completed') return completedCampaigns;
    return [...draftCampaigns, ...completedCampaigns];
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CampaignCard: React.FC<{ campaign: Campaign; index: number }> = ({ campaign, index }) => (
    <motion.div
      className="bg-[#0F1A12] rounded-xl p-4 cursor-pointer"
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'draft' 
                    ? 'bg-yellow-600 text-yellow-100'
                    : campaign.status === 'completed'
                    ? 'bg-green-600 text-green-100'
                    : 'bg-blue-600 text-blue-100'
                }`}>
                  {campaign.status === 'draft' ? 'Draft' : campaign.status === 'completed' ? 'Completed' : 'Active'}
                </span>
                <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
                  {campaign.category}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {campaign.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold">
              {campaign.status === 'draft' 
                ? `Goal: ${formatCurrency(campaign.goal, campaign.currency)}` 
                : `Raised: ${formatCurrency(campaign.amountRaised, campaign.currency)}`
              }
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-[#020E05] px-6">
        <CampaignHeader title="" />
        <div className="flex flex-1 overflow-hidden bg-[#020E05]">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading campaigns...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-screen bg-[#020E05] px-6">
        <CampaignHeader title="" />
        <div className="flex flex-1 overflow-hidden bg-[#020E05]">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-red-400 mb-2">Error loading campaigns</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#020E05] px-6">
      {/* Header at the top */}
      <CampaignHeader title="" />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden bg-[#020E05]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content */}
          <main className="flex-1 overflow-y-auto text-white p-4 bg-[#020E05]">
            {/* Page Title */}
            <h1 className="text-xl font-bold mb-4">Campaigns</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Share Your Challenges Section */}
                <motion.div
                  className="bg-[#0F1A11] rounded-xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-2">Share your challenges with donors who care</h2>
                  <p className="text-gray-400 mb-4 text-sm">
                    Let donors know what your school is facing—and how they can help.
                  </p>
                  <motion.button
                    onClick={() => navigate('/create')}
                    className="bg-[#142D1A] hover:bg-[#142D1A] text-white px-12 py-2 rounded-full flex items-center justify-between space-x-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/create">
                      <span>Start a Campaign</span>
                    </Link>
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>

                {/* Active Campaigns */}
                <motion.div
                  className="rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Active Campaigns</h2>
                    <button 
                      onClick={() => navigate('/active-campaigns')}
                      className="text-sm flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <span>View all</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {activeCampaigns.length === 0 ? (
                    <div className="bg-[#0F1A11] rounded-lg p-6 text-center">
                      <p className="text-gray-400 mb-2">No active campaigns yet</p>
                      <p className="text-gray-500 text-sm">Start your first campaign to begin fundraising</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeCampaigns.slice(0, 2).map((campaign, index) => (
                        <motion.div
                          key={campaign.id}
                          className="bg-[#0F1A11] rounded-lg overflow-hidden cursor-pointer hover:bg-gray-650 transition-colors"
                          onClick={() => navigate(`/campaigns/${campaign.id}`)}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                          <div className="relative">
                            {campaign.mediaUrl ? (
                              <img
                                src={campaign.mediaUrl}
                                alt={campaign.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/students-happy.jpg'; // Fallback image
                                }}
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2">
                              <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
                                {campaign.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center space-x-1 mb-1">
                              <MapPin size={12} className="text-green-400" />
                              <span className="text-green-400 text-xs">
                                {campaign.location.fullLocation || `${campaign.location.city}, ${campaign.location.country}`}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-1">
                              {campaign.name}
                            </h3>
                            <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                              {campaign.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-green-400 text-sm font-semibold">
                                Raised: {formatCurrency(campaign.amountRaised, campaign.currency)}
                              </span>
                              {campaign.goal > 0 && (
                                <span className="text-gray-400 text-xs">
                                  Goal: {formatCurrency(campaign.goal, campaign.currency)}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Right Column - Drafts & Completed */}
              <div className="lg:col-span-1">
                <motion.div
                  className="bg-[] rounded-xl sticky"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Drafts & Completed</h2>
                    <button 
                      onClick={() => navigate('/inactive-campaigns')}
                      className="text-sm flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <span>View all</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Campaign List */}
                  <div className="space-y-3 max-h-full overflow-y-auto scrollbar-hide">
                    {getDraftsAndCompleted().length === 0 ? (
                      <div className="bg-[#0F1A12] rounded-xl p-4 text-center">
                        <p className="text-gray-400 text-sm">No drafts or completed campaigns</p>
                      </div>
                    ) : (
                      getDraftsAndCompleted().map((campaign, index) => (
                        <CampaignCard key={campaign.id} campaign={campaign} index={index} />
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;