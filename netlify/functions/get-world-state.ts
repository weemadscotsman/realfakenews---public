import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getUnifiedLoreContext } from './lib/lore-manager';
import { formatResponse, headers } from './lib/shared';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
    // Return early for preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    try {
        const loreContext = await getUnifiedLoreContext();

        return formatResponse(200, loreContext);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return formatResponse(500, { error: errorMessage });
    }
};
