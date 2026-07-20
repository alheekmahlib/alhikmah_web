"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "quran", href: "/quran" },
  { key: "books", href: "/books" },
  { key: "athkar", href: "/athkar" },
  { key: "apps", href: "/apps" },
  { key: "about", href: "/about" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // هل الرابط نشط؟ (نتعامل مع المسارات الفرعية مثل /books/1)
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-1 z-[100]">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="container-x mt-3 flex items-center justify-between gap-6 rounded-2xl border border-rule/60 bg-bg/80 p-2.5 backdrop-blur-xl"
      >
        {/* الشعار الفعلي */}
        <Link href="/" className="flex items-center gap-2.5 py-1" data-cursor="hover">
          <Logo height={32} className="text-emerald transition-colors hover:text-emerald-bright" />
        </Link>

        {/* روابط سطح المكتب */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "group relative rounded-lg px-3.5 py-2 text-[0.88rem] font-semibold transition-colors",
                  active
                    ? "text-emerald"
                    : "text-ink-soft hover:text-emerald",
                )}
              >
                {t(link.key)}
                {/* خط سفلي يظهر للرابط النشط دائمًا، وللبقية عند المرور */}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-emerald transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* الأدوات */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={t("changeTheme")}
            data-cursor="hover"
            className="grid h-9 w-9 place-items-center rounded-lg text-emerald transition-colors hover:bg-emerald/10"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link
            href="/contact-us"
            data-cursor="hover"
            className="hidden rounded-xl bg-emerald px-4 py-2 text-[0.84rem] font-bold text-paper transition-all hover:bg-emerald md:inline-block"
          >
            {t("contact_title")}
          </Link>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-emerald transition-colors hover:bg-emerald/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* قائمة الجوال */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="container-x mt-2 overflow-hidden rounded-2xl border border-rule bg-paper/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-0.5 p-3">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-base font-semibold transition-colors",
                      active
                        ? "bg-emerald/10 text-emerald"
                        : "text-ink-soft hover:bg-bg-warm hover:text-emerald",
                    )}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
              <Link
                href="/contact-us"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-lg bg-emerald px-4 py-2.5 text-center font-bold text-paper"
              >
                {t("contact_title")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
