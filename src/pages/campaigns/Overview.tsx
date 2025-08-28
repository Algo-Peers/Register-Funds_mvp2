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
      <CampaignHeader title="Overview" />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#020E05]">
          {/* Content */}
          <main className="flex-1 overflow-y-auto text-white p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                return (
                  <motion.div
                    key={stat.title}
                    className="bg-[] rounded-xl p-6 border border-gray-700"
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
              <motion.div
                className="bg-[] rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-6">Quick Access</h2>
                
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
                      className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Update School Profile</span>
                      <ArrowRight size={16} />
                    </motion.button>

                    <motion.button
                      onClick={() => navigate('/create')}
                      className="w-full flex items-center justify-between bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Start a Campaign</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Active Campaigns */}
              <motion.div
                className="bg-[] rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Active Campaigns</h2>
                  <button 
                    onClick={() => navigate('/campaigns')}
                    className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {activeCampaigns.length > 0 ? (
                  <div className="space-y-4">
                    {activeCampaigns.slice(0, 2).map((campaign, index) => (
                      <motion.div
                        key={campaign.id}
                        className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      >
                        <div className="flex space-x-3">
                          <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-green-400 text-xs">{campaign.location}</p>
                                <h4 className="text-white font-medium text-sm mb-1">
                                  {campaign.title}
                                </h4>
                                <p className="text-gray-400 text-xs line-clamp-2">
                                  {campaign.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                                {campaign.category}
                              </span>
                              <span className="text-green-400 text-sm font-semibold">
                                Raised: {campaign.raised}
                              </span>
                            </div>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Overview;