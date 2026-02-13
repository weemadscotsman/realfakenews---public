import { GoogleGenerativeAI } from '@google/generative-ai';



const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

// Cache generated articles
const articleCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const handler = async (event: { httpMethod: string; queryStringParameters: any }) => {
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

        if (!process.env.GOOGLE_API_KEY) {
            // Return a fallback article if no API key
            const fallbackData = {
                headline,
                content: `<p>Our AI journalists attempted to cover <strong>"${headline}"</strong> but were temporarily incapacitated after an incident involving a sentient coffee machine.</p>
                <p>An unnamed source (Unit 404 — the office toaster) stated: <em>"I've seen things you wouldn't believe. Spreadsheets on fire off the shoulder of the server room."</em></p>
                <p>We will update this story as soon as our systems regain consciousness.</p>`,
                category: 'Breaking',
                author: 'Emergency Backup Correspondent',
                readTime: 3,
                date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            };
            return { statusCode: 200, headers, body: JSON.stringify(fallbackData) };
        }

        const prompt = `You are a journalist for RealFake News — a satirical news site like The Onion meets Black Mirror.

Write a full satirical article for this headline: "${headline}"

Structure:
- Lede (punchy, absurd opening paragraph)
- Body (3-4 paragraphs of escalating absurdity)
- At least 2 fake expert quotes (with ridiculous names/titles)
- Conclusion (melancholy or chaotic)

Return ONLY valid JSON:
{ "headline": "...", "content": "Full article as HTML string with <p>, <blockquote>, <strong>, <em> tags", "category": "...", "author": "A funny fake journalist name", "readTime": number }`;

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.9,
                responseMimeType: 'application/json',
            },
        });

        const articleData = JSON.parse(result.response.text());
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
