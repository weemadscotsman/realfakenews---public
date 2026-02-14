-- ==================== PHASE 8: QUEST STATS VIEW ====================
-- Run this in Supabase SQL Editor to enable stats visualization

-- 1. Create Aggregated View for Quest Stats
-- Aggregates votes by Arc and Branch
CREATE OR REPLACE VIEW quest_statistics AS
SELECT 
    arc_id, 
    branch_id, 
    COUNT(id) as vote_count, 
    SUM(tokens_spent) as total_tokens
FROM 
    quest_votes
GROUP BY 
    arc_id, branch_id;

-- 2. Grant Permissions
-- Allow authenticated service role (backend) to read this view
ALTER VIEW quest_statistics OWNER TO postgres;
GRANT SELECT ON quest_statistics TO service_role;
GRANT SELECT ON quest_statistics TO anon; -- Allow public read for overlay if needed (via RLS/Policy usually, but Views inherit underlying table RLS if security_invoker is set, or owner permissions if not)

-- NOTE: Views in Supabase/Postgres run with the permissions of the view owner by default (security_definer equivalent).
-- Since we want public stats to be potentially visible, granting select to anon/authenticated is fine, 
-- but since 'quest_votes' allows SELECT to everyone, this is safe.
