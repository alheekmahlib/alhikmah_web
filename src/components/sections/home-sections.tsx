"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Headphones, Library, Heart, ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/animation/motion-primitives";
import type { AppInfo } from "@/lib/types";

/* ==========================================================================
   قسم الخدمات
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
    <section className="container-x py-24">
      <MotionReveal variant="up">
        <div className="mb-14 text-center">
          <span className="eyebrow">{t("services_eyebrow")}</span>
          <h2 className="mt-3 font-display text-[2.2rem] font-extrabold text-ink lg:text-6">
            {t("services_title_1")} <span className="text-emerald">{t("services_title_2")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("services_lede")}</p>
        </div>
      </MotionReveal>

      <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <MotionStaggerItem key={service.titleKey}>
              <Link
                href={service.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-rule bg-paper p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-emerald hover:shadow-lg"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-emerald/8 text-emerald transition-all duration-300 group-hover:bg-emerald group-hover:text-paper">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </div>
                <h3 className="mb-2.5 font-display text-[1.35rem] font-bold text-ink">
                  {t(service.titleKey)}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-ink-soft">
                  {t(service.descKey)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-emerald transition-all group-hover:gap-2.5">
                  {t(service.actionKey)}
                  <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                </span>
              </Link>
            </MotionStaggerItem>
          );
        })}
      </MotionStagger>
    </section>
  );
}

/* ==========================================================================
   شريط الآية (Marquee)
   ========================================================================== */
export function AyahMarqueeSection() {
  const t = useTranslations();
  const text = t("ayah_band_text");

  return (
    <section className="relative overflow-hidden border-y border-emerald/15 bg-emerald-deep py-5 text-emerald-light">
      <div className="flex gap-12 overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12 px-6">
              <span className="font-naskh text-xl font-bold">{text}</span>
              <span className="text-emerald-bright">۞</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   قسم تطبيقاتنا — Carousel Slider (بيانات حقيقية من GitHub)
   ========================================================================== */
const APPS_URL =
  "https://raw.githubusercontent.com/alheekmahlib/thegarlanded/master/ourApps.json";

export function AppsCarouselSection() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // جلب التطبيقات الحقيقية
  useEffect(() => {
    fetch(APPS_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: AppInfo[]) => {
        setApps(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // تشغيل تلقائي
  useEffect(() => {
    if (!autoPlay || apps.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % apps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, apps.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setIndex((prev) => (prev - 1 + apps.length) % apps.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setIndex((prev) => (prev + 1) % apps.length);
  };

  return (
    <section className="container-x py-24">
      <MotionReveal variant="up">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">{t("apps_eyebrow")}</span>
            <h2 className="mt-3 font-display text-[2.2rem] font-extrabold text-ink lg:text-6">
              {t("apps_title_1")} <span className="text-emerald">{t("apps_title_2")}</span>
            </h2>
          </div>
          <Link
            href="/apps"
            className="hidden items-center gap-1.5 rounded-xl border border-rule px-4 py-2 text-[0.84rem] font-bold text-ink-soft transition-colors hover:border-emerald hover:text-emerald sm:inline-flex"
          >
            {t("apps_view_details")}
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </MotionReveal>

      {/* تحميل */}
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald" />
        </div>
      )}

      {/* Carousel */}
      {!loading && apps.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 rounded-3xl border border-rule bg-paper p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12"
            >
              {/* بانر/شعار التطبيق */}
              <div className="relative grid h-48 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald">
                {apps[index].appBanner ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={apps[index].appBanner}
                    alt={apps[index].appTitle}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 h-20 w-20 text-emerald-light"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z" />
                  </motion.svg>
                )}
              </div>

              {/* المحتوى */}
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  {apps[index].appLogo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={apps[index].appLogo} alt="" className="h-8 w-8 rounded-lg object-contain" />
                  )}
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {apps[index].appTitle}
                  </h3>
                </div>
                <p className="mb-6 text-[0.95rem] leading-relaxed text-ink-soft">
                  {apps[index].body}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/apps"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 text-[0.86rem] font-bold text-paper transition-transform hover:-translate-y-0.5"
                  >
                    {t("apps_view_details")}
                    <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                  <div className="flex items-center gap-1.5 rounded-lg border border-rule bg-bg px-3 py-2 text-[0.74rem] font-semibold text-ink-faint">
                    iOS · Android
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* أزرار التنقّل */}
          {apps.length > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {apps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoPlay(false); setIndex(i); }}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-emerald" : "w-2 bg-rule hover:bg-emerald/50"
                    }`}
                    aria-label={`app ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="previous"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-rule bg-paper text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="next"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-rule bg-paper text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
                >
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
