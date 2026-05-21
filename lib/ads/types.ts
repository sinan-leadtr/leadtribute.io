export type AdDailyMetric = {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
};

export type MetaCredentials = {
  accessToken: string;
  adAccountId: string;
};

export type GoogleCredentials = {
  refreshOrAccessToken: string;
  customerId: string;
};
