import { headers, formatResponse, formatError } from './lib/shared';
import * as Sentry from '@sentry/node';

// Initialize Sentry if DSN is available
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 0.1,
    });
}

interface NewsletterSubscriber {
    email: string;
    subscribed_at: string;
    source: string;
    preferences?: {
        daily_digest: boolean;
        breaking_news: boolean;
        promotions: boolean;
    };
}

// In-memory storage for newsletter subscribers (replace with Supabase in production)
const subscribers = new Map<string, NewsletterSubscriber>();

export const handler = async (event: any) => {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method not allowed');
    }

    try {
        const { email, preferences } = JSON.parse(event.body);

        // Validate email
        if (!email || !email.includes('@')) {
            return formatError(400, 'Invalid email address');
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if already subscribed
        if (subscribers.has(normalizedEmail)) {
            return formatResponse(200, {
                success: true,
                message: "You're already subscribed! (We won't tell anyone you tried twice)",
                alreadySubscribed: true
            });
        }

        // Store subscriber
        const subscriber: NewsletterSubscriber = {
            email: normalizedEmail,
            subscribed_at: new Date().toISOString(),
            source: 'website_footer',
            preferences: {
                daily_digest: preferences?.daily_digest ?? true,
                breaking_news: preferences?.breaking_news ?? true,
                promotions: preferences?.promotions ?? false,
            }
        };

        subscribers.set(normalizedEmail, subscriber);

        // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
        // TODO: Store in Supabase table 'newsletter_subscribers'

        console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);

        return formatResponse(200, {
            success: true,
            message: "Welcome to the absurdity! Check your inbox for confirmation.",
            subscriber: {
                email: normalizedEmail,
                subscribed_at: subscriber.subscribed_at
            }
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        Sentry.captureException(error);
        return formatError(500, 'Failed to subscribe. The appliances are being difficult.');
    }
};
