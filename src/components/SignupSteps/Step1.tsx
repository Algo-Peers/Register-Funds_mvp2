import React from 'react';
import type { StepProps } from './types';

const Step1: React.FC<StepProps> = ({ formData, onInputChange, onKeyPress }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Please provide the information about your school
      </h2>
      <div className="space-y-4">
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            School name
          </label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => onInputChange('schoolName', e.target.value)}
            className="w-full px- py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
            placeholder="Cape Coast DA Primary School"
            onKeyDown={onKeyPress}
          />
        </div>
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => onInputChange('country', e.target.value)}
            className="w-full px- py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
            placeholder="Ghana"
            onKeyDown={onKeyPress}
          />
        </div>
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Region/City
          </label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => onInputChange('region', e.target.value)}
            className="w-full px- py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none"
            placeholder="Cape Coast"
            onKeyDown={onKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;