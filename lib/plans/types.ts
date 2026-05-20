export type PlanId = "starter" | "pro" | "scale";

export type PlanEntitlements = {
  planId: PlanId;
  displayName: string;
  historyDays: number;
  maxIntegrations: number;
  markovAttribution: boolean;
  canExport: boolean;
  aiCopilot: boolean;
  forecast: boolean;
  fullAnalytics: boolean;
  prioritySupport: boolean;
};

export type UserPlanState = {
  planId: PlanId;
  effectivePlanId: PlanId;
  entitlements: PlanEntitlements;
  trialEndsAt: string | null;
  isOnProTrial: boolean;
  trialExpired: boolean;
  daysLeftOnTrial: number | null;
};
