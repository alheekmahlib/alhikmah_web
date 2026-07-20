import { setRequestLocale } from "next-intl/server";
import { AthkarPageContent } from "@/components/sections/athkar-page-content";

export default async function AthkarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AthkarPageContent />;
}
