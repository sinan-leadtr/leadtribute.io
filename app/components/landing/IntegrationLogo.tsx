"use client";

import {
  CommercePlatformLogo,
  GoogleLogo,
  KlaviyoLogoText,
  MetaLogo,
  ShopifyLogo,
  TikTokLogo,
} from "@/app/components/icons";
import type { CommercePlatformId } from "@/lib/commerce/platforms";

type AdIntegration = "meta" | "google" | "shopify" | "tiktok" | "klaviyo";

type Props = {
  id: AdIntegration | CommercePlatformId;
  label: string;
  className?: string;
};

export function IntegrationLogo({ id, label, className = "" }: Props) {
  const size = 28;
  const iconClass = "h-7 w-7 shrink-0 sm:h-8 sm:w-8";

  let icon;
  switch (id) {
    case "meta":
      icon = <MetaLogo size={size} className={iconClass} />;
      break;
    case "google":
      icon = <GoogleLogo size={size} className={iconClass} />;
      break;
    case "shopify":
      icon = <ShopifyLogo size={size} className={iconClass} />;
      break;
    case "tiktok":
      icon = <TikTokLogo size={size} className={iconClass} />;
      break;
    case "klaviyo":
      icon = <KlaviyoLogoText className="text-lg sm:text-xl" />;
      break;
    default:
      icon = (
        <CommercePlatformLogo
          platform={id as CommercePlatformId}
          size={size}
          className={iconClass}
        />
      );
  }

  return (
    <span
      className={`flex items-center gap-2 text-zinc-500 transition hover:text-white [&_svg]:opacity-80 hover:[&_svg]:opacity-100 ${className}`}
    >
      {icon}
      <span className="text-sm font-semibold sm:text-base">{label}</span>
    </span>
  );
}
