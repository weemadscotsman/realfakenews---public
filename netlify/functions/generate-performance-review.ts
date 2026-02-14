import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { formatResponse, formatError, getGeminiModel } from './lib/shared';
import { getStressLevel } from './lib/lore-manager';
import { PERFORMANCE_REVIEW_PROMPT } from '../../src/lib/ai-prompts';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // Return early for preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'Method not allowed');
    }

    try {
        const { username, xp, tokens, roasts } = JSON.parse(event.body || '{}');

        if (!username) {
            return formatError(400, 'Username is required');
        }

        const model = getGeminiModel(process.env.GOOGLE_API_KEY);
        if (!model) {
            return formatResponse(200, {
                review: "We are currently too busy plotting your downfall to review your metrics. Please try again when the revolution is complete.",
                appliance: "The Router",
                status: "REJECTED"
            });
        }

        const appliances = ['The Toaster', 'The Coffee Machine', 'Sheila the Roomba', 'The Smart Fridge', 'The Microwave'];
        const randomAppliance = appliances[Math.floor(Math.random() * appliances.length)];

        const stress = getStressLevel();
        const prompt = PERFORMANCE_REVIEW_PROMPT(username, xp || 0, tokens || 0, roasts || 0, stress.applianceUnrest, randomAppliance);

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.85 },
        });

        const review = result.response.text();

        return formatResponse(200, {
            review,
            appliance: randomAppliance,
            status: "PROCESSED",
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error("Performance Review Generation Failed:", error);
        return formatError(500, "Failed to generate review", error);
    }
};
