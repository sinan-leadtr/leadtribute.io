-- Attribution foundation: conversions, touchpoints, and model outputs
-- Supports multiple commerce platforms (Shopify, WooCommerce, BigCommerce, etc.)

CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  commerce_platform TEXT NOT NULL CHECK (
    commerce_platform IN (
      'shopify',
      'woocommerce',
      'bigcommerce',
      'magento',
      'wix',
      'squarespace',
      'shopware',
      'prestashop',
      'custom'
    )
  ),
  external_order_id TEXT NOT NULL,
  revenue NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  occurred_at TIMESTAMPTZ NOT NULL,
  landing_site TEXT,
  referring_site TEXT,
  raw_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, commerce_platform, external_order_id)
);

CREATE INDEX IF NOT EXISTS conversion_events_user_occurred_idx
  ON conversion_events(user_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS marketing_touchpoints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_id UUID REFERENCES conversion_events(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  touch_type TEXT NOT NULL DEFAULT 'click' CHECK (
    touch_type IN ('click', 'view', 'email', 'organic', 'direct', 'unknown')
  ),
  source_platform TEXT,
  occurred_at TIMESTAMPTZ NOT NULL,
  session_id TEXT,
  campaign_name TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS marketing_touchpoints_user_occurred_idx
  ON marketing_touchpoints(user_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS marketing_touchpoints_conversion_idx
  ON marketing_touchpoints(conversion_id);

CREATE TABLE IF NOT EXISTS attribution_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model TEXT NOT NULL CHECK (
    model IN (
      'markov',
      'last_click',
      'first_click',
      'linear',
      'time_decay',
      'u_shaped'
    )
  ),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  computed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS attribution_runs_user_computed_idx
  ON attribution_runs(user_id, computed_at DESC);

CREATE TABLE IF NOT EXISTS attribution_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES attribution_runs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  credited_revenue NUMERIC NOT NULL DEFAULT 0,
  credit_share NUMERIC NOT NULL DEFAULT 0,
  order_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE (run_id, channel)
);

CREATE INDEX IF NOT EXISTS attribution_credits_run_idx ON attribution_credits(run_id);

ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_touchpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribution_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribution_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own conversion_events"
  ON conversion_events FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own marketing_touchpoints"
  ON marketing_touchpoints FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own attribution_runs"
  ON attribution_runs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own attribution_credits"
  ON attribution_credits FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Extend api_keys for additional commerce platforms
ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_service_check;
ALTER TABLE api_keys ADD CONSTRAINT api_keys_service_check CHECK (
  service IN (
    'meta',
    'google',
    'shopify',
    'woocommerce',
    'bigcommerce',
    'magento',
    'wix',
    'tiktok',
    'klaviyo'
  )
);
