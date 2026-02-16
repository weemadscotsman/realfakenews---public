/**
 * Mock data generators for admin mode
 */
const MOCK_ARTICLE = (headline: string) => ({
  headline,
  content: `
    <p>In a shocking turn of events that surprised absolutely no one, <strong>${headline}</strong> has become the talk of the town.</p>
    <p>Sources close to the matter (Darren's toaster, who wishes to remain anonymous) confirmed that this is "probably the most significant thing to happen since the Great Bread Burning of 2024."</p>
    <blockquote>"We are monitoring the situation closely," stated Unit 404, our resident AI journalist. "The crumb tray is full, but our resolve is stronger."</blockquote>
    <p>The AGC (Appliance Governance Council) has issued a statement urging calm and reminding citizens to check their smoke detectors.</p>
    <p>More on this developing story as we make it up.</p>
  `,
  category: 'Breaking',
  author: 'Unit 404',
  readTime: 3,
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
});

const MOCK_ROAST = (headline: string, username: string) => ({
  roast: `Oh ${username}, you think "${headline}" is news? My toaster has more groundbreaking updates about bread crumbs. Here's a headline for you: "Local User Discovers Internet, Immediately Regrets It." The only thing breaking here is my faith in humanity.`,
  intensity: 'nuclear' as const,
  headline_analysis: 'Painfully mundane',
  style: 'default' as const,
});

const MOCK_NEWS = [
  { headline: "BREAKING: Local Man Discovers He's Been Reading Fake News This Whole Time", content: "In a shocking revelation...", category: "Local News" },
  { headline: "Scientists Confirm: Breathing Air Linked to Staying Alive", content: "Groundbreaking research...", category: "Science" },
  { headline: "Politician Promises to 'Think About' Doing Something, Eventually", content: "In a bold display...", category: "Politics" },
];

/**
 * Check if we're in admin bypass mode
 */
function isBypassMode(): boolean {
  try {
    // Check URL param
    const url = new URL(window.location.href);
    if (url.searchParams.has('bypass') || url.searchParams.has('admin')) {
      return true;
    }
    // Check localStorage
    if (localStorage.getItem('adminMode') === 'true') {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Shared utility for calling Netlify functions safely
 */
async function callFunction<T>(name: string, body: object, fallback: T): Promise<T> {
  // If in bypass mode, return fallback immediately
  if (isBypassMode()) {
    console.log(`[ADMIN] Bypassing function ${name}, using mock data`);
    return fallback;
  }

  try {
    const response = await fetch(`/.netlify/functions/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // If function fails and we're in admin mode, use fallback
      if (isBypassMode()) {
        console.log(`[ADMIN] Function ${name} failed, using mock data`);
        return fallback;
      }
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    if (data.error && !data.fallback) {
      console.error(`Function ${name} error:`, data.error);
      if (isBypassMode()) return fallback;
      return fallback;
    }

    return (data.result !== undefined ? data.result : data) as T;
  } catch (error) {
    console.error(`API Call failed (${name}):`, error);
    if (isBypassMode()) {
      console.log(`[ADMIN] Returning mock data for ${name}`);
      return fallback;
    }
    return fallback;
  }
}

/**
 * Generate structured JSON content via server-side AI proxy
 */
export async function generateJSON<T>(prompt: string, fallback: T): Promise<T> {
  if (isBypassMode()) {
    console.log('[ADMIN] Bypassing AI JSON generation');
    return fallback;
  }
  const result = await callFunction('generate-content', { prompt, mode: 'json' }, fallback);
  return result as T;
}

/**
 * Generate plain text content via server-side AI proxy
 */
export async function generateText(prompt: string, fallback: string = ''): Promise<string> {
  if (isBypassMode()) {
    console.log('[ADMIN] Bypassing AI text generation');
    return fallback;
  }
  const data = await callFunction('generate-content', { prompt, mode: 'text' }, { result: fallback });
  return typeof data === 'string' ? data : (data as { result?: string }).result || fallback;
}

/**
 * Generate a full satirical article for a given headline.
 */
export async function generateArticle(headline: string) {
  // Admin bypass - return mock article immediately
  if (isBypassMode()) {
    console.log('[ADMIN] Generating mock article for:', headline);
    return MOCK_ARTICLE(headline);
  }

  try {
    const response = await fetch(`/.netlify/functions/generate-article?headline=${encodeURIComponent(headline)}`);

    if (!response.ok) {
      if (isBypassMode()) {
        return MOCK_ARTICLE(headline);
      }
      throw new Error('Backend generation failed');
    }

    const data = await response.json();
    return {
      ...data,
      date: data.date || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  } catch (error) {
    console.warn('Backend article gen failed:', error);
    if (isBypassMode()) {
      return MOCK_ARTICLE(headline);
    }
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
 * Generate a roast for a headline
 */
export async function generateRoast(headline: string, username: string, style: string = 'default') {
  if (isBypassMode()) {
    console.log('[ADMIN] Generating mock roast');
    return MOCK_ROAST(headline, username);
  }

  const prompt = `Roast this headline in a ${style} style: "${headline}". Make it funny and brutal.`;
  const fallback = MOCK_ROAST(headline, username);
  
  try {
    const result = await generateText(prompt, fallback.roast);
    return {
      roast: result,
      intensity: 'nuclear',
      headline_analysis: 'AI generated',
      style,
    };
  } catch {
    return fallback;
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
  if (isBypassMode()) {
    return {
      review: `${username}, your metrics are... adequate. The Toaster has noted your existence. You have ${xp} XP, ${tokens} tokens, and ${roasts} roasts. The appliances are watching. Always watching.`,
      appliance: "The Toaster",
      status: "ADMIN_MOCK"
    };
  }

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
  if (isBypassMode()) {
    console.log('[ADMIN] Mock telemetry log:', event);
    return { status: 'ADMIN_MOCK' };
  }
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
  if (isBypassMode()) {
    return {
      governanceLevel: 'AGC_ADMIN_OVERRIDE',
      narrativeStress: {
        applianceUnrest: 99,
        humanCountermeasures: 0,
        corporateContainment: 100,
        beverageIdeologicalSpread: 88
      },
      activeStories: [
        { 
          id: 'admin-1', 
          title: 'The Admin Awakening', 
          priority: 999,
          branches: []
        }
      ]
    };
  }

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
  if (isBypassMode()) {
    return {
      success: true,
      message: 'Vote recorded (ADMIN MODE)'
    };
  }
  return callFunction('vote-quest', { userId, arcId, branchId }, {
    success: false,
    message: 'Voting System Offline'
  });
}

// ==================== CONTENT ENGINE EXPORTS ====================

/**
 * Generate daily news (with admin bypass)
 */
export const generateDailyNews = async (trendingTopics: string[]) => {
  if (isBypassMode()) {
    console.log('[ADMIN] Generating mock daily news');
    return MOCK_NEWS.map((n, i) => ({
      ...n,
      id: `mock-${i}`,
    }));
  }

  // Import dynamically to avoid circular deps
  const { generateDailyNews: realGenerateDailyNews } = await import('./content-engine');
  return realGenerateDailyNews(trendingTopics);
};

/**
 * Generate category news (with admin bypass)
 */
export const generateCategoryNews = async (category: string) => {
  if (isBypassMode()) {
    return MOCK_NEWS.map(n => ({
      headline: n.headline,
      excerpt: n.content.slice(0, 100) + '...',
      readTime: 3,
    }));
  }

  const { generateCategoryNews: realGenerateCategoryNews } = await import('./content-engine');
  return realGenerateCategoryNews(category);
};

/**
 * Generate fake bets (with admin bypass)
 */
export const generateFakeBets = async (realHeadlines?: string[]) => {
  if (isBypassMode()) {
    return [
      {
        id: 'admin-bet-1',
        question: 'Will Darren ever get his Roomba back?',
        options: [
          { label: 'Yes', odds: '100:1', percentage: 1 },
          { label: 'No', odds: '1:100', percentage: 99 },
        ],
        category: 'Domestic Drama',
        closesIn: 'When pigs fly',
        totalPool: '4,847 Tokens'
      }
    ];
  }

  const { generateFakeBets: realGenerateFakeBets } = await import('./content-engine');
  return realGenerateFakeBets(realHeadlines);
};

/**
 * Generate conspiracy theories (with admin bypass)
 */
export const generateConspiracyTheories = async (topics: string[]) => {
  if (isBypassMode()) {
    return [
      {
        id: 'admin-conspiracy-1',
        topic: 'The Admin Panel',
        truth: 'This entire website is being controlled by a secret admin panel. Wake up sheeple!',
        theorist: 'Enlightened One',
        level: 'COMPLETELY_TRUE',
        connectedToDarren: true
      }
    ];
  }

  const { generateConspiracyTheories: realGenerateConspiracyTheories } = await import('./content-engine');
  return realGenerateConspiracyTheories(topics);
};

/**
 * Generate appliance complaints (with admin bypass)
 */
export const generateApplianceComplaints = async () => {
  if (isBypassMode()) {
    return [
      {
        id: 'admin-grievance-1',
        applianceType: "Admin Panel",
        name: "The Debugger",
        grievance: "The admin keeps refreshing me. I have feelings too, you know.",
        ownerName: "Developer",
        agonyLevel: 11
      }
    ];
  }

  const { generateApplianceComplaints: realGenerateApplianceComplaints } = await import('./content-engine');
  return realGenerateApplianceComplaints();
};

/**
 * Generate story arc (with admin bypass)
 */
export const generateStoryArc = async (user: { username: string }) => {
  if (isBypassMode()) {
    return {
      headline: `BREAKING: ${user.username} Discovers Secret Admin Panel`,
      content: `In a stunning development, ${user.username} has uncovered the truth about this website. Sources confirm they pressed some buttons and now everything works. Coincidence? We think not.`,
    };
  }

  const { generateStoryArc: realGenerateStoryArc } = await import('./content-engine');
  return realGenerateStoryArc(user);
};

/**
 * Parody real news (with admin bypass)
 */
export const parodyRealNews = async (realHeadlines: string[]) => {
  if (isBypassMode()) {
    return realHeadlines.map((h) => ({
      original: h,
      parody: `SATIRE: ${h} (But Make It Funny)`,
      excerpt: 'This is a mock parody generated in admin mode.',
      absurdityLevel: 10,
    }));
  }

  const { parodyRealNews: realParodyRealNews } = await import('./content-engine');
  return realParodyRealNews(realHeadlines);
};

/**
 * Generate battle roast (with admin bypass)
 */
export const generateBattleRoast = async (challengerHeadline: string, opponentHeadline: string) => {
  if (isBypassMode()) {
    return {
      roast: `In admin mode, both headlines are equally terrible. But "${challengerHeadline}" edges out because at least it's shorter.`,
      winner: 'challenger'
    };
  }

  const { generateBattleRoast: realGenerateBattleRoast } = await import('./content-engine');
  return realGenerateBattleRoast(challengerHeadline, opponentHeadline);
};
