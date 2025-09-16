export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-zA-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }
  return { isValid: true };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all spaces, dashes, parentheses, and plus signs for validation
  const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
  
  // Check if it contains only digits and is between 7-15 digits (international standard)
  if (!/^\d{7,15}$/.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number (7-15 digits)' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validateName = (name: string, fieldName: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters and spaces` };
  }
  return { isValid: true };
};

export const validateSchoolName = (schoolName: string): ValidationResult => {
  if (!schoolName.trim()) {
    return { isValid: false, error: 'School name is required' };
  }
  if (schoolName.trim().length < 3) {
    return { isValid: false, error: 'School name must be at least 3 characters long' };
  }
  return { isValid: true };
};

export const validateEMISCode = (emisCode: string, isRequired: boolean = false): ValidationResult => {
  if (!isRequired && !emisCode.trim()) {
    return { isValid: true };
  }
  if (isRequired && !emisCode.trim()) {
    return { isValid: false, error: 'EMIS code is required' };
  }
  if (emisCode && !/^[A-Z0-9]{6,12}$/i.test(emisCode)) {
    return { isValid: false, error: 'EMIS code must be 6-12 alphanumeric characters' };
  }
  return { isValid: true };
};

export const validateChallenges = (challenges: string[]): ValidationResult => {
  if (challenges.length === 0) {
    return { isValid: false, error: 'Please select at least one challenge' };
  }
  return { isValid: true };
};

export const validateTermsAcceptance = (acceptTerms: boolean): ValidationResult => {
  if (!acceptTerms) {
    return { isValid: false, error: 'You must accept the Terms & Conditions to continue' };
  }
  return { isValid: true };
};


// Country code mapping for phone number formatting
const countryCodeMap: { [key: string]: string } = {
  'Ghana': '+233',
  'Nigeria': '+234', 
  'Kenya': '+254',
  'South Africa': '+27',
  'United States': '+1',
  'United Kingdom': '+44',
};

export const formatPhoneWithCountryCode = (phone: string, country: string): string => {
  if (!phone || !country) return phone || 'No phone';
  
  const countryCode = countryCodeMap[country];
  if (!countryCode) return phone;
  
  // Remove any existing country code or special characters
  const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '').replace(/^233|^234|^254|^27|^1|^44/, '');
  
  // Format as: +CountryCode PhoneNumber (without country name)
  return `${countryCode} ${cleanPhone}`;
};