import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getUnifiedLoreContext } from './lib/lore-manager';
import { formatResponse, headers } from './lib/shared';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // Return early for preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    try {
        const loreContext = await getUnifiedLoreContext();

        return formatResponse(200, loreContext);
    } catch (error: any) {
        return formatResponse(500, { error: error.message });
    }
};
