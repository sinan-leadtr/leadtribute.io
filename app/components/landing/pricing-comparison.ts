import type { FeatureStatus } from "./pricing-features";

export type ComparisonRow = {
  /** Row label (e.g. Attribution, Data sync) */
  label: string;
  /** Short value shown beside the label */
  value: string;
  status: FeatureStatus;
};

export type ComparisonColumn = {
  id: string;
  name: string;
  price: string;
  priceSub?: string;
  cornerBadge: { label: string; variant: "neutral" | "best" | "team" };
  /** Side columns are visually dimmed like “Others” in the reference */
  dimmed?: boolean;
  highlighted?: boolean;
  rows: ComparisonRow[];
  cta?: { label: string; href: string };
};

/** Same five rows on every column — easy to scan down */
export const pricingComparisonColumns: ComparisonColumn[] = [
  {
    id: "platform-dashboards",
    name: "Platform dashboards",
    price: "Free*",
    priceSub: "Meta, Google, TikTok only",
    cornerBadge: { label: "Others", variant: "neutral" },
    dimmed: true,
    rows: [
      { label: "Unified view", value: "Per platform silos", status: "limited" },
      { label: "Attribution", value: "Last-click only", status: "excluded" },
      { label: "ROAS & spend", value: "Delayed estimates", status: "limited" },
      { label: "History & export", value: "Manual exports", status: "excluded" },
      { label: "Commerce + ads", value: "Rarely combined", status: "excluded" },
    ],
  },
  {
    id: "leadtribute",
    name: "Leadtribute",
    price: "From €49/mo",
    priceSub: "14-day Pro trial · no card",
    cornerBadge: { label: "Best value", variant: "best" },
    highlighted: true,
    rows: [
      { label: "Unified view", value: "One dashboard", status: "included" },
      { label: "Attribution", value: "Markov multi-touch", status: "included" },
      { label: "ROAS & spend", value: "Real-time sync", status: "included" },
      { label: "History & export", value: "Full history & export", status: "included" },
      { label: "Commerce + ads", value: "Shopify, Woo & more", status: "included" },
    ],
    cta: { label: "Get started now", href: "/register" },
  },
  {
    id: "spreadsheets",
    name: "Spreadsheets",
    price: "“Free”",
    priceSub: "Sheets + CSV exports",
    cornerBadge: { label: "Others", variant: "neutral" },
    dimmed: true,
    rows: [
      { label: "Unified view", value: "Manual merges", status: "excluded" },
      { label: "Attribution", value: "None", status: "excluded" },
      { label: "ROAS & spend", value: "Stale snapshots", status: "excluded" },
      { label: "History & export", value: "DIY formulas", status: "limited" },
      { label: "Commerce + ads", value: "Hours each week", status: "excluded" },
    ],
  },
];
