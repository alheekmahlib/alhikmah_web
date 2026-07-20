"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { isRtl } from "@/i18n/routing";

/** يضبط lang و dir على <html> ديناميكيًا حسب اللغة. */
export function LocaleAttrsSetter() {
  const locale = useLocale();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
