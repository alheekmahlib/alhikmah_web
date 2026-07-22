"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";

/**
 * يعرض قسم القرآن من مشروع Flutter المُضمَّن عبر iframe.
 * عند تغيير الثيم أو اللغة، يُعاد تحميل الـ iframe بالقيم الجديدة.
 */
export function QuranIframe({ view = "quran" }: { view?: "quran" | "sound" }) {
  const t = useTranslations();
  const locale = useLocale();
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // عنوان iframe مشروع Flutter القرآني
  const quranOrigin =
    process.env.NEXT_PUBLIC_QURAN_IFRAME_URL ??
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:8080`
      : "http://localhost:8080");

  // src يتغيّر عند تغيير الثيم/اللغة → يُعيد تحميل الـ iframe تلقائيًا
  const iframeSrc = `${quranOrigin}/?view=${view}&theme=${theme}&lang=${locale}`;

  // إعادة ضبط loaded عند تغيير الثيم/اللغة (لأن الـ iframe سيعاد تحميله)
  useEffect(() => {
    setLoaded(false);
  }, [theme, locale]);

  // احتياطي: إظهار المحتوى بعد 8 ثوانٍ
  useEffect(() => {
    const fallback = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(fallback);
  }, [theme, locale]);

  // ألوان الخلفية حسب الثيم
  const bgColor = theme === "dark" ? "#0F1814" : "#FBF7EE";

  return (
    <div className="relative -mt-4 w-full" style={{ height: "calc(100vh - 6rem)", backgroundColor: bgColor }}>
      {/* شاشة التحميل */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: bgColor }}>
          <div className="h-12 w-12 animate-spin" style={{ color: theme === "dark" ? "#52B788" : "#2D6A4F" }}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z" />
            </svg>
          </div>
          <p className="font-display text-lg font-bold" style={{ color: theme === "dark" ? "#F5EBD6" : "#2A1F12" }}>
            {t("quran_loading")}
          </p>
        </div>
      )}

      {/* الـ iframe — key يتغيّر مع theme لإعادة التحميل */}
      <iframe
        key={`${theme}-${locale}`}
        ref={iframeRef}
        src={iframeSrc}
        title={t("quran")}
        loading="eager"
        allow="autoplay; fullscreen; clipboard-read; clipboard-write"
        className="h-full w-full border-0"
        onLoad={() => {
          setLoaded(true);
          // ★ أرسل postMessage فور تحميل الـ iframe لتطبيق الثيم
          setTimeout(() => {
            iframeRef.current?.contentWindow?.postMessage(
              { type: "theme:set", mode: theme },
              "*",
            );
          }, 500);
        }}
      />
    </div>
  );
}
