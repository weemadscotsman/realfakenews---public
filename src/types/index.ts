export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  is_subscribed: boolean;
  subscription_tier?: 'free' | 'premium' | 'vip';
  subscription_expires_at?: string;
  referral_code: string;
  referred_by?: string;
  
  // Gamification
  xp?: number;
  level?: number;
  title?: string;
  streak_days?: number;
  last_login_at?: string;
  
  // Economy
  roast_tokens?: number;
  total_roasts_generated?: number;
  total_roasts_received?: number;
  
  // Stats
  story_arc_count: number;
  tea_drops_count: number;
  battle_wins?: number;
  battle_losses?: number;
  followers_count?: number;
  following_count?: number;
  
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
  comments_count?: number;
  shares_count?: number;
  is_challenge_entry?: boolean;
  challenge_id?: string;
  created_at: string;
  username?: string;
  user_avatar?: string;
  user_level?: number;
}

export interface StoryArc {
  id: string;
  user_id: string;
  headline: string;
  content: string;
  category: string;
  published_at: string;
  read_count: number;
}

export interface NewsArticle {
  id: string;
  headline: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  published_at: string;
  image_url?: string;
  is_breaking: boolean;
  read_time: number;
  tags: string[];
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: 'USDT' | 'XRP';
  wallet_address: string;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
  confirmed_at?: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  status: 'pending' | 'completed';
  created_at: string;
}

export type NewsCategory = 
  | 'politics' 
  | 'science' 
  | 'entertainment' 
  | 'sports' 
  | 'opinion' 
  | 'sponsored' 
  | 'breaking';

export interface DailyChallenge {
  id: string;
  date: string;
  theme: string;
  description: string;
  example_headlines?: string[];
  prize_tokens: number;
  participants_count: number;
  winner_id?: string;
  is_active: boolean;
}

export interface RoastBattle {
  id: string;
  challenger_id: string;
  challenger_username?: string;
  opponent_id: string;
  opponent_username?: string;
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
  type: string;
  unlocked_at: string;
  claimed: boolean;
  reward_tokens: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  created_at: string;
}
