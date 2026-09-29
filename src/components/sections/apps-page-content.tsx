"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import type { AppInfo } from "@/lib/types";
import { fetchApps } from "@/lib/api-cache";
import { getAlheekmahApps } from "@/lib/apps";
import { AppCard } from "@/components/app-detail/app-card";

export function AppsPageContent() {
  const t = useTranslations();
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // fetchApps يوفّر كاش (ذاكرة + localStorage) و timeout، فيمنع
    // انفجار الطلبات عند تبديل اللغة ولا يعلّق لو تأخّر الـ upstream.
    let cancelled = false;
    fetchApps<unknown>()
      .then((data) => {
        if (cancelled) return;
        // فلترة تطبيقات Alheekmah Library فقط + إصلاح روابط الصور
        setApps(getAlheekmahApps(data));
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow={t("apps_page_eyebrow")}
        title={t("apps_page_title")}
        lede={t("apps_page_lede")}
      />

      <section className="container-x py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald" />
            <p className="text-ink-faint">{t("apps_loading")}</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rule bg-paper p-10 text-center text-ink-faint">
            {t("apps_error")}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <AppCard key={app.slug ?? app.id} app={app} delay={Math.min(i * 80, 480)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
