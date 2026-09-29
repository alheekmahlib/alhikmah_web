"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Code2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { fetchPackages } from "@/lib/api-cache";
import { fixAppMediaUrl } from "@/lib/apps";
import { APP_PACKAGES } from "@/lib/app-packages";
import type { PackageInfo } from "@/lib/types";

/**
 * قسم "المكتبات المستخدمة": يعرض حزم Flutter التي بُني بها التطبيق
 * حسب الخريطة المحلية APP_PACKAGES (لا يوفّر الـ API أي ربط).
 * لا يُعرض شيء إن لم يكن للـ slug ربط أو فشل الجلب.
 */
export function UsedLibraries({ slug }: { slug: string }) {
  const t = useTranslations();
  const [packages, setPackages] = useState<PackageInfo[] | null>(null);

  useEffect(() => {
    const wanted = APP_PACKAGES[slug];
    if (!wanted?.length) return;
    let cancelled = false;
    fetchPackages<{ packages: PackageInfo[] }>()
      .then((data) => {
        if (cancelled) return;
        const byName = new Map<string, PackageInfo>();
        for (const p of data.packages || []) {
          if (p.companyName !== "Alheekmah Library") continue;
          byName.set(p.packageName, { ...p, packageLogo: fixAppMediaUrl(p.packageLogo) });
        }
        // بترتيب الخريطة المحلية لا بترتيب الـ API
        setPackages(wanted.map((name) => byName.get(name)).filter((p): p is PackageInfo => !!p));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!packages || packages.length === 0) return null;

  return (
    <Reveal variant="up">
      <SectionHeading title={t("apps_detail_libraries")} icon={<Code2 className="h-5 w-5" strokeWidth={1.7} />} />
      <p className="mb-6 text-[0.92rem] text-ink-soft">{t("apps_detail_libraries_lede")}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col gap-4 rounded-2xl border border-rule bg-paper p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
          >
            <div className="flex items-center gap-3.5">
              {pkg.packageLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pkg.packageLogo}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-xl border border-rule bg-bg-warm object-contain p-1"
                />
              ) : (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
                  <Code2 className="h-5 w-5" strokeWidth={1.7} />
                </span>
              )}
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-bold text-ink">{pkg.packageName}</h3>
                {pkg.tags && pkg.tags.length > 0 && (
                  <p className="truncate text-[0.72rem] text-ink-faint">{pkg.tags.slice(0, 3).join(" · ")}</p>
                )}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {pkg.pubUrl && <PkgLink href={pkg.pubUrl} label="pub.dev" />}
              {pkg.githubUrl && <PkgLink href={pkg.githubUrl} label="GitHub" />}
              {pkg.docsUrl && <PkgLink href={pkg.docsUrl} label={t("developers_docs")} />}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function PkgLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-bg px-2.5 py-1 text-[0.74rem] font-semibold text-ink-soft transition-colors duration-200 hover:border-emerald hover:text-emerald"
    >
      {label}
      <ExternalLink className="h-3 w-3 opacity-60" />
    </a>
  );
}
