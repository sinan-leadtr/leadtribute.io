"use client";

import { useRouter } from "next/navigation";
import { GoogleLogo, MetaLogo, TikTokLogo } from "./icons";

export type Platform = "meta" | "google" | "tiktok";
export type Status = "active" | "paused" | "learning";

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: Status;
  spend: number;
  roas: number;
  revenue: number;
  created_at: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
}

function PlatformIcon({ platform }: { platform: Platform }) {
  const label = platform === "meta" ? "Meta" : platform === "google" ? "Google" : platform === "tiktok" ? "TikTok" : platform;
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded overflow-hidden bg-zinc-900/80"
      title={label}
    >
      {platform === "meta" && <MetaLogo size={20} />}
      {platform === "google" && <GoogleLogo size={20} />}
      {platform === "tiktok" && <TikTokLogo size={20} />}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50" },
    paused: { label: "Paused", className: "bg-white/10 text-white/60 ring-1 ring-white/20" },
    learning: { label: "Learning Phase", className: "bg-red-500/20 text-red-400 ring-1 ring-red-500/50" },
  };
  // Fallback
  const defaultConfig = { label: status, className: "bg-gray-500/20 text-gray-400 ring-1 ring-gray-500/50" };
  const { label, className } = config[status] || defaultConfig;

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${className}`}>
      {label}
    </span>
  );
}

function RoasCell({ roas }: { roas: number }) {
  if (roas === 0) return <span className="text-white/40">—</span>;
  const isLow = roas < 2;
  const isHigh = roas >= 4;
  const className = isLow
    ? "text-red-400"
    : isHigh
      ? "text-emerald-400"
      : "text-sky-400";
  return <span className={`font-medium tabular-nums ${className}`}>{roas.toFixed(1)}x</span>;
}

export function CampaignTable({ campaigns = [] }: CampaignTableProps) {
  const router = useRouter();

  return (
    <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-white">Active Campaigns</h2>
        <span className="text-[10px] text-white/50">Last 7 days</span>
      </div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-medium uppercase tracking-wider text-white/50">
              <th className="pb-3 pr-4 pt-0">Campaign</th>
              <th className="pb-3 pr-4 pt-0">Status</th>
              <th className="pb-3 pr-4 pt-0 text-right">Spend</th>
              <th className="pb-3 pr-4 pt-0 text-right">ROAS</th>
              <th className="pb-3 pr-4 pt-0 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-white/90">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/50 text-xs">
                  No campaigns found.
                </td>
              </tr>
            ) : (
              campaigns.map((row) => (
                <tr
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/campaigns/${row.id}`)}
                  onKeyDown={(e) => e.key === "Enter" && router.push(`/campaigns/${row.id}`)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-zinc-900 last:border-0"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={row.platform} />
                      <span className="font-medium text-white truncate max-w-[180px]">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-white/80">
                    {row.spend > 0 ? `${row.spend.toLocaleString("de-DE")} €` : "—"}
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <RoasCell roas={row.roas} />
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-white/80">
                    {row.revenue > 0 ? `${row.revenue.toLocaleString("de-DE")} €` : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
