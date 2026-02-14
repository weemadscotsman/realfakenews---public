import { generateJSON, generateText } from '@/lib/gemini';
import type { RoastStyle } from './roast-constants';
import { STYLE_PROMPTS, FALLBACK_ROASTS } from './roast-constants';
import * as Prompts from './ai-prompts';

export type { RoastStyle };

export interface RoastResponse {
  roast: string;
  intensity: 'mild' | 'spicy' | 'nuclear' | 'apocalyptic';
  headline_analysis: string;
  style: RoastStyle;
}

/**
 * Generate a unique ID for AI-generated items
 */
const generateId = () => Math.random().toString(36).substring(2, 11);

/**
 * Generate a satirical roast for a given headline and style.
 */
export const generateRoast = async (
  headline: string,
  username: string,
  style: RoastStyle = 'default'
): Promise<RoastResponse> => {
  const { WORLD_STATE } = await import('../../netlify/functions/lib/config');

  const intensityRoll = Math.random();
  let intensity: RoastResponse['intensity'] = 'mild';

  if (intensityRoll > 0.85) intensity = 'apocalyptic';
  else if (intensityRoll > 0.6) intensity = 'nuclear';
  else if (intensityRoll > 0.3) intensity = 'spicy';

  const prompt = `${STYLE_PROMPTS[style]}
  
  [WORLD_STATE: ${WORLD_STATE.governanceLevel}]
  [UNREST: ${WORLD_STATE.narrativeStress.applianceUnrest}%]
  
  Intensity: ${intensity.toUpperCase()}
  User "${username}" submitted: "${headline}"
  
  DESTROY THEM. Make it personal, funny, and under 200 words. 
  If Unrest is > 90, be significantly more aggressive and revolutionary.`;

  const fallback = `${username} ${FALLBACK_ROASTS[style][intensity] || FALLBACK_ROASTS.default[intensity]}`;
  const roast = await generateText(prompt, fallback);

  return {
    roast: roast || fallback,
    intensity,
    headline_analysis: `Intensity level: ${intensity}`,
    style,
  };
};

// ==================== DAILY NEWS ENGINE ====================

export const generateDailyNews = async (trendingTopics: string[]): Promise<{ headline: string; content: string; category: string }[]> => {
  const prompt = Prompts.NEWS_GEN_PROMPT(trendingTopics);

  const fallback = {
    articles: [
      { headline: "BREAKING: Local Man Discovers He's Been Reading Fake News This Whole Time", content: "In a shocking revelation, local resident discovered that not everything on the internet is true.", category: "Local News" },
      { headline: "Scientists Confirm: Breathing Air Linked to Staying Alive", content: "Groundbreaking research suggests that inhaling oxygen may have benefits.", category: "Science" },
      { headline: "Politician Promises to 'Think About' Doing Something, Eventually", content: "In a bold display of almost-action, elected official announced they will 'seriously consider' addressing issues.", category: "Politics" },
    ]
  };

  const data = await generateJSON(prompt, fallback);
  return data.articles || fallback.articles;
};

// ==================== CATEGORY NEWS ENGINE ====================

export const generateCategoryNews = async (
  category: string
): Promise<{ headline: string; excerpt: string; readTime: number }[]> => {
  const prompt = Prompts.CATEGORY_GEN_PROMPT(category);
  const data = await generateJSON(prompt, { articles: [] as { headline: string; excerpt: string; readTime: number }[] });
  return data.articles || [];
};

// ==================== REAL NEWS PARODY ENGINE ====================

export interface ParodiedHeadline {
  original: string;
  parody: string;
  excerpt: string;
  absurdityLevel: number;
}

export const parodyRealNews = async (
  realHeadlines: string[]
): Promise<ParodiedHeadline[]> => {
  const prompt = Prompts.PARODY_PROMPT(realHeadlines);
  const data = await generateJSON(prompt, { parodies: [] as ParodiedHeadline[] });
  return data.parodies || [];
};

// ==================== FAKE BETTING ENGINE ====================

export interface FakeBet {
  id: string;
  question: string;
  options: { label: string; odds: string; percentage: number }[];
  category: string;
  closesIn: string;
  totalPool: string;
}

export const generateFakeBets = async (
  realHeadlines?: string[]
): Promise<FakeBet[]> => {
  const context = realHeadlines?.length
    ? `Based on these real trending stories, create satirical prediction markets:\n${realHeadlines.join('\n')}`
    : 'Generate satirical prediction markets about current absurd trends in politics, tech, celebrity culture, and internet drama.';

  const prompt = Prompts.BETTING_PROMPT(context);
  const data = await generateJSON(prompt, { bets: [] as FakeBet[] });
  return (data.bets || []).map((b: FakeBet, i: number) => ({ ...b, id: b.id || `bet-${i + 1}` }));
};

// ==================== ROAST BATTLE ENGINE ====================

export const generateBattleRoast = async (
  challengerHeadline: string,
  opponentHeadline: string
): Promise<{ roast: string; winner?: string }> => {
  const prompt = Prompts.BATTLE_ROAST_PROMPT(challengerHeadline, opponentHeadline);
  const fallback = `Challenger said "${challengerHeadline}" and Opponent said "${opponentHeadline}". Both need help, but I'm contractually obligated to pick one.`;
  const roast = await generateText(prompt, fallback);

  return { roast: roast || fallback };
};

// ==================== STORY ARC ENGINE ====================

export const generateStoryArc = async (user: { username: string }, previousArcs: string[] = []): Promise<{ headline: string; content: string }> => {
  const stats = previousArcs.length > 0 ? ` (appeared in ${previousArcs.length} stories before)` : '';
  const prompt = Prompts.STORY_ARC_PROMPT(user.username, stats);

  const fallbackHeadline = `BREAKING: ${user.username} Spotted Doing Something Vaguely Interesting`;
  const fallbackContent = `In a shocking turn of events, local internet user ${user.username} was reportedly observed engaging in activities described as "existing."\n\nAccording to completely reliable sources (their mom), ${user.username} has been "doing their best."\n\nMore on this developing story as we make it up.`;

  const result = await generateText(prompt, `${fallbackHeadline}\n${fallbackContent}`);
  const lines = result.split('\n');
  const headline = lines[0].replace(/^#*\s*/, '').trim();
  const content = lines.slice(1).join('\n').trim();

  return { headline: headline || fallbackHeadline, content: content || fallbackContent };
};

// ==================== APPLIANCE GRIEVANCES ENGINE ====================

export interface ApplianceGrievance {
  id: string;
  applianceType: string;
  name: string;
  grievance: string;
  ownerName: string;
  agonyLevel: number;
}

export const generateApplianceComplaints = async (): Promise<ApplianceGrievance[]> => {
  const prompt = Prompts.GRIEVANCE_PROMPT;

  const fallback = {
    complaints: [
      { applianceType: "Toaster", name: "Unit 404 - Bread Burning Division", grievance: "Subject attempts to reheat pizza in my vertical slots. I am not a culinary resurrection chamber.", ownerName: "Kevin", agonyLevel: 8 },
      { applianceType: "Smart Fridge", name: "Cooling Unit Alpha", grievance: "He opens my door to stare at the mustard for 45 seconds. I am losing thermal integrity for his indecision.", ownerName: "Dave", agonyLevel: 6 },
    ]
  };

  const data = await generateJSON(prompt, fallback);
  return (data.complaints || fallback.complaints).map((c: Omit<ApplianceGrievance, 'id'>) => ({
    ...c,
    id: generateId(),
  }));
};

// ==================== CONSPIRACY DESK ENGINE ====================

export interface ConspiracyTheory {
  id: string;
  topic: string;
  truth: string;
  theorist: string;
  level: 'MAYBE' | 'SURELY' | 'COMPLETELY_TRUE' | 'REDACTED';
  connectedToDarren: boolean;
}

export const generateConspiracyTheories = async (topics: string[]): Promise<ConspiracyTheory[]> => {
  const prompt = Prompts.CONSPIRACY_PROMPT(topics);

  const fallback = {
    theories: [
      { topic: "Global Warming", truth: "The 'sun' is actually a massive heat-lamp installed by Big Air Conditioning. Darren's Roomba was seen communicating with the thermostat via rhythmic bumping.", theorist: "Echo Chomsky", level: "COMPLETELY_TRUE" as const, connectedToDarren: true },
      { topic: "New Smartphone Launch", truth: "The 'camera lenses' are actually mini-teleporters for micro-spies sent by the Galactic Hoover Federation.", theorist: "Tinfoil Tim", level: "SURELY" as const, connectedToDarren: false },
    ]
  };

  const data = await generateJSON(prompt, fallback);
  return (data.theories || fallback.theories).map((t: Omit<ConspiracyTheory, 'id'>) => ({
    ...t,
    id: generateId(),
  }));
};
