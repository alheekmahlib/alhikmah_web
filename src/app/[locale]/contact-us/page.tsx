import { setRequestLocale } from "next-intl/server";
import { ContactPageContent } from "@/components/sections/contact-page-content";

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}
