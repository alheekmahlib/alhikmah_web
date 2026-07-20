import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import {
  routing,
  locales,
  defaultLocale,
  rtlLocales,
  isRtl,
  type Locale,
} from "./routing";

export { routing, locales, defaultLocale, rtlLocales, isRtl };
export type { Locale };

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` يحمل اللغة المكتشفة من الـ middleware
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
