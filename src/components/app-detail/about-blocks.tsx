import type { ReactNode } from "react";
import type { AboutBlock } from "@/lib/app-about";

/**
 * يعرض كتل وصف التطبيق (مخرجات parseAboutBlocks):
 * فقرات نصية، عناوين فرعية بشريط زمردي، ونقاط الميزات المتتابعة
 * تُجمَّع تلقائيًا في شبكة بطاقات (عمودان على الشاشات الأكبر).
 */
export function AboutBlocks({ blocks }: { blocks: AboutBlock[] }) {
  const rendered: ReactNode[] = [];
  let bulletGroup: ReactNode[] = [];

  const flushBullets = () => {
    if (bulletGroup.length === 0) return;
    rendered.push(
      <div key={`bullets-${rendered.length}`} className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {bulletGroup}
      </div>,
    );
    bulletGroup = [];
  };

  blocks.forEach((block, i) => {
    if (block.type === "bullet") {
      bulletGroup.push(
        <div key={i} className="flex gap-3.5">
          <span aria-hidden className="mt-1 text-[1.05rem] leading-none text-emerald">
            ۞
          </span>
          <div className="min-w-0">
            {block.lead ? (
              <>
                <p className="text-[0.95rem] font-bold leading-snug text-ink">{block.lead}</p>
                <p className="mt-0.5 text-[0.9rem] leading-relaxed text-ink-soft">{block.text}</p>
              </>
            ) : (
              <p className="self-center text-[0.92rem] leading-relaxed text-ink-soft">{block.text}</p>
            )}
          </div>
        </div>,
      );
      return;
    }

    flushBullets();
    if (block.type === "subheading") {
      rendered.push(
        <h3
          key={i}
          className="flex items-center gap-2.5 pt-2 font-display text-xl font-bold text-emerald-deep"
        >
          <span aria-hidden className="h-6 w-1.5 rounded-full bg-emerald" />
          {block.text}
        </h3>,
      );
    } else {
      rendered.push(
        <p key={i} className="max-w-3xl text-[0.95rem] leading-loose text-ink-soft">
          {block.text}
        </p>,
      );
    }
  });
  flushBullets();

  return <div className="flex flex-col gap-6">{rendered}</div>;
}
