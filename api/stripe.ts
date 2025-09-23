import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Validate that we have a Stripe secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { amount, currency = 'usd', campaignId } = req.body;

    // Validate input
    if (!amount || typeof amount !== 'number' || amount < 0.5) {
      return res.status(400).json({ 
        error: 'Amount must be at least $0.50 USD' 
      });
    }

    console.log('Creating payment intent for amount:', amount);

    // Create a PaymentIntent with explicit payment method types
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      payment_method_types: ['card'],
      metadata: {
        campaignId: campaignId || 'unknown',
      },
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    
    // Handle different types of Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).json({ 
        error: 'Stripe error: ' + error.message,
        type: error.type,
        code: error.code
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}