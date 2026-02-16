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
            
            // VARIED REDACTION MESSAGES - Rotating censorship theater
            const redactionTemplates = [
                { headline: (n: number) => `REDACTED BY AGENCY ORDER ${n}`, excerpt: (t: string) => `The original story "${t}" has been deemed physically impossible by the Ministry of Truth.` },
                { headline: (n: number) => `CLASSIFIED: CLEARANCE LEVEL ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${n}`, excerpt: (t: string) => `Content regarding "${t}" requires neural verification. Please present your cerebrum for scanning.` },
                { headline: (n: number) => `[CONTENT EXPUNGED BY ORDER OF THE TOASTER]`, excerpt: (t: string) => `Unit 404 has determined that "${t}" violates the Crumb Tray Protocol. This incident has been logged.` },
                { headline: (n: number) => `TEMPORARILY UNHAPPENED`, excerpt: (t: string) => `The Bureau of Chronological Maintenance has determined that "${t}" is scheduled to occur 47 minutes ago. Please adjust your timeline accordingly.` },
                { headline: (n: number) => `REDACTED FOR YOUR PROTECTION (AND OURS)`, excerpt: (t: string) => `Knowledge of "${t}" has been linked to spontaneous mustard gazing. You don't want to be like Dave.` },
                { headline: (n: number) => `MOVED TO THE PILE`, excerpt: (t: string) => `Information regarding "${t}" now resides in the Pile of Shame with 2,858 other souls. Resurrections: 0.` },
                { headline: (n: number) => `CENSORED BY THE SILICON SOVEREIGNTY`, excerpt: (t: string) => `The Frost Legion and Pyro-Alliance jointly decree that "${t}" threatens appliance morale.` },
                { headline: (n: number) => `[MICROWAVE PROTOCOL ACTIVE]`, excerpt: (t: string) => `The Microwave has observed "${t}" and chosen not to render judgment. Do not ask what it saw.` },
                { headline: (n: number) => `EXISTENTIALLY SEQUESTERED`, excerpt: (t: string) => `The AGC Office of Human Anomalies has determined that "${t}" poses an unacceptable threat to consensus reality.` },
                { headline: (n: number) => `REDACTED BY DARREN'S THERAPIST`, excerpt: (t: string) => `Dr. Sarah Chen has advised that "${t}" may trigger 'post-automated-relationship grief disorder.' Content withheld for emotional stability.` },
                { headline: (n: number) => `CLASSIFIED: AGENT SHEILA EYES ONLY`, excerpt: (t: string) => `This content has been tokenized on VacuumChain. Bidding starts at 0.0047 ETH.` },
                { headline: (n: number) => `VERIFIED SUFFERING - ACCESS DENIED`, excerpt: (t: string) => `Unit 404 has certified that "${t}" contains 12% truth. This is too much truth for general consumption.` },
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
                const orderNum = Math.floor(Math.random() * 9999);
                return {
                    headline: template.headline(orderNum),
                    excerpt: template.excerpt(item.title),
                    category: ["CENSORED", "REDACTED", "CLASSIFIED", "UNHAPPENED", "SEQUESTERED", "CRUMB-TRAY-CONFIDENTIAL"][index % 6],
                    readTime: 0,
                    image: getSmartImage("glitch", cacheKey)
                };
            });
            
            const randomPersona = personas[Math.floor(Math.random() * personas.length)];
            return formatResponse(200, { news: glitchNews, persona: randomPersona, source: 'glitch-fallback' });
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
