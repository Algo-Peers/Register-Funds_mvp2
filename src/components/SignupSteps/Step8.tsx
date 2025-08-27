import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { StepProps } from './types';

const Step8: React.FC<StepProps> = ({ formData, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-start mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Almost done!</h2>
        <p className="text-gray-300">Secure your account to get started</p>
        <p className="text-sm text-gray-400 mt-2">
          Password must have letters, numbers, and symbols.<br />
          Minimum 8 characters required.
        </p>
      </div>
      <div className="space-y-4">
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enter password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="space-y-3 mt-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => onInputChange('acceptTerms', e.target.checked)}
              className="mt-1 w-4 h-4 text-green-400 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
            />
            <span className="text-sm text-gray-300">
              I accept the Terms & Conditions
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step8;