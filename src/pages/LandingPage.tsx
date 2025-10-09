import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CampaignCard from '../components/CampaignCard';
import { ArrowRight, ArrowLeft, MoveRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks';

const LandingPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('All around Ghana');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { campaigns, loading, error, refetch } = useCampaigns();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Memoize scroll functions to prevent unnecessary re-renders
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }, []);

  // Memoize filtered campaigns to prevent unnecessary recalculations
  const filteredCampaigns = useMemo(() => {
    const normalizedSelected = selectedLocation.trim().toLowerCase();
    if (normalizedSelected === 'all around ghana') return campaigns;

    return campaigns.filter((campaign) => {
      const loc = campaign.location as unknown;

      // Safely derive a string location from possible shapes
      let locationText = '';
      if (typeof loc === 'string') {
        locationText = loc;
      } else if (loc && typeof loc === 'object') {
        const obj = loc as { city?: string; country?: string; fullLocation?: string };
        locationText = obj.city || obj.fullLocation || '';
      }

      return locationText.trim().toLowerCase() === normalizedSelected;
    });
  }, [campaigns, selectedLocation]);

  const partners = [
    "WikiCharities", "GlobalAffairs Canada", "USAid", "MBC"
  ];

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
      <div className="p-4 sm:p-6 md:p-8 lg:p-10"><Header /></div>
      
      {/* Hero Section */}
      <section className="relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-[#111C14] py-12 sm:py-16 md:py-20 my-6 sm:my-8 md:my-10 rounded-2xl px-4 sm:px-6">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Give where it matters, <br className="hidden sm:block" />
            directly to classrooms left out and under-resourced.         
          </motion.h1>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-8 sm:pt-12 md:pt-16 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/campaigns">
            <button className="flex items-center border gap-2 sm:gap-4 justify-center sm:justify-end border-gray-400 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-base sm:text-lg hover:bg-[#020E05] transition-all duration-200 w-full sm:w-auto">
              Donate to a Cause      
              <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />      
            </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Donation Process Section */}
      <section className="py-8 sm:py-10 mb-16 sm:mb-24 md:mb-32 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <motion.div 
            className="text-start mb-8 lg:mb-16 order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Donation on Register Funds is easy, powerful, and trusted            
            </h2>
            <div className="bg-[#162019] h-48 sm:h-64 md:h-80 lg:h-full w-full rounded-2xl"> </div>
          </motion.div>
          
          <div className="gap-4 sm:gap-6 md:gap-8 order-1 lg:order-2">
            {[
              {
                step: "1",
                title: "Choose a school's campaign to support.",
                description: "Select a school or project that resonates with you—whether it's funding computers, rebuilding a library, or providing school meals."
              },
              {
                step: "2",
                title: "Donate directly, securely to schools.",
                description: "Contribute any amount through our safe, transparent platform. Every dollar goes directly to the school's campaign."
              },
              {
                step: "3",
                title: "Get reports on real change.",
                description: "Get data-driven reports with metrics, photos, and stories showing how your donation is improving quality education for schoolchildren and teachers."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-left mb-6 sm:mb-8 last:mb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="border text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0">
                    {item.step}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-[#111C14] py-12 sm:py-16 md:py-20 my-6 sm:my-8 md:my-10 rounded-2xl px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3EFF71] opacity-85 mb-4 sm:mb-6">
              We are Backed by
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie 
              ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor 
              ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.             
            </p>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex animate-scroll">
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 mx-2 sm:mx-4">
                  <div className="bg-[#17271C] rounded-full items-center flex p-2 sm:p-3 px-4 sm:px-6 hover:bg-[#0b140e] transition-colors min-w-[120px] sm:min-w-[160px] md:min-w-[200px]">
                    <span className="text-white text-sm sm:text-lg md:text-2xl font-medium">{partner}</span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 mx-2 sm:mx-4">
                  <div className="bg-[#17271C] rounded-full p-2 sm:p-3 px-4 sm:px-6 items-center justify-center flex hover:bg-[#0b140e] transition-colors min-w-[120px] sm:min-w-[160px] md:min-w-[200px]">
                    <span className="text-white text-sm sm:text-lg md:text-2xl font-medium">{partner}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campaign Cards Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-6 lg:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                We match every <br className="hidden sm:block" /> dollar to a School Need
              </h2>

              <motion.div
              className="flex items-center w-full sm:w-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full sm:w-auto">
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent border border-gray-600 text-white px-8 sm:px-12 md:px-16 py-2 sm:py-3 justify-between flex rounded-full appearance-none cursor-pointer hover:border-green-400 transition-colors focus:outline-none focus:border-green-400 w-full sm:min-w-[200px] md:min-w-[250px] text-sm sm:text-base"
                >
                  <option value="All around Ghana" className="bg-[#020E05] text-white">All around Ghana</option>
                  <option value="Cape Coast" className="bg-[#020E05] text-white">Cape Coast</option>
                  <option value="Accra" className="bg-[#020E05] text-white">Accra</option>
                  <option value="Kumasi" className="bg-[#020E05] text-white">Kumasi</option>
                  <option value="Tamale" className="bg-[#020E05] text-white">Tamale</option>
                </select>
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
            </motion.div>

            <motion.div 
              className="hidden md:flex gap-2 lg:gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="border text-white p-3 sm:p-4 rounded-full hover:bg-[#040a05] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={scrollRight}
                  className="border text-white p-3 sm:p-4 rounded-full hover:bg-[#040a05] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-72 sm:w-80 md:w-96">
                  <div className="bg-[#162019] rounded-2xl p-4 animate-pulse">
                    <div className="bg-gray-700 h-48 rounded-xl mb-4"></div>
                    <div className="bg-gray-700 h-4 rounded mb-2"></div>
                    <div className="bg-gray-700 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-700 h-6 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="text-red-400 text-center w-full py-8">
                Error loading campaigns: {error}
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="text-gray-400 text-center w-full py-8">
                No campaigns found for the selected location.
              </div>
            ) : (
              filteredCampaigns.map((campaign, index) => (
                <div key={campaign.id} className="flex-shrink-0 w-72 sm:w-80 md:w-96">
                  <CampaignCard 
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
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;