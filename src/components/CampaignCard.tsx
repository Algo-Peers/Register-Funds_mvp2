import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CampaignCardProps {
  id: string;
  image: string;
  category: string;
  location: {
    city: string;
    country: string;
    fullLocation?: string;
  };
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

  const progressPercentage = Math.min((currentAmount / donationTarget) * 100, 100);

  // Improved text truncation for better consistency
  const truncatedTitle = title.length > 45 ? title.substring(0, 60) + '...' : title;
  const truncatedDescription = description.length > 100 ? description.substring(0, 200) + '...' : description;
  const locationText = location.fullLocation || `${location.city}, ${location.country}`;
  const truncatedLocation = locationText.length > 25 ? locationText.substring(0, 25) + '...' : locationText;

  return (
    <motion.div
      className="bg-[#1C2F21] rounded-2xl shadow-lg overflow-hidden cursor-pointer h-[420px] flex flex-col w-full"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleCardClick}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Fixed height image container */}
      <div className="relative h-44 p-3 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-55 text-white backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium max-w-[calc(100%-2rem)] truncate">
          {category}
        </div>
      </div>
      
      {/* Content container with controlled spacing */}
      <div className="px-4 py-2 flex flex-col flex-grow min-h-0">
        {/* Location with fixed height */}
        <div className="flex items-center text-xs text-green-500 mb-2 h-5">
          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{truncatedLocation}</span>
        </div>
        
        {/* Title with fixed height */}
        <h3 className="text-lg font-bold text-white mb-2 h-12 leading-tight overflow-hidden">
          <span className="line-clamp-2">{truncatedTitle}</span>
        </h3>
        
        {/* Description with controlled height */}
        <p className="text-white text-sm leading-relaxed mb-4 flex-grow overflow-hidden">
          <span className="line-clamp-3">{truncatedDescription}</span>
        </p>
        
        {/* Progress section */}
        <div className="mt-auto h-12 flex flex-col justify-end">
          <div className="w-full bg-[#324A38] rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="text-left">
            <span className="text-sm text-white font-medium">
              Raised: ${currentAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;