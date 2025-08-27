import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Overview',
      path: '/overview',
      active: location.pathname === '/overview'
    },
    {
      icon: Heart,
      label: 'Campaigns',
      path: '/campaign',
      active: location.pathname === '/campaign'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      active: location.pathname === '/settings'
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/help',
      active: location.pathname === '/help'
    }
  ];

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  return (
    <div className={`bg-[#0A160D] text-white h-screen w-64 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link to="/">
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold text-xl">Register</span>
          <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-sm font-medium">
            FUNDS
          </span>
        </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'text-green-400 border-l-4 border-green-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;