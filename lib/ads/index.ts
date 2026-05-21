export { AdsApiError, adsErrorMessage } from "./errors";
export { fetchGoogleDailyInsights, getGoogleAccessToken, normalizeGoogleCustomerId } from "./google";
export { fetchMetaDailyInsights, normalizeMetaAdAccountId } from "./meta";
export type { AdDailyMetric, GoogleCredentials, MetaCredentials } from "./types";

export function metricsByDate(rows: { date: string; spend: number; impressions: number; clicks: number }[]) {
  return rows.reduce<Record<string, { spend: number; impressions: number; clicks: number }>>((acc, row) => {
    acc[row.date] = {
      spend: row.spend,
      impressions: row.impressions,
      clicks: row.clicks,
    };
    return acc;
  }, {});
}
