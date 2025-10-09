import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Donors: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#020E05] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Construction Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
            <Construction className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Donors Page
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-lg mb-2"
        >
          Coming Soon
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 mb-8 leading-relaxed"
        >
          We're working hard to bring you an amazing donors experience. 
          This page is currently under development and will be available soon.
        </motion.p>

        {/* Back to Home Button */}
        <motion.button
          onClick={handleBackToHome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-3xl font-medium transition-colors duration-200 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default Donors;