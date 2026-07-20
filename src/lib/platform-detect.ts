/**
 * كشف منصة الجهاز من User-Agent — مطابق لمنطق Flutter لكن مُبسّط.
 * يعمل على الخادم (server-side) عبر headers.
 */

export type Platform = "huawei" | "ios" | "android" | "macos" | "desktop";

// كلمات هواوي المفتاحية (من download_redirect_controller.dart)
const HUAWEI_KEYWORDS = [
  "huawei",
  "huaweibrowser",
  "hms",
  "hmscore",
  "build/huawei",
  "build/honor",
  " hw-",
  "harmony",
  "honor",
  "hisilicon",
  "petal",
];

const APPLE_KEYWORDS = ["iphone", "ipad", "mac os", "macintosh"];

export function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase();

  // هواوي أولًا (لأن أجهزة هواوي قد تحتوي "android" في UA أيضًا)
  if (HUAWEI_KEYWORDS.some((kw) => ua.includes(kw))) return "huawei";

  // أبل
  if (ua.includes("iphone") || ua.includes("ipad")) return "ios";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macos";

  // أندرويد
  if (ua.includes("android")) return "android";

  // افتراضي: سطح مكتب
  return "desktop";
}

/**
 * يختار رابط المتجر المناسب حسب المنصة.
 * أولوية لكل منصة مع fallback للمتاجر الأخرى.
 */
export function getStoreUrl(
  platform: Platform,
  urls: {
    urlAppStore?: string;
    urlPlayStore?: string;
    urlAppGallery?: string;
    urlMacAppStore?: string;
  },
): string | null {
  const { urlAppStore, urlPlayStore, urlAppGallery, urlMacAppStore } = urls;

  switch (platform) {
    case "huawei":
      return urlAppGallery || urlPlayStore || urlAppStore || null;
    case "ios":
      return urlAppStore || urlPlayStore || null;
    case "android":
      return urlPlayStore || urlAppGallery || urlAppStore || null;
    case "macos":
      return urlMacAppStore || urlAppStore || null;
    default:
      return urlPlayStore || urlAppStore || urlAppGallery || urlMacAppStore || null;
  }
}

/**
 * يُطبّع نص التطبيق لمطابقة الـ slug (مثل Flutter _normalize).
 * "The Holy Quran" → "the-holy-quran"
 */
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
