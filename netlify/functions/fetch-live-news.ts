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

export const handler: Handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const category = event.queryStringParameters?.category || 'latest';
        const mode = event.queryStringParameters?.mode || 'parody';
        const feedUrl = RSS_FEEDS[category as keyof typeof RSS_FEEDS] || RSS_FEEDS.latest;

        // 1. Fetch Real News
        const feed = await parser.parseURL(feedUrl);
        const topStories = feed.items.slice(0, 8).map(item => ({
            title: item.title,
            snippet: item.contentSnippet?.slice(0, 100),
            link: item.link,
        }));

        // If mode is raw, return immediately
        if (mode === 'raw') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ news: topStories }),
            };
        }

        if (!process.env.OPENAI_API_KEY) {
            console.warn("Missing OPENAI_API_KEY. Returning raw feed.");
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    news: topStories.map(s => ({
                        headline: s.title,
                        excerpt: "AI satire inactive (API Key missing). This is real news. Boring.",
                        category: category,
                        readTime: 3,
                        originalLink: s.link
                    }))
                }),
            };
        }

        // 2. Parody with AI
        const systemPrompt = `You are RealFake News' Senior Satirist.
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
        const articles = content.articles.map((a: any, i: number) => ({
            ...a,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            originalLink: topStories[i]?.link,
            id: Math.random().toString(36).substr(2, 9), // Simple ID for routing
        }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ news: articles }),
        };

    } catch (error) {
        console.error('Error fetching/parodying news:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch/parody news', details: String(error) }),
        };
    }
};
