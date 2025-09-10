import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import { useNavigate } from 'react-router-dom';

const Overview: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Campaigns',
      value: '00',
      change: '↑ 14% vs last month',
      changeColor: 'text-green-400',
      // icon: TrendingU
    },
    {
      title: 'Donations Received',
      value: '00',
      change: '↑ 14% vs last month',
      changeColor: 'text-green-400',
      // icon: DollarSign
    },
    {
      title: 'Students Population',
      value: '00',
      change: '↑ 14% vs last month',
      changeColor: 'text-green-400',
      // icon: Users
    },
    {
      title: 'Admins',
      value: '00',
      change: '↑ 14% vs last month',
      changeColor: 'text-green-400',
      // icon: Settings
    }
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: 'Support Christ is King Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$12,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers'
    },
    {
      id: 2,
      title: 'Support Christ is King Primary School',
      location: 'Cape Coast, Ghana',
      description: 'Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.',
      raised: '$12,000',
      image: '/students-happy.jpg',
      category: 'Basic Computers'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#020E05]">
      {/* Header at the top */}
      <CampaignHeader title="" />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#020E05]">
          {/* Content */}
          <main className="flex-1 overflow-y-auto text-white p-6">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                return (
                  <motion.div
                    key={stat.title}
                    className="bg-[#0A150C] rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                    </div>
                    <div>
                      <p className="text-xl mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-green-400 mb-2">{stat.value}</p>
                      <p className={`text-sm ${stat.changeColor}`}>{stat.change}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Access and Active Campaigns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Access */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-6">Quick Access</h2>
                
                <motion.div
                  className="bg-[#0A150C] rounded-xl p-6 flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-green-400 mt-1" size={16} />
                      <div>
                        <p className="text-green-400 text-sm">Cape Coast, Ghana</p>
                        <h3 className="text-white font-semibold text-lg">
                          Bisakrom Gyedua D/A Primary School
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <motion.button
                        onClick={() => navigate('/campaigns/settings')}
                        className="w-full flex items-center justify-between bg-[#1C271E] hover:bg-[#171f18] px-4 py-3 rounded-full transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Update School Profile</span>
                        <ArrowRight size={16} />
                      </motion.button>

                      <motion.button
                        onClick={() => navigate('/create')}
                        className="w-full flex items-center justify-between bg-[#16311C] hover:bg-[#122616] px-4 py-3 rounded-full transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Start a Campaign</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Active Campaigns */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Active Campaigns</h2>
                  <button 
                    onClick={() => navigate('/campaigns')}
                    className="text-white hover:text-green-300 text-sm flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                
                <motion.div
                  className="bg-[#0A150C] rounded-xl p-6 flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {activeCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCampaigns.map((campaign, index) => (
                        <motion.div
                          key={campaign.id}
                          className="bg-[#0F1A11] rounded-lg overflow-hidden cursor-pointer hover:bg-gray-650 transition-colors"
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
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-green-400 text-lg font-semibold mb-2">No Campaigns</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Broadcast your challenges to donors who care
                      </p>
                      <motion.button
                        onClick={() => navigate('/campaigns/new')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Start a Campaign</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Overview;