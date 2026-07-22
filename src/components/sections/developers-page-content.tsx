"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Code2, ExternalLink, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/animation/motion-primitives";
import { cn } from "@/lib/utils";

const PACKAGES_URL = "/api/packages";
const MEDIA_BASE = "https://dash.vexaltech.dev";

interface Package {
  id: number;
  packageName: string;
  companyName?: string;
  docsUrl?: string;
  pubUrl?: string;
  githubUrl?: string;
  body?: string;
  packageLogo?: string;
  packageBanner?: string;
  tags?: string[];
}

function fixUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${MEDIA_BASE}${url}`;
}

export function DevelopersPageContent() {
  const t = useTranslations();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Package | null>(null);

  useEffect(() => {
    fetch(PACKAGES_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: { packages: Package[] }) => {
        const filtered = (data.packages || [])
          .filter((p) => p.companyName === "Alheekmah Library")
          .map((p) => ({
            ...p,
            packageBanner: fixUrl(p.packageBanner),
            packageLogo: fixUrl(p.packageLogo),
          }));
        setPackages(filtered);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald border-t-transparent" />
        <p className="text-ink-faint">{t("developers_loading")}</p>
      </div>
    );
  }

  if (error || packages.length === 0) {
    return (
      <div className="container-x py-20 text-center text-ink-faint">
        {t("developers_error")}
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t("developers_page_eyebrow")}
        title={t("developers_page_title")}
        lede={t("developers_page_lede")}
      />

      <section className="container-x py-10">
        <MotionReveal variant="up">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
              <Code2 className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">{t("developers_library")}</h2>
              <p className="text-[0.88rem] text-ink-soft">حزم Flutter مفتوحة المصدر من مكتبة الحكمة</p>
            </div>
          </div>
        </MotionReveal>

        <MotionStagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
          {packages.map((pkg) => (
            <MotionStaggerItem key={pkg.id}>
              <PackageCard pkg={pkg} onClick={() => setSelected(pkg)} t={t} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </section>

      <AnimatePresence>
        {selected && (
          <DetailsModal pkg={selected} onClose={() => setSelected(null)} t={t} />
        )}
      </AnimatePresence>
    </>
  );
}

function PackageCard({
  pkg,
  onClick,
  t,
}: {
  pkg: Package;
  onClick: () => void;
  t: (key: string) => string;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-rule bg-paper p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald group-hover:text-paper-fixed">
          <Code2 className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="pt-0.5 font-display text-lg font-bold leading-snug text-ink">
            {pkg.packageName}
          </h3>
          {pkg.tags && pkg.tags.length > 0 && (
            <p className="mt-0.5 truncate text-[0.72rem] text-ink-faint">
              {pkg.tags.slice(0, 3).join(" · ")}
            </p>
          )}
        </div>
      </div>

      <p className="mb-5 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
        {pkg.body}
      </p>

      <div className="flex flex-wrap items-center gap-2 border-t border-rule-soft pt-4">
        {pkg.pubUrl && <QuickLink href={pkg.pubUrl} label="pub.dev" />}
        {pkg.githubUrl && <QuickLink href={pkg.githubUrl} label="GitHub" />}
        {pkg.docsUrl && <QuickLink href={pkg.docsUrl} label={t("developers_docs")} />}
        <span className="ml-auto inline-flex items-center gap-1 text-[0.78rem] font-bold text-emerald opacity-0 transition-opacity group-hover:opacity-100">
          {t("developers_view_details")}
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-bg px-2.5 py-1 text-[0.74rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
    >
      {label}
    </a>
  );
}

function DetailsModal({
  pkg,
  onClose,
  t,
}: {
  pkg: Package;
  onClose: () => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-bg text-ink-soft transition-colors hover:bg-bg-warm hover:text-emerald"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-center gap-3 pe-12">
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
            <Code2 className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{pkg.packageName}</h2>
            {pkg.tags && pkg.tags.length > 0 && (
              <p className="text-[0.74rem] text-ink-faint">{pkg.tags.join(" · ")}</p>
            )}
          </div>
        </div>

        {pkg.packageBanner && (
          <div className="mb-5 overflow-hidden rounded-xl border border-rule">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pkg.packageBanner} alt={pkg.packageName} className="aspect-[1.12/1] w-full object-cover" />
          </div>
        )}

        <p className="mb-6 text-[0.95rem] leading-relaxed text-ink-soft">{pkg.body}</p>

        <div className="flex flex-wrap gap-3">
          {pkg.pubUrl && <BigButton href={pkg.pubUrl} label="pub.dev" primary />}
          {pkg.githubUrl && <BigButton href={pkg.githubUrl} label="GitHub" primary />}
          {pkg.docsUrl && <BigButton href={pkg.docsUrl} label={t("developers_docs")} />}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BigButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[0.88rem] font-bold transition-all hover:-translate-y-0.5",
        primary
          ? "bg-emerald text-paper-fixed shadow-emerald"
          : "border border-rule bg-paper text-ink hover:border-emerald hover:text-emerald",
      )}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}
