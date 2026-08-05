import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// الكاش الحقيقي عبر R2 bucket (الخيار الرسمي الموصى به في @opennextjs/cloudflare 1.20.x).
// يحل أخطاء 503 عند تبديل اللغة: بدلاً من أن يُعاد SSR بارد كامل لكل طلب RSC prefetch
// (ما ينهار الـ Worker تحت حمله المتزامن)، تُخزَّن صفحاتنا الثابتة في R2 وتُقدَّم فوراً.
//
// ملاحظة: tagCache وqueue يبقيان "dummy" افتراضياً (لا نستخدم revalidateTag ولا ISR زمني)،
// وكل صفحاتنا الثابتة لا تحتاج إلا التخزين المؤقت البسيط.
const config = defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});

// OpenNext يشغّل افتراضياً "npm run build" لبناء Next.js — لكن على منصة Cloudflare
// أصبح "npm run build" = "opennextjs-cloudflare build" نفسه، فينشأ استدعاء متكرر لا نهائي.
// نلزمه باستخدام "next build" مباشرةً لكسر الحلقة.
config.buildCommand = "next build";

export default config;
