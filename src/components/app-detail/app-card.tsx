"use client";

import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import type { AppInfo } from "@/lib/types";
import { appDetailPath } from "@/lib/apps";
import { getLocalizedField } from "@/lib/platform-detect";

/**
 * بطاقة تطبيق — تُستخدم في قائمة /apps وقسم "تطبيقات أخرى"
 * في صفحة التفاصيل (مصدر واحد للشكلين).
 */
export function AppCard({ app, delay = 0 }: { app: AppInfo; delay?: number }) {
  const t = useTranslations();
  const locale = useLocale();
  const name = getLocalizedField(app.appName, locale, "name");
  const body = getLocalizedField(app.body, locale, "value");

  return (
    <Reveal variant="up" delay={delay}>
      <Link
        href={appDetailPath(app)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-rule bg-paper text-start transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-soft hover:shadow-xl"
      >
        {/* البانر */}
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-warm">
          {app.appBanner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={app.appBanner}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-emerald-deep to-emerald">
              <span className="font-display text-3xl text-emerald-soft-fixed">{name?.[0]}</span>
            </div>
          )}
        </div>

        {/* المحتوى */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2.5">
            {app.appLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={app.appLogo} alt="" className="h-7 w-7 rounded-lg object-contain" />
            )}
            <h3 className="font-display text-lg font-bold text-ink">{name}</h3>
          </div>
          <p className="line-clamp-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">{body}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-bold text-emerald-deep">
            {t("apps_view_details")}
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
