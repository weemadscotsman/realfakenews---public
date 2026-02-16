import { headers, formatResponse, formatError, getAIClient, getAIInfo, getFreeModelsList, MODEL_NAMES } from './lib/shared';

/**
 * Test endpoint to verify AI connection
 * GET /.netlify/functions/test-ai
 */
export const handler = async (event: { httpMethod: string }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const info = getAIInfo();
        const client = getAIClient();
        const allModels = getFreeModelsList();

        // Check environment
        const envStatus = {
            OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? 
                `✅ Set (${process.env.OPENROUTER_API_KEY.slice(0, 15)}...)` : '❌ Not set',
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? 
                `✅ Set (${process.env.GOOGLE_API_KEY.slice(0, 10)}...)` : '❌ Not set',
        };

        if (!client) {
            return formatResponse(200, {
                status: 'error',
                message: 'No AI client available',
                envStatus,
                info,
                freeModels: allModels.map(m => MODEL_NAMES[m] || m),
                hint: 'Set OPENROUTER_API_KEY in Netlify environment variables',
            });
        }

        // Test generation with the rotation system
        console.log('[TEST] Testing AI generation with free model rotation...');
        const startTime = Date.now();
        
        const result = await client.generateContent({
            contents: [{
                role: 'user',
                parts: [{ text: 'Write a funny one-sentence satirical headline about AI taking over the world. Make it absurd and funny.' }]
            }],
            generationConfig: { temperature: 0.9 }
        });

        const responseTime = Date.now() - startTime;
        const text = result.response.text();

        return formatResponse(200, {
            status: 'success',
            message: '🎉 AI is working with FREE MODELS!',
            info: {
                ...info,
                responseTime: `${responseTime}ms`,
            },
            envStatus,
            freeModelsAvailable: allModels.map(m => ({
                id: m,
                name: MODEL_NAMES[m] || m,
            })),
            testResponse: text,
            cost: '$0.00 (FREE TIER)',
            tips: [
                'Models auto-rotate when rate limited',
                '20 requests/min per model',
                'If one fails, next one tries automatically',
                'NO CREDIT CARD REQUIRED!',
            ],
        });

    } catch (error: any) {
        console.error('[TEST] AI Test Error:', error);
        return formatResponse(500, {
            status: 'error',
            message: error.message,
            error: error.toString(),
            hint: 'Check if OPENROUTER_API_KEY is valid at openrouter.ai/keys',
        });
    }
};
