import React from 'react';
import type { StepProps } from './types';

const Step3: React.FC<StepProps> = ({ formData, onInputChange, onKeyPress }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Please provide your school's credentials for verification
      </h2>
      <div className='border-b border-white border-opacity-15'>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          EMIS Code
        </label>
        <input
          type="text"
          value={formData.emisCode}
          onChange={(e) => onInputChange('emisCode', e.target.value)}
          className="w-full py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
          placeholder="GHS829382"
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default Step3;