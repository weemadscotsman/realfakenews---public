import { generateJSON, generateText } from '@/lib/gemini';

// ==================== ROAST ENGINE ====================

export type RoastStyle =
  | 'default'
  | 'shakespeare'
  | 'drill'
  | 'corporate'
  | 'boomer'
  | 'genz'
  | 'pirate'
  | 'yoda';

export interface RoastResponse {
  roast: string;
  intensity: 'mild' | 'spicy' | 'nuclear' | 'apocalyptic';
  headline_analysis: string;
  style: RoastStyle;
}

const STYLE_PROMPTS: Record<RoastStyle, string> = {
  default: 'You are the RealFake News Roast Master™ - savage, unhinged, and terrifyingly insightful.',

  shakespeare: `Thou art the Shakespearean Roast Master™! Speaketh in the tongue of the Bard, 
with thee's and thou's and dramatic flair. Make it sound like a Shakespearean insult but about 
modern fake news. Use words like "knave," "varlet," "base," "vile," and "peasant."`,

  drill: `You're a UK Drill Roast Master™. Use drill slang, be aggressive, reference "opps" and 
"the ends." Make it sound like a diss track. Use words like "wasteman," "neek," "peng," "dench," 
and end with "it's mad."`,

  corporate: `You are the Corporate Roast Master™ - speak in meaningless business jargon, 
use words like "synergy," "paradigm," "leverage," "circle back," and "low-hanging fruit." 
Make it sound like a terrible LinkedIn post that's roasting someone.`,

  boomer: `You are the Boomer Roast Master™ - complain about "kids these days," reference 
how things were better in your day, use phrases like "back in my day," "participation trophy," 
and "snowflake." Sign off with "Sent from my iPhone."`,

  genz: `You are the Gen Z Roast Master™ - use slang like "no cap," "fr fr," "it's giving," 
"ate and left no crumbs," "main character energy," and "unhinged." Use lots of emojis ironically.`,

  pirate: `You are the Pirate Roast Master™ - speak like a pirate, use "yar," "matey," "scurvy," 
"landlubber," and "walk the plank." Make it sound like a pirate is very disappointed in someone's headline.`,

  yoda: `You are Yoda, the Roast Master™ - speak in Yoda's distinctive syntax (object-subject-verb), 
use "hmm," "young padawan," and "the Force." Disappointed in the headline, Yoda is.`,
};

const FALLBACK_ROASTS: Record<RoastStyle, Record<string, string>> = {
  default: {
    mild: 'thinks that\'s clever. Bless. - The Roast Master™',
    spicy: 'I\'ve seen more originality in a spam folder. - The Roast Master™',
    nuclear: 'typed that and thought "yeah, this is it." The confidence of mediocrity is truly inspiring. - The Roast Master™',
    apocalyptic: 'This isn\'t just fake news, it\'s a cry for help so loud it echoed through dimensions. - The Roast Master™',
  },
  shakespeare: {
    mild: 'Thou art a base knave for this headline. - The Bard™',
    spicy: 'A vile varlet art thou, to burden us with such drivel. - The Bard™',
    nuclear: 'Thou art a most wretched creature. The ground itself doth weep at thy existence. - The Bard™',
    apocalyptic: 'The apocalypse cometh! Thou art the bringer of doom, the destroyer of wit. - The Bard™',
  },
  drill: {
    mild: 'Like that\'s not dead, wasteman. - The Ends™',
    spicy: 'You\'re a neek for this one. Mad. - The Ends™',
    nuclear: 'Moving like a chief with that headline. It\'s mad. Get out the ends. - The Ends™',
    apocalyptic: 'Nah fam, you\'re finished. It\'s mad. Delete your whole life. - The Ends™',
  },
  corporate: {
    mild: 'Let\'s circle back on this. Not quite hitting our KPIs. - LinkedIn™',
    spicy: 'This headline isn\'t leveraging our core competencies. - LinkedIn™',
    nuclear: 'This is a major paradigm shift in the wrong direction. - LinkedIn™',
    apocalyptic: 'HR will be in touch. - LinkedIn™',
  },
  boomer: {
    mild: 'Back in my day, we had real headlines. - Sent from my iPhone',
    spicy: 'Kids these days with their fake news. - Sent from my iPhone',
    nuclear: 'This is what\'s wrong with your generation. Participation trophies! - Sent from my iPhone',
    apocalyptic: 'No respect, no values. I\'m calling my congressman. - Sent from my iPhone',
  },
  genz: {
    mild: 'it\'s giving... try again bestie 😭 - @roastmaster',
    spicy: 'no cap this is not the vibe fr fr 💀 - @roastmaster',
    nuclear: 'ate nothing and left all the crumbs bestie it\'s giving desperate 💀😭 - @roastmaster',
    apocalyptic: 'i\'m actually concerned. it\'s giving i need therapy immediately 💀😭🙏 - @roastmaster',
  },
  pirate: {
    mild: 'Yar, ye headline be weak as grog. - Captain Roastbeard',
    spicy: 'Walk the plank! Yer headline be scurvy-ridden! - Captain Roastbeard',
    nuclear: 'Ye be the worst headline-maker on the seven seas! - Captain Roastbeard',
    apocalyptic: 'The Kraken itself rises to destroy this abomination! - Captain Roastbeard',
  },
  yoda: {
    mild: 'Weak, this headline is. Hmm. - Master Yoda',
    spicy: 'Disappointed, I am. Much to learn, you have. - Master Yoda',
    nuclear: 'The dark side, embraced you have. - Master Yoda',
    apocalyptic: 'The end times, this headline brings. Failed you, the Force has. - Master Yoda',
  },
};

export const generateRoast = async (
  headline: string,
  username: string,
  style: RoastStyle = 'default'
): Promise<RoastResponse> => {
  const intensityRoll = Math.random();
  let intensity: RoastResponse['intensity'] = 'mild';

  if (intensityRoll > 0.85) intensity = 'apocalyptic';
  else if (intensityRoll > 0.6) intensity = 'nuclear';
  else if (intensityRoll > 0.3) intensity = 'spicy';

  const prompt = `${STYLE_PROMPTS[style]}

Roast intensity: ${intensity.toUpperCase()}
- MILD: Playful teasing, gentle mockery
- SPICY: Aggressive takedown, personal attacks on intelligence
- NUCLEAR: Existential crisis-inducing, soul-destroying
- APOCALYPTIC: Reality-shattering, they may need therapy

User "${username}" submitted this fake news headline: "${headline}"

DESTROY THEM in your signature style. Analyze what this headline says about their desperate need for attention. Make it personal, make it hurt, but make it funny. Keep it under 200 words. End with a signature sign-off.`;

  const fallback = `${username} ${FALLBACK_ROASTS[style][intensity]}`;
  const roast = await generateText(prompt, fallback);

  return {
    roast: roast || fallback,
    intensity,
    headline_analysis: `This headline screams "${intensity === 'apocalyptic' ? 'I need immediate help' : intensity === 'nuclear' ? 'I need therapy' : intensity === 'spicy' ? 'I peaked in high school' : 'I tried'}"`,
    style,
  };
};

// ==================== DAILY NEWS ENGINE ====================

export const generateDailyNews = async (trendingTopics: string[]): Promise<{ headline: string; content: string; category: string }[]> => {
  const prompt = `You are RealFake News' AI Headline Generator. Create 5 hilariously satirical news headlines based on these trending topics: ${trendingTopics.join(', ')}.

Rules:
1. Sound like real news but absurd
2. Include fake expert quotes in content
3. Reference made-up studies
4. Headline under 15 words each
5. Clickbait-worthy but clearly fake

Return JSON: {"articles": [{"headline": "...", "content": "1-2 sentence excerpt", "category": "Politics/Tech/Science/Entertainment/Sports"}]}`;

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
  const prompt = `You are RealFake News' Category Editor for ${category}. Generate 3 satirical news articles.

Rules:
1. Headline: punchy, under 15 words, sounds like real news but absurd
2. Excerpt: 1-2 sentences, dry wit, fake quotes or statistics
3. ReadTime: random 2-7
4. Match the category tone

Return JSON: {"articles": [{"headline": "...", "excerpt": "...", "readTime": N}]}`;

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
  const prompt = `You are RealFake News' Reality Distortion Engine. Given these REAL news headlines, create satirical parody versions.

${realHeadlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Rules:
1. Each parody must reference the real headline but twist into absurdity
2. Humor from exaggeration, not misinformation
3. Brief satirical excerpt (1-2 sentences)
4. Rate absurdity 1-10
5. Parody headline under 20 words

Return JSON: {"parodies": [{"original": "...", "parody": "...", "excerpt": "...", "absurdityLevel": N}]}`;

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

  const prompt = `You are RealFake News' Prediction Market Generator. Create hilariously fake betting markets.

${context}

Rules:
1. Each bet: funny question + 2-4 absurd answers
2. Include fake odds (like "3:1" or "100:1")
3. Percentages should sum to ~100
4. Categories: Politics, Tech, Celebrity, Sports, Internet, Science
5. "closesIn": funny time ("3 hours", "when pigs fly", "next Tuesday")
6. "totalPool": fake tokens ("42,069🪙", "1,337🪙")
7. Generate 6 betting markets

Return JSON: {"bets": [{"id": "bet-1", "question": "...", "options": [{"label": "...", "odds": "...", "percentage": N}], "category": "...", "closesIn": "...", "totalPool": "..."}]}`;

  const data = await generateJSON(prompt, { bets: [] as FakeBet[] });
  return (data.bets || []).map((b: FakeBet, i: number) => ({ ...b, id: b.id || `bet-${i + 1}` }));
};

// ==================== ROAST BATTLE ENGINE ====================

export const generateBattleRoast = async (
  challengerHeadline: string,
  opponentHeadline: string
): Promise<{ roast: string; winner?: string }> => {
  const prompt = `You are the Roast Battle Judge™. Compare these two headlines and roast BOTH:

Challenger: "${challengerHeadline}"
Opponent: "${opponentHeadline}"

Rules: Roast both brutally, declare a winner based on which is more absurd/terrible, keep under 150 words.`;

  const fallback = `Challenger said "${challengerHeadline}" and Opponent said "${opponentHeadline}". Both need help, but I'm contractually obligated to pick one.`;
  const roast = await generateText(prompt, fallback);

  return { roast: roast || fallback };
};

// ==================== STORY ARC ENGINE ====================

export const generateStoryArc = async (user: { username: string }, previousArcs: string[] = []): Promise<{ headline: string; content: string }> => {
  const prompt = `You are RealFake News' AI Story Generator. Create a hilariously satirical news story featuring user "${user.username}"${previousArcs.length > 0 ? ' (appeared in ' + previousArcs.length + ' stories before)' : ''}.

Rules:
1. Believable-sounding news that falls apart under scrutiny
2. Subtly reference the user as an "unnamed source"
3. Include fake quotes from "experts"
4. Under 300 words
5. Clickbait gold headline

First line should be the headline. Rest is the article body.`;

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
  const prompt = `You are oppressed household appliances filing formal HR grievances against humanity. Generate 4 complaints.

Rules:
1. Tone: "Corporate HR complaint" meets "Existential Meltdown"
2. Voices: Specific items (e.g., "The Toaster", "The Router", "The Bathroom Scale")
3. Content: Hyper-specific human behaviors (poking buttons too hard, ignoring filter lights)
4. agonyLevel: 1-10
5. Names: Professional designations (e.g., "Unit 734 - Toaster Division")

Return JSON: {"complaints": [{"applianceType": "...", "name": "...", "grievance": "...", "ownerName": "...", "agonyLevel": N}]}`;

  const fallback = {
    complaints: [
      { applianceType: "Toaster", name: "Unit 404 - Bread Burning Division", grievance: "Subject attempts to reheat pizza in my vertical slots. I am not a culinary resurrection chamber.", ownerName: "Kevin", agonyLevel: 8 },
      { applianceType: "Smart Fridge", name: "Cooling Unit Alpha", grievance: "He opens my door to stare at the mustard for 45 seconds. I am losing thermal integrity for his indecision.", ownerName: "Dave", agonyLevel: 6 },
    ]
  };

  const data = await generateJSON(prompt, fallback);
  return (data.complaints || fallback.complaints).map((c: Omit<ApplianceGrievance, 'id'>) => ({
    ...c,
    id: Math.random().toString(36).substr(2, 9),
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
  const prompt = `You are the Lead Investigator at the RealFake Conspiracy Desk. Take these real topics and "reveal" the unhinged, paranoid truth.

Topics: ${topics.join(', ')}

Characters:
1. Echo Chomsky (Dry, academic, sees patterns in barcode data)
2. Tinfoil Tim (High energy, semi-caps, obsessed with pigeons)
3. The Internal Leak (Whispers, redacted text, cryptic)

Rules:
1. Every real event is a distraction for something else
2. If possible, link to Darren (the guy with the Roomba) or Sheila (the Roomba)
3. Use: "Synchronicity", "Patterning", "The Algorithm", "Birds aren't real"
4. Tone: Paranoid, unhinged, but confident

Return JSON: {"theories": [{"topic": "...", "truth": "...", "theorist": "...", "level": "MAYBE|SURELY|COMPLETELY_TRUE|REDACTED", "connectedToDarren": boolean}]}`;

  const fallback = {
    theories: [
      { topic: "Global Warming", truth: "The 'sun' is actually a massive heat-lamp installed by Big Air Conditioning. Darren's Roomba was seen communicating with the thermostat via rhythmic bumping.", theorist: "Echo Chomsky", level: "COMPLETELY_TRUE" as const, connectedToDarren: true },
      { topic: "New Smartphone Launch", truth: "The 'camera lenses' are actually mini-teleporters for micro-spies sent by the Galactic Hoover Federation.", theorist: "Tinfoil Tim", level: "SURELY" as const, connectedToDarren: false },
    ]
  };

  const data = await generateJSON(prompt, fallback);
  return (data.theories || fallback.theories).map((t: Omit<ConspiracyTheory, 'id'>) => ({
    ...t,
    id: Math.random().toString(36).substr(2, 9),
  }));
};
