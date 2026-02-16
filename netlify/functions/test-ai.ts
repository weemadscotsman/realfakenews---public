import { headers, formatResponse, formatError, getAIClient, getAIInfo } from './lib/shared';
import { getSpecialistModel, MODEL_PERSONALITIES, SPECIALIST_MODELS } from './lib/ai-specialists';

/**
 * Test endpoint to verify AI connection and show specialist system
 * GET /.netlify/functions/test-ai
 */
export const handler = async (event: { httpMethod: string }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const info = getAIInfo();
        const client = getAIClient();

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
                specialists: Object.entries(SPECIALIST_MODELS).map(([key, val]) => ({
                    task: key,
                    name: val.name,
                    primary: MODEL_PERSONALITIES[val.primary] || val.primary,
                    backup: MODEL_PERSONALITIES[val.backup] || val.backup,
                })),
                hint: 'Set OPENROUTER_API_KEY in Netlify environment variables',
            });
        }

        // Test generation with specialist system
        console.log('[TEST] Testing AI generation with specialist routing...');
        const startTime = Date.now();
        
        // Test the headline specialist
        const specialist = getSpecialistModel('headline');
        console.log(`[TEST] Using specialist: ${specialist.specialistName}`);
        
        const result = await client.generateContent({
            contents: [{
                role: 'user',
                parts: [{ text: 'Write a funny one-sentence satirical headline about AI taking over the world. Make it absurd and funny.' }]
            }],
            generationConfig: { temperature: 0.9 }
        }, 'headline');

        const responseTime = Date.now() - startTime;
        const text = result.response.text();

        return formatResponse(200, {
            status: 'success',
            message: '🎉 AI SPECIALIST SQUAD IS ONLINE!',
            info: {
                ...info,
                responseTime: `${responseTime}ms`,
            },
            envStatus,
            specialists: Object.entries(SPECIALIST_MODELS).map(([key, val]) => ({
                task: key,
                name: val.name,
                primary: {
                    model: val.primary,
                    personality: MODEL_PERSONALITIES[val.primary] || 'Unknown',
                },
                backup: {
                    model: val.backup,
                    personality: MODEL_PERSONALITIES[val.backup] || 'Unknown',
                },
            })),
            testResponse: text,
            testSpecialist: specialist.specialistName,
            cost: '$0.00 (FREE TIER - 10 MODELS!)',
            tips: [
                'Each task type has a DEDICATED specialist model',
                'Roasts use DeepSeek R1 (brutal honesty)',
                'Headlines use Gemini Flash (punchy & fast)',
                'Articles use GLM 4.5 (storytelling mastery)',
                'Models auto-rotate when rate limited',
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
