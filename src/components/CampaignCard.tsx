import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CampaignCardProps {
  id: string;
  image: string;
  category: string;
  location: string;
  title: string;
  description: string;
  raised: string;
  index: number;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  image,
  category,
  location,
  title,
  description,
  raised,
  index
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/campaigns/${id}`);
  };

  // Extract the raised amount and calculate progress (example calculation)
  const raisedAmount = parseInt(raised.replace(/[^0-9]/g, '')) || 0;
  const targetAmount = 20000; // Example target amount
  const progressPercentage = Math.min((raisedAmount / targetAmount) * 100, 100);

  return (
    <motion.div
      className="bg-[#21442A] opacity-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#000000] opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-green-400 text-sm mb-2">{location}</p>
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 leading-none">{description}</p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-green-400 h-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        
        <p className="text-white font-semibold">{raised}</p>
      </div>
    </motion.div>
  );
};

export default CampaignCard;