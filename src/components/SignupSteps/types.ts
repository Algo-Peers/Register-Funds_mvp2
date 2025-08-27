export interface FormData {
  schoolName: string;
  country: string;
  region: string;
  isGESListed: string;
  emisCode: string;
  schoolType: string;
  challenges: string[];
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  saveLogin: boolean;
}

export interface StepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean | string[]) => void;
  onNext: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export interface NavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}