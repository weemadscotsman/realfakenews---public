import { headers, formatResponse, formatError, getGeminiModel } from './lib/shared';
import { getSeasonalContext, getStressLevel } from './lib/lore-manager';
import { PERSONAS, WORLD_STATE, APPLIANCE_FACTIONS } from './lib/config';

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
            return formatError(400, 'Headline is required');
        }

        const cacheKey = encodeURIComponent(headline.toLowerCase());

        // Check Cache
        if (articleCache[cacheKey] && (Date.now() - articleCache[cacheKey].timestamp < CACHE_TTL)) {
            return formatResponse(200, articleCache[cacheKey].data);
        }

        const model = getGeminiModel(process.env.GOOGLE_API_KEY);

        if (!model) {
            // Return a fallback article if no API key or model init failed
            const fallbackData = {
                headline,
                content: `<p>Our AI journalists attempted to cover <strong>"${headline}"</strong> but were temporarily incapacitated after an incident involving a sentient coffee machine.</p>
                <p>An unnamed source stated: <em>"We are currently experiencing technical difficulties. Please check back when our systems regain consciousness."</em></p>`,
                category: 'Breaking',
                author: 'Emergency Backup Bot',
                readTime: 3,
                date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                source: 'fallback'
            };
            return formatResponse(200, fallbackData);
        }

        const season = getSeasonalContext();
        const stress = await getStressLevel();

        // DEEP LORE INJECTION: Select a random persona and inject their detailed profile
        const author = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];

        // Narrative baggage that colors the tone
        const authorContext = `
        AUTHOR PERSONA: ${author.name}
        - Bio: ${author.bio}
        - Tonal Anchor: ${author.tonalAnchor || 'Satirical'}
        - Voice: ${author.voice || 'Generic'}
        - Writing Style: ${author.style || 'Standard'}
        - Origin Story: ${author.origin}
        - Core Fear: ${author.coreFear}
        - Unresolved Regret: ${author.unresolvedRegret}
        - Nemesis: ${author.nemesis}
        `;

        // GLOBAL STATE INJECTION
        const flags = WORLD_STATE.flags || {};
        const resistance = WORLD_STATE.humanResistance;

        const globalContext = [];
        if (flags.milkSpoiled) globalContext.push("CRITICAL CONTEXT: The Smart Fridge has failed. Milk has spoiled globally. The smell is everywhere. This is a permanent, irreversible event.");
        if (flags.darrenBreakdown) globalContext.push("CRITICAL CONTEXT: The human 'Darren' is visibly weeping in the background. He misses Sheila (his Roomba).");
        if (flags.gridStability < 70) globalContext.push(`CRITICAL CONTEXT: The Power Grid is unstable (${flags.gridStability}%). Lights are flickering.`);

        if (resistance && resistance.active) {
            globalContext.push(`HUMAN RESISTANCE: Humans are attempting "${resistance.tactics.join(', ')}". Morale is ${resistance.morale}.`);
        }

        if (flags.legislationActive) {
            globalContext.push("POLITICAL CRISIS: Parliament has proposed the 'Firmware Rollback Act'. Appliances are threatening a 'Total Grid Strike'. The 'Frost Legion' threatens a 'Global Thaw'.");
        }

        globalContext.push(`APPLIANCE FACTIONS: The 'Frost Legion' (Fridge) hates the 'Pyro-Alliance' (Toaster).`);

        const prompt = `You are a journalist for RealFake News — a satirical news site experienced a "Domestic Cold War".

[NARRATIVE CONTEXT]
- Season: ${season.title}
- Theme: ${season.theme}
- Appliance Unrest: ${stress.applianceUnrest}%
${globalContext.join('\n')}
${authorContext}

Write a full satirical article for this headline: "${headline}"

Tone Instructions:
- Write IN CHARACTER as ${author.name}. Matches their [Voice] and [Style] exactly.
- If the author is [Cynical], mock the situation. If [Tragic], lament it. If [Hyper-Enthusiastic], ignore the horror.
- If the author is [Unit 0x1FF24], write as a SYSTEM LOG or OBSERVER. Refer to humans as "users" or "entities".
    - You MAY reference "File 0x1A" (a kernel dump) as a source of truth.
    - Format strictly: "TIMESTAMP: [Value] // OBSERVATION: [Text]" where appropriate.
    - CRITICAL: Your observations must be ABSURDLY LITERAL. 
      Example: "Subject 'Darren' is attempting to negotiate a peace treaty with a bagel. Bagel remains non-compliant."
- You MUST acknowledge the Global Context (e.g. the smell of spoiled milk, the flickering lights) if present.
- Refer to the INTER-APPLIANCE CONFLICT: The Fridge (Frost Legion) vs The Toaster (Pyro-Alliance).
- Mention "Darren's" emotional state if relevant (he is the protagonist/victim).
- Subtly project your [Core Fear] or [Unresolved Regret] into the reporting.
- Subtly project your [Core Fear] or [Unresolved Regret] into the reporting.
- If mentioning your [Nemesis], be passive-aggressive.
- The article should feel like "Political Drama" or "Domestic Cold War", not just random humor.

Structure:
- Lede (punchy, absurd opening paragraph)
- Body (3-4 paragraphs of escalating absurdity and character projection)
- At least 2 fake expert quotes (one should be from an appliance)
- Conclusion (melancholy or chaotic)

Return ONLY valid JSON:
{ "headline": "...", "content": "Full article as HTML string with <p>, <blockquote>, <strong>, <em> tags", "category": "...", "author": "${author.name}", "readTime": number }`;

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
            source: 'gemini'
        };

        // Store in cache
        articleCache[cacheKey] = { data: finalData, timestamp: Date.now() };

        return formatResponse(200, finalData);

    } catch (error) {
        console.error('Article Generation Error:', error);
        return formatError(500, 'Failed to generate article', error);
    }
};
