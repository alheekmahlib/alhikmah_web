"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isRtl } from "@/i18n/routing";

/**
 * صف لقطات شاشة أفقي بتمرير snap (بسحب اللمس أو الأسهم)،
 * النقر على لقطة يفتح العارض الملء الشاشة.
 */
export function ScreenshotsGallery({
  images,
  alt,
  onOpen,
}: {
  images: string[];
  alt: string;
  onOpen: (index: number) => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const rtl = isRtl(locale);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // في RTL تكون قيم scrollLeft سالبة، فيُعكس الاتجاه
    el.scrollBy({ left: el.clientWidth * 0.7 * dir * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollRail(-1)}
          aria-label={t("apps_gallery_prev")}
          data-cursor="hover"
          className="grid h-10 w-10 place-items-center rounded-xl border border-rule bg-paper text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald hover:text-emerald"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollRail(1)}
          aria-label={t("apps_gallery_next")}
          data-cursor="hover"
          className="grid h-10 w-10 place-items-center rounded-xl border border-rule bg-paper text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald hover:text-emerald"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>

      <div
        ref={railRef}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`${t("apps_gallery_open")} ${i + 1}`}
            data-cursor="hover"
            className="group aspect-[9/16] w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-rule bg-bg-warm sm:w-44 lg:w-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} — ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
