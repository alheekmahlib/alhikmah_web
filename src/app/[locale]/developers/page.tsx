import { setRequestLocale } from "next-intl/server";
import { DevelopersPageContent } from "@/components/sections/developers-page-content";

export default async function DevelopersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DevelopersPageContent />;
}
