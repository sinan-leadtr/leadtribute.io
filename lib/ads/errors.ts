export class AdsApiError extends Error {
  readonly provider: "meta" | "google";

  constructor(provider: "meta" | "google", message: string) {
    super(message);
    this.name = "AdsApiError";
    this.provider = provider;
  }
}

export function adsErrorMessage(error: unknown, provider: "meta" | "google"): string {
  if (error instanceof AdsApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return `${provider === "meta" ? "Meta" : "Google"} Ads request failed.`;
}
