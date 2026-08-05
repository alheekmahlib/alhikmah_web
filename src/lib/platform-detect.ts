/**
 * كشف منصة الجهاز من User-Agent — مطابق لمنطق Flutter لكن مُبسّط.
 * يعمل على الخادم (server-side) عبر headers.
 */

import type { LocalizedField } from "./types";

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

/**
 * يستخرج النص المناسب للّغة المطلوبة من حقل متعدد اللغات [{lang, name|value}].
 * أولوية: اللغة المطلوبة → العربية → أول لغة متاحة.
 *
 * @param field    مصفوفة الحقول المحلية (appName أو body أو aboutApp).
 * @param locale   اللغة المطلوبة (ar, en, tr, ...).
 * @param key      "name" لـ appName أو "value" لـ body/aboutApp.
 */
export function getLocalizedField(
  field: LocalizedField[] | undefined,
  locale: string,
  key: "name" | "value" = "value",
): string {
  if (!field || !Array.isArray(field) || field.length === 0) return "";
  // 1) اللغة المطلوبة
  const match = field.find((f) => f.lang === locale);
  if (match && (match[key] ?? match.value ?? match.name)) {
    return (match[key] ?? match.value ?? match.name) as string;
  }
  // 2) العربية كـ fallback
  const ar = field.find((f) => f.lang === "ar");
  if (ar && (ar[key] ?? ar.value ?? ar.name)) {
    return (ar[key] ?? ar.value ?? ar.name) as string;
  }
  // 3) أول لغة متاحة
  const first = field[0];
  return (first[key] ?? first.value ?? first.name ?? "") as string;
}
