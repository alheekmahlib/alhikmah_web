import { NextRequest } from "next/server";
import { detectPlatform, getStoreUrl, normalizeSlug } from "@/lib/platform-detect";
import type { AppInfo } from "@/lib/types";

export const dynamic = "force-dynamic";

const APPS_URL = "https://dash.vexaltech.dev/api/apps";

function matchApp(slug: string, apps: AppInfo[]): AppInfo | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  return apps.find((app) => {
    if (app.appName?.trim().toLowerCase() === normalizedSlug) return true;
    const normalizedTitle = normalizeSlug(app.appTitle || "");
    if (normalizedTitle === normalizedSlug || normalizedTitle.includes(normalizedSlug))
      return true;
    if (String(app.id) === normalizedSlug) return true;
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

// GET /download/_debug/[slug] — تشخيص مؤقت يُرجع JSON خام بلا طبقة RSC.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const userAgent = _req.headers.get("user-agent") ?? "";
  const platform = detectPlatform(userAgent);

  const debug: Record<string, unknown> = {
    slug,
    platform,
    ua: userAgent.slice(0, 80),
    appsUrl: APPS_URL,
    timestamp: new Date().toISOString(),
  };

  let apps: AppInfo[] = [];
  try {
    const res = await fetch(APPS_URL, { cache: "no-store" });
    debug.fetchStatus = res.status;
    debug.fetchOk = res.ok;
    if (res.ok) {
      const data = await res.json();
      const allApps: AppInfo[] = data.apps || data;
      debug.allAppsCount = allApps.length;
      debug.appNames = allApps.map((a) => a.appName);
      debug.companyNames = Array.from(
        new Set(allApps.map((a) => a.companyName).filter(Boolean)),
      );
      apps = allApps.filter((a: AppInfo) => a.companyName === "Alheekmah Library");
      debug.filteredCount = apps.length;
    }
  } catch (err) {
    debug.fetchError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  }

  const app = matchApp(slug, apps);
  debug.matched = !!app;
  if (app) {
    debug.matchedAppName = app.appName;
    const storeUrl = getStoreUrl(platform, {
      urlAppStore: app.urlAppStore,
      urlPlayStore: app.urlPlayStore,
      urlAppGallery: app.urlAppGallery,
      urlMacAppStore: app.urlMacAppStore,
    });
    debug.storeUrl = storeUrl;
    debug.hasAppStore = !!app.urlAppStore;
    debug.hasPlayStore = !!app.urlPlayStore;
  } else {
    debug.step = "matchApp returned undefined";
  }

  return Response.json(debug);
}
