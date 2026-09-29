"use client";

import { useCallback, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { isRtl } from "@/i18n/routing";

/**
 * عارض لقطات ملء الشاشة: أسهم تنقّل، لوحة مفاتيح (أسهم + Esc)،
 * نقر الخلفية للإغلاق، وعدّاد position. يُستخدم داخل AnimatePresence.
 */
export function ScreenshotsLightbox({
  images,
  index,
  alt,
  onClose,
  onNavigate,
  ariaLabel,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /** عنوان الحوار لقارئات الشاشة (يفترض "لقطات الشاشة") */
  ariaLabel?: string;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const rtl = isRtl(locale);
  const count = images.length;
  const safeIndex = Math.min(Math.max(index, 0), count - 1);

  const goNext = useCallback(() => {
    onNavigate((safeIndex + 1) % count);
  }, [safeIndex, count, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((safeIndex - 1 + count) % count);
  }, [safeIndex, count, onNavigate]);

  // لوحة المفاتيح: في RTL يسير "التالي" مع اتجاه القراءة (سهم يسار)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === (rtl ? "ArrowLeft" : "ArrowRight")) goNext();
      else if (e.key === (rtl ? "ArrowRight" : "ArrowLeft")) goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rtl, goNext, goPrev, onClose]);

  // منع تمرير الصفحة خلف العارض أثناء فتحه
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const navButton =
    "grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/25";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? t("apps_detail_screenshots")}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("apps_gallery_close")}
        className={`${navButton} absolute end-4 top-4 z-10`}
      >
        <X className="h-5 w-5" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={t("apps_gallery_prev")}
            className={`${navButton} absolute start-3 top-1/2 z-10 -translate-y-1/2 sm:start-6`}
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={t("apps_gallery_next")}
            className={`${navButton} absolute end-3 top-1/2 z-10 -translate-y-1/2 sm:end-6`}
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>
        </>
      )}

      <motion.figure
        key={safeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        className="flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[safeIndex]}
          alt={`${alt} — ${safeIndex + 1}`}
          className="max-h-[80vh] w-auto max-w-full select-none rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="mt-3 text-[0.8rem] font-bold tracking-widest text-white/70">
          {safeIndex + 1} / {count}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
