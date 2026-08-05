"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Smartphone, Apple, ExternalLink } from "lucide-react";
import {
  detectPlatform,
  getStoreUrl,
  normalizeSlug,
} from "@/lib/platform-detect";
import type { AppInfo } from "@/lib/types";
import { fetchApps } from "@/lib/api-cache";

/** مطابقة الـ slug مع تطبيق (مطابقة لمنطق Flutter). */
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

export default function DownloadRedirectClient({ slug }: { slug: string }) {
  const [status, setStatus] = useState<"loading" | "notfound">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const userAgent =
          typeof navigator !== "undefined" ? navigator.userAgent : "";
        const platform = detectPlatform(userAgent);

        // fetchApps يقرأ من "/api/apps" (الـ self-proxy الذي يعمل في المتصفح)
        const data = await fetchApps<{ apps?: AppInfo[] } | AppInfo[]>();
        const allApps: AppInfo[] = (data as { apps?: AppInfo[] }).apps || (data as AppInfo[]);
        const apps = allApps.filter(
          (a) => a.companyName === "Alheekmah Library",
        );

        const app = matchApp(slug, apps);
        if (!app) {
          if (!cancelled) setStatus("notfound");
          return;
        }

        const storeUrl = getStoreUrl(platform, {
          urlAppStore: app.urlAppStore,
          urlPlayStore: app.urlPlayStore,
          urlAppGallery: app.urlAppGallery,
          urlMacAppStore: app.urlMacAppStore,
        });

        if (storeUrl && !cancelled) {
          // تحويل فوري في المتصفح
          window.location.href = storeUrl;
          return;
        }
        if (!cancelled) setStatus("notfound");
      } catch {
        if (!cancelled) setStatus("notfound");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center">
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-emerald/20 border-t-emerald" />
        <p className="text-ink-soft">جارٍ تحويلك إلى المتجر المناسب…</p>
      </div>
    );
  }

  // notfound
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center">
      <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-emerald/10 text-emerald">
        <Download className="h-10 w-10" strokeWidth={1.4} />
      </div>

      <h1 className="mb-3 font-display text-2xl font-bold text-ink">
        التطبيق غير متاح
      </h1>

      <p className="mb-8 max-w-md text-ink-soft">
        لم نتمكن من العثور على التطبيق المطلوب أو المتجر المناسب لجهازك.
        يمكنك تصفّح كل تطبيقاتنا واختيار المتجر يدويًا.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/ar/apps"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 font-bold text-paper-fixed shadow-emerald transition-transform hover:-translate-y-0.5"
        >
          <Smartphone className="h-4 w-4" />
          تصفّح التطبيقات
        </Link>

        <Link
          href="/ar"
          className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-6 py-3 font-bold text-ink-2 transition-colors hover:border-emerald hover:text-emerald"
        >
          <Apple className="h-4 w-4" />
          الصفحة الرئيسية
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </Link>
      </div>
    </div>
  );
}
