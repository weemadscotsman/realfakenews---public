import { Handler } from '@netlify/functions';
import Parser from 'rss-parser';
import OpenAI from 'openai';

const parser = new Parser();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const RSS_FEEDS = {
    latest: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    politics: 'http://feeds.bbci.co.uk/news/politics/rss.xml',
    technology: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    science: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
    entertainment: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    sports: 'https://www.espn.com/espn/rss/news',
    world: 'http://feeds.bbci.co.uk/news/world/rss.xml',
};

// CORS headers for local development access if needed
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

// Simple in-memory cache (note: this is per-instance in Netlify Functions)
const cache: Record<string, { data: Record<string, unknown>; timestamp: number }> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const PERSONAS = [
    {
        name: "Echo Chomsky",
        style: "Dry, academic, seeing deep disturbing patterns in mundane data? Reference 'The Algorithm'.",
        weight: 30
    },
    {
        name: "Tinfoil Tim",
        style: "High energy, paranoid, obsessed with hidden surveillance and pidgeons. Use SEMI-CAPS.",
        weight: 30
    },
    {
        name: "Intern Who Has Not Slept",
        style: "Desperate, caffeinated, slightly nihilistic, and surprisingly honest about corporate despair.",
        weight: 25
    },
    {
        name: "State Sponsored Pigeon Analyst",
        style: "Highly technical but clearly insane, focused on avian surveillance networks.",
        weight: 15
    }
];

function pickWeightedPersona() {
    const totalWeight = PERSONAS.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;
    for (const persona of PERSONAS) {
        if (random < persona.weight) return persona;
        random -= persona.weight;
    }
    return PERSONAS[0];
}

const FALLBACK_NEWS = [
    {
        headline: "Local Man Discovers Reality is a Subscription Service",
        excerpt: "Darren, 34, reports he can no longer see the color blue after failing to renew his 'Visual Standard' package.",
        readTime: 4,
        category: "latest"
    },
    {
        headline: "Study: 100% of Objects in Your House are Recording You",
        excerpt: "New data suggests your toaster has been writing a screenplay about your morning routine for three years.",
        readTime: 5,
        category: "latest"
    }
];

export const handler: Handler = async (event: any) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const category = event.queryStringParameters?.category || 'latest';
        const mode = event.queryStringParameters?.mode || 'parody';
        const cacheKey = `${category}-${mode}`;

        // Check Cache
        if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TTL)) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(cache[cacheKey].data),
            };
        }

        const feedUrl = RSS_FEEDS[category as keyof typeof RSS_FEEDS] || RSS_FEEDS.latest;

        // 1. Fetch Real News
        let topStories = [];
        try {
            const feed = await parser.parseURL(feedUrl);
            if (!feed?.items?.length) throw new Error("Empty feed");

            topStories = feed.items.slice(0, 8).map(item => ({
                title: item.title,
                snippet: item.contentSnippet?.slice(0, 100),
                link: item.link,
            }));
        } catch (rssError) {
            console.error("RSS Fetch failed:", rssError);
            if (mode === 'raw') {
                return { statusCode: 200, headers, body: JSON.stringify({ news: [] }) };
            }
            // If parody mode failed, we'll proceed to use fallbacks later if needed
        }

        // 2. Handle Logic
        if (mode === 'raw') {
            const responseData = { news: topStories };
            cache[cacheKey] = { data: responseData, timestamp: Date.now() };
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(responseData),
            };
        }

        // If we have no stories, use fallbacks
        if (topStories.length === 0) {
            const responseData = { news: FALLBACK_NEWS.map(f => ({ ...f, category: category })) };
            return { statusCode: 200, headers, body: JSON.stringify(responseData) };
        }

        if (!process.env.OPENAI_API_KEY) {
            const responseData = {
                news: topStories.map(s => ({
                    headline: s.title,
                    excerpt: "AI satire inactive. This is real news. Boring.",
                    category: category,
                    readTime: 3,
                    originalLink: s.link
                }))
            };
            return { statusCode: 200, headers, body: JSON.stringify(responseData) };
        }

        // 3. Parody with AI using a weighted random persona
        const persona = pickWeightedPersona();
        const systemPrompt = `You are RealFake News' Senior Satirist acting as "${persona.name}".
    Style: ${persona.style}
    Task: Take these REAL headlines and rewrite them into biting satire.
    
    Rules:
    1. Keep the core subject recognizable but twist the context absurdly.
    2. Tone: "The Onion" meets "Black Mirror".
    3. Make it funny, slightly dark, and cynical.
    4. Return JSON: { "articles": [{ "headline": "...", "excerpt": "...", "readTime": N, "originalHeadline": "..." }] }`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: JSON.stringify(topStories) },
            ],
            response_format: { type: 'json_object' },
        });

        const content = JSON.parse(response.choices[0].message.content || '{"articles": []}');
        const articles = (content.articles || []).map((a: { headline: string; excerpt: string; readTime: number; originalHeadline?: string }, i: number) => ({
            ...a,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            originalLink: topStories[i]?.link,
            id: Math.random().toString(36).substr(2, 9),
            persona: persona.name
        }));

        const finalResponse = { news: articles };
        cache[cacheKey] = { data: finalResponse, timestamp: Date.now() };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(finalResponse),
        };

    } catch (error) {
        console.error('General Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'System meltdown', details: String(error) }),
        };
    }
};
