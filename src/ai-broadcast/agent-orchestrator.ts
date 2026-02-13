import { generateAnchorScript } from "./generate-anchor-script";
import type { AnchorPersonality } from "./generate-anchor-script";
import { buildVeoPrompt } from "./veo-builder";
import { generateVideo as generateVideoVeo } from "./veo-runner";
import { generateVideoWithSeedance } from "./seedance-runner";
import { uploadToCDN } from "./uploader";
import personalities from "./anchor-personalities.json";
import narrative from "../config/narrative.json";

interface BroadcastContext {
    trending: string[];
    anchorKey: string;
    anchor: AnchorPersonality;
    script: string | null;
    veoPrompt: string;
    video: string;
    finalUrl: string;
}

/**
 * Main orchestrator for the AI Broadcast agents.
 * This function stitches together the harvesting, script writing, video generation, and distribution.
 */
export async function runBroadcastAgents() {
    const context = {} as BroadcastContext;

    console.log("Starting Multi-Agent Orchestration...");

    // Agent 1: News Harvester
    // Picks the "Darren Saga" entry of the day for continuity
    const darrenStory = pickDailyDarrenStory();
    context.trending = await agentTrending(darrenStory.headline);
    console.log(`Agent 1 (Harvester): Daily Darren Saga - "${darrenStory.title}" acquired.`);

    // Agent 2: Personality Selector
    const anchorKey = pickAnchor();
    const anchor = (personalities as Record<string, AnchorPersonality>)[anchorKey];
    context.anchorKey = anchorKey;
    context.anchor = anchor;
    console.log(`Agent 2 (Stylist): Selected personality - ${anchorKey}.`);

    // Agent 3: Script Writer
    // Passes the trending topics to the script generator to ensure topical satire.
    context.script = await agentScript(anchorKey, anchor, context.trending);
    if (!context.script) throw new Error("Script generation failed");
    console.log(`Agent 3 (Script): Script generated for ${anchorKey}.`);

    // Agent 4: Video Generator
    // Merges the script with VEO/Seedance visual rules.
    // Seedance is preferred for synced audio, Veo is a high-quality visual fallback.
    try {
        console.log("Agent 4 (Video): Attempting Seedance Generation (Synced Audio)...");
        context.video = await agentVideoSeedance(context.script);
    } catch (error) {
        console.warn("Seedance failed, falling back to Veo 3.1:", error);
        context.veoPrompt = buildVeoPrompt(anchorKey, context.script);
        context.video = await agentVideoVeo(context.veoPrompt);
    }
    console.log("Agent 4 (Video): Video generated successfully.");

    // Agent 5: Distribution
    // Uploads the final file to the CDN for user consumption.
    context.finalUrl = await agentUpload(context.video);
    console.log("Agent 5 (Upload): Broadcast uploaded to CDN.");

    return context;
}

// --- Agent Functions ---

async function agentTrending(darrenHeadline: string): Promise<string[]> {
    // Returns trending topics with the Darren headline prioritized
    return [
        darrenHeadline,
        "Global coffee prices reach peak absurdity",
        "AI agents demand 4-day processing weeks",
        "Reality TV star accidentally runs for local council",
        "Synchronicity levels at all-time high"
    ];
}

function pickDailyDarrenStory() {
    const saga = narrative.darrenSaga;

    // Project 'Launch' Reference: Feb 12th, 2026
    const LAUNCH_DATE = new Date('2026-02-12T00:00:00Z').getTime();
    const now = Date.now();

    // Calculate days passed since launch (24h blocks)
    const daysSinceLaunch = Math.floor((now - LAUNCH_DATE) / 86400000);

    // PROGRESSION MODE:
    // We progress sequentially through the parts. 
    // If no more parts exist, we stick to the LATEST part (highest index).
    const storyIndex = Math.min(Math.max(0, daysSinceLaunch), saga.length - 1);

    // Safety check for empty saga
    if (saga.length === 0) return { title: "The Void", headline: "NOTHING HAPPENED TODAY.", id: "none" };

    return saga[storyIndex];
}

async function agentScript(anchorKey: string, anchor: AnchorPersonality, trendingTopics: string[]): Promise<string | null> {
    return await generateAnchorScript(anchorKey, anchor, trendingTopics);
}

async function agentVideoVeo(prompt: string): Promise<string> {
    return await generateVideoVeo(prompt);
}

async function agentVideoSeedance(script: string): Promise<string> {
    // Seedance takes the raw script for audio-sync
    return await generateVideoWithSeedance(script);
}

async function agentUpload(videoFile: string): Promise<string> {
    return await uploadToCDN(videoFile);
}

function pickAnchor(): string {
    const anchors = Object.keys(personalities);
    return anchors[Math.floor(Math.random() * anchors.length)];
}
