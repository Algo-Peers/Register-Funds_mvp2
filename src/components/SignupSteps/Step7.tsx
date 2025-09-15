import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { StepProps } from './types';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: '+233', name: 'Ghana', flag: '/ghana.svg' },
  { code: '+234', name: 'Nigeria', flag: '/nigeria.jpg' },
  { code: '+254', name: 'Kenya', flag: '/kenya.jpeg' },
  // { code: '+27', name: 'South Africa', flag: '/south-africa.png,' },
  { code: '+1', name: 'United States', flag: '/usa.png' },
  { code: '+44', name: 'United Kingdom', flag: '/uk.png' },
];

const Step7: React.FC<StepProps> = ({ formData, onInputChange, onKeyPress, validationErrors, isLoading }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamic placeholder based on selected country
  const getPhonePlaceholder = (countryCode: string) => {
    switch (countryCode) {
      case '+233': return '24 123 4567';
      case '+234': return '80 1234 5678';
      case '+254': return '70 123 4567';
      case '+27': return '82 123 4567';
      case '+1': return '555 123 4567';
      case '+44': return '7700 123456';
      default: return '123 456 7890';
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    // might want to clear the phone number when country changes
    onInputChange('phone', '');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Provide your contact information
      </h2>
      <div className="space-y-4">
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none ${
              validationErrors?.email ? 'border-red-500' : ''
            }`}
            placeholder="john@email.com"
            onKeyPress={onKeyPress}
            disabled={isLoading}
          />
          {validationErrors?.email && (
            <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>
        
        <div className='border-b border-white border-opacity-15'>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone number
          </label>
          <div className="flex space-x-2">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-3 bg-[#020E05] text-white focus:outline-none hover:bg-gray-800 transition-colors duration-200 min-w-[100px]"
              >
                <img 
                  src={selectedCountry.flag} 
                  alt={selectedCountry.name}
                  className="w-5 h-4 object-cover rounded-sm"
                  onError={(e) => {
                    // Fallback if flag image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-sm">{selectedCountry.code}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#111D14] border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto scrollbar-hide">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 text-white"
                    >
                      <img 
                        src={country.flag} 
                        alt={country.name}
                        className="w-6 h-4 object-cover rounded-sm"
                        onError={(e) => {
                          // Fallback if flag image doesn't exist
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-sm font-medium">{country.code}</span>
                      <span className="text-sm text-gray-300">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className={`flex-1 px-4 py-3 bg-[#020E05] text-white placeholder-gray-400 focus:outline-none ${
                validationErrors?.phone ? 'border-red-500' : ''
              }`}
              placeholder={getPhonePlaceholder(selectedCountry.code)}
              onKeyPress={onKeyPress}
              disabled={isLoading}
            />
          </div>
          {validationErrors?.phone && (
            <p className="text-red-400 text-sm mt-1">{validationErrors.phone}</p>
          )}
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Step7;