import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AppsDetailClient } from "@/components/sections/apps-detail-client";
import { findAppForMetadata } from "./apps-metadata";
import { getLocalizedField } from "@/lib/platform-detect";

// اجعل هذه الصفحة ديناميكية (لا تُعرض مسبقًا كـ SSG)
export const dynamic = "force-dynamic";

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <AppsDetailClient slug={slug} />;
}

/**
 * بيانات وصفية لعنوان الصفحة ومعاينات المشاركة (واتساب وغيره).
 * تُقرأ من كاش فوري بلا أي انتظار شبكة (راجع apps-metadata.ts) — أي انتظار
 * هنا يُبقي استجابة الصفحة مفتوحة على البث ويُسبب مع Firefox في وضع التطوير
 * حلقة إعادة تحميل لا نهائية. الطلب الأول بعد الإقلاع يعيد {} فقط،
 * ثم تُخدم البيانات من الكاش المسخَّن بالخلفية.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const app = findAppForMetadata(slug);
  if (!app) return {};

  const name = getLocalizedField(app.appName, locale, "name");
  const body = getLocalizedField(app.body, locale, "value");
  return {
    title: name || undefined,
    description: body || undefined,
    openGraph: app.appBanner ? { images: [app.appBanner] } : undefined,
  };
}
