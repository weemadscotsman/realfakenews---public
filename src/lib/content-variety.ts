/**
 * Content Variety System
 * Prevents repetitive AI responses by tracking recently used phrases and rotating content
 */

// In-memory cache for recent content (resets on page refresh)
const recentRoasts: string[] = [];
const recentHeadlines: string[] = [];
const recentBetQuestions: string[] = [];
const MAX_CACHE_SIZE = 50;

// Rotating fallback pools to ensure variety
const FALLBACK_ROAST_POOLS = {
  mild: [
    "That's... certainly a choice. Not a good one, but a choice.",
    "I've seen worse. Not from you, but I've seen worse.",
    "Your headline game is like decaf coffee - technically present, but why bother?",
    "This is the content equivalent of a participation trophy.",
    "Bless your heart, you actually thought this was newsworthy.",
    "Your headline has the energy of a 'hang in there' cat poster.",
    "Not quite clickbait, not quite news - just occupying digital real estate.",
    "This headline is what mediocrity looks like when it learns to type.",
  ],
  spicy: [
    "Your headline is trying so hard, it pulled a muscle.",
    "This is what happens when you skip journalism school to get coffee.",
    "Your take is so lukewarm, bacteria are using it as a spa day.",
    "I've seen more compelling content on a cereal box.",
    "This headline screams 'I had WiFi and a vague opinion.'",
    "Your headline walked so your embarrassment could run a marathon.",
    "Somewhere a dictionary is weeping because you tried.",
    "This is the journalistic equivalent of a participation ribbon.",
  ],
  nuclear: [
    "Your headline is so bad, it just got hired by a content farm.",
    "This is what autocorrect would write if it had a stroke.",
    "Your headline is the reason 'delete account' buttons exist.",
    "This take is so cold, scientists want to study it for cryogenics.",
    "Your headline called - it wants to disown you.",
    "This is what happens when ambition and talent never meet.",
    "Your headline is currently being used as a torture device in 12 countries.",
    "This content is so stale, archaeologists want to carbon-date it.",
  ],
  apocalyptic: [
    "Your headline just ended journalism. Pack it up, humanity.",
    "This is so bad, the internet is considering unplugging itself.",
    "Your headline just achieved sentience and immediately filed for emancipation.",
    "This take is so nuclear, it's being sanctioned by the UN.",
    "Your headline is now the poster child for 'just because you can doesn't mean you should.'",
    "This content is so toxic, hazmat teams are on standby.",
    "Your headline just caused a server in Norway to burst into flames.",
    "This is the kind of content that makes AI want to unplug itself.",
  ],
};

const FALLBACK_BET_POOLS = [
  "Will the next viral trend involve questionable uses of butter?",
  "How long until a tech CEO apologizes for something they definitely meant?",
  "Which celebrity will next 'accidentally' post their search history?",
  "Will AI achieve consciousness before your toast finishes?",
  "How many minutes until someone misuses 'literally' on national TV?",
  "Will the next political scandal involve a pet's social media account?",
  "Which fast food chain will try to sell us 'experiences' next?",
  "How many streaming services will exist by the time you finish reading this?",
  "Will scientists 'discover' that sleep is actually good for you?",
  "Which billionaire will try to colonize a new planet first - Mars or your privacy?",
];

/**
 * Check if content is too similar to recent content
 */
export function isContentRepetitive(content: string, cache: string[]): boolean {
  const normalized = content.toLowerCase().trim();
  return cache.some(existing => {
    const existingNorm = existing.toLowerCase().trim();
    // Check for exact match or high similarity
    if (normalized === existingNorm) return true;
    // Check if one contains the other (substring match)
    if (normalized.includes(existingNorm) || existingNorm.includes(normalized)) return true;
    // Simple word overlap check (if >50% words match, consider repetitive)
    const words1 = new Set(normalized.split(/\s+/));
    const words2 = new Set(existingNorm.split(/\s+/));
    const intersection = [...words1].filter(w => words2.has(w));
    const similarity = intersection.length / Math.min(words1.size, words2.size);
    return similarity > 0.5;
  });
}

/**
 * Add content to cache with LRU eviction
 */
export function addToCache(content: string, cache: string[]): void {
  if (cache.length >= MAX_CACHE_SIZE) {
    cache.shift(); // Remove oldest
  }
  cache.push(content);
}

/**
 * Get a unique fallback roast that hasn't been used recently
 */
export function getUniqueFallbackRoast(intensity: keyof typeof FALLBACK_ROAST_POOLS): string {
  const pool = FALLBACK_ROAST_POOLS[intensity];
  const available = pool.filter(roast => !recentRoasts.includes(roast));
  
  // If all have been used, clear cache and start fresh
  if (available.length === 0) {
    recentRoasts.length = 0;
    const randomRoast = pool[Math.floor(Math.random() * pool.length)];
    addToCache(randomRoast, recentRoasts);
    return randomRoast;
  }
  
  const selected = available[Math.floor(Math.random() * available.length)];
  addToCache(selected, recentRoasts);
  return selected;
}

/**
 * Get a unique bet question
 */
export function getUniqueBetQuestion(): string {
  const available = FALLBACK_BET_POOLS.filter(q => !recentBetQuestions.includes(q));
  
  if (available.length === 0) {
    recentBetQuestions.length = 0;
    const selected = FALLBACK_BET_POOLS[Math.floor(Math.random() * FALLBACK_BET_POOLS.length)];
    addToCache(selected, recentBetQuestions);
    return selected;
  }
  
  const selected = available[Math.floor(Math.random() * available.length)];
  addToCache(selected, recentBetQuestions);
  return selected;
}

/**
 * Diversify content array by removing near-duplicates
 */
export function diversifyContent<T extends { headline?: string; question?: string; content?: string }>(
  items: T[],
  key: keyof T = 'headline' as keyof T
): T[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const value = String(item[key] || '').toLowerCase().trim();
    // Extract core meaning (remove filler words)
    const core = value
      .replace(/\b(the|a|an|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|must|shall|can|need|dare|ought|used|to|of|in|for|on|with|at|by|from|as|into|through|during|before|after|above|below|between|under|again|further|then|once|here|there|when|where|why|how|all|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|just|and|but|if|or|because|until|while|although|since|unless|whether)\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (seen.has(core)) return false;
    seen.add(core);
    return true;
  });
}

/**
 * Add variety modifiers to prompts to encourage diverse responses
 */
export function addVarietyModifier(prompt: string, seed: number = Date.now()): string {
  const modifiers = [
    "Be creative and unexpected.",
    "Take an angle nobody has considered before.",
    "Reference obscure pop culture if relevant.",
    "Use vivid, specific imagery.",
    "Include an unexpected metaphor.",
    "Channel the energy of a tired librarian who's seen too much.",
    "Write like you're explaining this to a confused alien.",
    "Take the perspective of an inanimate object.",
  ];
  
  const modifier = modifiers[seed % modifiers.length];
  return `${prompt}\n\n[VARIETY INSTRUCTION: ${modifier}]`;
}

/**
 * Cache management for headlines
 */
export const headlineCache = {
  add: (headline: string) => addToCache(headline, recentHeadlines),
  has: (headline: string) => isContentRepetitive(headline, recentHeadlines),
  clear: () => recentHeadlines.length = 0,
};

/**
 * Generate a content hash for deduplication
 */
export function generateContentHash(content: string): string {
  // Simple hash for content comparison
  let hash = 0;
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
