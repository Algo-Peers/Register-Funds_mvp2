import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';
import { useSchoolData } from '../../hooks/useSchoolData';

// Define interfaces locally
interface ExtendedCampaign extends Campaign {
  comments?: Array<{
    name: string;
    amount: string;
    date: string;
    comment: string;
  }>;
  reports?: Array<{
    name: string;
    size: string;
  }>;
}

interface CampaignMainContentProps {
  campaign: Campaign;
  showFullDescription: boolean;
  setShowFullDescription: (show: boolean) => void;
  openShareModal: () => void;
  actualRaisedAmount?: number;
  donationCount?: number;
  hideActions?: boolean; // New prop to hide Donate, Organizer, and "on Behalf of" sections
}

const CampaignMainContent: React.FC<CampaignMainContentProps> = ({
  campaign,
  showFullDescription,
  setShowFullDescription,
  openShareModal,
  hideActions = false
}) => {
  const { schoolData } = useSchoolData(campaign?.schoolId || '');

  // Mock data for features not yet implemented in backend
  const extendedCampaign = campaign as ExtendedCampaign;
  const comments = extendedCampaign.comments || [];
  const reports = extendedCampaign.reports || [];

  const locationDisplay = campaign.location ? 
    (campaign.location.fullLocation || `${campaign.location.city}, ${campaign.location.country}`) : 
    'Location not specified';
  
  const schoolName = schoolData?.schoolName || campaign?.schoolName || 'School Name';
  const organizerName = schoolData?.contactName || 'Campaign Organizer';

  return (
    <>
      {/* Location and School Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center text-green-400 mb-2">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {locationDisplay}
        </div>
        <h1 className="text-4xl font-bold mb-6">{campaign.name}</h1>
      </motion.div>

      {/* Campaign Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <img 
          src={campaign.mediaUrl || '/students-happy.jpg'} 
          alt={campaign.name}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
      </motion.div>

      {/* Additional Images Gallery */}
      {campaign.additionalImages && campaign.additionalImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-2"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {campaign.additionalImages.slice(0, 4).map((imageUrl: string, index: number) => (
              <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Campaign image ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Challenge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8 py-8 max-w-xl"
      >
        <button className="bg-[#112517] rounded-full text-xl font-bold py-2 px-4 mb-4">
          {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
        </button>
        <div className="text-gray-300 leading-relaxed">
          <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {campaign.description}
          </p>
          {!showFullDescription && campaign.description && campaign.description.length > 200 && (
            <button 
              onClick={() => setShowFullDescription(true)}
              className="text-white opacity-65 mt-2 font-semibold"
            >
              Read more
            </button>
          )}
        </div>
      </motion.div>

      {/* Action Buttons - Conditionally rendered */}
      {!hideActions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-4 mb-12 max-w-xl w-full border-b border-[#273F2D]"
        >
          <div className='flex mb-4 max-w-full w-full gap-4'>
            <button className="flex-1 bg-[#112416] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a3620] transition-colors">
              Donate 
            </button>
            <button 
              onClick={openShareModal}
              className="flex-1 bg-[#112416] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a3620] transition-colors"
            >
              Share
            </button>
          </div>
        </motion.div>
      )}

      {/* Recent Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-green-400 opacity-85 mb-6">Recent Updates</h2>
        <div className="max-w-xl">
          <div className="flex items-center mb-4">
            <span className="text-white font-semibold">Campaign Organizer</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            Thank you for your continued support! We're making great progress towards our goal of {campaign.currency} {campaign.donationTarget.toLocaleString()}. 
            Every donation brings us closer to making a real difference in education.
          </p>
          {campaign.additionalImages && campaign.additionalImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-4">
              {campaign.additionalImages.slice(0, 4).map((imageUrl: string, i: number) => (
                <img 
                  key={i}
                  src={imageUrl}
                  alt={`Update image ${i + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              ))}
            </div>
          )}
          <button className="text-white opacity-65 font-semibold">
            See older updates
          </button>
        </div>
      </motion.div>

      {/* Reports & Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-green-400 opacity-85 mb-6">Reports & Relevant Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          {reports.length > 0 ? (
            reports.map((report: any, index: number) => (
              <div key={index} className="bg-[#121F15] rounded-full px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#1a2b1f] transition-colors">
                <div className="flex items-center gap-3">
                  <FileDown className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold text-sm">{report.name}</p>
                    <p className="text-white text-xs opacity-50">{report.size}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Reports not provided</p>
          )}
        </div>
      </motion.div>

      {/* Comments from Donors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-green-400 mb-6">Comments from Donors</h2>
        <div className="space-y-6 max-w-xl">
          {comments.length > 0 ? (
            comments.map((comment: any, index: number) => (
              <div key={index} className="">
                <div className="flex items-center mb-4">
                  <img src="/Donor1.svg" alt="" className='mr-4 w-10 h-10'/>
                  <div>
                    <div className="flex items-center">
                      <span className="text-white font-semibold mr-2">{comment.name}</span>
                      <span className="text-green-400 mr-2">•</span>
                      <span className="text-green-400 font-semibold mr-4">{comment.amount}</span>
                      <span className="text-gray-400 text-sm">{comment.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Comments not provided</p>
          )}
        </div>
      </motion.div>

      {/* Organizer - Conditionally rendered */}
      {!hideActions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6">Organizer</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 sm:max-w-xl">
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0">
                {organizerName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-semibold text-sm sm:text-base truncate">{organizerName}</h4>
                <p className="text-gray-400 text-xs sm:text-sm">ICT Coordinator</p>
              </div>
            </div>
          
            <button className="bg-[#121F15] text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#1a2b1f] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto flex-shrink-0">
              Send Message
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* On Behalf of - Conditionally rendered */}
      {!hideActions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className='text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6'>on Behalf of</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 sm:max-w-xl">
            <div className="min-w-0 flex-1">
              <h5 className="text-white font-semibold mb-1 text-sm sm:text-base truncate">{schoolName}</h5>
              <p className="text-gray-400 text-xs sm:text-sm">{locationDisplay}</p>
            </div>

            <button className="bg-[#121F15] text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#1a2b1f] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto flex-shrink-0">
              View School Profile
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CampaignMainContent;