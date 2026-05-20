export type FeatureStatus = "included" | "limited" | "excluded";

export type PricingFeature = {
  label: string;
  status: FeatureStatus;
};

export type TierBadgeVariant = "neutral" | "best" | "team";

export type PricingTier = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  period: string;
  description: string;
  priceNote: string | null;
  priceSub: string | null;
  afterTrial?: boolean;
  features: PricingFeature[];
  cta: string;
  href: string;
  highlighted: boolean;
  cornerBadge?: { label: string; variant: TierBadgeVariant };
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    period: "mo",
    description: "Free forever with limits — ideal for side projects.",
    priceNote: "Free forever",
    priceSub: "Limited features",
    cornerBadge: { label: "Free forever", variant: "neutral" },
    features: [
      { label: "Up to 3 connected accounts", status: "limited" },
      { label: "Basic ROAS & spend", status: "included" },
      { label: "7-day data history", status: "limited" },
      { label: "Email support", status: "included" },
      { label: "Data export", status: "excluded" },
      { label: "Markov multi-touch attribution", status: "excluded" },
      { label: "Priority support", status: "excluded" },
    ],
    cta: "Start on Starter",
    href: "/register",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 49,
    yearly: 39,
    period: "mo",
    description: "Full attribution, history, and exports for growing teams.",
    priceNote: "14-day Pro trial",
    priceSub: "No credit card required",
    afterTrial: true,
    cornerBadge: { label: "Best value", variant: "best" },
    features: [
      { label: "Unlimited connected accounts", status: "included" },
      { label: "Real-time ROAS & MER", status: "included" },
      { label: "Full data history", status: "included" },
      { label: "Markov multi-touch attribution", status: "included" },
      { label: "Export & reports", status: "included" },
      { label: "Priority support", status: "included" },
      { label: "Shopify & Klaviyo sync", status: "included" },
    ],
    cta: "Start 14-day Pro trial",
    href: "/register",
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 149,
    yearly: 119,
    period: "mo",
    description: "For agencies and larger teams.",
    priceNote: null,
    priceSub: null,
    cornerBadge: { label: "For agencies", variant: "team" },
    features: [
      { label: "Everything in Pro", status: "included" },
      { label: "Multi-user & roles", status: "included" },
      { label: "White-label reports", status: "included" },
      { label: "Dedicated success manager", status: "included" },
      { label: "API access", status: "included" },
    ],
    cta: "Contact sales",
    href: "mailto:hello@leadtribute.io",
    highlighted: false,
  },
];

export const heroPricingTierIds = ["starter", "pro"] as const;
