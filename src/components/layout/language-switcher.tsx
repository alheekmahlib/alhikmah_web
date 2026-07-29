"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// أسماء اللغات بلغاتها الأصلية
const LOCALE_NAMES: Record<Locale, { native: string; short: string }> = {
  ar: { native: "العربية", short: "ع" },
  en: { native: "English", short: "EN" },
  es: { native: "Español", short: "ES" },
  tr: { native: "Türkçe", short: "TR" },
  ur: { native: "اردو", short: "اردو" },
  id: { native: "Indonesia", short: "ID" },
  ku: { native: "کوردی", short: "کو" },
  so: { native: "Soomaali", short: "SO" },
  tl: { native: "Tagalog", short: "TL" },
  be: { native: "বাংলা", short: "বাং" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LOCALE_NAMES[locale] ?? LOCALE_NAMES.en;

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const changeLocale = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    // يحافظ على المسار الحالي ويغيّر اللغة فقط
    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor="hover"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg text-emerald transition-colors hover:bg-emerald/10",
          open && "bg-emerald/10",
        )}
      >
        <span className="flex items-center justify-center">
          <Globe className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* مفرّد اللغة الحالية — يظهر فوق القائمة للوضوح */}
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              role="menu"
              className="absolute end-0 top-full z-[120] mt-2 w-44 overflow-hidden rounded-2xl border border-rule bg-paper p-1.5 shadow-2xl"
            >
              {/* ترويسة صغيرة */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-ink-faint">
                <Globe className="h-3 w-3" />
                Language
                <ChevronDown className="ms-auto h-3 w-3" />
              </div>

              <div className="mt-0.5 max-h-72 overflow-y-auto" data-lenis-prevent>
                {locales.map((loc) => {
                  const info = LOCALE_NAMES[loc];
                  const active = loc === locale;
                  return (
                    <button
                      key={loc}
                      onClick={() => changeLocale(loc)}
                      role="menuitemradio"
                      aria-checked={active}
                      data-cursor="hover"
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-start transition-colors",
                        active
                          ? "bg-emerald/8 text-emerald"
                          : "text-ink-soft hover:bg-bg-warm hover:text-emerald",
                      )}
                    >
                      {/* رمز مختصر للغة داخل دائرة */}
                      <span
                        className={cn(
                          "grid h-6 w-7 flex-shrink-0 place-items-center rounded-md text-[0.62rem] font-bold uppercase",
                          active
                            ? "bg-emerald text-paper-fixed"
                            : "bg-bg-warm text-ink-soft",
                        )}
                      >
                        {info.short}
                      </span>
                      <span className="flex-1 text-[0.82rem] font-semibold">
                        {info.native}
                      </span>
                      {active && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
