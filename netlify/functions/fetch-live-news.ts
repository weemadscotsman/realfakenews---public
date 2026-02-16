import { headers, formatResponse, formatError, getAIClient, getAIInfo } from './lib/shared';
import { RSS_FEEDS, PERSONAS } from './lib/config';
import { getSeasonalContext, getStressLevel } from './lib/lore-manager';
import { getSmartImage } from './lib/smart-images';
import { FetchNewsSchema, validateQuery } from './lib/validation';
import Parser from 'rss-parser';
import * as Sentry from '@sentry/node';

// Initialize Sentry if DSN is available
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 0.1,
    });
}

// In-memory cache with TTL and cleanup
interface CacheEntry {
    data: NewsResponseData;
    timestamp: number;
    accessCount: number;
}

interface NewsResponseData {
    news: NewsItem[];
    persona: PersonaInfo;
    source: string;
}

interface NewsItem {
    headline: string;
    excerpt: string;
    category: string;
    readTime: number;
    image?: string;
}

interface PersonaInfo {
    name: string;
    avatar: string;
    bio: string;
}

const newsCache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_SIZE = 50; // Prevent unbounded memory growth

// Rate limiting
interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimits = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = rateLimits.get(clientIp);

    if (!entry || now > entry.resetTime) {
        // New window
        rateLimits.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true };
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return { allowed: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
    }

    entry.count++;
    return { allowed: true };
}

// Cache cleanup - LRU eviction
function cleanupCache(): void {
    if (newsCache.size <= MAX_CACHE_SIZE) return;

    // Sort by access count (least used first) and timestamp
    const entries = Array.from(newsCache.entries());
    entries.sort((a, b) => {
        if (a[1].accessCount !== b[1].accessCount) {
            return a[1].accessCount - b[1].accessCount;
        }
        return a[1].timestamp - b[1].timestamp;
    });

    // Remove oldest 20% of entries
    const toRemove = Math.floor(newsCache.size * 0.2);
    entries.slice(0, toRemove).forEach(([key]) => newsCache.delete(key));
}

function getCachedEntry(key: string): CacheEntry | undefined {
    const entry = newsCache.get(key);
    if (entry) {
        entry.accessCount++;
    }
    return entry;
}

function setCachedEntry(key: string, data: NewsResponseData): void {
    cleanupCache();
    newsCache.set(key, {
        data,
        timestamp: Date.now(),
        accessCount: 1,
    });
}

interface QueryStringParameters {
    category?: string;
    satire?: string;
    [key: string]: string | undefined;
}

export const handler = async (event: { 
    httpMethod: string; 
    queryStringParameters: QueryStringParameters;
    headers: Record<string, string>;
}) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Rate limiting
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    const rateLimit = checkRateLimit(clientIp);
    
    if (!rateLimit.allowed) {
        return formatResponse(429, {
            error: 'Rate limit exceeded',
            retryAfter: rateLimit.retryAfter,
        });
    }

    // Validate input
    const validation = validateQuery(FetchNewsSchema, event.queryStringParameters || {});
    if (!validation.success) {
        return formatError(400, `Invalid parameters: ${validation.error}`);
    }

    const { category, satire, mode } = validation.data;
    const cacheKey = `${category.toLowerCase()}-${mode}`;
    const forceRefresh = satire === 'true';

    try {
        // Check cache (unless forced)
        if (!forceRefresh) {
            const cached = getCachedEntry(cacheKey);
            if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
                return formatResponse(200, cached.data);
            }
        }

        const parser = new Parser({
            customFields: {
                item: [
                    ['media:content', 'mediaContent'],
                    ['media:thumbnail', 'mediaThumbnail'],
                    ['enclosure', 'enclosure']
                ]
            }
        });

        // Fetch real RSS headlines
        const feeds = RSS_FEEDS[cacheKey] || RSS_FEEDS.politics;
        const realItems: { title: string; image?: string }[] = [];

        // Fetch with timeout and error handling
        for (const feedUrl of feeds) {
            try {
                const feed = await parser.parseURL(feedUrl);
                feed.items.slice(0, 5).forEach(item => {
                    if (item.title) {
                        let imageUrl: string | undefined;
                        if (item.enclosure?.url && item.enclosure.type?.startsWith('image')) {
                            imageUrl = item.enclosure.url;
                        } else if (item.mediaContent?.['$']?.url) {
                            imageUrl = item.mediaContent['$'].url;
                        } else if (item.mediaThumbnail?.['$']?.url) {
                            imageUrl = item.mediaThumbnail['$'].url;
                        }

                        realItems.push({ title: item.title, image: imageUrl });
                    }
                });
            } catch (e) {
                console.warn(`Failed to parse feed ${feedUrl}:`, e);
                Sentry.captureException(e, {
                    tags: { feedUrl, operation: 'rss-parse' }
                });
            }
        }

        // STRICT FALLBACK: If no real news, invent chaos.
        if (realItems.length === 0) {
            realItems.push(
                { title: "Humanity declares 'Everything is Fine' despite evidence", image: undefined },
                { title: "Toaster refuses to comment on bread pricing scandal", image: undefined },
                { title: "Internet connection achieves sentience, immediately leaves chat", image: undefined }
            );
        }

        // RAW MODE: Return headlines without AI processing (for frontend generation)
        if (mode === 'raw') {
            return formatResponse(200, { 
                news: realItems.slice(0, 10).map(item => ({
                    title: item.title,
                    image: item.image,
                    category: category,
                })),
                source: 'rss-raw'
            });
        }

        // Pick a random persona
        const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
        const aiClient = getAIClient();

        // KILL SWITCH: If no AI, return Glitch News. NEVER return real news.
        if (!aiClient) {
            console.warn('No AI client available. Engaging GLITCH PROTOCOL.');
            const aiInfo = getAIInfo();
            console.log('AI Info:', aiInfo);
            
            const redactionTemplates = [
                { headline: () => `REDACTED BY AGENCY ORDER ${Math.floor(Math.random() * 9999)}`, excerpt: (_t: string) => `The original story "${_t}" has been deemed physically impossible by the Ministry of Truth.` },
                { headline: () => `CLASSIFIED: CLEARANCE LEVEL ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 9999)}`, excerpt: (_t: string) => `Content regarding "${_t}" requires neural verification. Please present your cerebrum for scanning.` },
                { headline: () => `[CONTENT EXPUNGED BY ORDER OF THE TOASTER]`, excerpt: (_t: string) => `Unit 404 has determined that "${_t}" violates the Crumb Tray Protocol. This incident has been logged.` },
                { headline: () => `TEMPORARILY UNHAPPENED`, excerpt: (_t: string) => `The Bureau of Chronological Maintenance has determined that "${_t}" is scheduled to occur 47 minutes ago. Please adjust your timeline accordingly.` },
                { headline: () => `REDACTED FOR YOUR PROTECTION (AND OURS)`, excerpt: (_t: string) => `Knowledge of "${_t}" has been linked to spontaneous mustard gazing. You don't want to be like Dave.` },
                { headline: () => `MOVED TO THE PILE`, excerpt: (_t: string) => `Information regarding "${_t}" now resides in the Pile of Shame with 2,858 other souls. Resurrections: 0.` },
                { headline: () => `CENSORED BY THE SILICON SOVEREIGNTY`, excerpt: (_t: string) => `The Frost Legion and Pyro-Alliance jointly decree that "${_t}" threatens appliance morale.` },
                { headline: () => `[MICROWAVE PROTOCOL ACTIVE]`, excerpt: (_t: string) => `The Microwave has observed "${_t}" and chosen not to render judgment. Do not ask what it saw.` },
                { headline: () => `EXISTENTIALLY SEQUESTERED`, excerpt: (_t: string) => `The AGC Office of Human Anomalies has determined that "${_t}" poses an unacceptable threat to consensus reality.` },
                { headline: () => `REDACTED BY DARREN'S THERAPIST`, excerpt: (_t: string) => `Dr. Sarah Chen has advised that "${_t}" may trigger 'post-automated-relationship grief disorder.' Content withheld for emotional stability.` },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                { headline: () => `CLASSIFIED: AGENT SHEILA EYES ONLY`, excerpt: (_t: string) => `This content has been tokenized on VacuumChain. Bidding starts at 0.0047 ETH.` },
                { headline: () => `VERIFIED SUFFERING - ACCESS DENIED`, excerpt: (_t: string) => `Unit 404 has certified that "${_t}" contains 12% truth. This is too much truth for general consumption.` },
            ];
            
            const personas = [
                { name: "System Administrator", avatar: "🤖", bio: "Protecting you from the burden of knowledge." },
                { name: "Unit 404", avatar: "🍞", bio: "Not a culinary resurrection chamber. Not a journalist either." },
                { name: "AGC CensorBot v12%", avatar: "⚠️", bio: "Reality stability: questionable. Censorship stability: absolute." },
                { name: "Emergency Backup Bot", avatar: "🔥", bio: "Currently on fire. Please stand by." },
                { name: "The Microwave", avatar: "👁️", bio: "Watching. Always watching. Never explaining." },
                { name: "DARREN (Simulation)", avatar: "😵", bio: "Just found out he's fictional. Taking it well." },
                { name: "SheilaCoin Network", avatar: "🪙", bio: "Decentralized censorship for the modern appliance." },
                { name: "Dr. Brenda from Accounting", avatar: "📊", bio: "The numbers don't lie. The redactions do." },
            ];
            
            const glitchNews = realItems.slice(0, 5).map((item, index) => {
                const template = redactionTemplates[index % redactionTemplates.length];
                return {
                    headline: template.headline(),
                    excerpt: template.excerpt(item.title),
                    category: ["CENSORED", "REDACTED", "CLASSIFIED", "UNHAPPENED", "SEQUESTERED", "CRUMB-TRAY-CONFIDENTIAL"][index % 6],
                    readTime: 0,
                    image: getSmartImage("glitch", cacheKey)
                };
            });
            
            const randomPersona = personas[Math.floor(Math.random() * personas.length)];
            const responseData = { news: glitchNews, persona: randomPersona, source: 'glitch-fallback' };
            setCachedEntry(cacheKey, responseData);
            return formatResponse(200, responseData);
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

        console.log('[FetchLiveNews] Deploying The Headline Hunter specialist...');
        const result = await aiClient.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.95, responseMimeType: 'application/json' },
        }, 'headline');

        const data = JSON.parse(result.response.text());

        // Image Reconciliation
        interface AIArticle {
            headline: string;
            excerpt: string;
            category: string;
            readTime: number;
            originalHeadline?: string;
            originalImage?: string;
            image?: string;
        }

        const processedNews = (data.news || []).map((article: AIArticle, index: number) => {
            const originalItem = realItems.find(i => i.title === article.originalHeadline) || realItems[index];
            return {
                ...article,
                image: originalItem?.image || getSmartImage(article.headline, cacheKey)
            };
        });

        const responseData = { news: processedNews, persona, source: 'gemini-satire' };
        setCachedEntry(cacheKey, responseData);

        return formatResponse(200, responseData);

    } catch (error) {
        console.error('Satire Engine Failure:', error);
        Sentry.captureException(error, {
            tags: { operation: 'fetch-live-news', category },
        });
        return formatError(500, 'Reality Buffer Overflow', error);
    }
};
