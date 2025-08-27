import React from 'react';
import type { StepProps } from './types';

const Step6: React.FC<StepProps> = ({ formData, onInputChange, onKeyPress }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Provide your personal information
      </h2>
      <div className="space-y-4">
        <div className="border-b border-white border-opacity-15">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
            placeholder="John"
            onKeyPress={onKeyPress}
          />
        </div>
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
            placeholder="Doe"
            onKeyPress={onKeyPress}
          />
        </div>
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => onInputChange('gender', e.target.value)}
            className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step6;