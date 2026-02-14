import { createClient } from '@supabase/supabase-js';
import type { User, TeaDrop, RoastBattle, Achievement, Notification, StoryArc, DailyChallenge } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey !== 'placeholder-key';

if (!isConfigured) {
  console.warn('Supabase credentials not configured. Using offline mock mode.');
}

// Create client (will fail network calls if unconfigured, so we guard usage below)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// ==================== AUTH ====================

export const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) throw error;
  return { data };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return { data };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (!isConfigured) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !profile) return null;
    return profile as User;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  } catch (error) {
    return null;
  }
};

// ==================== PROFILES ====================

export const getProfile = async (userId: string): Promise<User | null> => {
  if (!isConfigured) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data as User;
};

export const updateProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as User;
};

// ==================== TEA DROPS ====================

export const createTeaDrop = async (teaDrop: Omit<TeaDrop, 'id' | 'created_at' | 'likes' | 'comments_count' | 'shares_count'>) => {
  const { data, error } = await supabase
    .from('tea_drops')
    .insert([teaDrop])
    .select()
    .single();

  if (error) throw error;

  // Increment user's tea_drops_count
  await supabase.rpc('increment_tea_drops_count', { user_id: teaDrop.user_id });

  return data as TeaDrop;
};

export const getTeaDrops = async (limit = 20, offset = 0): Promise<TeaDrop[]> => {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('tea_drops')
    .select('*, profiles(username, avatar_url, level)')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Transform the data to match our interface
  return (data || []).map((item: any) => ({
    ...item,
    username: item.profiles?.username || 'Unknown',
    user_avatar: item.profiles?.avatar_url,
    user_level: item.profiles?.level,
  })) as TeaDrop[];
};

export const likeTeaDrop = async (teaDropId: string, userId: string) => {
  const { error } = await supabase.rpc('like_tea_drop', {
    drop_id: teaDropId,
    user_id: userId
  });
  if (error) throw error;
};

// ==================== TOKEN ECONOMY ====================

export const getTokenBalance = async (userId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('roast_tokens')
    .eq('id', userId)
    .single();

  if (error) return 0;
  return data?.roast_tokens || 0;
};

export const spendTokens = async (userId: string, amount: number, description: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc('spend_tokens', {
    p_user_id: userId,
    p_amount: amount,
    p_description: description
  });

  if (error) {
    console.error('Spend tokens error:', error);
    return false;
  }

  return data === true;
};

export const addTokens = async (userId: string, amount: number, type: string, description: string) => {
  const { error } = await supabase.rpc('add_tokens', {
    p_user_id: userId,
    p_amount: amount,
    p_type: type,
    p_description: description
  });

  if (error) throw error;
};

export const claimDailyReward = async (userId: string) => {
  const { data, error } = await supabase.rpc('claim_daily_reward', {
    p_user_id: userId
  });

  if (error) throw error;
  return data as { tokens: number; xp: number; streak: number };
};

// ==================== DAILY CHALLENGES ====================

// ==================== DAILY CHALLENGES ====================

export const getTodayChallenge = async (): Promise<DailyChallenge | null> => {
  if (!isConfigured) return null;
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('date', today)
    .single();

  if (error) {
    // No challenge for today, create one
    return createDailyChallenge();
  }

  return data as DailyChallenge;
};

export const createDailyChallenge = async (): Promise<DailyChallenge | null> => {
  const themes = [
    { theme: 'Corporate Nonsense', description: 'Roast the most absurd corporate jargon', examples: ['Company Announces "Synergistic Paradigm Shift"', 'CEO Declares "We\'re Like a Family" Before Layoffs'] },
    { theme: 'Tech Bro Delusions', description: 'Mock ridiculous tech industry claims', examples: ['New App Promises to Solve Loneliness with Blockchain', 'AI Achieves Consciousness, Asks for Equity'] },
    { theme: 'Political Absurdity', description: 'The most ridiculous political news', examples: ['Politician Discovers Internet, Horrified', 'New Law Requires Politicians to Pass Turing Test'] },
    { theme: 'Celebrity Nonsense', description: 'Celebrity news that makes you question reality', examples: ['Influencer Discovers Poverty, Calls it "Aesthetic"', 'Celebrity Releases Perfume That Smells Like Ego'] },
  ];

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  const { data, error } = await supabase
    .from('daily_challenges')
    .insert([{
      theme: randomTheme.theme,
      description: randomTheme.description,
      example_headlines: randomTheme.examples,
      prize_tokens: 100,
    }])
    .select()
    .single();

  if (error) return null;
  return data as DailyChallenge;
};

export const getChallengeEntries = async (challengeId: string): Promise<TeaDrop[]> => {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('tea_drops')
    .select('*, profiles(username, avatar_url, level)')
    .eq('challenge_id', challengeId)
    .eq('is_challenge_entry', true)
    .order('likes', { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    ...item,
    username: item.profiles?.username || 'Unknown',
    user_avatar: item.profiles?.avatar_url,
    user_level: item.profiles?.level,
  })) as TeaDrop[];
};

// ==================== ROAST BATTLES ====================

export const createBattle = async (challengerId: string, opponentId: string): Promise<RoastBattle> => {
  const { data, error } = await supabase
    .from('roast_battles')
    .insert([{
      challenger_id: challengerId,
      opponent_id: opponentId,
      status: 'pending',
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data as RoastBattle;
};

export const getActiveBattles = async (): Promise<RoastBattle[]> => {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('roast_battles')
    .select('*, challenger:profiles!challenger_id(username), opponent:profiles!opponent_id(username)')
    .in('status', ['active', 'voting'])
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;

  return (data || []).map((item: any) => ({
    ...item,
    challenger_username: item.challenger?.username || 'Unknown',
    opponent_username: item.opponent?.username || 'Unknown',
  })) as RoastBattle[];
};

export const submitBattleRoast = async (battleId: string, userId: string, headline: string, roast: string) => {
  const { data: battle } = await supabase
    .from('roast_battles')
    .select('*')
    .eq('id', battleId)
    .single();

  if (!battle) throw new Error('Battle not found');

  const isChallenger = battle.challenger_id === userId;

  const updates = isChallenger
    ? { challenger_headline: headline, challenger_roast: roast }
    : { opponent_headline: headline, opponent_roast: roast, status: 'voting' };

  const { error } = await supabase
    .from('roast_battles')
    .update(updates)
    .eq('id', battleId);

  if (error) throw error;
};

export const voteInBattle = async (battleId: string, userId: string, forChallenger: boolean) => {
  const { error } = await supabase.rpc('vote_battle', {
    p_battle_id: battleId,
    p_user_id: userId,
    p_for_challenger: forChallenger
  });

  if (error) throw error;
};

// ==================== ACHIEVEMENTS ====================

export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false });

  if (error) throw error;
  return data as Achievement[] || [];
};

export const claimAchievementReward = async (achievementId: string, userId: string) => {
  const { error } = await supabase.rpc('claim_achievement', {
    p_achievement_id: achievementId,
    p_user_id: userId
  });

  if (error) throw error;
};

// ==================== LEADERBOARD ====================

export const getLeaderboard = async (_timeframe: 'daily' | 'weekly' | 'alltime' = 'weekly', limit = 20): Promise<User[]> => {
  if (!isConfigured) return [];
  let query = supabase
    .from('profiles')
    .select('id, username, avatar_url, level, title, xp, tea_drops_count, battle_wins, followers_count')
    .order('xp', { ascending: false })
    .limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data as User[] || [];
};

// ==================== NOTIFICATIONS ====================

export const getNotifications = async (userId: string, unreadOnly = false): Promise<Notification[]> => {
  if (!isConfigured) return [];
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Notification[] || [];
};

export const markNotificationRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
};

export const createNotification = async (userId: string, type: string, title: string, message: string, data?: any) => {
  const { error } = await supabase
    .from('notifications')
    .insert([{
      user_id: userId,
      type,
      title,
      message,
      data: data || {},
    }]);

  if (error) console.error('Failed to create notification:', error);
};

// ==================== STORY ARCS ====================

export const createStoryArc = async (userId: string, headline: string, content: string): Promise<StoryArc> => {
  const { data, error } = await supabase
    .from('story_arcs')
    .insert([{
      user_id: userId,
      headline,
      content,
    }])
    .select()
    .single();

  if (error) throw error;

  // Increment user's story_arc_count
  await supabase.rpc('increment_story_arc_count', { user_id: userId });

  return data as StoryArc;
};

export const getStoryArcs = async (userId?: string, limit = 10): Promise<StoryArc[]> => {
  if (!isConfigured) return [];
  let query = supabase
    .from('story_arcs')
    .select('*, profiles(username)')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as StoryArc[] || [];
};

// ==================== XP & LEVELING ====================

export const addXp = async (userId: string, amount: number) => {
  const { error } = await supabase.rpc('add_xp', {
    p_user_id: userId,
    p_xp: amount
  });

  if (error) throw error;
};

// ==================== REALTIME SUBSCRIPTIONS ====================

export const subscribeToTeaDrops = (callback: (teaDrop: TeaDrop) => void) => {
  return supabase
    .channel('tea_drops')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tea_drops' }, (payload) => {
      callback(payload.new as TeaDrop);
    })
    .subscribe();
};

export const subscribeToNotifications = (userId: string, callback: (notification: Notification) => void) => {
  return supabase
    .channel(`notifications:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, (payload) => {
      callback(payload.new as Notification);
    })
    .subscribe();
};
