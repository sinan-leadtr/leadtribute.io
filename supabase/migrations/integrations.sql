-- Integrations table: stores connected ad platforms per user
CREATE TABLE IF NOT EXISTS integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('google', 'meta')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, platform)
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS integrations_user_id_idx ON integrations(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Users can only select their own integrations
CREATE POLICY "Users can view own integrations"
  ON integrations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own integrations
CREATE POLICY "Users can insert own integrations"
  ON integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own integrations
CREATE POLICY "Users can update own integrations"
  ON integrations FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own integrations
CREATE POLICY "Users can delete own integrations"
  ON integrations FOR DELETE
  USING (auth.uid() = user_id);
