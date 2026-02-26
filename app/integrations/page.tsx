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
    <div className="relative flex min-h-screen overflow-hidden bg-black text-white" style={{ backgroundColor: "#000000" }}>
      {/* M3 Expressive: subtle background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-[10%] top-0 h-[50vmax] w-[50vmax] rounded-full bg-sky-500/15 blur-[100px]" />
        <div className="absolute bottom-0 -left-[10%] h-[40vmax] w-[40vmax] rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

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
            <nav className="flex items-center gap-2 text-xs font-medium text-white/60">
              <span className="cursor-pointer transition hover:text-white/90">
                Home
              </span>
              <span className="text-white/40">/</span>
              <span className="cursor-pointer transition hover:text-white/90">
                Settings
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/90">Data Sources &amp; Integrations</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Data Sources &amp; Integrations
            </h1>
            <p className="text-sm text-white/60">
              Connect your ad platforms to sync KPI data.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <motion.button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="h-4 w-4" />
              View docs
            </motion.button>
          </div>
        </motion.header>

        {/* Integrations grid */}
        <motion.section
          className="flex-1 rounded-[32px] border border-zinc-800/80 bg-zinc-950/90 p-5 shadow-xl shadow-black/50 transition hover:shadow-[0_0_48px_-12px_rgba(99,102,241,0.2)]"
          {...sectionFade}
        >
          <div className="mb-5 flex items-center justify-between gap-2">
            <p className="text-sm text-white/60">
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
                  className="group flex flex-col justify-between rounded-[28px] border border-zinc-800/80 bg-zinc-950/90 p-5 text-sm shadow-lg shadow-black/50 transition hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_0_48px_-16px_rgba(0,0,0,0.9)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-900/80 shadow-lg shadow-black/40 ring-1 ring-white/10">
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
                        <h2 className="text-sm font-semibold text-white">
                          {integration.name}
                        </h2>
                        <p className="text-[11px] text-white/60">
                          Secure OAuth-based connection. Read-only by default.
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/50 shadow-[0_0_12px_-4px_rgba(16,185,129,0.3)]"
                          : "bg-white/10 text-white/70 ring-1 ring-white/20"
                      }`}
                    >
                      {isActive ? "Active" : "Not Connected"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-white/60">
                    <p>
                      {isActive
                        ? "We’re fetching performance metrics every 2 hours."
                        : "Connect to start syncing spend, revenue & conversions."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <motion.button
                      type="button"
                      onClick={() => handleConnect(integration.key, integration.status)}
                      disabled={isLoading}
                      whileHover={!isLoading ? { scale: 1.03, y: -1 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "btn-black"
                          : "border border-white/15 bg-black/80 text-white hover:border-white/60 hover:bg-white/5"
                      } ${isLoading ? "cursor-wait opacity-80" : ""}`}
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
                    </motion.button>
                    <span className="text-[10px] text-white/50">
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

