import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { FormData } from './types';
import AuthHeader from "../AuthHeader"
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';

const SignupSteps: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    country: '',
    region: '',
    isGESListed: '',
    emisCode: '',
    schoolType: '',
    challenges: [],
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    saveLogin: false
  });

  const totalSteps = 8;

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      nextStep();
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      formData,
      onInputChange: handleInputChange,
      onNext: nextStep,
      onKeyPress: handleKeyPress
    };

    switch (currentStep) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      case 4:
        return <Step4 {...stepProps} />;
      case 5:
        return <Step5 {...stepProps} />;
      case 6:
        return <Step6 {...stepProps} />;
      case 7:
        return <Step7 {...stepProps} />;
      case 8:
        return <Step8 {...stepProps} />;
      default:
        return null;
    }
  };

  // Progress Bar Component (inline)
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[#020E05]">
      <div className=""><AuthHeader type="signup" /></div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 p-8 lg:px-16 flex flex-col">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-end mb-2">
              <span className="text-sm font-semibold text-green-400">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-[#18231B] rounded-full">
              <motion.div 
                className="bg-green-400 rounded-full py-1"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            {currentStep > 1 && (
              <motion.button
                onClick={prevStep}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </motion.button>
            )}
            
            <div className="flex-1" />
            
            <div className="flex flex-col items-end space-y-2">
              <motion.button
                onClick={currentStep === totalSteps ? () => {
                  console.log('Submit form');
                  navigate('/overview');
                } : nextStep}
                className="bg-[#13391D] text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{currentStep === totalSteps ? 'Start Your Fundraising' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <span className="text-xs text-gray-400">press Enter</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
          <motion.div 
            className="w-full max-w-md bg-[#020E05] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img 
              src="/signup.jpg" 
              alt="School environment" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupSteps;