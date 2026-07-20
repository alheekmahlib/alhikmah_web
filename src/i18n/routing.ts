import { defineRouting } from "next-intl/routing";

export const locales = [
  "ar",
  "en",
  "es",
  "tr",
  "ur",
  "id",
  "ku",
  "so",
  "tl",
  "be",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

// اللغات التي تُكتب من اليمين لليسار
export const rtlLocales: readonly Locale[] = ["ar", "ur", "ku"] as const;

export const isRtl = (locale: string): boolean =>
  (rtlLocales as readonly string[]).includes(locale);

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});
