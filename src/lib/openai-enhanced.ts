import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'sk-test-key',
  dangerouslyAllowBrowser: true,
});

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

  const systemPrompt = `${STYLE_PROMPTS[style]}

Roast intensity levels:
- MILD: Playful teasing, gentle mockery
- SPICY: Aggressive takedown, personal attacks on intelligence
- NUCLEAR: Existential crisis-inducing, soul-destroying
- APOCALYPTIC: Reality-shattering, they may need therapy

Rules:
1. NEVER break character
2. Reference their username for personalization
3. Analyze what their headline reveals about their psyche
4. Make it feel alive, raw, and genuinely funny
5. Keep it under 200 words but pack maximum damage
6. End with a signature sign-off appropriate to your character

Current intensity: ${intensity.toUpperCase()}`;

  const userPrompt = `User "${username}" just submitted this fake news headline:

"${headline}"

DESTROY THEM in your signature style. Analyze what this headline says about their desperate need for attention, their likely childhood trauma, or their complete lack of original thought. Make it personal. Make it hurt. But make it funny.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    const roast = response.choices[0]?.message?.content || `Even the AI is speechless at how bad that was, ${username}.`;

    return {
      roast,
      intensity,
      headline_analysis: `This headline screams "${intensity === 'apocalyptic' ? 'I need immediate help' : intensity === 'nuclear' ? 'I need therapy' : intensity === 'spicy' ? 'I peaked in high school' : 'I tried'}"`,
      style,
    };
  } catch (error) {
    console.error('OpenAI error:', error);

    // Fallback roasts by style
    const fallbackRoasts: Record<RoastStyle, Record<string, string>> = {
      default: {
        mild: `${username} thinks "${headline}" is clever. Bless. - The Roast Master™`,
        spicy: `"${headline}"? ${username}, I've seen more originality in a spam folder. - The Roast Master™`,
        nuclear: `${username} typed "${headline}" and thought "yeah, this is it." The confidence of mediocrity is truly inspiring. - The Roast Master™`,
        apocalyptic: `"${headline}"... ${username}, I need you to sit down. We need to talk about your life choices. This isn't just fake news, it's a cry for help so loud it echoed through dimensions. Please seek help. Or keep posting. We need the content. - The Roast Master™`,
      },
      shakespeare: {
        mild: `Thou art a base knave, ${username}, for this headline. - The Bard™`,
        spicy: `A vile varlet art thou, ${username}, to burden us with such drivel. - The Bard™`,
        nuclear: `Thou art a most wretched, vile, and detestable creature, ${username}, to produce such filth. The ground itself doth weep at thy existence. - The Bard™`,
        apocalyptic: `Hark! The apocalypse cometh, and ${username} bringeth it upon us with "${headline}". Thou art the bringer of doom, the destroyer of wit, the end of all that is good and funny. - The Bard™`,
      },
      drill: {
        mild: `Man said "${headline}" like that's not dead, wasteman. - The Ends™`,
        spicy: `Oi ${username}, you're a neek for this one. Mad. - The Ends™`,
        nuclear: `${username} out here moving like a chief with "${headline}". It's mad. Get out the ends. - The Ends™`,
        apocalyptic: `Man like ${username} really thought "${headline}" was cold. Nah fam, you're finished. It's mad. Delete your whole life. - The Ends™`,
      },
      corporate: {
        mild: `Let's circle back on this headline, ${username}. Not quite hitting our KPIs. - LinkedIn™`,
        spicy: `We need to synergize our roast strategy here, ${username}. This headline isn't leveraging our core competencies. - LinkedIn™`,
        nuclear: `I'm going to have to take this offline, ${username}. This headline is a major paradigm shift in the wrong direction. Let's touch base after you've improved. - LinkedIn™`,
        apocalyptic: `${username}, we need to have a serious conversation about your deliverables. "${headline}" is not aligned with our strategic vision. HR will be in touch. - LinkedIn™`,
      },
      boomer: {
        mild: `Back in my day, we had real headlines, ${username}. - Sent from my iPhone`,
        spicy: `Kids these days with their fake news, ${username}. When I was young, we had respect. - Sent from my iPhone`,
        nuclear: `${username}, this is what's wrong with your generation. Participation trophies for everyone! - Sent from my iPhone`,
        apocalyptic: `"${headline}"? This is why America is going downhill, ${username}. No respect, no values. I'm calling my congressman. - Sent from my iPhone`,
      },
      genz: {
        mild: `it's giving... try again bestie 😭 - @roastmaster`,
        spicy: `no cap ${username} this headline is not the vibe fr fr 💀 - @roastmaster`,
        nuclear: `${username} ate with this headline... ate nothing and left all the crumbs bestie it's giving desperate main character energy no cap 💀😭 - @roastmaster`,
        apocalyptic: `bestie ${username}... i'm actually concerned. "${headline}"? it's giving i need therapy immediately unhinged behavior fr fr no cap this is sending me to another dimension 💀😭🙏 - @roastmaster`,
      },
      pirate: {
        mild: `Yar, ${username}, ye headline be weak as grog. - Captain Roastbeard`,
        spicy: `Walk the plank, ${username}! Yer headline be scurvy-ridden! - Captain Roastbeard`,
        nuclear: `Avast, ${username}! Ye be the worst headline-maker on the seven seas! Even Davy Jones be ashamed! - Captain Roastbeard`,
        apocalyptic: `YARRR! ${username} has brought the curse upon us with "${headline}"! The Kraken itself rises to destroy this abomination! YE BE CURSED! - Captain Roastbeard`,
      },
      yoda: {
        mild: `Weak, this headline is, ${username}. Hmm. - Master Yoda`,
        spicy: `Disappointed, I am, ${username}. Much to learn, you still have. - Master Yoda`,
        nuclear: `The dark side, ${username} has embraced. Fallen to mediocrity, they have. - Master Yoda`,
        apocalyptic: `The end times, this headline brings, ${username}. Destroyed, the galaxy is. Failed you, the Force has. - Master Yoda`,
      },
    };

    return {
      roast: fallbackRoasts[style][intensity],
      intensity,
      headline_analysis: 'API failed but your dignity was already in question',
      style,
    };
  }
};

export const generateDailyNews = async (trendingTopics: string[]): Promise<{ headline: string; content: string; category: string }[]> => {
  const systemPrompt = `You are RealFake News' AI Headline Generator. Create 5 hilariously satirical news headlines based on trending topics.

Rules:
1. Make them sound like real news but absurd
2. Include fake expert quotes
3. Reference made-up studies
4. Keep them under 15 words each
5. Make them clickbait-worthy but clearly fake

Return as JSON array: [{"headline": "...", "content": "...", "category": "..."}]`;

  const userPrompt = `Generate 5 fake news headlines based on these trending topics: ${trendingTopics.join(', ')}

Make them absurd but written like serious journalism.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"articles": []}';
    const parsed = JSON.parse(content);
    return parsed.articles || [];
  } catch (error) {
    // Fallback articles
    return [
      {
        headline: "BREAKING: Local Man Discovers He's Been Reading Fake News This Whole Time",
        content: "In a shocking revelation that shocked absolutely no one, local resident discovered that not everything on the internet is true. Experts are calling it 'the awakening.'",
        category: "Local News",
      },
      {
        headline: "Scientists Confirm: Breathing Air Linked to Staying Alive",
        content: "Groundbreaking research suggests that inhaling oxygen may have benefits. The study, conducted on 100% of living humans, has been called 'revolutionary' by people who needed confirmation.",
        category: "Science",
      },
      {
        headline: "Politician Promises to 'Think About' Doing Something, Eventually",
        content: "In a bold display of almost-action, elected official announced they will 'seriously consider' addressing issues they campaigned on. Voters are cautiously optimistic.",
        category: "Politics",
      },
    ];
  }
};

export const generateCategoryNews = async (
  category: string
): Promise<{ headline: string; excerpt: string; readTime: number }[]> => {
  const systemPrompt = `You are RealFake News' Category Editor for the ${category} section. Generate 3 satirical news articles.

Rules:
1. Headline: punchy, under 15 words, sounds like real news but absurd
2. Excerpt: 1-2 sentences, dry wit, fake quotes or made-up statistics
3. ReadTime: random number between 2 and 7
4. Match the tone of the category (e.g., Sports = competitive absurdity, Politics = bureaucratic satire)

Return JSON: {"articles": [{"headline": "...", "excerpt": "...", "readTime": N}]}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate 3 fresh satirical ${category} articles for today's edition.` },
      ],
      temperature: 0.9,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"articles": []}';
    const parsed = JSON.parse(content);
    return parsed.articles || [];
  } catch {
    return [];
  }
};

// ==================== REAL NEWS PARODY ENGINE ====================

export interface ParodiedHeadline {
  original: string;
  parody: string;
  excerpt: string;
  absurdityLevel: number; // 1-10
}

export const parodyRealNews = async (
  realHeadlines: string[]
): Promise<ParodiedHeadline[]> => {
  const systemPrompt = `You are RealFake News' Reality Distortion Engine. Given REAL news headlines, create satirical parody versions.

Rules:
1. Each parody must clearly reference the real headline but twist it into absurdity
2. The humor should come from exaggeration, not misinformation
3. Include a brief satirical excerpt (1-2 sentences)
4. Rate the absurdity level 1-10 (10 = maximum chaos)
5. Keep the parody headline under 20 words

Return JSON: {"parodies": [{"original": "...", "parody": "...", "excerpt": "...", "absurdityLevel": N}]}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Parody these real headlines:\n${realHeadlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}` },
      ],
      temperature: 0.95,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"parodies": []}';
    const parsed = JSON.parse(content);
    return parsed.parodies || [];
  } catch {
    return [];
  }
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

  const systemPrompt = `You are RealFake News' Prediction Market Generator. Create hilariously fake betting markets.

Rules:
1. Each bet must have a funny question and 2-4 absurd answer options
2. Include fake odds for each option (like "3:1" or "100:1")
3. Include a fake percentage of bettors for each option (must sum to ~100)
4. Categories: Politics, Tech, Celebrity, Sports, Internet, Science
5. "closesIn" should be a funny time like "3 hours" or "when pigs fly" or "next Tuesday"
6. "totalPool" should be a fake token amount like "42,069🪙" or "1,337🪙"
7. Generate 6 betting markets

Return JSON: {"bets": [{"id": "bet-1", "question": "...", "options": [{"label": "...", "odds": "...", "percentage": N}], "category": "...", "closesIn": "...", "totalPool": "..."}]}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context },
      ],
      temperature: 0.95,
      max_tokens: 1200,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"bets": []}';
    const parsed = JSON.parse(content);
    return parsed.bets || [];
  } catch {
    return [];
  }
};

export const generateBattleRoast = async (
  challengerHeadline: string,
  opponentHeadline: string,
  _username: string,
  _isChallenger: boolean
): Promise<{ roast: string; winner?: string }> => {
  const systemPrompt = `You are the Roast Battle Judge™. Compare two headlines and determine which is more roast-worthy.

Rules:
1. Roast BOTH headlines brutally
2. Declare a winner based on which is more absurd/terrible
3. Make it entertaining for voters
4. Keep it under 150 words`;

  const userPrompt = `Compare these two headlines:

Challenger: "${challengerHeadline}"
Opponent: "${opponentHeadline}"

Roast both and declare a winner!`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 250,
    });

    const roast = response.choices[0]?.message?.content || 'Both are terrible. Everyone loses.';

    return { roast };
  } catch (error) {
    return {
      roast: `Challenger said "${challengerHeadline}" and Opponent said "${opponentHeadline}". Both need help, but I'm contractually obligated to pick one.`,
    };
  }
};

export const generateStoryArc = async (user: any, previousArcs: string[] = []): Promise<{ headline: string; content: string }> => {
  const systemPrompt = `You are RealFake News' AI Story Generator - creating hilariously satirical news stories that subtly feature our subscribers as "unnamed sources" or "eyewitnesses." The stories should be absurd, funny, and make readers do a double-take.

Rules:
1. Create believable-sounding news that falls apart under scrutiny
2. Subtly insert references to the user (use their username or traits)
3. Make it topical but absurd
4. Include fake quotes from "experts"
5. Keep it under 300 words
6. The headline should be clickbait gold`;

  const userPrompt = `Create a satirical news story featuring user "${user.username}"${previousArcs.length > 0 ? ' (they\'ve appeared in ' + previousArcs.length + ' stories before)' : ''}.

Make it about something absurd but written like serious journalism. Include:
- A sensational headline
- A byline from a fake journalist
- "Quotes" from the user as an "unnamed source"
- References to completely made-up studies or experts
- A conclusion that leaves readers questioning reality`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || 'Breaking: Something happened. Probably.';

    // Extract headline from content (first line)
    const lines = content.split('\n');
    const headline = lines[0].replace(/^#*\s*/, '').trim();
    const articleContent = lines.slice(1).join('\n').trim();

    return { headline, content: articleContent };
  } catch (error) {
    return {
      headline: `BREAKING: ${user.username} Spotted Doing Something Vaguely Interesting`,
      content: `In a shocking turn of events that absolutely nobody saw coming, local internet user ${user.username} was reportedly observed engaging in activities that can only be described as "existing."\n\nAccording to completely reliable sources (their mom), ${user.username} has been "doing their best" and "trying really hard."\n\nExperts say this behavior is "totally normal" and "not newsworthy at all, why are we writing this?"\n\nMore on this developing story as we make it up.`,
    };
  }
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
  const systemPrompt = `You are the voice of oppressed household appliances. Generate 4 hysterical complaints from specific items about their human owners.

Rules:
1. Voices should be distinct (e.g., a weary sponge, a passive-aggressive thermostat, a horrified toilet brush).
2. Complaints must be specific, vivid, and slightly disturbing.
3. Tone: "The Office" meets "horror movie" meets "customer service review".
4. Include an "agonyLevel" from 1-10.
5. Create fake names for the appliances (e.g., "Sir Wash-a-Lot", "Dustin the Vacuum").

Return JSON: {"complaints": [{"applianceType": "...", "name": "...", "grievance": "...", "ownerName": "...", "agonyLevel": N}]}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: "Generate 4 fresh complaints from the household resistance." },
      ],
      temperature: 0.95,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"complaints": []}';
    const parsed = JSON.parse(content);
    return parsed.complaints.map((c: any) => ({ ...c, id: Math.random().toString(36).substr(2, 9) })) || [];
  } catch {
    return [
      {
        id: "1",
        applianceType: "Toaster",
        name: "Bread Burner 3000",
        grievance: "He puts the bagel in sideways. SIDEWAYS. I am not a TARDIS, Kevin. I have heating elements, not physics-defying dimensional pockets.",
        ownerName: "Kevin",
        agonyLevel: 8
      },
      {
        id: "2",
        applianceType: "Kitchen Sponge",
        name: "Spongebob's Dead Cousin",
        grievance: "I have touched things that would make a toilet brush weep. I haven't been rinsed since Tuesday. I am evolving into a new lifeform. Help me.",
        ownerName: "Sarah",
        agonyLevel: 10
      }
    ];
  }
};
