import { collection, addDoc, serverTimestamp, doc, updateDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/Firebase';

export interface PaymentData {
  paymentIntentId: string;
  amount: number;
  currency: string;
  campaignId: string;
  donorInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: 'pending' | 'succeeded' | 'failed';
  stripeData?: any;
  createdAt?: any;
  updatedAt?: any;
}

// Export DonorInfo interface
export interface DonorInfo {
  name: string;
  amount: string;
  currency: string;
  date: string;
  email?: string;
}

export const paymentService = {
  // Create initial payment record when payment intent is created
  async createPaymentRecord(paymentData: Omit<PaymentData, 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        ...paymentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating payment record:', error);
      throw error;
    }
  },

  // Update payment record when payment is completed
  async updatePaymentRecord(paymentId: string, updates: Partial<PaymentData>): Promise<void> {
    try {
      const paymentRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating payment record:', error);
      throw error;
    }
  },

  // Fetch total raised amount for a campaign from payments collection
  async getRaisedAmountByCampaignId(campaignId: string): Promise<number> {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef, 
        where('campaignId', '==', campaignId),
        where('status', '==', 'succeeded')
      );
      
      const querySnapshot = await getDocs(q);
      let totalRaised = 0;
      
      querySnapshot.forEach((doc) => {
        const payment = doc.data();
        totalRaised += payment.amount || 0;
      });
      
      return totalRaised;
    } catch (error) {
      console.error('Error fetching raised amount:', error);
      return 0; // Return 0 if there's an error to prevent breaking the UI
    }
  },

  // Fetch recent donors for a campaign from payments collection
  async getRecentDonorsByCampaignId(campaignId: string, limitCount: number = 10): Promise<DonorInfo[]> {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef,
        where('campaignId', '==', campaignId),
        where('status', '==', 'succeeded'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const donors: DonorInfo[] = [];
      
      querySnapshot.forEach((doc) => {
        const payment = doc.data();
        const donorInfo = payment.donorInfo;
        
        if (donorInfo) {
          const donorName = `${donorInfo.firstName || ''} ${donorInfo.lastName || ''}`.trim() || 'Anonymous';
          const donorAmount = `$${(payment.amount || 0).toLocaleString()}`;
          const donorDate = payment.createdAt?.toDate ? 
            payment.createdAt.toDate().toLocaleDateString() : 
            new Date().toLocaleDateString();
          
          donors.push({
            name: donorName,
            amount: donorAmount,
            currency: payment.currency || 'USD',
            date: donorDate,
            email: donorInfo.email
          });
        }
      });
      
      return donors;
    } catch (error) {
      console.error('Error fetching recent donors:', error);
      return []; // Return empty array if there's an error
    }
  },

  // Get donation count for a campaign
  async getDonationCountByCampaignId(campaignId: string): Promise<number> {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef,
        where('campaignId', '==', campaignId),
        where('status', '==', 'succeeded')
      );
      
      const querySnapshot = await getDocs(q);
      const donationCount = querySnapshot.size;
      
      return donationCount;
    } catch (error) {
      console.error('Error fetching donation count:', error);
      return 0;
    }
  },

  // Log successful payment with full Stripe data
  async logSuccessfulPayment(paymentIntentId: string, stripePaymentIntent: any, donorInfo: any, campaignId?: string): Promise<void> {
    try {
      // Determine if this is a test payment
      const isTestPayment = paymentIntentId.startsWith('pi_test_') || 
                           process.env.NODE_ENV === 'development';
      
      const paymentLogData = {
        paymentIntentId,
        amount: stripePaymentIntent.amount / 100, // Convert from cents
        currency: stripePaymentIntent.currency,
        campaignId: campaignId || stripePaymentIntent.metadata?.campaignId || 'unknown',
        donorInfo,
        status: stripePaymentIntent.status,
        isTestPayment,
        environment: process.env.NODE_ENV || 'development',
        stripeData: {
          id: stripePaymentIntent.id,
          amount: stripePaymentIntent.amount,
          currency: stripePaymentIntent.currency,
          status: stripePaymentIntent.status,
          created: stripePaymentIntent.created,
          payment_method: stripePaymentIntent.payment_method || null,
          metadata: stripePaymentIntent.metadata || {}, // Provide empty object instead of undefined
        },
        timestamp: serverTimestamp(),
        logType: 'payment_success',
      };
      
await addDoc(collection(db, 'payment_logs'), paymentLogData);
      
      // Also create a record in the payments collection
      const paymentData = {
        paymentIntentId,
        amount: stripePaymentIntent.amount / 100,
        currency: stripePaymentIntent.currency,
        campaignId: campaignId || stripePaymentIntent.metadata?.campaignId || 'unknown',
        donorInfo,
        status: 'succeeded' as const,
        stripeData: {
          ...stripePaymentIntent,
          metadata: stripePaymentIntent.metadata || {}, // Ensure metadata is never undefined
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
await addDoc(collection(db, 'payments'), paymentData);
      
    } catch (error) {
      console.error('Error logging payment to Firestore:', error);
      
      // Type guard to safely access error properties
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message
        });
      }
      
      // Don't throw the error to prevent breaking the payment flow
      // Just log it for debugging
    }
  },

  // Log failed payment attempts
  async logFailedPayment(paymentIntentId: string, error: string, donorInfo?: any, campaignId?: string): Promise<void> {
    try {
      const failureLogData = {
        paymentIntentId,
        error,
        donorInfo,
        campaignId: campaignId || 'unknown',
        timestamp: serverTimestamp(),
        logType: 'payment_failure',
        environment: process.env.NODE_ENV || 'development',
      };
      
await addDoc(collection(db, 'payment_logs'), failureLogData);
    } catch (error) {
      console.error('Error logging payment failure:', error);
    }
  }
};