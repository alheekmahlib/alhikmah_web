"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Home, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/layout/logo";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="container-x flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <span className="font-display text-[8rem] font-extrabold leading-none text-emerald/15 lg:text-[14rem]">
          ٤٠٤
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo height={60} className="text-emerald opacity-90" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-3 font-display text-3xl font-bold text-ink"
      >
        {t("not_found_title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8 max-w-md text-ink-soft"
      >
        {t("not_found_desc")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 font-bold text-paper shadow-emerald transition-transform hover:-translate-y-0.5"
        >
          <Home className="h-4 w-4" />
          {t("not_found_home")}
        </Link>
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 rounded-xl border border-rule px-6 py-3 font-bold text-ink transition-colors hover:border-emerald hover:text-emerald"
        >
          <BookOpen className="h-4 w-4" />
          {t("quran")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 max-w-lg rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald p-6 text-center"
      >
        <p className="font-naskh text-lg italic leading-relaxed text-emerald-light">
          {t("not_found_ayah")}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-emerald-light/70">
          {t("not_found_ayah_ref")}
        </p>
      </motion.div>
    </div>
  );
}
