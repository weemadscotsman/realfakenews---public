/**
 * Shared utility for calling Netlify functions safely
 */
async function callFunction<T>(name: string, body: object, fallback: T): Promise<T> {
    try {
        const response = await fetch(`/.netlify/functions/${name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        const data = await response.json();
        if (data.error && !data.fallback) {
            console.error(`Function ${name} error:`, data.error);
            return fallback;
        }

        return (data.result !== undefined ? data.result : data) as T;
    } catch (error) {
        console.error(`API Call failed (${name}):`, error);
        return fallback;
    }
}

/**
 * Generate structured JSON content via server-side Gemini proxy
 */
export async function generateJSON<T>(prompt: string, fallback: T): Promise<T> {
    const result = await callFunction('generate-content', { prompt, mode: 'json' }, fallback);
    return result as T;
}

/**
 * Generate plain text content via server-side Gemini proxy
 */
export async function generateText(prompt: string, fallback: string = ''): Promise<string> {
    const data = await callFunction('generate-content', { prompt, mode: 'text' }, { result: fallback });
    return typeof data === 'string' ? data : (data as { result?: string }).result || fallback;
}

/**
 * Generate a full satirical article for a given headline.
 * Now routes to the specialized backend function for better quality and performance.
 */
export async function generateArticle(headline: string) {
    try {
        const response = await fetch(`/.netlify/functions/generate-article?headline=${encodeURIComponent(headline)}`);

        if (!response.ok) throw new Error('Backend generation failed');

        const data = await response.json();
        return {
            ...data,
            date: data.date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        };
    } catch (error) {
        console.warn('Backend article gen failed, using static fallback:', error);
        return {
            headline,
            content: `<p>Our AI journalists attempted to cover this story but were temporarily incapacitated. Please try again in 404 seconds.</p>`,
            category: 'Breaking',
            author: 'System Recovery Bot',
            readTime: 3,
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        };
    }
}

/**
 * Fetch a generated performance review for the user.
 */
export interface PerformanceReview {
    review: string;
    appliance: string;
    status: string;
}

export async function fetchPerformanceReview(username: string, xp: number, tokens: number, roasts: number): Promise<PerformanceReview> {
    return callFunction('generate-performance-review', { username, xp, tokens, roasts }, {
        review: "The Oracle is currently offline. Your metrics are irrelevant.",
        appliance: "The System",
        status: "FALLBACK"
    });
}

/**
 * Log a narrative telemetry event (user choice, purchase, etc.)
 */
export async function logTelemetryEvent(event: {
    type: 'decision' | 'engagement' | 'alignment';
    arcId: string;
    branchId?: string;
    metadata?: Record<string, unknown>;
    userId?: string;
}) {
    return callFunction('log-telemetry', event, { status: 'FAILED' });
}

export interface StoryArc {
    id: string;
    title: string;
    headline?: string;
    priority?: number;
    branches: {
        id: string;
        title: string;
        consequence: string;
        triggers: Record<string, unknown>;
    }[] | null;
}

/**
 * Fetch the current global lore and world state.
 */
export interface WorldState {
    governanceLevel: string;
    narrativeStress: {
        applianceUnrest: number;
        humanCountermeasures: number;
        corporateContainment: number;
        beverageIdeologicalSpread: number;
    };
    activeStories: StoryArc[];
}

export async function fetchWorldState(): Promise<WorldState> {
    return callFunction('get-world-state', {}, {
        governanceLevel: 'UNKNOWN',
        narrativeStress: {
            applianceUnrest: 0,
            humanCountermeasures: 0,
            corporateContainment: 0,
            beverageIdeologicalSpread: 0
        },
        activeStories: []
    });
}

/**
 * Cast a vote on a quest branch using Roast Tokens.
 */
export async function voteOnQuest(userId: string, arcId: string, branchId: string): Promise<{ success: boolean; message: string }> {
    return callFunction('vote-quest', { userId, arcId, branchId }, {
        success: false,
        message: 'Voting System Offline'
    });
}
