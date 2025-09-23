import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { paymentService } from '../services/paymentService';

// Validate that we have a publishable key
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  console.error('VITE_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(publishableKey);

interface PaymentFormProps {
  amount: number;
  campaignId?: string;
  donorInfo?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({
  amount,
  campaignId,
  donorInfo,
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      const error = 'Stripe has not loaded yet. Please try again.';
      toast.error(error);
      onError?.(error);
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent on the server
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount),
          campaignId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.clientSecret) {
        throw new Error('No client secret received from server');
      }

      const { clientSecret } = responseData;
      
      // Confirm the payment with the card element
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.error('Payment confirmation error:', error);
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        // Remove the duplicate toast - DonatePage handles the success message
        onSuccess?.(paymentIntent);
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      
      // Log error to Firestore if donor info is available
      if (donorInfo) {
        try {
          await paymentService.logFailedPayment('unknown', errorMessage, donorInfo);
        } catch (logError) {
          console.error('Error logging payment failure:', logError);
        }
      }
      
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-800 rounded-lg">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Information
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Amount: ${amount.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : `Donate $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm;