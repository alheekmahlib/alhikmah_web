"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, Heart, Copy, Check, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";
import { getAthkarCategories, getAthkarByCategory } from "@/lib/data";
import type { AthkarItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AthkarPageContent() {
  const t = useTranslations();
  const categories = getAthkarCategories();
  const [activeCat, setActiveCat] = useState(categories[0] ?? "");
  const [query, setQuery] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.trim();
    return categories.filter((c) => c.includes(q));
  }, [categories, query]);

  // اسمح بتمرير الحاوية الجانبية بشكل مستقل عن Lenis
  // (Lenis يلتقط أحداث العجلة على مستوى النافذة، فنوقف انتشارها هنا)
  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      const target = sidebarRef.current;
      if (!target) return;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;
      const goingUp = e.deltaY < 0;
      const goingDown = e.deltaY > 0;
      if ((goingUp && !atTop) || (goingDown && !atBottom)) {
        e.stopPropagation();
      }
    }
    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const items = useMemo(() => getAthkarByCategory(activeCat), [activeCat]);

  return (
    <>
      <PageHeader
        eyebrow={t("athkar_eyebrow")}
        title={t("athkar_title")}
        lede={t("athkar_lede")}
      />

      <section className="container-x grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        {/* الشريط الجانبي: الفئات */}
        {/* data-lenis-prevent + wheel handler يسمحان بتمرير مستقل عن Lenis */}
        <aside
          ref={sidebarRef}
          data-lenis-prevent
          className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
        >
          <Reveal variant="right">
            <div className="rounded-2xl border border-rule bg-paper p-3">
              <div className="relative mb-3">
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("athkar_search_category")}
                  className="w-full rounded-lg border border-rule bg-bg py-2 pr-9 pl-3 text-[0.86rem] outline-none transition-colors placeholder:text-ink-faint focus:border-emerald"
                />
              </div>
              <nav className="flex gap-1 overflow-x-auto pb-1 lg:max-h-[60vh] lg:flex-col lg:overflow-y-auto lg:pb-0">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={cn(
                      "flex-shrink-0 rounded-lg px-3 py-2 text-start text-[0.84rem] font-semibold transition-all",
                      activeCat === cat
                        ? "bg-gradient-to-l from-emerald to-emerald-bright font-bold text-paper-fixed shadow-sm rtl:bg-gradient-to-r"
                        : "bg-bg text-ink hover:bg-paper-2 hover:text-emerald-deep",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </Reveal>
        </aside>

        {/* محتوى الفئة المختارة */}
        <div>
          <Reveal variant="left" key={activeCat}>
            <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-ink">
              <Heart className="h-6 w-6 text-emerald-deep" />
              {activeCat}
              <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[0.74rem] font-semibold text-ink-faint">
                {items.length}
              </span>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <Reveal key={i} variant="up" delay={Math.min(i * 50, 350)}>
                <AthkarCard item={item} t={t} />
              </Reveal>
            ))}
            {items.length === 0 && (
              <div className="rounded-2xl border border-rule bg-paper p-8 text-center text-ink-faint">
                {t("athkar_empty")}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function AthkarCard({
  item,
  t,
}: {
  item: AthkarItem;
  t: (key: string) => string;
}) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const target = Math.max(1, parseInt(item.count, 10) || 1);

  const handleCopy = () => {
    const text = `${item.zekr}\n\n${item.reference}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border bg-paper transition-all",
        count >= target ? "border-emerald bg-emerald/5" : "border-rule hover:border-emerald-soft",
      )}
    >
      <div className="p-6">
        {/* الذكر */}
        <p className="whitespace-pre-line font-quran text-[1.15rem] leading-loose text-ink">
          {item.zekr}
        </p>

        {/* الوصف */}
        {item.description && (
          <p className="mt-4 border-r-2 border-emerald/40 pr-3 text-[0.86rem] leading-relaxed text-ink-soft">
            {item.description}
          </p>
        )}

        {/* المرجع */}
        {item.reference && (
          <p className="mt-2 text-[0.78rem] font-semibold text-emerald">
            {item.reference}
          </p>
        )}
      </div>

      {/* الشريط السفلي: العدّاد + النسخ */}
      <div className="flex items-center justify-between gap-3 border-t border-rule-soft bg-bg-warm/50 px-6 py-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() =>
              count >= target ? setCount(0) : setCount((c) => Math.min(c + 1, target))
            }
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-all",
              count >= target
                ? "bg-emerald text-paper-fixed"
                : count > 0
                  ? "bg-emerald/30 text-emerald-deep hover:bg-emerald/40"
                  : "bg-paper text-emerald hover:bg-emerald/15",
            )}
            aria-label="counter"
            title={count >= target ? t("athkar_reset") : t("athkar_tap_count")}
          >
            {count >= target ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : count > 0 ? (
              count
            ) : (
              <Plus className="h-4 w-4" strokeWidth={3} />
            )}
          </button>
          <span className="text-[0.82rem] font-semibold text-ink-soft">
            {count >= target ? (
              <span className="text-emerald-deep">{t("athkar_done")}</span>
            ) : count > 0 ? (
              <>
                {count} {t("athkar_of")} {target}
              </>
            ) : (
              <span className="text-ink-faint">
                {t("athkar_count_label")}: {target}
              </span>
            )}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.78rem] font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-emerald-deep"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-deep" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t("athkar_copied") : t("athkar_copy")}
        </button>
      </div>
    </article>
  );
}
