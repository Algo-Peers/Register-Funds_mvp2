export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  campaignId?: string;
}

export interface StripeError {
  error: string;
  details?: string;
}

export interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
  campaignTitle?: string;
}