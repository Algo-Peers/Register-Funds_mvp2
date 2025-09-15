import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useSchoolData } from '../../hooks/useSchoolData';

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const { schoolData, loading, updateSchoolData } = useSchoolData(user?.id || '');
  
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync with Firebase data
  useEffect(() => {
    if (schoolData?.notificationSettings) {
      setEmailNotifications(schoolData.notificationSettings.email);
      setSmsNotifications(schoolData.notificationSettings.sms);
    }
  }, [schoolData]);

  const handleEmailToggle = async () => {
    try {
      setIsUpdating(true);
      const newValue = !emailNotifications;
      setEmailNotifications(newValue);
      
      await updateSchoolData({
        notificationSettings: {
          email: newValue,
          sms: smsNotifications
        }
      });
    } catch (error) {
      console.error('Failed to update email notifications:', error);
      // Revert on error
      setEmailNotifications(!emailNotifications);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSmsToggle = async () => {
    try {
      setIsUpdating(true);
      const newValue = !smsNotifications;
      setSmsNotifications(newValue);
      
      await updateSchoolData({
        notificationSettings: {
          email: emailNotifications,
          sms: newValue
        }
      });
    } catch (error) {
      console.error('Failed to update SMS notifications:', error);
      // Revert on error
      setSmsNotifications(!smsNotifications);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

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
              onClick={handleEmailToggle}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-green-400' : 'bg-gray-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              onClick={handleSmsToggle}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smsNotifications ? 'bg-green-400' : 'bg-gray-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
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