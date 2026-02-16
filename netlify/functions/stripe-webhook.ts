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

// Stripe is optional
let stripe: Stripe | null = null;
let endpointSecret: string;

try {
    if (process.env.STRIPE_SECRET_KEY) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    }
} catch {
    console.log('[Stripe] Not installed or configured');
}

export const handler = async (event: HandlerEvent) => {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method not allowed');
    }

    // If Stripe is not configured, return success (for development)
    if (!stripe) {
        console.log('[Stripe Webhook] Stripe not configured, skipping');
        return formatResponse(200, { received: true, mock: true });
    }

    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    try {
        // Verify webhook signature
        if (endpointSecret && sig) {
            stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
        } else {
            // For development without webhook secret
            stripeEvent = JSON.parse(event.body);
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Webhook signature verification failed:', message);
        return formatError(400, `Webhook Error: ${message}`);
    }

    // Handle the event
    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed': {
                const session = stripeEvent.data.object;
                const { userId, tier } = session.metadata || {};

                console.log(`[Webhook] Payment succeeded for user ${userId}, tier: ${tier}`);

                // TODO: Update user's subscription status in Supabase
                // await supabase
                //     .from('profiles')
                //     .update({ 
                //         is_subscribed: true, 
                //         subscription_tier: tier,
                //         subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                //     })
                //     .eq('id', userId);

                // TODO: Add user to Hall of Shame
                // TODO: Send welcome email

                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = stripeEvent.data.object;
                console.log(`[Webhook] Subscription renewed: ${invoice.subscription}`);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = stripeEvent.data.object;
                console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);

                // TODO: Update user's subscription status in Supabase
                // await supabase
                //     .from('profiles')
                //     .update({ is_subscribed: false, subscription_tier: null })
                //     .eq('stripe_customer_id', subscription.customer);

                break;
            }

            default:
                console.log(`[Webhook] Unhandled event type: ${stripeEvent.type}`);
        }

        return formatResponse(200, { received: true });

    } catch (error) {
        console.error('Webhook processing error:', error);
        Sentry.captureException(error);
        return formatError(500, 'Webhook processing failed');
    }
};
