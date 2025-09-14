import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';

const SignupPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-[#020E05]">
      {/* Header */}
      <motion.header 
        className="text-white sticky p-10 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AuthHeader type="signup" />
      </motion.header>

      {/* Main Content - Centered */}
      <div className="flex items-center justify-center px-8">
        <motion.div 
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-semibold text-white text-lg tracking-wide">
              <span className='text-green-400'>REGISTERFUNDS </span>
               FOR SCHOOLS
            </h4>
          </motion.div>
          
          <motion.h1 
            className="text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
          Signup to Get the <br />
          Support for Your School Needs
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-lg mb-12 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Create your free account and start building your fundraising campaign.
          </motion.p>

          {/* Begin your Fundraising Journey Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/signup-steps">
              <motion.button
                className="bg-[#12311A] text-white px-8 py-2 rounded-full font-semibold text-lg hover:bg-[#09190d] transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Begin your Fundraising Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;