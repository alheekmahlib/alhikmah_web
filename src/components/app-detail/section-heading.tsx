import type { ReactNode } from "react";

/** عنوان قسم موحّد لصفحة تفاصيل التطبيق (أيقونة + عنوان). */
export function SectionHeading({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
        {icon}
      </span>
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
    </div>
  );
}
