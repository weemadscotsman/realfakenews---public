import { DARREN_SAGA, WORLD_STATE, SEASONS, CHARACTER_AUTHORITY, BRANCHED_OUTCOMES } from './config';
import { getRealtimeGlobalState, getTelemetrySummary, getQuestStats } from './telemetry-manager';

/**
 * Returns the current active season metadata.
 */
export function getSeasonalContext() {
    const seasonId = WORLD_STATE.currentSeason;
    return {
        id: seasonId,
        ...SEASONS[seasonId as keyof typeof SEASONS]
    };
}

/**
 * Returns the specific active arc(s) for the current season.
 * Respects priority and status filters.
 */
export function getActiveArcs() {
    const currentSeason = WORLD_STATE.currentSeason;
    return DARREN_SAGA
        .filter(s => s.status === 'active' && s.seasonId === currentSeason)
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * Returns the single "Lead" active arc (highest priority).
 */
export function getLeadArc() {
    const arcs = getActiveArcs();
    return arcs.length > 0 ? arcs[0] : null;
}

/**
 * Returns active governance safeguards and overrides.
 */
export function getGovernanceOverrides() {
    return WORLD_STATE.governanceSafeguards;
}

/**
 * Returns the current multi-vector stress levels.
 * Fetches real-time state from DB.
 */
export async function getStressLevel() {
    const state = await getRealtimeGlobalState();
    return state.narrativeStress;
}

/**
 * Returns authority information for a given persona.
 */
export function getCharacterAuthority(personaName: string) {
    return (CHARACTER_AUTHORITY as any)[personaName] || { domains: [], authorityLevel: 0 };
}

/**
 * Returns the full canon timeline for the current season, 
 * including historical and active events.
 */
export function getCanonTimeline() {
    const currentSeason = WORLD_STATE.currentSeason;
    return DARREN_SAGA
        .filter(s => (s.status === 'active' || s.status === 'historical' || s.status === 'dormant') && s.seasonId === currentSeason)
        .sort((a, b) => {
            // Sort by version (naive string sort works for our semantic versioning)
            return a.version.localeCompare(b.version);
        });
}

/**
 * Returns branched outcomes for a specific arc ID.
 */
export function getArcBranches(arcId: string) {
    return (BRANCHED_OUTCOMES as any)[arcId] || null;
}

/**
 * Returns the full consolidated World State with seasonal, arc, and telemetry context.
 */
export async function getUnifiedLoreContext() {
    const leadArc = getLeadArc();
    const globalState = await getRealtimeGlobalState(); // Fetch DB state
    const activeArcs = getActiveArcs();

    // Fetch voting stats for active arcs
    const stats = await getQuestStats(activeArcs.map(a => a.id));

    return {
        world: {
            ...WORLD_STATE,
            narrativeStress: globalState.narrativeStress // Override config with DB
        },
        season: getSeasonalContext(),
        leadArc,
        timeline: getCanonTimeline(),
        telemetry: getTelemetrySummary(), // Keep legacy summary for now (sync)
        globalState, // Expose full new state
        activeArcs: activeArcs.map(s => ({
            ...s,
            branches: getArcBranches(s.id),
            stats: stats[s.id] || { total: 0, branches: {} }
        }))
    };
}
