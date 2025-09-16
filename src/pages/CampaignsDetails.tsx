import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { useSchoolData } from '../hooks/useSchoolData';

const CampaignsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getCampaignById } = useCampaigns();
  const { schoolData } = useSchoolData(campaign?.schoolId || '');

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  // Fetch campaign data on component mount
  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) {
        setError('No campaign ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const campaignData = await getCampaignById(id);
        
        if (campaignData) {
          setCampaign(campaignData);
        } else {
          setError('Campaign not found');
        }
      } catch (err) {
        setError('Failed to load campaign');
        console.error('Error fetching campaign:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020E05] text-white flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/Ripple.svg" 
            alt="Loading..." 
            className="w-44 h-44 mx-auto mb-4 animate-spin"
          />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-[#020E05] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Campaign not found'}</p>
          <Link to="/campaigns" className="text-green-400 hover:text-green-300">
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for features not yet implemented in backend - replace with conditional rendering
  const recentDonors = campaign.donors || [];
  const comments = campaign.comments || [];
  const reports = campaign.reports || [];

  const locationDisplay = campaign.location ? 
    (campaign.location.fullLocation || `${campaign.location.city}, ${campaign.location.country}`) : 
    'Location not specified';
  const progressPercentage = Math.min((campaign.amountRaised / campaign.donationTarget) * 100, 100);
  const donationCount = Math.floor(campaign.amountRaised / 50);
  const schoolName = schoolData?.schoolName || campaign.schoolName || 'School Name';
  const organizerName = schoolData?.contactName || 'Campaign Organizer';

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100 text-white">
      <Header />
      
      {/* Back Button */}
      <Link to="/campaigns">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.button 
            className="flex items-center text-white bg-[#132418] rounded-full px-4 py-2 hover:text-green-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>
        </div>
      </Link>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
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
                className="mb-8"
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
              <button className="bg-[#112517] rounded-full text-xl font-bold py-3 px-6 mb-4">
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

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mb-12 max-w-xl w-full border-b border-[#273F2D]"
            >
              <div className='flex mb-4 max-w-full w-full gap-4'>
                <Link to={`/donate/${campaign.id}`} className="flex-1">
                  <button className="w-full bg-[#112416] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a3620] transition-colors">
                    Donate 
                  </button>
                </Link>
                <button 
                  onClick={openShareModal}
                  className="flex-1 bg-[#112416] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a3620] transition-colors"
                >
                  Share
                </button>
              </div>
            </motion.div>

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

            {/* Organizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-12"
            >
              <h3 className="text-xl font-bold text-green-400 mb-6">Organizer</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className='flex gap-4'>
                  <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {organizerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{organizerName}</h4>
                    <p className="text-gray-400 text-sm">{schoolName}</p>
                  </div>
                </div>
              
                <button className="bg-[#121F15] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#1a2b1f] transition-colors">
                  Send Message
                  <ArrowRight className="inline-block ml-2" size={16} />
                </button>
              </div>
            </motion.div>

            {/* On Behalf of */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-12"
            >
              <div className="pt-4">
                <h3 className='text-xl font-bold text-green-400 mb-6'>On Behalf of</h3>
                <h5 className="text-white font-semibold mb-1">{schoolName}</h5>
                <p className="text-gray-400 text-sm mb-2">{locationDisplay}</p>
                {schoolData?.schoolType && (
                  <p className="text-gray-400 text-sm mb-2">{schoolData.schoolType}</p>
                )}

                <button className="bg-[#121F15] text-white px-4 py-2 rounded-full font-semibold mb-4 hover:bg-[#1a2b1f] transition-colors">
                  View School Profile
                  <ArrowRight className="inline-block ml-2" size={16} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Donation Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1F3B26] rounded-3xl p-6 mb-2 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white block">
                      {campaign.currency} {campaign.amountRaised.toLocaleString()} donated
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span>{campaign.currency} {campaign.donationTarget.toLocaleString()} Goal</span>
                      <span>•</span>
                      <span>{donationCount} donations</span>
                    </div>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#445248]"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-400"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${progressPercentage}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-base">{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Link to={`/donate/${campaign.id}`}>
                  <button className="w-full bg-[#132418] text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
                    Donate
                  </button>
                </Link>
                <button 
                  onClick={openShareModal}
                  className="w-full bg-[#132418] text-white py-3 rounded-full font-semibold hover:bg-[#1a3620] transition-colors"
                >
                  Share Campaign
                </button>
              </div>

              {/* Recent Donors */}
              <div className="border-t border-[#273F2D] pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-400">{donationCount} people have donated</span>
                </div>

                <div className="space-y-4">
                  {recentDonors.length > 0 ? (
                    recentDonors.map((donor: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div>
                          <div className="font-medium text-white">{donor.name}</div>
                          <div className="text-sm text-gray-400">{donor.amount}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No donors</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeShareModal}>
          <div className="bg-[#1F3B26] rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Share Campaign</h3>
            <p className="text-gray-300 mb-4">Share this campaign with your friends and family to help reach the goal!</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Facebook
              </button>
              <button className="flex-1 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                Twitter
              </button>
              <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                WhatsApp
              </button>
            </div>
            <button 
              onClick={closeShareModal}
              className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsDetails;