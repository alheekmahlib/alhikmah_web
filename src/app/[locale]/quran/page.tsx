import { setRequestLocale } from "next-intl/server";
import { QuranIframe } from "@/components/quran/quran-iframe";

export default async function QuranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QuranIframe view="quran" />;
}
