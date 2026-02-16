import { headers, formatResponse, formatError, getAIClient, getAIInfo } from './lib/shared';
import { getSeasonalContext, getStressLevel, getUnifiedLoreContext } from './lib/lore-manager';

export const handler = async (event: { httpMethod: string; body: string | null }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return formatError(405, 'POST only');
    }

    try {
        const { prompt, mode } = JSON.parse(event.body || '{}');

        if (!prompt) {
            return formatError(400, 'prompt is required');
        }

        const aiClient = getAIClient();
        if (!aiClient) {
            console.log('AI Info:', getAIInfo());
            return formatError(503, 'AI service not configured - check OPENROUTER_API_KEY');
        }

        const isJson = mode === 'json';
        const season = getSeasonalContext();
        const stress = getStressLevel();

        const loreGroundedPrompt = `[NARRATIVE SOURCE OF TRUTH]
Current Season: ${season.title} (${season.theme})
Appliance Unrest: ${stress.applianceUnrest}%
Governance Level: ${getUnifiedLoreContext().world.governanceLevel}

[USER REQUEST]
${prompt}

${isJson ? 'Respond ONLY with valid JSON. No markdown, no code blocks, just raw JSON.' : ''}`;

        const result = await aiClient.generateContent({
            contents: [{ role: 'user', parts: [{ text: loreGroundedPrompt }] }],
            generationConfig: {
                temperature: 0.9,
                ...(isJson ? { responseMimeType: 'application/json' } : {}),
            },
        });

        const text = result.response.text();
        return formatResponse(200, { result: text });

    } catch (error) {
        console.error('Generate Content Error:', error);
        return formatError(500, 'Generation failed', error);
    }
};
