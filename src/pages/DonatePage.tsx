import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const DonatePage: React.FC = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [tipAmount] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const presetAmounts = [50, 100, 150, 250];
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
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
    // Handle donation submission
    console.log('Donation submitted:', {
      amount: getCurrentAmount(),
      tip: tipAmount,
      total: getTotalDonation(),
      formData
    });
  };

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100 text-white">
      <div className='p-10'><Header /></div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.button 
          onClick={() => navigate(-1)}
          className="flex items-center bg-[#132418] text-white px-4 py-2 rounded-full hover:text-green-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </motion.button>
      </div>

      <div className="max-w-2xl mx-auto py-4 mb-4 px-14 rounded-xl pb-12 bg-[#1F3F27]">
        {/* Campaign Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-start"
        >
          <div className="mb-6">
            <img 
              src="/public/students-happy.jpg" 
              alt="Support Christ is King Primary School"
              className="w-full max-w-xl mx-auto h-48 object-cover rounded-lg"
            />
          </div>
          <p className="text-2xl mb-2 font-bold">You're donating to</p>
          <h1 className="text-xl fontbold text-white">Support Christ is King Primary School</h1>
        </motion.div>

        {/* Donation Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className=" rounded-lg"
        >
          {/* Amount Selection */}
          <div className="mb-8">
            <h3 className="text-green-400 text-lg font-semibold mb-4">Enter your donation</h3>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-full borde font-semibold transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'bg-[#1c3020] text-white'
                      : 'bg-[#2D5037] text-white hover:bg-'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex items-center justify-between bg-[#2D5037] rounded-full px-4 py-3">
              <span className="text-2xl text-gray-400">$</span>
              <input
                type="text"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-white text-xl text-right focus:outline-none flex-1 ml-2"
              />
            </div>
          </div>

          {/* Tip Section */}
          <div className="mb-8 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Tip RegisterFunds services</h4>
            <p className="text-gray-300 text-sm mb-4">
              Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. 
              Quam tortor facilisi varius molestie ut quam sit euismod maecenas.
            </p>
          </div>

          {/* Payment Form */}
          <div className="mb-8">
            <h3 className="text-green-400 text-lg font-semibold mb-6">Donate with Debit or Credit Card</h3>
            
            <div className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
              </div>

              {/* Name on Card */}
              <div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={formData.nameOnCard}
                  onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                  className="w-full bg-[#2D5037] text-white px-4 py-3 rounded-full focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Total and Submit */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-white">Your Total Donation</span>
              <span className="text-2xl font-bold text-green-400">${getTotalDonation().toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#235F33] text-white py-3 rounded-full font-bold text-lg"
            >
              Donate Now
            </button>

            <p className="text-gray-400 text-sm text-center mt-4 leading-relaxed">
              By clicking 'Donate now', you agree to <br /> RegisterFunds' Terms of Service and Privacy <br /> Notice. 
              Learn more about pricing and fees.
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default DonatePage;