import { headers, formatResponse, formatError } from './lib/shared';
import * as Sentry from '@sentry/node';

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 0.1,
    });
}

interface ReferralData {
    referrerId: string;
    referredEmail: string;
    code: string;
    status: 'pending' | 'completed';
    createdAt: string;
    rewardTokens?: number;
}

// In-memory storage (replace with Supabase in production)
const referrals = new Map<string, ReferralData[]>();
const REFERRAL_REWARD = 100; // tokens

export const handler = async (event: any) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    try {
        const { action } = JSON.parse(event.body);

        // Generate referral code
        if (action === 'generate') {
            const { userId } = JSON.parse(event.body);
            
            if (!userId) {
                return formatError(400, 'User ID required');
            }

            // Generate a unique referral code
            const code = `RF${userId.slice(0, 6).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

            return formatResponse(200, {
                success: true,
                code,
                link: `https://realfakenews.netlify.app/?ref=${code}`,
                message: 'Share this code with friends!'
            });
        }

        // Track referral signup
        if (action === 'track') {
            const { code, newUserId, email } = JSON.parse(event.body);

            if (!code || !newUserId) {
                return formatError(400, 'Referral code and user ID required');
            }

            // Extract referrer ID from code (first 6 chars after RF)
            const referrerId = `user_${code.slice(2, 8).toLowerCase()}`;

            // Store referral
            const referralData: ReferralData = {
                referrerId,
                referredEmail: email,
                code,
                status: 'pending',
                createdAt: new Date().toISOString(),
                rewardTokens: REFERRAL_REWARD
            };

            const userReferrals = referrals.get(referrerId) || [];
            userReferrals.push(referralData);
            referrals.set(referrerId, userReferrals);

            console.log(`[Referral] ${email} signed up with code ${code}`);

            return formatResponse(200, {
                success: true,
                message: 'Referral tracked!',
                referrerId
            });
        }

        // Complete referral (when referred user subscribes)
        if (action === 'complete') {
            const { code } = JSON.parse(event.body);

            if (!code) {
                return formatError(400, 'Referral code required');
            }

            const referrerId = `user_${code.slice(2, 8).toLowerCase()}`;
            const userReferrals = referrals.get(referrerId) || [];
            
            const referral = userReferrals.find(r => r.code === code && r.status === 'pending');
            
            if (referral) {
                referral.status = 'completed';
                
                // TODO: Add tokens to referrer's account in Supabase
                console.log(`[Referral] Completed! Awarded ${REFERRAL_REWARD} tokens to ${referrerId}`);

                return formatResponse(200, {
                    success: true,
                    message: `Referral completed! ${REFERRAL_REWARD} tokens awarded.`,
                    reward: REFERRAL_REWARD
                });
            }

            return formatError(404, 'Referral not found or already completed');
        }

        // Get referral stats
        if (action === 'stats') {
            const { userId } = JSON.parse(event.body);
            const userReferrals = referrals.get(userId) || [];

            return formatResponse(200, {
                success: true,
                total: userReferrals.length,
                pending: userReferrals.filter(r => r.status === 'pending').length,
                completed: userReferrals.filter(r => r.status === 'completed').length,
                totalEarned: userReferrals
                    .filter(r => r.status === 'completed')
                    .reduce((sum, r) => sum + (r.rewardTokens || 0), 0)
            });
        }

        return formatError(400, 'Invalid action');

    } catch (error) {
        console.error('Referral error:', error);
        Sentry.captureException(error);
        return formatError(500, 'Referral system is having an existential crisis');
    }
};
