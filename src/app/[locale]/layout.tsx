import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing, locales, isRtl } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LocaleAttrsSetter } from "@/components/layout/locale-attrs-setter";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SmoothScrollProvider } from "@/components/animation/smooth-scroll-provider";
import { CustomCursor } from "@/components/animation/custom-cursor";
import { ScrollProgress } from "@/components/animation/scroll-progress";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alheekmahlib.com";
  // تأكد من وجود البروتوكول
  const baseUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const title = isAr ? "مكتبة الحكمة" : "Alheekmah Library";
  const description = isAr
    ? "منصة إسلامية شاملة للقرآن الكريم ومرتليه، والأذكار، والعلم النافع."
    : "A comprehensive Islamic platform for the Holy Quran, Adhkar, and beneficial knowledge.";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: isAr ? "%s · مكتبة الحكمة" : "%s · Alheekmah Library",
    },
    description,
    keywords: isAr
      ? ["القرآن الكريم", "الأذكار", "تفسير", "حصن المسلم", "مكتبة الحكمة"]
      : ["Quran", "Adhkar", "Tafsir", "Hisnul Muslim", "Alheekmah"],
    authors: [{ name: "Alheekmah Library" }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale,
      url: baseUrl,
      siteName: title,
      title,
      description,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf7ee",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  void isRtl;

  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <SmoothScrollProvider>
          <LocaleAttrsSetter />
          <CustomCursor />
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1 pt-20 lg:pt-24">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
