import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Notifications: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-green-400 font-semibold mb-2">Email</h3>
            <p className="text-gray-300">Get important updates sent straight to your inbox.</p>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-3">
              {emailNotifications ? 'On' : 'Off'}
            </span>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-green-400' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* SMS Notifications */}
      <motion.div
        className="bg-[#0D180F] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-green-400 font-semibold mb-2">SMS</h3>
            <p className="text-gray-300">Get important updates and alerts by SMS.</p>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-3">
              {smsNotifications ? 'On' : 'Off'}
            </span>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smsNotifications ? 'bg-green-400' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;