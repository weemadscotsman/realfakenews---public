import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';

const parser = new Parser();

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

// Persona pool
const PERSONAS = [
    { name: "Clive Pressington III", bio: "Dry British wit, treats absurdity as mundane fact" },
    { name: "Zara Nightshade", bio: "Intense, conspiratorial, every story is a thriller reveal" },
    { name: "Chad Thunderbyte", bio: "Tech bro energy, everything is 'disruption'" },
    { name: "Brenda from Accounting", bio: "Passive-aggressive, disappointed in everything, mentions her cats" },
    { name: "Unit 404", bio: "Sentient office toaster, existential dread, speaks in error codes" },
];

// RSS feeds by category
const RSS_FEEDS: Record<string, string[]> = {
    politics: [
        'https://feeds.bbci.co.uk/news/politics/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    ],
    science: [
        'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
    ],
    tech: [
        'https://feeds.bbci.co.uk/news/technology/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    ],
    entertainment: [
        'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    ],
    sports: [
        'https://feeds.bbci.co.uk/sport/rss.xml',
    ],
};

// In-memory cache
const newsCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const handler = async (event: { httpMethod: string; queryStringParameters: any }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { category = 'politics' } = event.queryStringParameters || {};
        const cacheKey = category.toLowerCase();

        // Check cache
        if (newsCache[cacheKey] && (Date.now() - newsCache[cacheKey].timestamp < CACHE_TTL)) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(newsCache[cacheKey].data),
            };
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
            // Use fallback if no feeds available
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    news: [],
                    persona: PERSONAS[0],
                    source: 'fallback',
                }),
            };
        }

        // Pick a random persona
        const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];

        if (!process.env.GOOGLE_API_KEY) {
            // Return raw headlines as satirical-ish if no API key
            const news = realHeadlines.slice(0, 5).map(h => ({
                headline: h,
                excerpt: `${persona.name} here. Honestly, "${h}" sounds so absurd it could be satire already. But no — this one's depressingly real.`,
                category: cacheKey.charAt(0).toUpperCase() + cacheKey.slice(1),
                readTime: 3,
                originalHeadline: h,
            }));

            return { statusCode: 200, headers, body: JSON.stringify({ news, persona, source: 'no-api-key' }) };
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `You are ${persona.name} — ${persona.bio}. You work at RealFake News, a satirical news site.

Given these REAL news headlines, create satirical parody versions. Keep the spirit of the original but twist it into absurdity.

Real headlines:
${realHeadlines.slice(0, 8).map((h, i) => `${i + 1}. ${h}`).join('\n')}

Return ONLY valid JSON:
{"news": [{"headline": "satirical version", "excerpt": "1-2 sentence satirical take", "category": "${cacheKey.charAt(0).toUpperCase() + cacheKey.slice(1)}", "readTime": N, "originalHeadline": "the original headline"}]}

Generate 3-5 satirical articles. Be funny and absurd, not mean-spirited.`;

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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(responseData),
        };

    } catch (error) {
        console.error('Live News Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch news', details: String(error) }),
        };
    }
};
