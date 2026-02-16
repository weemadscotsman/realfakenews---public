import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe not configured' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
  });

  try {
    const userId = event.queryStringParameters?.userId;
    const customerId = event.queryStringParameters?.customerId;

    if (!userId && !customerId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing user or customer ID' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // If we have a customer ID, fetch subscription details from Stripe
    if (customerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        limit: 1,
      });

      const subscription = subscriptions.data[0];

      if (!subscription) {
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            isSubscribed: false,
            tier: 'free',
            status: 'inactive',
          }),
          headers: { 'Content-Type': 'application/json' },
        };
      }

      // Get price details
      const priceId = subscription.items.data[0]?.price.id;
      const price = priceId ? await stripe.prices.retrieve(priceId) : null;

      return {
        statusCode: 200,
        body: JSON.stringify({
          isSubscribed: subscription.status === 'active' || subscription.status === 'trialing',
          tier: subscription.metadata?.tier || 'premium',
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          price: price ? {
            amount: price.unit_amount,
            currency: price.currency,
            interval: price.recurring?.interval,
          } : null,
        }),
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Otherwise return basic status
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        isSubscribed: false,
        tier: 'free',
        status: 'inactive',
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Get subscription status error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to get subscription status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler };
