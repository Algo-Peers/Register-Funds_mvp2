import React from 'react';
import type { StepProps } from './types';

const Step5: React.FC<StepProps> = ({ formData, onInputChange }) => {
  const handleChallengeToggle = (challenge: string) => {
    const updatedChallenges = formData.challenges.includes(challenge)
      ? formData.challenges.filter(c => c !== challenge)
      : [...formData.challenges, challenge];
    onInputChange('challenges', updatedChallenges);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        What best describes the challenges your school faces?
      </h2>
      
      <div className="space-y-4">
        {/* Row 1: Computers & Devices (full width) */}
        <button
          type="button"
          onClick={() => handleChallengeToggle('Computers & Devices')}
          className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
            formData.challenges.includes('Computers & Devices')
              ? 'bg-[#111D14] border border-gray-600 text-green-400'
              : 'bg-[#111D14] border border-gray-600 text-white'
          }`}
        >
          <span className="text-lg font-medium">Computers & Devices</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.challenges.includes('Computers & Devices')
              ? 'border-green-400'
              : 'border-gray-400'
          }`}>
            {formData.challenges.includes('Computers & Devices') && (
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            )}
          </div>
        </button>

        {/* Row 2: Capacity Building, Infrastructure (grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Capacity Building', 'Infrastructure'].map((challenge) => (
            <button
              key={challenge}
              type="button"
              onClick={() => handleChallengeToggle(challenge)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
                formData.challenges.includes(challenge)
                  ? 'bg-[#111D14] border border-gray-600 text-green-400'
                  : 'bg-[#111D14] border border-gray-600 text-white'
              }`}
            >
              <span className="text-lg font-medium">{challenge}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                formData.challenges.includes(challenge)
                  ? 'border-green-400'
                  : 'border-gray-400'
              }`}>
                {formData.challenges.includes(challenge) && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Row 3: Science or STEAM Labs (full width) */}
        <button
          type="button"
          onClick={() => handleChallengeToggle('Science or STEAM Labs')}
          className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
            formData.challenges.includes('Science or STEAM Labs')
              ? 'bg-[#111D14] border border-gray-600 text-green-400'
              : 'bg-[#111D14] border border-gray-600 text-white'
          }`}
        >
          <span className="text-lg font-medium">Science or STEAM Labs</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.challenges.includes('Science or STEAM Labs')
              ? 'border-green-400'
              : 'border-gray-400'
          }`}>
            {formData.challenges.includes('Science or STEAM Labs') && (
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            )}
          </div>
        </button>

        {/* Row 4: School Meals, Health & Wellness (full width) */}
        <button
          type="button"
          onClick={() => handleChallengeToggle('School Meals, Health & Wellness')}
          className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
            formData.challenges.includes('School Meals, Health & Wellness')
              ? 'bg-[#111D14] border border-gray-600 text-green-400'
              : 'bg-[#111D14] border border-gray-600 text-white'
          }`}
        >
          <span className="text-lg font-medium">School Meals, Health & Wellness</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.challenges.includes('School Meals, Health & Wellness')
              ? 'border-green-400'
              : 'border-gray-400'
          }`}>
            {formData.challenges.includes('School Meals, Health & Wellness') && (
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            )}
          </div>
        </button>

        {/* Row 5: Internet Connectivity, Electricity Access (grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Internet Connectivity', 'Electricity Access'].map((challenge) => (
            <button
              key={challenge}
              type="button"
              onClick={() => handleChallengeToggle(challenge)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
                formData.challenges.includes(challenge)
                  ? 'bg-[#111D14] border border-gray-600 text-green-400'
                  : 'bg-[#111D14] border border-gray-600 text-white'
              }`}
            >
              <span className="text-lg font-medium">{challenge}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                formData.challenges.includes(challenge)
                  ? 'border-green-400'
                  : 'border-gray-400'
              }`}>
                {formData.challenges.includes(challenge) && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5;