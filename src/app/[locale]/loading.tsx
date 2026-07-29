import { Loader2 } from "lucide-react";

/**
 * حدّ تحميل لانتقالات الراوت تحت [locale].
 * يظهر أثناء بدّل اللغة/الصفحة فلا تبدو الواجهة معلّقة،
 * ويحلّ محل أي spinner معلّق قد يبقى إلى الأبد لو تأخّر الـ upstream.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-emerald" />
    </div>
  );
}
