import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

// Caching generated articles to prevent redundant API calls
const articleCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours for articles

export const handler: any = async (event: { httpMethod: string; queryStringParameters: any }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { headline } = event.queryStringParameters || {};

        if (!headline) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Headline is required' }),
            };
        }

        const cacheKey = encodeURIComponent(headline.toLowerCase());

        // Check Cache
        if (articleCache[cacheKey] && (Date.now() - articleCache[cacheKey].timestamp < CACHE_TTL)) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(articleCache[cacheKey].data),
            };
        }

        if (!process.env.OPENAI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'AI key missing' }),
            };
        }

        const systemPrompt = `You are a journalist for RealFake News. Write a full satirical article based on this headline: "${headline}".
        
        Tone: The Onion / Daily Mash. 
        Structure: 
        - Lede (punchy opening)
        - Body (3-4 paragraphs of escalating absurdity)
        - Fake Expert Quotes
        - Conclusion (melancholy or chaotic)
        
        Return JSON: { "headline": "...", "content": "HTML string with <p> tags...", "category": "...", "author": "Fake Name", "readTime": N }`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemPrompt }],
            response_format: { type: 'json_object' },
        });

        const articleData = JSON.parse(response.choices[0].message.content || '{}');
        const finalData = {
            ...articleData,
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        };

        // Store in cache
        articleCache[cacheKey] = { data: finalData, timestamp: Date.now() };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(finalData),
        };

    } catch (error) {
        console.error('Article Generation Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to generate article', details: String(error) }),
        };
    }
};
