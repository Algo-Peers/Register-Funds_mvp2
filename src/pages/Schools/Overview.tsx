import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import CampaignHeader from '../../components/CampaignHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCampaigns } from '../../hooks/useCampaigns';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

interface SchoolData {
  schoolName: string;
  city: string;
  country: string;
  students: {
    male: number;
    female: number;
    total: number;
  };
  teachers: {
    steamInvolved: number;
    nonSteamInvolved: number;
    total: number;
  };
}

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { campaigns, loading: campaignsLoading } = useCampaigns(user?.id);
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [previousMonthStats, setPreviousMonthStats] = useState({
    campaigns: 0,
    donations: 0,
    students: 0,
    admins: 1
  });

  // Fetch school data
  useEffect(() => {
    const fetchSchoolData = async () => {
      if (user?.id) {
        try {
          const schoolDoc = await getDoc(doc(db, 'schools', user.id));
          if (schoolDoc.exists()) {
            const data = schoolDoc.data();
            setSchoolData({
              schoolName: data.schoolName || '',
              city: data.city || '',
              country: data.country || '',
              students: data.students || { male: 0, female: 0, total: 0 },
              teachers: data.teachers || { steamInvolved: 0, nonSteamInvolved: 0, total: 0 }
            });
          }
        } catch (error) {
          console.error('Error fetching school data:', error);
        }
      }
    };

    fetchSchoolData();
  }, [user?.id]);

  // Calculate current month stats
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const currentMonthCampaigns = campaigns.filter(campaign => {
    const campaignDate = new Date(campaign.createdAt);
    return campaignDate.getMonth() === currentMonth && campaignDate.getFullYear() === currentYear;
  });

  const currentMonthDonations = currentMonthCampaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0);

  // Calculate previous month stats for comparison
  useEffect(() => {
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthCampaigns = campaigns.filter(campaign => {
      const campaignDate = new Date(campaign.createdAt);
      return campaignDate.getMonth() === previousMonth && campaignDate.getFullYear() === previousYear;
    });

    const previousMonthDonations = previousMonthCampaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0);

    setPreviousMonthStats({
      campaigns: previousMonthCampaigns.length,
      donations: previousMonthDonations,
      students: schoolData?.students?.total || 0,
      admins: 1
    });
  }, [campaigns, schoolData, currentMonth, currentYear]);

  // Calculate percentage changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const campaignChange = calculateChange(currentMonthCampaigns.length, previousMonthStats.campaigns);
  const donationChange = calculateChange(currentMonthDonations, previousMonthStats.donations);
  const studentChange = calculateChange(schoolData?.students?.total || 0, previousMonthStats.students);

  // Calculate dynamic stats from real data
  const totalCampaigns = campaigns.length;
  const totalDonations = campaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0);
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');

  const stats = [
    {
      title: 'Total Campaigns',
      value: totalCampaigns.toString().padStart(2, '0'),
      change: `${campaignChange >= 0 ? '↑' : '↓'} ${Math.abs(campaignChange)}% vs last month`,
      changeColor: campaignChange >= 0 ? 'text-green-400' : 'text-red-400',
    },
    {
      title: 'Donations Received',
      value: `$${totalDonations.toLocaleString()}`,
      change: `${donationChange >= 0 ? '↑' : '↓'} ${Math.abs(donationChange)}% vs last month`,
      changeColor: donationChange >= 0 ? 'text-green-400' : 'text-red-400',
    },
    {
      title: 'Students Population',
      value: (schoolData?.students?.total || 0).toString().padStart(2, '0'),
      change: `${studentChange >= 0 ? '↑' : '↓'} ${Math.abs(studentChange)}% vs last month`,
      changeColor: studentChange >= 0 ? 'text-green-400' : 'text-red-400',
    },
    {
      title: 'Admins',
      value: '01', // Current user is an admin
      change: '→ 0% vs last month',
      changeColor: 'text-gray-400',
    }
  ];

  // Get the first 2 active campaigns for display
  const displayCampaigns = activeCampaigns.slice(0, 2);

  if (authLoading || campaignsLoading) {
    return (
      <div className="flex flex-col h-screen bg-[#020E05]">
        <CampaignHeader title="" />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold mb-4">Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                return (
                  <motion.div
                    key={stat.title}
                    className="bg-[#0A150C] rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                    </div>
                    <div>
                      <p className="text-lg mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-green-400 mb-8">{stat.value}</p>
                      <p className={`text-xs ${stat.changeColor}`}>{stat.change}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Access and Active Campaigns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Access */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-4">Quick Access</h2>
                
                <motion.div
                  className="bg-[#0A150C] rounded-xl p-4 flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex flex-col h-full justify-between gap-20 space-y- pb-">
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="text-green-400 mt-1" size={16} />
                        <div>
                          <p className="text-green-400 text-sm">
                            {schoolData?.city && schoolData?.country 
                              ? `${schoolData.city}, ${schoolData.country}` 
                              : 'Location not set'}
                          </p>
                          <h3 className="text-white font-semibold text-xl">
                            {schoolData?.schoolName || 'School name not set'}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <motion.button
                        onClick={() => navigate('/settings')}
                        className="w-full flex items-center justify-between bg-[#1C271E] hover:bg-[#171f18] px-4 py-2.5 rounded-full transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="">Update School Profile</span>
                        <ArrowRight size={16} />
                      </motion.button>

                      <motion.button
                        onClick={() => navigate('/create')}
                        className="w-full flex items-center justify-between bg-[#16311C] hover:bg-[#122616] px-4 py-2.5 rounded-full transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="">Start a Campaign</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Active Campaigns */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Active Campaigns</h2>
                  <button 
                    onClick={() => navigate('/active-campaigns')}
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
                  {displayCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayCampaigns.map((campaign, index) => (
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
                                className="w-full h-32 object-cover"
                              />
                            ) : (
                              <div className="w-full h-32 bg-gray-600 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
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
                                Raised: ${campaign.amountRaised.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <h3 className="text-green-400 text-lg font-semibold mb-2">No Campaigns</h3>
                      <p className="text-gray-400 text-sm mb-10">
                        Broadcast your challenges to donors who care
                      </p>
                      <motion.button
                        onClick={() => navigate('/create')}
                        className="bg-[#12311A] hover:bg-green-700 text-white px-4 py-2 rounded-2xl transition-colors flex items-center space-x-2 mx-auto text-sm"
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