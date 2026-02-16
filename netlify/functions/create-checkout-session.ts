import { headers, formatResponse, formatError } from './lib/shared';
import * as Sentry from '@sentry/node';
import Stripe from 'stripe';

// Initialize Sentry if DSN is available
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 0.1,
    });
}

interface HandlerEvent {
  httpMethod: string;
  body: string;
  headers: Record<string, string>;
}

// Stripe is optional - if not configured, we'll mock the flow
let stripe: Stripe | null = null;
try {
    if (process.env.STRIPE_SECRET_KEY) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
} catch {
    console.log('[Stripe] Not installed or configured');
}

const PRICE_IDS: Record<string, { price: number; name: string; description: string }> = {
    monthly: {
        price: 999, // $9.99 in cents
        name: 'RealFake Premium',
        description: 'Monthly subscription to premium fake news'
    },
    soul: {
        price: 666, // $6.66 in cents
        name: 'Soul Contract',
        description: 'Eternal subscription (until heat death of universe)'
    },
    ironic: {
        price: 250, // £2.50 in cents (but we'll charge in USD)
        name: 'Ironic Tier',
        description: 'You get literally nothing. Thanks for the money.'
    }
};

export const handler = async (event: HandlerEvent) => {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method not allowed');
    }

    try {
        const { tier, userId, email } = JSON.parse(event.body);

        // Validate tier
        if (!tier || !PRICE_IDS[tier]) {
            return formatError(400, 'Invalid subscription tier');
        }

        // Validate user
        if (!userId || !email) {
            return formatError(400, 'User authentication required');
        }

        const tierConfig = PRICE_IDS[tier];
        const origin = event.headers.origin || 'https://realfakenews.netlify.app';

        // If Stripe is not configured, return mock success URL
        if (!stripe) {
            console.log(`[Mock Checkout] Tier: ${tier}, User: ${userId}`);
            
            // In development/mock mode, redirect to a success page with mock params
            const mockSessionId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            return formatResponse(200, {
                url: `${origin}/membership?success=true&session_id=${mockSessionId}&tier=${tier}&mock=true`,
                mock: true,
                message: 'Stripe not configured - running in demo mode'
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            client_reference_id: userId,
            metadata: {
                userId,
                tier,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tierConfig.name,
                            description: tierConfig.description,
                        },
                        unit_amount: tierConfig.price,
                        recurring: tier === 'monthly' ? { interval: 'month' } : undefined,
                    },
                    quantity: 1,
                },
            ],
            mode: tier === 'monthly' ? 'subscription' : 'payment',
            success_url: `${origin}/membership?success=true&session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
            cancel_url: `${origin}/membership?canceled=true`,
        });

        return formatResponse(200, { url: session.url });

    } catch (error) {
        console.error('Checkout session error:', error);
        Sentry.captureException(error);
        return formatError(500, 'Failed to create checkout session. The payment portal is having an existential crisis.');
    }
};
