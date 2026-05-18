"use client";

/**
 * Brand logos via Simple Icons (react-icons/si) with official colors.
 * Klaviyo is not in Simple Icons – we use a text fallback with brand color.
 */

import {
  SiBigcommerce,
  SiMagento,
  SiMeta,
  SiPrestashop,
  SiShopify,
  SiShopware,
  SiSquarespace,
  SiTiktok,
  SiWix,
  SiWoocommerce,
} from "react-icons/si";
import type { CommercePlatformId } from "@/lib/commerce/platforms";

const defaultSize = 32;

// Official brand colors (Google Ads: brandcolorcode.com / Google Brand Resource)
const COLORS = {
  meta: "#0668E1",
  shopify: "#96bf48",
  googleBlue: "#4285F4",
  googleRed: "#DB4437",
  googleYellow: "#F4B400",
  googleGreen: "#0F9D58",
  tiktok: "#000000",
  klaviyo: "#FFD79D",
  woocommerce: "#96588A",
  bigcommerce: "#121118",
  magento: "#EE672F",
  wix: "#0C6EFC",
  squarespace: "#000000",
  prestashop: "#DF0067",
  shopware: "#189EFF",
} as const;

type LogoProps = { className?: string; size?: number };

// ─── Meta (Simple Icons) ────────────────────────────────────────────────────
export function MetaLogo({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return <SiMeta className={className} size={size} color={COLORS.meta} />;
}

// Alias for compatibility
export function MetaLogoSimple({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return <SiMeta className={className} size={size} color={COLORS.meta} />;
}

// ─── Google Ads: offizielles 4-Farben-G (Simple Icons nur 1 Farbe) ───────────
// Laut Google Ads Brand: Blue #4285F4, Red #DB4437, Yellow #F4B400, Green #0F9D58
export function GoogleLogo({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill={COLORS.googleBlue} />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={COLORS.googleGreen} />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill={COLORS.googleYellow} />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={COLORS.googleRed} />
    </svg>
  );
}

// ─── Shopify (Simple Icons) ─────────────────────────────────────────────────
export function ShopifyLogo({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return <SiShopify className={className} size={size} color={COLORS.shopify} />;
}

// ─── TikTok (Simple Icons) – Dark mode: use white, optional shadow ──────────
export function TikTokLogo({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        color: "white",
        filter: "drop-shadow(0 0 1px rgba(0,255,255,0.4)) drop-shadow(0 0 1px rgba(255,0,128,0.3))",
      }}
    >
      <SiTiktok size={size} color="currentColor" />
    </span>
  );
}

// ─── Klaviyo: not in Simple Icons – badge with "K" (official peach #F26522) ───
const KLAVIYO_PRIMARY = "#F26522";

export function KlaviyoLogo({
  className = "",
  size = defaultSize,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-bold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: `${KLAVIYO_PRIMARY}20`,
        color: KLAVIYO_PRIMARY,
        fontSize: size * 0.55,
        fontFamily: "system-ui, sans-serif",
        border: `1px solid ${KLAVIYO_PRIMARY}40`,
      }}
      aria-hidden
    >
      K
    </span>
  );
}

export function KlaviyoLogoText({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-bold tracking-tight ${className}`}
      style={{ color: KLAVIYO_PRIMARY, fontFamily: "system-ui, sans-serif" }}
      aria-hidden
    >
      Klaviyo
    </span>
  );
}

// ─── Commerce platforms (Simple Icons) ───────────────────────────────────────

export function WooCommerceLogo({ className = "", size = defaultSize }: LogoProps) {
  return (
    <SiWoocommerce className={className} size={size} color={COLORS.woocommerce} />
  );
}

export function BigCommerceLogo({ className = "", size = defaultSize }: LogoProps) {
  return (
    <SiBigcommerce className={className} size={size} color={COLORS.bigcommerce} />
  );
}

export function MagentoLogo({ className = "", size = defaultSize }: LogoProps) {
  return <SiMagento className={className} size={size} color={COLORS.magento} />;
}

export function WixLogo({ className = "", size = defaultSize }: LogoProps) {
  return <SiWix className={className} size={size} color={COLORS.wix} />;
}

export function SquarespaceLogo({ className = "", size = defaultSize }: LogoProps) {
  return (
    <SiSquarespace className={className} size={size} color={COLORS.squarespace} />
  );
}

export function PrestaShopLogo({ className = "", size = defaultSize }: LogoProps) {
  return (
    <SiPrestashop className={className} size={size} color={COLORS.prestashop} />
  );
}

export function ShopwareLogo({ className = "", size = defaultSize }: LogoProps) {
  return <SiShopware className={className} size={size} color={COLORS.shopware} />;
}

export function CommercePlatformLogo({
  platform,
  className = "",
  size = defaultSize,
}: {
  platform: CommercePlatformId;
  className?: string;
  size?: number;
}) {
  switch (platform) {
    case "shopify":
      return <ShopifyLogo className={className} size={size} />;
    case "woocommerce":
      return <WooCommerceLogo className={className} size={size} />;
    case "bigcommerce":
      return <BigCommerceLogo className={className} size={size} />;
    case "magento":
      return <MagentoLogo className={className} size={size} />;
    case "wix":
      return <WixLogo className={className} size={size} />;
    case "squarespace":
      return <SquarespaceLogo className={className} size={size} />;
    case "prestashop":
      return <PrestaShopLogo className={className} size={size} />;
    case "shopware":
      return <ShopwareLogo className={className} size={size} />;
    default:
      return (
        <span
          className={`inline-flex items-center justify-center rounded-md bg-white/10 font-bold text-white/70 ${className}`}
          style={{ width: size, height: size, fontSize: size * 0.45 }}
          aria-hidden
        >
          ?
        </span>
      );
  }
}

/** Ad / attribution channel logos for preview charts */
export function ChannelLogo({
  channel,
  className = "",
  size = 18,
}: {
  channel: string;
  className?: string;
  size?: number;
}) {
  const key = channel.toLowerCase();
  if (key === "meta") return <MetaLogo className={className} size={size} />;
  if (key === "google") return <GoogleLogo className={className} size={size} />;
  if (key === "tiktok") return <TikTokLogo className={className} size={size} />;
  if (key === "email") return <KlaviyoLogo className={className} size={size} />;
  if (key === "organic")
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.55 }}
        aria-hidden
      >
        ↗
      </span>
    );
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white/10 text-white/50 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden
    >
      •
    </span>
  );
}
