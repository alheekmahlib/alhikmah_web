/**
 * مساعدات مشتركة لتطبيقات Alheekmah Library.
 * يستخدمها: قائمة /apps، صفحة التفاصيل /apps/[slug]، ومحوّل /download/[slug].
 */

import type { AppInfo } from "./types";

const MEDIA_BASE = "https://dash.vexaltech.dev";

// بادئة الصور النسبية (الـ API يُرجع /media/...)
export function fixAppMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${MEDIA_BASE}${url}`;
}

// يستخرج مصفوفة التطبيقات من استجابة الـ API (كائن {apps} أو مصفوفة مباشرة)
function toAppList(data: unknown): AppInfo[] {
  if (Array.isArray(data)) return data as AppInfo[];
  const wrapped = (data as { apps?: AppInfo[] })?.apps;
  return Array.isArray(wrapped) ? wrapped : [];
}

/** فلترة تطبيقات Alheekmah Library فقط + إصلاح روابط الصور. */
export function getAlheekmahApps(data: unknown): AppInfo[] {
  return toAppList(data)
    .filter((a) => a.companyName === "Alheekmah Library")
    .map((a) => ({
      ...a,
      appBanner: fixAppMediaUrl(a.appBanner),
      appLogo: fixAppMediaUrl(a.appLogo),
      banners: a.banners?.map(fixAppMediaUrl).filter((u): u is string => !!u),
    }));
}

/**
 * مطابقة الـ slug مع تطبيق.
 * في الـ API الجديد، كل تطبيق له حقل `slug` مباشر، فالمطابقة تصبح بسيطة.
 * نُبقي fallback على id للتوافق مع الرابط القديم.
 */
export function findAppBySlug(
  slug: string,
  apps: AppInfo[],
): AppInfo | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  return apps.find((app) => {
    // 1) مطابقة مباشرة على slug (الحقل الرسمي)
    if (app.slug?.toLowerCase().trim() === normalizedSlug) return true;
    // 2) fallback: id كنص
    if (String(app.id) === normalizedSlug) return true;
    return false;
  });
}

/** مسار صفحة تفاصيل التطبيق (يُسبق اللغة تلقائيًا عبر Link من i18n/navigation). */
export function appDetailPath(app: AppInfo): string {
  return `/apps/${app.slug || app.id}`;
}
