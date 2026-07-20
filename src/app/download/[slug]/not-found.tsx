import Link from "next/link";
import { Download, Smartphone, Apple, ExternalLink } from "lucide-react";

export default function DownloadNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center">
      <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-emerald/10 text-emerald">
        <Download className="h-10 w-10" strokeWidth={1.4} />
      </div>

      <h1 className="mb-3 font-display text-2xl font-bold text-ink">
        التطبيق غير متاح
      </h1>

      <p className="mb-8 max-w-md text-ink-soft">
        لم نتمكن من العثور على التطبيق المطلوب أو المتجر المناسب لجهازك.
        يمكنك تصفّح كل تطبيقاتنا واختيار المتجر يدويًا.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/ar/apps"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 font-bold text-paper shadow-emerald transition-transform hover:-translate-y-0.5"
        >
          <Smartphone className="h-4 w-4" />
          تصفّح التطبيقات
        </Link>

        <Link
          href="/ar"
          className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-6 py-3 font-bold text-ink-2 transition-colors hover:border-emerald hover:text-emerald"
        >
          <Apple className="h-4 w-4" />
          الصفحة الرئيسية
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </Link>
      </div>
    </div>
  );
}
