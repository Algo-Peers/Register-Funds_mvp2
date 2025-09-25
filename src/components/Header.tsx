import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClassName = (path: string, baseClasses: string = "hover:text-green-400 transition-colors duration-200") => {
    return isActive(path) 
      ? `text-green-400 font-semibold ${baseClasses}` 
      : `text-white ${baseClasses}`;
  };

  const getButtonClassName = (path: string, activeClasses: string, inactiveClasses: string) => {
    return isActive(path) ? activeClasses : inactiveClasses;
  };

  return (
    <motion.header 
      className="text-white opacity-100 py-4 px-6 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold">Register</span>
          <span className="bg-[#379751] px-2 py-1 rounded text-sm font-semibold text-opacity-100">
            FUNDS
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={getLinkClassName('/')}>
            Home
          </Link>
          <Link to="/campaigns" className={getLinkClassName('/campaigns')}>
            Campaigns
          </Link>
          <Link to="/about" className={getLinkClassName('/about')}>
            About Register
          </Link>

          <Link 
            to="/donate" 
            className={`border px-4 py-2 rounded-full transition-all duration-200 ${getButtonClassName(
              '/donate',
              'border-green-400 bg-green-400 bg-opacity-20 text-green-400 font-semibold',
              'border-[#2A352D] text-white hover:bg-green-400 hover:text-gray-900'
            )}`}
          >
            For Donors →
          </Link>
          <Link 
            to="/signup" 
            className={`flex items-center border px-4 py-2 rounded-full font-semibold transition-all duration-200 ${getButtonClassName(
              '/signup',
              'border-green-400 bg-green-400 bg-opacity-30 text-green-400',
              'border-[#314A37] bg-[#379751] bg-opacity-30 text-white hover:bg-[#21442A]'
            )}`}
          >
            For Schools
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mt-4 pb-4 border-t border-gray-700"
        >
          <nav className="flex flex-col space-y-4 pt-4">
            <Link 
              to="/" 
              className={`${getLinkClassName('/')} px-2 py-1`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/campaigns" 
              className={`${getLinkClassName('/campaigns')} px-2 py-1`}
              onClick={() => setIsMenuOpen(false)}
            >
              Campaigns
            </Link>
            <Link 
              to="/about" 
              className={`${getLinkClassName('/about')} px-2 py-1`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Register
            </Link>
            <Link 
              to="/donate" 
              className={`border px-4 py-2 rounded-full transition-all duration-200 text-center ${getButtonClassName(
                '/donate',
                'border-green-400 bg-green-400 bg-opacity-20 text-green-400 font-semibold',
                'border-[#2A352D] text-white hover:bg-green-400 hover:text-gray-900'
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              For Donors →
            </Link>
            <Link 
              to="/signup" 
              className={`flex items-center justify-center border px-4 py-2 rounded-full font-semibold transition-all duration-200 ${getButtonClassName(
                '/signup',
                'border-green-400 bg-green-400 bg-opacity-30 text-green-400',
                'border-[#314A37] bg-[#379751] bg-opacity-30 text-white hover:bg-[#21442A]'
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              For Schools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;