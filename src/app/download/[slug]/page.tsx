import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { detectPlatform, getStoreUrl, normalizeSlug } from "@/lib/platform-detect";
import type { AppInfo } from "@/lib/types";

// صفحة ديناميكية (لا تُعرض مسبقًا)
export const dynamic = "force-dynamic";

/**
 * يطابق الـ slug مع تطبيق من ourApps.json.
 * مطابق لمنطق Flutter download_redirect_controller.dart.
 */
function matchApp(slug: string, apps: AppInfo[]): AppInfo | undefined {
  const normalizedSlug = slug.toLowerCase().trim();

  return apps.find((app) => {
    // 1. مطابقة appName
    if (app.appName?.trim().toLowerCase() === normalizedSlug) return true;

    // 2. مطابقة appTitle مُطبّع
    const normalizedTitle = normalizeSlug(app.appTitle || "");
    if (normalizedTitle === normalizedSlug || normalizedTitle.includes(normalizedSlug))
      return true;

    // 3. مطابقة id
    if (String(app.id) === normalizedSlug) return true;

    // 4. slug موجود في أي رابط متجر
    const allUrls = [
      app.urlAppStore,
      app.urlPlayStore,
      app.urlAppGallery,
      app.urlMacAppStore,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (allUrls.includes(normalizedSlug)) return true;

    return false;
  });
}

export default async function DownloadRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. اقرأ User-Agent من headers (server-side)
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  const platform = detectPlatform(userAgent);

  // 2. حدّد origin للوصول إلى /api/apps عبر self-proxy.
  //    على Cloudflare Workers (OpenNext) لا يمكن استدعاء الرابط النسبي "/api/apps"
  //    ولا يمكن الوصول المباشر إلى dash.vexaltech.dev من الـ Worker أحيانًا.
  //    لكن الـ self-proxy ("/api/apps" المُعاد توجيهه عبر next.config rewrites) يعمل،
  //    ويكفي بناء absolute URL من host الطلب نفسه.
  const host =
    headerList.get("x-forwarded-host") ||
    headerList.get("host") ||
    "";
  const proto = headerList.get("x-forwarded-proto") || "https";
  const origin = host ? `${proto}://${host}` : "";
  const appsUrl = `${origin}/api/apps`;

  // 3. اجلب بيانات التطبيقات (فلترة Alheekmah Library فقط)
  let apps: AppInfo[] = [];
  try {
    const res = await fetch(appsUrl, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const allApps: AppInfo[] = data.apps || data;
      apps = allApps.filter((a: AppInfo) => a.companyName === "Alheekmah Library");
    }
  } catch (err) {
    // سجّل الخطأ بدل ابتلاعه صامتًا — يُسهّل كشف الانحدارات في سجلات Workers
    console.error("[download] fetch apps failed:", err);
  }

  // 3. طابق الـ slug
  const app = matchApp(slug, apps);

  // 4. إن لم يُوجد التطبيق → not-found
  if (!app) {
    notFound();
  }

  // 5. ابحث عن رابط المتجر المناسب
  const storeUrl = getStoreUrl(platform, {
    urlAppStore: app.urlAppStore,
    urlPlayStore: app.urlPlayStore,
    urlAppGallery: app.urlAppGallery,
    urlMacAppStore: app.urlMacAppStore,
  });

  // 6. إن وُجد رابط → تحويل فوري
  if (storeUrl) {
    redirect(storeUrl);
  }

  // 7. لا يوجد متجر مناسب → not-found (ستعرض واجهة احتياطية)
  notFound();
}
