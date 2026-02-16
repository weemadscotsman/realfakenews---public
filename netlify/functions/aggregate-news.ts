import type { Handler } from '@netlify/functions';
import Parser from 'rss-parser';
import { RSS_FEEDS } from './lib/config';
import { getAIClient } from './lib/shared';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: Handler = async (event, _context) => {
  // Only allow GET and POST
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'mediaContent'],
          ['media:thumbnail', 'mediaThumbnail'],
          ['enclosure', 'enclosure'],
          ['description', 'description'],
          ['content:encoded', 'contentEncoded'],
        ],
      },
    });

    // Get category from query params or use 'all'
    const params = new URLSearchParams(event.queryStringParameters as Record<string, string>);
    const category = params.get('category') || 'all';
    const limit = parseInt(params.get('limit') || '10', 10);

    // Collect all feeds to fetch
    let feedsToFetch: string[] = [];
    if (category === 'all') {
      feedsToFetch = Object.values(RSS_FEEDS).flat();
    } else if (RSS_FEEDS[category]) {
      feedsToFetch = RSS_FEEDS[category];
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Unknown category: ${category}` }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // Fetch headlines from all feeds concurrently
    const fetchPromises = feedsToFetch.map(async (feedUrl) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.slice(0, 5).map((item) => ({
          title: item.title || 'Untitled',
          description: item.description || item.contentEncoded || '',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          source: feed.title || new URL(feedUrl).hostname,
          image: item.enclosure?.url || item.mediaContent?.['$']?.url || undefined,
        }));
      } catch (err) {
        console.warn(`Failed to fetch ${feedUrl}:`, err);
        return [];
      }
    });

    const results = await Promise.allSettled(fetchPromises);
    const allHeadlines = results
      .filter((r): r is PromiseFulfilledResult<ReturnType<typeof fetchPromises[number]>> => r.status === 'fulfilled')
      .flatMap((r) => r.value);

    // Shuffle and deduplicate
    const uniqueHeadlines = Array.from(
      new Map(allHeadlines.map((h) => [h.title, h])).values()
    ).sort(() => Math.random() - 0.5);

    const selectedHeadlines = uniqueHeadlines.slice(0, limit);

    // If AI client is available, rewrite headlines into satire
    const aiClient = getAIClient();
    let satiricalNews = null;

    if (aiClient && selectedHeadlines.length > 0) {
      try {
        const prompt = `You are a satirical news editor for "RealFake News" - a publication that rewrites real headlines into absurdist comedy.

TASK: Rewrite these REAL headlines into SATIRICAL fake news. Make them funny, absurd, and dystopian in tone.

RULES:
1. Keep the general topic but twist it into absurdity
2. Reference appliances (toasters, fridges, microwaves) whenever possible
3. Mention "Darren Mitchell" or "The Bureau of Pointless Metrics" as needed
4. Make them sound like they're from a dystopian bureaucracy
5. Each article should have: headline (funny title), excerpt (2-3 sentences), category, readTime (2-5 minutes)

REAL HEADLINES:
${selectedHeadlines.map((h, i) => `${i + 1}. ${h.title}`).join('\n')}

OUTPUT AS JSON:
{
  "articles": [
    {
      "headline": "Satirical Headline Here",
      "excerpt": "Funny summary here...",
      "category": "Politics|Tech|Science|Entertainment|Sports|Business",
      "readTime": 3,
      "originalHeadline": "Original headline here"
    }
  ]
}`;

        const result = await aiClient.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.9, 
            responseMimeType: 'application/json',
            maxOutputTokens: 4000,
          },
        });

        const text = result.response.text();
        const parsed = JSON.parse(text);
        satiricalNews = parsed.articles || [];

        // Map original images to satirical articles
        satiricalNews = satiricalNews.map((article: Record<string, string | number>, idx: number) => {
          const original = selectedHeadlines[idx];
          return {
            ...article,
            originalHeadline: original?.title || '',
            originalSource: original?.source || '',
            originalLink: original?.link || '',
            image: original?.image || null,
            publishedAt: original?.pubDate || new Date().toISOString(),
          };
        });
      } catch (aiError) {
        console.error('AI rewriting failed:', aiError);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        category,
        fetched: selectedHeadlines.length,
        realHeadlines: selectedHeadlines,
        satiricalNews,
        aiGenerated: !!satiricalNews,
        timestamp: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('News aggregation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to aggregate news',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler };
