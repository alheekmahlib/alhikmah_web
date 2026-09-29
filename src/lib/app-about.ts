/**
 * حلّ وعرض حقل aboutApp من الـ API.
 * الـ API يُرجعه حاليًا نصًا عربيًا خامًا (مع علامات ۞ وأسطر جديدة)،
 * وقد يصبح لاحقًا مصفوفة لغات [{lang, value}] — تُدعمان معًا.
 * ترجمات اللغات الأخرى تعيش في app-about-overrides.ts.
 */

import type { AppInfo } from "@/lib/types";
import { getLocalizedField } from "@/lib/platform-detect";
import { APP_ABOUT_OVERRIDES } from "@/lib/app-about-overrides";

/** كتلة واحدة من وصف التطبيق بعد التحليل. */
export type AboutBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullet"; lead?: string; text: string };

// العلامات التي تُعتبر بداية نقطة ميزة (۞ هي المعتمدة في محتوى الـ API)
const BULLET_MARKERS = ["۞", "•", "●"] as const;

function stripBulletMarker(line: string): string {
  for (const marker of BULLET_MARKERS) {
    if (line.startsWith(marker)) return line.slice(marker.length).trim();
  }
  return line;
}

/**
 * يحلّل نص aboutApp الخام إلى كتل قابلة للعرض:
 * - سطر يبدأ بعلامة نقطة (۞ …) → نقطة ميزة؛ الجزء قبل أول ":" يُعرض عريضًا.
 * - سطر ينتهي بنقطتين → عنوان فرعي (حتى لو بدأ بـ ۞).
 * - غير ذلك → فقرة. الأسطر الفارغة فواصل تُهمل.
 */
export function parseAboutBlocks(raw: string): AboutBlock[] {
  const blocks: AboutBlock[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isBullet = BULLET_MARKERS.some((m) => trimmed.startsWith(m));
    const content = stripBulletMarker(trimmed);
    if (!content) continue;

    // عنوان فرعي: ينتهي بنقطتين (عربية كانت أو لاتينية)
    if (/[:：]$/.test(content)) {
      blocks.push({ type: "subheading", text: content.replace(/[:：]$/, "").trim() });
      continue;
    }

    if (isBullet) {
      const sep = content.search(/[:：]/);
      blocks.push(
        sep > 0
          ? { type: "bullet", lead: content.slice(0, sep).trim(), text: content.slice(sep + 1).trim() }
          : { type: "bullet", text: content },
      );
      continue;
    }

    blocks.push({ type: "paragraph", text: content });
  }
  return blocks;
}

/**
 * نص "نبذة عن التطبيق" باللغة المطلوبة، بأسبقية:
 * 1) ترجمات الموقع (app-about-overrides).
 * 2) مصفوفة اللغات من الـ API (إن أصبحت مدعومة لاحقًا).
 * 3) النص العربي الخام — للعربية فقط؛ ما لا ترجمة له لا يُعرض.
 */
export function resolveAboutApp(app: AppInfo, locale: string): string {
  const override = APP_ABOUT_OVERRIDES[app.slug]?.[locale];
  if (override && override.trim()) return override;

  const raw = app.aboutApp;
  if (typeof raw === "string") {
    return locale === "ar" && raw.trim() ? raw : "";
  }
  return getLocalizedField(raw, locale, "value");
}
