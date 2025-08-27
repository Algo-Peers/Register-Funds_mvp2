import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="text-white py-4 px-6 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Register</span>
          <span className="bg-green-400 px-2 py-1 rounded text-sm font-semibold">
            FUNDS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-green-400 transition-colors duration-200">
            Home
          </Link>
          <Link to="/campaigns" className="hover:text-green-400 transition-colors duration-200">
            Campaigns
          </Link>
          <Link to="/about" className="hover:text-green-400 transition-colors duration-200">
            About Register
          </Link>

          <Link to="/donors" className="hidden md:block border border-green-400 text-green-400 px-4 py-2 rounded-full hover:bg-green-400 hover:text-gray-900 transition-all duration-200">
            For Donors →
          </Link>
          <Link to="/signup" className="flex items-center bg-[#379751] opacity-30 text-white px-4 py-2 rounded-full font-semibold hover:bg-[#21442A] transition-all duration-200">
            For Schools
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;