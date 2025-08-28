import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CampaignCard from '../components/CampaignCard';
import { ArrowRight, ArrowLeft, MoveRight } from "lucide-react";
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('All around Ghana');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const campaignData = [
    {
      id: "1",
      image: "/students-happy.jpg",
      category: "Basic Computers",
      location: "Cape Coast, Ghana",
      title: "Support Christ is King Primary School",
      description: "Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.",
      raised: "Raised: $12,000"
    },
    {
      id: "2",
      image: "/students-happy.jpg",
      category: "Basic Computers",
      location: "Cape Coast, Ghana",
      title: "Support Christ is King Primary School",
      description: "Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.",
      raised: "Raised: $12,000"
    },
    {
      id: "3",
      image: "/students-happy.jpg",
      category: "Basic Computers",
      location: "Cape Coast, Ghana",
      title: "Support Christ is King Primary School",
      description: "Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.",
      raised: "Raised: $12,000"
    },
    {
      id: "4",
      image: "/students-happy.jpg",
      category: "Basic Computers",
      location: "Cape Coast, Ghana",
      title: "Support Christ is King Primary School",
      description: "Empower students with access to essential digital learning tools and resources that will boost engagement and expand opportunities.",
      raised: "Raised: $12,000"
    }
  ];

  const partners = [
    "WikiCharities",
    "GlobalAffairs Canada",
    "USAid",
    "MBC"
  ];

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
      <div className="p-10"><Header /></div>
      
      
      {/* Hero Section */}
      <section className="relative xl:max-w-7xl lg:max-w-4xl mx-auto bg-[#111C14] py-20 my-10 rounded-2xl px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Give where it matters, <br />
            directly to classrooms left out and under-resourced.         
          </motion.h1>
          

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-16 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/campaigns">
            <button className="flex items-center border gap-4 justify-end border-green-400 text-green-400 px-6 py-2 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-all duration-200">
              Donate to a Cause      
              <MoveRight />      
            </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Donation Process Section */}
      <section className="py-10 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16">
          <motion.div 
            className="text-start mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Donation on Register Funds is easy, powerful, and trusted            
            </h2>
            <div className="bg-[#162019] h-full w-full rounded-2xl" > 

            </div>
          </motion.div>
          
          <div className="gap-8">
            {[
              {
                step: "1",
                title: "Choose a school’s campaign to support.",
                description: "Select a school or project that resonates with you—whether it’s funding computers, rebuilding a library, or providing school meals."
              },
              {
                step: "2",
                title: "Donate directly, securely to schools.",
                description: "Contribute any amount through our safe, transparent platform. Every dollar goes directly to the school’s campaign."
              },
              {
                step: "3",
                title: "Get reports on real change.",
                description: "Get data-driven reports with metrics, photos, and stories showing how your donation is improving quality education for schoolchildren and teachers."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-6">
                  <div className="border text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {item.step}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-300 mb-8">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#111C14] opacity40 max-w-7xl rounded-2xl mx-auto py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#3EFF71] opacity-85 mb-6">
              We are Backed by
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
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
                <div key={index} className="flex-shrink-0 mx-4">
                  <div className="bg-[#17271C] rounded-full items-center flex p-4 hover:bg-[#0b140e] transition-colors min-w-[200px]">
                    <span className="text-white text-3xl font-medium">{partner}</span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 mx-4">
                  <div className="bg-[#17271C] rounded-full p-4 items-center justify-center flex hover:bg-[#0b140e] transition-colors min-w-[200px]">
                    <span className="text-white text-3xl font-medium">{partner}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campaign Cards Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                We match every <br /> dollar to a School Need
              </h2>


              <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent border border-gray-600 text-white px-16 py-3 justify-between flex rounded-full appearance-none cursor-pointer hover:border-green-400 transition-colors focus:outline-none focus:border-green-400 min-w-[200px]"
                >
                  <option value="All around Ghana" className="bg-[#020E05] text-white">All around Ghana</option>
                  <option value="Cape Coast" className="bg-[#020E05] text-white">Cape Coast</option>
                  <option value="Accra" className="bg-[#020E05] text-white">Accra</option>
                  <option value="Kumasi" className="bg-[#020E05] text-white">Kumasi</option>
                  <option value="Tamale" className="bg-[#020E05] text-white">Tamale</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
            </motion.div>

            
            <motion.div 
              className="hidden md:flex gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="border text-white p-4 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft />
                </button>
                <button 
                  onClick={scrollRight}
                  className="border text-white p-4 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {campaignData.map((campaign, index) => (
              <div key={campaign.id} className="flex-shrink-0 w-80">
                <CampaignCard {...campaign} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;