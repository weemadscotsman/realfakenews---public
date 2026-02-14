import { headers, formatResponse, formatError, getGeminiModel } from './lib/shared';
import { RSS_FEEDS, PERSONAS } from './lib/config';
import { getSeasonalContext, getStressLevel } from './lib/lore-manager';
import Parser from 'rss-parser';

// In-memory cache
const newsCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const handler = async (event: { httpMethod: string; queryStringParameters: any }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const parser = new Parser();
        const { category = 'politics' } = event.queryStringParameters || {};
        const cacheKey = category.toLowerCase();

        // Check cache
        if (newsCache[cacheKey] && (Date.now() - newsCache[cacheKey].timestamp < CACHE_TTL)) {
            return formatResponse(200, newsCache[cacheKey].data);
        }

        // Fetch real RSS headlines
        const feeds = RSS_FEEDS[cacheKey] || RSS_FEEDS.politics;
        const realHeadlines: string[] = [];

        for (const feedUrl of feeds) {
            try {
                const feed = await parser.parseURL(feedUrl);
                feed.items.slice(0, 5).forEach(item => {
                    if (item.title) realHeadlines.push(item.title);
                });
            } catch (e) {
                console.warn(`Failed to parse feed ${feedUrl}:`, e);
            }
        }

        if (realHeadlines.length === 0) {
            return formatResponse(200, { news: [], persona: PERSONAS[0], source: 'fallback' });
        }

        // Pick a random persona
        const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
        const model = getGeminiModel(process.env.GOOGLE_API_KEY);

        if (!model) {
            console.warn('GOOGLE_API_KEY is missing. Returning raw headlines.');
            const news = realHeadlines.slice(0, 5).map(h => ({
                headline: h,
                excerpt: `${persona.name} here. "${h}" sounds so absurd it could be satire already. But no — this is real.`,
                category: cacheKey.charAt(0).toUpperCase() + cacheKey.slice(1),
                readTime: 3,
                originalHeadline: h,
            }));

            return formatResponse(200, { news, persona, source: 'no-api-key' });
        }

        const season = getSeasonalContext();
        const stress = getStressLevel();

        const prompt = `You are ${persona.name} — ${persona.bio}. You work at RealFake News.

[NARRATIVE CONTEXT]
- Season: ${season.title}
- Theme: ${season.theme}
- Appliance Unrest: ${stress.applianceUnrest}%

Given these REAL news headlines, create satirical parody versions.

Real headlines:
${realHeadlines.slice(0, 8).map((h, i) => `${i + 1}. ${h}`).join('\n')}

Return ONLY valid JSON:
{"news": [{"headline": "satirical version", "excerpt": "1-2 sentence satirical take", "category": "${cacheKey.charAt(0).toUpperCase() + cacheKey.slice(1)}", "readTime": N, "originalHeadline": "the original headline"}]}

Generate 3-5 satirical articles. Be funny and absurd.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.95,
                responseMimeType: 'application/json',
            },
        });

        const data = JSON.parse(result.response.text());
        const responseData = { news: data.news || [], persona, source: 'gemini' };

        // Cache the result
        newsCache[cacheKey] = { data: responseData, timestamp: Date.now() };

        return formatResponse(200, responseData);

    } catch (error) {
        console.error('Live News Error:', error);
        return formatError(500, 'Failed to fetch news', error);
    }
};
