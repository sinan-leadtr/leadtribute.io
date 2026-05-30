import { AdsApiError } from "./errors";
import type { AdDailyMetric, GoogleCredentials } from "./types";

const API_VERSIONS = [
  process.env.GOOGLE_ADS_API_VERSION?.trim(),
  "v18",
  "v20",
].filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i);

export function normalizeGoogleCustomerId(customerId: string): string {
  return customerId.replace(/\D/g, "");
}

function parseGoogleAdsErrorBody(rawText: string, status: number): string {
  if (rawText.includes("<!DOCTYPE") || rawText.includes("<html")) {
    if (status === 404) {
      return "Google Ads API endpoint not found. Check API version, customer ID, and that Google Ads API is enabled in your Google Cloud project.";
    }
    return `Google Ads API returned an unexpected HTML error (HTTP ${status}).`;
  }

  try {
    const json = JSON.parse(rawText) as {
      error?: {
        message?: string;
        status?: string;
        details?: Array<{ errors?: Array<{ message?: string }> }>;
      };
    };
    const detailMessages =
      json.error?.details
        ?.flatMap((d) => d.errors?.map((e) => e.message).filter(Boolean) ?? [])
        .join(" ") ?? "";
    return (
      detailMessages ||
      json.error?.message ||
      `Google Ads API request failed (HTTP ${status}).`
    );
  } catch {
    return rawText.slice(0, 280) || `Google Ads API request failed (HTTP ${status}).`;
  }
}

export async function getGoogleAccessToken(refreshOrAccessToken: string): Promise<string> {
  const token = refreshOrAccessToken.trim();
  if (!token) {
    throw new AdsApiError("google", "Google OAuth refresh token is required.");
  }

  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return token;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token,
    }),
    cache: "no-store",
  });

  const body = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (response.ok && body.access_token) {
    return body.access_token;
  }

  if (token.startsWith("ya29.") || token.startsWith("ya39.")) {
    return token;
  }

  const detail = body.error_description ?? body.error ?? "Token refresh failed";
  throw new AdsApiError(
    "google",
    `${detail}. Paste a valid OAuth refresh token, or a short-lived access token (ya29…).`,
  );
}

type SearchRow = {
  segments?: { date?: string };
  metrics?: Record<string, string | number | undefined>;
};

type SearchResponse = {
  results?: SearchRow[];
  nextPageToken?: string;
  error?: { message?: string };
};

function readMetricNumber(
  metrics: Record<string, string | number | undefined> | undefined,
  camel: string,
  snake: string,
): number {
  if (!metrics) return 0;
  const raw = metrics[camel] ?? metrics[snake];
  return Number(raw ?? 0);
}

function rowsToMetrics(rows: SearchRow[]): AdDailyMetric[] {
  const metrics: AdDailyMetric[] = [];
  for (const row of rows) {
    const date = row.segments?.date;
    if (!date) continue;
    const costMicros = readMetricNumber(row.metrics, "costMicros", "cost_micros");
    metrics.push({
      date,
      spend: Math.round(costMicros / 1_000_000),
      impressions: readMetricNumber(row.metrics, "impressions", "impressions"),
      clicks: readMetricNumber(row.metrics, "clicks", "clicks"),
    });
  }
  return metrics;
}

async function googleAdsSearch(
  apiVersion: string,
  customerId: string,
  accessToken: string,
  developerToken: string,
  query: string,
  loginCustomerId?: string,
): Promise<AdDailyMetric[]> {
  const url = `https://googleads.googleapis.com/${apiVersion}/customers/${customerId}/googleAds:search`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
    "Content-Type": "application/json",
  };
  if (loginCustomerId) {
    headers["login-customer-id"] = loginCustomerId;
  }

  const allRows: SearchRow[] = [];
  let pageToken: string | undefined;

  do {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        pageSize: 10_000,
        ...(pageToken ? { pageToken } : {}),
      }),
      cache: "no-store",
    });

    const rawText = await response.text();
    if (!response.ok) {
      throw new AdsApiError("google", parseGoogleAdsErrorBody(rawText, response.status));
    }

    let body: SearchResponse;
    try {
      body = JSON.parse(rawText) as SearchResponse;
    } catch {
      throw new AdsApiError("google", "Google Ads API returned an invalid JSON response.");
    }

    if (body.error?.message) {
      throw new AdsApiError("google", body.error.message);
    }

    allRows.push(...(body.results ?? []));
    pageToken = body.nextPageToken;
  } while (pageToken);

  return rowsToMetrics(allRows);
}

export async function fetchGoogleDailyInsights(
  credentials: GoogleCredentials,
  since: string,
  until: string,
): Promise<AdDailyMetric[]> {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  if (!developerToken) {
    throw new AdsApiError(
      "google",
      "GOOGLE_ADS_DEVELOPER_TOKEN is not set on the server. Add it in Vercel env vars.",
    );
  }

  const customerId = normalizeGoogleCustomerId(credentials.customerId);
  if (!customerId) {
    throw new AdsApiError("google", "Google Ads customer ID is required (10 digits, no dashes).");
  }

  const accessToken = await getGoogleAccessToken(credentials.refreshOrAccessToken);

  const query = `
    SELECT
      segments.date,
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks
    FROM customer
    WHERE segments.date BETWEEN '${since}' AND '${until}'
    ORDER BY segments.date
  `.trim();

  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.trim()
    ? normalizeGoogleCustomerId(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID)
    : undefined;

  let lastError: AdsApiError | null = null;

  for (const apiVersion of API_VERSIONS) {
    try {
      return await googleAdsSearch(
        apiVersion,
        customerId,
        accessToken,
        developerToken,
        query,
        loginCustomerId,
      );
    } catch (error) {
      if (error instanceof AdsApiError) {
        lastError = error;
        const retryable =
          error.message.includes("404") ||
          error.message.includes("not found") ||
          error.message.includes("HTML error");
        if (!retryable) throw error;
        continue;
      }
      throw error;
    }
  }

  throw (
    lastError ??
    new AdsApiError(
      "google",
      "Google Ads API request failed. Enable Google Ads API in Google Cloud and verify customer ID.",
    )
  );
}
