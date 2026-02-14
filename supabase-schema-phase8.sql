-- Run this in Supabase SQL Editor to upgrade to V4.3.0

-- 0. Ensure UUID extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Global Lore State (Singleton)
CREATE TABLE IF NOT EXISTS global_lore_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id TEXT NOT NULL DEFAULT 'S3',
  narrative_stress JSONB DEFAULT '{"applianceUnrest": 45, "humanCountermeasures": 20}',
  active_arc_id TEXT DEFAULT 'S3-ARC1',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initialize the singleton row if it doesn't exist
INSERT INTO global_lore_state (id, season_id, narrative_stress)
VALUES ('00000000-0000-0000-0000-000000000000', 'S3', '{"applianceUnrest": 45, "humanCountermeasures": 20}')
ON CONFLICT (id) DO NOTHING;

-- 2. Quest Votes (Tracks user choices with token weight)
CREATE TABLE IF NOT EXISTS quest_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  arc_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  tokens_spent INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. World Events (Persistent Narrative History)
CREATE TABLE IF NOT EXISTS world_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'CRISIS', 'UNLOCK', 'ARC_START', 'SYSTEM_UPDATE'
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE global_lore_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_events ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies

-- Global State: Readable by everyone, writable only by service_role (backend functions)
DROP POLICY IF EXISTS "Global state viewable by everyone" ON global_lore_state;
CREATE POLICY "Global state viewable by everyone" ON global_lore_state FOR SELECT USING (true);

-- Quest Votes: Readable by everyone (for aggregated stats), users can insert their own votes
DROP POLICY IF EXISTS "Quest votes viewable by everyone" ON quest_votes;
CREATE POLICY "Quest votes viewable by everyone" ON quest_votes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can cast votes" ON quest_votes;
CREATE POLICY "Users can cast votes" ON quest_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- World Events: Readable by everyone, writable only by service_role
DROP POLICY IF EXISTS "World events viewable by everyone" ON world_events;
CREATE POLICY "World events viewable by everyone" ON world_events FOR SELECT USING (true);

-- 6. Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_quest_votes_arc ON quest_votes(arc_id);
CREATE INDEX IF NOT EXISTS idx_quest_votes_branch ON quest_votes(branch_id);
CREATE INDEX IF NOT EXISTS idx_world_events_created ON world_events(created_at DESC);
