"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpenText,
  Images,
  Maximize2,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import type { AppInfo } from "@/lib/types";
import { fetchApps } from "@/lib/api-cache";
import { findAppBySlug, getAlheekmahApps } from "@/lib/apps";
import { getLocalizedField } from "@/lib/platform-detect";
import { parseAboutBlocks, resolveAboutApp } from "@/lib/app-about";
import { StoreButtons } from "@/components/app-detail/store-buttons";
import { AboutBlocks } from "@/components/app-detail/about-blocks";
import { SectionHeading } from "@/components/app-detail/section-heading";
import { ScreenshotsGallery } from "@/components/app-detail/screenshots-gallery";
import { ScreenshotsLightbox } from "@/components/app-detail/lightbox";
import { UsedLibraries } from "@/components/app-detail/used-libraries";
import { OtherApps } from "@/components/app-detail/other-apps";

type Status = "loading" | "error" | "notfound" | { app: AppInfo; all: AppInfo[] };

/** العارض الحالي: مصفوفة صور (البانر أو اللقطات) + الفهرس النشط */
type LightboxState = { images: string[]; index: number } | null;

/**
 * محتوى صفحة تفاصيل تطبيق /apps/[slug] — بنمط متاجر التطبيقات:
 * هيرو فوق بانر مموّه، نبذة منسّقة، معرض لقطات مع عارض ملء الشاشة،
 * المكتبات المستخدمة، شريط تنزيل، وتطبيقات أخرى.
 * الجلب من العميل (النمط المعتمد على Cloudflare/OpenNext)؛
 * fetchApps يقرأ من "/api/apps" مع كاش (ذاكرة + localStorage).
 */
export function AppsDetailClient({ slug }: { slug: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("loading");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    let cancelled = false;
    fetchApps<unknown>()
      .then((data) => {
        if (cancelled) return;
        const all = getAlheekmahApps(data);
        const app = findAppBySlug(slug, all);
        setStatus(app ? { app, all } : "notfound");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return <DetailSkeleton />;
  }

  if (status === "error") {
    return (
      <section className="container-x py-20">
        <div className="rounded-2xl border border-rule bg-paper p-10 text-center text-ink-faint">
          {t("apps_error")}
        </div>
      </section>
    );
  }

  if (status === "notfound") {
    return (
      <section className="container-x flex flex-col items-center justify-center py-32 text-center">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-emerald/10 text-emerald">
          <Smartphone className="h-10 w-10" strokeWidth={1.4} />
        </div>
        <h1 className="mb-3 font-display text-2xl font-bold text-ink">{t("apps_not_found")}</h1>
        <p className="mb-8 max-w-md text-ink-soft">{t("apps_not_found_desc")}</p>
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 font-bold text-paper-fixed shadow-emerald transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("apps_back_to_apps")}
        </Link>
      </section>
    );
  }

  const { app, all } = status;
  const name = getLocalizedField(app.appName, locale, "name");
  const body = getLocalizedField(app.body, locale, "value");
  const aboutBlocks = parseAboutBlocks(resolveAboutApp(app, locale));
  const gallery = app.banners ?? [];
  const tags = app.tags ?? [];
  const banner = app.appBanner;

  return (
    <section className="container-x py-8 lg:py-10">
      <Reveal variant="up">
        <Link
          href="/apps"
          className="mb-6 inline-flex items-center gap-1.5 text-[0.86rem] font-bold text-emerald-deep transition-colors hover:text-emerald"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("apps_back_to_apps")}
        </Link>
      </Reveal>

      {/* ===== الهيرو: بانر مموّه بتدرج زمردي ===== */}
      <Reveal variant="up" delay={60}>
        <div className="relative overflow-hidden rounded-3xl border border-rule bg-paper shadow-xl">
          {app.appBanner ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.appBanner}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/85 to-paper" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep to-emerald opacity-10" />
          )}

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-5">
              {app.appLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={app.appLogo}
                  alt=""
                  className="h-20 w-20 rounded-2xl border border-rule bg-paper object-cover shadow-lg sm:h-24 sm:w-24"
                />
              )}
              <div className="min-w-0">
                <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{name}</h1>
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-emerald-rule bg-emerald/10 px-3 py-1 text-[0.72rem] font-bold text-emerald"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {body && <p className="max-w-3xl text-[1rem] leading-relaxed text-ink-soft">{body}</p>}

            <StoreButtons app={app} />
          </div>
        </div>
      </Reveal>

      {/* ===== البانر الترويجي: عرض مستقل بأبعاده الطبيعية الكاملة،
            نقره يفتح العارض (بلا ظل وبعرض محدود كي لا يبتلع الشاشة) ===== */}
      {banner && (
        <Reveal variant="up" className="mt-10">
          <button
            type="button"
            onClick={() => setLightbox({ images: [banner], index: 0 })}
            aria-label={t("apps_gallery_open")}
            data-cursor="hover"
            className="group relative mx-auto block w-full max-w-4xl overflow-hidden rounded-3xl border border-rule"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner}
              alt={name}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* تلميح بصري خفيف أن البانر قابل للتكبير */}
            <span
              aria-hidden
              className="absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            >
              <Maximize2 className="h-4 w-4" />
            </span>
          </button>
        </Reveal>
      )}

      {/* ===== نظرة عن قرب ===== */}
      {aboutBlocks.length > 0 && (
        <Reveal variant="up" className="mt-12">
          <SectionHeading
            title={t("apps_detail_about")}
            icon={<BookOpenText className="h-5 w-5" strokeWidth={1.7} />}
          />
          <AboutBlocks blocks={aboutBlocks} />
        </Reveal>
      )}

      {/* ===== لقطات الشاشة ===== */}
      <Reveal variant="up" className="mt-12">
        <SectionHeading
          title={t("apps_detail_screenshots")}
          icon={<Images className="h-5 w-5" strokeWidth={1.7} />}
        />
        {gallery.length > 0 ? (
          <ScreenshotsGallery
            images={gallery}
            alt={name}
            onOpen={(i) => setLightbox({ images: gallery, index: i })}
          />
        ) : (
          <div className="grid place-items-center rounded-2xl border border-dashed border-rule bg-paper px-6 py-14 text-center">
            <Images className="mb-3 h-8 w-8 text-ink-faint" strokeWidth={1.3} />
            <p className="text-[0.9rem] text-ink-soft">{t("apps_detail_screenshots_soon")}</p>
          </div>
        )}
      </Reveal>

      {/* ===== المكتبات المستخدمة (تُخفى تلقائيًا إن لم يوجد ربط) ===== */}
      <div className="mt-12">
        <UsedLibraries slug={app.slug} />
      </div>

      {/* ===== شريط التنزيل ===== */}
      <Reveal variant="up" className="mt-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-deep to-emerald p-8 text-center shadow-emerald sm:p-12">
          <div
            aria-hidden
            className="absolute -start-16 -top-16 h-48 w-48 rounded-full bg-emerald-glow/20 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -end-16 h-56 w-56 rounded-full bg-emerald-light/20 blur-2xl"
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold text-paper-fixed sm:text-3xl">
              {t("apps_detail_download_title")}
            </h2>
            <p className="mt-2 text-[0.95rem] text-emerald-light-fixed">
              {t("apps_detail_download_lede")}
            </p>
            <div className="mt-6 flex justify-center">
              <StoreButtons app={app} variant="onDark" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== تطبيقات أخرى ===== */}
      <div className="mt-14">
        <OtherApps apps={all} current={app} />
      </div>

      {/* ===== عارض الصور (اللقطات أو البانر) ===== */}
      <AnimatePresence>
        {lightbox && lightbox.images.length > 0 && (
          <ScreenshotsLightbox
            images={lightbox.images}
            index={lightbox.index}
            alt={name}
            ariaLabel={name}
            onClose={() => setLightbox(null)}
            onNavigate={(i) => setLightbox({ ...lightbox, index: i })}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/** هيكل تحميل يوازي شكل الصفحة النهائي (إحساس أداء أفضل من سبينر). */
function DetailSkeleton() {
  const t = useTranslations();
  return (
    <div className="container-x py-8 lg:py-10" aria-busy="true" aria-label={t("apps_loading")}>
      <div className="flex animate-pulse flex-col gap-12">
        <div className="h-5 w-32 rounded-full bg-bg-warm" />

        <div className="overflow-hidden rounded-3xl border border-rule">
          <div className="h-52 bg-bg-warm sm:h-60" />
          <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-12">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-bg-warm sm:h-24 sm:w-24" />
              <div className="h-8 w-56 rounded-full bg-bg-warm" />
            </div>
            <div className="h-4 w-full max-w-2xl rounded-full bg-bg-warm" />
            <div className="h-4 w-2/3 max-w-xl rounded-full bg-bg-warm" />
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-32 rounded-xl bg-bg-warm" />
              <div className="h-11 w-32 rounded-xl bg-bg-warm" />
              <div className="h-11 w-32 rounded-xl bg-bg-warm" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[9/16] w-36 shrink-0 rounded-2xl bg-bg-warm sm:w-44" />
          ))}
        </div>
      </div>
    </div>
  );
}
