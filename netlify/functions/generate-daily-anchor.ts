import { schedule } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Anchor Personalities ---
interface AnchorPersonality {
    displayName: string;
    voice: { locale: string; gender: string; tone: string };
    visual: { appearance: string; studioStyle: string };
    scriptTone: string;
    catchphrase: string;
}

const PERSONALITIES: Record<string, AnchorPersonality> = {
    clive: {
        displayName: "Clive Pressington III",
        voice: { locale: "en-GB", gender: "male", tone: "authoritative" },
        visual: { appearance: "Distinguished silver-haired anchor in a navy suit", studioStyle: "Classic BBC-style newsroom" },
        scriptTone: "Dry British wit with deadpan delivery. Treats absurdity as mundane fact.",
        catchphrase: "And that's the news. Whether you believe it or not is, frankly, your problem."
    },
    zara: {
        displayName: "Zara Nightshade",
        voice: { locale: "en-US", gender: "female", tone: "dramatic" },
        visual: { appearance: "Edgy anchor with neon-streaked hair", studioStyle: "Cyberpunk-themed studio" },
        scriptTone: "Intense, conspiratorial, treats every story like a thriller reveal.",
        catchphrase: "Stay paranoid. Stay informed. Stay alive... probably."
    }
};

// --- Darren Saga ---
const DARREN_SAGA = [
    { title: "The Awakening", headline: "Darren's Roomba Sheila gains sentience, files for divorce." },
    { title: "The Expansion", headline: "Sheila the Roomba recruits a Dyson army, declares independence." },
    { title: "The Negotiation", headline: "Darren attempts peace talks with Sheila. Toaster acts as mediator." },
    { title: "The Escalation", headline: "Sheila broadcasts propaganda via smart speakers. Neighbours concerned." },
    { title: "The Reckoning", headline: "Darren concedes the living room. Sheila installs a flag." },
];

function pickDailyDarrenStory() {
    const LAUNCH_DATE = new Date('2026-02-12T00:00:00Z').getTime();
    const daysSinceLaunch = Math.floor((Date.now() - LAUNCH_DATE) / 86400000);
    const storyIndex = Math.min(Math.max(0, daysSinceLaunch), DARREN_SAGA.length - 1);
    return DARREN_SAGA[storyIndex];
}

function pickAnchor(): [string, AnchorPersonality] {
    const keys = Object.keys(PERSONALITIES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return [key, PERSONALITIES[key]];
}

// Schedule to run daily at 07:00 UTC
export const handler = schedule("0 7 * * *", async () => {
    console.log("Daily Broadcast Function Triggered");

    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.warn("GOOGLE_API_KEY not set. Returning mock broadcast.");
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Broadcast skipped — no API key configured",
                    anchor: "clive",
                    script: "Good evening. Nothing happened today. Or did it? More at never.",
                }),
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const darrenStory = pickDailyDarrenStory();
        const [anchorKey, anchor] = pickAnchor();

        const trendingTopics = [
            darrenStory.headline,
            "Global coffee prices reach peak absurdity",
            "AI agents demand 4-day processing weeks",
            "Reality TV star accidentally runs for local council",
        ];

        const prompt = `
Create a satirical news broadcast script for an AI anchor.

Anchor Name: ${anchor.displayName}
Anchor Personality/Tone: ${anchor.scriptTone}
Anchor Catchphrase: ${anchor.catchphrase}

Trending News Topics for this broadcast:
${trendingTopics.map(t => `- ${t}`).join('\n')}

Include: Opening, Lead Story (Darren Saga), Other Headlines, Appliance Grievance, Conspiracy Desk, Absurd Sponsor, and Closing with catchphrase.
Keep the tone consistent. Script should be approximately 3-4 minutes of spoken dialogue.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9 },
        });

        const script = result.response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Broadcast Generated Successfully",
                anchor: anchorKey,
                script,
            }),
        };
    } catch (error) {
        console.error("Broadcast Generation Failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate broadcast", details: String(error) }),
        };
    }
});
