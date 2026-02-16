import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { formatResponse, formatError } from './lib/shared';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
    // OPTIONS for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method Not Allowed');
    }

    if (!supabaseUrl || !supabaseKey) {
        return formatError(500, 'Supabase credentials missing');
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { userId, arcId, branchId } = body;

        if (!userId || !arcId || !branchId) {
            return formatError(400, 'Missing required fields: userId, arcId, branchId');
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Spend Token (Cost: 1 Token per vote)
        const { data: spendSuccess, error: spendError } = await supabase.rpc('spend_tokens', {
            p_user_id: userId,
            p_amount: 1,
            p_description: `Vote on Quest: ${arcId}`
        });

        if (spendError) {
            console.error('Spend Error:', spendError);
            return formatError(500, 'Failed to process token transaction');
        }

        if (!spendSuccess) {
            return formatError(402, 'Insufficient Roast Tokens');
        }

        // 2. Record Vote
        const { error: voteError } = await supabase
            .from('quest_votes')
            .insert([{
                user_id: userId,
                arc_id: arcId,
                branch_id: branchId,
                tokens_spent: 1
            }]);

        if (voteError) {
            console.error('Vote Error:', voteError);
            // Ideally we'd refund here, but for now we log it.
            return formatError(500, 'Failed to record vote');
        }

        return formatResponse(200, {
            success: true,
            message: 'Vote recorded',
            arcId,
            branchId
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Vote Quest Handler Error:', error);
        return formatError(500, 'Internal Server Error', errorMessage);
    }
};
