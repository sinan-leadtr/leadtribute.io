import { AdsApiError } from "./errors";
import type { AdDailyMetric, MetaCredentials } from "./types";

const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v21.0";

export function normalizeMetaAdAccountId(accountId: string): string {
  const trimmed = accountId.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/^act_/i, "");
  return `act_${digits}`;
}

export async function fetchMetaDailyInsights(
  credentials: MetaCredentials,
  since: string,
  until: string,
): Promise<AdDailyMetric[]> {
  const accessToken = credentials.accessToken.trim();
  const adAccountId = normalizeMetaAdAccountId(credentials.adAccountId);

  if (!accessToken || !adAccountId) {
    throw new AdsApiError("meta", "Meta access token and ad account ID are required.");
  }

  const params = new URLSearchParams({
    fields: "spend,impressions,clicks",
    level: "account",
    time_increment: "1",
    time_range: JSON.stringify({ since, until }),
    access_token: accessToken,
  });

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${adAccountId}/insights?${params.toString()}`;
  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const body = (await response.json()) as {
    data?: Array<{
      date_start?: string;
      spend?: string;
      impressions?: string;
      clicks?: string;
    }>;
    error?: { message?: string; error_user_msg?: string };
  };

  if (!response.ok || body.error) {
    const detail = body.error?.error_user_msg ?? body.error?.message ?? response.statusText;
    throw new AdsApiError("meta", detail || "Meta Insights API request failed.");
  }

  const rows = body.data ?? [];
  return rows
    .map((row) => ({
      date: row.date_start?.slice(0, 10) ?? "",
      spend: Math.round(parseFloat(row.spend ?? "0") || 0),
      impressions: Math.round(parseFloat(row.impressions ?? "0") || 0),
      clicks: Math.round(parseFloat(row.clicks ?? "0") || 0),
    }))
    .filter((row) => row.date.length > 0);
}
