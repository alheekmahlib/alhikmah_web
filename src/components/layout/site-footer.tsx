"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { MotionReveal } from "@/components/animation/motion-primitives";

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="relative mt-20 overflow-hidden bg-emerald-deep text-paper-fixed">
      {/* زخرفة هندسية */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z' fill='none' stroke='%23B7E4C7' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "70px",
        }}
      />

      <div className="container-x relative z-10 py-16">
        <MotionReveal variant="up">
          <div className="grid grid-cols-2 gap-10 border-b border-emerald-light/15 pb-12 md:grid-cols-3 lg:grid-cols-5">
            {/* الشعار */}
            <div className="col-span-2 lg:col-span-2">
              <Logo height={40} className="mb-4 text-emerald-light-fixed" />
              <p className="max-w-xs text-[0.92rem] leading-relaxed text-paper-fixed/70">
                {t("footer_desc")}
              </p>
              <div className="mt-5 flex gap-2.5">
                <a
                  href="https://www.facebook.com/alheekmahlib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-emerald-light/20 text-paper-fixed/70 transition-all hover:border-emerald-light hover:bg-emerald-light hover:text-emerald-deep"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/19712278630"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-9 w-9 place-items-center rounded-full border border-emerald-light/20 text-paper-fixed/70 transition-all hover:border-emerald-light hover:bg-emerald-light hover:text-emerald-deep"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            <FooterColumn title={t("quick_links")} links={[
              { label: t("home"), href: "/" },
              { label: t("quran"), href: "/quran" },
              { label: t("books"), href: "/books" },
              { label: t("athkar"), href: "/athkar" },
            ]} />
            <FooterColumn title={t("services")} links={[
              { label: t("quran"), href: "/quran" },
              { label: t("quran_sounds"), href: "/sound" },
              { label: t("books"), href: "/books" },
              { label: t("athkar"), href: "/athkar" },
            ]} />
            <FooterColumn title={t("company")} links={[
              { label: t("about"), href: "/about" },
              { label: t("developers_title"), href: "/developers" },
              { label: t("contact_title"), href: "/contact-us" },
              { label: t("faq"), href: "/faq" },
            ]} />
          </div>
        </MotionReveal>

        <MotionReveal variant="fade-up" delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[0.84rem] text-paper-fixed/55">
            <span>© {new Date().getFullYear()} · {t("appName")}</span>
            <span>{t("footer_made_with")}</span>
          </div>
        </MotionReveal>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="mb-4 font-display text-lg font-bold text-emerald-light-fixed">{title}</h5>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-[0.9rem] text-paper-fixed/70 transition-colors hover:text-emerald-light-fixed"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 5.8c-.8.4-1.6.6-2.5.7.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.9-2-1.4-3.2-1.4-2.5 0-4.5 2-4.5 4.5 0 .3 0 .7.1 1C7.4 9.1 4 7.4 1.8 4.6c-.4.7-.6 1.4-.6 2.3 0 1.5.8 2.9 2 3.7-.7 0-1.4-.2-2-.5v.1c0 2.2 1.5 4 3.6 4.4-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.8 2.2 3.1 4.1 3.1-1.5 1.2-3.4 1.9-5.5 1.9H0c2 1.3 4.3 2 6.9 2 8.3 0 12.8-6.8 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.4z" />
      </svg>
    ),
    YouTube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23 7.5c-.3-1.2-1.1-2-2.3-2.3C18.5 4.7 12 4.7 12 4.7s-6.5 0-8.7.5C2.1 5.5 1.3 6.3 1 7.5.5 9.7.5 12 .5 12s0 2.3.5 4.5c.3 1.2 1.1 2 2.3 2.3 2.2.5 8.7.5 8.7.5s6.5 0 8.7-.5c1.2-.3 2-1.1 2.3-2.3.5-2.2.5-4.5.5-4.5s0-2.3-.5-4.5zM9.7 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    ),
    Telegram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23 4.3l-3.3 15.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-.9.5l.3-4.9L19.5 6c.4-.3-.1-.5-.6-.2L7.5 13.5l-4.7-1.5c-1-.3-1-1 .2-1.5L21.7 3c.8-.3 1.6.2 1.3 1.3z" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}
