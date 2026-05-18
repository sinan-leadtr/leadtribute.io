export const COMMERCE_PLATFORMS = [
  { id: "shopify", label: "Shopify", status: "available" as const },
  { id: "woocommerce", label: "WooCommerce", status: "available" as const },
  { id: "bigcommerce", label: "BigCommerce", status: "coming_soon" as const },
  { id: "magento", label: "Magento", status: "coming_soon" as const },
  { id: "wix", label: "Wix", status: "coming_soon" as const },
  { id: "squarespace", label: "Squarespace", status: "coming_soon" as const },
  { id: "shopware", label: "Shopware", status: "coming_soon" as const },
  { id: "prestashop", label: "PrestaShop", status: "coming_soon" as const },
] as const;

export type CommercePlatformId = (typeof COMMERCE_PLATFORMS)[number]["id"];

export const AD_PLATFORMS = [
  "meta",
  "google",
  "tiktok",
  "email",
  "organic",
  "direct",
] as const;

export type AdChannel = (typeof AD_PLATFORMS)[number];
