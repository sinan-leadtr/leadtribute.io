"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { Sidebar } from "@/app/components/sidebar";
import { MetaLogo, GoogleLogo, ShopifyLogo, TikTokLogo, KlaviyoLogo } from "@/app/components/icons";
import {
  saveApiKeys,
  syncData,
  type ApiKeyRow,
  type ApiKeyService,
} from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { appBreadcrumb, appCard, appPageBg, appTextMuted } from "@/lib/ui/app-surfaces";

const fieldLabel = "mb-1.5 block text-xs font-medium text-white/70";
const inputDark =
  "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-500/35";

// Lightweight UI primitives to mirror Card / Input / Button semantics
type BasicProps = { className?: string; children: React.ReactNode };

function Card({ className = "", children }: BasicProps) {
  return (
    <div className={`${appCard} p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ className = "", children }: BasicProps) {
  return (
    <div className={`flex flex-col space-y-1 pb-4 ${className}`}>{children}</div>
  );
}

function CardTitle({ className = "", children }: BasicProps) {
  return (
    <h2 className={`text-base font-medium text-white ${className}`}>{children}</h2>
  );
}

function CardDescription({ className = "", children }: BasicProps) {
  return (
    <p className={`text-xs text-white/55 ${className}`}>{children}</p>
  );
}

function CardContent({ className = "", children }: BasicProps) {
  return <div className={`pt-1 ${className}`}>{children}</div>;
}

function Label({
  className = "",
  children,
  ...props
}: any) {
  return (
    <label
      className={`text-xs font-medium text-white/70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

function Input({ className = "", ...props }: any) {
  return (
    <input
      className={`${inputDark} ${className}`}
      {...props}
    />
  );
}

function Button({
  className = "",
  children,
  ...props
}: any) {
  return (
    <button
      className={`btn-black inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold ${className}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}

function keyMap(rows: ApiKeyRow[]): Partial<Record<ApiKeyService, ApiKeyRow | null>> {
  const map: Partial<Record<ApiKeyService, ApiKeyRow | null>> = {
    meta: null,
    google: null,
    shopify: null,
    woocommerce: null,
    bigcommerce: null,
    magento: null,
    wix: null,
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
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/45">
      <Check className="h-3.5 w-3.5" />
      Connected
    </span>
  );
}

type CardProps = {
  title?: string;
  icon: React.ReactNode;
  connected: boolean;
  saving: boolean;
  onSave: () => void;
  children: React.ReactNode;
};

function ProviderCard({ title, icon, connected, saving, onSave, children }: CardProps) {
  return (
    <div className={`${appCard} p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-white/15 bg-black/50 px-3 text-2xl text-white">
            {icon}
          </div>
          {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
        </div>
        {connected && <ConnectedBadge />}
      </div>
      <div className="mt-6 space-y-4">{children}</div>
      <div className="mt-6">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="btn-black inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save Connection
          </span>
        </button>
      </div>
    </div>
  );
}

type Props = { initialKeys: ApiKeyRow[] };

const SYNC_ON_SAVE: ApiKeyService[] = ["shopify", "meta", "google"];

export function IntegrationsForm({ initialKeys }: Props) {
  const router = useRouter();
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
      if (SYNC_ON_SAVE.includes(service)) {
        const syncResult = await syncData();
        if (syncResult.ok) {
          toast.success("Dashboard analytics updated.");
          router.refresh();
        } else {
          const msg = syncResult.error;
          const short =
            msg.length > 220 || msg.includes("<!DOCTYPE")
              ? "Sync failed. Check Google/Meta credentials, API access, and Vercel env vars."
              : msg;
          toast.error(short);
        }
      }
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

  return (
    <div className={`flex ${appPageBg}`}>
      <Sidebar />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <nav className={`flex items-center gap-2 ${appBreadcrumb}`}>
            <Link href="/dashboard" className="transition hover:text-zinc-900">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-700">Integrations</span>
          </nav>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Integrations
          </h1>
          <p className={`mt-1 text-sm ${appTextMuted}`}>
            Connect ad platforms and commerce stores (Shopify, WooCommerce, and more).
            Keys are stored securely per account.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. SHOPIFY (muss hier sein!) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShopifyLogo size={24} /> Shopify
              </CardTitle>
              <CardDescription>Connect your store revenue data.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shopUrl">Shop URL</Label>
                <Input
                  id="shopUrl"
                  placeholder="my-shop.myshopify.com"
                  value={shopifyUrl}
                  onChange={(e: any) => setShopifyUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shopToken">Admin API Token</Label>
                <Input
                  id="shopToken"
                  type="password"
                  placeholder="shpat_..."
                  value={shopifyToken}
                  onChange={(e: any) => setShopifyToken(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                type="button"
                onClick={() =>
                  handleSave("shopify", { shop_url: shopifyUrl, api_key: shopifyToken })
                }
                disabled={saving === "shopify"}
              >
                {saving === "shopify" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Connect Shopify"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 2. META ADS – Sync ad spend & ROAS */}
          <ProviderCard
            title="Meta Ads"
            icon={<MetaLogo size={28} />}
            connected={!!(keys.meta?.api_key || keys.meta?.account_id)}
            saving={saving === "meta"}
            onSave={() => handleSave("meta", { api_key: metaToken, account_id: metaAccountId })}
          >
            <p className="text-xs text-white/50">
              Long-lived user token with <code className="rounded bg-white/10 px-1 py-0.5">ads_read</code>.
              Sync pulls daily spend from the Marketing API.
            </p>
            <div>
              <label className={fieldLabel}>Access Token</label>
              <input
                type="password"
                placeholder="EAAxxxx…"
                value={metaToken}
                onChange={(e) => setMetaToken(e.target.value)}
                className={inputDark}
              />
            </div>
            <div>
              <label className={fieldLabel}>Ad Account ID</label>
              <input
                type="text"
                placeholder="act_123456789"
                value={metaAccountId}
                onChange={(e) => setMetaAccountId(e.target.value)}
                className={inputDark}
              />
            </div>
          </ProviderCard>

          {/* 3. GOOGLE ADS – real spend via Google Ads API */}
          <ProviderCard
            title="Google Ads"
            icon={<GoogleLogo size={28} />}
            connected={!!(keys.google?.api_key || keys.google?.account_id)}
            saving={saving === "google"}
            onSave={() => handleSave("google", { api_key: googleToken, account_id: googleCustomerId })}
          >
            <p className="text-xs text-white/50">
              Requires server env{" "}
              <code className="rounded bg-white/10 px-1 py-0.5">GOOGLE_ADS_DEVELOPER_TOKEN</code> plus
              OAuth client credentials. Paste a refresh token from Google OAuth Playground.
            </p>
            <div>
              <label className={fieldLabel}>OAuth refresh token</label>
              <input
                type="password"
                placeholder="1//0gxxxx…"
                value={googleToken}
                onChange={(e) => setGoogleToken(e.target.value)}
                className={inputDark}
              />
            </div>
            <div>
              <label className={fieldLabel}>Customer ID</label>
              <input
                type="text"
                placeholder="4663691956"
                value={googleCustomerId}
                onChange={(e) => setGoogleCustomerId(e.target.value)}
                className={inputDark}
              />
              <p className="mt-1.5 text-[11px] text-white/45">
                Digits only (no dashes). From Google Ads top-right, e.g. 466-369-1956 →{" "}
                <code className="text-white/60">4663691956</code>.
              </p>
            </div>
            <p className="text-[11px] text-white/45">
              Manager account (MCC)? Set{" "}
              <code className="rounded bg-white/10 px-1">GOOGLE_ADS_LOGIN_CUSTOMER_ID</code> in
              Vercel to your MCC ID.
            </p>
          </ProviderCard>

          <ProviderCard
            title="TikTok Ads"
            icon={<TikTokLogo size={28} />}
            connected={!!keys.tiktok?.api_key}
            saving={saving === "tiktok"}
            onSave={() => handleSave("tiktok", { api_key: tiktokToken })}
          >
            <div>
              <label className={fieldLabel}>Access Token</label>
              <input
                type="password"
                placeholder="Placeholder – coming soon"
                value={tiktokToken}
                onChange={(e) => setTiktokToken(e.target.value)}
                className={inputDark}
              />
            </div>
          </ProviderCard>

          <ProviderCard
            title="Klaviyo"
            icon={<KlaviyoLogo size={28} />}
            connected={!!keys.klaviyo?.api_key}
            saving={saving === "klaviyo"}
            onSave={() => handleSave("klaviyo", { api_key: klaviyoToken })}
          >
            <div>
              <label className={fieldLabel}>Private API Key</label>
              <input
                type="password"
                placeholder="Placeholder – coming soon"
                value={klaviyoToken}
                onChange={(e) => setKlaviyoToken(e.target.value)}
                className={inputDark}
              />
            </div>
          </ProviderCard>
        </div>
      </main>
    </div>
  );
}
