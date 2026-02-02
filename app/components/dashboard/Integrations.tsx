"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { connectIntegration, disconnectIntegration, type Integration } from "@/app/dashboard/actions";

const PLATFORMS = [
  { id: "google" as const, label: "Google Ads" },
  { id: "meta" as const, label: "Meta Ads" },
] as const;

interface IntegrationsProps {
  integrations: Integration[];
}

function isConnected(integrations: Integration[], platform: string): boolean {
  return integrations.some((i) => i.platform === platform && i.status === "active");
}

export function Integrations({ integrations }: IntegrationsProps) {
  const router = useRouter();
  const [connecting, setConnecting] = useState<"google" | "meta" | null>(null);
  const [disconnecting, setDisconnecting] = useState<"google" | "meta" | null>(null);

  async function handleConnect(platform: "google" | "meta") {
    setConnecting(platform);
    const result = await connectIntegration(platform);
    setConnecting(null);
    if (result.ok) {
      toast.success(`${PLATFORMS.find((p) => p.id === platform)?.label} connected.`);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  async function handleDisconnect(platform: "google" | "meta") {
    setDisconnecting(platform);
    const result = await disconnectIntegration(platform);
    setDisconnecting(null);
    if (result.ok) {
      toast.success(`${PLATFORMS.find((p) => p.id === platform)?.label} disconnected.`);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-sm font-semibold text-white">Integrations</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLATFORMS.map(({ id, label }) => {
          const connected = isConnected(integrations, id);
          const loading = connecting === id || disconnecting === id;
          return (
            <div
              key={id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:border-orange-500/20 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.12)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-white">{label}</span>
                {connected ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/50">
                    Connected
                  </span>
                ) : null}
              </div>
              <div className="mt-auto">
                {connected ? (
                  <button
                    type="button"
                    onClick={() => handleDisconnect(id)}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/90 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : null}
                    Disconnect
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConnect(id)}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/35 disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : null}
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
