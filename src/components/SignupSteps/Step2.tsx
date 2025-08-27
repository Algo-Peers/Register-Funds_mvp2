import React from 'react';
import type { StepProps } from './types';

const Step2: React.FC<StepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Is your school listed on Ghana Education Service (GES)?
      </h2>
      <div className="space-y-4">
        {['Yes', 'No'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onInputChange('isGESListed', option)}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-full border transition-all duration-200 ${
              formData.isGESListed === option
                ? 'bg-[#111D14] border border-gray-600 text-green-400'
                : 'bg-[#111D14] border border-gray-600 text-white'
            }`}
          >
            <span className="text-lg font-medium">{option}</span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              formData.isGESListed === option
                ? 'border-green-400'
                : 'border-gray-400'
            }`}>
              {formData.isGESListed === option && (
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step2;