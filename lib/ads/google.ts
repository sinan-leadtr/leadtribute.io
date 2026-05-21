import { AdsApiError } from "./errors";
import type { AdDailyMetric, GoogleCredentials } from "./types";

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION ?? "v19";

export function normalizeGoogleCustomerId(customerId: string): string {
  return customerId.replace(/\D/g, "");
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

type SearchStreamChunk = {
  results?: Array<{
    segments?: { date?: string };
    metrics?: {
      costMicros?: string;
      impressions?: string;
      clicks?: string;
    };
  }>;
  error?: { message?: string; code?: number };
};

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
    throw new AdsApiError("google", "Google Ads customer ID is required.");
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

  const url = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/googleAds:searchStream`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
    "Content-Type": "application/json",
  };

  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.trim();
  if (loginCustomerId) {
    headers["login-customer-id"] = normalizeGoogleCustomerId(loginCustomerId);
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const rawText = await response.text();
  if (!response.ok) {
    let detail = response.statusText;
    try {
      const errJson = JSON.parse(rawText) as { error?: { message?: string } };
      detail = errJson.error?.message ?? detail;
    } catch {
      if (rawText) detail = rawText.slice(0, 280);
    }
    throw new AdsApiError("google", detail || "Google Ads API request failed.");
  }

  const metrics: AdDailyMetric[] = [];

  const parseChunk = (chunk: SearchStreamChunk) => {
    if (chunk.error?.message) {
      throw new AdsApiError("google", chunk.error.message);
    }
    for (const result of chunk.results ?? []) {
      const date = result.segments?.date;
      if (!date) continue;
      const costMicros = Number(result.metrics?.costMicros ?? 0);
      metrics.push({
        date,
        spend: Math.round(costMicros / 1_000_000),
        impressions: Number(result.metrics?.impressions ?? 0),
        clicks: Number(result.metrics?.clicks ?? 0),
      });
    }
  };

  try {
    const parsed = JSON.parse(rawText) as SearchStreamChunk | SearchStreamChunk[];
    if (Array.isArray(parsed)) {
      for (const chunk of parsed) parseChunk(chunk);
    } else {
      parseChunk(parsed);
    }
  } catch (error) {
    if (error instanceof AdsApiError) throw error;
    for (const line of rawText.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === "[" || trimmed === "]") continue;
      const jsonLine = trimmed.replace(/,$/, "");
      try {
        parseChunk(JSON.parse(jsonLine) as SearchStreamChunk);
      } catch {
        // ignore non-JSON stream lines
      }
    }
  }

  return metrics;
}
