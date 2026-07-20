"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Download, ExternalLink, X, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/animation/motion-primitives";
import { getDevelopersData } from "@/lib/data";
import type { DevelopersData, DeveloperItem, DeveloperSection } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DevelopersPageContent() {
  const t = useTranslations();
  const data = getDevelopersData();
  const [selectedItem, setSelectedItem] = useState<{
    item: DeveloperItem;
    sectionType: string;
  } | null>(null);

  if (!data || !data.sections) {
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
        {/* تاريخ آخر تحديث */}
        <MotionReveal variant="fade-up">
          <div className="mb-10 inline-flex items-center gap-2 rounded-xl border border-emerald/20 bg-emerald/5 px-4 py-2 text-[0.82rem]">
            <span className="text-ink-faint">{t("developers_updated")}:</span>
            <span className="font-bold text-emerald">{data.updatedAt}</span>
          </div>
        </MotionReveal>

        {/* الأقسام */}
        <div className="flex flex-col gap-16">
          {data.sections
            .filter((s) => s.enabled && s.slug !== "api")
            .map((section) => (
              <SectionView
                key={section.slug}
                section={section}
                t={t}
                onItemClick={(item) =>
                  setSelectedItem({ item, sectionType: section.type })
                }
              />
            ))}
        </div>
      </section>

      {/* نافذة التفاصيل */}
      <AnimatePresence>
        {selectedItem && (
          <DetailsModal
            item={selectedItem.item}
            sectionType={selectedItem.sectionType}
            onClose={() => setSelectedItem(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================================
   عرض قسم واحد
   ========================================================================== */
function SectionView({
  section,
  t,
  onItemClick,
}: {
  section: DeveloperSection;
  t: (key: string) => string;
  onItemClick: (item: DeveloperItem) => void;
}) {
  const title = section.title.ar;
  const desc = section.description.ar;
  const isLibraries = section.slug === "libraries";
  const Icon = isLibraries ? Code2 : Download;

  return (
    <div>
      <MotionReveal variant="fade-up">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
            <p className="text-[0.88rem] text-ink-soft">{desc}</p>
          </div>
        </div>
      </MotionReveal>

      <MotionStagger
        className={cn(
          "grid gap-5",
          isLibraries ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
        stagger={0.12}
      >
        {section.items
          .filter((i) => i.enabled)
          .map((item) => (
            <MotionStaggerItem key={item.id}>
              <ItemCard
                item={item}
                sectionType={section.type}
                onClick={() => onItemClick(item)}
                t={t}
              />
            </MotionStaggerItem>
          ))}
      </MotionStagger>
    </div>
  );
}

/* ==========================================================================
   بطاقة عنصر — تصميم نظيف وبسيط
   ========================================================================== */
function ItemCard({
  item,
  sectionType,
  onClick,
  t,
}: {
  item: DeveloperItem;
  sectionType: string;
  onClick: () => void;
  t: (key: string) => string;
}) {
  const title = item.title.ar;
  const desc = item.description.ar;
  const isLibraries = sectionType === "libraries";

  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-rule bg-paper p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
    >
      {/* رأس البطاقة: أيقونة + عنوان */}
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald group-hover:text-paper">
          {isLibraries ? (
            <Code2 className="h-5 w-5" strokeWidth={1.7} />
          ) : (
            <Download className="h-5 w-5" strokeWidth={1.7} />
          )}
        </div>
        <h3 className="pt-1.5 font-display text-lg font-bold leading-snug text-ink">
          {title}
        </h3>
      </div>

      {/* الوصف */}
      <p className="mb-5 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
        {desc}
      </p>

      {/* روابط سريعة (نظيفة) */}
      <div className="flex flex-wrap items-center gap-2 border-t border-rule-soft pt-4">
        {item.githubUrl && (
          <QuickLink href={item.githubUrl} icon={<GithubIcon className="h-3.5 w-3.5" />} label="GitHub" />
        )}
        {item.downloadUrl && (
          <QuickLink
            href={item.downloadUrl}
            icon={<Download className="h-3.5 w-3.5" />}
            label={isLibraries ? "pub.dev" : t("developers_download")}
          />
        )}
        {item.docsUrl && (
          <QuickLink href={item.docsUrl} icon={<FileText className="h-3.5 w-3.5" />} label={t("developers_docs")} />
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-[0.78rem] font-bold text-emerald opacity-0 transition-opacity group-hover:opacity-100">
          {t("developers_view_details")}
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      data-cursor="hover"
      className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-bg px-2.5 py-1 text-[0.74rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
    >
      {icon}
      {label}
    </a>
  );
}

/** أيقونة GitHub (غير متوفرة في lucide-react الحديثة) */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ==========================================================================
   نافذة التفاصيل المنزلقة
   ========================================================================== */
function DetailsModal({
  item,
  sectionType,
  onClose,
  t,
}: {
  item: DeveloperItem;
  sectionType: string;
  onClose: () => void;
  t: (key: string) => string;
}) {
  const title = item.title.ar;
  const desc = item.description.ar;
  const isLibraries = sectionType === "libraries";

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
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          aria-label="close"
          data-cursor="hover"
          className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-bg text-ink-soft transition-colors hover:bg-bg-warm hover:text-emerald"
        >
          <X className="h-4 w-4" />
        </button>

        {/* رأس */}
        <div className="mb-5 flex items-center gap-3 pe-12">
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
            {isLibraries ? (
              <Code2 className="h-6 w-6" strokeWidth={1.6} />
            ) : (
              <Download className="h-6 w-6" strokeWidth={1.6} />
            )}
          </div>
          <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        </div>

        {/* الوصف */}
        <p className="mb-6 text-[0.95rem] leading-relaxed text-ink-soft">{desc}</p>

        {/* أزرار كبيرة وواضحة */}
        <div className="flex flex-wrap gap-3">
          {item.githubUrl && (
            <BigButton href={item.githubUrl} icon={<GithubIcon className="h-4 w-4" />} label="GitHub" primary />
          )}
          {item.downloadUrl && (
            <BigButton
              href={item.downloadUrl}
              icon={<Download className="h-4 w-4" />}
              label={isLibraries ? "pub.dev" : t("developers_download")}
              primary
            />
          )}
          {item.docsUrl && (
            <BigButton href={item.docsUrl} icon={<FileText className="h-4 w-4" />} label={t("developers_docs")} />
          )}
          {item.readmeUrl && (
            <BigButton href={item.readmeUrl} icon={<FileText className="h-4 w-4" />} label="README" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BigButton({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[0.88rem] font-bold transition-all hover:-translate-y-0.5",
        primary
          ? "bg-emerald text-paper shadow-emerald"
          : "border border-rule bg-paper text-ink-2 hover:border-emerald hover:text-emerald",
      )}
    >
      {icon}
      {label}
      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}
