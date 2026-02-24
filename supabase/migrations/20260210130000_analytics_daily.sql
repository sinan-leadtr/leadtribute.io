-- analytics_daily: aggregated daily performance per user & platform
CREATE TABLE IF NOT EXISTS analytics_daily (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  date DATE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'shopify', 'tiktok', 'klaviyo', 'blended')),
  spend NUMERIC NOT NULL DEFAULT 0,
  revenue NUMERIC NOT NULL DEFAULT 0,
  roas NUMERIC NOT NULL DEFAULT 0,
  impressions INTEGER,
  clicks INTEGER,
  UNIQUE (user_id, date, platform)
);

CREATE INDEX IF NOT EXISTS analytics_daily_user_id_idx ON analytics_daily(user_id);
CREATE INDEX IF NOT EXISTS analytics_daily_user_date_idx ON analytics_daily(user_id, date);

ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics_daily"
  ON analytics_daily FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics_daily"
  ON analytics_daily FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics_daily"
  ON analytics_daily FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analytics_daily"
  ON analytics_daily FOR DELETE
  USING (auth.uid() = user_id);

