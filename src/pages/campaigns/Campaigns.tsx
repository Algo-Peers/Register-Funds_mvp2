import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import { Link, useNavigate } from 'react-router-dom';

interface Campaign {
  id: number;
  title: string;
  location: string;
  description: string;
  raised: string;
  goal?: string;
  image: string;
  category: string;
  status: 'draft' | 'completed' | 'active';
}

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'completed'>('all');

  const campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Support Bisakrom Gyedua D/A Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      goal: '$24,000',
      raised: '',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'draft'
    },
    {
      id: 2,
      title: 'Support Bisakrom Gyedua D/A Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$24,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Support Bisakrom Gyedua D/A Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$24,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Support Bisakrom Gyedua D/A Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$24,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Support Christ is King Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$12,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'active'
    },
    {
      id: 6,
      title: 'Support Christ is King Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$12,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers',
      status: 'active'
    }
  ];

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const draftCampaigns = campaigns.filter(c => c.status === 'draft');
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');

  const getDraftsAndCompleted = () => {
    if (activeTab === 'drafts') return draftCampaigns;
    if (activeTab === 'completed') return completedCampaigns;
    return [...draftCampaigns, ...completedCampaigns];
  };

  const CampaignCard: React.FC<{ campaign: Campaign; index: number }> = ({ campaign, index }) => (
    <motion.div
      className="bg-gray-800 rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-start space-x-3">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
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
                {campaign.title}
              </h3>
              <div className="flex items-center space-x-1 mb-2">
                <MapPin size={12} className="text-green-400" />
                <span className="text-green-400 text-xs">{campaign.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold">
              {campaign.status === 'draft' ? `Goal: ${campaign.goal}` : `Raised: ${campaign.raised}`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CampaignHeader title="Campaigns" />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 text-white p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Share Your Challenges Section */}
              <motion.div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-2">Share your challenges with donors who care</h2>
                <p className="text-gray-400 mb-6">
                  Let donors know what your school is facing—and how they can help.
                </p>
                <motion.button
                  onClick={() => navigate('/campaigns/new')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
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
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Active Campaigns</h2>
                  <button className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1">
                    <span>View all</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCampaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-650 transition-colors"
                      onClick={() => navigate(`/campaigns/${campaign.id}`)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
                            {campaign.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-1 mb-2">
                          <MapPin size={12} className="text-green-400" />
                          <span className="text-green-400 text-xs">{campaign.location}</span>
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-2">
                          {campaign.title}
                        </h3>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                          {campaign.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 text-sm font-semibold">
                            Raised: {campaign.raised}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Drafts & Completed */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Drafts & Completed</h2>
                  <button className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1">
                    <span>View all</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-4 bg-gray-700 rounded-lg p-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'drafts', label: 'Drafts' },
                    { key: 'completed', label: 'Completed' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.key
                          ? 'bg-green-600 text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Campaign List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getDraftsAndCompleted().map((campaign, index) => (
                    <CampaignCard key={campaign.id} campaign={campaign} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Campaigns;