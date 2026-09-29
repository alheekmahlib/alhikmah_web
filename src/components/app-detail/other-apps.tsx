"use client";

import { useTranslations } from "next-intl";
import { LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { AppCard } from "./app-card";
import type { AppInfo } from "@/lib/types";

/** قسم "تطبيقات أخرى": بقية تطبيقات مكتبة الحكمة عدا التطبيق الحالي. */
export function OtherApps({ apps, current }: { apps: AppInfo[]; current: AppInfo }) {
  const t = useTranslations();
  const others = apps.filter((a) => a !== current);
  if (others.length === 0) return null;

  return (
    <div>
      <Reveal variant="up">
        <SectionHeading
          title={t("apps_detail_other_apps")}
          icon={<LayoutGrid className="h-5 w-5" strokeWidth={1.7} />}
        />
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((app, i) => (
          <AppCard key={app.slug ?? app.id} app={app} delay={Math.min(i * 80, 400)} />
        ))}
      </div>
    </div>
  );
}
