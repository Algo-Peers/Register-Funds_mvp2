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
  currentAmount: number;
  donationTarget: number;
  index: number;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  image,
  category,
  location,
  title,
  description,
  currentAmount,
  donationTarget,
  index
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/campaigns/${id}`);
  };

  // Calculate progress percentage
  const progressPercentage = Math.min((currentAmount / donationTarget) * 100, 100);
  
  // Format the raised amount
  const formattedRaised = `Raised: $${currentAmount.toLocaleString()}`;

  return (
    <motion.div
      className="bg-[#203F28] opacity-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
          className="w-full h-48 object-cover p-2 rounded-md"
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
          <div className="w-full bg-[#34543D] rounded-full h-2">
            <motion.div 
              className="bg-[#379751] h-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        
        <p className="text-white font-semibold">{formattedRaised}</p>
      </div>
    </motion.div>
  );
};

export default CampaignCard;