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
import { Logo } from "@/components/layout/logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations();

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden">
      {/* خلفية: تدرّج خفيف + شبكة هندسية + كرات متوهجة */}
      <div className="pointer-events-none absolute inset-0">
        {/* شبكة هندسية خفيفة */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2d6a4f 1px, transparent 1px), linear-gradient(to bottom, #2d6a4f 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* كرات متوهجة متحركة */}
        <motion.div
          className="absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-emerald/8 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-emerald-bright/6 blur-[90px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* زخرفة نجمية دوّارة في الخلفية */}
        <motion.div
          className="absolute right-1/4 top-1/3 opacity-[0.04]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="#2d6a4f" strokeWidth="0.5">
            <path d="M50 5L62 38L95 50L62 62L50 95L38 62L5 50L38 38Z" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="20" />
          </svg>
        </motion.div>
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* النص */}
          <div>
            {/* شارة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="text-[0.78rem] font-semibold text-emerald">
                {t("hero_badge")}
              </span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <h1
              className="font-display text-[2.4rem] font-extrabold tracking-tight text-ink lg:text-[4.2rem]"
              style={{ lineHeight: 1.5 }}
            >
              <SplitText text={t("hero_title_1")} delay={0.2} />
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-gradient-to-l from-emerald to-emerald-bright bg-clip-text text-transparent"
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
              className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft"
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
                className="group relative overflow-hidden rounded-xl bg-emerald px-7 py-3.5 font-bold text-paper-fixed shadow-emerald transition-all hover:bg-emerald-deep"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {t("cta_start_reading")}
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:translate-x-[-3px] rtl:rotate-180 rtl:group-hover:translate-x-[3px]" />
                </span>
                {/* لمعان عند المرور */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full rtl:translate-x-full rtl:group-hover:translate-x-[-100%]" />
              </MagneticButton>

              <Link
                href="/books"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-rule bg-paper/50 px-7 py-3.5 font-bold text-ink backdrop-blur-sm transition-all hover:border-emerald hover:bg-paper hover:text-emerald"
              >
                <BookOpen className="h-4 w-4" />
                {t("books_title")}
                <span className="transition-transform group-hover:-translate-x-1 rtl:rotate-180">
                  ←
                </span>
              </Link>
            </motion.div>

            {/* مميزات سريعة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-ink-faint"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald" />
                ١٠ لغات مدعومة
              </span>
              <span className="h-1 w-1 rounded-full bg-rule" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald" />
                وضع داكن وفاتح
              </span>
              <span className="h-1 w-1 rounded-full bg-rule" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald" />
                مفتوح المصدر
              </span>
            </motion.div>
          </div>

          {/* شعار مكتبة الحكمة — كبير بدون مستطيل */}
          <ParallaxLayer speed={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1, ease: EASE }}
              whileHover={{ scale: 1.05 }}
              className="relative mx-auto flex max-w-sm flex-col items-center justify-center gap-6 py-12 text-center"
            >
              {/* ۞ دوّارة خلفية كبيرة */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute opacity-[0.08]"
              >
                <span className="font-naskh text-[12rem] leading-none text-emerald">۞</span>
              </motion.div>

              {/* الشعار كبير */}
              <div className="relative z-10">
                <Logo height={120} className="text-emerald drop-shadow-lg" />
              </div>
            </motion.div>
          </ParallaxLayer>
        </div>
      </div>

      {/* مؤشر سكرول في الأسفل */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">اسحب للأسفل</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-8 w-5 place-items-start rounded-full border border-ink-faint/30 p-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
