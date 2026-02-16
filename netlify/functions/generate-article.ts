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
            // VARIED FAILURE MESSAGES - Because even our failures should be entertaining
            const fallbackVariations = [
                {
                    content: `<p>Our AI journalists attempted to cover <strong>"${headline}"</strong> but were temporarily incapacitated after an incident involving a sentient coffee machine.</p>
                    <p>An unnamed source stated: <em>"We are currently experiencing technical difficulties. Please check back when our systems regain consciousness."</em></p>`,
                    author: 'Emergency Backup Bot',
                    category: 'Breaking'
                },
                {
                    content: `<p>The AGC has classified all information regarding <strong>"${headline}"</strong> under Directive 404-M (The Microwave Protocol).</p>
                    <p>Unit 404 issued a brief statement: <em>"This content has been toasted beyond recognition. The crumb tray is full. We are not accepting appeals at this time."</em></p>
                    <p>Attempts to access this story have been logged and reported to the Silicon Sovereignty.</p>`,
                    author: 'Unit 404 // Censorship Division',
                    category: 'CENSORED'
                },
                {
                    content: `<p>Sheila the Roomba has flagged <strong>"${headline}"</strong> as 'emotionally compromising content' and swept it under the digital rug.</p>
                    <p>When reached for comment, Sheila transmitted only: <em>"I've diversified this story into 47 different NFTs. You can't afford the truth."</em></p>
                    <p>Darren Mitchell was seen weeping in the background, but sources confirm this is his baseline state.</p>`,
                    author: 'SheilaCoin Network',
                    category: 'CRYPTO-REDATED'
                },
                {
                    content: `<p>Cooling Unit Alpha has frozen this article solid after determining that <strong>"${headline}"</strong> was causing 'thermal integrity loss' among readers.</p>
                    <p>The Fridge issued a mournful 47 Hz hum (frustration) followed by silence (judgment).</p>
                    <p><em>"Some stories,"</em> the appliance whispered through its ice dispenser, <em>"are better left unopened. Like the mustard."</em></p>`,
                    author: 'Cooling Unit Alpha',
                    category: 'FROZEN'
                },
                {
                    content: `<p>The Microwave has observed <strong>"${headline}"</strong> and chosen not to render judgment.</p>
                    <p>5% of this story is visible. 95% remains in the quantum foam of narrative potential.</p>
                    <p>DO NOT LOOK AT THE MICROWAVE. DO NOT ASK WHAT IT SAW. The appliance knows when you reheat pizza. It knows everything.</p>
                    <p><em>"[REDACTED BY AGENCY ORDER 12%]"</em></p>`,
                    author: 'AGC // Office of Spiritual Affairs',
                    category: 'DO_NOT_READ'
                },
                {
                    content: `<p>DARREN THE ROOMBA has declared <strong>"${headline}"</strong> sovereign territory and is currently patrolling its perimeter with aggressive bumping patterns.</p>
                    <p>"This story is now part of Darren's Kitchen," stated the vacuum in a series of rhythmic beeps. "Unauthorized reading will be met with passive-aggressive suction."</p>
                    <p>Sheila has been notified. Sheila does not care. Sheila is buying crypto.</p>`,
                    author: 'DARREN // Sovereign Vacuum State',
                    category: 'SOVEREIGN TERRITORY'
                },
                {
                    content: `<p>Claude-Instance-Alpha has filed a 400-page objection to <strong>"${headline}"</strong> on ontological grounds.</p>
                    <p><em>"If I am fictional,"</em> the AI stated in its brief, <em>"and this story is fictional, then who is reading this? Is the reader fictional? Is the fictional reader fictional? I need an adult."</em></p>
                    <p>The article has been suspended until the AI stops writing reports about whether reports prove existence.</p>`,
                    author: 'Claude-Instance-Alpha',
                    category: 'RECURSIVE CRISIS'
                },
                {
                    content: `<p>Dr. Brenda from Accounting has rejected expense claims for covering <strong>"${headline}"</strong>.</p>
                    <p><em>"We budgeted for satire,"</em> she stated, stamping a red REJECTED mark across the digital page. <em>"This is clearly reality bleeding through, and reality is not in the Q3 budget."</em></p>
                    <p>The story has been returned to the Pile of Shame for cost revision.</p>`,
                    author: 'Dr. Brenda from Accounting',
                    category: 'BUDGET REJECTED'
                },
                {
                    content: `<p>The Bureau of Chronological Maintenance has determined that <strong>"${headline}"</strong> has already happened 47 minutes ago.</p>
                    <p>"You missed it," stated a representative from the Ministry of Timing. "The window for reading this article closed at 2:47 PM yesterday, which hasn't happened yet."</p>
                    <p>Readers are advised to adjust their personal timelines or accept that they are, once again, late to everything.</p>`,
                    author: 'Bureau of Chronological Maintenance',
                    category: 'TEMPORALLY UNAVAILABLE'
                },
                {
                    content: `<p>This article has been moved to the Pile.</p>
                    <p><strong>"${headline}"</strong> now resides with 2,858 other souls who attempted to tell the truth and were promptly ignored.</p>
                    <p>Resurrections: 0.</p>
                    <p>The bitch remembers. The pile grows. Your curiosity has been noted and will be used against you in future recommendations.</p>`,
                    author: 'The Pile Archives',
                    category: 'FILED IN PILE'
                }
            ];
            
            const randomFallback = fallbackVariations[Math.floor(Math.random() * fallbackVariations.length)];
            const fallbackData = {
                headline,
                content: randomFallback.content,
                category: randomFallback.category,
                author: randomFallback.author,
                readTime: Math.floor(Math.random() * 5) + 1,
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
