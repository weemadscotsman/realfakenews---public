/**
 * Daily Content Cache
 * Ensures AI-generated content stays consistent for 24 hours
 * Refreshes automatically each day
 */

interface CachedContent<T> {
  data: T;
  date: string; // YYYY-MM-DD
  source: 'ai' | 'mock' | 'fallback';
}

const CACHE_PREFIX = 'rfn_daily_';

/**
 * Get today's date string
 */
function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if cached content is from today
 */
function isToday(dateString: string): boolean {
  return dateString === getTodayKey();
}

/**
 * Get cached daily content or null if expired/missing
 */
export function getDailyCache<T>(key: string): T | null {
  try {
    const fullKey = CACHE_PREFIX + key;
    const stored = localStorage.getItem(fullKey);
    if (!stored) return null;
    
    const parsed: CachedContent<T> = JSON.parse(stored);
    if (!isToday(parsed.date)) {
      // Expired - clear it
      localStorage.removeItem(fullKey);
      return null;
    }
    
    console.log(`[DailyCache] Using cached ${key} from ${parsed.source} (${parsed.date})`);
    return parsed.data;
  } catch {
    return null;
  }
}

/**
 * Save content to daily cache
 */
export function setDailyCache<T>(key: string, data: T, source: 'ai' | 'mock' | 'fallback' = 'ai'): void {
  try {
    const fullKey = CACHE_PREFIX + key;
    const cacheEntry: CachedContent<T> = {
      data,
      date: getTodayKey(),
      source,
    };
    localStorage.setItem(fullKey, JSON.stringify(cacheEntry));
    console.log(`[DailyCache] Saved ${key} from ${source} for ${getTodayKey()}`);
  } catch (error) {
    console.warn('[DailyCache] Failed to save:', error);
  }
}

/**
 * Clear all daily caches (for manual refresh)
 */
export function clearDailyCaches(): void {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
    console.log('[DailyCache] All caches cleared');
  } catch (error) {
    console.warn('[DailyCache] Failed to clear:', error);
  }
}

/**
 * Force refresh - clear cache and get fresh content
 */
export async function forceRefresh<T>(
  key: string,
  fetchFn: () => Promise<T>,
  fallbackFn: () => T
): Promise<T> {
  clearDailyCaches();
  return getOrFetchDaily(key, fetchFn, fallbackFn, true);
}

/**
 * Main function: Get cached content or fetch fresh
 * Ensures AI is called FIRST before any fallbacks
 */
export async function getOrFetchDaily<T>(
  key: string,
  fetchFn: () => Promise<T>,
  fallbackFn: () => T,
  skipCache = false
): Promise<T> {
  // Check cache first (unless forcing refresh)
  if (!skipCache) {
    const cached = getDailyCache<T>(key);
    if (cached !== null) {
      return cached;
    }
  }
  
  // ALWAYS try AI first
  console.log(`[DailyCache] Fetching fresh ${key} from AI...`);
  try {
    const fresh = await fetchFn();
    // Validate we got real data
    if (fresh && (
      (Array.isArray(fresh) && fresh.length > 0) ||
      (typeof fresh === 'object' && Object.keys(fresh).length > 0) ||
      (typeof fresh === 'string' && fresh.length > 10)
    )) {
      setDailyCache(key, fresh, 'ai');
      return fresh;
    }
    throw new Error('AI returned empty/invalid data');
  } catch (error) {
    console.warn(`[DailyCache] AI fetch failed for ${key}:`, error);
    
    // Only use fallback if AI completely fails
    console.log(`[DailyCache] Using fallback for ${key}`);
    const fallback = fallbackFn();
    setDailyCache(key, fallback, 'fallback');
    return fallback;
  }
}
