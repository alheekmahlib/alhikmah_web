import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { detectPlatform, getStoreUrl, normalizeSlug } from "@/lib/platform-detect";
import type { AppInfo } from "@/lib/types";

// صفحة ديناميكية (لا تُعرض مسبقًا)
export const dynamic = "force-dynamic";

// مصدر بيانات التطبيقات
// يجب أن يكون رابطًا مطلقًا: تُجرى هذه الـ fetch من Server Component على
// Cloudflare Workers، حيث قواعد rewrites() في next.config.ts لا تنطبق على
// استدعاءات fetch الصادرة من الخادم ولا يوجد host أساسي للروابط النسبية.
const APPS_URL = "https://dash.vexaltech.dev/api/apps";

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

  // ===== تشخيص مؤقت (HTML خام) =====
  const debug: string[] = [`slug=${slug}`, `platform=${platform}`, `appsUrl=${APPS_URL}`];

  // 2. اجلب بيانات التطبيقات (فلترة Alheekmah Library فقط)
  let apps: AppInfo[] = [];
  try {
    const res = await fetch(APPS_URL, { next: { revalidate: 3600 } });
    debug.push(`fetchStatus=${res.status}`);
    debug.push(`fetchOk=${res.ok}`);
    if (res.ok) {
      const data = await res.json();
      const allApps: AppInfo[] = data.apps || data;
      debug.push(`allAppsCount=${allApps.length}`);
      apps = allApps.filter((a: AppInfo) => a.companyName === "Alheekmah Library");
      debug.push(`filteredCount=${apps.length}`);
      if (apps.length > 0) debug.push(`appNames=${apps.map((a) => a.appName).join(",")}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    debug.push(`FETCH_ERROR=${msg}`);
  }

  // 3. طابق الـ slug
  const app = matchApp(slug, apps);
  debug.push(`matched=${!!app}`);

  if (app) {
    const storeUrl = getStoreUrl(platform, {
      urlAppStore: app.urlAppStore,
      urlPlayStore: app.urlPlayStore,
      urlAppGallery: app.urlAppGallery,
      urlMacAppStore: app.urlMacAppStore,
    });
    debug.push(`storeUrl=${storeUrl ?? "null"}`);
    if (storeUrl) redirect(storeUrl);
    debug.push("STEP=getStoreUrl returned null");
  } else {
    debug.push("STEP=matchApp undefined");
  }

  // مؤقتًا: اعرض التشخيص كنص خام بدل notFound()
  return (
    <pre style={{ direction: "ltr", textAlign: "left", padding: 16, fontSize: 13 }}>
      DEBUG /download/{slug}
      {"\n"}
      {"\n"}
      {debug.join("\n")}
    </pre>
  );
}
