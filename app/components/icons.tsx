"use client";

/**
 * Official-style brand logo SVGs using brand colors.
 * Use for Landing (LogoTicker), Integrations, and Dashboard.
 */

const defaultSize = 32;

// ─── Google: multicolor G (blue, red, yellow, green) ────────────────────────
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
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Meta: blue infinity (lemniscate) ────────────────────────────────────────
export function MetaLogo({
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
      stroke="#0668E1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 12a5 5 0 106 0 5 5 0 00-6 0zm0 0a5 5 0 016 0 5 5 0 01-6 0z" />
    </svg>
  );
}

// Meta: blue infinity (lemniscate) – single continuous stroke
export function MetaLogoSimple({
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5zm0 0c0 3 2 5 5 5s5-2 5-5 2-5 5-5 5 2 5 5-2 5-5 5-5-2-5-5z" />
    </svg>
  );
}

// ─── Shopify: green shopping bag ────────────────────────────────────────────
export function ShopifyLogo({
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
      stroke="#96BF48"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

// ─── Klaviyo: peach/black wordmark style (K + peach accent) ─────────────────
export function KlaviyoLogo({
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
      <path
        d="M7 4v16h2.5V13h2.2l2.5 7H15l-2.2-6H9.5v6H7V4z"
        fill="currentColor"
      />
      <path
        d="M17 4l-2 5 2 5 2-5-2-5zm0 2.2l1.2 2.8-1.2 2.8-1.2-2.8L17 6.2z"
        fill="#F26522"
      />
    </svg>
  );
}

// Klaviyo text-only (bold K) for dark backgrounds
export function KlaviyoLogoText({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`font-bold tracking-tight text-[#F26522] ${className}`}
      style={{ fontFamily: "system-ui, sans-serif" }}
      aria-hidden
    >
      Klaviyo
    </span>
  );
}

// ─── TikTok: note icon with red/blue shift (brand colors) ────────────────────
export function TikTokLogo({
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
      <path
        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1.05-.08 6.33 6.33 0 00-6.33 6.33 6.33 6.33 0 0010.88 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
        fill="#EE1D52"
      />
      <path d="M19.59 2v3.44h-3.77V2h3.77z" fill="#69C9D0" />
      <path
        d="M12.37 18.74a2.89 2.89 0 01-2.31-4.64 2.93 2.93 0 01.88-.13v-4.17a6.84 6.84 0 001.05.08 6.33 6.33 0 006.33-6.33 6.33 6.33 0 00-10.88-4.43v7a8.16 8.16 0 01-4.77-1.52v3.4a4.85 4.85 0 001 .1 4.83 4.83 0 003.77-4.25V2h3.45v13.67a2.89 2.89 0 005.2 1.74z"
        fill="#000"
      />
    </svg>
  );
}
