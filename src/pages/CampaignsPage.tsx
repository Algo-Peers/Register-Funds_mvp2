import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CampaignCard from '../components/CampaignCard';
import { useCampaigns } from '../hooks';

const CampaignsPage: React.FC = () => {
  const [visibleCampaigns, setVisibleCampaigns] = useState(9);
  const [selectedLocation, setSelectedLocation] = useState('All around Ghana');
  const { campaigns, loading, error, refetch } = useCampaigns();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Filter campaigns based on selected location
  const filteredCampaigns = selectedLocation === 'All around Ghana' 
    ? campaigns 
    : campaigns.filter(campaign => {
        const locationString = campaign.location?.fullLocation || 
          `${campaign.location?.city}, ${campaign.location?.country}` || 
          'Unknown Location';
        return locationString.toLowerCase().includes(selectedLocation.toLowerCase());
      });

  const displayedCampaigns = filteredCampaigns.slice(0, visibleCampaigns);

  const loadMoreCampaigns = () => {
    setVisibleCampaigns(prev => Math.min(prev + 6, filteredCampaigns.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          {/* <div className="text-white text-xl">Loading campaigns...</div> */}

          <div className="w-44 h-44 mx-auto mb-4 animate-spin">
            <img 
              src="/Ripple.svg" 
              alt="Loading..." 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-red-400 text-xl">Error loading campaigns: {error}</div>
        </div>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
      <Header />
      
      {/* Header Section with Title and Filter */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 leading-tight font-inter-tight">
                We match every<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>dollar to a School Need
              </h1>
            </motion.div>
            
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full sm:w-auto">
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent border border-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full appearance-none cursor-pointer hover:border-green-400 transition-colors focus:outline-none focus:border-green-400 w-full sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] text-sm sm:text-base"
                >
                  <option value="All around Ghana" className="bg-[#020E05] text-white">All around Ghana</option>
                  <option value="Cape Coast" className="bg-[#020E05] text-white">Cape Coast</option>
                  <option value="Accra" className="bg-[#020E05] text-white">Accra</option>
                  <option value="Kumasi" className="bg-[#020E05] text-white">Kumasi</option>
                  <option value="Tamale" className="bg-[#020E05] text-white">Tamale</option>
                  <option value="Ho" className="bg-[#020E05] text-white">Ho</option>
                  <option value="Sunyani" className="bg-[#020E05] text-white">Sunyani</option>
                </select>
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Campaigns Grid */}
      <section className="pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center text-white py-12">
              <h3 className="text-xl mb-4">No campaigns found</h3>
              <p className="text-gray-400">Try selecting a different location or check back later.</p>
            </div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {displayedCampaigns.map((campaign, index) => (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign.id}
                    image={campaign.mediaUrl || '/students-happy.jpg'}
                    category={campaign.category}
                    location={campaign.location}
                    title={campaign.name}
                    description={campaign.description}
                    currentAmount={campaign.amountRaised || 0}
                    donationTarget={campaign.donationTarget || 1}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Load More Button */}
              {visibleCampaigns < filteredCampaigns.length && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <button 
                    onClick={loadMoreCampaigns}
                    className="bg-[#152C1C] border border-[#485A4D] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 rounded-full font-semibold hover:bg-[#1e251f] transition-all duration-200 transform hover:scale-105 text-sm sm:text-base md:text-lg"
                  >
                    Load More
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;