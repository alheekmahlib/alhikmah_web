import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

const BASE_URL = "https://alheekmahlib.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // الصفحات الثابتة الرئيسية
  const routes = [
    "",
    "/quran",
    "/sound",
    "/books",
    "/athkar",
    "/apps",
    "/about",
    "/faq",
    "/contact-us",
    "/developers",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // لكل لغة × صفحة = رابط
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : route === "/quran" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
