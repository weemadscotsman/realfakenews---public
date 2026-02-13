import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

export const handler = async (event: { httpMethod: string; body: string | null }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'POST only' }) };
    }

    if (!process.env.GOOGLE_API_KEY) {
        return {
            statusCode: 503,
            headers,
            body: JSON.stringify({ error: 'AI service not configured', fallback: true }),
        };
    }

    try {
        const { prompt, mode } = JSON.parse(event.body || '{}');

        if (!prompt) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'prompt is required' }) };
        }

        const isJson = mode === 'json';

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: isJson ? prompt + '\n\nRespond ONLY with valid JSON. No markdown, no code blocks, just raw JSON.' : prompt }] }],
            generationConfig: {
                temperature: 0.9,
                ...(isJson ? { responseMimeType: 'application/json' } : {}),
            },
        });

        const text = result.response.text();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ result: text }),
        };

    } catch (error) {
        console.error('Generate Content Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Generation failed', fallback: true }),
        };
    }
};
