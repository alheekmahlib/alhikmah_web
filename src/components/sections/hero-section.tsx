"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import {
  SplitText,
  ParallaxLayer,
  MagneticButton,
} from "@/components/animation/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations();

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden">
      {/* خلفية متدرّجة خفيفة + زخرفة متحركة */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 0L62 38L100 50L62 62L50 100L38 62L0 50L38 38Z' fill='none' stroke='%232d6a4f' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: "90px",
          }}
        />
        <motion.div
          className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-emerald/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-32 bottom-10 h-[400px] w-[400px] rounded-full bg-emerald-bright/5 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* النص */}
          <div>
            {/* شارة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald" />
              <span className="text-[0.78rem] font-semibold text-emerald">
                {t("hero_badge")}
              </span>
            </motion.div>

            {/* العنوان الرئيسي — تباعد أسطر كافٍ لإظهار التشكيل */}
            <h1
              className="font-display text-[2.6rem] font-extrabold tracking-tight text-ink lg:text-[4.5rem]"
              style={{ lineHeight: 1.7 }}
            >
              <SplitText text={t("hero_title_1")} delay={0.2} />
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-emerald"
              >
                <SplitText text={t("hero_title_2")} delay={0.7} />
              </motion.span>
              <br />
              <SplitText text={t("hero_title_3")} delay={1.1} />
            </h1>

            {/* الوصف */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              {t("hero_subtitle")}
            </motion.p>

            {/* أزرار */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="/quran"
                strength={0.25}
                className="overflow-hidden rounded-xl bg-emerald px-7 py-3.5 font-bold text-paper shadow-emerald transition-colors hover:bg-emerald"
              >
                <span className="flex items-center gap-2.5">
                  {t("cta_start_reading")}
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                </span>
              </MagneticButton>

              <Link
                href="/books"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-rule px-7 py-3.5 font-bold text-ink transition-colors hover:border-emerald hover:text-emerald"
              >
                <BookOpen className="h-4 w-4" />
                {t("books_title")}
                <span className="transition-transform group-hover:-translate-x-1 rtl:rotate-180">
                  ←
                </span>
              </Link>
            </motion.div>
          </div>

          {/* البطاقة الجانبية — آية بتأثير parallax */}
          <ParallaxLayer speed={0.3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 1, duration: 0.9, ease: EASE }}
              className="relative mx-auto max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-deep to-emerald p-9 text-center shadow-2xl"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0L37 23L60 30L37 37L30 60L23 37L0 30L23 23Z' fill='none' stroke='%23B7E4C7' stroke-width='1'/%3E%3C/svg%3E\")",
                  backgroundSize: "50px",
                }}
              />
              <div className="pointer-events-none absolute inset-3.5 rounded-2xl border border-emerald-light/30" />

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-5"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto h-10 w-10 text-emerald-light">
                    <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z" />
                  </svg>
                </motion.div>
                <p className="font-naskh text-2xl font-bold leading-loose text-emerald-light">
                  {t("hero_ayah_text")}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-emerald-light/70">
                  {t("hero_ayah_ref")}
                </p>
              </div>
            </motion.div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
