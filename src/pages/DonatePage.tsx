import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import PaymentForm from '../components/PaymentForm';
import { useCampaigns } from '../hooks/useCampaigns';
import { paymentService } from '../services/paymentService';

const DonatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getCampaignById } = useCampaigns();
  
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [tipAmount] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [showStripeForm, setShowStripeForm] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) {
        setError('Campaign ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const campaignData = await getCampaignById(id);
        setCampaign(campaignData);
        setError(null);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const presetAmounts = [50, 100, 150, 250];
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString()); // Display preset amount in custom input
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount) || 0;
    return 0;
  };

  const getTotalDonation = () => {
    return getCurrentAmount() + tipAmount;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      alert('Please fill in all required fields');
      return;
    }

    if (getCurrentAmount() < 0.5) {
      alert('Minimum donation amount is $0.50');
      return;
    }

    // Show Stripe payment form
    setShowStripeForm(true);
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Log successful payment to Firestore with campaign ID
      await paymentService.logSuccessfulPayment(
        paymentIntent.id,
        paymentIntent,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        id // Pass the campaign ID from URL params
      );
      
      // Show success toast message before navigation
      toast.success(
        `🎉 Thank you ${formData.firstName}! Your $${getCurrentAmount().toFixed(2)} donation to ${campaign.name} was successful!`,
        {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '500px',
          },
        }
      );

      // Navigate after a short delay to allow user to see the success message
      setTimeout(() => {
        navigate('/campaigns', { 
          state: { 
            message: `Thank you ${formData.firstName} for your donation of $${getCurrentAmount().toFixed(2)} to ${campaign.name}!` 
          }
        });
      }, 1500);
    } catch (error) {
      console.error('Error logging payment:', error);
      // Still show success message and navigate even if logging fails
      toast.success(
        `🎉 Thank you ${formData.firstName}! Your $${getCurrentAmount().toFixed(2)} donation to ${campaign.name} was successful!`,
        {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '500px',
          },
        }
      );

      setTimeout(() => {
        navigate('/campaigns', { 
          state: { 
            message: `Thank you ${formData.firstName} for your donation of $${getCurrentAmount().toFixed(2)} to ${campaign.name}!` 
          }
        });
      }, 1500);
    }
  };

  const handlePaymentError = async (error: string) => {
    console.error('Payment failed:', error);
    
    try {
      // Log failed payment to Firestore with campaign ID
      await paymentService.logFailedPayment(
        'unknown', // We might not have payment intent ID for failed payments
        error,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        id // Pass the campaign ID from URL params
      );
    } catch (logError) {
      console.error('Error logging payment failure:', logError);
    }
    
    setShowStripeForm(false); // Go back to form
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020E05] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <img src="/Ripple.svg" alt="Loading" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 animate-spin" />
          <p className="text-base sm:text-lg">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-[#020E05] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-base sm:text-lg text-red-400 mb-4">{error || 'Campaign not found'}</p>
          <button 
            onClick={() => navigate('/campaigns')}
            className="bg-[#132418] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100 text-white">
      {/* Add Toaster component for success messages */}
      <Toaster />
      <div className='p-4 sm:p-6 lg:p-10'><Header /></div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4">
        <motion.button 
          onClick={() => navigate(-1)}
          className="flex items-center bg-[#132418] text-white px-3 sm:px-4 py-2 rounded-full hover:text-green-300 text-sm sm:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back
        </motion.button>
      </div>

      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-2xl mx-auto py-2 sm:py-4 px-4 sm:px-8 md:px-12 lg:px-14 rounded-xl bg-[#1F3F27] mx4 sm:mx-auto">
        {/* Campaign Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 text-start"
        >
          <div className="mb-4 sm:mb-6">
            <img 
              src={campaign.mediaUrl || "/students-happy.jpg"} 
              alt={campaign.name}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
            />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-2 font-bold">You're donating to</p>
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-white">{campaign.name}</h1>
        </motion.div>

        {!showStripeForm ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg"
          >
            {/* Amount Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-green-400 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Enter your donation</h3>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-2 sm:py-3 px-2 sm:px-4 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base ${
                      selectedAmount === amount
                        ? 'bg-[#1c3020] text-white'
                        : 'bg-[#2D5037] text-white hover:bg-[#3a6b47]'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex items-center justify-between bg-[#2D5037] rounded-full px-3 sm:px-4 py-2 sm:py-3">
                <span className="text-lg sm:text-2xl">$</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-lg sm:text-xl text-right focus:outline-none flex-1 ml-2"
                />
              </div>
            </div>

            {/* Tip Section */}
            <div className="mb-6 sm:mb-8 rounded-lg">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Tip RegisterFunds services</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">
                Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. 
                Quam tortor facilisi varius molestie ut quam sit euismod maecenas.
              </p>
            </div>

            {/* Donor Information Form */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-green-400 text-base sm:text-lg font-semibold mb-4 sm:mb-6">Your Information</h3>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-[#2D5037] text-white placeholder-white px-3 sm:px-4 py-2 sm:py-3 rounded-full focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full bg-[#2D5037] text-white placeholder-white px-3 sm:px-4 py-2 sm:py-3 rounded-full focus:outline-none text-sm sm:text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full bg-[#2D5037] text-white placeholder-white px-3 sm:px-4 py-2 sm:py-3 rounded-full focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="border-t border-[#3D5A45] pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <span className="text-base sm:text-lg font-semibold text-white">Your Total Donation</span>
                <span className="text-xl sm:text-2xl font-bold text-green-400">${getTotalDonation().toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#235F33] border border-[#40724E] text-white py-3 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#2a6b3d] transition-colors"
              >
                Continue to Payment
              </button>

              <p className="text-gray-400 text-xs sm:text-sm text-center mt-3 sm:mt-4 leading-relaxed px-2 sm:px-0">
                By clicking 'Continue to Payment', you agree to <br className="hidden sm:block" /> RegisterFunds' Terms of Service and Privacy <br className="hidden sm:block" /> Notice. 
                Learn more about pricing and fees.
              </p>
            </div>
          </motion.form>
        ) : (
          /* Secure Stripe Payment Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h3 className="text-green-400 text-base sm:text-lg font-semibold mb-4">Complete Your Donation</h3>
              <div className="space-y-2 mb-4 p-4 bg-[#2D5037] rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">Donor:</span>
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Amount:</span>
                  <span className="text-green-400 font-bold">${getCurrentAmount().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* In the PaymentForm component usage */}
            <PaymentForm
              amount={getCurrentAmount()}
              campaignId={id}
              donorInfo={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
              }}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />

            <button
              onClick={() => setShowStripeForm(false)}
              className="w-full mt-4 bg-[#2D5037] text-white py-2 sm:py-3 rounded-full hover:bg-[#3a6b47] transition-colors"
            >
              Back to Donation Form
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonatePage;