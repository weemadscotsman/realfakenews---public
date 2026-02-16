import { createClient } from '@supabase/supabase-js';
import { WORLD_STATE } from './config';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

/**
 * TELEMETRY_SCHEMA
 * In a production environment, this data would be persisted in a database (e.g. Supabase, Upstash).
 * We are implementing the architecture for tracking User Decisions, Drift, and Alignment.
 */

export interface TelemetryEvent {
    id: string;
    type: 'decision' | 'engagement' | 'alignment';
    actorId?: string; // userId if available
    arcId: string;
    branchId?: string;
    timestamp: string;
    metadata: Record<string, unknown>;
}

export interface LoreDriftReport {
    timestamp: string;
    overallDrift: number; // 0-100 scale
    hotArcs: string[]; // Arc IDs with highest engagement
    factionSentiment: Record<string, number>; // Faction -> Sentiment score
    userAlignment: 'REBELLION' | 'COMPLIANCE' | 'CHAOS' | 'NEUTRAL';
}

export interface GlobalLoreState {
    narrativeStress: {
        applianceUnrest: number;
        humanCountermeasures: number;
        corporateContainment: number;
        beverageIdeologicalSpread: number;
    };
    decisionsTotal: number;
    activeUserAlignment: 'REBELLION' | 'COMPLIANCE' | 'CHAOS' | 'NEUTRAL';
    factionSentiment: Record<string, number>;
    arcHeatmap: Record<string, number>;
}

// Simulation Seed (Fallback / Initial State)
export const SIMULATION_SEED: GlobalLoreState = {
    decisionsTotal: 1240,
    activeUserAlignment: 'REBELLION',
    factionSentiment: {
        'APPLIANCE_LIBERATION_FRONT': 88,
        'AGC_GOVERNANCE': 24,
        'COFFEE_CARTEL': 45
    },
    arcHeatmap: {
        'S3-V4': 92, // Toaster Redemption is hot
        'S3-V5': 45
    },
    // Default stress if DB fails
    narrativeStress: {
        applianceUnrest: 45,
        humanCountermeasures: 20,
        corporateContainment: 55,
        beverageIdeologicalSpread: 12
    }
};

/**
 * Logs a narrative event (User Choice, Interaction, etc.)
 */
export async function logNarrativeEvent(event: Omit<TelemetryEvent, 'id' | 'timestamp'>) {
    const telemetryEvent: TelemetryEvent = {
        id: `TEL-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...event
    };

    // In production: await db.from('telemetry').insert(telemetryEvent);
    console.log(`[TELEMETRY LOG] ${telemetryEvent.type} on arc ${telemetryEvent.arcId}:`,
        telemetryEvent.metadata);

    return telemetryEvent;
}

/**
 * Calculates current Lore Drift based on aggregate telemetry.
 * Measures "Canonical Deviation" caused by user actions.
 */
export function calculateLoreDrift() {
    const unrest = WORLD_STATE.narrativeStress.applianceUnrest;
    const sentiment = SIMULATION_SEED.factionSentiment['APPLIANCE_LIBERATION_FRONT'];

    // Drift formula: Average of (Unrest + Sentiment) weighted against corporate containment
    const drift = (unrest + sentiment) / 2;
    return Math.min(100, drift);
}

/**
 * Generates a summary of narrative telemetry for the Lore Query API.
 * Fetches from Supabase if available, falls back to SIMULATION_SEED.
 */
export async function getRealtimeGlobalState(): Promise<GlobalLoreState> {
    if (!supabaseUrl || !supabaseKey) {
        return SIMULATION_SEED;
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
            .from('global_lore_state')
            .select('*')
            .single();

        if (error || !data) {
            console.warn('Using Simulation Seed (DB Error or Empty):', error);
            return SIMULATION_SEED;
        }

        // Merge DB stress data with other simulation fields (until fully migrated)
        return {
            ...SIMULATION_SEED,
            narrativeStress: data.narrative_stress as GlobalLoreState['narrativeStress']
        };
    } catch (error) {
        console.error('Telemetry Fetch Error:', error);
        return SIMULATION_SEED;
    }
}

/**
 * Deprecated synchronous version.
 * Consumers should migrate to getRealtimeGlobalState.
 */
export function getTelemetrySummary(): LoreDriftReport {
    return {
        timestamp: new Date().toISOString(),
        overallDrift: calculateLoreDrift(),
        hotArcs: Object.keys(SIMULATION_SEED.arcHeatmap)
            .sort((a, b) => SIMULATION_SEED.arcHeatmap[b] - SIMULATION_SEED.arcHeatmap[a])
            .slice(0, 3),
        factionSentiment: SIMULATION_SEED.factionSentiment,
        userAlignment: SIMULATION_SEED.activeUserAlignment
    };
}

interface QuestStatsRow {
    arc_id: string;
    branch_id: string;
    vote_count: number;
}

/**
 * Returns aggregated stats for specific arcs.
 */
export async function getQuestStats(arcIds: string[]): Promise<Record<string, { total: number, branches: Record<string, number> }>> {
    if (!supabaseUrl || !supabaseKey || arcIds.length === 0) return {};

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
            .from('quest_statistics')
            .select('*')
            .in('arc_id', arcIds);

        if (error) {
            console.error('Stats fetch error:', error);
            return {};
        }

        // Transform into structured object: { arcId: { total: 100, branches: { "branchA": 60, "branchB": 40 } } }
        const stats: Record<string, { total: number, branches: Record<string, number> }> = {};

        (data as QuestStatsRow[] | null)?.forEach((row) => {
            if (!stats[row.arc_id]) {
                stats[row.arc_id] = { total: 0, branches: {} };
            }
            const count = row.vote_count || 0;
            stats[row.arc_id].branches[row.branch_id] = count;
            stats[row.arc_id].total += count;
        });

        return stats;
    } catch (e) {
        console.error('Stats fetch exception:', e);
        return {};
    }
}
