"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Loader2, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";
import type { AppInfo } from "@/lib/types";

const APPS_URL = "/api/apps";
const MEDIA_BASE = "https://dash.vexaltech.dev";

// بادئة الصور النسبية (الـ API يُرجع /media/...)
function fixUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${MEDIA_BASE}${url}`;
}

export function AppsPageContent() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<AppInfo | null>(null);

  useEffect(() => {
    fetch(APPS_URL)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: { apps: AppInfo[] }) => {
        // فلترة تطبيقات Alheekmah Library فقط + إصلاح روابط الصور
        const filtered = (data.apps || data as unknown as AppInfo[])
          .filter((a) => a.companyName === "Alheekmah Library")
          .map((a) => ({
            ...a,
            appBanner: fixUrl(a.appBanner),
            appLogo: fixUrl(a.appLogo),
            banner1: fixUrl(a.banner1),
            banner2: fixUrl(a.banner2),
            banner3: fixUrl(a.banner3),
            banner4: fixUrl(a.banner4),
          }));
        setApps(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow={t("apps_page_eyebrow")}
        title={t("apps_page_title")}
        lede={t("apps_page_lede")}
      />

      <section className="container-x py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald" />
            <p className="text-ink-faint">{t("apps_loading")}</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rule bg-paper p-10 text-center text-ink-faint">
            {t("apps_error")}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <Reveal key={app.id} variant="up" delay={Math.min(i * 80, 480)}>
                <button
                  onClick={() => setSelected(app)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-rule bg-paper text-start transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-soft hover:shadow-xl"
                >
                  {/* البانر */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-warm">
                    {app.appBanner ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={app.appBanner}
                        alt={app.appTitle}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-gradient-to-br from-emerald-deep to-emerald">
                        <span className="font-display text-3xl text-emerald-soft-fixed">
                          {app.appTitle?.[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* المحتوى */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2.5">
                      {app.appLogo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={app.appLogo}
                          alt=""
                          className="h-7 w-7 rounded-lg object-contain"
                        />
                      )}
                      <h3 className="font-display text-lg font-bold text-ink">
                        {app.appTitle}
                      </h3>
                    </div>
                    <p className="line-clamp-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
                      {app.body}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-bold text-emerald-deep">
                      {t("apps_view_details")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* نافذة التفاصيل */}
      {selected && (
        <AppDetailsModal app={selected} onClose={() => setSelected(null)} t={t} />
      )}
    </>
  );
}

function AppDetailsModal({
  app,
  onClose,
  t,
}: {
  app: AppInfo;
  onClose: () => void;
  t: (key: string) => string;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink-soft backdrop-blur hover:bg-paper hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {/* البانر */}
        {app.appBanner && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.appBanner}
            alt={app.appTitle}
            className="aspect-[16/9] w-full object-cover"
          />
        )}

        <div className="p-6 lg:p-8">
          <div className="mb-4 flex items-center gap-3">
            {app.appLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={app.appLogo} alt="" className="h-12 w-12 rounded-xl" />
            )}
            <h2 className="font-display text-2xl font-bold text-ink">
              {app.appTitle}
            </h2>
          </div>

          <p className="mb-5 leading-relaxed text-ink-soft">{app.body}</p>

          {app.aboutApp2 && (
            <p className="mb-4 leading-relaxed text-ink-soft">{app.aboutApp2}</p>
          )}

          {/* معرض الصور */}
          {[app.banner1, app.banner2, app.banner3, app.banner4].filter(Boolean).length > 0 && (
            <div className="mb-6 grid grid-cols-2 gap-3">
              {[app.banner1, app.banner2, app.banner3, app.banner4]
                .filter(Boolean)
                .map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="aspect-[9/16] w-full rounded-lg object-cover"
                  />
                ))}
            </div>
          )}

          {/* أزرار المتاجر */}
          <div className="flex flex-wrap gap-2.5">
            {app.urlAppStore && <StoreButton href={app.urlAppStore} label="App Store" />}
            {app.urlPlayStore && <StoreButton href={app.urlPlayStore} label="Google Play" />}
            {app.urlAppGallery && <StoreButton href={app.urlAppGallery} label="AppGallery" />}
            {app.urlMacAppStore && <StoreButton href={app.urlMacAppStore} label="Mac App Store" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-deep px-4 py-2.5 text-[0.86rem] font-bold text-paper-fixed transition-colors hover:bg-emerald"
    >
      <ExternalLink className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
