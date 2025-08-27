import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CampaignCard from '../components/CampaignCard';

const CampaignsPage: React.FC = () => {
  const [visibleCampaigns, setVisibleCampaigns] = useState(9);
  const [selectedLocation, setSelectedLocation] = useState('All around Ghana');

  // Sample campaign data - replace with backend real data later
  const allCampaigns = [
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
      category: "School Supplies",
      location: "Accra, Ghana",
      title: "Support St. Mary's Elementary School",
      description: "Help provide essential school supplies and learning materials to students in need for better educational outcomes.",
      raised: "Raised: $8,500"
    },
    {
      id: "5",
      image: "/students-happy.jpg",
      category: "Infrastructure",
      location: "Kumasi, Ghana",
      title: "Build New Classroom Block",
      description: "Support the construction of a new classroom block to accommodate more students and improve learning conditions.",
      raised: "Raised: $25,000"
    },
    {
      id: "6",
      image: "/students-happy.jpg",
      category: "Library Books",
      location: "Tamale, Ghana",
      title: "Expand School Library Collection",
      description: "Help build a comprehensive library with books and reading materials to enhance literacy and learning.",
      raised: "Raised: $6,200"
    },
    {
      id: "7",
      image: "/students-happy.jpg",
      category: "Science Equipment",
      location: "Ho, Ghana",
      title: "Science Laboratory Equipment",
      description: "Provide essential laboratory equipment and materials for hands-on science education and experiments.",
      raised: "Raised: $15,800"
    },
    {
      id: "8",
      image: "/students-happy.jpg",
      category: "Sports Equipment",
      location: "Sunyani, Ghana",
      title: "Sports and Recreation Facilities",
      description: "Support physical education with sports equipment and facilities for student health and development.",
      raised: "Raised: $9,400"
    },
    {
      id: "9",
      image: "/students-happy.jpg",
      category: "Water & Sanitation",
      location: "Bolgatanga, Ghana",
      title: "Clean Water and Sanitation Project",
      description: "Improve school sanitation facilities and provide clean water access for better health and hygiene.",
      raised: "Raised: $18,600"
    },
    {
      id: "10",
      image: "/students-happy.jpg",
      category: "Teacher Training",
      location: "Cape Coast, Ghana",
      title: "Professional Development for Teachers",
      description: "Support teacher training programs to enhance educational quality and teaching methodologies.",
      raised: "Raised: $11,300"
    },
    {
      id: "11",
      image: "/students-happy.jpg",
      category: "Nutrition Program",
      location: "Wa, Ghana",
      title: "School Feeding Program",
      description: "Provide nutritious meals to students to improve attendance, health, and learning outcomes.",
      raised: "Raised: $22,100"
    },
    {
      id: "12",
      image: "/students-happy.jpg",
      category: "Technology",
      location: "Techiman, Ghana",
      title: "Digital Learning Initiative",
      description: "Introduce tablets and digital learning tools to modernize education and improve student engagement.",
      raised: "Raised: $16,700"
    }
  ];

  const displayedCampaigns = allCampaigns.slice(0, visibleCampaigns);

  const loadMoreCampaigns = () => {
    setVisibleCampaigns(prev => Math.min(prev + 6, allCampaigns.length));
  };

  return (
     <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100">
      <Header />
      
      {/* Header Section with Title and Filter */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight font-inter-tight">
                We match every<br />
                dollar to a School Need
              </h1>
            </motion.div>
            
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
                  className="bg-transparent border border-gray-600 text-white px-6 py-3 rounded-full appearance-none cursor-pointer hover:border-green-400 transition-colors focus:outline-none focus:border-green-400 min-w-[200px]"
                >
                  <option value="All around Ghana" className="bg-[#020E05] text-white">All around Ghana</option>
                  <option value="Cape Coast" className="bg-[#020E05] text-white">Cape Coast</option>
                  <option value="Accra" className="bg-[#020E05] text-white">Accra</option>
                  <option value="Kumasi" className="bg-[#020E05] text-white">Kumasi</option>
                  <option value="Tamale" className="bg-[#020E05] text-white">Tamale</option>
                  <option value="Ho" className="bg-[#020E05] text-white">Ho</option>
                  <option value="Sunyani" className="bg-[#020E05] text-white">Sunyani</option>
                  <option value="Bolgatanga" className="bg-[#020E05] text-white">Bolgatanga</option>
                  <option value="Wa" className="bg-[#020E05] text-white">Wa</option>
                  <option value="Techiman" className="bg-[#020E05] text-white">Techiman</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Campaigns Grid */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {displayedCampaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                image={campaign.image}
                category={campaign.category}
                location={campaign.location}
                title={campaign.title}
                description={campaign.description}
                raised={campaign.raised}
                index={index}
              />
            ))}
          </motion.div>

          {/* Load More Button */}
          {visibleCampaigns < allCampaigns.length && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={loadMoreCampaigns}
                className="bg-green-400 text-white opacity-100 stroke-black px-4 py-2 rounded-full font-semibold hover:bg-green-500 transition-all duration-200 transform hover:scale-105"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;