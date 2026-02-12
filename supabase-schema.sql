-- RealFake News Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  is_subscribed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'vip')),
  subscription_expires_at TIMESTAMPTZ,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES profiles(id),
  
  -- Gamification
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  title TEXT DEFAULT 'News Novice',
  streak_days INTEGER DEFAULT 0,
  last_login_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Economy
  roast_tokens INTEGER DEFAULT 3,
  premium_credits INTEGER DEFAULT 0,
  total_roasts_generated INTEGER DEFAULT 0,
  total_roasts_received INTEGER DEFAULT 0,
  
  -- Stats
  tea_drops_count INTEGER DEFAULT 0,
  story_arc_count INTEGER DEFAULT 0,
  battle_wins INTEGER DEFAULT 0,
  battle_losses INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tea Drops table
CREATE TABLE IF NOT EXISTS tea_drops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  roast TEXT NOT NULL,
  roast_intensity TEXT DEFAULT 'mild' CHECK (roast_intensity IN ('mild', 'spicy', 'nuclear', 'apocalyptic')),
  roast_style TEXT DEFAULT 'default' CHECK (roast_style IN ('default', 'shakespeare', 'drill', 'corporate', 'boomer', 'genz', 'pirate', 'yoda')),
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_challenge_entry BOOLEAN DEFAULT FALSE,
  challenge_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  theme TEXT NOT NULL,
  description TEXT NOT NULL,
  example_headlines TEXT[] DEFAULT '{}',
  prize_tokens INTEGER DEFAULT 100,
  participants_count INTEGER DEFAULT 0,
  winner_id UUID REFERENCES profiles(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roast Battles table
CREATE TABLE IF NOT EXISTS roast_battles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenger_id UUID NOT NULL REFERENCES profiles(id),
  opponent_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'voting', 'completed')),
  challenger_headline TEXT,
  challenger_roast TEXT,
  opponent_headline TEXT,
  opponent_roast TEXT,
  challenger_votes INTEGER DEFAULT 0,
  opponent_votes INTEGER DEFAULT 0,
  winner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

-- Battle Votes table
CREATE TABLE IF NOT EXISTS battle_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  battle_id UUID NOT NULL REFERENCES roast_battles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  voted_for_challenger BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(battle_id, user_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  claimed BOOLEAN DEFAULT FALSE,
  reward_tokens INTEGER DEFAULT 0,
  UNIQUE(user_id, type)
);

-- Token Transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('daily_reward', 'purchase', 'achievement', 'challenge_win', 'battle_win', 'referral', 'spend', 'signup_bonus')),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tea_drop_id UUID NOT NULL REFERENCES tea_drops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story Arcs table
CREATE TABLE IF NOT EXISTS story_arcs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Subscriber Story',
  read_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('USDT', 'XRP')),
  wallet_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tea_drops_user_id ON tea_drops(user_id);
CREATE INDEX IF NOT EXISTS idx_tea_drops_created_at ON tea_drops(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tea_drops_challenge ON tea_drops(challenge_id) WHERE is_challenge_entry = TRUE;
CREATE INDEX IF NOT EXISTS idx_battles_challenger ON roast_battles(challenger_id);
CREATE INDEX IF NOT EXISTS idx_battles_opponent ON roast_battles(opponent_id);
CREATE INDEX IF NOT EXISTS idx_battles_status ON roast_battles(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, email, referral_code, roast_tokens)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user') || '_' || substr(md5(random()::text), 1, 4),
    10 -- Signup bonus tokens
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tea_drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE roast_battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE battle_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_arcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Tea Drops: Viewable by all, insertable by authenticated users
CREATE POLICY "Tea drops are viewable by everyone" ON tea_drops FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create tea drops" ON tea_drops FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Battles: Viewable by all, manageable by participants
CREATE POLICY "Battles are viewable by everyone" ON roast_battles FOR SELECT USING (true);
CREATE POLICY "Users can create battles" ON roast_battles FOR INSERT WITH CHECK (auth.uid() = challenger_id);
CREATE POLICY "Participants can update battles" ON roast_battles FOR UPDATE USING (auth.uid() IN (challenger_id, opponent_id));

-- Achievements: Viewable by owner
CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);

-- Token Transactions: Viewable by owner
CREATE POLICY "Users can view own transactions" ON token_transactions FOR SELECT USING (auth.uid() = user_id);

-- Notifications: Viewable by owner
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Follows: Viewable by all, manageable by follower
CREATE POLICY "Follows are viewable by everyone" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can create own follows" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete own follows" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Comments: Viewable by all, manageable by author
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Story Arcs: Viewable by all, insertable by owner
CREATE POLICY "Story arcs are viewable by everyone" ON story_arcs FOR SELECT USING (true);
CREATE POLICY "Users can create own story arcs" ON story_arcs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments: Viewable by owner
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
