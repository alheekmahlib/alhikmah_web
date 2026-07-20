"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";

/**
 * يعرض قسم القرآن أو الصوت من مشروع Flutter المُضمَّن عبر iframe.
 * يتواصل مع الـ iframe عبر postMessage لمزامنة الثيم واللغة.
 */
export function QuranIframe({ view = "quran" }: { view?: "quran" | "sound" }) {
  const t = useTranslations();
  const locale = useLocale();
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // عنوان iframe مشروع Flutter القرآني.
  // - في الإنتاج: NEXT_PUBLIC_QURAN_IFRAME_URL (subdomain مثل quran.alheekmahlib.com)
  // - في التطوير الاعتيادي: localhost:8080 (خادم Flutter منفصل)
  // - للشبكة المحلية: يكتشف host المتصفح تلقائيًا
  const quranOrigin =
    process.env.NEXT_PUBLIC_QURAN_IFRAME_URL ??
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:8080`
      : "http://localhost:8080");

  const iframeSrc = `${quranOrigin}/?view=${view}&theme=${theme}&lang=${locale}`;

  // عند تغيّر الثيم/اللغة، أرسل تحديثًا للـ iframe (دون إعادة تحميل كاملة)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    // انتظر قليلًا للتأكد من جاهزية Flutter
    const timer = setTimeout(() => {
      iframe.contentWindow?.postMessage(
        { type: "theme:set", mode: theme },
        "*",
      );
      iframe.contentWindow?.postMessage(
        { type: "lang:set", lang: locale },
        "*",
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [theme, locale, loaded]);

  // الاستماع لإشعارات الـ iframe (مزامنة URL + جاهزية)
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      switch (data.type) {
        case "quran:ready":
          setLoaded(true);
          break;
        case "quran:page":
          // مزامنة URL المتصفح مع صفحة القرآن
          if (data.path && typeof data.path === "string") {
            if (process.env.NODE_ENV === "development") {
              console.log("[Quran iframe] page changed:", data.page);
            }
          }
          break;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // احتياطي: Flutter iframe يحتاج وقتًا لتهيئة main.dart.js (≈3.5MB).
  // إن لم تأتِ رسالة "quran:ready" خلال 8 ثوانٍ، أخفِ شاشة التحميل
  // (الـ iframe يكون قد حمّل بالفعل، لكن الرسالة قد لا تصل في بعض البيئات).
  useEffect(() => {
    const fallback = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 9rem)" }}>
      {/* شاشة التحميل */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-bg">
          <div className="h-12 w-12 animate-spin text-emerald">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z" />
            </svg>
          </div>
          <p className="font-display text-lg font-bold text-ink">
            {t("quran_loading")}
          </p>
        </div>
      )}

      {/* الـ iframe */}
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title={view === "sound" ? t("quran_sounds") : t("quran")}
        loading="eager"
        allow="autoplay; fullscreen; clipboard-read; clipboard-write"
        className="h-full w-full border-0"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
