"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { Sidebar } from "@/app/components/sidebar";
import { MetaLogo, GoogleLogo, TikTokLogo, KlaviyoLogoText } from "@/app/components/icons";
import {
  saveApiKeys,
  type ApiKeyRow,
  type ApiKeyService,
} from "@/app/dashboard/actions";

function keyMap(rows: ApiKeyRow[]): Record<ApiKeyService, ApiKeyRow | null> {
  const map: Record<ApiKeyService, ApiKeyRow | null> = {
    meta: null,
    google: null,
    shopify: null,
    tiktok: null,
    klaviyo: null,
  };
  for (const row of rows) {
    if (row.service in map) map[row.service as ApiKeyService] = row;
  }
  return map;
}

function ConnectedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/40">
      <Check className="h-3.5 w-3.5" />
      Connected
    </span>
  );
}

type CardProps = {
  title: string;
  icon: React.ReactNode;
  connected: boolean;
  saving: boolean;
  onSave: () => void;
  children: React.ReactNode;
};

function ProviderCard({ title, icon, connected, saving, onSave, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl">
            {icon}
          </div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        {connected && <ConnectedBadge />}
      </div>
      <div className="mt-6 space-y-4">{children}</div>
      <div className="mt-6">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Connection"}
        </button>
      </div>
    </div>
  );
}

type Props = { initialKeys: ApiKeyRow[] };

export function IntegrationsForm({ initialKeys }: Props) {
  const [keys, setKeys] = useState(keyMap(initialKeys));
  const [saving, setSaving] = useState<ApiKeyService | null>(null);
  const [metaToken, setMetaToken] = useState(keys.meta?.api_key ?? "");
  const [metaAccountId, setMetaAccountId] = useState(keys.meta?.account_id ?? "");
  const [googleToken, setGoogleToken] = useState(keys.google?.api_key ?? "");
  const [googleCustomerId, setGoogleCustomerId] = useState(keys.google?.account_id ?? "");
  const [shopifyUrl, setShopifyUrl] = useState(keys.shopify?.shop_url ?? "");
  const [shopifyToken, setShopifyToken] = useState(keys.shopify?.api_key ?? "");
  const [tiktokToken, setTiktokToken] = useState(keys.tiktok?.api_key ?? "");
  const [klaviyoToken, setKlaviyoToken] = useState(keys.klaviyo?.api_key ?? "");

  const handleSave = async (service: ApiKeyService, payload: { api_key?: string; account_id?: string; shop_url?: string }) => {
    setSaving(service);
    const result = await saveApiKeys(service, payload);
    setSaving(null);
    if (result.ok) {
      toast.success(`${service} connection saved`);
      setKeys((prev) => ({
        ...prev,
        [service]: {
          id: prev[service]?.id ?? "",
          user_id: prev[service]?.user_id ?? "",
          service,
          api_key: payload.api_key ?? null,
          account_id: payload.account_id ?? null,
          shop_url: payload.shop_url ?? null,
          created_at: new Date().toISOString(),
        },
      }));
    } else {
      toast.error(result.error);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30";

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-white/60">
            <Link href="/dashboard" className="transition hover:text-white/90">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">Integrations</span>
          </nav>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Integrations
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Connect your ad and e‑commerce accounts. Keys are stored securely per account.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Shopify Store – erstes Element */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/30">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-green-500" />
                <h2 className="text-base font-medium text-white">Shopify Store</h2>
              </div>
              {(keys.shopify?.shop_url || keys.shopify?.api_key) && <ConnectedBadge />}
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="shopUrl" className="text-xs font-medium text-white/60">
                  Shop URL
                </label>
                <input
                  id="shopUrl"
                  type="text"
                  placeholder="my-shop.myshopify.com"
                  value={shopifyUrl}
                  onChange={(e) => setShopifyUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="shopToken" className="text-xs font-medium text-white/60">
                  Admin API Token
                </label>
                <input
                  id="shopToken"
                  type="password"
                  placeholder="shpat_..."
                  value={shopifyToken}
                  onChange={(e) => setShopifyToken(e.target.value)}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSave("shopify", { shop_url: shopifyUrl, api_key: shopifyToken })}
                disabled={saving === "shopify"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 disabled:opacity-60"
              >
                {saving === "shopify" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect Shopify"}
              </button>
            </div>
          </div>

          <ProviderCard
            title="Meta Ads"
            icon={<MetaLogo size={28} />}
            connected={!!(keys.meta?.api_key || keys.meta?.account_id)}
            saving={saving === "meta"}
            onSave={() => handleSave("meta", { api_key: metaToken, account_id: metaAccountId })}
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Access Token</label>
              <input
                type="password"
                placeholder="EAAxxxx…"
                value={metaToken}
                onChange={(e) => setMetaToken(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Ad Account ID</label>
              <input
                type="text"
                placeholder="act_123456789"
                value={metaAccountId}
                onChange={(e) => setMetaAccountId(e.target.value)}
                className={inputClass}
              />
            </div>
          </ProviderCard>

          <ProviderCard
            title="Google Ads"
            icon={<GoogleLogo size={28} />}
            connected={!!(keys.google?.api_key || keys.google?.account_id)}
            saving={saving === "google"}
            onSave={() => handleSave("google", { api_key: googleToken, account_id: googleCustomerId })}
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Developer Token</label>
              <input
                type="password"
                placeholder="xxxx…"
                value={googleToken}
                onChange={(e) => setGoogleToken(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Customer ID</label>
              <input
                type="text"
                placeholder="123-456-7890"
                value={googleCustomerId}
                onChange={(e) => setGoogleCustomerId(e.target.value)}
                className={inputClass}
              />
            </div>
          </ProviderCard>

          <ProviderCard
            title="TikTok Ads"
            icon={<TikTokLogo size={28} />}
            connected={!!keys.tiktok?.api_key}
            saving={saving === "tiktok"}
            onSave={() => handleSave("tiktok", { api_key: tiktokToken })}
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Access Token</label>
              <input
                type="password"
                placeholder="Placeholder – coming soon"
                value={tiktokToken}
                onChange={(e) => setTiktokToken(e.target.value)}
                className={inputClass}
              />
            </div>
          </ProviderCard>

          <ProviderCard
            title="Klaviyo"
            icon={<KlaviyoLogoText className="text-2xl" />}
            connected={!!keys.klaviyo?.api_key}
            saving={saving === "klaviyo"}
            onSave={() => handleSave("klaviyo", { api_key: klaviyoToken })}
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Private API Key</label>
              <input
                type="password"
                placeholder="Placeholder – coming soon"
                value={klaviyoToken}
                onChange={(e) => setKlaviyoToken(e.target.value)}
                className={inputClass}
              />
            </div>
          </ProviderCard>
        </div>
      </main>
    </div>
  );
}
