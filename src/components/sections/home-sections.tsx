"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Headphones, Library, Heart, ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppInfo } from "@/lib/types";
import { useState, useEffect } from "react";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/animation/motion-primitives";

/* ==========================================================================
   قسم الخدمات — بطاقات تفاعلية فاخرة
   ========================================================================== */
interface Service {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  actionKey: string;
  href: string;
}

const services: Service[] = [
  { icon: BookOpen, titleKey: "quran", descKey: "service_quran_desc", actionKey: "action_browse", href: "/quran" },
  { icon: Headphones, titleKey: "quran_sounds", descKey: "service_sound_desc", actionKey: "action_listen", href: "/sound" },
  { icon: Library, titleKey: "books", descKey: "service_books_desc", actionKey: "action_read", href: "/books" },
  { icon: Heart, titleKey: "azkar", descKey: "service_azkar_desc", actionKey: "action_review", href: "/athkar" },
];

export function ServicesSection() {
  const t = useTranslations();

  return (
    <section className="container-x py-20 lg:py-28">
      <MotionReveal variant="up">
        <div className="mb-14 text-center">
          <span className="eyebrow">{t("services_eyebrow")}</span>
          <h2 className="mt-3 font-display text-[2.2rem] font-extrabold text-ink lg:text-[3rem]">
            {t("services_title_1")} <span className="bg-gradient-to-l from-emerald to-emerald-bright bg-clip-text text-transparent">{t("services_title_2")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("services_lede")}</p>
        </div>
      </MotionReveal>

      <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <MotionStaggerItem key={service.titleKey}>
              <Link
                href={service.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-rule bg-paper p-7 transition-all duration-500 hover:-translate-y-2 hover:border-emerald/40 hover:shadow-xl"
              >
                <div className="pointer-events-none absolute -top-20 right-1/2 h-32 w-32 translate-x-1/2 rounded-full bg-emerald/0 blur-3xl transition-all duration-500 group-hover:bg-emerald/10" />
                <span className="absolute left-7 top-7 font-display text-[3rem] font-extrabold leading-none text-emerald/5 transition-colors duration-300 group-hover:text-emerald/10">
                  {idx + 1}
                </span>
                <div className="relative z-10">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-emerald/8 text-emerald transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald group-hover:text-paper-fixed group-hover:shadow-emerald">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2.5 font-display text-[1.3rem] font-bold text-ink">{t(service.titleKey)}</h3>
                  <p className="text-[0.88rem] leading-relaxed text-ink-soft">{t(service.descKey)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-emerald transition-all duration-300 group-hover:gap-3">
                    {t(service.actionKey)}
                    <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </MotionStaggerItem>
          );
        })}
      </MotionStagger>
    </section>
  );
}

/* ==========================================================================
   شريط الآية — أنيق
   ========================================================================== */
export function AyahMarqueeSection() {
  const t = useTranslations();
  const text = t("ayah_band_text");

  return (
    <section className="relative overflow-hidden bg-emerald-deep py-6">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-emerald-light/10 blur-[80px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z' fill='none' stroke='%23B7E4C7' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "70px",
        }}
      />
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 px-5">
              <span className="font-naskh text-[1.15rem] font-bold text-emerald-light-fixed">{text}</span>
              <span className="text-xl text-emerald-bright/60">۞</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   قسم تطبيقاتنا — Carousel فاخر
   ========================================================================== */
const APPS_URL = "/api/apps";
const MEDIA_BASE = "https://dash.vexaltech.dev";

function fixMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${MEDIA_BASE}${url}`;
}

export function AppsCarouselSection() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    fetch(APPS_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: { apps: AppInfo[] }) => {
        const filtered = (data.apps || [])
          .filter((a) => a.companyName === "Alheekmah Library")
          .map((a) => ({ ...a, appBanner: fixMediaUrl(a.appBanner), appLogo: fixMediaUrl(a.appLogo) }));
        setApps(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!autoPlay || apps.length <= 1) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % apps.length), 5000);
    return () => clearInterval(timer);
  }, [autoPlay, apps.length]);

  const handlePrev = () => { setAutoPlay(false); setIndex((prev) => (prev - 1 + apps.length) % apps.length); };
  const handleNext = () => { setAutoPlay(false); setIndex((prev) => (prev + 1) % apps.length); };

  return (
    <section className="container-x py-20 lg:py-28">
      <MotionReveal variant="up">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">{t("apps_eyebrow")}</span>
            <h2 className="mt-3 font-display text-[2.2rem] font-extrabold text-ink lg:text-[3rem]">
              {t("apps_title_1")} <span className="bg-gradient-to-l from-emerald to-emerald-bright bg-clip-text text-transparent">{t("apps_title_2")}</span>
            </h2>
          </div>
          <Link href="/apps" className="hidden items-center gap-1.5 rounded-xl border border-rule bg-paper px-4 py-2.5 text-[0.84rem] font-bold text-ink-soft transition-all hover:border-emerald hover:text-emerald hover:shadow-sm sm:inline-flex">
            {t("apps_view_details")} <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </MotionReveal>

      {loading && (
        <div className="flex h-72 items-center justify-center rounded-3xl border border-rule bg-paper">
          <Loader2 className="h-8 w-8 animate-spin text-emerald" />
        </div>
      )}

      {!loading && apps.length > 0 && (
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-rule bg-paper p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
            >
              <span className="pointer-events-none absolute -top-4 left-8 font-display text-[8rem] font-extrabold leading-none text-emerald/[0.03]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative h-52 overflow-hidden rounded-2xl shadow-lg">
                {apps[index].appBanner ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={apps[index].appBanner} alt={apps[index].appTitle} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center bg-gradient-to-br from-emerald-deep to-emerald">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-emerald-light-fixed"><path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2.5">
                  {apps[index].appLogo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={apps[index].appLogo} alt="" className="h-9 w-9 rounded-xl object-contain" />
                  )}
                  <h3 className="font-display text-[1.6rem] font-bold text-ink">{apps[index].appTitle}</h3>
                </div>
                <p className="mb-6 text-[0.95rem] leading-relaxed text-ink-soft">{apps[index].body}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/apps" className="group/btn inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 text-[0.86rem] font-bold text-paper-fixed shadow-emerald transition-transform hover:-translate-y-0.5">
                    {t("apps_view_details")} <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-x-0.5 rtl:rotate-180" />
                  </Link>
                  <div className="flex items-center gap-1.5 rounded-lg border border-rule bg-bg px-3 py-2 text-[0.74rem] font-semibold text-ink-faint">iOS · Android</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {apps.length > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {apps.map((_, i) => (
                  <button key={i} onClick={() => { setAutoPlay(false); setIndex(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-emerald" : "w-2 bg-rule hover:bg-emerald/40"}`}
                    aria-label={`app ${i + 1}`} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrev} aria-label="previous" className="grid h-10 w-10 place-items-center rounded-xl border border-rule bg-paper text-ink-soft transition-all hover:border-emerald hover:bg-emerald/5 hover:text-emerald">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button onClick={handleNext} aria-label="next" className="grid h-10 w-10 place-items-center rounded-xl border border-rule bg-paper text-ink-soft transition-all hover:border-emerald hover:bg-emerald/5 hover:text-emerald">
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
