-- Create campaigns table
-- Note: 'learning' status added to check constraint to match existing mock data
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('meta', 'google', 'tiktok')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'paused', 'learning')) NOT NULL,
  spend NUMERIC DEFAULT 0,
  roas NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed data corresponding to the mock data
-- Revenue calculated as Spend * ROAS
INSERT INTO campaigns (name, platform, status, spend, roas, revenue)
VALUES
  ('Q1 Brand Awareness', 'meta', 'active', 4250, 4.2, 17850),
  ('Search - High Intent', 'google', 'active', 1890, 5.1, 9639),
  ('UGC Test - Gen Z', 'tiktok', 'learning', 620, 1.4, 868),
  ('Retargeting - Cart Abandoners', 'meta', 'active', 2100, 3.9, 8190),
  ('Performance Max - Summer', 'google', 'paused', 0, 0, 0),
  ('Stories - Product Launch', 'meta', 'active', 1250, 2.8, 3500),
  ('In-Feed - Broad Reach', 'tiktok', 'active', 980, 2.1, 2058),
  ('Search - Brand Terms', 'google', 'active', 540, 6.0, 3240);
