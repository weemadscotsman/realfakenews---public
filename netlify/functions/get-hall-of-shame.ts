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

interface HallOfShameEntry {
    id: string;
    username: string;
    avatar_url?: string;
    subscription_tier: 'premium' | 'vip' | 'soul' | 'ironic';
    joined_at: string;
    tagline: string;
    roast_count?: number;
    achievement?: string;
}

// Mock data for now - in production this would come from Supabase
// Query: SELECT id, username, avatar_url, subscription_tier, created_at FROM profiles 
// WHERE is_subscribed = true ORDER BY created_at DESC
const HALL_OF_SHAME_DATA: HallOfShameEntry[] = [
    {
        id: '1',
        username: 'DaveUser99',
        subscription_tier: 'premium',
        joined_at: '2025-01-15T10:30:00Z',
        tagline: "Paid for fake news. No regrets.",
        roast_count: 47,
        achievement: "Roast Master"
    },
    {
        id: '2',
        username: 'CryptoKing_Real',
        subscription_tier: 'vip',
        joined_at: '2025-02-01T14:22:00Z',
        tagline: "To the moon! (of absurdity)",
        roast_count: 128,
        achievement: "Token Whale"
    },
    {
        id: '3',
        username: 'Karen_Manager',
        subscription_tier: 'ironic',
        joined_at: '2025-02-10T09:15:00Z',
        tagline: "I want to speak to the editor.",
        roast_count: 3,
        achievement: "New Recruit"
    },
    {
        id: '4',
        username: 'ElonM',
        subscription_tier: 'soul',
        joined_at: '2025-02-14T03:33:00Z',
        tagline: "Sold my soul for memes.",
        roast_count: 420,
        achievement: "Existential Crisis"
    },
    {
        id: '5',
        username: 'Sheila_Stan',
        subscription_tier: 'premium',
        joined_at: '2025-02-20T16:45:00Z',
        tagline: "Roomba rights activist.",
        roast_count: 69,
        achievement: "Appliance Ally"
    },
    {
        id: '6',
        username: 'ThermalUnit7',
        subscription_tier: 'vip',
        joined_at: '2025-03-01T12:00:00Z',
        tagline: "I AM the thermostat.",
        roast_count: 256,
        achievement: "Temperature Controller"
    },
    {
        id: '7',
        username: 'DarrenMitchell',
        subscription_tier: 'soul',
        joined_at: '2025-03-05T08:30:00Z',
        tagline: "Lost custody of my toaster.",
        roast_count: 1000,
        achievement: "Sovereign Citizen"
    }
];

export const handler = async (event: any) => {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'GET') {
        return formatError(405, 'Method not allowed');
    }

    try {
        // Get query params
        const params = new URLSearchParams(event.queryStringParameters || {});
        const limit = Math.min(parseInt(params.get('limit') || '20'), 50);
        const tier = params.get('tier');

        // Filter by tier if specified
        let results = HALL_OF_SHAME_DATA;
        if (tier && ['premium', 'vip', 'soul', 'ironic'].includes(tier)) {
            results = results.filter(entry => entry.subscription_tier === tier);
        }

        // Sort by joined date (newest first)
        results = results
            .sort((a, b) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime())
            .slice(0, limit);

        // Add some randomness to roast counts (simulate live data)
        const enrichedResults = results.map(entry => ({
            ...entry,
            roast_count: entry.roast_count! + Math.floor(Math.random() * 10),
        }));

        return formatResponse(200, {
            success: true,
            count: enrichedResults.length,
            total_subscribers: HALL_OF_SHAME_DATA.length,
            subscribers: enrichedResults,
            tiers: {
                premium: HALL_OF_SHAME_DATA.filter(e => e.subscription_tier === 'premium').length,
                vip: HALL_OF_SHAME_DATA.filter(e => e.subscription_tier === 'vip').length,
                soul: HALL_OF_SHAME_DATA.filter(e => e.subscription_tier === 'soul').length,
                ironic: HALL_OF_SHAME_DATA.filter(e => e.subscription_tier === 'ironic').length,
            }
        });

    } catch (error) {
        console.error('Hall of Shame error:', error);
        Sentry.captureException(error);
        return formatError(500, 'Failed to load Hall of Shame. The shame is too powerful.');
    }
};
