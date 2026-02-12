-- RealFake News Database Functions
-- Run this after the schema

-- Function to spend tokens
CREATE OR REPLACE FUNCTION spend_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_tokens INTEGER;
BEGIN
  -- Get current token balance
  SELECT roast_tokens INTO v_current_tokens
  FROM profiles
  WHERE id = p_user_id;
  
  -- Check if user has enough tokens
  IF v_current_tokens < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct tokens
  UPDATE profiles
  SET roast_tokens = roast_tokens - p_amount
  WHERE id = p_user_id;
  
  -- Record transaction
  INSERT INTO token_transactions (user_id, amount, type, description)
  VALUES (p_user_id, -p_amount, 'spend', p_description);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add tokens
CREATE OR REPLACE FUNCTION add_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_description TEXT
)
RETURNS VOID AS $$
BEGIN
  -- Add tokens
  UPDATE profiles
  SET roast_tokens = roast_tokens + p_amount
  WHERE id = p_user_id;
  
  -- Record transaction
  INSERT INTO token_transactions (user_id, amount, type, description)
  VALUES (p_user_id, p_amount, p_type, p_description);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to claim daily reward
CREATE OR REPLACE FUNCTION claim_daily_reward(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_last_login TIMESTAMPTZ;
  v_streak INTEGER;
  v_base_tokens INTEGER := 3;
  v_streak_bonus DECIMAL;
  v_total_tokens INTEGER;
  v_result JSONB;
BEGIN
  -- Get user's last login and streak
  SELECT last_login_at, streak_days 
  INTO v_last_login, v_streak
  FROM profiles 
  WHERE id = p_user_id;
  
  -- Check if already claimed today
  IF v_last_login IS NOT NULL AND DATE(v_last_login) = CURRENT_DATE THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Already claimed today'
    );
  END IF;
  
  -- Check streak continuity
  IF v_last_login IS NULL OR v_last_login < CURRENT_DATE - INTERVAL '1 day' THEN
    v_streak := 0;
  END IF;
  
  -- Increment streak
  v_streak := v_streak + 1;
  
  -- Calculate bonus (max 5)
  v_streak_bonus := LEAST(v_streak * 0.5, 5);
  v_total_tokens := v_base_tokens + FLOOR(v_streak_bonus);
  
  -- Update user
  UPDATE profiles
  SET 
    roast_tokens = roast_tokens + v_total_tokens,
    xp = xp + 10,
    streak_days = v_streak,
    last_login_at = NOW()
  WHERE id = p_user_id;
  
  -- Record transaction
  INSERT INTO token_transactions (user_id, amount, type, description)
  VALUES (p_user_id, v_total_tokens, 'daily_reward', 
          'Daily login + ' || v_streak || '-day streak bonus');
  
  -- Check for streak achievements
  IF v_streak = 7 THEN
    PERFORM check_and_grant_achievement(p_user_id, 'roast_streak_7', 50);
  ELSIF v_streak = 30 THEN
    PERFORM check_and_grant_achievement(p_user_id, 'roast_streak_30', 200);
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'tokens', v_total_tokens,
    'xp', 10,
    'streak', v_streak
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and grant achievement
CREATE OR REPLACE FUNCTION check_and_grant_achievement(
  p_user_id UUID,
  p_type TEXT,
  p_reward INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO achievements (user_id, type, reward_tokens)
  VALUES (p_user_id, p_type, p_reward)
  ON CONFLICT (user_id, type) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add XP and check level up
CREATE OR REPLACE FUNCTION add_xp(p_user_id UUID, p_xp INTEGER)
RETURNS JSONB AS $$
DECLARE
  v_current_xp INTEGER;
  v_current_level INTEGER;
  v_new_level INTEGER;
  v_level_titles TEXT[] := ARRAY[
    'News Novice', 'Tea Spiller', 'Gossip Guru', 'Drama Dealer', 
    'Chaos Agent', 'Roast Master', 'Fake News Legend', 'Supreme Leader'
  ];
  v_new_title TEXT;
BEGIN
  -- Add XP
  UPDATE profiles
  SET xp = xp + p_xp
  WHERE id = p_user_id
  RETURNING xp, level INTO v_current_xp, v_current_level;
  
  -- Calculate new level (every 1000 XP = 1 level, max 25)
  v_new_level := LEAST(FLOOR(v_current_xp / 1000) + 1, 25);
  
  -- Check if leveled up
  IF v_new_level > v_current_level THEN
    v_new_title := v_level_titles[LEAST(v_new_level, array_length(v_level_titles, 1))];
    
    UPDATE profiles
    SET 
      level = v_new_level,
      title = v_new_title
    WHERE id = p_user_id;
    
    RETURN jsonb_build_object(
      'leveled_up', true,
      'old_level', v_current_level,
      'new_level', v_new_level,
      'new_title', v_new_title
    );
  END IF;
  
  RETURN jsonb_build_object('leveled_up', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment tea drops count
CREATE OR REPLACE FUNCTION increment_tea_drops_count(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE profiles
  SET tea_drops_count = tea_drops_count + 1
  WHERE id = p_user_id
  RETURNING tea_drops_count INTO v_count;
  
  -- Check for achievements
  IF v_count = 1 THEN
    PERFORM check_and_grant_achievement(p_user_id, 'first_roast', 10);
  ELSIF v_count = 100 THEN
    PERFORM check_and_grant_achievement(p_user_id, 'tea_master', 100);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment story arc count
CREATE OR REPLACE FUNCTION increment_story_arc_count(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET story_arc_count = story_arc_count + 1
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to like tea drop
CREATE OR REPLACE FUNCTION like_tea_drop(p_drop_id UUID, p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Check if already liked
  IF EXISTS (
    SELECT 1 FROM tea_drop_likes 
    WHERE tea_drop_id = p_drop_id AND user_id = p_user_id
  ) THEN
    -- Unlike
    DELETE FROM tea_drop_likes 
    WHERE tea_drop_id = p_drop_id AND user_id = p_user_id;
    
    UPDATE tea_drops
    SET likes = likes - 1
    WHERE id = p_drop_id;
  ELSE
    -- Like
    INSERT INTO tea_drop_likes (tea_drop_id, user_id)
    VALUES (p_drop_id, p_user_id);
    
    UPDATE tea_drops
    SET likes = likes + 1
    WHERE id = p_drop_id;
    
    -- Create notification for tea drop owner
    INSERT INTO notifications (user_id, type, title, message, data)
    SELECT 
      user_id,
      'roast_liked',
      'Your roast got a like!',
      (SELECT username FROM profiles WHERE id = p_user_id) || ' liked your roast',
      jsonb_build_object('tea_drop_id', p_drop_id)
    FROM tea_drops
    WHERE id = p_drop_id AND user_id != p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create tea_drop_likes table
CREATE TABLE IF NOT EXISTS tea_drop_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tea_drop_id UUID NOT NULL REFERENCES tea_drops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tea_drop_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_tea_drop_likes_drop ON tea_drop_likes(tea_drop_id);
CREATE INDEX IF NOT EXISTS idx_tea_drop_likes_user ON tea_drop_likes(user_id);

-- Function to vote in battle
CREATE OR REPLACE FUNCTION vote_battle(
  p_battle_id UUID,
  p_user_id UUID,
  p_for_challenger BOOLEAN
)
RETURNS VOID AS $$
DECLARE
  v_battle RECORD;
BEGIN
  -- Get battle info
  SELECT * INTO v_battle
  FROM roast_battles
  WHERE id = p_battle_id;
  
  IF v_battle IS NULL THEN
    RAISE EXCEPTION 'Battle not found';
  END IF;
  
  -- Check if user already voted
  IF EXISTS (
    SELECT 1 FROM battle_votes 
    WHERE battle_id = p_battle_id AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'Already voted in this battle';
  END IF;
  
  -- Record vote
  INSERT INTO battle_votes (battle_id, user_id, voted_for_challenger)
  VALUES (p_battle_id, p_user_id, p_for_challenger);
  
  -- Update vote count
  IF p_for_challenger THEN
    UPDATE roast_battles
    SET challenger_votes = challenger_votes + 1
    WHERE id = p_battle_id;
  ELSE
    UPDATE roast_battles
    SET opponent_votes = opponent_votes + 1
    WHERE id = p_battle_id;
  END IF;
  
  -- Check if battle should end (e.g., after 24 hours or X votes)
  -- This is simplified - you might want more complex logic
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to finalize battle
CREATE OR REPLACE FUNCTION finalize_battle(p_battle_id UUID)
RETURNS VOID AS $$
DECLARE
  v_battle RECORD;
  v_winner_id UUID;
BEGIN
  SELECT * INTO v_battle
  FROM roast_battles
  WHERE id = p_battle_id;
  
  IF v_battle.status != 'voting' THEN
    RETURN;
  END IF;
  
  -- Determine winner
  IF v_battle.challenger_votes > v_battle.opponent_votes THEN
    v_winner_id := v_battle.challenger_id;
  ELSIF v_battle.opponent_votes > v_battle.challenger_votes THEN
    v_winner_id := v_battle.opponent_id;
  END IF;
  
  -- Update battle
  UPDATE roast_battles
  SET 
    status = 'completed',
    winner_id = v_winner_id
  WHERE id = p_battle_id;
  
  -- Update winner stats
  IF v_winner_id IS NOT NULL THEN
    UPDATE profiles
    SET 
      battle_wins = battle_wins + 1,
      xp = xp + 150
    WHERE id = v_winner_id;
    
    -- Add tokens to winner
    PERFORM add_tokens(v_winner_id, 25, 'battle_win', 'Won roast battle');
    
    -- Create notification
    INSERT INTO notifications (user_id, type, title, message, data)
    VALUES (
      v_winner_id,
      'battle_won',
      'You won a roast battle!',
      'Your roast was voted the best! +25 tokens, +150 XP',
      jsonb_build_object('battle_id', p_battle_id)
    );
  END IF;
  
  -- Update loser stats
  IF v_winner_id = v_battle.challenger_id THEN
    UPDATE profiles
    SET battle_losses = battle_losses + 1
    WHERE id = v_battle.opponent_id;
  ELSE
    UPDATE profiles
    SET battle_losses = battle_losses + 1
    WHERE id = v_battle.challenger_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to claim achievement reward
CREATE OR REPLACE FUNCTION claim_achievement(
  p_achievement_id UUID,
  p_user_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_achievement RECORD;
BEGIN
  SELECT * INTO v_achievement
  FROM achievements
  WHERE id = p_achievement_id AND user_id = p_user_id;
  
  IF v_achievement IS NULL THEN
    RAISE EXCEPTION 'Achievement not found';
  END IF;
  
  IF v_achievement.claimed THEN
    RAISE EXCEPTION 'Already claimed';
  END IF;
  
  -- Mark as claimed
  UPDATE achievements
  SET claimed = TRUE
  WHERE id = p_achievement_id;
  
  -- Add tokens
  PERFORM add_tokens(p_user_id, v_achievement.reward_tokens, 'achievement', 
                     'Achievement: ' || v_achievement.type);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on tea_drop_likes
ALTER TABLE tea_drop_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tea drop likes are viewable by everyone" ON tea_drop_likes FOR SELECT USING (true);
CREATE POLICY "Users can create own likes" ON tea_drop_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON tea_drop_likes FOR DELETE USING (auth.uid() = user_id);
