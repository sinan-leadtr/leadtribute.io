 "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/sidebar";
import { Loader2, BookOpen } from "lucide-react";
import { GoogleLogo, MetaLogo, TikTokLogo } from "../components/icons";

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const cardStagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

type IntegrationKey =
  | "google_ads"
  | "meta_ads"
  | "tiktok_ads"
  | "reddit_ads"
  | "linkedin_ads";

type IntegrationStatus = "not_connected" | "active";

type Integration = {
  key: IntegrationKey;
  name: string;
  status: IntegrationStatus;
  color: string;
};

const initialIntegrations: Integration[] = [
  { key: "google_ads", name: "Google Ads", status: "not_connected", color: "bg-amber-400" },
  { key: "meta_ads", name: "Meta Ads", status: "not_connected", color: "bg-blue-500" },
  { key: "tiktok_ads", name: "TikTok Ads", status: "not_connected", color: "bg-neutral-200" },
  { key: "reddit_ads", name: "Reddit Ads", status: "not_connected", color: "bg-zinc-700" },
  { key: "linkedin_ads", name: "LinkedIn Ads", status: "not_connected", color: "bg-sky-500" },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [loadingKey, setLoadingKey] = useState<IntegrationKey | null>(null);

  const handleConnect = (key: IntegrationKey, currentStatus: IntegrationStatus) => {
    if (loadingKey) return;

    if (currentStatus === "active") {
      // später: Einstellungen öffnen – aktuell nur Mock
      return;
    }

    setLoadingKey(key);

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.key === key
            ? { ...integration, status: "active" }
            : integration
        )
      );
      setLoadingKey(null);
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-white text-black">
      <Sidebar />

      <main className="relative z-10 flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="mb-6 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="space-y-1">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="cursor-pointer transition hover:text-slate-900">
                Home
              </span>
              <span className="text-slate-400">/</span>
              <span className="cursor-pointer transition hover:text-slate-900">
                Settings
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900">Data Sources &amp; Integrations</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Data Sources &amp; Integrations
            </h1>
            <p className="text-sm text-slate-600">
              Connect your ad platforms to sync KPI data.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              className="btn-black inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            >
              <BookOpen className="h-4 w-4" />
              View docs
            </button>
          </div>
        </motion.header>

        {/* Integrations grid */}
        <motion.section
          className="flex-1 rounded-[32px] border border-black/5 bg-white p-5 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.3)] transition hover:shadow-[0_18px_60px_-30px_rgba(15,23,42,0.4)]"
          {...sectionFade}
        >
          <div className="mb-5 flex items-center justify-between gap-2">
            <p className="text-sm text-slate-600">
              Choose which ad platforms you want to sync into Leadtribute. You
              can connect multiple sources in parallel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {integrations.map((integration, index) => {
              const isActive = integration.status === "active";
              const isLoading = loadingKey === integration.key;

              return (
                <motion.article
                  key={integration.key}
                  {...cardStagger}
                  transition={{
                    ...cardStagger.transition,
                    delay: index * 0.06,
                  }}
                  className="group flex flex-col justify-between rounded-[24px] border border-black/5 bg-white p-5 text-sm shadow-[0_10px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-md shadow-black/25">
                        {integration.key === "google_ads" && <GoogleLogo size={24} />}
                        {integration.key === "meta_ads" && <MetaLogo size={24} />}
                        {integration.key === "tiktok_ads" && <TikTokLogo size={24} />}
                        {(integration.key === "reddit_ads" || integration.key === "linkedin_ads") && (
                          <span className="text-xs font-semibold text-white">
                            {integration.name.split(" ").map((p) => p[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          {integration.name}
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Secure OAuth-based connection. Read-only by default.
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                      }`}
                    >
                      {isActive ? "Active" : "Not Connected"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-500">
                    <p>
                      {isActive
                        ? "We’re fetching performance metrics every 2 hours."
                        : "Connect to start syncing spend, revenue & conversions."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleConnect(integration.key, integration.status)}
                      disabled={isLoading}
                      className={`btn-black inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                        isLoading ? "cursor-wait opacity-80" : ""
                      }`}
                    >
                      {isLoading && (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      )}
                      <span>
                        {isLoading
                          ? "Connecting..."
                          : isActive
                          ? "Manage"
                          : "Connect"}
                      </span>
                    </button>
                    <span className="text-[10px] text-slate-400">
                      Mock connection – no real API calls.
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

