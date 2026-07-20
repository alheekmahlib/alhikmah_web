import { setRequestLocale } from "next-intl/server";
import { AppsPageContent } from "@/components/sections/apps-page-content";

export default async function AppsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AppsPageContent />;
}
