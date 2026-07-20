"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * يوفّر سكرول سلس (smooth scroll) عبر Lenis — مطابق لإعداد bdsn.club.
 * - exponential easing (1 - 2^(-10t))
 * - smoothWheel على سطح المكتب، native على touch (لتجنّب تعارض iOS)
 * - يحترم prefers-reduced-motion (يعطّل Lenis ويلجأ للسكرول العادي)
 *
 * يُوضع في أعلى شجرة المكوّنات (داخل ThemeProvider في [locale]/layout).
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // على الأجهزة اللمسية أو مع تقليل الحركة → سكرول عادي
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // native على touch (تجنّب تعارض iOS rubber-band)
    });

    // ربط Lenis بـ requestAnimationFrame
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // تنظيف عند الإزالة
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
