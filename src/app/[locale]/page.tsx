import { setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/sections/hero-section";
import {
  ServicesSection,
  AyahMarqueeSection,
  AppsCarouselSection,
} from "@/components/sections/home-sections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AyahMarqueeSection />
      <AppsCarouselSection />
    </>
  );
}
