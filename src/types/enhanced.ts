export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  is_subscribed: boolean;
  subscription_tier: 'free' | 'premium' | 'vip';
  subscription_expires_at?: string;
  referral_code: string;
  referred_by?: string;
  
  // Gamification
  xp: number;
  level: number;
  title: string;
  streak_days: number;
  last_login_at: string;
  
  // Economy
  roast_tokens: number;
  total_roasts_generated: number;
  total_roasts_received: number;
  
  // Stats
  tea_drops_count: number;
  story_arc_count: number;
  battle_wins: number;
  battle_losses: number;
  followers_count: number;
  following_count: number;
  
  created_at: string;
}

export interface TeaDrop {
  id: string;
  user_id: string;
  headline: string;
  roast: string;
  roast_intensity: 'mild' | 'spicy' | 'nuclear' | 'apocalyptic';
  roast_style?: 'default' | 'shakespeare' | 'drill' | 'corporate' | 'boomer' | 'genz' | 'pirate' | 'yoda';
  likes: number;
  comments_count: number;
  shares_count: number;
  is_challenge_entry?: boolean;
  challenge_id?: string;
  created_at: string;
  username: string;
  user_avatar?: string;
  user_level?: number;
}

export interface DailyChallenge {
  id: string;
  date: string;
  theme: string;
  description: string;
  example_headlines: string[];
  prize_tokens: number;
  participants_count: number;
  winner_id?: string;
  is_active: boolean;
}

export interface RoastBattle {
  id: string;
  challenger_id: string;
  challenger_username: string;
  opponent_id: string;
  opponent_username: string;
  status: 'pending' | 'active' | 'voting' | 'completed';
  challenger_headline?: string;
  challenger_roast?: string;
  opponent_headline?: string;
  opponent_roast?: string;
  challenger_votes: number;
  opponent_votes: number;
  winner_id?: string;
  created_at: string;
  expires_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  type: 
    | 'first_roast' 
    | 'roast_streak_7' 
    | 'roast_streak_30' 
    | 'roast_streak_365'
    | 'viral_roast' 
    | 'battle_winner' 
    | 'battle_legend'
    | 'tea_master'
    | 'roast_nuclear'
    | 'roast_apocalyptic'
    | 'social_butterfly'
    | 'influencer'
    | 'early_bird'
    | 'night_owl';
  unlocked_at: string;
  claimed: boolean;
  reward_tokens: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 
    | 'roast_ready' 
    | 'roast_liked' 
    | 'roast_commented'
    | 'roast_shared'
    | 'battle_challenge'
    | 'battle_won'
    | 'battle_lost'
    | 'new_follower'
    | 'achievement_unlocked'
    | 'daily_reward'
    | 'streak_reminder'
    | 'challenge_won';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  tea_drop_id: string;
  user_id: string;
  username: string;
  content: string;
  likes: number;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface TokenTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'purchase' | 'daily_reward' | 'achievement' | 'challenge_win' | 'battle_win' | 'referral' | 'spend';
  description: string;
  created_at: string;
}

export interface LevelConfig {
  level: number;
  title: string;
  xp_required: number;
  perks: string[];
}

export const LEVELS: LevelConfig[] = [
  { level: 1, title: 'News Novice', xp_required: 0, perks: ['3 free roasts/day'] },
  { level: 2, title: 'Tea Spiller', xp_required: 100, perks: ['5 free roasts/day', 'Basic roast styles'] },
  { level: 3, title: 'Gossip Guru', xp_required: 300, perks: ['7 free roasts/day', 'Comment on roasts'] },
  { level: 5, title: 'Drama Dealer', xp_required: 800, perks: ['10 free roasts/day', 'Start roast battles'] },
  { level: 10, title: 'Chaos Agent', xp_required: 2000, perks: ['Unlimited mild roasts', 'Premium styles'] },
  { level: 15, title: 'Roast Master', xp_required: 5000, perks: ['All styles unlocked', 'VIP badge'] },
  { level: 20, title: 'Fake News Legend', xp_required: 10000, perks: ['God mode', 'Custom roast styles'] },
  { level: 25, title: 'Supreme Leader', xp_required: 25000, perks: ['Immortal status', 'Revenue share'] },
];

export const ACHIEVEMENTS = {
  first_roast: { name: 'First Degree Burn', description: 'Submit your first headline', reward: 10 },
  roast_streak_7: { name: 'Week Warrior', description: '7-day login streak', reward: 50 },
  roast_streak_30: { name: 'Monthly Menace', description: '30-day login streak', reward: 200 },
  roast_streak_365: { name: 'Eternal Flame', description: '365-day login streak', reward: 1000 },
  viral_roast: { name: 'Viral Villain', description: 'Get 100+ likes on a roast', reward: 100 },
  battle_winner: { name: 'Battle Champion', description: 'Win your first roast battle', reward: 25 },
  battle_legend: { name: 'Undefeated', description: 'Win 10 roast battles in a row', reward: 500 },
  tea_master: { name: 'Tea Master', description: 'Drop 100 tea drops', reward: 100 },
  roast_nuclear: { name: 'Nuclear Option', description: 'Survive a nuclear roast', reward: 50 },
  roast_apocalyptic: { name: 'End Times', description: 'Receive an apocalyptic roast', reward: 100 },
  social_butterfly: { name: 'Social Butterfly', description: 'Get 50 followers', reward: 100 },
  influencer: { name: 'Fake Influencer', description: 'Get 500 followers', reward: 500 },
  early_bird: { name: 'Early Bird', description: 'Drop tea before 6am', reward: 20 },
  night_owl: { name: 'Night Owl', description: 'Drop tea after midnight', reward: 20 },
};
