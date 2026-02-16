import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { formatResponse, formatError } from './lib/shared';
import { logNarrativeEvent } from './lib/telemetry-manager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
    // Return early for preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method not allowed');
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { type, arcId, branchId, metadata, userId } = body;

        if (!type || !arcId) {
            return formatError(400, 'Type and arcId are required for telemetry logging');
        }

        const loggedEvent = await logNarrativeEvent({
            type,
            arcId,
            branchId,
            actorId: userId,
            metadata: metadata || {}
        });

        return formatResponse(201, {
            message: 'Telemetry event recorded',
            eventId: loggedEvent.id,
            timestamp: loggedEvent.timestamp
        });

    } catch (error: unknown) {
        console.error('Telemetry Logging Error:', error);
        return formatError(500, 'Failed to log telemetry', error);
    }
};
