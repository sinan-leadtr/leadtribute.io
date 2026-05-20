import type { PlanEntitlements, PlanId } from "./types";

const PLAN_META: Record<
  PlanId,
  Omit<PlanEntitlements, "planId">
> = {
  starter: {
    displayName: "Starter",
    historyDays: 7,
    maxIntegrations: 3,
    markovAttribution: false,
    canExport: false,
    aiCopilot: false,
    forecast: false,
    fullAnalytics: false,
    prioritySupport: false,
  },
  pro: {
    displayName: "Pro",
    historyDays: 30,
    maxIntegrations: 999,
    markovAttribution: true,
    canExport: true,
    aiCopilot: true,
    forecast: true,
    fullAnalytics: true,
    prioritySupport: true,
  },
  scale: {
    displayName: "Scale",
    historyDays: 30,
    maxIntegrations: 999,
    markovAttribution: true,
    canExport: true,
    aiCopilot: true,
    forecast: true,
    fullAnalytics: true,
    prioritySupport: true,
  },
};

export function getEntitlementsForPlan(planId: PlanId): PlanEntitlements {
  return { planId, ...PLAN_META[planId] };
}

export const PRO_TRIAL_DAYS = 14;
