import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import QuickShare from '../components/QuickShare';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { paymentService } from '../services/paymentService';
import CampaignMainContent from '../components/Campaigns/CampaignMainContent';

// DonorInfo interface
interface DonorInfo {
  name: string;
  amount: string;
  currency: string;
  date: string;
  email?: string;
}

const CampaignsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualRaisedAmount, setActualRaisedAmount] = useState<number>(0);
  const [recentDonors, setRecentDonors] = useState<DonorInfo[]>([]);
  const [donationCount, setDonationCount] = useState<number>(0);

  const { getCampaignById } = useCampaigns();

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
          
          // Fetch actual payment data from payments collection
          const [raisedAmount, donors, donationsCount] = await Promise.all([
            paymentService.getRaisedAmountByCampaignId(id),
            paymentService.getRecentDonorsByCampaignId(id, 10),
            paymentService.getDonationCountByCampaignId(id)
          ]);
          
          setActualRaisedAmount(raisedAmount);
          setRecentDonors(donors);
          setDonationCount(donationsCount);
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

  // Use actual raised amount from payments collection instead of campaign.amountRaised
  const currentRaisedAmount = actualRaisedAmount || campaign?.amountRaised || 0;
  const progressPercentage = Math.min((currentRaisedAmount / campaign?.donationTarget) * 100, 100);

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
            <CampaignMainContent
              campaign={campaign}
              showFullDescription={showFullDescription}
              setShowFullDescription={setShowFullDescription}
              openShareModal={openShareModal}
              actualRaisedAmount={actualRaisedAmount}
              donationCount={donationCount}
            />
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
                      {campaign.currency} {currentRaisedAmount.toLocaleString()} donated
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
                  Share
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
                  {recentDonors && recentDonors.length > 0 ? (
                    recentDonors.map((donor, index) => (
                      <div key={`donor-${index}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {donor?.name ? donor.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <div className="font-medium text-white">{donor?.name || 'Anonymous'}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <span>{donor?.amount || '$0'}</span>
                            <span>•</span>
                            <span>{donor?.date || 'Recently'}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No donations yet</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* QuickShare Modal */}
      {campaign && (
        <QuickShare
          isOpen={isShareModalOpen}
          onClose={closeShareModal}
          campaign={{
            name: campaign.name || 'Campaign',
            url: window.location.href
          }}
        />
      )}
    </div>
  );
};

export default CampaignsDetails;