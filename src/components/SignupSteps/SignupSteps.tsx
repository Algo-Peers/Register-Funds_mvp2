import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import type { FormData } from './types';
import { useAuth } from '../../hooks/useAuth';
import AuthHeader from "../AuthHeader"
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import {
  validateSchoolName,
  validateRequired,
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateTermsAcceptance,
  validateChallenges,
  validateEMISCode
} from '../../utils/validation';

interface ValidationErrors {
  [key: string]: string;
}

const SignupSteps: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
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

  const validateCurrentStep = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        const schoolNameValidation = validateSchoolName(formData.schoolName);
        if (!schoolNameValidation.isValid) {
          errors.schoolName = schoolNameValidation.error!;
          isValid = false;
        }
        break;

      case 2:
        const countryValidation = validateRequired(formData.country, 'Country');
        if (!countryValidation.isValid) {
          errors.country = countryValidation.error!;
          isValid = false;
        }
        break;

      case 3:
        const regionValidation = validateRequired(formData.region, 'Region');
        if (!regionValidation.isValid) {
          errors.region = regionValidation.error!;
          isValid = false;
        }
        break;

      case 4:
        const gesValidation = validateRequired(formData.isGESListed, 'GES listing status');
        if (!gesValidation.isValid) {
          errors.isGESListed = gesValidation.error!;
          isValid = false;
        }
        
        if (formData.isGESListed === 'yes') {
          const emisValidation = validateEMISCode(formData.emisCode, true);
          if (!emisValidation.isValid) {
            errors.emisCode = emisValidation.error!;
            isValid = false;
          }
        }
        break;

      case 5:
        const schoolTypeValidation = validateRequired(formData.schoolType, 'School type');
        if (!schoolTypeValidation.isValid) {
          errors.schoolType = schoolTypeValidation.error!;
          isValid = false;
        }
        break;

      case 6:
        const challengesValidation = validateChallenges(formData.challenges);
        if (!challengesValidation.isValid) {
          errors.challenges = challengesValidation.error!;
          isValid = false;
        }
        break;

      case 7:
        const firstNameValidation = validateName(formData.firstName, 'First name');
        const lastNameValidation = validateName(formData.lastName, 'Last name');
        const genderValidation = validateRequired(formData.gender, 'Gender');
        const emailValidation = validateEmail(formData.email);
        const phoneValidation = validatePhone(formData.phone);

        if (!firstNameValidation.isValid) {
          errors.firstName = firstNameValidation.error!;
          isValid = false;
        }
        if (!lastNameValidation.isValid) {
          errors.lastName = lastNameValidation.error!;
          isValid = false;
        }
        if (!genderValidation.isValid) {
          errors.gender = genderValidation.error!;
          isValid = false;
        }
        if (!emailValidation.isValid) {
          errors.email = emailValidation.error!;
          isValid = false;
        }
        if (!phoneValidation.isValid) {
          errors.phone = phoneValidation.error!;
          isValid = false;
        }
        break;

      case 8:
        const passwordValidation = validatePassword(formData.password);
        const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
        const termsValidation = validateTermsAcceptance(formData.acceptTerms);

        if (!passwordValidation.isValid) {
          errors.password = passwordValidation.error!;
          isValid = false;
        }
        if (!confirmPasswordValidation.isValid) {
          errors.confirmPassword = confirmPasswordValidation.error!;
          isValid = false;
        }
        if (!termsValidation.isValid) {
          errors.acceptTerms = termsValidation.error!;
          isValid = false;
        }
        break;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        toast.success(`Step ${currentStep} completed!`);
      }
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      await register(formData);
      toast.dismiss(loadingToast);
      toast.success('Account created successfully! Welcome to RegisterFunds!');
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/campaigns');
      }, 1500);
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting && !authLoading) {
      if (currentStep === totalSteps) {
        handleSubmit();
      } else {
        nextStep();
      }
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      formData,
      onInputChange: handleInputChange,
      onNext: nextStep,
      onKeyPress: handleKeyPress,
      validationErrors,
      isLoading: isSubmitting || authLoading
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

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  const isLoading = isSubmitting || authLoading;

  return (
    <div className="h-screen bg-[#020E05] flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#132418',
            color: '#fff',
            border: '1px solid #235F33'
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff'
            }
          }
        }}
      />
      
      <div className=""><AuthHeader type="signup" /></div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 p-4 lg:px-8 flex flex-col">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-[#18231B] rounded-full">
                <motion.div 
                  className="bg-green-400 rounded-full py-1"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-semibold text-green-400 min-w-[40px]">{progressPercentage}%</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto">
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
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
            {currentStep > 1 && (
              <motion.button
                onClick={prevStep}
                disabled={isLoading}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </motion.button>
            )}
            
            <div className="flex-1" />
            
            <div className="flex flex-col items-end space-y-1">
              <motion.button
                onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                disabled={isLoading}
                className="bg-[#13391D] text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{currentStep === totalSteps ? 'Creating Account...' : 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === totalSteps ? 'Start Your Fundraising' : 'Continue'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
              {!isLoading && (
                <span className="text-xs text-gray-400"></span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="lg:w-1/2 p-4 lg:p-8 flex items-center justify-center">
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