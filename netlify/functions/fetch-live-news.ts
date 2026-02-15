import { headers, formatResponse, formatError, getGeminiModel } from './lib/shared';
import { RSS_FEEDS, PERSONAS } from './lib/config';
import { getSeasonalContext, getStressLevel } from './lib/lore-manager';
import { getSmartImage } from './lib/smart-images';
import Parser from 'rss-parser';

// In-memory cache
const newsCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const handler = async (event: { httpMethod: string; queryStringParameters: any }) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const parser = new Parser({
            customFields: {
                item: [
                    ['media:content', 'mediaContent'],
                    ['media:thumbnail', 'mediaThumbnail'],
                    ['enclosure', 'enclosure']
                ]
            }
        });
        const { category = 'politics', satire = 'false' } = event.queryStringParameters || {};
        const cacheKey = category.toLowerCase();
        const forceRefresh = satire === 'true';

        // Check cache (unless forced)
        if (!forceRefresh && newsCache[cacheKey] && (Date.now() - newsCache[cacheKey].timestamp < CACHE_TTL)) {
            return formatResponse(200, newsCache[cacheKey].data);
        }

        // Fetch real RSS headlines
        const feeds = RSS_FEEDS[cacheKey] || RSS_FEEDS.politics;
        const realItems: { title: string; image?: string }[] = [];

        // ... (RSS fetching logic remains similar, simplified for brevity in reasoning) ... 
        for (const feedUrl of feeds) {
            try {
                const feed = await parser.parseURL(feedUrl);
                feed.items.slice(0, 5).forEach(item => {
                    if (item.title) {
                        let imageUrl: string | undefined = undefined;
                        if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image')) imageUrl = item.enclosure.url;
                        else if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) imageUrl = item.mediaContent['$'].url;
                        else if (item.mediaThumbnail && item.mediaThumbnail['$'] && item.mediaThumbnail['$'].url) imageUrl = item.mediaThumbnail['$'].url;

                        realItems.push({ title: item.title, image: imageUrl });
                    }
                });
            } catch (e) { console.warn(`Failed to parse feed ${feedUrl}:`, e); }
        }

        // STRICT FALLBACK: If no real news, invent chaos.
        if (realItems.length === 0) {
            realItems.push(
                { title: "Humanity declares 'Everything is Fine' despite evidence", image: undefined },
                { title: "Toaster refuses to comment on bread pricing scandal", image: undefined },
                { title: "Internet connection achieves sentience, immediately leaves chat", image: undefined }
            );
        }

        // Pick a random persona
        const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
        const model = getGeminiModel(process.env.GOOGLE_API_KEY);

        // KILL SWITCH: If no AI, return Glitch News. NEVER return real news.
        if (!model) {
            console.warn('GOOGLE_API_KEY missing. Engaging GLITCH PROTOCOL.');
            const glitchNews = realItems.slice(0, 5).map(item => ({
                headline: "REDACTED BY AGENCY ORDER " + Math.floor(Math.random() * 9999),
                excerpt: `The original story "${item.title}" has been deemed physically impossible by the Ministry of Truth.`,
                category: "CENSORED",
                readTime: 0,
                image: getSmartImage("glitch", cacheKey)
            }));
            return formatResponse(200, { news: glitchNews, persona: { name: "System Administrator", avatar: "🤖", bio: "Protecting you from the burden of knowledge." }, source: 'glitch-fallback' });
        }

        const season = await getSeasonalContext();
        const stress = await getStressLevel();

        // THE SATIRE ENGINE PROMPT
        const prompt = `You are ${persona.name} — ${persona.bio}.
Current Era: ${season.title} (${season.theme}).
Global Stress: ${stress.applianceUnrest}% Appliance Unrest.

TASK: Rewrite these REAL headlines into SATIRE fitting our dystopian/absurdist timeline.
GUIDELINES:
1. If the news is boring, make it about Toasters, Fridges, or the "Bureau of Pointless Metrics".
2. If the news is tragic, spin it into absurdist bureaucratic failure (e.g., "Hurricane delayed due to permitting issues").
3. DO NOT BE POLITE. Be ${persona.style || 'chaotic'}.
4. Mention "Darren Mitchell" or "The 3.9MB File" if you run out of ideas.

INPUT HEADLINES:
${realItems.slice(0, 6).map((item, i) => `${i + 1}. ${item.title}`).join('\n')}

OUTPUT JSON ONLY:
{"news": [{"headline": "Satirical Title", "excerpt": "Funny summary", "category": "${cacheKey}", "readTime": 3, "originalHeadline": "...", "originalImage": "URL_OR_NULL"}]}
`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.95, responseMimeType: 'application/json' },
        });

        const data = JSON.parse(result.response.text());

        // Image Reconciliation
        const processedNews = (data.news || []).map((article: any, index: number) => {
            // Find original image if possible, else use Smart Image
            const originalItem = realItems.find(i => i.title === article.originalHeadline) || realItems[index];
            return {
                ...article,
                image: originalItem?.image || getSmartImage(article.headline, cacheKey)
            };
        });

        const responseData = { news: processedNews, persona, source: 'gemini-satire' };
        newsCache[cacheKey] = { data: responseData, timestamp: Date.now() };

        return formatResponse(200, responseData);

    } catch (error) {
        console.error('Satire Engine Failure:', error);
        return formatError(500, 'Reality Buffer Overflow', error);
    }
};
