import type { AppInfo } from "@/lib/types";
import { findAppBySlug, getAlheekmahApps } from "@/lib/apps";

/**
 * كاش من جانب الخادم لبيانات التطبيقات — لاستخدام generateMetadata حصرًا.
 *
 * السبب: أي انتظار شبكة داخل generateMetadata يؤخر إغلاق استجابة الصفحة،
 * وفي وضع التطوير مع Firefox يسبب ذلك حلقة إعادة تحميل لا نهائية
 * (وفحصه عمليًا: تأخير 1.5 ثانية = حلقة؛ بلا انتظار = استقرار).
 * لذا لا ننتظر الشبكة أبدًا داخل مسار الطلب:
 *  - الطلب الأول بعد إقلاع الخادم: يعيد undefined فورًا ويطلق التسخين بالخلفية.
 *  - الطلبات التالية: تُخدم من الكاش فورًا (ولو منتهيًا) مع إعادة تسخين بالخلفية.
 *
 * ملاحظة: على Cloudflare Workers قد تُقطع المهام الخلفية بعد انتهاء الرد،
 * والأسوأ حينها أن يبقى الكاش باردًا وتعود البيانات الوصفية افتراضية — لا أكثر.
 */

const APPS_API = "https://dash.vexaltech.dev/api/apps";
const CACHE_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 6000;

let cachedApps: AppInfo[] | null = null;
let cachedAt = 0;
let warming: Promise<void> | null = null;

function warm(): void {
  if (warming) return;
  if (cachedApps && Date.now() - cachedAt < CACHE_TTL_MS) return;
  warming = (async () => {
    try {
      const res = await fetch(APPS_API, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (res.ok) {
        cachedApps = getAlheekmahApps(await res.json());
        cachedAt = Date.now();
      }
    } catch {
      // تجاهل — سيعاد التسخين مع الطلب التالي
    } finally {
      warming = null;
    }
  })();
}

/**
 * يجلب التطبيق من الكاش فورًا (صفر انتظار).
 * يعيد undefined إن لم يكن الكاش مسخّنًا بعد — ويطلق التسخين بالخلفية.
 */
export function findAppForMetadata(slug: string): AppInfo | undefined {
  if (!cachedApps) {
    warm();
    return undefined;
  }
  warm(); // إعادة تسخين بالخلفية بعد انتهاء الصلاحية (stale-while-revalidate)
  return findAppBySlug(slug, cachedApps);
}
